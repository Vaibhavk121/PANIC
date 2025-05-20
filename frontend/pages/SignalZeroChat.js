import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';

// Import images
import ArrowLeft from '../assets/icons/ArrowLeft.png';

export default function SignalZeroChat() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [deviceId, setDeviceId] = useState(`device_${Math.random().toString(36).substring(2, 9)}`); // Generate unique device ID
  const scrollViewRef = useRef(null);

  const ws = useRef(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket('ws://192.168.141.207:5000');
    
    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
      // Send a join message to identify this device
      const joinMessage = {
        type: 'join',
        deviceId: deviceId,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      ws.current.send(JSON.stringify(joinMessage));
    };
    
    ws.current.onmessage = (event) => {
      try {
        if (typeof event.data === 'string' && (event.data.startsWith('{') || event.data.startsWith('['))) {
          const newMessage = JSON.parse(event.data);
          console.log("Received message:", newMessage); // Add this for debugging
          
          // Add to messages without filtering by deviceId
          setMessages((prevMessages) => [...prevMessages, {
            ...newMessage,
            sender: newMessage.deviceId === deviceId ? 'me' : 'other'
          }]);
        } else {
          console.log('Received non-JSON message:', event.data);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
    
    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
      // Attempt to reconnect after a delay
      setTimeout(connectWebSocket, 3000);
    };
    
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.current.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now() + Math.random(), // Use timestamp + random for more unique IDs
        text: message,
        type: 'chat',
        sender: 'me',
        deviceId: deviceId, // Add device identifier
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      // Send to server first
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(newMessage));
      } else {
        console.error('WebSocket is not connected');
      }
      
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={ArrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Community Chat</Text>
      </View>

      <View style={styles.connectionInfo}>
        <Text style={styles.title}>Connected to Community</Text>
        <Text style={styles.subtitle}>Device ID: {deviceId.substring(0, 8)}</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatArea} 
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} // Make sure this ID is truly unique
            style={[styles.message, msg.sender === 'me' ? styles.sentMessage : styles.receivedMessage]}
          >
            {msg.sender !== 'me' && (
              <Text style={styles.senderName}>
                {msg.deviceId ? msg.deviceId.substring(0, 8) : 'Unknown'}
              </Text>
            )}
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
