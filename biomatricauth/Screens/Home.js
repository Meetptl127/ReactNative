import React, { useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const Home = () => {
  useEffect(() => {
    (async () => {
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log("Supported authentication types:", supportedTypes);
      // On iOS:
      // 1 -> Fingerprint (Touch ID)
      // 2 -> Face ID
      // On Android, the numbers may vary depending on the manufacturer.
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      // Check if the device supports biometric hardware
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert(
          "Error",
          "Biometric authentication is not supported on this device."
        );
        return;
      }

      // Check if biometrics are enrolled on the device
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert(
          "Error",
          "No biometric credentials found. Please set up biometrics on your device."
        );
        return;
      }

      // Initiate authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Biometrics",
        fallbackLabel: "Enter Password", // Optional: customize fallback text
      });

      if (result.success) {
        Alert.alert("Success", "Authentication Successful!");
        // Continue with your logic here.
      } else {
        Alert.alert("Failed", "Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert("Error", "An error occurred during authentication.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>
      <Button title="Login with Biometrics" onPress={handleBiometricAuth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;
