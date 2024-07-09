// components/AuthScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useTheme } from "../styles/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const AuthScreen = ({ isLogin, onSubmit, onSwitchMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme, typography } = useTheme();

  const handleSubmit = () => {
    if (isLogin) {
      onSubmit(email, password);
    } else {
      if (password === confirmPassword) {
        onSubmit(email, password);
      } else {
        // Show error that passwords don't match
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      {/* Logo Placeholder */}
      <View style={styles.logoContainer}>
        <View
          style={[
            styles.logoPlaceholder,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text
            style={[styles.logoText, { color: theme.colors.primaryBtnText }]}
          >
            LOGO
          </Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, !isLogin && styles.activeTab]}
          onPress={() => onSwitchMode(false)}
        >
          <Text
            style={[
              typography.titleMedium,
              {
                color: isLogin
                  ? theme.colors.secondaryText
                  : theme.colors.primary,
              },
            ]}
          >
            Create Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, isLogin && styles.activeTab]}
          onPress={() => onSwitchMode(true)}
        >
          <Text
            style={[
              typography.titleMedium,
              {
                color: !isLogin
                  ? theme.colors.secondaryText
                  : theme.colors.primary,
              },
            ]}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { borderColor: theme.colors.primary }]}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { borderColor: theme.colors.primary }]}
      />
      {!isLogin && (
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={[styles.input, { borderColor: theme.colors.primary }]}
        />
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit}
      >
        <Text
          style={[styles.buttonText, { color: theme.colors.primaryBtnText }]}
        >
          {isLogin ? "Log In" : "Get Started"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.orText, { color: theme.colors.secondaryText }]}>
        Or sign up with
      </Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons
            name="logo-facebook"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            style={[styles.socialButtonText, { color: theme.colors.primary }]}
          >
            Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color={theme.colors.primary} />
          <Text
            style={[styles.socialButtonText, { color: theme.colors.primary }]}
          >
            Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={24} color={theme.colors.primary} />
          <Text
            style={[styles.socialButtonText, { color: theme.colors.primary }]}
          >
            Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#FF7150",
  },
  input: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 25,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
  },
  socialButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
  },
  socialButtonText: {
    marginLeft: 10,
  },
});

export default AuthScreen;
