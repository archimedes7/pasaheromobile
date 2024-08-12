import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AdminSettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Settings</Text>
      <Text>Configure app settings and admin preferences</Text>
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
