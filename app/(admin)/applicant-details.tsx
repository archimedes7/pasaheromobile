// app/admin/applicant-details.tsx

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getApplicantDetails,
  approveApplicant,
  rejectApplicant,
} from "@/services/adminServices";

export default function ApplicantDetails() {
  const { applicantId } = useLocalSearchParams();
  const router = useRouter();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      const details = await getApplicantDetails(applicantId);
      setApplicant(details);
    };

    fetchApplicantDetails();
  }, [applicantId]);

  const handleApprove = async () => {
    await approveApplicant(applicantId);
    router.back();
  };

  const handleReject = async () => {
    await rejectApplicant(applicantId);
    router.back();
  };

  if (!applicant) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{applicant.name}</Text>
      <Text style={styles.subtitle}>{applicant.type} Applicant</Text>

      {/* Display other applicant details here */}
      <Text style={styles.label}>Email:</Text>
      <Text>{applicant.email}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text>{applicant.phone}</Text>

      {/* Add more fields as necessary */}

      <View style={styles.buttonContainer}>
        <Button title="Approve" onPress={handleApprove} color="green" />
        <Button title="Reject" onPress={handleReject} color="red" />
      </View>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
