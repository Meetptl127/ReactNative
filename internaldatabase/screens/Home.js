import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  initDatabase,
  fetchUsersPaginated,
  deleteUser,
} from "../components/DatabaseManager";

// Home component to display and manage users
export default function Home({ navigation }) {
  // State variables
  const [users, setUsers] = useState([]); // Stores the list of users
  const [currentPage, setCurrentPage] = useState(0); // Tracks the current page for pagination
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [hasMore, setHasMore] = useState(true); // Tracks if more users are available to load

  // useEffect to initialize the database and load users when the component mounts or gains focus
  useEffect(() => {
    const initializeDB = async () => {
      await initDatabase(); // Initialize the database
      loadInitialUsers(); // Load the first set of users
    };
    initializeDB();

    // Add a focus listener to reload users when the screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      loadInitialUsers();
    });

    // Clean up the focus listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  // Function to load the initial set of users (first page)
  const loadInitialUsers = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const data = await fetchUsersPaginated(4, 0); // Fetch the first 4 users
      setUsers(data); // Update the users state with the fetched data
      setCurrentPage(0); // Reset the current page to 0
      setHasMore(data.length === 4); // Check if there are more users to load
    } catch (error) {
      console.error(error); // Log any errors
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  // Function to load more users when scrolling (pagination)
  const loadMoreUsers = async () => {
    if (!isLoading && hasMore) {
      // Only load more if not already loading and more users are available
      setIsLoading(true); // Set loading state to true
      try {
        const nextPage = currentPage + 1; // Calculate the next page
        const data = await fetchUsersPaginated(4, nextPage * 4); // Fetch the next 4 users
        if (data.length > 0) {
          setUsers((prev) => [...prev, ...data]); // Append the new users to the existing list
          setCurrentPage(nextPage); // Update the current page
        }
        setHasMore(data.length === 4); // Check if there are more users to load
      } catch (error) {
        console.error(error); // Log any errors
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    }
  };

  // Function to handle user deletion
  const handleDelete = async (id) => {
    await deleteUser(id); // Delete the user with the given ID
    loadInitialUsers(); // Reload the user list
  };

  // Function to handle user update navigation
  const handleUpdate = (user) => {
    navigation.navigate("Form", { user, isEdit: true }); // Navigate to the Form screen with the user data
  };

  // Render the component
  return (
    <View style={styles.container}>
      {/* Button to navigate to the Form screen for adding a new user */}
      <Button
        title="Add New User"
        onPress={() => navigation.navigate("Form", { isEdit: false })}
      />

      {/* FlatList to display the list of users */}
      <FlatList
        data={users} // Data source for the list
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        renderItem={({ item }) => (
          // Render each user item
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.username}</Text>
            <Text>Mobile: {item.mobile}</Text>
            <Text>Email: {item.email}</Text>
            <View style={styles.buttons}>
              {/* Button to update the user */}
              <Button
                title="Update"
                onPress={() => handleUpdate(item)}
                color="green"
              />
              {/* Button to delete the user */}
              <Button
                title="Delete"
                onPress={() => handleDelete(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
        onEndReached={loadMoreUsers} // Triggered when the end of the list is reached
        onEndReachedThreshold={0.5} // Threshold to trigger onEndReached (50% of the list)
        ListFooterComponent={() => (
          // Footer to show a loader or a "no more users" message
          <View style={styles.footer}>
            {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
            {!hasMore && <Text>No more users to load</Text>}
          </View>
        )}
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Padding for the container
  },
  userItem: {
    padding: 15,
    marginVertical: 8, // Vertical margin between user items
    backgroundColor: "#f8f8f8", // Background color for each user item
    borderRadius: 8, // Rounded corners for the user item
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold", // Bold font for the username
  },
  buttons: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "space-between", // Space between the buttons
    marginTop: 10, // Margin above the buttons
  },
  footer: {
    padding: 10,
    alignItems: "center", // Center the footer content
  },
});
