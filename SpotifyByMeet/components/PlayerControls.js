import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export const PlayerControls = ({
  isPlaying,
  togglePlayPause,
  playNext,
  playPrevious,
  shuffle,
  toggleShuffle,
  repeat,
  toggleRepeat,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleShuffle}>
        <Text style={[styles.controlIcon, shuffle && styles.activeIcon]}>
          🔀
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={playPrevious}>
        <Text style={styles.controlIcon}>⏮️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
        <Text style={styles.playIcon}>{isPlaying ? "⏸️" : "▶️"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={playNext}>
        <Text style={styles.controlIcon}>⏭️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleRepeat}>
        <Text style={[styles.controlIcon, repeat && styles.activeIcon]}>
          🔁
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  controlIcon: { fontSize: 28, color: "#fff" },
  activeIcon: { color: "#1DB954" },
  playButton: {
    backgroundColor: "#1DB954",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: { fontSize: 32, color: "#191414" },
});
