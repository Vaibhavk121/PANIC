import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Add this import
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import theme from "../styles/theme";
import NavBar from "../components/NavBar";
import SOS from "../pages/SOS"

export default function Home() {
  const navigation = useNavigation(); // Add this line

  const handleSOSPress = () => {
    navigation.navigate('SOS');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>P.A.N.I.C</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={theme.light.colors.foreground}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        <Ionicons
          name="location"
          size={20}
          color={theme.light.colors.primary}
        />
        <Text style={styles.locationText}>Bengaluru</Text>
        <Text style={styles.locationSubtext}>
          Dayanand Sagar College(DSE)
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          placeholderTextColor={theme.light.colors.mutedForeground}
        />
        <Ionicons
          name="search"
          size={20}
          color={theme.light.colors.mutedForeground}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          
          

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('SignalZero')}
          >
            <Card style={styles.featureCard}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="analytics-outline"
                  size={24}
                  color={theme.light.colors.primary}
                />
              </View>
              <Text style={styles.featureTitle}>Signal Zero</Text>
              <Text style={styles.featureSubtitle}>
                Track real-time threats
              </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('AIChatbot')}
          >
            <Card style={styles.featureCard}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color={theme.light.colors.primary}
                />
              </View>
              <Text style={styles.featureTitle}>Crisis Voice</Text>
              <Text style={styles.featureSubtitle}>
                Report incidents and get help
              </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('OfflineGuide')}
          >
            <Card style={styles.featureCard}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="book-outline"
                  size={24}
                  color={theme.light.colors.primary}
                />
              </View>
              <Text style={styles.featureTitle}>Offline Guidelines</Text>
              <Text style={styles.featureSubtitle}>Access safety guides</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('ResourceMap')}
          >
            <Card style={styles.featureCard}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="help-buoy-outline"
                  size={24}
                  color={theme.light.colors.primary}
                />
              </View>
              <Text style={styles.featureTitle}>Find Help</Text>
              <Text style={styles.featureSubtitle}>Connect with resources</Text>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>Active Alerts</Text>

          <Card
            style={[
              styles.alertCard,
              { backgroundColor: theme.light.colors.primary },
            ]}
          >
            <View
              style={[styles.alertHeader, { backgroundColor: "transparent" }]}
            >
              <View>
                <Text
                  style={[
                    styles.alertTitle,
                    { color: theme.light.colors.primaryForeground },
                  ]}
                >
                  Blackout Alert
                </Text>
                <Text
                  style={[
                    styles.alertIssuer,
                    { color: theme.light.colors.primaryForeground },
                  ]}
                >
                  Issued by Central Government
                </Text>
              </View>
              <View
                style={[
                  styles.intensityContainer,
                  {
                    backgroundColor: theme.light.colors.card,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 9999,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.alertIntensity,
                    { color: theme.light.colors.accentForeground },
                  ]}
                >
                  High Intensity
                </Text>
              </View>
            </View>
            <View
              style={[styles.alertContent, { backgroundColor: "transparent" }]}
            >
              <View style={styles.alertInfo}>
                <Ionicons
                  name="location"
                  size={16}
                  color={theme.light.colors.primaryForeground}
                />
                <Text
                  style={[
                    styles.alertText,
                    { color: theme.light.colors.primaryForeground },
                  ]}
                >
                  Jodhpur, Rajasthan
                </Text>
              </View>
              <View style={styles.alertInfo}>
                <Ionicons
                  name="time"
                  size={16}
                  color={theme.light.colors.primaryForeground}
                />
                <Text
                  style={[
                    styles.alertText,
                    { color: theme.light.colors.primaryForeground },
                  ]}
                >
                  13: 28 IST, 17 May 2025
                </Text>
              </View>
              <View
                style={[
                  styles.alertActions,
                  { borderTopColor: "rgba(255, 255, 255, 0.2)" },
                ]}
              >
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={theme.light.colors.primaryForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.primaryForeground },
                    ]}
                  >
                    Share
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="headset-outline"
                    size={20}
                    color={theme.light.colors.primaryForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.primaryForeground },
                    ]}
                  >
                    Listen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={theme.light.colors.primaryForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.primaryForeground },
                    ]}
                  >
                    Guidelines
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <Card
            style={[
              styles.alertCard,
              { backgroundColor: theme.light.colors.accent },
            ]}
          >
            <View
              style={[styles.alertHeader, { backgroundColor: "transparent" }]}
            >
              <View>
                <Text
                  style={[
                    styles.alertTitle,
                    { color: theme.light.colors.accentForeground },
                  ]}
                >
                  Thunderstorm Alert
                </Text>
                <Text
                  style={[
                    styles.alertIssuer,
                    { color: theme.light.colors.accentForeground },
                  ]}
                >
                  Issued by Karnataka Government
                </Text>
              </View>
              <View
                style={[
                  styles.intensityContainer,
                  {
                    backgroundColor: theme.light.colors.card,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 9999,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.alertIntensity,
                    { color: theme.light.colors.accentForeground },
                  ]}
                >
                  Severe Intensity
                </Text>
              </View>
            </View>
            <View
              style={[styles.alertContent, { backgroundColor: "transparent" }]}
            >
              <View style={styles.alertInfo}>
                <Ionicons
                  name="location"
                  size={16}
                  color={theme.light.colors.accentForeground}
                />
                <Text
                  style={[
                    styles.alertText,
                    { color: theme.light.colors.accentForeground },
                  ]}
                >
                  Murshidabad, West Bengal
                </Text>
              </View>
              <View style={styles.alertInfo}>
                <Ionicons
                  name="time"
                  size={16}
                  color={theme.light.colors.accentForeground}
                />
                <Text
                  style={[
                    styles.alertText,
                    { color: theme.light.colors.accentForeground },
                  ]}
                >
                  15: 44 IST, 17 May 2025
                </Text>
              </View>
              <View
                style={[
                  styles.alertActions,
                  { borderTopColor: "rgba(55, 65, 81, 0.2)" },
                ]}
              >
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={theme.light.colors.accentForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.accentForeground },
                    ]}
                  >
                    Share
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="headset-outline"
                    size={20}
                    color={theme.light.colors.accentForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.accentForeground },
                    ]}
                  >
                    Listen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={theme.light.colors.accentForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.accentForeground },
                    ]}
                  >
                    Guidelines
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <Card
            style={[
              styles.alertCard,
              { backgroundColor: theme.light.colors.sidebar },
            ]}
          >
            <View
              style={[styles.alertHeader, { backgroundColor: "transparent" }]}
            >
              <View>
                <Text
                  style={[
                    styles.alertTitle,
                    { color: theme.light.colors.sidebarForeground },
                  ]}
                >
                  Flood Alert
                </Text>
                <Text
                  style={[
                    styles.alertIssuer,
                    { color: theme.light.colors.sidebarForeground },
                  ]}
                >
                  Issued by Karnataka Government
                </Text>
              </View>
              <View
                style={[
                  styles.intensityContainer,
                  {
                    backgroundColor: theme.light.colors.card,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 9999,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.alertIntensity,
                    { color: theme.light.colors.sidebarForeground },
                  ]}
                >
                  Low Intensity
                </Text>
              </View>
            </View>
            <View
              style={[styles.alertContent, { backgroundColor: "transparent" }]}
            >
              <View style={styles.alertInfo}>
                <Ionicons
                  name="location"
                  size={16}
                  color={theme.light.colors.sidebarForeground}
                />
                <Text
                  style={[
                    styles.alertText,
                    { color: theme.light.colors.sidebarForeground },
                  ]}
                >
                  Jajpur, Odisha
                </Text>
              </View>
              <View style={styles.alertInfo}>
                <Ionicons
                  name="time"
                  size={16}
                  color={theme.light.colors.sidebarForeground}
                />
                <Text
                  style={[
                    styles.alertText,
                    { color: theme.light.colors.sidebarForeground },
                  ]}
                >
                  18: 10 IST, 17 May 2025
                </Text>
              </View>
              <View
                style={[
                  styles.alertActions,
                  { borderTopColor: "rgba(30, 41, 59, 0.2)" },
                ]}
              >
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={theme.light.colors.sidebarForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.sidebarForeground },
                    ]}
                  >
                    Share
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="headset-outline"
                    size={20}
                    color={theme.light.colors.sidebarForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.sidebarForeground },
                    ]}
                  >
                    Listen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={theme.light.colors.sidebarForeground}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: theme.light.colors.sidebarForeground },
                    ]}
                  >
                    Guidelines
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.sosButton}
        onPress={handleSOSPress}
      >
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.light.colors.destructive,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
  },
  sosButtonText: {
    color: theme.light.colors.destructiveForeground,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
  },
  notificationIcon: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.light.colors.foreground,
    marginLeft: 8,
    marginRight: 8,
  },
  locationSubtext: {
    fontSize: 14,
    color: theme.light.colors.mutedForeground,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.light.colors.card,
    marginHorizontal: 20,
    borderRadius: theme.light.radius.md,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.light.colors.border,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
  },
  content: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 16,
  },
  gridItem: {
    width: "47%",
  },
  featureCard: {
    padding: 16,
  },
  iconContainer: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.light.colors.foreground,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 12,
    color: theme.light.colors.mutedForeground,
  },
  alertsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.light.colors.foreground,
    marginBottom: 16,
  },
  alertCard: {
    marginBottom: 16,
    overflow: "hidden",
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.light.colors.background,
  },
  alertIntensity: {
    fontSize: 12,
    color: theme.light.colors.background,
    opacity: 0.9,
  },
  alertContent: {
    padding: 12,
  },
  alertInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    color: theme.light.colors.mutedForeground,
    marginLeft: 8,
  },
  alertIssuer: {
    fontSize: 12,
    color: theme.light.colors.background,
    opacity: 0.8,
  },
  alertActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.light.colors.border,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: theme.light.colors.mutedForeground,
    marginLeft: 4,
  },
});
