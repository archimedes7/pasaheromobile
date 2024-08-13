import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext"; // Adjust path as needed
import { InfoItem } from "./common";

export default function PetOwnerProfileScreen() {
  const { user, signOut } = useAuth();

  // Mock pet data (replace with actual data from your user object or database)
  const pet = user.pet || {
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pet Information</Text>
        <View style={styles.petInfo}>
          <Image style={styles.petAvatar} source={{ uri: pet.photoURL }} />
          <View style={styles.petDetails}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petType}>
              {pet.type} - {pet.breed}
            </Text>
          </View>
        </View>
        <InfoItem icon="paw" label="Pet Type" value={pet.type} />
        <InfoItem icon="information-circle" label="Breed" value={pet.breed} />
        {/* Add more pet-specific fields as needed */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Owner Information</Text>
        <InfoItem
          icon="home"
          label="Address"
          value={user.address || "Not provided"}
        />
        <InfoItem
          icon="medical"
          label="Vet Contact"
          value={user.vetContact || "Not provided"}
        />
        {/* Add more owner-specific fields as needed */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#007f8a",
  },
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  petAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007f8a",
  },
  petType: {
    fontSize: 16,
    color: "#666",
  },
});
