import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./components/redux/store";

import Home from "./screens/Home";
import CreateUserScreens from "./screens/CreateUserScreen";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Users List" }}
          />
          <Stack.Screen
            name="CreateUser"
            component={CreateUserScreens}
            options={{ title: "Add / Edit User" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
