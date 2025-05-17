import React from "react";
import { TextInput, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function TextArea({
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}) {
  return (
    <TextInput
      multiline
      numberOfLines={4}
      style={[styles.textarea, style]}
      placeholder={placeholder}
      placeholderTextColor={theme.light.colors.mutedForeground}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    backgroundColor: theme.light.colors.input,
    borderColor: theme.light.colors.border,
    borderWidth: 1,
    borderRadius: theme.light.radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: theme.light.fonts.sans,
    color: theme.light.colors.foreground,
    textAlignVertical: "top",
  },
});
