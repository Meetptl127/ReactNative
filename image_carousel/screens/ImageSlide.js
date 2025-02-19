import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Use this for navigation

const { width: screenWidth } = Dimensions.get("window");

export default function ImageSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation(); // Hook to handle navigation

  const images = [
    { id: "1", title: "Item 1", url: require("../assets/d1.webp") }, // Local .webp image
    { id: "2", title: "Item 2", url: require("../assets/d2.webp") }, // Local .webp image
    { id: "3", title: "Item 3", url: require("../assets/d3.webp") }, // Local .webp image
  ];

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.url} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  // Function to navigate to AutoImageslide
  const Autoslide = () => {
    navigation.navigate("AutoImageslide"); // Navigate to AutoImageslide screen
  };
  const ManualImageSlider = () => {
    navigation.navigate("ManualImageSlider");
  };
  const LastSlider = () => {
    navigation.navigate("LastSlider");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
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
      {/* Button that navigates to AutoImageslide */}
      <Button title="Go to Auto Imageslide" onPress={Autoslide} />
      <Button
        title="Go To next and prev  Image slider "
        onPress={ManualImageSlider}
      />
      <Button title=" Go To Carousel Image slider" onPress={LastSlider} />
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
