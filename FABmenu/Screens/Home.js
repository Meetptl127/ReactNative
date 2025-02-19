import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window"); // Get the screen width

const Home = ({ navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Track the menu state
  const [animation] = useState(new Animated.Value(0)); // Initial animation value (hidden)

  // Car data with image URLs
  const cars = [
    {
      id: "1",
      name: "Navy Blue Sport Sedan",
      image:
        "https://downloadscdn6.freepik.com/114579/6/5047.jpg?filename=navy-blue-sport-coupe-parking-mode-top-view.jpg&token=exp=1737442811~hmac=2b1d7916ba28518fce3fa91b4e92d3b1&filename=5047.jpg",
    },
    {
      id: "2",
      name: "White Sport Sedan with Tuning",
      image:
        "https://downloadscdn6.freepik.com/114579/5/4002.jpg?filename=silver-sport-coupe-driving-highway.jpg&token=exp=1737442857~hmac=a9091b5a973bcb2aa659ff4d4e1a5b65&filename=4002.jpg",
    },
    {
      id: "3",
      name: "Audi R8",
      image:
        "https://downloadscdn6.freepik.com/114579/6/5041.jpg?filename=yellow-sport-sedan-road-side-view.jpg&token=exp=1737442910~hmac=10d49d95d8616fd09d6c1d4012580b04&filename=5041.jpg",
    }, // You can replace with actual image URL
  ];

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    animateFAB();
  };

  // Animate the opening and closing of the menu
  const animateFAB = () => {
    Animated.spring(animation, {
      toValue: menuOpen ? 0 : 1, // Toggle animation value
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  // Set the selected car name when an option is clicked and navigate to CarDetails
  const selectCar = (car) => {
    navigation.navigate("CarDetails", { car });
    setMenuOpen(false); // Close the menu after selection
    animateFAB(); // Animate the FAB close
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Floating Action Button</Text>

      {/* Menu with animation */}
      {menuOpen && (
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0], // Animate from 100px to 0px
                  }),
                },
              ],
            },
          ]}
        >
          {/* Menu Items */}
          {cars.map((car) => (
            <TouchableOpacity
              key={car.id}
              style={styles.menuItem}
              onPress={() => selectCar(car)}
            >
              <Image source={{ uri: car.image }} style={styles.menuImage} />
              <Text style={styles.menuItemText}>{car.name}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      {/* FAB Button */}
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        {menuOpen ? (
          // Close icon when the menu is open
          <MaterialIcons name="close" size={30} color="white" />
        ) : (
          // Add icon when the menu is closed
          <MaterialIcons name="add" size={30} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6347", // Tomato color for the FAB
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    bottom: 90,
    right: 20,
    width: "auto", // Items will have width based on content size
    paddingHorizontal: 10,
  },
  menuItem: {
    backgroundColor: "#FFA500", // Orange background for each item
    marginBottom: 10, // Add margin between items
    paddingVertical: 7,
    paddingHorizontal: 7, // Horizontal padding for spacing inside each item
    borderRadius: 30, // Rounded corners for each item
    alignItems: "center", // Center the text and image inside the item
    flexDirection: "row", // Align image and text horizontally
    justifyContent: "flex-start", // Align items to start (left-aligned)
  },
  menuImage: {
    width: 30, // Small size for the image
    height: 30,
    borderRadius: 15, // Make the image round
    marginRight: 10, // Add spacing between image and text
  },
  menuItemText: {
    fontSize: 18,
    color: "white", // White text color for contrast
  },
});

export default Home;
