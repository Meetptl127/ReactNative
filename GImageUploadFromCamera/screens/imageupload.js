import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import Bg from "../components/Bg";
import Cam from "../components/Cam";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensures we only pick images
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to take a photo using the camera
  const takePhoto = async () => {
    // Request camera permissions if not already granted
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgContainer}>
        {/* Background component */}
        {!image ? (
          <Bg width={200} height={200} />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        {/* Camera icon button to pick an image */}
        <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
          <Cam width={24} height={24} />
        </TouchableOpacity>
      </View>
      {/* Commented out the button as it's now redundant */}
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgContainer: {
    position: "relative", // Needed to position the Cam icon absolutely within this container
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  iconButton: {
    position: "absolute", // Positioning the camera icon absolutely within the bgContainer
    right: -15, // Adjust the right position to move it towards the right edge
    bottom: -15, // Adjust the bottom position to move it towards the bottom edge
    backgroundColor: "white", // White background for the circular button
    borderRadius: 30, // Make the button round (adjust radius to size of the circle)
    width: 50, // Width of the circle (adjustable)
    height: 50, // Height of the circle (adjustable)
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0, // Ensure the icon is above the background
  },
});
