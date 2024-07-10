import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { auth } from "../firebaseConfig"; // Import auth from your firebase file
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useTheme } from "../styles/ThemeContext";

const EmailAuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, typography } = useTheme();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User signed up:", user);
        // Navigate to home or another screen
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign up error:", errorCode, errorMessage);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        // Navigate to home or another screen
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign in error:", errorCode, errorMessage);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: theme.colors.primaryBackground,
      }}
    >
      <Text
        style={[typography.headlineMedium, { color: theme.colors.primaryText }]}
      >
        Email Authentication
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }}
      />
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        color={theme.colors.primary}
      />
      <Button
        title="Sign In"
        onPress={handleSignIn}
        color={theme.colors.secondary}
      />
    </View>
  );
};

export default EmailAuthScreen;
