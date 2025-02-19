import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CreateUserScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, setUsers } = route.params || {};

  const [name, setName] = useState(user?.first_name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(
    user?.avatar ||
      `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !username) return alert("Please enter name and username");

    setLoading(true);
    try {
      if (user) {
        // Update user
        await fetch(`https://reqres.in/api/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, username }),
        });

        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === user.id ? { ...u, first_name: name, username } : u
          )
        );
      } else {
        // Create new user
        const newUser = {
          id: Math.random().toString(),
          first_name: name,
          username,
          avatar,
        };

        setUsers((prevUsers) => [newUser, ...prevUsers]);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: avatar }}
        style={{ width: 100, height: 100, alignSelf: "center" }}
      />
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
      <Button
        title={user ? "Update User" : "Create User"}
        onPress={handleSubmit}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
    </View>
  );
}
