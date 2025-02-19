import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

export const ProgressSlider = ({ position, duration, onSlidingComplete }) => {
  const formatTime = (millis) => {
    if (!millis) return "0:00";
    const totalSeconds = millis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#fff"
        thumbTintColor="#1DB954"
        onSlidingComplete={onSlidingComplete}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "90%", marginVertical: 20 },
  slider: { width: "100%", height: 40 },
  timeContainer: { flexDirection: "row", justifyContent: "space-between" },
  timeText: { color: "#fff", fontSize: 12 },
});
