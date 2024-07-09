// typography.js
import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
  displayLarge: {
    fontSize: 64,
    fontWeight: "normal",
    fontFamily: "PrimaryFamily",
    // color will be set dynamically
  },
  displayMedium: {
    fontSize: 44,
    fontWeight: "normal",
    fontFamily: "PrimaryFamily",
  },
  displaySmall: {
    fontSize: 36,
    fontWeight: "600", // Semi Bold
    fontFamily: "PrimaryFamily",
  },
  headlineLarge: {
    fontSize: 32,
    fontWeight: "600", // Semi Bold
    fontFamily: "PrimaryFamily",
  },
  headlineMedium: {
    fontSize: 24,
    fontWeight: "normal",
    fontFamily: "PrimaryFamily",
  },
  headlineSmall: {
    fontSize: 24,
    fontWeight: "500", // Medium
    fontFamily: "PrimaryFamily",
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: "500", // Medium
    fontFamily: "PrimaryFamily",
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: "SecondaryFamily",
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: "500", // Medium
    fontFamily: "SecondaryFamily",
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "SecondaryFamily",
  },
  labelMedium: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "SecondaryFamily",
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "SecondaryFamily",
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "SecondaryFamily",
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "SecondaryFamily",
  },
});
