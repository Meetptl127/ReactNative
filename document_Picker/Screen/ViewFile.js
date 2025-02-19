import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";

export default function ViewFile({ route }) {
  const { uri, name } = route.params;
  const [fileUri, setFileUri] = useState(null);

  useEffect(() => {
    const prepareFile = async () => {
      try {
        if (uri.startsWith("file://")) {
          // Use FileSystem to access the file
          const localUri = await FileSystem.getContentUriAsync(uri);
          setFileUri(localUri);
        } else {
          // For remote URLs
          setFileUri(uri);
        }
      } catch (error) {
        console.error("Error preparing file:", error);
      }
    };

    prepareFile();
  }, [uri]);

  if (!fileUri) {
    return (
      <View style={styles.container}>
        <Text>Loading file...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <WebView
        source={{ uri: fileUri }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
