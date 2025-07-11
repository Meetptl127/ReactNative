import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Internet from "./Screens/Internet";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="internet" component={Internet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
