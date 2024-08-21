import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { searchRoutes } from "@/services/routeServices";

export default function PlannedRoutesResults() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const results = await searchRoutes(
        params.startLocation,
        params.endLocation,
        new Date(params.date),
        60 // flexibleTime in minutes
      );
      setRoutes(results);
    };
    fetchRoutes();
  }, [params]);

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.routeItem}
      onPress={() =>
        router.push({
          pathname: "/booking/planned-routes/book",
          params: { routeId: item.id },
        })
      }
    >
      <Text style={styles.routeTitle}>
        {item.startLocation} to {item.endLocation}
      </Text>
      <Text>
        Date: {new Date(item.departureTime.toDate()).toLocaleDateString()}
      </Text>
      <Text>
        Time: {new Date(item.departureTime.toDate()).toLocaleTimeString()}
      </Text>
      <Text>Available Seats: {item.seats}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Routes</Text>
      <FlatList
        data={routes}
        renderItem={renderRouteItem}
        keyExtractor={(item) => item.id}
      />
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
  routeItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
