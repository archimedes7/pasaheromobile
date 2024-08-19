import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function DriverApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    driverLicense: "",
    carMake: "",
    carModel: "",
    carYear: "",
    plateNumber: "",
    insuranceProvider: "",
    insurancePolicy: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Driver Application</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Driver's License Number"
        value={formData.driverLicense}
        onChangeText={(text) => handleChange("driverLicense", text)}
      />

      <Text style={styles.sectionTitle}>Vehicle Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Car Make"
        value={formData.carMake}
        onChangeText={(text) => handleChange("carMake", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Car Model"
        value={formData.carModel}
        onChangeText={(text) => handleChange("carModel", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Car Year"
        value={formData.carYear}
        onChangeText={(text) => handleChange("carYear", text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Plate Number"
        value={formData.plateNumber}
        onChangeText={(text) => handleChange("plateNumber", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Insurance Provider"
        value={formData.insuranceProvider}
        onChangeText={(text) => handleChange("insuranceProvider", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Insurance Policy Number"
        value={formData.insurancePolicy}
        onChangeText={(text) => handleChange("insurancePolicy", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007f8a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
