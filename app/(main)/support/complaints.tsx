import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ComplaintsScreen() {
  const [complaint, setComplaint] = useState("");

  const handleSubmit = () => {
    // Handle complaint submission logic here
    console.log("Complaint submitted:", complaint);
    setComplaint("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File a Complaint</Text>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Describe your issue..."
        value={complaint}
        onChangeText={setComplaint}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Note: We take all complaints seriously and will respond within 24 hours.
      </Text>
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
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007f8a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  note: {
    marginTop: 20,
    fontStyle: "italic",
  },
});
