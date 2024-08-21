import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SearchPlannedRoutes() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: "/booking/planned-routes/results",
      params: { startLocation, endLocation, date: date.toISOString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Planned Routes</Text>
      <TextInput
        style={styles.input}
        placeholder="Start Location"
        value={startLocation}
        onChangeText={setStartLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="End Location"
        value={endLocation}
        onChangeText={setEndLocation}
      />
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setDate(selectedDate || date)}
      />
      <Button title="Search Routes" onPress={handleSearch} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
