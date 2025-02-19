// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion'; // Collapsible view component for creating an accordion UI
import { recipes } from './section'; // Importing recipes data from a separate file
import { Ionicons } from '@expo/vector-icons'; // Icon library for UI icons, 'expo' specific (use react-native-vector-icons for other projects)

const Home = () => {
// State to track which sections are currently open
const [activeSections, setActiveSections] = useState([]);

// Function to render the header for each section in the accordion
const renderHeader = (section, index, isActive) => (
<View style={styles.header}>
{/_ TextContainer holds the title and duration text _/}
<View style={styles.textContainer}>
<Text style={styles.title}>{section.title}</Text> {/_ Display recipe title _/}
<Text style={styles.duration}>Duration: {section.duration}</Text> {/_ Display recipe duration _/}
</View>
{/_ Arrow icon changes direction based on isActive state _/}
<Ionicons
name={isActive ? 'chevron-up' : 'chevron-down'} // Toggle icon based on active state
size={24}
color="gray"
style={styles.icon}
/>
</View>
);

// Function to render the content for each section
const renderContent = (section) => (
<View style={styles.content}>
<Text style={styles.recipe}>{section.recipe}</Text> {/_ Display recipe instructions _/}
</View>
);

return (
<ScrollView style={styles.container}>
{/_ Accordion component to handle collapsible sections _/}
<Accordion
sections={recipes} // Data array of recipe sections
activeSections={activeSections} // Controls which sections are open
renderHeader={renderHeader} // Function to render each header
renderContent={renderContent} // Function to render each content
onChange={setActiveSections} // Updates state when section is toggled
expandMultiple={true} // Allows multiple sections to be open simultaneously
/>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
padding: 10, // Padding for the main view container
},
textContainer: {
flex: 1, // Allow the text container to expand horizontally
},
header: {
flexDirection: 'row', // Align items in a row (horizontal)
justifyContent: 'space-between', // Space between title/duration and icon
alignItems: 'center', // Align vertically centered
backgroundColor: '#f4f4f4', // Light background color
padding: 15, // Padding inside the header
borderBottomWidth: 1, // Bottom border for separation
borderBottomColor: '#ccc', // Light gray border color
},
title: {
fontSize: 18, // Font size for title text
fontWeight: 'bold', // Bold title text
},
duration: {
fontSize: 14, // Smaller font size for duration text
color: 'gray', // Gray color for duration
marginTop: 4, // Small margin above the duration
},
icon: {
marginLeft: 10, // Space between text and icon
},
content: {
padding: 15, // Padding inside content view
backgroundColor: '#e8e8e8', // Light background for content
},
recipe: {
fontSize: 16, // Font size for recipe text
lineHeight: 22, // Spacing between lines of text
},
});

export default Home; // Export the Home component for use in the app

Here’s a breakdown of your Home.js code explained in bullet points:

Imports
React, useState: Used for creating the functional component and managing state.
View, Text, StyleSheet, ScrollView: Core React Native components for layout, text, styling, and scrolling.
Accordion from react-native-collapsible: Provides collapsible sections.
recipes from section.js: Imported recipe data.
Ionicons from @expo/vector-icons: Used for the arrow icons indicating the open/close state.
Component and State
const Home = () => {...} defines a functional component.
const [activeSections, setActiveSections] = useState([]): Manages which accordion sections are open. The state is an array holding indices of active sections.
Accordion Header and Content Rendering
renderHeader(section, index, isActive):

Displays the title and duration for each section.
Uses Ionicons to render an arrow icon pointing up or down based on isActive.
renderContent(section):

Displays the recipe instructions for each section.
Accordion Component
sections={recipes} connects the accordion to the data source.
activeSections={activeSections} links the state to the accordion.
renderHeader and renderContent handle section layout.
onChange={setActiveSections} updates activeSections when a section is toggled.
expandMultiple={true} allows more than one section to be open simultaneously.
Styling
StyleSheet.create({...}) defines:
container: Padding for the main view.
header: Layout for the title, duration, and icon in a row with space between.
textContainer: Groups the title and duration together vertically.
title and duration: Styled text components for title and duration.
icon: Adds space between the icon and the text.
content: Padding and background for recipe content.
recipe: Text styling with line spacing for readability.
Return and Export
ScrollView wraps the Accordion to allow scrolling for multiple sections.
export default Home: Exports the Home component for use in other files.
