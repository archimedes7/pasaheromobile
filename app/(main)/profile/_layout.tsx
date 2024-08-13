import React from "react";
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function ProfileLayout() {
  const { userType, isLoading } = useAuth();
  useProtectedRoute();

  if (isLoading) {
    return <LoadingScreen />; // You'll need to create this component
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: `${userType} Profile`,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: "Edit Profile",
          headerShown: true,
        }}
      />
      {/* Add any other profile-related screens here */}
    </Stack>
  );
}
