import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InsuranceScreen() {
  return (
    <ScrollView style={styles.container}>
      <Ionicons name="shield-checkmark" size={24} color="#007f8a" />
      <Text style={styles.title}>Insurance Coverage</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Policy Review</Text>
        <Text style={styles.sectionText}>
          Engage multiple insurance experts and legal professionals specializing
          in transportation law to review all policies.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compliance with Regulations</Text>
        <Text style={styles.sectionText}>
          Stay up-to-date with all LTFRB and DOTr regulations regarding TNCs and
          insurance requirements.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clear Definitions and Terms</Text>
        <Text style={styles.sectionText}>
          Ensure all key terms in insurance policies are clearly defined to
          prevent misinterpretation.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comprehensive Coverage Periods</Text>
        <Text style={styles.sectionText}>
          Clearly delineate coverage for all possible scenarios.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regular Audits</Text>
        <Text style={styles.sectionText}>
          Conduct quarterly internal audits of insurance coverage and claims.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Driver Verification and Compliance
        </Text>
        <Text style={styles.sectionText}>
          Implement a robust system to verify that all drivers maintain required
          personal insurance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transparent Communication</Text>
        <Text style={styles.sectionText}>
          Clearly communicate insurance terms to drivers and passengers.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Incident Response Protocol</Text>
        <Text style={styles.sectionText}>
          Develop a clear, step-by-step protocol for responding to accidents or
          incidents.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Data Protection and Cybersecurity
        </Text>
        <Text style={styles.sectionText}>
          Ensure that all insurance-related data is securely stored and
          protected.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regular Stress Tests</Text>
        <Text style={styles.sectionText}>
          Conduct periodic "stress tests" or simulations of various incident
          scenarios.
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Full Policy Details</Text>
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
