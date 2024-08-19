import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PlaceDetailsScreen() {
  const { id } = useLocalSearchParams();

  // TODO: Fetch real data based on id
  const place = {
    name: "Joe's Taco Stand",
    rating: 4.5,
    cuisine: "Mexican",
    address: "123 Main St, Anytown, USA",
    reviews: [
      { user: "John D.", text: "Great tacos! Authentic flavors.", rating: 5 },
      { user: "Sarah M.", text: "Good food, but a bit pricey.", rating: 4 },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.cuisine}>{place.cuisine}</Text>
      <Text style={styles.address}>{place.address}</Text>

      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={24} color="#FFD700" />
        <Text style={styles.rating}>{place.rating.toFixed(1)}</Text>
      </View>

      <Text style={styles.reviewsTitle}>Reviews</Text>
      {place.reviews.map((review, index) => (
        <View key={index} style={styles.reviewItem}>
          <Text style={styles.reviewUser}>{review.user}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
          <View style={styles.reviewRating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text>{review.rating}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
    marginBottom: 10,
  },
  cuisine: {
    fontSize: 18,
    color: "gray",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rating: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  reviewUser: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewText: {
    marginBottom: 5,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
