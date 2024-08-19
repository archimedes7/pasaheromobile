import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useWallet } from "@/contexts/WalletContext";
import CardItem from "@/components/wallet/CardItem";
import WalletSummary from "@/components/wallet/WalletSummary";
import QRCodeButton from "@/components/wallet/QRCodeDisplay";
import NFCButton from "@/components/wallet/NFCButton";

export default function WalletScreen() {
  const router = useRouter();
  const { wallet, isLoading, error } = useWallet();

  useEffect(() => {
    console.log("WalletScreen mounted");
  }, []);

  useEffect(() => {
    console.log("Wallet data changed:", { wallet, isLoading, error });
  }, [wallet, isLoading, error]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007f8a" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!wallet) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noWalletText}>
          No wallet found. Please create one.
        </Text>
      </View>
    );
  }

  const cards = wallet.cards || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Wallet</Text>

      <WalletSummary balance={wallet.balance} currency={wallet.currency} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/wallet/add-card")}
      >
        <Text style={styles.addButtonText}>Add New Card</Text>
      </TouchableOpacity>

      {cards.length > 0 ? (
        <FlatList
          data={wallet.cards}
          renderItem={({ item }) => (
            <View>
              <CardItem card={item} />
              <NFCButton card={item} />
              <QRCodeButton card={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noCardsText}>No cards added yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007f8a", // Adjusted color
  },
  addButton: {
    backgroundColor: "#007f8a", // Adjusted color
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  noCardsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  noWalletText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
});
