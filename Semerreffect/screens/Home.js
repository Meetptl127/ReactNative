import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(response.data.data); // API returns "data" which contains user info
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      // Enforce a minimum 5-second loading time
      setTimeout(() => {
        setLoading(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]} // Dummy data for shimmer effect
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => (
            <View style={styles.card}>
              <ShimmerPlaceHolder
                style={styles.avatar}
                LinearGradient={LinearGradient} // Pass LinearGradient component
                shimmerColors={["#F1C6C3", "#B76E79", "#F1C6C3"]} // Custom shimmer colors
                shimmerWidth={200} // Width of the shimmer effect
                duration={1000} // Duration of the shimmer animation
              />
              <ShimmerPlaceHolder
                style={styles.name}
                LinearGradient={LinearGradient}
                shimmerColors={["#F1C6C3", "#B76E79", "#F1C6C3"]}
                shimmerWidth={200}
                duration={1000}
              />
              <ShimmerPlaceHolder
                style={styles.email}
                LinearGradient={LinearGradient}
                shimmerColors={["#F1C6C3", "#B76E79", "#F1C6C3"]}
                shimmerWidth={200}
                duration={1000}
              />
            </View>
          )}
        />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>
                {item.first_name} {item.last_name}
              </Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA", // Light background color for soft look
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 12,
    borderRadius: 20, // More rounded corners for a smooth, elegant look
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6, // Subtle shadow effect to enhance card elevation
    borderColor: "#EAEAEA", // Light border to define the card boundaries
    borderWidth: 1, // A thin border for a delicate touch
  },
  avatar: {
    width: 100, // Slightly larger avatar for better display
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2, // Border to accentuate the avatar
    borderColor: "#B76E79", // Rose Gold border color for a chic touch
  },
  name: {
    fontSize: 20,
    fontWeight: "600", // Softer, more elegant font weight
    color: "#B76E79", // Rose Gold color for the name to match shimmer effect
    marginBottom: 10,
    width: 180, // Set a width for shimmer placeholder
    textAlign: "center", // Center-align text
  },
  email: {
    fontSize: 14,
    color: "#555", // Soft grey text for email
    width: 180, // Set a width for shimmer placeholder
    textAlign: "center", // Center-align email text
  },
});
