import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../utils/firebaseConfig";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

/**
 * A screen where the user selects their user type.
 * @param {Object} props - The component props.
 * @param {boolean} props.disabled - Whether the button should be disabled.
 * @returns {JSX.Element} - The component.
 */
const UserTypeSelectionScreen = ({
  disabled = false,
}: {
  disabled?: boolean;
}) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleSelection = async (): Promise<void> => {
    if (!userType) return;
    try {
      const user: Auth | null = auth.currentUser;
      if (!user) return;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        userType: userType,
      });
      // Navigate to home or onboarding screen
      router.push("/temp-home");
    } catch (error) {
      console.error("Error saving user type:", error);
      // Handle error (show alert, etc.)
    }
  };

  const userTypes: UserType[] = ["Passenger", "Pet Owner", "Driver"];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>
        I am a...
      </Text>
      {userTypes.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.option,
            { borderColor: colors.primary },
            userType === type && { backgroundColor: colors.primary },
          ]}
          onPress={() => setUserType(type)}
        >
          <Text
            style={[
              styles.optionText,
              {
                color:
                  userType === type ? colors.primaryBtnText : colors.primary,
              },
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.primary },
          (disabled || !userType) && styles.disabledButton,
        ]}
        onPress={handleSelection}
        disabled={disabled || !userType}
      >
        <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
          Continue
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
});

export default UserTypeSelectionScreen;
