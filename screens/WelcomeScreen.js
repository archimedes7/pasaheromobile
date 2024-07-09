// screens/WelcomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTheme } from "../styles/ThemeContext";

const WelcomeScreen = ({ navigation }) => {
  const { theme, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/findheroes.png")} // Make sure this image exists in your assets folder
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text
          style={[
            styles.title,
            typography.displayMedium,
            { color: theme.colors.primaryText },
          ]}
        >
          Find Heroes Nearby
        </Text>
        <Text
          style={[
            styles.subtitle,
            typography.bodyLarge,
            { color: theme.colors.secondaryText },
          ]}
        >
          Discover and book carpooling services ready
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate("TempHome")}
        >
          <Text
            style={[
              styles.buttonText,
              typography.labelLarge,
              { color: theme.colors.primaryBtnText },
            ]}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // This makes the container round
    overflow: "hidden", // This ensures the image doesn't spill outside the round container
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
