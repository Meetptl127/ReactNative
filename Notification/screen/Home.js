import React, { useEffect } from "react";
import { View, Button, StyleSheet, Platform } from "react-native";
import * as Notifications from "expo-notifications";

// Set notification handler for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  useEffect(() => {
    // Request notification permissions
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted!");
      }
    };

    requestPermissions();
  }, []);

  const sendNotification = async (title, body, screen) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { screen: screen }, // Pass the screen name as data
      },
      trigger: null, // Show the notification immediately
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Send Notification for Screen 1"
        onPress={() =>
          sendNotification("Screen 1", "Go to Screen 1", "Screen1")
        }
      />
      <Button
        title="Send Notification for Screen 2"
        onPress={() =>
          sendNotification("Screen 2", "Go to Screen 2", "Screen2")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
