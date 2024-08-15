import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../../../contexts/AuthContext"; // Adjust path as needed
import { actionButtonsByUserType } from "@/constants/userActionButtons";
import CommonProfileView from "./common";
import PassengerProfileView from "./passenger-profile";
import PetOwnerProfileView from "./pet-owner-profile";
import DriverProfileView from "./driver-profile";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function UserProfile() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();

  if (!userProfile) {
    return <Text style={styles.loadingText}>Loading user profile...</Text>;
  }

  const renderProfileView = () => {
    if (!userProfile.userType) {
      console.warn("User type is undefined");
      return (
        <Text style={styles.errorText}>
          User type not set. Please update your profile.
        </Text>
      );
    }

    switch (userProfile.userType) {
      case "Passenger":
        return <PassengerProfileView user={userProfile} />;
      case "Driver":
        return <DriverProfileView user={userProfile} />;
      case "Pet Owner":
        return <PetOwnerProfileView user={userProfile} />;
      default:
        console.error(`Unknown user type: ${userProfile.userType}`);
        return <Text style={styles.errorText}>Error: Unknown user type</Text>;
    }
  };

  const actionButtons = actionButtonsByUserType[userProfile.userType] || [];

  return (
    <ScrollView style={styles.container}>
      <CommonProfileView user={userProfile} />
      {renderProfileView()}
      {/* Wallet Summary */}

      <View style={styles.actionsSection}>
        {actionButtons.map((action, index) => (
          <ActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            onPress={() => {
              if (action.route) {
                router.push(action.route);
              }
            }}
          />
        ))}
        <ActionButton
          icon="wallet-outline"
          label="Manage Wallet"
          onPress={() => router.push("/wallet")}
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#fff" />
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  actionsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  actionButton: {
    backgroundColor: "#007f8a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: "48%",
  },
  actionButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  logoutText: {
    color: "#007f8a",
    fontWeight: "bold",
  },
});
