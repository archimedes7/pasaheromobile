import axios from "axios";
import * as Notifications from "expo-notifications";
import { Region } from "react-native-maps";

export const fetchAddress = async (coordinates: Region): Promise<string> => {
  const { latitude, longitude } = coordinates;
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "PasaheroApp/1.0" },
    });
    if (response.data.address) {
      return response.data.display_name;
    } else {
      return "Address not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Address not found";
  }
};

export const scheduleNotification = async (
  from: string,
  to: string,
  carType: string,
  price: number
): Promise<void> => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Ride Booked!",
      body: `Your ${carType} ride from ${from} to ${to} has been booked. Estimated price: ₱${price.toFixed(
        2
      )}`,
      data: { from, to, carType, price },
    },
    trigger: { seconds: 1 },
  });
};

// Add more API-related functions as needed
