// screens/SingleAuthorScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

export default function SingleAuthorScreen({ route, navigation }) {
  const { author } = route.params;
  const authorSongs = useSelector((state) =>
    state.music.songs.filter((song) => song.author === author)
  );

  const renderSongItem = ({ item }) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() => navigation.navigate("MusicPlay", { song: item })}
    >
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{author}'s Songs</Text>
      <FlatList
        data={authorSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderSongItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No songs for this author.</Text>
        }
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
    padding: 10,
  },
  header: {
    color: "#1DB954",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
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
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#1DB954",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  backText: {
    color: "#191414",
    fontWeight: "bold",
  },
});
