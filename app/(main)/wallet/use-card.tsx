import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UseCardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Use Card</Text>
      <Text style={styles.description}>
        Select a card to use for your transaction.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
});
