import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Platform,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview"; // For displaying PDFs, PPTs, and Excel

export default function MediaViewer({ route }) {
  const { mediaFiles, initialIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const videoPlayerRef = useRef(null); // Ref to keep track of the video player

  // Access media object directly using index
  const media = mediaFiles[currentIndex];

  // Stop media playback when switching to a new item
  const stopMedia = async () => {
    if (videoPlayerRef.current) {
      await videoPlayerRef.current.stopAsync(); // Stops the video/audio
    }
  };

  useEffect(() => {
    // Stop the current media when changing the media item
    stopMedia();
  }, [currentIndex]); // Trigger whenever the current index changes

  const handleNext = () => {
    if (currentIndex < mediaFiles.length - 1) {
      stopMedia(); // Stop current media before switching
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      stopMedia(); // Stop current media before switching
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderMedia = () => {
    switch (media.type) {
      case "image":
        return (
          <Image source={media.uri} style={{ width: "100%", height: 300 }} />
        );
      case "video":
        return (
          <Video
            ref={videoPlayerRef}
            style={styles.video}
            source={media.uri}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        );
      case "audio":
        return (
          <Video
            ref={videoPlayerRef}
            style={styles.video}
            source={media.uri}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        );
      case "pdf":
        if (Platform.OS === "ios") {
          return (
            // Regular code for iOS (if supported by the device)
            <WebView
              style={{ flex: 1 }}
              source={{
                uri: media.uri,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          );
        } else {
          // Use Google Docs Viewer for Android
          return (
            <WebView
              style={{ flex: 1 }}
              source={{
                uri: `https://docs.google.com/viewer?url=${encodeURIComponent(
                  media.uri
                )}`,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          );
        }
      case "ppt":
      case "excel":
        if (Platform.OS === "ios") {
          return (
            // Regular code for iOS (if supported by the device)
            <WebView
              style={{ flex: 1 }}
              source={{
                uri: media.uri,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          );
        } else {
          // Use Google Docs Viewer for Android
          return (
            <WebView
              style={{ flex: 1 }}
              source={{
                uri: `https://docs.google.com/viewer?url=${encodeURIComponent(
                  media.uri
                )}`,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          );
        }
      default:
        return <Text>Unsupported media type</Text>;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{media.name}</Text>
      {renderMedia()}
      <View style={styles.navButtons}>
        <Button
          title="Previous"
          onPress={handlePrev}
          disabled={currentIndex === 0}
        />
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currentIndex === mediaFiles.length - 1}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 275,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
