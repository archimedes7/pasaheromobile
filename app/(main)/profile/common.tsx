import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CommonProfileView = ({ user }) => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <View style={styles.nameRatingContainer}>
        <Text style={styles.name}>{user.displayName || "User Name"}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{user.rating || "4.8"} / 5.0</Text>
        </View>
      </View>
      <Image
        style={styles.avatar}
        source={{
          uri: user.photoURL || "https://via.placeholder.com/150",
        }}
      />
    </View>
    <View style={styles.infoSection}>
      <InfoItem icon="mail" label="Email" value={user.email} />
      <InfoItem
        icon="call"
        label="Phone"
        value={user.phoneNumber || "Not provided"}
      />
    </View>
  </View>
);

export const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Ionicons name={icon} size={24} color="#666" style={styles.infoIcon} />
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007f8a",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameRatingContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 15,
  },
  infoSection: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CommonProfileView;
