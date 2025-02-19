import React, { useState, useRef } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Module to pick images or videos from the library
import { VideoView, useVideoPlayer } from "expo-video"; // Used for video playback
import axios from "axios"; // HTTP client for making requests

const VideoUpload = () => {
  // State for storing the URI of the selected or recorded video
  const [videoUri, setVideoUri] = useState(null);

  // Video player setup using custom hook from expo-video
  const player = useVideoPlayer(videoUri, (playerInstance) => {
    if (playerInstance) {
      playerInstance.loop = true; // Enable looping of the video
      playerInstance.play(); // Start video playback automatically
    }
  });

  // Function to handle video selection from the media library
  const selectVideo = async () => {
    // Request media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your media library."
      );
      return;
    }

    // Launch the media picker for videos
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Restrict to videos only
      allowsEditing: true, // Allow trimming or other simple editing
      quality: 1, // Set highest quality
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri; // Get video URI from the result
      setVideoUri(uri); // Update state with the video URI
      uploadVideo(result.assets[0]); // Call function to upload the video
    } else {
      console.log("User canceled video picker"); // Log if user cancels the action
    }
  };

  // Function to upload the selected video to a server
  const uploadVideo = (video) => {
    const formData = new FormData(); // Form data to hold the video file
    formData.append("video", {
      uri: video.uri, // URI of the video
      type: "video/mp4", // File type
      name: "video.mp4", // File name
    });

    axios
      .post("https://your-server-url.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set content type for form data
      })
      // .then(() => Alert.alert("Upload Successful", "Video uploaded successfully!"))
      .catch(() => Alert.alert("Upload Failed", "Please try again.")); // Handle upload failure
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Button to trigger video selection */}
      <Button title="Select Video from Gallery" onPress={selectVideo} />

      {/* Display video player if a video URI is available */}
      {videoUri && (
        <View style={styles.container}>
          <VideoView
            style={styles.video} // Style for the video player
            player={player} // Video player instance
            allowsFullscreen // Enable full screen mode
            allowsPictureInPicture // Enable picture-in-picture mode
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to take up all available space
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  video: {
    width: 350, // Width of the video player
    height: 275, // Height of the video player
  },
});

export default VideoUpload;
