import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Dimensions } from "react-native";

import Home from "./screens/HomeScreen";
import Guest from "./screens/GuestSpekars";
import Search from "./screens/Search";
import Profile from "./screens/Profile";

import HomeIcon from "./components/Ui/HomeIcon";
import GuestIcon from "./components/Ui/GuestIcon";
import SearchIcon from "./components/Ui/SearchIcon";
import ProfileIcon from "./components/Ui/ProfileIcon";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let icon;

            // Determine the correct icon for each tab
            switch (route.name) {
              case "Home":
                icon = <HomeIcon width={size} height={size} fill={color} />;
                break;
              case "Guest":
                icon = <GuestIcon width={size} height={size} fill={color} />;
                break;
              case "Search":
                icon = <SearchIcon width={size} height={size} fill={color} />;
                break;
              case "Profile":
                icon = <ProfileIcon width={size} height={size} fill={color} />;
                break;
              default:
                icon = null;
            }

            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: height * 0.01, // Responsive padding based on screen height
                  //backgroundColor: focused ? "#F2ECFE" : "transparent",
                  borderTopWidth: focused ? 2 : 0, // Add top border when focused
                  borderTopColor: focused ? "#0D01AC" : "transparent",
                  paddingHorizontal: width * 0.095, // Responsive padding based on screen width
                }}
              >
                {icon}
              </View>
            );
          },
          tabBarLabel: ({ focused, color }) => (
            <View
              style={{
                flexDirection: "column", // Stack the icon and text vertically
                justifyContent: "center", // Center the content vertically
                alignItems: "center", // Align both icon and text in the center

                width: "100%", // Make sure the label takes full width of the tab
                paddingHorizontal: 0, // No horizontal padding for the container to allow full width
              }}
            >
              <Text
                style={{
                  color: focused ? "#0D01AC" : color,
                  fontSize: 12,
                  textAlign: "center", // Ensure the text is horizontally centered
                  // backgroundColor: focused ? "#F2ECFE" : "transparent", // Apply background color to the text
                  paddingVertical: height * 0.005, // Adjust text vertical padding based on screen height
                  paddingHorizontal: 0, // Make sure the padding is zero so text fills the container
                  width: 70, // Ensures that the text container takes up the full width
                }}
              >
                {route.name}
              </Text>
            </View>
          ),
          tabBarActiveTintColor: "#0D01AC",
          tabBarInactiveTintColor: "#111111",
          tabBarActiveBackgroundColor: "#F2ECFE",
          tabBarStyle: {
            height: 60, // Fixed height of the tab bar
            justifyContent: "center",

            // borderTopWidth: 2, // Add a top border
          },
          /*  tabBarButton: (props) => (
            <View onTouchEnd={() => props.onPress?.()}>{props.children}</View>
          ), */
          //tabBarPressColor: "transparent", // Set the press color to transparent
          //tabBarPressOpacity: 1,
          //tabBarShowLabel: false, // Hide the label if you are using custom labels
        })}
      >
        <BottomTab.Screen name="Home" component={Home} />
        <BottomTab.Screen name="Guest" component={Guest} />
        <BottomTab.Screen name="Search" component={Search} />
        <BottomTab.Screen name="Profile" component={Profile} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
