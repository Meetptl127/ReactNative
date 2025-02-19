import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export const BottomControls = ({ onToggleLike, currentSong, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggleLike}>
        <Text style={styles.likeIcon}>{currentSong.liked ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  likeIcon: { fontSize: 28, color: "#fff" },
  backButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  backText: { color: "#191414", fontSize: 16, fontWeight: "bold" },
});
