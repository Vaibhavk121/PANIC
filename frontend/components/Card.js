import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.light.colors.card,
    borderRadius: theme.light.radius.lg,
    padding: 16,
    borderColor: theme.light.colors.border,
    borderWidth: 1,
    ...theme.light.shadow.sm,
  },
});
