import React from "react";
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function DriverLayout() {
  const { userType } = useAuth();

  if (userType !== "Driver") {
    return <Redirect href="/booking" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Driver Dashboard" }} />
      <Stack.Screen
        name="analytics/behaviour"
        options={{ title: "Driver Analytics" }}
      />
      <Stack.Screen
        name="application/index"
        options={{ title: "Driver Application" }}
      />
      <Stack.Screen name="exams/index" options={{ title: "Driver Training" }} />
      <Stack.Screen name="routes/index" options={{ title: "My Routes" }} />
      <Stack.Screen
        name="routes/register"
        options={{ title: "Register New Route" }}
      />
      <Stack.Screen name="routes/[id]" options={{ title: "Route Details" }} />
    </Stack>
  );
}
