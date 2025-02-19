import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch users with pagination
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();

      setUsers((prevUsers) => [...prevUsers, ...data.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle navigation to Create/Edit screen
  const handleNavigate = (user = null) => {
    navigation.navigate("CreateUser", { user, setUsers });
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    Alert.alert("Delete User?", "Are you sure you want to delete this user?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await fetch(`https://reqres.in/api/users/${userId}`, {
              method: "DELETE",
            });

            // Remove user locally
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== userId)
            );
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ddd",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.first_name}
                </Text>
                <Text>@{item.username || "unknown"}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {/* Edit Button */}
              <TouchableOpacity onPress={() => handleNavigate(item)}>
                <Icon name="edit" size={24} color="blue" />
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        onEndReached={fetchUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore && <ActivityIndicator size="small" />}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          bottom: 30,
          backgroundColor: "blue",
          padding: 15,
          borderRadius: 50,
        }}
        onPress={() => handleNavigate()}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
