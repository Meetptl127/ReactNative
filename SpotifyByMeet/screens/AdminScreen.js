// screens/AdminScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addSong } from "../Redux/slices/musicSlice";
import uuid from "react-native-uuid";

export default function AdminScreen({ navigation }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const dispatch = useDispatch();

  const handleAddSong = () => {
    if (author && title && image && file) {
      dispatch(addSong({ id: uuid.v4(), author, title, image, file }));
      setAuthor("");
      setTitle("");
      setImage("");
      setFile("");
      alert("Song added!");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Panel - Add New Song</Text>
      <TextInput
        style={styles.input}
        placeholder="Author Name"
        placeholderTextColor="#888"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Song Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        placeholderTextColor="#888"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Music File URL"
        placeholderTextColor="#888"
        value={file}
        onChangeText={setFile}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Song" onPress={handleAddSong} color="#1DB954" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to User Screen"
          onPress={() => navigation.navigate("User")}
          color="#1DB954"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
    padding: 20,
  },
  header: {
    color: "#1DB954",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#282828",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
