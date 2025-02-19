import * as Notifications from "expo-notifications";

const showNotification = async (song) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: song.title,
      body: song.artist,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      vibrate: [0, 250, 250, 250],
      data: { songId: song.id },
    },
    trigger: null, // Show immediately
  });
};

// Call this function when playback starts
showNotification(currentSong);
