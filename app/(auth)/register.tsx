import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors"; // Adjust this import path as needed
import { useFacebookAuth } from "@/contexts/useFacebookAuth";

export default function AuthHomeScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { signInWithGoogle, signInWithFacebook, signInWithApple } = useAuth();
  const router = useRouter();
  const { promptAsync } = useFacebookAuth();

  const handleFacebookLogin = () => {
    promptAsync();
  };

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        // Navigation to home screen will be handled by _layout.tsx
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/user-type");
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      Alert.alert("Authentication Error", error.message);
    }
  };

  const handleSocialLogin = async (provider: string) => {
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
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, isLogin && styles.activeTab]}
          onPress={() => setIsLogin(true)}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: isLogin ? colors.primary : colors.secondaryText,
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
              styles.tabText,
              {
                color: !isLogin ? colors.primary : colors.secondaryText,
              },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.input,
          { borderColor: colors.lineColor, color: colors.primaryText },
        ]}
        placeholder="Email"
        placeholderTextColor={colors.secondaryText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.lineColor, color: colors.primaryText },
        ]}
        placeholder="Password"
        placeholderTextColor={colors.secondaryText}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleAuth}
      >
        <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
          {isLogin ? "Log In" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.orText, { color: colors.secondaryText }]}>
        Or sign {isLogin ? "in" : "up"} with
      </Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={[styles.socialButton, { borderColor: colors.lineColor }]}
          onPress={() => handleSocialLogin("Facebook")}
        >
          <Ionicons name="logo-facebook" size={24} color={colors.primary} />
          <Text style={[styles.socialButtonText, { color: colors.primary }]}>
            Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, { borderColor: colors.lineColor }]}
          onPress={() => handleSocialLogin("Google")}
        >
          <Ionicons name="logo-google" size={24} color={colors.primary} />
          <Text style={[styles.socialButtonText, { color: colors.primary }]}>
            Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, { borderColor: colors.lineColor }]}
          onPress={() => handleSocialLogin("Apple")}
        >
          <Ionicons name="logo-apple" size={24} color={colors.primary} />
          <Text style={[styles.socialButtonText, { color: colors.primary }]}>
            Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 40,
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
