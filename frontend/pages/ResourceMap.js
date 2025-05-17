import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResourceMap() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Resource Map Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});