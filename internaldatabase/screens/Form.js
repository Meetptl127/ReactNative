import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { addUser, updateUser } from "../components/DatabaseManager"; // Import database functions

// Form component for adding or updating a user
export default function Form({ navigation, route }) {
  // Destructure user data and edit mode from route.params (if provided)
  const { user, isEdit } = route.params || {};

  // State variables for form fields
  const [username, setUsername] = useState(user?.username || ""); // Username input
  const [mobile, setMobile] = useState(user?.mobile || ""); // Mobile number input
  const [email, setEmail] = useState(user?.email || ""); // Email input
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Validate mobile number (10 digits required)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile.trim())) {
      newErrors.mobile = "Invalid mobile number (10 digits required)";
    }

    // Validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email address";
    }

    // Set errors state and return true if no errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      // Proceed only if form is valid
      try {
        if (isEdit) {
          // Update existing user in the database
          await updateUser(user.id, username, mobile, email);
        } else {
          // Add new user to the database
          await addUser(username, mobile, email);
        }
        navigation.goBack(); // Navigate back after successful submission
      } catch (error) {
        // Show error alert if something goes wrong
        Alert.alert("Error", "Failed to save user. Please try again.");
      }
    }
  };

  // Render the form UI
  return (
    <View style={styles.container}>
      {/* Username input field */}
      <TextInput
        style={[styles.input, errors.username && styles.inputError]} // Apply error style if validation fails
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text); // Update username state
          setErrors((prev) => ({ ...prev, username: "" })); // Clear username error
        }}
      />
      {/* Display username validation error */}
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      {/* Mobile number input field */}
      <TextInput
        style={[styles.input, errors.mobile && styles.inputError]} // Apply error style if validation fails
        placeholder="Mobile Number"
        keyboardType="phone-pad" // Show numeric keyboard
        value={mobile}
        onChangeText={(text) => {
          setMobile(text); // Update mobile state
          setErrors((prev) => ({ ...prev, mobile: "" })); // Clear mobile error
        }}
      />
      {/* Display mobile number validation error */}
      {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

      {/* Email input field */}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]} // Apply error style if validation fails
        placeholder="Email"
        keyboardType="email-address" // Show email keyboard
        value={email}
        onChangeText={(text) => {
          setEmail(text); // Update email state
          setErrors((prev) => ({ ...prev, email: "" })); // Clear email error
        }}
      />
      {/* Display email validation error */}
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Submit button (changes text based on edit mode) */}
      <Button
        title={isEdit ? "Update User" : "Add User"}
        onPress={handleSubmit} // Trigger form submission
      />
    </View>
  );
}

// Styles for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Add padding around the form
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10, // Space between inputs
    padding: 10,
    borderRadius: 5, // Rounded corners
  },
  inputError: {
    borderColor: "red", // Highlight input with error in red
  },
  errorText: {
    color: "red", // Error message color
    marginBottom: 10, // Space below error message
  },
});
