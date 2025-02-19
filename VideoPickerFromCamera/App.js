import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VideoUploadScreen from "./screens/VideoUpload";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VideoUpload" component={VideoUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
