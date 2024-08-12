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
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "@/constants/Colors";

const EmailAuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail } = useAuth();

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmail(email);
        router.replace("/(app)/home");
      } else {
        await signUpWithEmail(email);
        router.push("/user-type");
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      Alert.alert("Authentication Error", error.message);
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
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleAuth}
      >
        <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
          {isLogin ? "Log In" : "Sign Up"}
        </Text>
      </TouchableOpacity>
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
    borderBottomColor: "#007f8a",
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
});

export default EmailAuthScreen;
