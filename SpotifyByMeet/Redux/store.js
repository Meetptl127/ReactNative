// Redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./slices/musicSlice";

const store = configureStore({
  reducer: {
    music: musicReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
