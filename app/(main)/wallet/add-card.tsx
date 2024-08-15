import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { useWallet } from "@/contexts/WalletContext";
import { CreditCardInput } from "react-native-credit-card-input";
import { Card } from "@/types";
import { Picker } from "@react-native-picker/picker";

export default function AddCardScreen() {
  const router = useRouter();
  const { addCard } = useWallet();
  const [cardData, setCardData] = useState<Partial<Card>>({
    type: "credit",
    isActive: true,
    currency: "USD",
  });

  const handleAddCard = () => {
    if (!cardData.number || !cardData.name) {
      Alert.alert("Error", "Please enter valid card details.");
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      ...(cardData as Card),
      lastUsed: new Date(),
    };

    addCard(newCard);
    router.push("/wallet/view-cards");
  };

  const renderExtraFields = () => {
    switch (cardData.type) {
      case "loyalty":
        return (
          <TextInput
            style={styles.input}
            placeholder="Points"
            value={cardData.points?.toString()}
            onChangeText={(text) =>
              setCardData({ ...cardData, points: parseInt(text) })
            }
            keyboardType="numeric"
          />
        );
      case "transport":
        return (
          <TextInput
            style={styles.input}
            placeholder="Balance"
            value={cardData.balance?.toString()}
            onChangeText={(text) =>
              setCardData({ ...cardData, balance: parseFloat(text) })
            }
            keyboardType="numeric"
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Card</Text>

      <Picker
        selectedValue={cardData.type}
        onValueChange={(itemValue) =>
          setCardData({ ...cardData, type: itemValue })
        }
      >
        <Picker.Item label="Credit Card" value="credit" />
        <Picker.Item label="Debit Card" value="debit" />
        <Picker.Item label="Loyalty Card" value="loyalty" />
        <Picker.Item label="Transport Card" value="transport" />
      </Picker>

      <CreditCardInput
        onChange={(form) => {
          setCardData({
            ...cardData,
            number: form.values.number,
            expiryDate: form.values.expiry,
            cvv: form.values.cvc,
            cardProvider: form.values.type,
            cardHolderName: form.values.name,
          });
        }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
      />

      <TextInput
        style={styles.input}
        placeholder="Card Name"
        value={cardData.name}
        onChangeText={(text) => setCardData({ ...cardData, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Issuer"
        value={cardData.issuer}
        onChangeText={(text) => setCardData({ ...cardData, issuer: text })}
      />

      {renderExtraFields()}

      <TextInput
        style={styles.input}
        placeholder="Card Color (hex)"
        value={cardData.color}
        onChangeText={(text) => setCardData({ ...cardData, color: text })}
      />

      <View style={styles.switchContainer}>
        <Text>Set as Default</Text>
        <Switch
          value={cardData.isDefault}
          onValueChange={(value) =>
            setCardData({ ...cardData, isDefault: value })
          }
        />
      </View>

      <Button
        title="Add Card"
        onPress={handleAddCard}
        disabled={!cardData.number || !cardData.name}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    color: "#555",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
