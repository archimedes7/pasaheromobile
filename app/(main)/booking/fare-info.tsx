import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";

const FareInfoScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const fareComponents = [
    {
      component: "Base Fare",
      pasaHERO: "12 PHP",
      grab: "45 PHP",
      peekUp: "30 PHP",
    },
    {
      component: "Distance Charge",
      pasaHERO: "15 PHP/km (to driver)",
      grab: "15 PHP/km",
      peekUp: "Variable, typically around 15 PHP/km",
    },
    {
      component: "Time Charge",
      pasaHERO: "1 PHP/min (to platform)",
      grab: "2 PHP/min",
      peekUp: "1-2 PHP/min",
    },
    {
      component: "Surge Pricing",
      pasaHERO: "Up to 2x, to driver",
      grab: "Up to 2x, platform & driver",
      peekUp: "Dynamic, to driver",
    },
    {
      component: "Driver Incentives",
      pasaHERO: "Entire surge fee to driver",
      grab: "Shared, higher during peak times",
      peekUp: "Entire surge fee to driver",
    },
    {
      component: "Transparency",
      pasaHERO: "Clear fare breakdown",
      grab: "Clear fare breakdown",
      peekUp: "Clear fare breakdown",
    },
    {
      component: "Availability",
      pasaHERO: "Encouraged by surge fee",
      grab: "Encouraged by surge fee",
      peekUp: "Guaranteed even during peak",
    },
    {
      component: "Passenger Affordability",
      pasaHERO: "Low base fare, dynamic pricing",
      grab: "Competitive with clear surge",
      peekUp: "Budget-friendly with dynamic pricing",
    },
    {
      component: "Additional Features",
      pasaHERO: "Real-time GPS, feedback system, Gas Input",
      grab: "Extensive app features",
      peekUp: "Safety measures, real-time tracking",
    },
  ];

  const analysis = [
    "Base Fare: Our app offers the lowest base fare, making it highly attractive to budget-conscious passengers.",
    "Distance Charge: The distance charge is consistent with market standards, ensuring competitive pricing while fairly compensating drivers.",
    "Time Charge: Our app's time charge is the lowest, making it more affordable for passengers during longer trips.",
    "Surge Pricing: The dynamic pricing model ensures fair compensation for drivers during peak times, similar to competitors.",
    "Driver Incentives: Our app provides a significant incentive for drivers by allocating the entire surge fee to them.",
    "Transparency: All apps maintain transparency in fare breakdown, fostering trust among users.",
    "Availability: Surge pricing incentivizes driver availability, ensuring passengers can get rides even during peak hours.",
    "Passenger Affordability: The combination of a low base fare and competitive distance/time charges makes ourapp very economical.",
    "Additional Features: The inclusion of real-time GPS tracking, a robust feedback system, and the unique Gas Input feature enhances safety, service quality, and fair pricing.",
  ];

  const gasInputFeature = [
    "Our unique Gas Input feature allows for more accurate and fair pricing based on current fuel costs:",
    "• Drivers can input the current gas price they're paying.",
    "• The app uses this information to adjust fares dynamically.",
    "• This ensures drivers are fairly compensated for their fuel expenses.",
    "• Passengers benefit from transparent pricing that reflects real-time costs.",
  ];

  const implementation = [
    "1. Vehicle Registration: Collect detailed information about make, model, and engine size when drivers register.",
    "2. Fuel Efficiency Calculation: Use average fuel consumption data to estimate fuel cost per kilometer for each vehicle type.",
    "3. Dynamic Pricing Adjustment: Adjust fares based on vehicle type and current gas prices.",
    "4. Transparency: Clearly display cost breakdown to passengers, including base fare, distance charge, and fuel surcharge.",
  ];

  const pricingExample = [
    "Example pricing for a 10 km ride:",
    "• Compact Car: 10 km * 4.38 PHP/km = 43.8 PHP",
    "• Sedan: 10 km * 5.48 PHP/km = 54.8 PHP",
    "• SUV: 10 km * 6.58 PHP/km = 65.8 PHP",
    "• Large SUV/Truck: 10 km * 8.22 PHP/km = 82.2 PHP",
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Fare Information and Features
      </Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Fare Comparison
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableHeader,
              styles.componentCell,
              { color: colors.text },
            ]}
          >
            Component
          </Text>
          <Text
            style={[
              styles.tableHeader,
              styles.companyCell,
              { color: colors.text },
            ]}
          >
            OUR APP
          </Text>
          <Text
            style={[
              styles.tableHeader,
              styles.companyCell,
              { color: colors.text },
            ]}
          >
            Grab
          </Text>
          <Text
            style={[
              styles.tableHeader,
              styles.companyCell,
              { color: colors.text },
            ]}
          >
            PeekUp
          </Text>
        </View>
        {fareComponents.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.componentCell, { color: colors.text }]}>
              {item.component}
            </Text>
            <Text style={[styles.companyCell, { color: colors.text }]}>
              {item.pasaHERO}
            </Text>
            <Text style={[styles.companyCell, { color: colors.text }]}>
              {item.grab}
            </Text>
            <Text style={[styles.companyCell, { color: colors.text }]}>
              {item.peekUp}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Gas Input Feature
      </Text>
      {gasInputFeature.map((item, index) => (
        <Text key={index} style={[styles.bulletPoint, { color: colors.text }]}>
          {item}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Implementation Details
      </Text>
      {implementation.map((item, index) => (
        <Text key={index} style={[styles.bulletPoint, { color: colors.text }]}>
          {item}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Pricing Example
      </Text>
      {pricingExample.map((item, index) => (
        <Text key={index} style={[styles.bulletPoint, { color: colors.text }]}>
          {item}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Analysis
      </Text>
      {analysis.map((item, index) => (
        <Text key={index} style={[styles.bulletPoint, { color: colors.text }]}>
          {item}
        </Text>
      ))}

      <Text style={[styles.note, { color: colors.text }]}>
        Note: Fares and features may vary based on location, demand, and other
        factors. This information is for reference only.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  componentCell: {
    flex: 2,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  companyCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  bulletPoint: {
    marginBottom: 10,
    lineHeight: 20,
    paddingLeft: 15,
  },
  note: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 20,
  },
});

export default FareInfoScreen;
