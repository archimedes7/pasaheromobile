import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LocalEatsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState([
    { id: "1", name: "Joe's Taco Stand", rating: 4.5, cuisine: "Mexican" },
    { id: "2", name: "Mama's Dumplings", rating: 4.8, cuisine: "Chinese" },
    { id: "3", name: "Street Burger", rating: 4.2, cuisine: "American" },
    // Add more mock data as needed
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => router.push(`/local-eats/place-details?id=${item.id}`)}
    >
      <View>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeCuisine}>{item.cuisine}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for local eats..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/local-eats/review")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  placeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placeCuisine: {
    fontSize: 14,
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007f8a",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
