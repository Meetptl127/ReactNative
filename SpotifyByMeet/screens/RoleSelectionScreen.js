import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("User")}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF5733" }]}
        onPress={() => navigation.navigate("Admin")}
      >
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFF", marginBottom: 20 },
  button: {
    width: 200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#1DB954",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default RoleSelectionScreen;
