import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../Redux/slices/musicSlice";

export default function UserScreen({ navigation }) {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.music.songs);
  const currentSong = useSelector((state) => state.music.currentSong); // Get currently playing song
  const [search, setSearch] = useState("");

  // Filter songs based on search input
  const filteredSongs =
    search.trim() === ""
      ? songs
      : songs.filter(
          (song) =>
            song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.artist.toLowerCase().includes(search.toLowerCase())
        );

  const toggleLikeSong = (songId) => {
    dispatch(toggleLike(songId));
  };

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
      <TouchableOpacity onPress={() => toggleLikeSong(item.id)}>
        <Text style={styles.likeIcon}>{item.liked ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Music by Meet</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Liked")}>
          <Text style={styles.likeButton}>❤️</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs or artists..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {/* Song List */}
      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderSongItem}
        ListEmptyComponent={<Text style={styles.empty}>No songs found.</Text>}
      />

      {/* Bottom Music Controller */}
      {currentSong && (
        <TouchableOpacity
          style={styles.bottomPlayer}
          onPress={() =>
            navigation.navigate("MusicPlayScreen", { songId: currentSong.id })
          }
        >
          <Image
            source={{ uri: currentSong.artwork }}
            style={styles.bottomImage}
          />
          <View style={styles.bottomInfo}>
            <Text style={styles.bottomTitle}>{currentSong.title}</Text>
            <Text style={styles.bottomArtist}>{currentSong.artist}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.playIcon}>▶️</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#191414", padding: 10 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 45,
    marginBottom: 10,
  },
  header: { color: "#1DB954", fontSize: 28, fontWeight: "bold" },
  likeButton: { fontSize: 22, color: "red" },
  searchInput: {
    backgroundColor: "#282828",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  songItem: {
    flexDirection: "row",
    backgroundColor: "#282828",
    borderRadius: 8,
    marginBottom: 5,
    padding: 10,
    alignItems: "center",
  },
  songImage: { width: 50, height: 50, borderRadius: 4, marginRight: 10 },
  songInfo: { flex: 1 },
  songTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  songArtist: { color: "#1DB954", fontSize: 14 },
  likeIcon: { fontSize: 24, color: "red", paddingHorizontal: 10 },
  empty: { color: "#fff", textAlign: "center", marginTop: 20 },

  // Bottom Player
  bottomPlayer: {
    flexDirection: "row",
    backgroundColor: "#282828",
    padding: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomImage: { width: 50, height: 50, borderRadius: 4, marginRight: 10 },
  bottomInfo: { flex: 1 },
  bottomTitle: { color: "#fff", fontSize: 16 },
  bottomArtist: { color: "#1DB954", fontSize: 14 },
  playIcon: { fontSize: 24, color: "#fff" },
});
