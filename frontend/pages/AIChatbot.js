import React, { useState, useRef, useEffect } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from 'axios';
import theme from "../styles/theme";
import ArrowLeft from "../assets/icons/ArrowLeft.png";
import * as Speech from 'expo-speech';

const { width } = Dimensions.get("window");

export default function AIChatbot() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const scrollViewRef = useRef();

  const topics = [
    "Operation Sindoor",
    "Blackout",
    "Hurricane defense",
    "War",
    "Global Warming",
    "Landslides",
  ];

  // Stop speech when component unmounts or screen loses focus
  useEffect(() => {
    return () => {
      // Stop any ongoing speech when component unmounts
      Speech.stop();
    };
  }, []);

  // Add focus/blur listeners to handle navigation
  useFocusEffect(
    React.useCallback(() => {
      // Component is focused
      const onBlur = () => {
        // Stop speech when navigating away
        Speech.stop();
      };

      // Add listener for when the back button is pressed or user navigates away
      const unsubscribe = navigation.addListener('blur', onBlur);

      // Return cleanup function
      return () => {
        unsubscribe();
      };
    }, [navigation])
  );

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage = {
        text: message,
        isUser: true,
        timestamp: new Date().toISOString(),
      };
      setChatHistory(prevChat => [...prevChat, userMessage]);
      const sentMessage = message;
      setMessage("");
      try {
        const res = await axios.post('http://192.168.141.207:5000/api/ai/prompt', {
          question: sentMessage,
        }, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjhjNWEzMDk0ODZhYzI2Njk1ODRjMyIsImlhdCI6MTc0NzUwNjQyMiwiZXhwIjoxNzUwMDk4NDIyfQ.IHv53jxt1hWNNfwzTG2vEVBXe38XQfCPr-Q2yFj27NE`
          }
        });
        const aiMessage = {
          text: res.data.response,
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        setChatHistory(prevChat => [...prevChat, aiMessage]);
        
        // Only speak if the component is still mounted and in focus
        Speech.speak(res.data.response, { language: 'en' });
      } catch (error) {
        const errorMessage = {
          text: "Sorry, I couldn't process your request. Please try again.",
          isUser: false,
          timestamp: new Date().toISOString(),
          isError: true,
        };
        setChatHistory(prevChat => [...prevChat, errorMessage]);
      }
    }
  };

  const handleTopicSelect = (topic) => {
    setMessage(topic);
  };

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
              <TouchableOpacity 
                key={index} 
                style={styles.topicButton}
                onPress={() => handleTopicSelect(topic)}
              >
                <Text style={styles.topicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Chat Messages */}
        <ScrollView 
          style={styles.chatContainer}
          ref={scrollViewRef}
          contentContainerStyle={styles.chatContentContainer}
        >
          {chatHistory.length === 0 ? (
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatText}>
                Send a message to start chatting
              </Text>
            </View>
          ) : (
            chatHistory.map((chat, index) => (
              <View 
                key={index} 
                style={[
                  styles.messageBubble,
                  chat.isUser ? styles.userMessage : styles.aiMessage,
                  chat.isError && styles.errorMessage
                ]}
              >
                <Text style={styles.messageText}>{chat.text}</Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message or use your keyboard's mic"
            placeholderTextColor={theme.light.colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={2}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Image
              source={require("../assets/icons/ArrowLeft.png")}
              style={[
                styles.sendIcon,
                { transform: [{ rotate: '180deg' }] } // Rotate left arrow to make it point right
              ]}
            />
          </TouchableOpacity>
          {/* Mic button for visual only, will not start voice recognition in Expo Go */}
          <TouchableOpacity style={styles.voiceButton} onPress={() => {
            alert("Voice input is not supported in Expo Go. Use your keyboard's mic button instead.");
          }}>
            <Text>🎤</Text>
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
    paddingTop: 20,
    paddingBottom: 20,
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
    flex: 1,
    backgroundColor: theme.light.colors.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
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
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  chatContentContainer: {
    paddingBottom: 20,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyChatText: {
    color: theme.light.colors.textSecondary,
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.light.colors.primary,
    borderBottomRightRadius: 5,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.light.colors.card,
    borderBottomLeftRadius: 5,
  },
  errorMessage: {
    backgroundColor: '#ffdddd',
  },
  messageText: {
    fontSize: 16,
    color: theme.light.colors.text,
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
    borderWidth: 1,
    borderColor: theme.light.colors.border,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.light.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: theme.light.colors.primaryForeground,
  },
  voiceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.light.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
