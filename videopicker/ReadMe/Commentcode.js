import React, { useState } from "react";
import { View, Button, Alert, StyleSheet, FlatList, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av"; // Import Video component from expo-av to display videos
import axios from "axios"; // Import axios for making HTTP requests

const Videoupload = () => {
  // State to hold the list of video URIs
  const [videos, setVideos] = useState([]);

  // Function to handle video recording from camera
  const recordVideo = async () => {
    // Request camera permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!"); // Show an alert if permission is denied
      return;
    }

    // Launch camera to record video
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Only allow video recording
      allowsEditing: false, // Disable editing the video
      quality: 0.7, // Set video quality to 0.7 (medium quality)
    });

    // If the user successfully records a video (i.e., not canceled), handle the video
    if (!result.canceled) {
      handleVideo(result.assets[0].uri); // Pass the video URI to handleVideo function
    }
  };

  // Function to select a video from the gallery
  const selectVideo = async () => {
    // Request permission to access media library (gallery)
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your media library." // Show an alert if permission is denied
      );
      return;
    }

    // Launch image picker to select videos from the gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Only allow selecting videos
      allowsEditing: true, // Allow the user to edit the video
      quality: 1, // Set maximum quality for selected videos
    });

    // If videos are selected, add their URIs to the list
    if (!result.canceled) {
      const selectedVideos = result.assets.map((asset) => asset.uri); // Map each asset to its URI
      setVideos((prevVideos) => [...prevVideos, ...selectedVideos]); // Append selected videos to the videos array
    }
  };

  // Function to handle the video URI: add it to the list and upload it
  const handleVideo = (uri) => {
    setVideos((prevVideos) => [...prevVideos, uri]); // Add the video URI to the videos list
    uploadVideo(uri); // Call upload function to upload the video
  };

  // Function to upload the video to the server
  const uploadVideo = (uri) => {
    // Create FormData to send the video as part of the POST request
    const formData = new FormData();
    formData.append("video", {
      uri: uri, // Add video URI
      type: "video/mp4", // Set video type to mp4
      name: "video.mp4", // Set video file name
    });

    // Make POST request to upload the video to the server
    axios
      .post("https://your-server-url.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set content type to multipart/form-data for file uploads
      })
      .catch(() => Alert.alert("Upload Failed", "Please try again.")); // Show error if upload fails
  };

  // Render each video item in the list
  const renderVideoItem = ({ item, index }) => (
    <View key={index} style={styles.videoContainer}>
      <Text style={styles.videoLabel}>Video {index + 1}</Text>{" "}
      {/* Display video number */}
      {/* Display video using Video component from expo-av */}
      <Video
        source={{ uri: item }} // Set the video URI as source
        style={styles.video} // Apply styles to video
        useNativeControls // Allow native video controls (play, pause, etc.)
        resizeMode="contain" // Resize the video to fit within the container while maintaining aspect ratio
        isLooping // Loop the video when it finishes
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Button to record video using camera */}
      <Button title="Record Video from Camera" onPress={recordVideo} />
      {/* Button to select video from media library */}
      <Button title="Select Video from Gallery" onPress={selectVideo} />

      {/* FlatList to render the list of videos */}
      <FlatList
        data={videos} // List of videos to display
        renderItem={renderVideoItem} // Render function for each video item
        keyExtractor={(item, index) => index.toString()} // Use index as unique key for each item
      />
    </View>
  );
};

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center the content
    padding: 20, // Add padding around the container
  },
  videoContainer: {
    marginVertical: 10, // Add vertical margin between video items
    alignItems: "center", // Center-align the video container
  },
  videoLabel: {
    fontSize: 16, // Set font size for video label
    marginBottom: 5, // Add space below the label
  },
  video: {
    width: 350, // Set video width
    height: 275, // Set video height
  },
});

export default Videoupload; // Export the Videoupload component
