import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchRouteDetails } from "@/services/routeServices";

export default function BookPlannedRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const loadRouteDetails = async () => {
      const details = await fetchRouteDetails(params.routeId);
      setRoute(details);
    };
    loadRouteDetails();
  }, [params.routeId]);

  const handleBooking = () => {
    // Implement booking logic here
    Alert.alert("Booking Confirmed", "Your ride has been booked successfully!");
    router.replace("/booking");
  };

  if (!route) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Booking</Text>
      <Text>From: {route.startLocation}</Text>
      <Text>To: {route.endLocation}</Text>
      <Text>
        Date: {new Date(route.departureTime.toDate()).toLocaleDateString()}
      </Text>
      <Text>
        Time: {new Date(route.departureTime.toDate()).toLocaleTimeString()}
      </Text>
      <Text>Available Seats: {route.seats}</Text>
      <Button title="Confirm Booking" onPress={handleBooking} />
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
});
