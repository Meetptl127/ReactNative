import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/Home";
import RealTimeLocationScreen from "./screen/RealTimeLocationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="RealTimeLocationScreen"
          component={RealTimeLocationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
