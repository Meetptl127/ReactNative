import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageUpload from "./screens/imageupload";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Image Upload From Camera"
          component={ImageUpload}
          options={{
            headerStyle: {
              backgroundColor: "#FF9500", // Orange background color
            },
            headerTitleStyle: {
              color: "#FFF", // White text color
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
