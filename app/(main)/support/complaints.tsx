import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  DatePickerIOS,
  Linking,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DatePicker } from "@react-native-community/datetimepicker";

export default function ComplaintsScreen() {
  const [issueType, setIssueType] = useState("");
  const [issueDate, setIssueDate] = useState(new Date());
  const [tripId, setTripId] = useState("");
  const [complaint, setComplaint] = useState("");
  const [contactPreference, setContactPreference] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = () => {
    // Handle complaint submission logic here
    console.log("Complaint submitted:", {
      issueType,
      issueDate,
      tripId,
      complaint,
      contactPreference,
      contactInfo,
    });
    setIssueType("");
    setIssueDate(new Date());
    setTripId("");
    setComplaint("");
    setContactPreference("");
    setContactInfo("");
  };

  const handleCustomerService = () => {
    // Replace with your customer service phone number
    const phoneNumber = "tel:+1234567890";
    Linking.openURL(phoneNumber);
  };

  const handleChatSupport = () => {
    // Replace with your chat support URL
    const chatUrl = "https://your-chat-support-url.com";
    Linking.openURL(chatUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File a Complaint</Text>

      <Text style={styles.label}>What type of issue are you experiencing?</Text>
      <Picker
        selectedValue={issueType}
        onValueChange={(itemValue) => setIssueType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Driver behavior" value="Driver behavior" />
        <Picker.Item label="Vehicle condition" value="Vehicle condition" />
        <Picker.Item label="Payment issue" value="Payment issue" />
        <Picker.Item label="App issue" value="App issue" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>When did the issue occur?</Text>
      <DatePickerIOS
        date={issueDate}
        onDateChange={setIssueDate}
        style={styles.datePicker}
      />

      <Text style={styles.label}>Which trip was this related to?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Trip ID"
        value={tripId}
        onChangeText={setTripId}
      />

      <Text style={styles.label}>Please describe the issue in detail.</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Describe your issue..."
        value={complaint}
        onChangeText={setComplaint}
      />

      <Text style={styles.label}>
        Would you like us to contact you regarding this issue?
      </Text>
      <Picker
        selectedValue={contactPreference}
        onValueChange={(itemValue) => setContactPreference(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Yes" value="Yes" />
        <Picker.Item label="No" value="No" />
      </Picker>

      {contactPreference === "Yes" && (
        <>
          <Text style={styles.label}>How can we contact you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your contact information"
            value={contactInfo}
            onChangeText={setContactInfo}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCustomerService}>
        <Text style={styles.buttonText}>Speak to Customer Service</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChatSupport}>
        <Text style={styles.buttonText}>Chat Support</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007f8a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
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
