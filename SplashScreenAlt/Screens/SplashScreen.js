import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "../assets/icon.png";
import SplashBackground from "../assets/Splash.png"; // Background image
import { LinearGradient } from "expo-linear-gradient"; // Importing gradient component

export default function SplashScreen({ onGetStarted }) {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={SplashBackground} style={styles.backgroundImage} />

      {/* Gradient Overlay from White to Transparent */}
      <LinearGradient
        colors={["#ffffff", "transparent"]} // Gradient from white to transparent
        style={styles.gradientOverlay}
      />

      <View style={styles.iconContainer}>
        <Image source={Icon} style={styles.icon} />
      </View>

      {/* Gradient Button */}
      <LinearGradient
        colors={["#0B01F5CC", "#5F0BA7CC", "#F82A6FCC"]} // Gradient colors
        start={{ x: 0, y: 0 }} // Start point (left)
        end={{ x: 1, y: 0 }} // End point (right)
        style={styles.gradientButton}
      >
        <TouchableOpacity onPress={onGetStarted} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Required for absolute positioning of images
  },
  backgroundImage: {
    position: "absolute", // Positioning background image behind everything
    width: Dimensions.get("window").width, // Full screen width
    height: Dimensions.get("window").height, // Full screen height
    resizeMode: "cover", // Ensures the background covers the screen
  },
  gradientOverlay: {
    position: "absolute", // Position gradient overlay on top of the background image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Make the gradient cover the whole screen
  },
  iconContainer: {
    position: "absolute", // Position icon at the top
    top: "15%", // Adjust this value to control the position of the icon
  },
  icon: {
    width: 274, // Size of the icon
    height: 169,
    resizeMode: "contain",
  },
  gradientButton: {
    position: "absolute", // Position button at the bottom
    bottom: 50, // Adjust the value to control the position of the button from the bottom
    width: "80%", // Button width
    borderRadius: 25, // Rounded corners for the button
    paddingVertical: 15, // Vertical padding for the button
    alignItems: "center", // Center text inside the button
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18, // Font size for the button text
    color: "#fff", // Text color (white)
    fontWeight: "bold", // Make text bold
  },
});
