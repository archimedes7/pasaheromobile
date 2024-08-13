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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebaseConfig";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";

type UserType = "Passenger" | "Pet Owner" | "Driver" | "Admin";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { signInWithEmail, signUpWithEmail, updateUserType } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Login
        await signInWithEmail(email, password);
        console.log("Login successful");

        // Check user type after successful login
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          const userType = userDoc.data()?.userType;

          await updateUserType(userType);

          if (userType === "Admin") {
            console.log("Admin user logged in, navigating to admin dashboard");
            router.replace("/(admin)/dashboard");
          } else {
            console.log("Regular user logged in, navigating to map");
            router.push("/(main)/profile");
          }
        }
      } else {
        // Sign up
        if (!userType) {
          Alert.alert("Error", "Please select a user type");
          return;
        }
        const newUser = await signUpWithEmail(email, password, userType);
        if (newUser.uid) {
          await setDoc(doc(db, "users", newUser.uid), {
            email: email,
            userType: userType,
          });
          console.log("Signup successful, navigating to map");
          await setDoc(doc(db, "users", newUser.uid), {
            email: email,
            userType: userType,
          });
          console.log("Signup successful, navigating to map");
          await AsyncStorage.setItem("userType", userType);
          router.replace("/(main)/");
        } else {
          throw new Error("Failed to create user account");
        }
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      Alert.alert("Authentication Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <Text style={[styles.title, { color: colors.text }]}>
        {isLogin ? "Log In" : "Sign Up"}
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Email"
        placeholderTextColor={colors.text + "80"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Password"
        placeholderTextColor={colors.text + "80"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => (isLogin ? handleAuth() : setStep(2))}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          {isLoading ? "Processing..." : isLogin ? "Log In" : "Next"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={[styles.switchText, { color: colors.primary }]}>
          {isLogin ? "Need an account? Sign Up" : "Have an account? Log In"}
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={[styles.title, { color: colors.text }]}>
        Select User Type
      </Text>
      {(["Passenger", "Pet Owner", "Driver"] as UserType[]).map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.button,
            {
              backgroundColor:
                userType === type ? colors.primary : colors.background,
            },
            { borderColor: colors.primary, borderWidth: 1 },
          ]}
          onPress={() => setUserType(type)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: userType === type ? colors.background : colors.primary },
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: userType ? colors.primary : colors.border },
          !userType && styles.disabledButton,
        ]}
        onPress={handleAuth}
        disabled={!userType}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStep(1)}>
        <Text style={[styles.switchText, { color: colors.primary }]}>Back</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {step === 1 ? renderStep1() : renderStep2()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  switchText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
