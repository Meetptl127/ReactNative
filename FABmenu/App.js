import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Screens/Home";

import CarDetails from "./Screens/CarDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "FAB menu" }}
        />

        <Stack.Screen name="CarDetails" component={CarDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
