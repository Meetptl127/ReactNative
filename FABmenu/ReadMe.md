Home Component (The Main Screen with Floating Action Button (FAB) and Menu)

1. Imports
   javascript
   Copy
   import React, { useState } from "react";
   import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image } from "react-native";
   import { MaterialIcons } from "@expo/vector-icons";
   React: Library for building user interfaces.
   useState: Hook that allows us to create state in the component.
   View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image: React Native components used for layout, animations, and styling.
   MaterialIcons: Icon library used to show icons (in this case, the FAB's icons).
2. State Management
   javascript
   Copy
   const [menuOpen, setMenuOpen] = useState(false); // Track the menu state
   const [animation] = useState(new Animated.Value(0)); // Initial animation value (hidden)
   menuOpen: A state variable that tracks whether the floating action button's menu is open or closed.
   animation: An animated value used to control the animation of the menu.
3. Car Data
   javascript
   Copy
   const cars = [
   { id: "1", name: "Navy Blue Sport Sedan", image: "https://..." },
   { id: "2", name: "White Sport Sedan with Tuning", image: "https://..." },
   { id: "3", name: "Audi R8", image: "https://..." }
   ];
   This is a sample array of cars with each car having a name and an image URL. This data will be used in the menu.
4. Toggle Menu Function
   javascript
   Copy
   const toggleMenu = () => {
   setMenuOpen(!menuOpen);
   animateFAB();
   };
   toggleMenu: A function that toggles the visibility of the menu. It updates the menuOpen state and triggers the animation for the FAB button.
5. Animate FAB Function
   javascript
   Copy
   const animateFAB = () => {
   Animated.spring(animation, {
   toValue: menuOpen ? 0 : 1, // Toggle animation value
   friction: 6,
   tension: 80,
   useNativeDriver: true,
   }).start();
   };
   animateFAB: An animation function that animates the Floating Action Button (FAB). It uses the Animated.spring method to animate the button when the menu opens or closes.
   toValue: menuOpen ? 0 : 1: This toggles the animation based on whether the menu is open or closed.
   friction and tension: These control the bounciness of the animation.
6. Select Car Function
   javascript
   Copy
   const selectCar = (car) => {
   navigation.navigate("CarDetails", { car });
   setMenuOpen(false);
   animateFAB();
   };
   selectCar: A function that navigates to the CarDetails screen and passes the selected car data. It also closes the menu and animates the FAB to close.
7. Rendering the View
   javascript
   Copy
   <View style={styles.container}>
   <Text style={styles.title}>Floating Action Button</Text>
   The root view contains a title, which is a Text element showing the title "Floating Action Button."
8. Menu Animation
   javascript
   Copy
   {menuOpen && (
   <Animated.View style={[styles.menu, { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }] }]}>
   {cars.map((car) => (
   <TouchableOpacity key={car.id} style={styles.menuItem} onPress={() => selectCar(car)}>
   <Image source={{ uri: car.image }} style={styles.menuImage} />
   <Text style={styles.menuItemText}>{car.name}</Text>
   </TouchableOpacity>
   ))}
   </Animated.View>
   )}
   Menu Visibility: The menu is only shown if menuOpen is true.
   Animation: The Animated.View contains a transform property that animates the menu's vertical position using translateY. It moves from 100px (off-screen) to 0px (visible).
   Menu Items: The cars.map loop creates a TouchableOpacity for each car, showing the car's image and name. When clicked, it triggers the selectCar function.
9. Floating Action Button (FAB)
   javascript
   Copy
   <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
   {menuOpen ? (
   <MaterialIcons name="close" size={30} color="white" />
   ) : (
   <MaterialIcons name="add" size={30} color="white" />
   )}
   </TouchableOpacity>
   The FAB is a circular button positioned at the bottom-right corner.
   When clicked, it toggles the menu open or closed. The icon changes from "add" (when closed) to "close" (when open).
   Styles
   The styles object defines the layout, positioning, and appearance of each element:
   container: Centers everything in the view.
   fab: Styles the floating action button (round, with an orange background).
   menu: Styles the menu container, positioning it above the FAB.
   menuItem: Defines the styling of each car item in the menu (background, padding, and flexbox for layout).
   menuImage: Styles the car images inside the menu items.
   CarDetails Component (The Screen Showing Car Details)
10. Imports
    javascript
    Copy
    import React from "react";
    import { View, Text, StyleSheet, Image, Animated } from "react-native";
    This component imports React and React Native components (View, Text, StyleSheet, Image, and Animated) for displaying car details and animation.
11. Receiving Car Data
    javascript
    Copy
    const { car } = route.params;
    The car object is passed via route.params from the Home component when navigating to CarDetails. It contains the selected car's data (name and image).
12. Animation Setup
    javascript
    Copy
    const animation = new Animated.Value(0);
    The animation value is initialized to 0 to control the opacity of the component when it appears on the screen.
13. Opacity Animation
    javascript
    Copy
    Animated.timing(animation, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
    }).start();
    The Animated.timing function animates the opacity of the CarDetails screen from 0 to 1 over 500 milliseconds. This makes the page fade in when it's displayed.
14. Rendering the View
    javascript
    Copy
    <Animated.View style={[styles.container, { opacity: animation }]}>
    <Image source={{ uri: car.image }} style={styles.carImage} />
    <Text style={styles.carName}>{car.name}</Text>
    <Text style={styles.carDetail}>Speed: 200 km/h</Text>
    <Text style={styles.carDetail}>Mileage: 15 km/l</Text>
    <Text style={styles.carDetail}>Price: $50,000</Text>
    <Text style={styles.carDetail}>Description: This is a great car with advanced features and superior comfort.</Text>
    </Animated.View>
    This component displays the car details:
    The car's image is displayed using an Image component.
    The car's name, speed, mileage, price, and description are displayed as Text elements.
    The whole screen is wrapped in an Animated.View, and the opacity is animated to create a fade-in effect.
    Styles
    The styles object defines the appearance of each element:
    container: Centers the content with padding.
    carImage: Sets the image size and rounded corners.
    carName: Styles the name of the car (large, bold text).
    carDetail: Styles the details (smaller font).
    Conclusion
    The Home component displays a Floating Action Button (FAB) that opens and closes a menu with car options. The user can select a car to navigate to the CarDetails screen.
    The CarDetails component displays detailed information about a selected car and includes a fade-in animation for smooth UI transitions.
