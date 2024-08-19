import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function VerificationDashboard() {
  const [applications, setApplications] = useState([
    { id: "1", name: "John Doe", status: "Pending" },
    { id: "2", name: "Jane Smith", status: "Under Review" },
    { id: "3", name: "Bob Johnson", status: "Approved" },
    // Add more mock data as needed
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.applicationItem}>
      <Text style={styles.applicationName}>{item.name}</Text>
      <Text style={styles.applicationStatus}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Dashboard</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Under Review</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Applications</Text>

      <FlatList
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View All Applications</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  applicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  applicationName: {
    fontSize: 16,
  },
  applicationStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007f8a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
