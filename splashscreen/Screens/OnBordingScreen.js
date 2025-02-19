import { View, Dimensions, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";

// Get Device Dimensions
const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Onboarding
        // Navigation after Onboarding completes
        onSkip={() => navigation.replace("HomeScreen")}
        onDone={() => navigation.replace("HomeScreen")}
        // Onboarding Pages
        pages={[
          {
            backgroundColor: "#FFCDD2",
            image: (
              <LottieView
                source={require("../assets/Navigation/Animation - 1734430961658.json")}
                autoPlay
                loop
                style={styles.animation}
              />
            ),
            title: "Celebrate the Festive Spirit",
            subtitle:
              "Hear the cheerful sound of the Christmas bell and spread joy",
          },
          {
            backgroundColor: "#C8E6C9",
            image: (
              <LottieView
                source={require("../assets/Navigation/Animation - 1734431061199.json")}
                autoPlay
                loop
                style={styles.animation}
              />
            ),
            title: "Gifts of Love and Joy",
            subtitle:
              "Share gifts with your loved ones and make this season memorable.",
          },
          {
            backgroundColor: "#FFF9C4",
            image: (
              <LottieView
                source={require("../assets/Navigation/Animation - 1734431088991.json")}
                autoPlay
                loop
                style={styles.animation}
              />
            ),
            title: "Merry Christmas!",
            subtitle:
              "Wishing you a season filled with love, laughter, and happiness.",
          },
        ]}
        // Customize the bottom buttons
        containerStyles={styles.onboardingContainer}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  animation: {
    width: width * 0.8, // 80% of device width
    height: height * 0.4, // 40% of device height
  },
  onboardingContainer: {
    paddingHorizontal: 20, // Horizontal padding
  },
});
