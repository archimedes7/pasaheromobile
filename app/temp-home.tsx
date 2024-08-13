import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

type NavigationOption = {
  name: string;
  screen: string;
};

const navigationOptions: NavigationOption[] = [
  { name: "Region Selection", screen: "/(main)/booking/region-selection" },
  { name: "Home Screen", screen: "/" },
  { name: "Book a Ride", screen: "/(main)/booking/book" },
  { name: "Map Screen", screen: "/(main)/booking/map" },
  { name: "User Type selection", screen: "/(auth)/user-type" },
  { name: "Looking For Driver", screen: "/(main)/booking/looking-for-driver" },
  { name: "Driver Found", screen: "/(main)/booking/driver-found" },
];

const TempHomeScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>
        Temporary Navigation
      </Text>
      {navigationOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.navItem, { backgroundColor: colors.primary }]}
          onPress={() => router.push(option.screen)}
        >
          <Text style={[styles.navItemText, { color: colors.primaryBtnText }]}>
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  navItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  navItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default TempHomeScreen;
