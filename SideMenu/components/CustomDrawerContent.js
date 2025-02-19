import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import HomeIcon from "./UI/HomeIcon";
import BookMarkesIcon from "./UI/BookMarkesIcon";
import MessageIcon from "./UI/MessageIcon";
import NotificationsIcon from "./UI/NotificationsIcon";
import ProfileIcon from "./UI/ProfileIcon";
import TopicsIcon from "./UI/TopicsIcon";
import HomeIconBlack from "./UI/HomeIconBlack";
import BookBlack from "./UI/BookBlack";
import Pr1 from "./UI/Pr1";
import NotificationBlack from "./UI/NotificationBlack";
import MessagesBlack from "./UI/MessagesBlack";
import TopicsBlack from "./UI/TopicsBlack";
import ProfileBlack from "./UI/ProfileBlack";
export default function CustomDrawerContent(props) {
  const window = Dimensions.get("window");

  const [activeItem, setActiveItem] = React.useState("");

  const handleNavigation = (screen) => {
    setActiveItem(screen);
    props.navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.menu}>
      {/* Profile Section */}
      <View style={styles.avatarContainer}>
        <Pr1 style={styles.avatar} />

        <Text style={styles.profileName}>Sophia Rose</Text>
        <Text style={styles.textL}>UX/UI Designer</Text>
      </View>

      {/* Border between Avatar and Items */}
      <View style={styles.separator}></View>

      {/* Drawer Items */}
      <TouchableOpacity
        onPress={() => handleNavigation("Home")}
        style={[
          styles.itemContainer,
          activeItem === "Home" && styles.activeItem,
        ]}
      >
        {/* <HomeIcon
          width={24}
          height={24}
          style={[
            activeItem === "Home" ? styles.activeIcon : styles.inactiveIcon,
            { tintColor: activeItem === "Home" ? "black" : "#333" }, // Dynamically set icon color
          ]}
        /> */}
        <View style={styles.iconContainer}>
          {activeItem === "Home" ? (
            <HomeIconBlack width={24} height={24} />
          ) : (
            <HomeIcon width={24} height={24} />
          )}
        </View>

        <Text style={[styles.item, activeItem === "Home" && styles.activeText]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Topics")}
        style={[
          styles.itemContainer,
          activeItem === "Topics" && styles.activeItem,
        ]}
      >
        {/* <TopicsIcon
          width={24}
          height={24}
          style={[
            activeItem === "Topics" ? styles.activeIcon : styles.inactiveIcon,
            { tintColor: activeItem === "Topics" ? "black" : "#333" }, // Dynamically set icon color
          ]}
        /> */}
        <View style={styles.iconContainer}>
          {activeItem === "Topics" ? (
            <TopicsBlack width={24} height={24} />
          ) : (
            <TopicsIcon width={24} height={24} />
          )}
        </View>

        <Text
          style={[styles.item, activeItem === "Topics" && styles.activeText]}
        >
          Topics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Messages")}
        style={[
          styles.itemContainer,
          activeItem === "Messages" && styles.activeItem,
        ]}
      >
        {/*    <MessageIcon
          width={24}
          height={24}
          style={[
            activeItem === "Messages" ? styles.activeIcon : styles.inactiveIcon,
            { tintColor: activeItem === "Messages" ? "black" : "#333" }, // Dynamically set icon color
          ]}
        /> */}
        <View style={styles.iconContainer}>
          {activeItem === "Messages" ? (
            <MessagesBlack height={24} width={24} />
          ) : (
            <MessageIcon height={24} width={24} />
          )}
        </View>

        <Text
          style={[styles.item, activeItem === "Messages" && styles.activeText]}
        >
          Messages
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Notification")}
        style={[
          styles.itemContainer,
          activeItem === "Notification" && styles.activeItem,
        ]}
      >
        {/*  <NotificationsIcon
          width={24}
          height={24}
          style={[
            activeItem === "Notification"
              ? styles.activeIcon
              : styles.inactiveIcon,
            { tintColor: activeItem === "Notification" ? "black" : "#333" }, // Dynamically set icon color
          ]}
        /> */}
        <View style={styles.iconContainer}>
          {activeItem === "Notification" ? (
            <NotificationBlack width={24} height={24} />
          ) : (
            <NotificationsIcon width={24} height={24} />
          )}
        </View>

        <Text
          style={[
            styles.item,
            activeItem === "Notification" && styles.activeText,
          ]}
        >
          Notifications
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("BookMarkes")}
        style={[
          styles.itemContainer,
          activeItem === "BookMarkes" && styles.activeItem,
        ]}
      >
        {/*  <BookMarkesIcon
          width={24}
          height={24}
          style={[
            activeItem === "BookMarkes"
              ? styles.activeIcon
              : styles.inactiveIcon,
            { tintColor: activeItem === "BookMarkes" ? "black" : "#333" }, // Dynamically set icon color
          ]}
        /> */}
        <View style={styles.iconContainer}>
          {activeItem === "BookMarkes" ? (
            <BookBlack width={24} height={24} />
          ) : (
            <BookMarkesIcon width={24} height={24} />
          )}
        </View>

        <Text
          style={[
            styles.item,
            activeItem === "BookMarkes" && styles.activeText,
          ]}
        >
          Bookmarks
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Profile")}
        style={[
          styles.itemContainer,
          activeItem === "Profile" && styles.activeItem,
        ]}
      >
        {/*   <ProfileIcon
          width={24}
          height={24}
          style={[
            activeItem === "Profile" ? styles.activeIcon : styles.inactiveIcon,
            { tintColor: activeItem === "Profile" ? "black" : "#333" }, // Dynamically set icon color
          ]}
        /> */}
        <View style={styles.iconContainer}>
          {activeItem === "Profile" ? (
            <ProfileBlack width={24} height={24} />
          ) : (
            <ProfileIcon height={24} width={24} />
          )}
        </View>

        <Text
          style={[styles.item, activeItem === "Profile" && styles.activeText]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff", // White background for the menu
    padding: 20,
  },
  avatarContainer: {
    // marginBottom: 20,
    marginTop: 20,
    flexDirection: "column", // Adjusted to place the name below the image
    alignItems: "left", // This will align the name and image to the left
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // Makes the image round
  },
  profileName: {
    marginTop: 10,
    marginBottom: 5, // Adding some space between the avatar and the name
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark color for the name text
  },
  item: {
    fontSize: 14,
    fontWeight: "300", // Default font weight
    padding: 10,
    color: "#333", // Default text color
  },
  textL: {
    fontFamily: "Inter", // Font family Inter
    fontWeight: "400", // Font weight 400 (normal weight)
    fontSize: 15, // Font size 16px
    lineHeight: 16, // Line height 16px
    color: "#D3D3D3", // Text color (dark gray, can change to any color you prefer)
    //padding: 10, // Optional padding for better readability
  },
  activeText: {
    fontWeight: "bold", // Set text to bold when active
    color: "black", // Set text color to black when active
  },
  itemContainer: {
    flexDirection: "row", // Ensure icon and text are aligned horizontally
    alignItems: "center", // Vertically center the icon and text
    paddingVertical: 10, // Padding between items
    backgroundColor: "#fff", // White background for each item
    borderRadius: 30, // Rounded corners for the item
    marginBottom: 5, // Space between each item
    paddingLeft: 10, // Space between icon and text
  },
  activeItem: {
    backgroundColor: "#D3D3D3",
    // Light red background when item is active
  },
  activeIcon: {
    tintColor: "black", // Set icon color to black when active
  },
  inactiveIcon: {
    tintColor: "#333", // Default icon color (dark gray)
  },
  iconContainer: {
    marginLeft: 10, // Add space to the left of the icon
  },
  separator: {
    height: 1, // Set height for the separator line
    backgroundColor: "#ccc", // Light gray color for the separator
    marginVertical: 10, // Vertical margin to space out from the profile section
  },
});
