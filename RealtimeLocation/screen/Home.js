import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleRealTimeLocation = () => {
    navigation.navigate("RealTimeLocationScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Track your real-time location</Text>
      <TouchableOpacity style={styles.button} onPress={handleRealTimeLocation}>
        <Text style={styles.buttonText}>Real-Time Location</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
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
  loader: {
    marginTop: 20,
  },
});
