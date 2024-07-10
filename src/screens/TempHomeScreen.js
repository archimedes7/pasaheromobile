// screens/TempHomeScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../../styles/ThemeContext";

const navigationOptions = [
  { name: "Region Selection", screen: "SelectRegion" },
  { name: "Home Screen", screen: "Home" },
  { name: "Book a Ride", screen: "BookRide" },
  { name: "Map Screen", screen: "MapScreen" },
  { name: "Sign Up", screen: "SignupScreen" },
  { name: "Looking For Driver", screen: "LookingForDriver" },
  { name: "Driver Found", screen: "DriverFound" },

  // Add more options as needed
];

const TempHomeScreen = ({ navigation }) => {
  const { theme, typography } = useTheme();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <Text
        style={[
          styles.title,
          typography.headlineLarge,
          { color: theme.colors.primaryText },
        ]}
      >
        Temporary Navigation
      </Text>
      {navigationOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.navItem, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate(option.screen)}
        >
          <Text
            style={[
              typography.titleMedium,
              { color: theme.colors.primaryBtnText },
            ]}
          >
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
  },
  navItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});

export default TempHomeScreen;
