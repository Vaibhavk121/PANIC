import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';

// Import images directly
import ArrowLeft from '../assets/icons/ArrowLeft.png';
import Bluetooth from '../assets/icons/Bluetooth.png';

export default function SignalZero() {
  const navigation = useNavigation();
  const [waves] = useState([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDummyUser, setShowDummyUser] = useState(false);

  const startSearchAnimation = () => {
    setIsSearching(true);
    const animations = waves.map((wave, index) => {
      return Animated.sequence([
        Animated.delay(index * 1000),
        Animated.loop(
          Animated.sequence([
            Animated.timing(wave, {
              toValue: 2,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(wave, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ),
      ]);
    });

    Animated.parallel(animations).start();
    // Show dummy user after 3 seconds
    setTimeout(() => setShowDummyUser(true), 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={ArrowLeft} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Searching Nearby Users...</Text>
      <Text style={styles.subtitle}>Turn on your Bluetooth to connect with{"\n"}other P.A.N.I.C users</Text>

      <View style={styles.searchArea}>
        {isSearching && waves.map((wave, index) => (
          <Animated.View
            key={index}
            style={[
              styles.wave,
              {
                transform: [{ scale: wave }],
                opacity: wave.interpolate({
                  inputRange: [1, 2],
                  outputRange: [0.6, 0],
                }),
              },
            ]}
          />
        ))}
        
        <TouchableOpacity 
          style={styles.bluetoothButton}
          onPress={startSearchAnimation}
        >
          <Image 
            source={Bluetooth} 
            style={styles.bluetoothIcon} 
          />
        </TouchableOpacity>

        {showDummyUser && (
          <TouchableOpacity 
            style={styles.dummyUser}
            onPress={() => navigation.navigate('SignalZeroChat')}
          >
            <View style={styles.userAvatar}>
              <Text style={styles.userInitial}>V</Text>
            </View>
            <Text style={styles.userName}>Vaibhav</Text>
          </TouchableOpacity>
        )}
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
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 30,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.light.colors.foreground,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.light.colors.mutedForeground,
    marginBottom: 50,
  },
  searchArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    borderWidth: 1,
    borderColor: theme.light.colors.primary,
    backgroundColor: 'transparent',
  },
  bluetoothButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.light.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bluetoothIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    tintColor: theme.light.colors.primaryForeground,
  },
  dummyUser: {
    position: 'absolute',
    alignItems: 'center',
    top: '40%',
    right: '30%',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.light.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    color: theme.light.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    marginTop: 5,
    fontSize: 12,
    color: theme.light.colors.foreground,
  },
});
