import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const LookingForDriver = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Simulate finding a driver after 5 seconds
    const timer = setTimeout(() => {
      router.replace({
        pathname: "/driver-found",
        params: {
          ...params,
          driverName: "John Doe", // Replace with actual driver info
          estimatedArrival: "5 minutes",
        },
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.text, { color: colors.primaryText }]}>
        Looking for a driver...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
});

export default LookingForDriver;
