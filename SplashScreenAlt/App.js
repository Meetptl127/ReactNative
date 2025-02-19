import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./Screens/SplashScreen";
import { useState } from "react";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  const [isShowSplashScreen, setisShowSplashScreen] = useState(true);

  // Function to navigate to HomeScreen when 'Get Started' is pressed
  const handleGetStarted = () => {
    setisShowSplashScreen(false); // Hide splash screen and show home screen
  };

  return (
    <>
      {isShowSplashScreen ? (
        <SplashScreen onGetStarted={handleGetStarted} />
      ) : (
        <HomeScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
