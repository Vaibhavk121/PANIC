import React, { useRef, useState } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import theme from "../styles/theme";

const { width } = Dimensions.get("window");

export default function Carousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef();

  const onScroll = (e) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
        style={styles.scrollView}
      >
        {React.Children.map(children, (child, index) => (
          <View style={{ width }}>{child}</View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {React.Children.map(children, (child, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: theme.light.colors.background,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.light.colors.mutedForeground,
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: theme.light.colors.primary,
  },
});
