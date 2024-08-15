import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useWallet } from "@/contexts/WalletContext";
import CardItem from "@/components/wallet/CardItem";

export default function ViewCardsScreen() {
  const { cards } = useWallet();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cards</Text>
      {cards.length > 0 ? (
        <FlatList
          data={cards}
          renderItem={({ item }) => <CardItem card={item} />}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noCardsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
