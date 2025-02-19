import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Navigation container for navigation
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home"; // Import Home.js

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Set title for the Home screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Tab Menu" }} // Title for the Home screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
