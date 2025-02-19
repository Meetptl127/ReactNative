// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LeaveApplicationScreen from "./screens/LeaveApplicationScreen";
import AdminScreen from "./screens/AdminScreen";
import AdminLoginScreen from "./screens/AdminLogin";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#4e8bed" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Leave"
          component={LeaveApplicationScreen}
          options={{
            title: "Leave Application",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: "Admin Panel",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{
            title: "Admin Login",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
