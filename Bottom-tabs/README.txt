
Bottom Tab Navigation App

This project demonstrates a React Native app using Expo and React Navigation to implement a bottom tab navigation system. The app includes custom icons, screen components, and responsive styling for mobile devices.

Table of Contents
1. Project Overview
2. Installation
3. Usage
4. Folder Structure
5. Components
6. Screen Details
7. Tab Navigation Features
8. Commands

---

Project Overview

This application features a bottom tab navigator with four screens:
- Home: Displays the main screen.
- Guest: Showcases guest speakers.
- Search: Allows searching functionality.
- Profile: Contains user profile information.

Each tab includes:
- A custom icon.
- A label that changes color and styling based on focus.
- Responsive design for various screen sizes.

---

Installation

Follow these steps to set up the project:

1. Clone the repository:
   git clone <repository-url>
2. Navigate to the project directory:
   cd <project-directory>
3. Install dependencies:
   npm install
4. Run the app using Expo:
   npm start

---

Usage

1. Start the app using the above commands.
2. Use the bottom navigation bar to switch between Home, Guest, Search, and Profile tabs.
3. Observe custom styling for active and inactive tabs:
   - Active tabs have a top border and a specific background color.
   - Labels and icons adapt their color based on focus.

---

Folder Structure

The project is organized as follows:

├── components/
│   └── Ui/
│       ├── HomeIcon.js      # Custom icon for Home tab
│       ├── GuestIcon.js     # Custom icon for Guest tab
│       ├── SearchIcon.js    # Custom icon for Search tab
│       ├── ProfileIcon.js   # Custom icon for Profile tab
├── screens/
│   ├── HomeScreen.js        # Home screen component
│   ├── GuestSpekars.js      # Guest speakers screen component
│   ├── Search.js            # Search screen component
│   ├── Profile.js           # Profile screen component
├── App.js                   # Main app entry point

---

Components

HomeIcon, GuestIcon, SearchIcon, ProfileIcon
These are custom SVG components used as tab icons. Each icon changes its color dynamically based on the active or inactive state.

App.js
The main file sets up:
- Bottom Tab Navigator for handling screen navigation.
- Custom styling for icons, labels, and active tab indicators.

---

Screen Details

1. Home Screen
- Displays the main content for the app.
- Associated with the HomeIcon.

2. Guest Screen
- Highlights guest speakers or other relevant information.
- Associated with the GuestIcon.

3. Search Screen
- Allows users to search for content or features.
- Associated with the SearchIcon.

4. Profile Screen
- Displays user profile information.
- Associated with the ProfileIcon.

---

Tab Navigation Features

Active Tab Styling
- Top border with color: #0D01AC.
- Active label color: #0D01AC.
- Active background: #F2ECFE.

Inactive Tab Styling
- Inactive label color: #111111.

Responsive Design
- Icon and label paddings are calculated using screen dimensions (Dimensions.get("window")).

---

Commands

Here’s a list of key commands used in the project:

App Initialization
- Expo CLI: Initializes and runs the app.
  npm start

Installing Dependencies
- React Navigation: For navigation features.
  npm install @react-navigation/native
- Bottom Tab Navigator: For bottom navigation.
  npm install @react-navigation/bottom-tabs
- React Native Screens and Gesture Handler:
  npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
- SVG Support: For custom icons.
  npm install react-native-svg

Running the App
- Run with Expo:
  npm start
- Launch in a simulator or physical device:
  - Scan the QR code from the Expo Go app.
  - Use i for iOS and a for Android simulators.

---

Example Code

Here’s a snippet for adding a new screen to the bottom tab navigation:

<BottomTab.Screen 
  name="NewScreen" 
  component={NewScreenComponent} 
  options={{
    tabBarIcon: ({ color, size }) => (
      <NewIcon width={size} height={size} fill={color} />
    ),
    tabBarLabel: "New",
  }}
/>

---

Future Improvements
- Add animations to the tab transitions.
- Implement dynamic content loading for each screen.
- Customize icons further with additional states.

---

Feel free to reach out if you have any questions or suggestions for the project!
