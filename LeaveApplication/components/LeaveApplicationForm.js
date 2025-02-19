// components/LeaveApplicationForm.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function LeaveApplicationForm({
  onSubmit,
  onDemoSubmit,
  onClose,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);

  const getMinDate = () => new Date();

  const handleFormSubmit = () => {
    if (!startDate || !endDate || !reason || !email) {
      Alert.alert("Incomplete Data", "Please fill out all fields.");
      return;
    }
    onSubmit({ startDate, endDate, reason, email });
    resetForm();
  };

  const handleDemoSubmission = () => {
    if (!startDate || !endDate || !reason || !email) {
      Alert.alert("Incomplete Data", "Please fill out all fields.");
      return;
    }
    onDemoSubmit({ startDate, endDate, reason, email });
    resetForm();
  };

  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setReason("");
    onClose();
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Apply for Leave</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setStartPickerVisibility(true)}
      >
        <Text style={styles.dateText}>
          {startDate ? `Start Date: ${startDate}` : "Select Start Date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        minimumDate={getMinDate()}
        onConfirm={(date) => {
          setStartDate(date.toISOString().split("T")[0]);
          setStartPickerVisibility(false);
        }}
        onCancel={() => setStartPickerVisibility(false)}
      />

      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setEndPickerVisibility(true)}
      >
        <Text style={styles.dateText}>
          {endDate ? `End Date: ${endDate}` : "Select End Date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        minimumDate={startDate ? new Date(startDate) : getMinDate()}
        onConfirm={(date) => {
          setEndDate(date.toISOString().split("T")[0]);
          setEndPickerVisibility(false);
        }}
        onCancel={() => setEndPickerVisibility(false)}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Reason"
        placeholderTextColor="#666"
        multiline
        numberOfLines={4}
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Submit Leave</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4caf50", marginTop: 10 }]}
        onPress={handleDemoSubmission}
      >
        <Text style={styles.buttonText}>Demo Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fffbe0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ffe0b2",
  },
  formTitle: {
    fontSize: 20,
    color: "#fb8c00",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dateInput: {
    backgroundColor: "#fff",
    borderColor: "#ffe0b2",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ffe0b2",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    color: "#000",
  },
  button: {
    backgroundColor: "#fb8c00",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
