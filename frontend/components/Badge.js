import React from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Badge({ children, style }) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.light.colors.accent,
    borderRadius: theme.light.radius.full,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  text: {
    color: theme.light.colors.accentForeground,
    fontSize: 12,
    fontFamily: theme.light.fonts.sans,
  },
});
