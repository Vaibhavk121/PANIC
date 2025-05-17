import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../styles/theme";
import ArrowLeft from "../assets/icons/ArrowLeft.png";

export default function SOS() {
  const navigation = useNavigation();
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const [statusOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isActive && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isActive && countdown === 0) {
      showStatus();
    }
  }, [countdown, isActive]);

  const showStatus = () => {
    Animated.sequence([
      Animated.timing(statusOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(statusOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleStopSOS = () => {
    setIsActive(false);
    setCountdown(5);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={ArrowLeft} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>SOS Button Triggered</Text>

      <View style={styles.countdownContainer}>
        <Text style={styles.countdown}>{countdown}</Text>
      </View>

      <Text style={styles.sending}>
        {isActive ? "Sending SOS..." : "SOS Stopped"}
      </Text>
      <Text style={styles.description}>
        We send your current location to{"\n"}
        police & your family. Please, give a{"\n"}
        clear explanation if you can.
      </Text>

      <TouchableOpacity
        style={[styles.stopButton, !isActive && styles.restartButton]}
        onPress={isActive ? handleStopSOS : () => setIsActive(true)}
      >
        <Text style={styles.stopButtonText}>
          {isActive ? "Stop SOS" : "Restart SOS"}
        </Text>
      </TouchableOpacity>

      <Animated.View style={[styles.status, { opacity: statusOpacity }]}>
        <Text style={styles.statusText}>SOS Sent Successfully</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.colors.background,
    alignItems: "center",
    paddingTop: 60,
  },
  status: {
    position: "absolute",
    bottom: 100,
    backgroundColor: theme.light.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusText: {
    color: theme.light.colors.primaryForeground,
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 60,
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 40,
    color: theme.light.colors.text,
  },
  countdownContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 7,
    borderColor: theme.light.colors.destructive,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  countdown: {
    fontSize: 48,
    fontWeight: "bold",
    color: theme.light.colors.text,
  },
  sending: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    color: theme.light.colors.text,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: theme.light.colors.textSecondary,
    lineHeight: 24,
  },
  stopButton: {
    backgroundColor: theme.light.colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 40,
  },
  restartButton: {
    backgroundColor: theme.light.colors.success,
  },
  stopButtonText: {
    color: theme.light.colors.primaryForeground,
    fontSize: 16,
    fontWeight: "600",
  },
});
