import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RidesManagement() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Management</Text>
      <Text>Monitor and manage ongoing and completed rides</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
