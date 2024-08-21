import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchRouteDetails, deleteRoute } from "@/services/routeServices";

export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const loadRouteDetails = async () => {
      const details = await fetchRouteDetails(id);
      setRoute(details);
    };
    loadRouteDetails();
  }, [id]);

  const handleDelete = async () => {
    await deleteRoute(id);
    router.back();
  };

  if (!route) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {route.startLocation} to {route.endLocation}
      </Text>
      <Text>Days: {route.days.join(", ")}</Text>
      <Text>Departure Time: {route.departureTime.toLocaleTimeString()}</Text>
      <Text>Available Seats: {route.seats}</Text>
      <Text>Notes: {route.notes}</Text>
      <Button
        title="Edit Route"
        onPress={() => router.push(`/driver/routes/edit/${id}`)}
      />
      <Button title="Delete Route" onPress={handleDelete} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (add your styles here)
});
