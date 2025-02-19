import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  LogBox,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as IntentLauncher from "expo-intent-launcher";
import Logo from "../assets/Logo"; // Your logo component

// Suppress specific warnings if needed
LogBox.ignoreLogs(["Warning: ..."]);

const Internet = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      console.log(`Internet connected: ${state.isConnected}`);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // For Android: Open Wi-Fi settings directly
  const openWiFiSettings = () => {
    console.log("Attempting to open Wi-Fi settings");

    if (Platform.OS === "android") {
      try {
        IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.WIFI_SETTINGS
        )
          .then(() => console.log("Wi-Fi settings opened successfully"))
          .catch((err) => console.error("Failed to open Wi-Fi settings:", err));
      } catch (error) {
        console.error("Error opening Wi-Fi settings:", error);
        Linking.openSettings(); // Fallback to opening general settings
      }
    } else {
      Linking.openURL("app-settings:"); // Open general settings for iOS
    }
  };

  // For Android: Open Mobile Data settings directly
  const openMobileDataSettings = () => {
    console.log("Attempting to open Mobile Data settings");

    if (Platform.OS === "android") {
      try {
        IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.DATA_ROAMING_SETTINGS
        )
          .then(() => console.log("Mobile Data settings opened successfully"))
          .catch((err) =>
            console.error("Failed to open Mobile Data settings:", err)
          );
      } catch (error) {
        console.error("Error opening Mobile Data settings:", error);
        Linking.openSettings(); // Fallback to opening general settings
      }
    } else {
      Linking.openURL("app-settings:"); // Open general settings for iOS
    }
  };

  // Close the internet status popup
  const closePopup = () => {
    setIsConnected(true);
  };

  // When the internet is connected
  if (isConnected) {
    return (
      <View style={styles.connectedContainer}>
        <Text style={styles.connectedText}>🌐 Internet Connected</Text>
      </View>
    );
  }

  // When the internet is disconnected
  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        {/* Top Bar with Heading and Close Button */}
        <View style={styles.topBar}>
          <Text style={styles.heading}>No Internet Connection</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* SVG Logo (Replace this with your actual logo) */}
        <Logo width={300} height={300} />

        {/* Wi-Fi and Mobile Data Buttons in Row */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.wifiButton]}
            onPress={openWiFiSettings}
          >
            <Text style={styles.buttonText}>Wi-Fi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.mobileDataButton]}
            onPress={openMobileDataSettings}
          >
            <Text style={styles.buttonText}>Mobile Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  topBar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#D6A7E5", // Light Purple
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // White Text for Heading
  },
  closeButton: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff", // White Text for Close Button
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  wifiButton: {
    backgroundColor: "#28a745", // Green color for Wi-Fi
  },
  mobileDataButton: {
    backgroundColor: "#ff5722", // Red color for Mobile Data
  },
  buttonText: {
    color: "#fff", // White Text for Button Text
    fontSize: 16,
    textAlign: "center",
  },
  connectedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  connectedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default Internet;
