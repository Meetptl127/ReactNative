import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av"; // Import Audio from expo-av for recording and playing sounds
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons for UI

export default function Homes() {
  // State to manage the current recording instance
  const [recording, setRecording] = useState(null);

  // State to store all recordings (with metadata like file URI, duration, and playing status)
  const [recordings, setRecordings] = useState([]);

  // State to track the time for the current recording in seconds
  const [recordingTime, setRecordingTime] = useState(0);

  // State to store reference to the timer for updating recording time
  const [timer, setTimer] = useState(null);

  // State to track the index of the currently playing recording
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  // State to store any error messages (like permission issues)
  const [message, setMessage] = useState("");

  // Effect hook to start/stop a timer when recording starts/stops
  useEffect(() => {
    // If recording is active, start the timer to count seconds
    if (recording) {
      const interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(interval); // Save the timer reference
    } else {
      // If no recording, clear the timer and reset the time
      clearInterval(timer);
      setTimer(null);
      setRecordingTime(0);
    }
  }, [recording]); // Effect hook runs when `recording` state changes

  // Function to ensure audio plays through the speaker instead of the earpiece
  async function forceSpeakerPlayback() {
    try {
      // Set audio modes for iOS and Android
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error("Error setting audio mode:", error); // Log any error if occurs
    }
  }

  // Function to start recording audio
  async function startRecording() {
    try {
      // Request permission to access the microphone
      const permission = await Audio.requestPermissionsAsync();

      // If permission is granted, proceed with setting up the recording
      if (permission.status === "granted") {
        // Set audio mode for recording (for iOS and Android compatibility)
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: false,
        });

        // Create a high-quality recording instance
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        // Save the recording instance to state
        setRecording(recording);
      } else {
        // If permission is not granted, show a message to the user
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err); // Log any error during the recording start
    }
  }

  // Function to stop the ongoing recording
  async function stopRecording() {
    try {
      if (!recording) return; // If no recording is active, do nothing

      // Clear the interval timer and reset the recording time
      clearInterval(timer);
      setRecordingTime(0);

      // Stop and unload the recording
      await recording.stopAndUnloadAsync();

      // Get the URI of the recording file
      const uri = recording.getURI();

      // Create a new sound object with the recorded file
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri });

      // Reset the `recording` state to null (no active recording)
      setRecording(null);

      // Update the list of recordings with the new recording details
      let updatedRecordings = [...recordings];
      updatedRecordings.push({
        sound,
        duration: `${recordingTime}s`, // Store the duration as a string
        file: uri, // Store the URI of the recorded file
        isPlaying: false, // Initially, set it to not playing
      });

      setRecordings(updatedRecordings); // Update the state with the new recordings list
    } catch (error) {
      console.error("Error stopping recording:", error); // Log any errors during stop
    }
  }

  // Function to play or pause a sound recording when clicked
  async function playPauseSound(index) {
    try {
      // Create a copy of the recordings list for modifications
      const updatedRecordings = [...recordings];

      // If a sound is currently playing and it's not the clicked one, stop the previous one
      if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
        const currentSound = updatedRecordings[currentPlayingIndex].sound;
        await currentSound.stopAsync();
        updatedRecordings[currentPlayingIndex].isPlaying = false;
      }

      // Get the clicked recording object
      const recordingLine = updatedRecordings[index];

      // If the recording is already playing, pause it
      if (recordingLine.isPlaying) {
        await recordingLine.sound.pauseAsync();
        recordingLine.isPlaying = false;
      } else {
        // Set audio to force speaker playback
        await forceSpeakerPlayback();

        // Set max volume for playback
        await recordingLine.sound.setVolumeAsync(1.0);

        // Replay the sound
        await recordingLine.sound.replayAsync();
        recordingLine.isPlaying = true;
        setCurrentPlayingIndex(index); // Set the current playing index

        // Listen for playback status and stop the sound when it finishes
        recordingLine.sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded && status.didJustFinish) {
            await recordingLine.sound.stopAsync();
            updatedRecordings[index].isPlaying = false;
            setCurrentPlayingIndex(null); // Reset the current playing index
            setRecordings(updatedRecordings); // Update the recordings list
          }
        });
      }

      setRecordings(updatedRecordings); // Update the state with the modified recordings list
    } catch (error) {
      console.error("Error playing/pausing sound:", error); // Log any error during playback
    }
  }

  // Function to return a list of recorded files with play/pause buttons
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording #{index + 1} | {recordingLine.duration}
        </Text>
        {/* Play/Pause button for each recording */}
        <TouchableOpacity onPress={() => playPauseSound(index)}>
          <Icon
            name={recordingLine.isPlaying ? "pause" : "play"}
            size={24}
            color="blue"
          />
        </TouchableOpacity>
      </View>
    ));
  }

  // Function to clear all recordings and unload sounds from memory
  function clearRecordings() {
    recordings.forEach((recordingLine) => recordingLine.sound.unloadAsync());
    setRecordings([]); // Reset the recordings list
  }

  return (
    <View style={styles.container}>
      {/* Display error message if permission is not granted */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {/* Render list of recordings */}
      {getRecordingLines()}

      {/* Bottom container with recording controls and timer */}
      <View style={styles.bottomContainer}>
        <Text style={styles.timerText}>
          {recording ? `${recordingTime}s` : ""}
        </Text>
        {/* Button to start or stop recording */}
        <TouchableOpacity
          style={styles.recordButton}
          onPress={recording ? stopRecording : startRecording}
        >
          <Icon
            name={recording ? "stop" : "microphone"}
            size={32}
            color={recording ? "red" : "green"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  fill: {
    flex: 1,
    marginHorizontal: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  timerText: {
    fontSize: 20,
    marginRight: 10,
  },
  recordButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
  },
  message: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
});
