import { Image, View, StyleSheet, Dimensions, Text } from "react-native";
import React from "react";
import Icon from "../assets/icon.png";
import Logo1 from "../assets/logor 1.png";
import SplashBackground from "../assets/Splash.jpg"; // Background image

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={SplashBackground} style={styles.backgroundImage} />
      <View style={styles.iconContainer}>
        <Image source={Icon} style={styles.icon} />
      </View>
      <Text style={styles.text}>
        Welcome to the{"\n"}
        <Text style={styles.boldText}>Quality Summit</Text>
      </Text>
      <Text style={styles.poweredByText}>Powered By</Text>
      <View style={styles.logoContainer}>
        <Image source={Logo1} style={styles.logo} />
      </View>
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
  iconContainer: {
    position: "absolute", // Position icon at the top
    top: "15%", // Adjust this value to control the position of the icon
  },
  icon: {
    width: 274, // Size of the icon
    height: 169,
    resizeMode: "contain",
  },
  logoContainer: {
    position: "absolute", // Position logo at the bottom
    bottom: 10, // Adjust this value to control the position of the logo
  },
  text: {
    position: "absolute", // Position the text below the icon
    top: "50%", // Adjust the vertical position of the text
    //marginTop: 20, // Adds space after the icon, you can adjust the value
    textAlign: "center", // Center-align the text horizontally
    fontSize: 30, // Font size of the text
    color: "#000000", // Color for the first line "Welcome to the"
    width: 244.74, // Width for the text container
    height: 74, // Height for the text container
  },
  boldText: {
    color: "#004F8A", // Color for "Quality Summit"
    fontWeight: "bold", // Make the second part of the text bold
  },
  poweredByText: {
    position: "absolute", // Position it above the logo
    bottom: 150, // Adjust this value to control the position of the text above the logo
    textAlign: "center", // Center the text horizontally
    fontSize: 10, // Font size for "Powered By"
    fontWeight: "bold", // Bold font weight
    color: "black", // Black color for the text
  },
  logo: {
    width: 157, // Size of the logo
    height: 150,
    resizeMode: "contain",
  },
});
