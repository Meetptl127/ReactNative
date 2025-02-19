import api from "./Axios"; // Import the Axios instance

const USERS_ENDPOINT = "/api/users";

// Fetch users
export const fetchUsers = async (page = 1) => {
  try {
    const response = await api.get(`${USERS_ENDPOINT}?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Create user
export const createUser = async (userData) => {
  try {
    const response = await api.post(USERS_ENDPOINT, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`${USERS_ENDPOINT}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    await api.delete(`${USERS_ENDPOINT}/${userId}`);
    return userId;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
