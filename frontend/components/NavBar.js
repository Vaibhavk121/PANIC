import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../styles/theme";

export default function NavBar() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    // Navigate to the corresponding screen
    navigation.navigate(tabName.charAt(0).toUpperCase() + tabName.slice(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handleTabPress("home")}
        >
          <Text
            style={[
              styles.iconText,
              activeTab === "home" ? styles.activeIconText : {},
            ]}
          >
            ⌂
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handleTabPress("community")}
        >
          <Text
            style={[
              styles.iconText,
              activeTab === "community" ? styles.activeIconText : {},
            ]}
          >
            👥
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => handleTabPress("profile")}
        >
          <Text
            style={[
              styles.iconText,
              activeTab === "profile" ? styles.activeIconText : {},
            ]}
          >
            ○
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.light.colors.background,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: theme.light.colors.border,
    ...theme.light.shadow.sm,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  iconText: {
    fontSize: 24,
    color: theme.light.colors.mutedForeground,
  },
  activeIconText: {
    color: theme.light.colors.primary,
  },
});
