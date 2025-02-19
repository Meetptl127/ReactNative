import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../user.service";

// Fetch users
export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (page) => {
    return await fetchUsers(page);
  }
);

// Create user
export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response; // Ensure the API returns the created user
  }
);

// Update user
export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }) => {
    const response = await updateUser(userId, userData);
    return { id: userId, ...userData }; // Mock the updated user data
  }
);

// Delete user
export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    return await deleteUser(userId);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload]; // Append new users
        state.page += 1; // Increment page
        state.hasMore = action.payload.length > 0; // Check if more users exist
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add new user
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ); // Update user
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload); // Remove user
      });
  },
});

export default userSlice.reducer;
