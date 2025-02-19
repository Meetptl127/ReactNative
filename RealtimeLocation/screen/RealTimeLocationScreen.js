import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function RealTimeLocationScreen() {
  const [location, setLocation] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null); // Manage permission status
  const [error, setError] = useState(null);
  const [region, setRegion] = useState(null); // Store the region of the map
  const [locationSubscription, setLocationSubscription] = useState(null); // Store the subscription

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      if (status !== "granted") {
        setError("Permission to access location was denied.");
        return;
      }
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    if (permissionStatus === "granted") {
      // Watch for location changes only after permission is granted
      const subscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      );

      // Store the subscription
      setLocationSubscription(subscription);

      // Cleanup when component unmounts
      return () => {
        if (locationSubscription) {
          locationSubscription.remove(); // Correct method to stop watching location
        }
      };
    }
  }, [permissionStatus]); // React to changes in permission status

  if (permissionStatus === null) {
    // Show loading indicator until we know permission status
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    // Show error if permissions are denied
    return (
      <View style={styles.container}>
        <Text style={styles.locationText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && region ? (
        <>
          {/* MapView to display the location */}
          <MapView
            style={styles.map}
            region={region} // Set the region dynamically to update the map
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Allow map to move and track
            showsUserLocation={false} // Do not show the default user location marker
            zoomEnabled={true} // Allow zoom
            scrollEnabled={true} // Allow scroll
            pitchEnabled={true} // Allow tilting (optional)
            rotateEnabled={true} // Allow rotating (optional)
          >
            {/* Custom Bike Marker */}
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Dhoom"
                description="my location"
                image={{
                  uri: "https://www.pngall.com/wp-content/uploads/2/Sports-Bike-PNG-Images.png", // Custom bike image URL
                  // Set image height to a smaller size
                }}
              />
            )}
          </MapView>

          {/* Location Details */}
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>
              Latitude: {location.coords.latitude}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {location.coords.longitude}
            </Text>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#007BFF" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Transparent background for the container
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
