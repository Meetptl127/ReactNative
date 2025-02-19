import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Topics from "./screens/Topics";
import Messages from "./screens/Messages";
import Notification from "./screens/Notifictions";
import BookMarkes from "./screens/BookMarkes";
import Profile from "./screens/Profile";

import CustomDrawerContent from "./components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={30}
            color="black"
            style={{ marginLeft: 10 }} // Optional: Add margin for better placement
            onPress={() => navigation.openDrawer()} // Open drawer
          />
        ),
      })}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Topics" component={Topics} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="BookMarkes" component={BookMarkes} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: "100%",
    backgroundColor: "gray",
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24, // Makes the image round
  },
  name: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  item: {
    fontSize: 14,
    fontWeight: "300",
    paddingVertical: 10,
    color: "#fff",
  },
});
