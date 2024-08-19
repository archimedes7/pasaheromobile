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

const DriverProfileView = ({ user }) => (
  <ScrollView style={styles.container}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Driver Information</Text>
      <InfoItem
        icon="car"
        label="Vehicle"
        value={
          `${user.vehicleInfo?.make} ${user.vehicleInfo?.model} (${user.vehicleInfo?.year})` ||
          "Not provided"
        }
      />
      <InfoItem
        icon="speedometer"
        label="License Plate"
        value={user.vehicleInfo?.licensePlate || "Not provided"}
      />
      <InfoItem
        icon="card"
        label="License Number"
        value={user.licenseNumber || "Not provided"}
      />
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Driver Stats</Text>
      <View style={styles.statsGrid}>
        <StatItem
          icon="speedometer"
          label="Total Rides"
          value={user.totalRides?.toString() || "0"}
        />
        <StatItem
          icon="star"
          label="Avg. Rating"
          value={user.rating?.toFixed(1) || "N/A"}
        />
        <StatItem
          icon="cash"
          label="Earnings"
          value={
            user.totalEarnings ? `₱${user.totalEarnings.toFixed(2)}` : "$0.00"
          }
        />
      </View>
    </View>
  </ScrollView>
);

const StatItem = ({ icon, label, value }) => (
  <View style={styles.statItem}>
    <Ionicons name={icon} size={24} color="#007f8a" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

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
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    width: "30%",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#007f8a",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
});

export default DriverProfileView;
