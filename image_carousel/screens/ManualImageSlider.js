import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Button,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function ManualImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null); // Ref to control FlatList scrolling

  const images = [
    { id: "1", title: "Item 1", url: require("../assets/d1.webp") },
    { id: "2", title: "Item 2", url: require("../assets/d2.webp") },
    { id: "3", title: "Item 3", url: require("../assets/d3.webp") },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % images.length; // Cycle to next image
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      return nextIndex;
    });
  };
  const isLastImage = currentIndex === images.length - 1;
  const isPrevImage = currentIndex === 0;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexCalc = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      flatListRef.current.scrollToIndex({
        index: prevIndexCalc,
        animated: true,
      });
      return prevIndexCalc;
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.url} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Set the ref here to control the scrolling programmatically
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual swipe
        initialScrollIndex={currentIndex}
        style={styles.carousel}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <Button title="Previous" onPress={handlePrev} disabled={isPrevImage} />
        <Button title="Next" onPress={handleNext} disabled={isLastImage} />
      </View>
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
  buttons: {
    marginTop: 20,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
