import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SafetyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Features</Text>

      <TouchableOpacity style={styles.feature}>
        <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
        <Text style={styles.featureText}>Emergency SOS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.feature}>
        <Ionicons name="people" size={24} color="#2196F3" />
        <Text style={styles.featureText}>Share Ride Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.feature}>
        <Ionicons name="location" size={24} color="#FFC107" />
        <Text style={styles.featureText}>Live Trip Tracking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.feature}>
        <Ionicons name="call" size={24} color="#9C27B0" />
        <Text style={styles.featureText}>24/7 Support Hotline</Text>
      </TouchableOpacity>
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
  feature: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
