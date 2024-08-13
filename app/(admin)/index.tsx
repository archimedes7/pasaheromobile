import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createHandleLogout } from "@/app/(auth)/logout";
import { useAuth } from "@/contexts/AuthContext";
import {
  subscribeToAdminStats,
  subscribeToApplicants,
} from "@/services/adminServices";
import { useRouter } from "expo-router";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const handleLogout = createHandleLogout({ signOut });

  const [stats, setStats] = useState({
    totalUsers: 0,
    newSignups: 0,
    activeUsers: 0,
    applicants: 0,
  });

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const unsubscribeStats = subscribeToAdminStats((newStats) => {
      setStats(newStats);
    });

    const unsubscribeApplicants = subscribeToApplicants((newApplicants) => {
      setApplicants(newApplicants);
    });

    return () => {
      unsubscribeStats();
      unsubscribeApplicants();
    };
  }, []);

  const renderApplicantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.applicantItem}
      onPress={() => handleApplicantPress(item)}
    >
      <Text style={styles.applicantName}>{item.name}</Text>
      <Text style={styles.applicantType}>{item.type}</Text>
    </TouchableOpacity>
  );

  const handleApplicantPress = (applicant) => {
    // Navigate to a detailed view of the applicant
    router.push({
      pathname: "/(admin)/applicant-details",
      params: { applicantId: applicant.id },
    });
  };

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#2A9D8F" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user?.photoURL || "https://example.com/default-avatar.jpg",
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>{user?.displayName || "Admin User"}</Text>
          <Text style={styles.role}>Administrator</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dashboard Overview</Text>
        <View style={styles.statsContainer}>
          <StatItem title="Total Users" value={stats.totalUsers.toString()} />
          <StatItem title="New Signups" value={stats.newSignups.toString()} />
          <StatItem title="Active Users" value={stats.activeUsers.toString()} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Applicants</Text>
      </View>
    </>
  );

  const renderFooter = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Analytics</Text>
      {/* You would insert your chart component here */}
      <View style={styles.chartPlaceholder}>
        <Text>Chart goes here</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={applicants}
      renderItem={renderApplicantItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={<Text>No recent applicants</Text>}
    />
  );
}

function StatItem({ title, value }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function ActivityItem({ text, time }) {
  return (
    <View style={styles.activityItem}>
      <Text>{text}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "white",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    color: "gray",
  },
  section: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A9D8F",
  },
  statTitle: {
    color: "gray",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  activityTime: {
    color: "gray",
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "#2A9D8F",
    marginLeft: 5,
    fontWeight: "bold",
  },
  applicantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  applicantType: {
    color: "gray",
  },
});
