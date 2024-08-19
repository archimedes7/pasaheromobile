import React from "react";
import { Stack } from "expo-router";

export default function LocalEatsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Where the Local Eats!",
        }}
      />
      <Stack.Screen
        name="review"
        options={{
          title: "Add Review",
        }}
      />
      <Stack.Screen
        name="place-details"
        options={{
          title: "Place Details",
        }}
      />
    </Stack>
  );
}
