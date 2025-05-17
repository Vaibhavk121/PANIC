import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import theme from "../styles/theme";

export default function CommandPalette({ visible, onClose, commands }) {
  const [query, setQuery] = useState("");

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Type a command..."
            placeholderTextColor={theme.light.colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          <FlatList
            data={filteredCommands}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={styles.commandItem}
                onPress={() => {
                  item.action();
                  onClose();
                }}
              >
                <Text style={styles.commandText}>{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: theme.light.colors.card,
    borderRadius: theme.light.radius.lg,
    maxHeight: "70%",
    padding: 16,
    ...theme.light.shadow.lg,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: theme.light.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: theme.light.fonts.sans,
    color: theme.light.colors.foreground,
    marginBottom: 12,
  },
  commandItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  commandText: {
    fontSize: 16,
    color: theme.light.colors.foreground,
    fontFamily: theme.light.fonts.sans,
  },
});
