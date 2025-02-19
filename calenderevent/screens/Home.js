import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(""); // Selected date
  const [events, setEvents] = useState({}); // Store events
  const [modalVisible, setModalVisible] = useState(false);
  const [eventText, setEventText] = useState("");

  // Handle date selection
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // Add event to selected date
  const addEvent = () => {
    if (!eventText.trim()) return;

    setEvents((prevEvents) => {
      return {
        ...prevEvents,
        [selectedDate]: [...(prevEvents[selectedDate] || []), eventText],
      };
    });

    setEventText("");
    setModalVisible(false);
  };

  // Generate marked dates for calendar
  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: "red" }; // Highlight event days
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Button title="Open Calendar" onPress={() => setSelectedDate("")} />

      {/* Calendar */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        style={styles.calendar}
      />

      {/* Show events for the selected date */}
      {selectedDate && (
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>Events on {selectedDate}:</Text>
          {events[selectedDate] ? (
            <FlatList
              data={events[selectedDate]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.eventText}>• {item}</Text>
              )}
            />
          ) : (
            <Text style={styles.noEventText}>No events added.</Text>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Add Event</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Event Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Event on {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter event"
              value={eventText}
              onChangeText={setEventText}
            />
            <Button title="Add Event" onPress={addEvent} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  calendar: { marginBottom: 20 },
  eventContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  eventTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  eventText: { fontSize: 14, paddingVertical: 2 },
  noEventText: { fontSize: 14, color: "gray" },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  addButtonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default Home;
