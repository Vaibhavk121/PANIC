import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../styles/theme";

export default function Checkbox({ checked, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.box, style]}>
      {checked && (
        <Ionicons
          name="checkmark"
          size={16}
          color={theme.light.colors.primaryForeground}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    borderRadius: theme.light.radius.sm,
    backgroundColor: theme.light.colors.background,
    borderColor: theme.light.colors.border,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
