import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import FormModal from "../components/FormModal"; // Import the form component

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState([]); // Store submitted data
  const [lastSubmittedData, setLastSubmittedData] = useState(null); // Store last submitted form data

  // Function to handle form submission
  const handleFormSubmit = (data) => {
    setFormData([...formData, data]); // Append new data
    setLastSubmittedData(data); // Store last submitted data
    setModalVisible(false); // Close modal
  };

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

      {/* Form Modal with last submitted data as default */}
      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleFormSubmit}
        initialData={lastSubmittedData} // Pass last submitted data
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  item: { padding: 10, marginVertical: 5, backgroundColor: "#ddd" },
});

export default Home;
