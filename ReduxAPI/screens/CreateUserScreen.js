import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  createUserThunk,
  updateUserThunk,
} from "../components/redux/userSlice";

export default function CreateUserScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = route.params || {};

  const [name, setName] = useState(user?.first_name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !username) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      if (user) {
        // Update user
        await dispatch(
          updateUserThunk({
            userId: user.id,
            userData: { first_name: name, username },
          })
        ).unwrap();
      } else {
        // Create user
        await dispatch(
          createUserThunk({ first_name: name, username })
        ).unwrap();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
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
