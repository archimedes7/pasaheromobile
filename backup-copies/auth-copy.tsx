import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../styles/ThemeContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { theme, typography } = useTheme();
  const { user, signInWithGoogle, signInWithFacebook, signInWithApple } =
    useAuth();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        // Navigation to home screen will be handled by App.js
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate("UserTypeSelection");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Authentication Error", error.message);
      // Handle error (show alert, etc.)
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      let result;
      switch (provider) {
        case "Google":
          result = await signInWithGoogle();
          break;
        case "Facebook":
          result = await signInWithFacebook();
          break;
        case "Apple":
          result = await signInWithApple();
          break;
        default:
          throw new Error("Invalid login provider");
      }
      // If the login was successful, the user state in AuthContext will be updated
      // and the app will navigate to the appropriate screen
    } catch (error) {
      console.error(`${provider} Sign-In Error:`, error);
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, isLogin && styles.activeTab]}
          onPress={() => setIsLogin(true)}
        >
          <Text
            style={[
              typography.titleMedium,
              {
                color: isLogin
                  ? theme.colors.primary
                  : theme.colors.secondaryText,
              },
            ]}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, !isLogin && styles.activeTab]}
          onPress={() => setIsLogin(false)}
        >
          <Text
            style={[
              typography.titleMedium,
              {
                color: !isLogin
                  ? theme.colors.primary
                  : theme.colors.secondaryText,
              },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleAuth}
      >
        <Text
          style={[styles.buttonText, { color: theme.colors.primaryBtnText }]}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.orText, { color: theme.colors.secondaryText }]}>
        Or sign {isLogin ? "in" : "up"} with
      </Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Facebook")}
        >
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
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Google")}
        >
          <Ionicons name="logo-google" size={24} color={theme.colors.primary} />
          <Text
            style={[styles.socialButtonText, { color: theme.colors.primary }]}
          >
            Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Apple")}
        >
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
    justifyContent: "center",
    padding: 20,
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    padding: 15,
    borderRadius: 5,
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
    borderRadius: 5,
    marginBottom: 10,
  },
  socialButtonText: {
    marginLeft: 10,
  },
});

export default AuthScreen;
