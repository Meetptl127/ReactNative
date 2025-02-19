import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Make sure the correct reducer is imported

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
