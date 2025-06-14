import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBordingScreen from "./screens/OnBordingScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBordingScreen">
        <Stack.Screen
          name="OnBordingScreen"
          component={OnBordingScreen}
          options={{ headerShown: false }} // Hide header for onboarding
        />
        {/* Home Screen */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerTitle: "Welcome Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
