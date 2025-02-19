import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const FormModal = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null); // Store full Date object
  const [time, setTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Get current date & time
  const currentDate = new Date();

  // Handle Date Selection
  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate); // Save full date object
    setDatePickerVisibility(false);

    // Reset time if a new date is selected
    if (selectedDate.toDateString() !== currentDate.toDateString()) {
      setTime(null);
    }
  };

  // Handle Time Selection
  const handleTimeConfirm = (selectedTime) => {
    setTime(selectedTime); // Save full time object
    setTimePickerVisibility(false);
  };

  // Handle Form Submission
  const handleSubmit = () => {
    onSubmit({
      name,
      email,
      date: date ? date.toDateString() : "",
      time: time ? time.toLocaleTimeString() : "",
    });

    setName("");
    setEmail("");
    setDate(null);
    setTime(null);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Fill Form</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Open Date Picker */}
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <Text style={styles.picker}>
            {date ? date.toDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>

        {/* Date Picker - Prevent past dates */}
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          date={date || new Date()}
          minimumDate={new Date()} // Prevent past dates
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />

        {/* Open Time Picker */}
        <TouchableOpacity
          onPress={() => {
            if (date) {
              setTimePickerVisibility(true);
            } else {
              alert("Please select a date first.");
            }
          }}
        >
          <Text style={styles.picker}>
            {time ? time.toLocaleTimeString() : "Select Time"}
          </Text>
        </TouchableOpacity>

        {/* Time Picker - Prevent past times on the same day */}
        <DateTimePicker
          isVisible={isTimePickerVisible}
          mode="time"
          date={time || new Date()}
          minimumDate={
            date && date.toDateString() === currentDate.toDateString()
              ? new Date()
              : undefined
          }
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisibility(false)}
        />

        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  picker: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default FormModal;
