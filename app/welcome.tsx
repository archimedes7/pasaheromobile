import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

const WelcomeScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/findheroes.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Find Heroes Nearby
        </Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          Discover and book carpooling services ready
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.push("(auth)")}
        >
          <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
            Go to Test Screen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.devButton, { backgroundColor: colors.secondary }]}
          onPress={() => {
            console.log("Dev: Go to TempHomeScreen");
            router.push("/temp-home");
          }}
        >
          <Text style={[styles.buttonText, { color: colors.secondaryBtnText }]}>
            Dev: Go to TempHomeScreen
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
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  devButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default WelcomeScreen;
