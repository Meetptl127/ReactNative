import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./Screens/SplashScreen";
import { useEffect, useState } from "react";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  const [isShowSplashScreen, setisShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisShowSplashScreen(false);
    }, 3000);

    // Cleanup timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means it runs only once after initial render

  return <>{isShowSplashScreen ? <SplashScreen /> : <HomeScreen />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
