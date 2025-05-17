import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Button({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.light.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.light.radius.md,
    ...theme.light.shadow.sm,
  },
  text: {
    color: theme.light.colors.primaryForeground,
    fontSize: 16,
    fontFamily: theme.light.fonts.sans,
    textAlign: "center",
  },
});
