File 1: FormModal.js (Modal for Form Input)
This file defines a modal component that allows users to input their name, email, date, and time. The selected data is then sent back to the parent component (Home.js) when the user submits the form.

Breakdown of FormModal.js

1. Import Required Dependencies
   js
   Copy
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
   useState → Manages component state (e.g., storing form inputs).
   Modal → Displays a popup/modal for the form.
   TouchableOpacity → Used to make date and time pickers clickable.
   DateTimePicker → Provides a date/time selection UI.
2. Define FormModal Component
   js
   Copy
   const FormModal = ({ visible, onClose, onSubmit }) => {
   visible → Boolean that controls whether the modal is visible or not.
   onClose → Function to close the modal.
   onSubmit → Function that sends form data to the parent component (Home.js).
3. Define State Variables
   js
   Copy
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [date, setDate] = useState(null); // Store full Date object
   const [time, setTime] = useState(null);
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
   name, email → Store user inputs.
   date, time → Store selected date and time as JavaScript Date objects.
   isDatePickerVisible, isTimePickerVisible → Control the visibility of the date and time pickers.
4. Handle Date and Time Selection
   js
   Copy
   const handleDateConfirm = (selectedDate) => {
   setDate(selectedDate); // Save full date object
   setDatePickerVisibility(false);
   };

const handleTimeConfirm = (selectedTime) => {
setTime(selectedTime); // Save full time object
setTimePickerVisibility(false);
};
When a user picks a date/time, it's stored in the state.
The pickers are closed after selection. 5. Handle Form Submission
js
Copy
const handleSubmit = () => {
onSubmit({
name,
email,
date: date ? date.toDateString() : "", // Convert Date object to readable string
time: time ? time.toLocaleTimeString() : "",
});

// Reset form fields after submission
setName("");
setEmail("");
setDate(null);
setTime(null);
};
Converts date and time into readable strings before submitting.
Resets all fields after form submission. 6. Render UI
js
Copy
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

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        date={date || new Date()} // Keep last selected date
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      {/* Open Time Picker */}
      <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
        <Text style={styles.picker}>
          {time ? time.toLocaleTimeString() : "Select Time"}
        </Text>
      </TouchableOpacity>

      <DateTimePicker
        isVisible={isTimePickerVisible}
        mode="time"
        date={time || new Date()} // Keep last selected time
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
      />

      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onClose} color="red" />
    </View>

  </Modal>
);
Displays input fields for name, email, date, and time.
Clicking on date/time fields opens their respective pickers.
Includes Submit and Cancel buttons.
7. Define Styles
js
Copy
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
File 2: Home.js (Main Screen)
This file contains the main screen where users can open the form modal and see a list of submitted form data.

Breakdown of Home.js

1.  Import Dependencies
    js
    Copy
    import React, { useState } from "react";
    import { View, Text, Button, FlatList, StyleSheet } from "react-native";
    import FormModal from "../components/FormModal"; // Import FormModal component
    FlatList → Displays a list of submitted form data.
2.  Define Home Component
    js
    Copy
    const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState([]); // Store submitted data
    modalVisible → Controls visibility of FormModal.
    formData → Stores submitted form data.
3.  Handle Form Submission
    js
    Copy
    const handleFormSubmit = (data) => {
    setFormData([...formData, data]); // Append new data
    setModalVisible(false); // Close modal
    };
    Adds submitted form data to formData array.
    Closes the modal after submission.
4.  Render UI
    js
    Copy
    return (
    <View style={styles.container}>
    <Button title="Add" onPress={() => setModalVisible(true)} />

        {/* List of submitted form data */}
        <FlatList
          data={formData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Time: {item.time}</Text>
            </View>
          )}
        />

        {/* Form Modal */}
        <FormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleFormSubmit}
        />

      </View>
    );
    Clicking Add opens the FormModal.
    Uses FlatList to display submitted data.

5.  Define Styles
    js
    Copy
    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    item: { padding: 10, marginVertical: 5, backgroundColor: "#ddd" },
    });
    Summary
    FormModal.js → A modal that allows users to enter details and pick a date/time.
    Home.js → Displays a list of submitted data and opens the modal on button click.
