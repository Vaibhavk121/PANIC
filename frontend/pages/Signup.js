import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import theme from '../styles/theme';

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Ensure this IP is correct for your setup (10.0.2.2 for Android Emulator)
      const response = await fetch('http://192.168.141.207:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          name: email.split('@')[0], // Using email username as name
          phone: '' // Required by backend but not collected in UI yet
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Sign Up Failed', data.message || 'An unknown error occurred during sign up.');
      }
    } catch (error) {
      console.error("Signup Network Error:", error); // Log the full error
      Alert.alert(
        'Connection Error',
        'Unable to connect to the server. Please check your internet connection, ensure the server is running, and try again. Details: ' + error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to PANIC</Text>
        <Text style={styles.titleText}>Create your{'\n'}P.A.N.I.C account</Text>
      </View>

      <Text style={styles.subtitleText}>
        Sign up to start using the app and its features.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email ID/Phone number"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={theme.light.colors.mutedForeground}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={theme.light.colors.mutedForeground}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor={theme.light.colors.mutedForeground}
          autoCapitalize="none"
        />
      </View>

      <Button 
        title={isLoading ? "Creating Account..." : "Sign Up"}
        onPress={handleSignUp}
        style={styles.signupButton}
        disabled={isLoading}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.footerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.background,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: theme.light.fonts.sans,
    fontSize: 16,
    color: theme.light.colors.mutedForeground,
    marginBottom: 8,
  },
  titleText: {
    fontFamily: theme.light.fonts.sans,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.light.colors.foreground,
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: theme.light.fonts.sans,
    fontSize: 14,
    color: theme.light.colors.mutedForeground,
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.light.colors.input,
    borderRadius: theme.light.radius.md,
    paddingHorizontal: 16,
    fontFamily: theme.light.fonts.sans,
    fontSize: 16,
    color: theme.light.colors.foreground,
    backgroundColor: theme.light.colors.background,
  },
  signupButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontFamily: theme.light.fonts.sans,
    fontSize: 14,
    color: theme.light.colors.mutedForeground,
  },
  footerLink: {
    fontFamily: theme.light.fonts.sans,
    fontSize: 14,
    color: theme.light.colors.primary,
    fontWeight: '500',
  },
});