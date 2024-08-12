import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors"; // Adjust this import path as needed

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      {message && (
        <Text style={[styles.message, { color: colors.primaryText }]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
