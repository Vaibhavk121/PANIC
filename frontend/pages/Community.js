import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';
import ArrowLeft from '../assets/icons/ArrowLeft.png';

export default function Community() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: '1',
      sender: 'Mukesh Ranjhawa',
      role: 'Community Member',
      content: 'Has anyone seen my 12-year-old son Rahul? He was last seen near City Park wearing a blue t-shirt and black pants. He has been missing since 3 PM today. Please help!',
      time: '16:04',
      avatar: require('../assets/icons/profile-blue.svg')
    },
    {
      id: '2',
      sender: 'You',
      content: "I think I saw someone matching that description near the Central Library about 30 minutes ago. I'll check with the library staff and let you know.",
      time: '16:04',
      isOwn: true,
      avatar: require('../assets/icons/profile-blue.svg')
    }
  ];

  const typingUsers = [
    { id: '1', avatar: require('../assets/icons/profile-blue.svg') },
    { id: '2', avatar: require('../assets/icons/profile-blue.svg') }
  ];

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isOwn && styles.ownMessageContainer]}>
      {!item.isOwn && (
        <Image source={item.avatar} style={styles.avatar} />
      )}
      <View style={[styles.messageContent, item.isOwn && styles.ownMessageContent]}>
        {!item.isOwn && (
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>{item.sender}</Text>
            <Text style={styles.senderRole}>{item.role}</Text>
          </View>
        )}
        <Text style={[styles.messageText, item.isOwn && styles.ownMessageText]}>
          {item.content}
        </Text>
        {item.images && (
          <View style={styles.imageGrid}>
            {item.images.map((image, index) => (
              <Image key={index} source={image} style={styles.messageImage} />
            ))}
          </View>
        )}
        <Text style={[styles.messageTime, item.isOwn && styles.ownMessageTime]}>
          {item.time}
        </Text>
      </View>
      {item.isOwn && (
        <Image source={item.avatar} style={styles.avatar} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={ArrowLeft} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Community Support</Text>
          <Text style={styles.headerSubtitle}>7 Online, from 12 peoples</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuDots}>•••</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.typingIndicator}>
        <View style={styles.typingAvatars}>
          {typingUsers.map((user, index) => (
            <Image
              key={user.id}
              source={user.avatar}
              style={[styles.typingAvatar, { marginLeft: index > 0 ? -10 : 0 }]}
            />
          ))}
        </View>
        <Text style={styles.typingText}>+2 others are typing</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={theme.light.colors.textSecondary}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Image
            source={require('../assets/icons/ai-audio.svg')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: theme.light.colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.light.colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.light.colors.textSecondary,
    marginTop: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuDots: {
    fontSize: 24,
    color: theme.light.colors.text,
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  messageContent: {
    flex: 1,
    maxWidth: '75%',
    backgroundColor: theme.light.colors.surface,
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 8,
  },
  // Remove imageGrid and messageImage styles since we're not using images
  
  ownMessageContainer: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
    maxWidth: '75%',
    backgroundColor: theme.light.colors.surface,
    borderRadius: 20,
    padding: 15,
  },
  ownMessageContent: {
    backgroundColor: theme.light.colors.primary,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.light.colors.text,
    marginRight: 10,
  },
  senderRole: {
    fontSize: 14,
    color: theme.light.colors.textSecondary,
  },
  messageText: {
    fontSize: 15,
    color: theme.light.colors.text,
    lineHeight: 20,
  },
  ownMessageText: {
    color: theme.light.colors.primaryForeground,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  messageTime: {
    fontSize: 12,
    color: theme.light.colors.textSecondary,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  ownMessageTime: {
    color: theme.light.colors.primaryForeground,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  typingAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.light.colors.background,
  },
  typingText: {
    fontSize: 14,
    color: theme.light.colors.textSecondary,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: theme.light.colors.border,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: theme.light.colors.surface,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: theme.light.colors.text,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: theme.light.colors.primaryForeground,
  },
});