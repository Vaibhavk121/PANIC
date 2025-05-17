import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function MenuBar({ items, onSelect }) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          style={styles.menuItem}
          onPress={() => onSelect(item)}
        >
          <Text style={styles.menuText}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.light.colors.card,
    borderBottomWidth: 1,
    borderColor: theme.light.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
    fontSize: 16,
  },
});
