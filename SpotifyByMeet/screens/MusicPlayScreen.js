import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../Redux/slices/musicSlice";
import { ArtworkAndInfo } from "../components/ArtworkAndInfo";
import { ProgressSlider } from "../components/ProgressSlider";
import { PlayerControls } from "../components/PlayerControls";
import { BottomControls } from "../components/BottomControls";

let globalSound = null; // Store global sound instance

export default function MusicPlayScreen({ route, navigation }) {
  const { songId } = route.params;
  const dispatch = useDispatch();
  const songsList = useSelector((state) => state.music.songs);

  const initialIndex = songsList.findIndex((song) => song.id === songId);
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const currentSong = songsList[currentIndex];

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    loadAndPlaySound(currentSong);
    return () => cleanupSound();
  }, [currentIndex]);

  const cleanupSound = async () => {
    if (globalSound) {
      await globalSound.stopAsync();
      await globalSound.unloadAsync();
      globalSound = null;
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);

      if (status.didJustFinish && !status.isLooping) {
        playNext();
      }
    }
  };

  async function loadAndPlaySound(songToPlay) {
    try {
      await cleanupSound(); // Stop and unload any playing sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: songToPlay.url },
        { shouldPlay: true }
      );
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      globalSound = newSound; // Store globally to prevent multiple instances
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  const togglePlayPause = async () => {
    if (globalSound) {
      if (isPlaying) {
        await globalSound.pauseAsync();
      } else {
        await globalSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * songsList.length);
    } else {
      nextIndex =
        currentIndex < songsList.length - 1
          ? currentIndex + 1
          : repeat
          ? 0
          : currentIndex;
    }
    setCurrentIndex(nextIndex);
  };

  const playPrevious = () => {
    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * songsList.length);
    } else {
      prevIndex =
        currentIndex > 0
          ? currentIndex - 1
          : repeat
          ? songsList.length - 1
          : currentIndex;
    }
    setCurrentIndex(prevIndex);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const onToggleLike = () => {
    dispatch(toggleLike(currentSong.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ArtworkAndInfo
        artwork={currentSong.artwork}
        title={currentSong.title}
        artist={currentSong.artist}
      />

      <ProgressSlider
        position={position}
        duration={duration}
        onSlidingComplete={async (value) => {
          if (globalSound) {
            await globalSound.setPositionAsync(value);
          }
        }}
      />

      <PlayerControls
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        playNext={playNext}
        playPrevious={playPrevious}
        shuffle={shuffle}
        toggleShuffle={toggleShuffle}
        repeat={repeat}
        toggleRepeat={toggleRepeat}
      />

      <BottomControls
        onToggleLike={onToggleLike}
        currentSong={currentSong}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
    alignItems: "center",
    padding: 20,
  },
});
