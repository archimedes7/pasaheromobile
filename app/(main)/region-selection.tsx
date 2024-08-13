import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const regions = [
  { id: "1", name: "Metro Manila" },
  { id: "2", name: "Tagaytay" },
  { id: "3", name: "Batangas" },
  { id: "4", name: "Pampanga" },
  { id: "5", name: "Bulacan" },
  { id: "6", name: "La Union" },
  { id: "7", name: "Calabarzon" },
  { id: "8", name: "Central Luzon" },
  // Add more regions as needed
];

const RegionSelectionScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const renderRegionItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.regionItem, { borderColor: colors.primary }]}
      onPress={() =>
        router.push({
          pathname: "/map",
          params: { region: item.name },
        })
      }
    >
      <Text style={[styles.regionText, { color: colors.primaryText }]}>
        {item.name}
      </Text>
      <Ionicons name="chevron-forward" size={24} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>
        Select Your Region
      </Text>
      <FlatList
        data={regions}
        renderItem={renderRegionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
  },
  listContainer: {
    flexGrow: 1,
  },
  regionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  regionText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default RegionSelectionScreen;
