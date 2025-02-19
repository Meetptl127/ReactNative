import { View, StyleSheet, Text } from "react-native";
import Icon from "../assets/icon.png";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome  </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
