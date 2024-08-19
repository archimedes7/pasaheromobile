import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FaceRecognition from "@/components/FaceRecognition";

export default function DriverTrainingScreen() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = (verified: boolean) => {
    setIsVerified(verified);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Driver Training and Awareness</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Face Recognition Verification</Text>
        <FaceRecognition onVerify={handleVerify} />
      </View>

      {isVerified && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safe Driving Practices</Text>
          <Text style={styles.sectionText}>
            Learn about safe driving techniques, defensive driving, and how to
            handle different road conditions.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Training</Text>
          </TouchableOpacity>
        </View>
      )}

      {isVerified && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Response</Text>
          <Text style={styles.sectionText}>
            Understand how to respond to emergencies, accidents, and other
            critical situations.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Training</Text>
          </TouchableOpacity>
        </View>
      )}

      {isVerified && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Insurance Policy Understanding
          </Text>
          <Text style={styles.sectionText}>
            Learn about the insurance policies that cover you and your
            passengers during rides.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Training</Text>
          </TouchableOpacity>
        </View>
      )}

      {isVerified && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regular Refresher Courses</Text>
          <Text style={styles.sectionText}>
            Stay updated with the latest safety practices and regulations
            through regular refresher courses.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Training</Text>
          </TouchableOpacity>
        </View>
      )}
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    backgroundColor: "#007f8a",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
