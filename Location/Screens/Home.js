import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

export default function Home({ navigation }) {
  const [location, setLocation] = useState(null);
  const [addressDetails, setAddressDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true); // Start loading
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Permission to access location was denied."
        );
        setLoading(false); // Stop loading on permission denial
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const addressData = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (addressData.length > 0) {
        const {
          street,
          streetNumber,
          city,
          district,
          region,
          subregion,
          country,
          postalCode,
          name,
          isoCountryCode,
          timezone,
          formattedAddress,
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
    } catch (error) {
      Alert.alert("Error", "Failed to get location. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Set your current location</Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
        <Text style={styles.buttonText}>Set Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RealTimeLocationScreen")}
      >
        <Text style={styles.buttonText}>Real-Time Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MapScreen")}
      >
        <Text style={styles.buttonText}>View Map</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      )}

      {location && (
        <Text style={styles.locationText}>
          Latitude: {location.coords.latitude}, Longitude:{" "}
          {location.coords.longitude}
        </Text>
      )}
      {Object.keys(addressDetails).length > 0 && !loading && (
        <View style={styles.addressContainer}>
          <Text style={styles.locationText}>
            Street: {addressDetails.street}
          </Text>
          <Text style={styles.locationText}>
            Street Number: {addressDetails.streetNumber}
          </Text>
          <Text style={styles.locationText}>City: {addressDetails.city}</Text>
          <Text style={styles.locationText}>
            District: {addressDetails.district}
          </Text>
          <Text style={styles.locationText}>
            Region: {addressDetails.region}
          </Text>
          <Text style={styles.locationText}>
            Subregion: {addressDetails.subregion}
          </Text>
          <Text style={styles.locationText}>
            Country: {addressDetails.country}
          </Text>
          <Text style={styles.locationText}>
            Postal Code: {addressDetails.postalCode}
          </Text>
          <Text style={styles.locationText}>Name: {addressDetails.name}</Text>
          <Text style={styles.locationText}>
            ISO Country Code: {addressDetails.isoCountryCode}
          </Text>
          <Text style={styles.locationText}>
            Timezone: {addressDetails.timezone}
          </Text>
          <Text style={styles.locationText}>
            Formatted Address: {addressDetails.formattedAddress}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
  },
  addressContainer: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  loader: {
    marginTop: 20,
  },
});
