import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { CarType } from "../types";
import { Colors } from "@/constants/Colors";

interface CarOptionProps {
  carType: CarType;
  isSelected: boolean;
  onSelect: () => void;
  colors: Colors;
}

export const CarOption: React.FC<CarOptionProps> = ({
  carType,
  isSelected,
  onSelect,
  colors,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.carOption,
        isSelected && styles.selectedCarOption,
        { borderColor: colors.primary },
      ]}
      onPress={onSelect}
    >
      <MaterialCommunityIcons
        name={carType.icon}
        size={40}
        color={isSelected ? colors.primary : colors.primaryText}
      />
      <Text style={[styles.carOptionName, { color: colors.primaryText }]}>
        {carType.name}
      </Text>
      <Text style={[styles.carOptionCapacity, { color: colors.secondaryText }]}>
        <Ionicons name="person" size={14} /> {carType.capacity}
      </Text>
      <Text
        style={[styles.carOptionDescription, { color: colors.secondaryText }]}
      >
        {carType.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  carOption: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,
    width: 120,
    height: 160,
  },
  selectedCarOption: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  carOptionName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  carOptionCapacity: {
    fontSize: 14,
    marginTop: 5,
  },
  carOptionDescription: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
});
