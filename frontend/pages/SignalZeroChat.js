import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';

// Import images
import ArrowLeft from '../assets/icons/ArrowLeft.png';

export default function SignalZeroChat() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! I need help!', sender: 'other', time: '09:41' },
    { id: 2, text: "I'm nearby. What's wrong?", sender: 'me', time: '09:41' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={ArrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Signal-Zero Chat</Text>
      </View>

      <View style={styles.connectionInfo}>
        <Text style={styles.title}>Connected to Vaibhav</Text>
        <Text style={styles.subtitle}>You can now communicate with Vaibhav</Text>
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[styles.message, msg.sender === 'me' ? styles.sentMessage : styles.receivedMessage]}
          >
            <Text style={[styles.messageText, msg.sender === 'me' && styles.sentMessageText]}>
              {msg.text}
            </Text>
            <Text style={[styles.messageTime, msg.sender === 'me' && styles.sentMessageTime]}>
              {msg.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={theme.light.colors.mutedForeground}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.light.colors.border,
  },
  headerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
    color: theme.light.colors.foreground,
  },
  connectionInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.light.colors.foreground,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.light.colors.mutedForeground,
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatContent: {
    paddingVertical: 20,
  },
  message: {
    maxWidth: '80%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 20,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.light.colors.primary,
    borderTopRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.light.colors.card,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: theme.light.colors.foreground,
    marginBottom: 4,
  },
  sentMessageText: {
    color: theme.light.colors.primaryForeground,
  },
  messageTime: {
    fontSize: 12,
    color: theme.light.colors.mutedForeground,
    alignSelf: 'flex-end',
  },
  sentMessageTime: {
    color: theme.light.colors.primaryForeground,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.light.colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: theme.light.colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    fontSize: 16,
    color: theme.light.colors.foreground,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    color: theme.light.colors.primaryForeground,
  },
});
