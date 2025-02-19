import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as MediaLibrary from "expo-media-library";

const images = [
  {
    id: "1",
    name: "Image 1",
    uri: require("../assets/navy-blue-sport-sedan-road-side-view.jpg"),
  },
  {
    id: "2",
    name: "Image 2",
    uri: require("../assets/silver-sport-coupe-driving-highway.jpg"),
  },
  {
    id: "3",
    name: "Image 3",
    uri: require("../assets/vintage-bordeaux-sedan-drive-sunlight.jpg"),
  },
  {
    id: "4",
    name: "Image 4",
    uri: require("../assets/white-sport-sedan-with-colorful-tuning-road.jpg"),
  },
  {
    id: "5",
    name: "Image 5",
    uri: require("../assets/yellow-sport-sedan-road-side-view.jpg"),
  },
];

const Home = () => {
  const handleDownload = async (imageUri, itemId) => {
    try {
      // Get the asset from the URI
      const asset = Asset.fromModule(imageUri);
      if (!asset.localUri) {
        await asset.downloadAsync();
      }

      // Create a unique file name
      const fileName = `${itemId}_${Date.now()}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Copy the image to app's document directory
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: fileUri,
      });

      // Request media library permissions
      const permissionResult = await MediaLibrary.requestPermissionsAsync();
      if (permissionResult.status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to save the file."
        );
        return;
      }

      // Save to media library
      const mediaAsset = await MediaLibrary.createAssetAsync(fileUri);

      // Get or create 'Download' album
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album === null) {
        await MediaLibrary.createAlbumAsync("Download", mediaAsset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([mediaAsset], album, false);
      }

      Alert.alert(
        "Download Complete!",
        "Image has been saved to your Photos/Downloads."
      );
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Download failed. Please try again.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.uri} style={styles.image} />
      <Text style={styles.imageName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => handleDownload(item.uri, item.id)}
      >
        <Text style={styles.buttonText}>Save to Device</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageName: {
    fontSize: 16,
    marginBottom: 8,
  },
  downloadButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;
