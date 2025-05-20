import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../styles/theme";
import Community from "../pages/Community";

// Icons
const icons = {
  home: {
    active: require("../assets/icons/home-blue.png"),
    inactive: require("../assets/icons/home.png"),
  },
  community: {
    active: require("../assets/icons/community-blue.png"),
    inactive: require("../assets/icons/community.png"),
  },
  profile: {
    active: require("../assets/icons/profile-blue.png"),
    inactive: require("../assets/icons/profile.png"),
  },
};

export default function NavBar() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "home":
        navigation.navigate("Home"); // Navigates to Home.js
        break;
      case "community":
        navigation.navigate("Community"); // Navigates to Community.js
        break;
      case "profile":
        navigation.navigate("SmartProfile"); // Navigates to SmartProfile.js
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        {["home", "community", "profile"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab)}
          >
            <Image
              source={
                activeTab === tab ? icons[tab].active : icons[tab].inactive
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "transparent",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.light.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: "100%",
    borderTopWidth: 1,
    borderColor: theme.light.colors.border,
    ...theme.light.shadow.sm,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});