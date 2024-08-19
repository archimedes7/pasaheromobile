import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function DriverBehaviorScreen() {
  // Mock data - replace with real data from your backend
  const weeklyScores = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [85, 88, 92, 87, 90, 93, 89],
      },
    ],
  };

  const behaviorMetrics = {
    labels: ["Speed", "Braking", "Acceleration", "Turns", "Phone Use"],
    datasets: [
      {
        data: [80, 75, 85, 70, 90],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Driver Behavior Analytics</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Performance Score</Text>
        <LineChart
          data={weeklyScores}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Behavior Metrics</Text>
        <BarChart
          data={behaviorMetrics}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: "#307ecc",
            backgroundGradientFrom: "#4287f5",
            backgroundGradientTo: "#79a6f6",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>This Week's Stats</Text>
        <Text style={styles.statItem}>Total Trips: 28</Text>
        <Text style={styles.statItem}>Average Rating: 4.8 ⭐</Text>
        <Text style={styles.statItem}>On-Time Arrivals: 96%</Text>
        <Text style={styles.statItem}>Cancellation Rate: 2%</Text>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips for Improvement</Text>
        <Text style={styles.tipItem}>• Maintain steady speeds on highways</Text>
        <Text style={styles.tipItem}>
          • Avoid hard braking by anticipating stops
        </Text>
        <Text style={styles.tipItem}>
          • Keep your phone in a mount while driving
        </Text>
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
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  tipsContainer: {
    backgroundColor: "#e6f7ff",
    padding: 15,
    borderRadius: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});
