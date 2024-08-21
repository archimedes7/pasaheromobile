import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { fetchDriverRoutes } from "@/services/routeServices";

export default function DriverRoutesScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const loadRoutes = async () => {
      const driverRoutes = await fetchDriverRoutes(user.uid);
      setRoutes(driverRoutes);
    };
    loadRoutes();
  }, [user]);

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.routeItem}
      onPress={() => router.push(`/driver/routes/${item.id}`)}
    >
      <Text style={styles.routeTitle}>
        {item.startLocation} to {item.endLocation}
      </Text>
      <Text>Days: {item.days.join(", ")}</Text>
      <Text>Departure: {item.departureTime.toLocaleTimeString()}</Text>
      <Text>Seats: {item.seats}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        renderItem={renderRouteItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/driver/routes/register")}
      >
        <Text style={styles.addButtonText}>Add New Route</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (add your styles here)
});
