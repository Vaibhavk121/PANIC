import React from "react";
import { Image, View, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Avatar({ source, size = 40, style }) {
  return (
    <View
      style={[
        styles.wrapper,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <Image
        source={source}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    backgroundColor: theme.light.colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "cover",
  },
});
