import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const ArtworkAndInfo = ({ artwork, title, artist }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: artwork }} style={styles.artwork} />
      <View style={styles.songInfoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },
  artwork: { width: 300, height: 300, borderRadius: 10, marginBottom: 30 },
  songInfoContainer: { alignItems: "center" },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  artist: { color: "#1DB954", fontSize: 18, marginTop: 5 },
});
