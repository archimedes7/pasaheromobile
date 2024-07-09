// screens/RegionSelectionScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useTheme } from "../styles/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

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

const RegionSelectionScreen = ({ navigation }) => {
  const { theme, typography } = useTheme();

  const renderRegionItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.regionItem, { borderColor: theme.colors.primary }]}
      onPress={() => navigation.navigate("MapScreen", { region: item.name })}
    >
      <Text
        style={[typography.titleMedium, { color: theme.colors.primaryText }]}
      >
        {item.name}
      </Text>
      <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <Text
        style={[
          styles.title,
          typography.headlineLarge,
          { color: theme.colors.primaryText },
        ]}
      >
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
});

export default RegionSelectionScreen;
