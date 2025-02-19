import React, { useState } from "react";
import { View, Button, Alert, StyleSheet, FlatList, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av"; // Use expo-av for video playback
import axios from "axios";

const Videoupload = () => {
  const [videos, setVideos] = useState([]); // Array to store video URIs

  const recordVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      handleVideo(result.assets[0].uri);
    }
  };

  const selectVideo = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your media library."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedVideos = result.assets.map((asset) => asset.uri); // Collect URIs from selected videos
      setVideos((prevVideos) => [...prevVideos, ...selectedVideos]); // Add selected videos to the state
    }
  };

  const handleVideo = (uri) => {
    setVideos((prevVideos) => [...prevVideos, uri]); // Add video to the list
    uploadVideo(uri);
  };

  const uploadVideo = (uri) => {
    const formData = new FormData();
    formData.append("video", {
      uri: uri,
      type: "video/mp4",
      name: "video.mp4",
    });

    axios
      .post("https://your-server-url.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch(() => Alert.alert("Upload Failed", "Please try again."));
  };

  const renderVideoItem = ({ item, index }) => (
    <View key={index} style={styles.videoContainer}>
      <Text style={styles.videoLabel}>Video {index + 1}</Text>
      <Video
        source={{ uri: item }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Record Video from Camera" onPress={recordVideo} />
      <Button title="Select Video from Gallery" onPress={selectVideo} />
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  videoContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  videoLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  video: {
    width: 350,
    height: 275,
  },
});

export default Videoupload;
