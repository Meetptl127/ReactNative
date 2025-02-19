import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageSlide from "./screens/ImageSlide";
import AutoImageslide from "./screens/AutoImageslide";
import ManualImageSlider from "./screens/ManualImageSlider";
import LastSlider from "./screens/LastSlider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="imageslider" component={ImageSlide} />
        <Stack.Screen name="AutoImageslide" component={AutoImageslide} />
        <Stack.Screen name="ManualImageSlider" component={ManualImageSlider} />
        <Stack.Screen name="LastSlider" component={LastSlider} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
