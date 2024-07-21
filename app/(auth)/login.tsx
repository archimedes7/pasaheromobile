import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors"; // Adjust this import path as needed
import { useColorScheme } from "react-native";

export default function Login() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>Login</Text>
      <Link href="/(app)/home" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, { color: colors.primary }]}>
            Go to Home (simulating successful login)
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
