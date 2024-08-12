import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PassengerProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger profile</Text>
      {/* Add more user profile content here */}
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
    fontSize: 24,
    fontWeight: "bold",
  },
});
