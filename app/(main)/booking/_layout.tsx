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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="immediate-ride/book"
        options={{ title: "Book a Ride" }}
      />
      <Stack.Screen
        name="immediate-ride/map"
        options={{
          title: "Map",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="immediate-ride/map-heatmaps"
        options={{ title: "Map Heatmaps" }}
      />
      <Stack.Screen
        name="immediate-ride/map-heatmaps-osm"
        options={{ title: "Map Heatmaps native", headerShown: false }}
      />
      <Stack.Screen
        name="immediate-ride/region-selection"
        options={{ title: "Select Region" }}
      />
      <Stack.Screen
        name="immediate-ride/driver-found"
        options={{ title: "Driver Found" }}
      />
      <Stack.Screen
        name="immediate-ride/looking-for-driver"
        options={{
          title: "Finding Driver",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="planned-routes/search"
        options={{ title: "Search Planned Routes" }}
      />
      <Stack.Screen
        name="planned-routes/results"
        options={{ title: "Available Routes" }}
      />
      <Stack.Screen
        name="planned-routes/book"
        options={{ title: "Book Planned Route" }}
      />
      <Stack.Screen
        name="fare-info"
        options={{
          title: "Fare Information",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
