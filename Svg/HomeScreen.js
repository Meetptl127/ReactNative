// screens/HomeScreen.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, FlatList, Button, TextInput,
  StyleSheet, TouchableOpacity
} from 'react-native';
import AddItemForm from '../components/AddItemForm';

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const dummy = [
      { id: '1', name: 'Milk', category: 'Dairy', date: new Date().toDateString() },
    ];
    setItems(dummy);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const handleAddItem = (item) => {
    setItems(prev => [...prev, item]);
    setShowForm(false); // ✅ Close form after adding item
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <Button
        title={showForm ? "Hide Form" : "Add New Item"}
        onPress={() => setShowForm(!showForm)}
      />

      {showForm && (
        <AddItemForm
          onAddItem={handleAddItem}
          onCloseForm={() => setShowForm(false)}
        />
      )}

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  item: { backgroundColor: '#f0f0f0', padding: 15, marginVertical: 5, borderRadius: 5 },
  itemText: { fontSize: 18 },
  category: { fontSize: 14, color: 'gray' },
  date: { fontSize: 12, color: 'gray' }
});

export default HomeScreen;
