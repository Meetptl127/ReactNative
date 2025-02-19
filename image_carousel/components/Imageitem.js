import { View, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Imageitem({ item, index, scrollx }) {
  const rnAnimatedstyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollx.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, rnAnimatedstyle]}>
      <Image source={item.url} style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width,
    padding: 20,
  },
  image: {
    height: 200,
    width: width * 0.8,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
