import React from "react";
import { Switch as RNSwitch, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Switch({ value, onValueChange, style }) {
  return (
    <RNSwitch
      trackColor={{
        false: theme.light.colors.border,
        true: theme.light.colors.primary,
      }}
      thumbColor={
        value ? theme.light.colors.primaryForeground : theme.light.colors.input
      }
      ios_backgroundColor={theme.light.colors.border}
      onValueChange={onValueChange}
      value={value}
      style={style}
    />
  );
}
