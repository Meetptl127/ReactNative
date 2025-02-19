import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const selectLikedSongs = createSelector(
  (state) => state.music.songs,
  (songs) => songs.filter((song) => song.liked)
);

const LikedScreen = ({ navigation }) => {
  const likedSongs = useSelector(selectLikedSongs);

  const renderSongItem = ({ item }) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() =>
        navigation.navigate("MusicPlayScreen", { songId: item.id })
      }
    >
      <Image source={{ uri: item.artwork }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liked Songs ❤️</Text>
      {likedSongs.length === 0 ? (
        <Text style={styles.empty}>No liked songs found.</Text>
      ) : (
        <FlatList
          data={likedSongs}
          keyExtractor={(item) => item.id}
          renderItem={renderSongItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#191414", padding: 10 },

  header: {
    color: "#1DB954",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 45,
    marginVertical: 10,
  },

  songItem: {
    flexDirection: "row",
    backgroundColor: "#282828",
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
  },

  songImage: { width: 50, height: 50, borderRadius: 4, marginRight: 10 },

  songInfo: { flex: 1 },

  songTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  songArtist: { color: "#1DB954", fontSize: 14 },

  empty: { color: "#fff", textAlign: "center", marginTop: 20 },
});

export default LikedScreen;
