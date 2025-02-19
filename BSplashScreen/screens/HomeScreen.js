import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  Alert,
  BackHandler,
} from "react-native";

function HomeScreen() {
  // Function to handle closing the app on Android
  const closeApp = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp(); // This will close the app on Android
    } else {
      Alert.alert("Oops!", "Closing the app is not supported on iOS.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Displaying a "Merry Christmas" message */}
      <Text style={styles.message}>Merry Christmas!</Text>

      {/* Button to close the app */}
      <Button title="Close App" onPress={closeApp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  message: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D32F2F", // Christmas red color
    marginBottom: 20,
  },
});

export default HomeScreen;
