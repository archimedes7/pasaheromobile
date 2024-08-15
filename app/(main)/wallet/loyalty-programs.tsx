import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LoyaltyProgramsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loyalty Programs</Text>
      <Text style={styles.description}>
        Here you can view and manage your loyalty programs.
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
