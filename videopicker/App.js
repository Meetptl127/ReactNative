import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import videoupload from "./screens/videoupload";
import Videoupload from "./screens/videoupload";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Videoupload" component={Videoupload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
