// app/safety/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafetyCard from "@/components/SafetyCard";

export default function SafetyScreen() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleFeaturePress = (feature: string) => {
    setSelectedFeature(feature);
  };

  const handleCloseCard = () => {
    setSelectedFeature(null);
  };

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case "Emergency SOS":
        return (
          <View>
            <Text>Emergency SOS Content</Text>
            {/* Add your Emergency SOS content here */}
          </View>
        );
      case "Share Ride Details":
        return (
          <View>
            <Text>Share Ride Details Content</Text>
            {/* Add your Share Ride Details content here */}
          </View>
        );
      case "Live Trip Tracking":
        return (
          <View>
            <Text>Live Trip Tracking Content</Text>
            {/* Add your Live Trip Tracking content here */}
          </View>
        );
      case "24/7 Support Hotline":
        return (
          <View>
            <Text>24/7 Support Hotline Content</Text>
            {/* Add your 24/7 Support Hotline content here */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Safety Features</Text>

        <TouchableOpacity
          style={styles.feature}
          onPress={() => handleFeaturePress("Emergency SOS")}
        >
          <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>Emergency SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          onPress={() => handleFeaturePress("Share Ride Details")}
        >
          <Ionicons name="people" size={24} color="#2196F3" />
          <Text style={styles.featureText}>Share Ride Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          onPress={() => handleFeaturePress("Live Trip Tracking")}
        >
          <Ionicons name="location" size={24} color="#FFC107" />
          <Text style={styles.featureText}>Live Trip Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          onPress={() => handleFeaturePress("24/7 Support Hotline")}
        >
          <Ionicons name="call" size={24} color="#9C27B0" />
          <Text style={styles.featureText}>24/7 Support Hotline</Text>
        </TouchableOpacity>
      </ScrollView>

      {selectedFeature && (
        <SafetyCard
          title={selectedFeature}
          content={renderFeatureContent()}
          onClose={handleCloseCard}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
