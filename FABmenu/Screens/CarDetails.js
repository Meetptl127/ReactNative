import React from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

const CarDetails = ({ route }) => {
  const { car } = route.params; // Get the car data passed from Home.js

  // Animation setup
  const animation = new Animated.Value(0);

  Animated.timing(animation, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={[styles.container, { opacity: animation }]}>
      <Image source={{ uri: car.image }} style={styles.carImage} />
      <Text style={styles.carName}>{car.name}</Text>

      <Text style={styles.carDetail}>Speed: 200 km/h</Text>
      <Text style={styles.carDetail}>Mileage: 15 km/l</Text>
      <Text style={styles.carDetail}>Price: $50,000</Text>
      <Text style={styles.carDetail}>
        Description: This is a great car with advanced features and superior
        comfort.
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  carImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  carName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carDetail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CarDetails;
