// screens/BookRide.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useAuth } from "@/contexts/AuthContext"; // Assume you have an auth context

const BookRide = ({ navigation }) => {
  const [isPetRide, setIsPetRide] = useState(false);
  //const { user } = useAuth();

  useEffect(() => {
    if (user.userType === "petOwner") {
      setIsPetRide(true);
    }
  }, [user]);

  const handleBooking = () => {
    // Implement booking logic here
    console.log("Booking a ride:", { isPetRide });
    navigation.navigate("LookingForDriver", { isPetRide });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Heroes Nearby</Text>

      {user.userType === "petOwner" && (
        <View style={styles.switchContainer}>
          <Text>Pet Transportation</Text>
          <Switch value={isPetRide} onValueChange={setIsPetRide} />
        </View>
      )}

      {/* Add other booking options here (pickup, dropoff, etc.) */}

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (add appropriate styles)
});

export default BookRide;
