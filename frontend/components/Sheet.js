import React from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import theme from "../styles/theme";

export default function Sheet({ visible, onClose, children }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.sheet}>{children}</View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  sheet: {
    backgroundColor: theme.light.colors.card,
    padding: 16,
    borderTopLeftRadius: theme.light.radius.lg,
    borderTopRightRadius: theme.light.radius.lg,
    ...theme.light.shadow.lg,
  },
});
