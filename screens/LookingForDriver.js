import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "../styles/ThemeContext";

const LookingForDriver = ({ navigation, route }) => {
  const { theme, typography } = useTheme();

  useEffect(() => {
    // Simulate finding a driver after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace("DriverFound", {
        ...route.params,
        driverName: "John Doe", // Replace with actual driver info
        estimatedArrival: "5 minutes",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text
        style={[
          styles.text,
          { color: theme.colors.primaryText },
          typography.headlineSmall,
        ]}
      >
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
  },
});

export default LookingForDriver;
