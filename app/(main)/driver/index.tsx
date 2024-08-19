import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const DriverDashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with real data from your backend
  const earningsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: [50, 75, 100, 80, 90, 120, 110] }],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, {user.fullName}!</Text>
        <Text style={styles.statusText}>
          Status: <Text style={styles.statusActive}>Active</Text>
        </Text>
      </View>

      <View style={styles.quickStats}>
        <StatItem
          icon="car"
          value={user.totalRides || "0"}
          label="Total Rides"
        />
        <StatItem
          icon="star"
          value={user.rating?.toFixed(1) || "N/A"}
          label="Rating"
        />
        <StatItem
          icon="cash"
          value={`₱${user.totalEarnings?.toFixed(2) || "0.00"}`}
          label="Earnings"
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>This Week's Earnings</Text>
        <LineChart
          data={earningsData}
          width={screenWidth - 40}
          height={220}
          yAxisLabel="₱"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={styles.actionButtons}>
        <ActionButton icon="car" label="Start Driving" />
        <ActionButton icon="document-text" label="View Earnings" />
        <ActionButton icon="analytics" label="Performance" />
        <ActionButton icon="settings" label="Settings" />
      </View>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <ActivityItem
          icon="checkmark-circle"
          title="Ride Completed"
          description="₱15.50 earned - 5★ rating"
          time="2 hours ago"
        />
        <ActivityItem
          icon="alert-circle"
          title="Ride Cancelled"
          description="Customer no-show"
          time="Yesterday at 14:30"
        />
        {/* Add more activity items as needed */}
      </View>
    </ScrollView>
  );
};

const StatItem = ({ icon, value, label }) => (
  <View style={styles.statItem}>
    <Ionicons name={icon} size={24} color="#007f8a" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionButton}>
    <Ionicons name={icon} size={24} color="#fff" />
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const ActivityItem = ({ icon, title, description, time }) => (
  <View style={styles.activityItem}>
    <Ionicons
      name={icon}
      size={24}
      color="#007f8a"
      style={styles.activityIcon}
    />
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityDescription}>{description}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007f8a",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    color: "#fff",
  },
  statusActive: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  quickStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007f8a",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007f8a",
  },
  actionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
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
  recentActivity: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#007f8a",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  activityIcon: {
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activityDescription: {
    fontSize: 14,
    color: "#666",
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
});

export default DriverDashboard;
