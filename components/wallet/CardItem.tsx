// components/wallet/CardItem.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "@/types";

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const renderCardDetails = () => {
    switch (card.type) {
      case "Transport":
        return (
          <>
            <Text style={styles.cardNumber}>{card.number}</Text>
            <Text style={styles.cardBalance}>
              Balance: ${card.balance?.toFixed(2)}
            </Text>
          </>
        );
      case "Loyalty":
        return (
          <>
            <Text style={styles.cardNumber}>{card.number}</Text>
            <Text style={styles.cardPoints}>Points: {card.points}</Text>
          </>
        );
      default:
        return (
          <>
            <Text style={styles.cardNumber}>
              **** **** **** {card.number.slice(-4)}
            </Text>
            <Text style={styles.cardExpiry}>Expires: {card.expiryDate}</Text>
          </>
        );
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: card.color || "#f0f0f0" }]}
    >
      <Text style={styles.cardType}>{card.type}</Text>
      <Text style={styles.cardName}>{card.name}</Text>
      {renderCardDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardName: {
    fontSize: 16,
    marginTop: 5,
  },
  cardNumber: {
    fontSize: 14,
    marginTop: 5,
  },
  cardExpiry: {
    fontSize: 14,
    marginTop: 5,
  },
  cardBalance: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardPoints: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default CardItem;
