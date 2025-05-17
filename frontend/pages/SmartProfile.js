import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';

const menuItems = [
  { id: 1, title: 'Account', icon: require('../assets/icons/profile-blue.svg') },
  { id: 2, title: 'Medical Information', icon: require('../assets/icons/find-help-blue.svg') },
  { id: 3, title: 'Emergency Contacts', icon: require('../assets/icons/notification.svg') },
  { id: 4, title: 'Chat settings', icon: require('../assets/icons/community-blue.svg') },
  { id: 5, title: 'Data and storage', icon: require('../assets/icons/signal-zero-blue.svg') },
  { id: 6, title: 'Privacy and security', icon: require('../assets/icons/find-help-blue.svg') },
  { id: 7, title: 'About', icon: require('../assets/icons/offline-guidelines-blue.svg') },
];

const medicalInfo = {
  allergies: ['Penicillin', 'Peanuts'],
  conditions: ['Asthma'],
  bloodType: 'O+',
  emergencyContacts: [
    { name: 'John Doe', relation: 'Father', phone: '+1234567890' },
    { name: 'Jane Doe', relation: 'Mother', phone: '+1234567891' },
  ],
};

export default function SmartProfile() {
  const navigation = useNavigation();
  const [showMedicalInfo, setShowMedicalInfo] = useState(false);

  const renderMenuItem = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.menuItem}
      onPress={() => {
        if (item.title === 'Medical Information') {
          setShowMedicalInfo(!showMedicalInfo);
        }
      }}
    >
      <View style={styles.menuIconContainer}>
        <Image source={item.icon} style={styles.menuIcon} />
      </View>
      <Text style={styles.menuText}>{item.title}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  const renderMedicalInfo = () => (
    <View style={styles.medicalInfoContainer}>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Allergies:</Text>
        {medicalInfo.allergies.map((allergy, index) => (
          <Text key={index} style={styles.infoText}>• {allergy}</Text>
        ))}
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Medical Conditions:</Text>
        {medicalInfo.conditions.map((condition, index) => (
          <Text key={index} style={styles.infoText}>• {condition}</Text>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Blood Type:</Text>
        <Text style={styles.infoText}>{medicalInfo.bloodType}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Emergency Contacts:</Text>
        {medicalInfo.emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.infoText}>• {contact.name} ({contact.relation})</Text>
            <Text style={styles.infoText}>  {contact.phone}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}><Text style={{ fontSize: 28 }}>‹</Text> Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/search.svg')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profile}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <Text style={styles.name}>Suresh M</Text>
          <Text style={styles.bio}>Trust your feelings , be a good human being</Text>
        </View>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
        {showMedicalInfo && renderMedicalInfo()}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/icons/home.svg')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/icons/community.svg')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.profileIndicator} />
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
    backgroundColor: theme.light.colors.surface,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,  // Keep original size for 'Settings' text
    color: theme.light.colors.text,
  },
  
  // Add this before the backButton style
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  profile: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.light.colors.border,
    marginBottom: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.light.colors.text,
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: theme.light.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: theme.light.colors.primary,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: theme.light.colors.text,
  },
  menuArrow: {
    fontSize: 20,
    color: theme.light.colors.textSecondary,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: theme.light.colors.border,
    backgroundColor: theme.light.colors.surface,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  profileIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.light.colors.primary,
  },
  medicalInfoContainer: {
    backgroundColor: theme.light.colors.surface,
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  infoSection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.light.colors.border + '40',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.light.colors.primary,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: theme.light.colors.text,
    marginLeft: 10,
    marginBottom: 8,
    lineHeight: 22,
  },
  contactItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.light.colors.border + '20',
  },
});

// Update the renderMedicalInfo function
const renderMedicalInfo = () => (
  <View style={styles.medicalInfoContainer}>
    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>🚨 Allergies</Text>
      {medicalInfo.allergies.map((allergy, index) => (
        <Text key={index} style={styles.infoText}>• {allergy}</Text>
      ))}
    </View>
    
    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>🏥 Medical Conditions</Text>
      {medicalInfo.conditions.map((condition, index) => (
        <Text key={index} style={styles.infoText}>• {condition}</Text>
      ))}
    </View>

    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>🩸 Blood Type</Text>
      <Text style={styles.infoText}>{medicalInfo.bloodType}</Text>
    </View>

    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>📞 Emergency Contacts</Text>
      {medicalInfo.emergencyContacts.map((contact, index) => (
        <View key={index} style={styles.contactItem}>
          <Text style={[styles.infoText, { fontWeight: '500' }]}>• {contact.name}</Text>
          <Text style={[styles.infoText, { color: theme.light.colors.textSecondary }]}>
            {contact.relation} | {contact.phone}
          </Text>
        </View>
      ))}
    </View>
  </View>
);