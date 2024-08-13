import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AnalyticsDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics Dashboard</Text>
      <Text>View detailed analytics and reports</Text>
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
