import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Dialog({ visible, title, children }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  dialog: {
    backgroundColor: theme.light.colors.card,
    padding: 20,
    borderRadius: theme.light.radius.lg,
    width: "80%",
    ...theme.light.shadow.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
  },
});
