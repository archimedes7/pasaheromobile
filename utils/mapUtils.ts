import { Region } from "react-native-maps";
import { LocationData, CarType } from "../types";

export const generateHeatmapData = (
  locations: LocationData[]
): { date: string; count: number }[] => {
  return locations.map((loc) => ({
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
    count: Math.floor(loc.weight * 10),
  }));
};

export const getDistance = (from: Region, to: Region): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (to.latitude - from.latitude) * (Math.PI / 180);
  const dLon = (to.longitude - from.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(from.latitude * (Math.PI / 180)) *
      Math.cos(to.latitude * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const calculateEstimatedPrice = (
  from: Region,
  to: Region,
  carType: CarType
): number => {
  const distance = getDistance(from, to);
  const basePrice = 50; // Base price in your currency
  const pricePerKm = carType.price * 10; // Price per km based on car type
  return basePrice + distance * pricePerKm;
};

// Add more utility functions as needed
