// components/WalletSummary.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WalletSummaryProps } from "@/types";

const WalletSummary: React.FC<WalletSummaryProps> = ({
  totalBalance = 0, // Provide a default value
  currency = "PHP", // Provide a default value
  cardCount = 0, // Provide a default value
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Summary</Text>
      <Text style={styles.balance}>
        {currency} {totalBalance.toFixed(2)}
      </Text>
      <Text style={styles.cardCount}>
        {cardCount} card{cardCount !== 1 ? "s" : ""} connected
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007f8a",
  },
  cardCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default WalletSummary;
