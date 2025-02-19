import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function AutoImageslide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRefAuto = useRef(null); // Ref for Auto Scroll FlatList

  const images = [
    { id: "1", title: "Item 1", url: require("../assets/d1.webp") },
    { id: "2", title: "Item 2", url: require("../assets/d2.webp") },
    { id: "3", title: "Item 3", url: require("../assets/d3.webp") },
  ];

  // Handle scroll to update currentIndex for auto-scrolling
  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  // Automatically scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length; // Calculate next index

        // If on the last image, reset to the first image
        if (prevIndex === images.length - 1) {
          flatListRefAuto.current.scrollToOffset({ offset: 0, animated: true }); // Reset to the first image
          return 0; // Update the current index to the first image
        } else {
          flatListRefAuto.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          }); // Scroll to the next index
          return nextIndex; // Update the current index
        }
      });
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.url} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  // Dot rendering for the pagination
  const renderDot = (_, index) => (
    <View
      key={index}
      style={[
        styles.dot,
        currentIndex === index ? styles.activeDot : styles.inactiveDot,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* Auto Scroll FlatList */}
      <FlatList
        ref={flatListRefAuto} // Assign ref to Auto-scroll FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.carousel}
      />

      {/* Pagination for Auto and Manual Scroll (3 dots) */}
      <View style={styles.pagination}>{images.map(renderDot)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    alignItems: "center",
  },
  carousel: {
    flexGrow: 0,
  },
  item: {
    width: screenWidth,
    alignItems: "center",
  },
  image: {
    width: screenWidth * 0.8,
    height: 200,
    marginTop: "auto",
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "blue",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});
