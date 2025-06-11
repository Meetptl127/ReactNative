// components/AddItemForm.js
import React, { useState } from 'react';
import {
  View, TextInput, Button, StyleSheet,
  Text, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddItemForm = ({ onAddItem, onCloseForm }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name,
      category,
      date: date.toDateString()
    };

    onAddItem(newItem);       // Save data
    onCloseForm();            // ✅ Close form
    setName('');
    setCategory('General');
    setDate(new Date());
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    setShowPicker(false);  // ✅ Always hide after selection
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Item name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Dairy" value="Dairy" />
        <Picker.Item label="Fruits" value="Fruits" />
        <Picker.Item label="Bakery" value="Bakery" />
      </Picker>

      <Button title="Select Date" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.dateText}>Selected Date: {date.toDateString()}</Text>

      <Button title="Add Item" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 10, backgroundColor: '#fff',
    marginVertical: 10, borderRadius: 10
  },
  input: {
    borderWidth: 1, marginBottom: 10,
    padding: 10, borderRadius: 5
  },
  dateText: { marginVertical: 10, color: 'gray' }
});

export default AddItemForm;
w