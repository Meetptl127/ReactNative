import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { VideoView, useVideoPlayer } from "expo-video";

export default function VideoUploadScreen() {
  const [video, setVideo] = useState(null);
  // Video player setup using custom hook from expo-video
  const player = useVideoPlayer(video, (playerInstance) => {
    if (playerInstance) {
      playerInstance.loop = true; // Enable looping of the video
      playerInstance.play(); // Start video playback automatically
    }
  });
  // Function to record a video
  const recordVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Set to video recording
      allowsEditing: false,
      quality: 0.7, // Adjust quality as needed
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgContainer}>
        <Button title="Select Video from Gallery" onPress={recordVideo} />
      </View>
      {video && (
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgContainer: {
    position: "relative",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  iconButton: {
    position: "absolute",
    right: -15,
    bottom: -15,
    backgroundColor: "white",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  video: {
    width: 350, // Width of the video player
    height: 275, // Height of the video player
  },
});
