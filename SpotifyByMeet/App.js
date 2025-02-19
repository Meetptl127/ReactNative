// App.js
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./Redux/store";

// Import screens
import SplashScreen from "./screens/SplashScreen";
import AdminScreen from "./screens/AdminScreen";
import UserScreen from "./screens/UserScreen";
import LikedScreen from "./screens/LikedScreen";
import SingleAuthorScreen from "./screens/SingleAuthorScreen";
import MusicPlayScreen from "./screens/MusicPlayScreen";
import RoleSelectionScreen from "./screens/RoleSelectionScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen
            name="User"
            component={UserScreen}
            screenOptions={{ headerShown: true }}
          />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="Liked" component={LikedScreen} />
          <Stack.Screen name="Author" component={SingleAuthorScreen} />
          <Stack.Screen name="MusicPlayScreen" component={MusicPlayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
