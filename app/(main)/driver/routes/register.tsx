import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { registerRoute } from "@/services/routeServices";

export default function RouteRegistrationScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [route, setRoute] = useState({
    startLocation: "",
    endLocation: "",
    viaPoints: "",
    days: [],
    departureTime: new Date(),
    seats: 1,
    notes: "",
  });

  const handleRegister = async () => {
    try {
      await registerRoute(user.uid, route);
      alert("Route registered successfully!");
      router.back();
    } catch (error) {
      console.error("Error registering route:", error);
      alert("Failed to register route. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register New Route</Text>
      <TextInput
        style={styles.input}
        placeholder="Start Location"
        value={route.startLocation}
        onChangeText={(text) => setRoute({ ...route, startLocation: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="End Location"
        value={route.endLocation}
        onChangeText={(text) => setRoute({ ...route, endLocation: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Via Points (comma separated)"
        value={route.viaPoints}
        onChangeText={(text) => setRoute({ ...route, viaPoints: text })}
      />
      <Text>Days of the week:</Text>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <Button
          key={day}
          title={day}
          onPress={() => {
            const newDays = route.days.includes(day)
              ? route.days.filter((d) => d !== day)
              : [...route.days, day];
            setRoute({ ...route, days: newDays });
          }}
          color={route.days.includes(day) ? "blue" : "gray"}
        />
      ))}
      <Text>Departure Time:</Text>
      <DateTimePicker
        value={route.departureTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate) =>
          setRoute({
            ...route,
            departureTime: selectedDate || route.departureTime,
          })
        }
      />
      <Picker
        selectedValue={route.seats}
        onValueChange={(itemValue) => setRoute({ ...route, seats: itemValue })}
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Picker.Item
            key={num}
            label={`${num} seat${num > 1 ? "s" : ""}`}
            value={num}
          />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Additional Notes"
        value={route.notes}
        onChangeText={(text) => setRoute({ ...route, notes: text })}
        multiline
      />
      <Button title="Register Route" onPress={handleRegister} />
    </ScrollView>
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
