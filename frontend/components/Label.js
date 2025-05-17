import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Label({ children, style }) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: theme.light.colors.mutedForeground,
    marginBottom: 4,
    fontFamily: theme.light.fonts.sans,
  },
});
