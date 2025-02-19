1. Imports
   javascript
   Copy
   import React, { useState } from "react";
   import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Alert,
   ActivityIndicator,
   } from "react-native";
   import \* as Location from "expo-location";
   useState: A React hook to manage state in functional components.
   StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator: UI components and utilities from React Native.
   TouchableOpacity: Used for clickable buttons with touch feedback.
   ActivityIndicator: Displays a loading spinner while the app is fetching location data.
   expo-location: A library from the Expo ecosystem for accessing location data, such as latitude, longitude, and reverse geocoding.
2. Component State
   javascript
   Copy
   const [location, setLocation] = useState(null);
   const [addressDetails, setAddressDetails] = useState({});
   const [loading, setLoading] = useState(false);
   location: Stores the user's current GPS location (latitude, longitude, etc.).
   addressDetails: Stores detailed reverse-geocoded address information.
   loading: Tracks whether the app is currently fetching location data.
3. handleButtonClick Function
   This function handles fetching the user's current location and reverse-geocoding it to get address details.

a) Request Location Permissions
javascript
Copy
let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== "granted") {
Alert.alert(
"Permission denied",
"Permission to access location was denied."
);
setLoading(false);
return;
}
Requests the user's permission to access their location.
If permission is denied (status !== "granted"), an alert is shown, and the function stops further execution by setting loading to false.
b) Fetch Current Location
javascript
Copy
let currentLocation = await Location.getCurrentPositionAsync({});
setLocation(currentLocation);
getCurrentPositionAsync: Fetches the user's current GPS coordinates (latitude and longitude).
The result is stored in the location state.
c) Reverse Geocoding
javascript
Copy
const addressData = await Location.reverseGeocodeAsync({
latitude: currentLocation.coords.latitude,
longitude: currentLocation.coords.longitude,
});
reverseGeocodeAsync: Converts the latitude and longitude into a readable address.
addressData contains an array of address objects with properties like street, city, country, etc.
d) Extract Address Details
javascript
Copy
if (addressData.length > 0) {
const {
street, streetNumber, city, district, region, subregion,
country, postalCode, name, isoCountryCode, timezone, formattedAddress,
} = addressData[0];

setAddressDetails({
street: street || "N/A",
streetNumber: streetNumber || "N/A",
city: city || "N/A",
district: district || "N/A",
region: region || "N/A",
subregion: subregion || "N/A",
country: country || "N/A",
postalCode: postalCode || "N/A",
name: name || "N/A",
isoCountryCode: isoCountryCode || "N/A",
timezone: timezone || "N/A",
formattedAddress: formattedAddress || "N/A",
});
} else {
setAddressDetails({ formattedAddress: "Address not found" });
}
If reverse geocoding returns data, it extracts the relevant properties (e.g., street, city, country) and stores them in addressDetails.
If no data is returned, it sets a fallback message: "Address not found".
e) Handle Errors and Stop Loading
javascript
Copy
catch (error) {
Alert.alert("Error", "Failed to get location. Please try again.");
} finally {
setLoading(false);
}
Catches errors during location retrieval or geocoding and shows an alert.
The finally block ensures that the loading spinner stops regardless of success or failure. 4. UI Structure
a) Container
javascript
Copy
<View style={styles.container}>
<Text style={styles.text}>Set your current location</Text>
View: Acts as a container for the entire screen.
Text: Displays a heading message.
b) Buttons
javascript
Copy
<TouchableOpacity style={styles.button} onPress={handleButtonClick}>
<Text style={styles.buttonText}>Set Location</Text>
</TouchableOpacity>
First Button: Triggers the handleButtonClick function to fetch and display the user's location.
Other Buttons:
Navigate to other screens (RealTimeLocationScreen and MapScreen) using the navigation prop.
c) Loading Indicator
javascript
Copy
{loading && (
<ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
)}
Displays a spinner when the app is fetching location data (loading === true).
d) Location and Address Details
javascript
Copy
{location && (
<Text style={styles.locationText}>
Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
</Text>
)}
{Object.keys(addressDetails).length > 0 && !loading && (
<View style={styles.addressContainer}>
<Text style={styles.locationText}>
Street: {addressDetails.street}
</Text>
...
</View>
)}
Shows:
The user's latitude and longitude if location is set.
The detailed address if addressDetails is populated and loading is false. 5. Styles
javascript
Copy
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#f5f5f5",
},
text: { fontSize: 18, marginBottom: 20 },
button: {
backgroundColor: "#007BFF",
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 5,
marginTop: 10,
},
buttonText: { color: "#ffffff", fontSize: 16 },
locationText: { marginTop: 10, fontSize: 16 },
addressContainer: { marginTop: 20, alignItems: "flex-start" },
loader: { marginTop: 20 },
});
Defines the visual styles for the screen.
container: Centers all content.
button: Creates a blue, rounded button with padding.
loader: Adds margin above the spinner.
Key Features:
Permission Handling: Ensures the user grants location permissions.
Reverse Geocoding: Converts GPS coordinates into human-readable addresses.
Error Handling: Alerts the user in case of failure.
Loading State: Shows a spinner during location fetching.
Screen Navigation: Allows navigation to other screens.

This React Native code represents a screen component (MapScreen) that displays the user's current location on a map using the react-native-maps library. The map includes a marker to indicate the user's exact location. Here's a detailed explanation:

1. Imports
   javascript
   Copy
   import React, { useEffect, useState } from "react";
   import { StyleSheet, View, Text, Alert } from "react-native";
   import MapView, { Marker } from "react-native-maps";
   import \* as Location from "expo-location";
   React Imports:
   useState: Manages the state of the user's location.
   useEffect: Executes side effects (e.g., fetching the user's location) when the component is mounted.
   View & Text: Used for layout and displaying text.
   Alert: Displays pop-up alerts for errors or permission denial.
   MapView & Marker:
   MapView: Renders the interactive map.
   Marker: Places a pin/marker on the map to indicate a specific location.
   expo-location: Fetches the user's location coordinates (latitude, longitude).
2. State Initialization
   javascript
   Copy
   const [location, setLocation] = useState(null);
   location: Stores the user's current location data (latitude and longitude). Initially set to null until the location is fetched.
3. Effect Hook (useEffect)
   The useEffect hook runs only once when the component is first mounted.

javascript
Copy
useEffect(() => {
(async () => {
let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== "granted") {
Alert.alert(
"Permission denied",
"Permission to access location was denied."
);
return;
}

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

})();
}, []);
Explanation:
Request Permissions:

The app requests permission to access the user's location using Location.requestForegroundPermissionsAsync().
If the user denies permission, an alert is displayed, and the function exits without setting the location.
Fetch Current Location:

If permissions are granted, the app fetches the user's current location using Location.getCurrentPositionAsync().
The result contains the user's coordinates (latitude and longitude), which are stored in the location state.
Dependency Array:

The empty array ([]) ensures the effect runs only once when the component mounts. 4. Rendering the UI
a) Top-Level Container
javascript
Copy
<View style={styles.container}>
The main container occupies the entire screen and holds either the map or a loading message.
b) Conditionally Render Map or Loading Message
javascript
Copy
{location ? (
<MapView
style={styles.map}
initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}

>

    <Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}
      title="My Location"
      description="You are here"
    />

  </MapView>
) : (
  <Text style={styles.loadingText}>Loading map...</Text>
)}
Check if Location is Available:
If location is available:
Render the map using MapView.
Place a marker at the user's coordinates using Marker.
If location is not available:
Show a "Loading map..." message.
5. MapView Component
javascript
Copy
<MapView
  style={styles.map}
  initialRegion={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }}
>
initialRegion: Defines the area the map will initially focus on.
latitude & longitude: Sets the center of the map to the user's coordinates.
latitudeDelta & longitudeDelta: Controls the zoom level (smaller values = more zoomed in).
6. Marker Component
javascript
Copy
<Marker
  coordinate={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  }}
  title="My Location"
  description="You are here"
/>
Places a marker (pin) at the user's location.
coordinate: Specifies the latitude and longitude for the marker.
title: A title displayed above the marker when clicked (e.g., "My Location").
description: A description displayed below the title (e.g., "You are here").
7. Fallback Text
javascript
Copy
<Text style={styles.loadingText}>Loading map...</Text>
If the location is not yet available, this text is shown to indicate the map is loading.
8. Styles
javascript
Copy
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});
container: Ensures the entire screen is used for the component.
map: Makes the map take up all available space.
loadingText: Centers the loading message with a top margin for better visibility.
Key Features:
Permission Handling:
The app checks and requests the user's location permissions.
Displays an alert if permission is denied.
Real-Time Location:
Fetches the user's current GPS coordinates and displays them on the map.
Interactive Map:
Uses react-native-maps to display a zoomable, interactive map.
Marker:
Places a marker at the user's exact location, with a title and description.
Fallback UI:
Displays a "Loading map..." message while waiting for location data.
