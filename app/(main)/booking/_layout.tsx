import React from "react";
import { Stack } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function BookingLayout() {
  const { isLoading, userType } = useAuth();
  useProtectedRoute();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Booking",
          headerShown: false, // Hide header for the main booking screen
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: "Map",
          presentation: "modal", // Present as a modal for a smoother transition
        }}
      />
      <Stack.Screen name="map-heatmaps" options={{ title: "Map Heatmaps" }} />
      <Stack.Screen
        name="region-selection"
        options={{ title: "Select Region" }}
      />
      <Stack.Screen name="driver-found" options={{ title: "Driver Found" }} />
      <Stack.Screen
        name="looking-for-driver"
        options={{
          title: "Finding Driver",
          headerShown: false, // Hide header for this screen
        }}
      />
    </Stack>
  );
}
