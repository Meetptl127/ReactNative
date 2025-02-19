import {
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import Bg from "../components/Bg";
import Cam from "../components/Cam";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

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

        {/* Camera icon at bottom left */}
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <Cam width={24} height={24} />
        </TouchableOpacity>
      </View>
      {/* 
     // <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

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
    right: -15, // Adjust the left position to move it towards the left edge
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
