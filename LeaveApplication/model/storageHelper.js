import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "./User";

// Save user data
/* export const saveUserData = async (userData) => {
  try {
    const user = new User(
      userData.data.id,
      userData.data.fullName,
      userData.data.email
    );
    await AsyncStorage.setItem("user_data", user.toJson());
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};
 */
/* export const saveUserData = async (userData) => {
  try {
    if (!userData || !userData.data) {
      throw new Error("Invalid user data received");
    }

    const user = new User(
      userData.data.id, // Ensure 'data' exists
      userData.data.name, // Updated from 'fullName' to 'name'
      userData.data.email
    );

    await AsyncStorage.setItem("user_data", user.toJson());
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}; */

export const saveUserData = async (userData) => {
  try {
    if (!userData || !userData.id || !userData.email || !userData.name) {
      throw new Error("Invalid user data received");
    }

    const user = new User(userData.id, userData.name, userData.email);
    await AsyncStorage.setItem("user_data", user.toJson());

    console.log("User data saved successfully:", user);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const storedUser = await AsyncStorage.getItem("user_data");
    if (!storedUser) return null;
    return User.fromJson(JSON.parse(storedUser));
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

// Clear user data on logout
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("user_data");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};
