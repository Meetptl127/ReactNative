import { createSlice } from "@reduxjs/toolkit";
import { musicData } from "../../data/musicData"; // adjust the import path as needed

const initialState = {
  songs: musicData, // Initialize with your song data
  likedSongs: [], // Store liked songs separately
  currentSong: null, // Track the currently playing song
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // Add a new song to the list
    addSong: (state, action) => {
      state.songs.push({ ...action.payload, liked: false });
    },

    // Toggle like/unlike for a song
    toggleLike: (state, action) => {
      const song = state.songs.find((song) => song.id === action.payload);
      if (song) {
        song.liked = !song.liked;

        if (song.liked) {
          state.likedSongs.push(song); // Add to liked songs
        } else {
          state.likedSongs = state.likedSongs.filter((s) => s.id !== song.id); // Remove if unliked
        }
      }
    },

    // Set the currently playing song
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { addSong, toggleLike, setCurrentSong } = musicSlice.actions;
export default musicSlice.reducer;
