import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageUpload from "./screens/imageupload";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Image Upload"
          component={ImageUpload}
          options={{
            headerStyle: {
              backgroundColor: "#FF9500",
            },
            headerTitleStyle: {
              color: "#FFF",
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
