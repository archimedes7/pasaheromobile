import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

async function verifyAdminCode(inputCode: string): Promise<boolean> {
  try {
    const adminSettingsRef = doc(db, "app_settings", "admin_settings");
    const adminSettingsSnap = await getDoc(adminSettingsRef);

    if (adminSettingsSnap.exists()) {
      const storedHashedCode = adminSettingsSnap.data().hashedAdminCode;
      const inputHashedCode = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        inputCode
      );

      return storedHashedCode === inputHashedCode;
    }

    return false;
  } catch (error) {
    console.error("Error verifying admin code:", error);
    return false;
  }
}

type UserType = "Passenger" | "Pet Owner" | "Driver" | "Admin";
const UserTypeSelectionScreen: React.FC = () => {
  const [adminCode, setAdminCode] = useState("");
  const { user, userType: currentUserType, signOut } = useAuth();
  const [selectedType, setSelectedType] = useState<UserType | null>(
    currentUserType
  );
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [showAdminInput, setShowAdminInput] = useState(false);

  const handleSelection = async (): Promise<void> => {
    if (!selectedType) return;
    if (!user) {
      Alert.alert("Error", "No user is currently signed in.");
      return;
    }

    try {
      if (selectedType === "Admin") {
        const isAdmin = await verifyAdminCode(adminCode);
        if (!isAdmin) {
          Alert.alert("Error", "Invalid admin code.");
          return;
        }
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          userType: selectedType,
        },
        { merge: true }
      );

      // Update the userType in AsyncStorage
      await AsyncStorage.setItem("userType", selectedType);

      // If the user is changing their type, we might want to sign them out
      if (currentUserType && currentUserType !== selectedType) {
        await signOut();
        router.replace("/welcome");
      } else {
        // Route to the appropriate profile screen
        switch (selectedType) {
          case "Passenger":
            router.replace("/(main)/passenger-profile");
            break;
          case "Pet Owner":
            router.replace("/(main)/pet-owner-profile");
            break;
          case "Driver":
            router.replace("/(main)/driver-profile");
            break;
          case "Admin":
            router.replace("/(admin)/dashboard");
            break;
        }
      }
    } catch (error) {
      console.error("Error saving user type:", error);
      Alert.alert("Error", "Failed to save user type. Please try again.");
    }
  };

  const userTypes: UserType[] = ["Passenger", "Pet Owner", "Driver", "Admin"];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>
        {currentUserType ? "Change user type" : "I am a..."}
      </Text>
      {userTypes.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.option,
            { borderColor: colors.primary },
            selectedType === type && { backgroundColor: colors.primary },
          ]}
          onPress={() => setSelectedType(type)}
        >
          <Text
            style={[
              styles.optionText,
              {
                color:
                  selectedType === type
                    ? colors.primaryBtnText
                    : colors.primary,
              },
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => setShowAdminInput(!showAdminInput)}
      >
        <Text style={styles.adminButtonText}>Admin Access</Text>
      </TouchableOpacity>

      {showAdminInput && (
        <TextInput
          style={styles.adminInput}
          placeholder="Enter admin code"
          secureTextEntry
          value={adminCode}
          onChangeText={setAdminCode}
        />
      )}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.primary },
          !selectedType && styles.disabledButton,
        ]}
        onPress={handleSelection}
        disabled={!selectedType}
      >
        <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
          {currentUserType ? "Change Type" : "Continue"}
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
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 24,
    fontWeight: "bold",
  },
  option: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  adminButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  adminButtonText: {
    textAlign: "center",
    color: "#333",
  },
  adminInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default UserTypeSelectionScreen;
