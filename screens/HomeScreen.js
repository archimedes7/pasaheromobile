import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LoginScreen from "./LoginScreen";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Heroes Nearby</Text>
      <Text style={styles.discoverText}>
        Discover affordable rides and connect with fellow heroes
      </Text>
      <Image
        source={require("../assets/findheroes.png")}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SelectRegion")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 12,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007f8a",
    fontFamily: "Roboto",
    lineHeight: 38,
  },
  discoverText: {
    color: "#030303",
    fontSize: 14,
    fontFamily: "Roboto",
    lineHeight: 18,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 500,
    height: 400,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#007f8a",
    padding: 15,
    width: "80%",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
