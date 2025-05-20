import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import theme from "../styles/theme";

export default function SignIn() {  // Changed from SignUp to SignIn
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {  // Changed from handleSignUp to handleSignIn
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Use 10.0.2.2 for Android emulator or your computer's IP address
      const response = await fetch("http://192.168.141.207:5000/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token
        // TODO: Implement secure token storage
        navigation.navigate("Home");
      } else {
        const errorMessage = data.error || data.message || "An error occurred during signin";
        console.error("Signin Error:", errorMessage);
        Alert.alert("Signin Failed", errorMessage);
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert(
        "Connection Error",
        "Unable to connect to the server. Please check if the backend server is running and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to PANIC</Text>
        <Text style={styles.titleText}>
          Log in to your{"\n"}P.A.N.I.C account
        </Text>
      </View>

      <Text style={styles.subtitleText}>
        Sign in to your account to access the app contents.
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

        <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
          Forgot Password?
        </Text>
      </View>

      <Button
        title={isLoading ? "Loading..." : "Login"}
        onPress={handleSignIn}  // Changed from handleSignUp to handleSignIn
        style={styles.loginButton}
        disabled={isLoading}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.footerLink}>Sign Up</Text>
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
    fontWeight: "bold",
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
  forgotPassword: {
    fontFamily: theme.light.fonts.sans,
    fontSize: 14,
    color: theme.light.colors.primary,
    textAlign: "right",
  },
  loginButton: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "500",
  },
});
