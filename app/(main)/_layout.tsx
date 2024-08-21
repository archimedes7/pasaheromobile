import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
export default function MainLayout() {
  const { userType } = useAuth();
  useProtectedRoute();
  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Digital Wallet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="local-eats"
        options={{
          title: "WDLE!",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="safety/index"
        options={{
          href: null,
          title: "Safety",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="shield-checkmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="support/complaints"
        options={{
          href: null,
          title: "Support",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-buoy" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insurance/index"
        options={{
          href: null,
          title: "Insurance",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="umbrella" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="driver"
        options={{
          title: "Driver",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="glasses" size={size} color={color} />
          ),
          href: userType === "Driver" ? "/driver/index" : null,
        }}
      />
    </Tabs>
  );
}
