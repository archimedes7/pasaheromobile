import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ReceiptProps {
  tripDetails: {
    startLocation: string;
    endLocation: string;
    startTime: string;
    endTime: string;
    distance: number;
  };
  fareBreakdown: {
    baseFare: number;
    distanceCharge: number;
    timeCharge: number;
    surgePricing: number;
  };
  driver: {
    name: string;
    vehicleMake: string;
    vehicleModel: string;
    plateNumber: string;
  };
  totalFare: number;
  taxAmount: number;
}

const Receipt: React.FC<ReceiptProps> = ({
  tripDetails,
  fareBreakdown,
  driver,
  totalFare,
  taxAmount,
}) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/findheroes.png")} style={styles.logo} />
      <Text style={styles.title}>Your PasaHERO Journey Receipt</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Details</Text>
        <View style={styles.row}>
          <Ionicons name="location" size={18} color="#007AFF" />
          <Text style={styles.label}>From: </Text>
          <Text style={styles.value}>{tripDetails.startLocation}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location" size={18} color="#FF3B30" />
          <Text style={styles.label}>To: </Text>
          <Text style={styles.value}>{tripDetails.endLocation}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time" size={18} color="#5856D6" />
          <Text style={styles.label}>Time: </Text>
          <Text
            style={styles.value}
          >{`${tripDetails.startTime} - ${tripDetails.endTime}`}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="speedometer" size={18} color="#FF9500" />
          <Text style={styles.label}>Distance: </Text>
          <Text style={styles.value}>{`${tripDetails.distance} km`}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fare Breakdown</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Base Fare:</Text>
          <Text style={styles.value}>₱{fareBreakdown.baseFare.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance Charge:</Text>
          <Text style={styles.value}>
            ₱{fareBreakdown.distanceCharge.toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time Charge:</Text>
          <Text style={styles.value}>
            ₱{fareBreakdown.timeCharge.toFixed(2)}
          </Text>
        </View>
        {fareBreakdown.surgePricing > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Surge Pricing:</Text>
            <Text style={styles.value}>
              ₱{fareBreakdown.surgePricing.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your PasaHERO</Text>
        <View style={styles.row}>
          <Ionicons name="person" size={18} color="#34C759" />
          <Text style={styles.label}>Driver: </Text>
          <Text style={styles.value}>{driver.name}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="car" size={18} color="#5AC8FA" />
          <Text style={styles.label}>Vehicle: </Text>
          <Text
            style={styles.value}
          >{`${driver.vehicleMake} ${driver.vehicleModel}`}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="card" size={18} color="#FF2D55" />
          <Text style={styles.label}>Plate Number: </Text>
          <Text style={styles.value}>{driver.plateNumber}</Text>
        </View>
      </View>

      <View style={styles.totalSection}>
        <View style={styles.row}>
          <Text style={styles.label}>Tax:</Text>
          <Text style={styles.value}>₱{taxAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, styles.totalLabel]}>Total Fare:</Text>
          <Text style={[styles.value, styles.totalValue]}>
            ₱{totalFare.toFixed(2)}
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>Thank you for choosing PasaHERO!</Text>
      <Text style={styles.contact}>
        For inquiries: support@pasahero.ph | +63 123 456 7890
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F2F2F7",
  },
  logo: {
    width: 100,
    height: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#007AFF",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1C1C1E",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#3C3C43",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
  },
  totalSection: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  totalLabel: {
    color: "white",
    fontWeight: "bold",
  },
  totalValue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
  },
  contact: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
    color: "#3C3C43",
  },
});

export default Receipt;
