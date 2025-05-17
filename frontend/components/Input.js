import React from "react";
import { TextInput, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  style,
  ...props
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={theme.light.colors.mutedForeground}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.light.colors.input,
    borderColor: theme.light.colors.border,
    borderWidth: 1,
    borderRadius: theme.light.radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: theme.light.fonts.sans,
    color: theme.light.colors.foreground,
  },
});
