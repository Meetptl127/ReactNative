import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";

const Home = () => {
  const [image, setImage] = useState(null); // To store the selected image URI
  const [base64, setBase64] = useState(""); // To store the Base64 string

  // Function to pick an image from the gallery
  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Allow editing the image
      aspect: [4, 3], // Aspect ratio for cropping
      quality: 1, // Highest quality
    });

    // If the user doesn't cancel the picker
    if (!result.canceled) {
      const selectedImage = result.assets[0].uri; // Get the URI of the selected image
      setImage(selectedImage); // Set the image URI to state

      // Convert the image to Base64
      try {
        const base64String = await FileSystem.readAsStringAsync(selectedImage, {
          encoding: FileSystem.EncodingType.Base64, // Encode as Base64
        });
        setBase64(base64String); // Set the Base64 string to state

        // Print the Base64 string to the console
        console.log("Base64 String:", base64String);
      } catch (error) {
        console.error("Error reading file:", error);
        alert("Failed to convert image to Base64. Please try again.");
      }
    }
  };

  // Function to copy the Base64 string to the clipboard
  const copyToClipboard = async () => {
    if (base64) {
      await Clipboard.setStringAsync(base64);
      Alert.alert("Copied!", "Base64 string has been copied to the clipboard.");
    } else {
      Alert.alert("No Base64 string", "Please pick an image first.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {base64 ? (
        <View style={styles.base64Container}>
          <Text style={styles.base64Text}>Base64 string generated!</Text>
          <ScrollView style={styles.base64ScrollView}></ScrollView>
          <Button title="Copy Base64 to Clipboard" onPress={copyToClipboard} />
        </View>
      ) : null}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  base64Container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  base64Text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  base64ScrollView: {
    maxHeight: 200, // Limit the height of the scrollable area
    width: "100%",
    marginBottom: 10,
  },
  base64String: {
    fontSize: 12,
    color: "#333",
  },
});

export default Home;
