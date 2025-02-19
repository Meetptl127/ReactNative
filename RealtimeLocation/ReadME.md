1. Imports
   javascript
   Copy
   import React, { useState, useEffect } from "react";
   import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
   import \* as Location from "expo-location";
   import MapView, { Marker } from "react-native-maps";
   useState: Manages the component's states, including location, permission status, errors, and the map region.
   useEffect: Handles side effects such as requesting location permissions and setting up a location listener.
   ActivityIndicator: Displays a loading spinner while the app fetches data.
   expo-location: Provides APIs for accessing the device's location and listening for location changes.
   MapView & Marker:
   MapView: Displays an interactive map.
   Marker: Adds a marker to indicate a specific point on the map.
2. State Initialization
   javascript
   Copy
   const [location, setLocation] = useState(null); // Holds real-time location data
   const [permissionStatus, setPermissionStatus] = useState(null); // Manages location permission status
   const [error, setError] = useState(null); // Stores error messages
   const [region, setRegion] = useState(null); // Stores the map's region (center and zoom level)
   const [locationSubscription, setLocationSubscription] = useState(null); // Tracks the subscription for location updates
   location: Contains the user's current latitude, longitude, and other location data.
   permissionStatus: Tracks whether location permissions are granted ("granted" or "denied").
   error: Stores error messages if the user denies permissions.
   region: Dynamically updates the visible portion of the map, centered around the user's location.
   locationSubscription: Tracks the real-time location listener subscription so it can be cleaned up properly.
3. Effect Hook for Permission Request
   javascript
   Copy
   useEffect(() => {
   const getLocationPermission = async () => {
   let { status } = await Location.requestForegroundPermissionsAsync();
   setPermissionStatus(status); // Update permission status
   if (status !== "granted") {
   setError("Permission to access location was denied."); // Set error if denied
   return;
   }
   };

getLocationPermission(); // Call the function when the component mounts
}, []);
Purpose: Requests location permissions when the component is first mounted.
Behavior:
Location.requestForegroundPermissionsAsync(): Asks the user for location access in the foreground.
If permission is denied, an error message is stored in the error state.
If granted, the permissionStatus is updated to "granted". 4. Effect Hook for Real-Time Location Updates
javascript
Copy
useEffect(() => {
if (permissionStatus === "granted") {
const subscription = Location.watchPositionAsync(
{
accuracy: Location.Accuracy.High, // High accuracy for GPS data
timeInterval: 1000, // Update every second
distanceInterval: 1, // Update if the user moves 1 meter
},
(newLocation) => {
setLocation(newLocation); // Update location
setRegion({
latitude: newLocation.coords.latitude,
longitude: newLocation.coords.longitude,
latitudeDelta: 0.0922, // Controls zoom level vertically
longitudeDelta: 0.0421, // Controls zoom level horizontally
});
}
);

    setLocationSubscription(subscription); // Store subscription for cleanup

    return () => {
      if (locationSubscription) {
        locationSubscription.remove(); // Cleanup listener when component unmounts
      }
    };

}
}, [permissionStatus]); // Dependency: Runs when permissionStatus changes
Purpose: Watches the user's location in real time and updates the map and marker dynamically.

Location.watchPositionAsync():

Continuously listens for changes in the user's location.
Updates location with the new coordinates.
Updates region to center the map around the new location.
Cleanup:

The remove() method is called when the component unmounts or the listener is no longer needed, preventing memory leaks. 5. Handling UI States
a) Loading State
javascript
Copy
if (permissionStatus === null) {
return (
<View style={styles.container}>
<ActivityIndicator size="large" color="#007BFF" />
</View>
);
}
If the app is still checking for permissions, a loading spinner is displayed.
b) Error State
javascript
Copy
if (error) {
return (
<View style={styles.container}>
<Text style={styles.locationText}>{error}</Text>
</View>
);
}
If the user denies permissions, an error message is displayed. 6. Rendering the Map
a) MapView
javascript
Copy
<MapView
style={styles.map}
region={region} // Dynamically set the map's center and zoom level
onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Allows map interaction
showsUserLocation={false} // Hides default blue location marker
zoomEnabled={true} // Enables zooming
scrollEnabled={true} // Enables panning
pitchEnabled={true} // Enables tilting (optional)
rotateEnabled={true} // Enables rotation (optional)

> region: Controls the map's visible area, centered on the user's current location.
> onRegionChangeComplete: Updates the region state when the user moves or zooms the map.
> Interaction Settings:
> zoomEnabled: Allows zooming.
> scrollEnabled: Allows dragging/panning.
> pitchEnabled & rotateEnabled: Enables tilting and rotating.
> b) Custom Marker
> javascript
> Copy
> <Marker
> coordinate={{

    latitude: location.coords.latitude,
    longitude: location.coords.longitude,

}}
title="Dhoom"
description="my location"
image={{
    uri: "https://www.pngall.com/wp-content/uploads/2/Sports-Bike-PNG-Images.png",
  }}
/>
Places a marker at the user's current location with a custom bike image.
coordinate: Sets the marker's position using latitude and longitude.
title & description: Display text when the marker is tapped.
image: Uses a custom marker icon (bike image in this case). 7. Displaying Location Details
javascript
Copy
<View style={styles.locationDetails}>
<Text style={styles.locationText}>
Latitude: {location.coords.latitude}
</Text>
<Text style={styles.locationText}>
Longitude: {location.coords.longitude}
</Text>
</View>
Displays the user's current latitude and longitude below the map. 8. Styles
javascript
Copy
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "transparent",
},
map: {
width: "100%",
height: "70%",
},
locationText: {
fontSize: 18,
marginTop: 20,
},
locationDetails: {
marginTop: 20,
alignItems: "center",
},
});
container: Centers content on the screen with a transparent background.
map: Ensures the map takes up 70% of the screen height.
locationText & locationDetails: Styles for displaying location details below the map.
Key Features:
Real-Time Location Tracking:
Updates the user's location dynamically on the map and marker.
Custom Marker:
Uses a custom bike image instead of the default pin.
Interactive Map:
Enables zooming, panning, tilting, and rotating.
Permission Handling:
Requests and handles location permissions gracefully.
Error and Loading States:
Displays appropriate UI for loading and error conditions.
