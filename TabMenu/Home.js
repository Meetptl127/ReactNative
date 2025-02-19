import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

// First route component
const FirstRoute = () => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <Text>First Screen (Home)</Text>
    <Text style={styles.sampleText}>Tab View Example</Text>
  </ScrollView>
);

// Second route component
const SecondRoute = () => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <Text>Second Screen (TabMenu)</Text>
    <Text style={styles.sampleText}>Tab View Example</Text>
  </ScrollView>
);

// Additional routes (Third, Fourth, Fifth)
const ThirdRoute = () => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <Text>Third Screen</Text>
    <Text style={styles.sampleText}>Tab View Example.</Text>
  </ScrollView>
);

const FourthRoute = () => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <Text>Fourth Screen</Text>
  </ScrollView>
);

const FifthRoute = () => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <Text>Fifth Screen</Text>
  </ScrollView>
);

// Lazy loading placeholder
const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

export default function Home() {
  const [index, setIndex] = React.useState(0); // Using hooks for state
  const [routes] = React.useState([
    { key: "first", title: "Home" },
    { key: "second", title: "TabMenu" },
    { key: "third", title: "ABCMenu" },
    { key: "fourth", title: "XYZMenu" },
    { key: "fifth", title: "LMNMenu" },
  ]);

  const renderLazyPlaceholder = ({ route }) => (
    <LazyPlaceholder route={route} />
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled // Enables horizontal scrolling for tab bar
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
  );

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
        fifth: FifthRoute,
      })}
      renderTabBar={renderTabBar} // Custom renderTabBar with scrollable tabs
      renderLazyPlaceholder={renderLazyPlaceholder}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: "#6200ee",
  },
  indicator: {
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    color: "white",
  },
  sampleText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
