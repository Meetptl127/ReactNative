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

// Importing custom UI components/icons used in the drawer
import HomeIcon from "./UI/HomeIcon";
import BookMarkesIcon from "./UI/BookMarkesIcon";
import MessageIcon from "./UI/MessageIcon";
import NotificationsIcon from "./UI/NotificationsIcon";
import ProfileIcon from "./UI/ProfileIcon";
import TopicsIcon from "./UI/TopicsIcon";
import HomeIconBlack from "./UI/HomeIconBlack";
import BookBlack from "./UI/BookBlack";
import Pr1 from "./UI/Pr1"; // Avatar/Icon for the profile picture
import NotificationBlack from "./UI/NotificationBlack";
import MessagesBlack from "./UI/MessagesBlack";
import TopicsBlack from "./UI/TopicsBlack";
import ProfileBlack from "./UI/ProfileBlack";

export default function CustomDrawerContent(props) {
  const window = Dimensions.get("window"); // Gets the dimensions of the device screen for responsive design

  const [activeItem, setActiveItem] = React.useState(""); // State to track the currently selected item

  // Function to handle navigation when an item is clicked
  const handleNavigation = (screen) => {
    setActiveItem(screen); // Updates the active item state
    props.navigation.navigate(screen); // Navigates to the selected screen
  };

  return (
    <ScrollView style={styles.menu}>
      {/* Profile Section */}
      <View style={styles.avatarContainer}>
        <Pr1 style={styles.avatar} /> {/* Avatar/Profile picture */}
        <Text style={styles.profileName}>Sophia Rose</Text> {/* Profile Name */}
        <Text style={styles.textL}>UX/UI Designer</Text> {/* Profile Description */}
      </View>

      {/* Separator line between profile section and menu items */}
      <View style={styles.separator}></View>

      {/* Drawer Items */}
      <TouchableOpacity
        onPress={() => handleNavigation("Home")} // Navigate to Home on click
        style={[
          styles.itemContainer, // Default styling for item
          activeItem === "Home" && styles.activeItem, // Active item styling
        ]}
      >
        {/* Dynamic rendering of icons based on active item */}
        {activeItem === "Home" ? (
          <HomeIconBlack width={24} height={24} /> // Black icon for active state
        ) : (
          <HomeIcon width={24} height={24} /> // Default icon for inactive state
        )}
        <Text style={[styles.item, activeItem === "Home" && styles.activeText]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Topics")} // Navigate to Topics on click
        style={[
          styles.itemContainer,
          activeItem === "Topics" && styles.activeItem,
        ]}
      >
        {activeItem === "Topics" ? (
          <TopicsBlack width={24} height={24} /> // Black icon for active state
        ) : (
          <TopicsIcon width={24} height={24} /> // Default icon for inactive state
        )}
        <Text
          style={[styles.item, activeItem === "Topics" && styles.activeText]}
        >
          Topics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Messages")} // Navigate to Messages on click
        style={[
          styles.itemContainer,
          activeItem === "Messages" && styles.activeItem,
        ]}
      >
        {activeItem === "Messages" ? (
          <MessagesBlack height={24} width={24} /> // Black icon for active state
        ) : (
          <MessageIcon height={24} width={24} /> // Default icon for inactive state
        )}
        <Text
          style={[styles.item, activeItem === "Messages" && styles.activeText]}
        >
          Messages
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Notification")} // Navigate to Notifications on click
        style={[
          styles.itemContainer,
          activeItem === "Notification" && styles.activeItem,
        ]}
      >
        {activeItem === "Notification" ? (
          <NotificationBlack width={24} height={24} /> // Black icon for active state
        ) : (
          <NotificationsIcon width={24} height={24} /> // Default icon for inactive state
        )}
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
        onPress={() => handleNavigation("BookMarkes")} // Navigate to Bookmarks on click
        style={[
          styles.itemContainer,
          activeItem === "BookMarkes" && styles.activeItem,
        ]}
      >
        {activeItem === "BookMarkes" ? (
          <BookBlack width={24} height={24} /> // Black icon for active state
        ) : (
          <BookMarkesIcon width={24} height={24} /> // Default icon for inactive state
        )}
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
        onPress={() => handleNavigation("Profile")} // Navigate to Profile on click
        style={[
          styles.itemContainer,
          activeItem === "Profile" && styles.activeItem,
        ]}
      >
        {activeItem === "Profile" ? (
          <ProfileBlack width={24} height={24} /> // Black icon for active state
        ) : (
          <ProfileIcon height={24} width={24} /> // Default icon for inactive state
        )}
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
    width: "100%", // Full-width menu
    backgroundColor: "#fff", // White background for the menu
    padding: 20, // Padding around the menu content
  },
  avatarContainer: {
    marginTop: 20, // Space at the top
    flexDirection: "column", // Stack items vertically
    alignItems: "left", // Align items to the left
  },
  avatar: {
    width: 80, // Avatar width
    height: 80, // Avatar height
    borderRadius: 40, // Makes the avatar circular
  },
  profileName: {
    marginTop: 10, // Space above the name
    marginBottom: 5, // Space below the name
    fontSize: 18, // Font size for the name
    fontWeight: "bold", // Bold text for the name
    color: "#333", // Dark color for the name
  },
  textL: {
    fontFamily: "Inter", // Font family for the description
    fontWeight: "400", // Normal font weight
    fontSize: 15, // Font size for the description
    lineHeight: 16, // Line height for the description
    color: "#D3D3D3", // Light gray text color
  },
  activeText: {
    fontWeight: "bold", // Bold text for active item
    color: "black", // Black text color for active item
  },
  itemContainer: {
    flexDirection: "row", // Icon and text in the same row
    alignItems: "center", // Center align items vertically
    paddingVertical: 10, // Padding above and below each item
    backgroundColor: "#fff", // Default background color
    borderRadius: 30, // Rounded corners for the item
    marginBottom: 5, // Space between items
    paddingLeft: 10, // Space between icon and text
  },
  activeItem: {
    backgroundColor: "#D3D3D3", // Light gray background for active item
  },
  separator: {
    height: 1, // Separator height
    backgroundColor: "#ccc", // Light gray separator color
    marginVertical: 10, // Space above and below the separator
  },
});
