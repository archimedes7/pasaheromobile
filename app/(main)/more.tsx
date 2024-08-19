import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MoreScreen() {
  const router = useRouter();

  const menuItems = [
    { title: "Safety", icon: "shield-checkmark", route: "/safety" },
    { title: "Insurance", icon: "umbrella", route: "/insurance" },
    { title: "Support", icon: "help-buoy", route: "/support/complaints" },
    {
      title: "Driver Support",
      icon: "locate",
      route: "/driver-application/driver-training",
    },
    // Add more menu items as needed
  ];

  return (
    <ScrollView style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => router.push(item.route)}
        >
          <Ionicons name={item.icon} size={24} color="#007f8a" />
          <Text style={styles.menuItemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
});
