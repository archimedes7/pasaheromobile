import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";

export default function BookingIndex() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const { userType } = useAuth();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleStartBooking = () => {
    if (pickup && dropoff) {
      router.push({
        pathname: "/booking/map-heatmaps",
        params: { pickup, dropoff },
      });
    } else {
      // Show an error message or alert
      console.log("Please enter both pickup and drop-off locations");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>
        Find 🔍 Heroes Nearby
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="location"
          size={24}
          color={colors.primary}
          style={styles.inputIcon}
        />
        <TextInput
          style={[
            styles.input,
            { color: colors.primaryText, borderColor: colors.border },
          ]}
          placeholder="Pickup Location"
          placeholderTextColor={colors.secondaryText}
          value={pickup}
          onChangeText={setPickup}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="navigate"
          size={24}
          color={colors.primary}
          style={styles.inputIcon}
        />
        <TextInput
          style={[
            styles.input,
            { color: colors.primaryText, borderColor: colors.border },
          ]}
          placeholder="Drop-off Location"
          placeholderTextColor={colors.secondaryText}
          value={dropoff}
          onChangeText={setDropoff}
        />
      </View>

      {userType === "Pet Owner" && (
        <View style={styles.petOption}>
          <Text style={[styles.petOptionText, { color: colors.primaryText }]}>
            Traveling with a pet?
          </Text>
          {/* Add a toggle switch or checkbox here */}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleStartBooking}
      >
        <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
          Find a Ride
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => router.push("/booking/map")}
      >
        <Ionicons name="map-outline" size={24} color={colors.primary} />
        <Text style={[styles.mapButtonText, { color: colors.primary }]}>
          Open Map View
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  petOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  petOptionText: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mapButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
