import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { recipes } from "../assets/section";
import { Ionicons } from "@expo/vector-icons"; // Use react-native-vector-icons for non-Expo projects

const Home = () => {
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, index, isActive) => (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{section.title}</Text>
        <Text style={styles.duration}>Duration: {section.duration}</Text>
      </View>
      <Ionicons
        name={isActive ? "chevron-up" : "chevron-down"}
        size={24}
        color="gray"
        style={styles.icon}
      />
    </View>
  );

  const renderContent = (section) => (
    <View style={styles.content}>
      <Text style={styles.recipe}>{section.recipe}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Accordion
        sections={recipes}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setActiveSections}
        expandMultiple={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  duration: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  icon: {
    marginLeft: 10,
  },
  content: {
    padding: 15,
    backgroundColor: "#e8e8e8",
  },
  recipe: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default Home;
