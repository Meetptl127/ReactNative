import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";

import Home from "./screen/Home";
import Screen1 from "./screen/Screen1";
import Screen2 from "./screen/Screen2";
import React, { useEffect } from "react";
import { createNavigationContainerRef } from "@react-navigation/native";

// Create a navigation ref
export const navigationRef = createNavigationContainerRef();

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Handle notifications when the app is running in the foreground or background
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const screen = response.notification.request.content.data.screen;
        if (screen && navigationRef.isReady()) {
          // Navigate to the specified screen
          navigationRef.navigate(screen);
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
