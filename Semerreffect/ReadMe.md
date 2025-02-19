1. Imports
   javascript
   Copy
   import {
   StyleSheet,
   Text,
   View,
   FlatList,
   Image,
   } from "react-native";
   import React, { useEffect, useState } from "react";
   import axios from "axios";
   import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
   import { LinearGradient } from "expo-linear-gradient";
   React Native Components:

StyleSheet: Used to create styles for the components.

Text: Displays text on the screen.

View: A container for other components.

FlatList: Renders a list of items efficiently.

Image: Displays images.

React Hooks:

useEffect: Used to perform side effects (like fetching data) when the component mounts or updates.

useState: Used to manage state in functional components.

Third-Party Libraries:

axios: A library for making HTTP requests (used to fetch user data from the API).

ShimmerPlaceHolder: A library that provides a shimmer effect for loading states.

LinearGradient: A component from expo-linear-gradient used to create gradient effects (used by ShimmerPlaceHolder).

2. State Management
   javascript
   Copy
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   users:

This state holds the list of users fetched from the API.

Initially, it’s an empty array ([]).

loading:

This state determines whether the app is in a loading state or not.

Initially, it’s set to true to show the shimmer effect.

3. Fetching Data with useEffect
   javascript
   Copy
   useEffect(() => {
   fetchUsers();
   }, []);
   The useEffect hook runs when the component mounts (because the dependency array [] is empty).

It calls the fetchUsers function to fetch user data from the API.

4. fetchUsers Function
   javascript
   Copy
   const fetchUsers = async () => {
   try {
   const response = await axios.get("https://reqres.in/api/users?page=1");
   setUsers(response.data.data); // API returns "data" which contains user info
   } catch (error) {
   console.error("Error fetching users:", error);
   } finally {
   // Enforce a minimum 5-second loading time
   setTimeout(() => {
   setLoading(false);
   }, 5000); // 5000 milliseconds = 5 seconds
   }
   };
   API Request:

The axios.get method fetches user data from the API (https://reqres.in/api/users?page=1).

The response contains a data object, which has a data property (an array of users).

State Update:

If the request is successful, the users state is updated with the fetched data (setUsers(response.data.data)).

Error Handling:

If the request fails, the error is logged to the console.

Compulsory 5-Second Shimmer Effect:

The finally block ensures that the loading state is set to false only after 5 seconds (setTimeout with 5000 milliseconds).

This enforces a minimum 5-second loading time, even if the API responds earlier.

5. Rendering the UI
   javascript
   Copy
   return (
   <View style={styles.container}>
   {loading ? (
   <FlatList
   data={[1, 2, 3, 4, 5, 6]} // Dummy data for shimmer effect
   keyExtractor={(item, index) => index.toString()}
   renderItem={() => (
   <View style={styles.card}>
   <ShimmerPlaceHolder
   style={styles.avatar}
   LinearGradient={LinearGradient}
   shimmerColors={["#eee", "#ddd", "#eee"]}
   shimmerWidth={200}
   duration={1000}
   />
   <ShimmerPlaceHolder
   style={styles.name}
   LinearGradient={LinearGradient}
   shimmerColors={["#eee", "#ddd", "#eee"]}
   shimmerWidth={200}
   duration={1000}
   />
   <ShimmerPlaceHolder
   style={styles.email}
   LinearGradient={LinearGradient}
   shimmerColors={["#eee", "#ddd", "#eee"]}
   shimmerWidth={200}
   duration={1000}
   />
   </View>
   )}
   />
   ) : (
   <FlatList
   data={users}
   keyExtractor={(item) => item.id.toString()}
   renderItem={({ item }) => (
   <View style={styles.card}>
   <Image source={{ uri: item.avatar }} style={styles.avatar} />
   <Text style={styles.name}>
   {item.first_name} {item.last_name}
   </Text>
   <Text style={styles.email}>{item.email}</Text>
   </View>
   )}
   />
   )}
   </View>
   );
   Conditional Rendering:

If loading is true, the app shows a shimmer effect using FlatList and ShimmerPlaceHolder.

If loading is false, the app displays the actual user data.

Shimmer Effect:

A dummy array [1, 2, 3, 4, 5, 6] is used to render 6 placeholder cards.

Each card has three ShimmerPlaceHolder components for the avatar, name, and email.

The LinearGradient component is passed to ShimmerPlaceHolder to create a smooth shimmer animation.

Actual Data:

When loading is false, the FlatList renders the actual user data.

Each user’s avatar, name, and email are displayed using Image and Text components.

6. Styles
   javascript
   Copy
   const styles = StyleSheet.create({
   container: {
   flex: 1,
   padding: 20,
   backgroundColor: "#f8f9fa",
   },
   card: {
   backgroundColor: "#fff",
   padding: 15,
   marginVertical: 10,
   borderRadius: 10,
   alignItems: "center",
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.2,
   shadowRadius: 4,
   elevation: 3,
   },
   avatar: {
   width: 80,
   height: 80,
   borderRadius: 40,
   marginBottom: 10,
   },
   name: {
   fontSize: 18,
   fontWeight: "bold",
   color: "#333",
   width: 150, // Set a width for shimmer placeholder
   },
   email: {
   fontSize: 14,
   color: "#555",
   width: 150, // Set a width for shimmer placeholder
   },
   });
   container:

The main container for the app. It uses padding and a light background color.

card:

Represents each user card. It has a white background, padding, rounded corners, and a shadow effect.

avatar:

Styles for the user avatar image. It’s circular (borderRadius: 40) and has a fixed size.

name and email:

Styles for the user’s name and email. They have fixed widths to ensure consistent shimmer placeholder sizes.

Summary
The app fetches user data from an API and enforces a 5-second shimmer effect before displaying the data.

The shimmer effect is created using the ShimmerPlaceHolder component with a LinearGradient for smooth animation.

The FlatList component efficiently renders either the shimmer placeholders or the actual user data based on the loading state.

The setTimeout in the fetchUsers function ensures that the shimmer effect is shown for at least 5 seconds, even if the data is fetched earlier.
