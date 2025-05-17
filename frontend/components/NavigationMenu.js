import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function NavigationBar({ items, activeIndex = 0, onNavigate }) {
  return (
    <View style={styles.nav}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          style={[
            styles.navItem,
            activeIndex === index && styles.navItemActive,
          ]}
          onPress={() => onNavigate(index)}
        >
          <Text
            style={[
              styles.navText,
              activeIndex === index && styles.navTextActive,
            ]}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    backgroundColor: theme.light.colors.card,
    borderTopWidth: 1,
    borderColor: theme.light.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  navItemActive: {
    borderTopWidth: 3,
    borderTopColor: theme.light.colors.primary,
  },
  navText: {
    fontSize: 14,
    color: theme.light.colors.mutedForeground,
    fontFamily: theme.light.fonts.sans,
  },
  navTextActive: {
    color: theme.light.colors.primary,
    fontWeight: "600",
  },
});
