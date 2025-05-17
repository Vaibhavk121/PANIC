import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../styles/theme";
import ArrowLeft from "../assets/icons/ArrowLeft.png";

const { width } = Dimensions.get("window");

export default function AIChatbot() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");

  const topics = [
    "Operation Sindoor",
    "Blackout",
    "Hurricane defense",
    "War",
    "Global Warming",
    "Landslides",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={ArrowLeft} style={styles.backIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuDots}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Hello, Suresh</Text>
        <Text style={styles.subtitle}>How can I help?</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>AI Powered Disaster Assistant</Text>
        </View>
      </View>

      {/* Chat Area */}
      <View style={styles.chatArea}>
        {/* Topics */}
        <View style={styles.topicsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicsContainer}
          >
            {topics.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.topicButton}>
                <Text style={styles.topicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={theme.light.colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={2}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Image
              source={require("../assets/icons/ai-audio.svg")}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  menuDots: {
    fontSize: 24,
    color: theme.light.colors.text,
    lineHeight: 24,
    marginTop: -8,
  },
  content: {
    alignItems: "center",
    paddingTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: theme.light.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    color: theme.light.colors.text,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: theme.light.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  badgeText: {
    color: theme.light.colors.primary,
    fontSize: 16,
  },
  chatArea: {
    backgroundColor: theme.light.colors.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    marginTop: 'auto',
  },
  topicsWrapper: {
    backgroundColor: theme.light.colors.background,
    borderRadius: 25,
    margin: 15,
    padding: 5,
  },
  topicsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  topicButton: {
    backgroundColor: theme.light.colors.surface,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: theme.light.colors.border,
  },
  topicText: {
    color: theme.light.colors.text,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: theme.light.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.light.colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: theme.light.colors.background,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: theme.light.colors.text,
    marginRight: 10,
    minHeight: 50,
    maxHeight: 100,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: theme.light.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    width: 22,
    height: 22,
    tintColor: theme.light.colors.primaryForeground,
  },
});
