import { View, Dimensions, StyleSheet } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import imageData from "../data/Images"; // Replace with your actual image data
import Imageitem from "../components/Imageitem";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function LastSlider() {
  const scrollx = useSharedValue(0); // Shared value to track scroll position
  const listRef = useRef(null); // Ref to control FlatList scrolling
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index for pagination
  const [isFlatListReady, setIsFlatListReady] = useState(false); // Ensure FlatList is ready before scrolling

  // Create a cloned dataset for seamless looping
  const loopedImageData = [
    { ...imageData[imageData.length - 1], id: `clone-start` }, // Add last item at the beginning
    ...imageData, // Original data
    { ...imageData[0], id: `clone-end` }, // Add first item at the end
  ];

  // Handle scroll event to update the shared value
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollx.value = e.contentOffset.x;
    },
  });

  // Handle scroll end to adjust the position for infinite looping
  const handleScrollEnd = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);

    setCurrentIndex(
      index === 0
        ? imageData.length - 1
        : index === loopedImageData.length - 1
        ? 0
        : index - 1
    );

    if (index === 0) {
      // If scrolled to the fake first item, jump to the real last item
      listRef.current.scrollToIndex({
        index: imageData.length, // Real last item
        animated: false,
      });
    } else if (index === loopedImageData.length - 1) {
      // If scrolled to the fake last item, jump to the real first item
      listRef.current.scrollToIndex({
        index: 1, // Real first item
        animated: false,
      });
    }
  };

  // Automatically scroll to the next item every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1 >= imageData.length ? 0 : prevIndex + 1;
        listRef.current?.scrollToIndex({
          index: nextIndex + 1, // Add 1 to skip the fake first item
          animated: true,
        });
        return nextIndex;
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [currentIndex]); // Dependency on currentIndex to trigger scrolling when it changes

  // Automatically scroll to the first real item after FlatList is ready
  useEffect(() => {
    if (isFlatListReady && listRef.current) {
      listRef.current.scrollToIndex({
        index: 1, // Start at the first real item
        animated: false,
      });
    }
  }, [isFlatListReady]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={listRef} // Reference to control the FlatList
        data={loopedImageData} // Use cloned data for seamless loop
        renderItem={({ item, index }) => (
          <Imageitem item={item} index={index} scrollx={scrollx} />
        )}
        keyExtractor={(item) => item.id} // Unique key for each item
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        onMomentumScrollEnd={handleScrollEnd} // Adjust position when scrolling stops
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onLayout={() => setIsFlatListReady(true)} // Mark FlatList as ready on layout
      />

      {/* Dot Pagination */}
      <View style={styles.pagination}>
        {imageData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot, // Active dot style
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  pagination: {
    position: "absolute",
    top: 225, // Add some margin between the image and pagination dots
    left: "50%",
    transform: [{ translateX: -50 }], // Center the pagination dots horizontally
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center pagination dots horizontally
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5, // Spacing between dots
  },
  activeDot: {
    backgroundColor: "blue", // Highlight active dot with blue color
  },
  inactiveDot: {
    backgroundColor: "gray", // Inactive dot with gray color
  },
});

