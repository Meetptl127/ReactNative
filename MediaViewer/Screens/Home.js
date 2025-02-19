import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const mediaFiles = [
  { name: "Image1", type: "image", uri: require("../Data/img1.jpg") },
  { name: "Image2", type: "image", uri: require("../Data/img2.jpg") },
  { name: "Video1", type: "video", uri: require("../Data/Video1.mp4") },
  { name: "Video2", type: "video", uri: require("../Data/Video2.mp4") },
  {
    name: "Audio1",
    type: "audio",
    uri: require("../Data/416.mp3"),
  },
  {
    name: "Audio2",
    type: "audio",
    uri: require("../Data/akm_firing_pubg.mp3"),
  },
  {
    name: "Example PDF",
    type: "pdf",
    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    name: "Example PPT",
    type: "ppt",
    uri: "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx",
  },
  {
    name: "Data Excel",
    type: "excel",
    uri: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
  },
];

export default function Home({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("MediaViewer", {
          mediaFiles,
          initialIndex: mediaFiles.indexOf(item),
        })
      }
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaFiles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Light gray background
  },
  itemContainer: {
    backgroundColor: "#fff", // White background for each item
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000", // Shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  itemText: {
    fontSize: 18,
    color: "#333", // Dark text color for contrast
    fontWeight: "500", // Semi-bold text
  },
});
