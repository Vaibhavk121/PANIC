import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import theme from "../styles/theme";

const guidelineData = [
  {
    id: 1,
    title: "Operation Sindoor Guidelines",
    subtitle: "Indian Strategic Response to the Pahalgam Terror Attack",
    content: [
      "Stay Informed. Stay Hidden. Stay Safe.",
      "Identify safe shelters or underground areas in advance.",
      "Prepare a go-bag: ID, water, meds, flashlight, and power bank.",
      "During attacks: stay low, away from windows, and in reinforced rooms.",
      "Avoid rooftops or open fields during air raids or shelling.",
      "Use reflective tools or flashlight to signal if trapped.",
      "Don't touch unexploded devices — alert authorities.",
    ],
  }, // Added missing closing bracket and comma
  {
    id: 2,
    title: "Earthquake Survival Guide",
    subtitle:
      "Drop, cover, hold on. Stay away from windows. Expect aftershocks. Keep calm and alert.",
    content: [
      "Anchor heavy objects in your home.",
      "During a quake: get under a sturdy table, away from glass.",
      "If outside, move to open spaces — avoid buildings and poles.",
      "After shocks? Stay alert.",
      "Text, don't call — preserve network capacity.",
    ],
  },
  {
    id: 3,
    title: "Flood Response Instructions",
    subtitle:
      "Move to higher ground. Avoid walking or driving through water. Boil drinking water.",
    content: [
      "Keep documents in waterproof bags.",
      "Move to higher ground immediately during flood warnings.",
      "Avoid walking or driving through moving water.",
      "Watch for live wires and snakes post-flood.",
      "Boil water or use chlorine tablets for safety.",
    ],
  },
  {
    id: 4,
    title: "Cyclone & Storm Safety",
    subtitle:
      "Secure your shelter, stay indoors, unplug devices, and wait for official all-clear messages.",
    content: [
      "Board up windows and secure outdoor items.",
      "Charge all devices and store drinking water.",
      "Move to interior rooms during landfall.",
      "After the cyclone, beware of fallen wires and weak structures.",
    ],
  },
  {
    id: 5,
    title: "Landslide Precautions",
    subtitle:
      "Evacuate slopes during rain. Listen for cracks. Avoid rivers, and stay updated on alerts.",
    content: [
      "Avoid building homes near steep slopes.",
      "During heavy rains, listen for unusual cracking sounds.",
      "Move to higher, safer ground if a slide is imminent.",
      "Afterward, check for injured neighbors and blocked roads.",
    ],
  },
  {
    id: 6,
    title: "Fire & Smoke Hazard Tips",
    subtitle:
      "Crawl under smoke, use stairs, alert others, and never re-enter burning buildings.",
      content: [
      "Crawl under smoke to stay alert.",
      "Use stairs to avoid falling.",
      "Avoid re-entering buildings after a fire.",
      "Stay informed about fire safety tips and evacuation routes.",
    ],
  },
];

// Also update the component name
// Add the filtering logic before the return statement
export default function OfflineGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const handleCardPress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredGuidelines = guidelineData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Offline Survival Guide</Text>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={theme.light.colors.mutedForeground}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search guidelines"
            placeholderTextColor={theme.light.colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        overScrollMode="always"
      >
        {filteredGuidelines.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleCardPress(item.id)}
            activeOpacity={0.7}
          >
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons
                  name={expandedId === item.id ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={theme.light.colors.mutedForeground}
                />
              </View>
              {expandedId === item.id && item.content && (
                <View style={[styles.cardContent, { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.light.colors.border }]}>
                  {item.content.map((point, index) => (
                    <Text key={index} style={[styles.cardSubtitle, { paddingVertical: 4 }]}>
                      • {point}
                    </Text>
                  ))}
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: theme.light.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.light.colors.card,
    borderRadius: theme.light.radius.md,
    borderWidth: 1,
    borderColor: theme.light.colors.border,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Extra padding at bottom for last card visibility
  },
  card: {
    marginBottom: 16, // Increased margin for better spacing
    width: "100%",
    backgroundColor: theme.light.colors.sidebarAccent,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.light.colors.mutedForeground,
    fontFamily: theme.light.fonts.sans,
  },
});
