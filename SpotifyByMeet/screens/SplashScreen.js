import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("RoleSelection"); // Navigate to Role Selection instead of Home
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://downloadscdn5.freepik.com/download_vector/jpg/1/1394/1/1182/1182015_559.jpg?token=exp=1738913651~hmac=dc3009e6078f9d208358ccff2084f93a&filename=1182015_559.jpg",
        }}
        style={styles.logo}
      />
      <Text style={styles.text}>Spotify Clone</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DB954",
  },
  logo: { width: 100, height: 100 },
  text: { color: "white", fontSize: 24, marginTop: 20, fontWeight: "bold" },
});

export default SplashScreen;
