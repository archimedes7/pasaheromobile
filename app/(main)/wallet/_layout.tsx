// app/(wallet)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function WalletLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Digital Wallet",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add-card"
        options={{
          title: "Add New Card",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="view-cards"
        options={{
          title: "My Cards",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="use-card"
        options={{
          title: "Use Card",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="loyalty-programs"
        options={{
          title: "Loyalty Programs",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
