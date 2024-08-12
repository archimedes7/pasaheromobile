import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import { Colors } from "@/constants/Colors";

interface HeatmapViewProps {
  title: string;
  data: { date: string; count: number }[];
  color: (opacity: number) => string;
  colors: Colors;
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({
  title,
  data,
  color,
  colors,
}) => {
  return (
    <View style={styles.heatmapContainer}>
      <Text style={[styles.heatmapTitle, { color: colors.primaryText }]}>
        {title}
      </Text>
      <ContributionGraph
        values={data}
        endDate={new Date()}
        numDays={30}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundColor: colors.primaryBackground,
          backgroundGradientFrom: colors.primaryBackground,
          backgroundGradientTo: colors.primaryBackground,
          decimalPlaces: 2,
          color: color,
          labelColor: () => colors.secondaryText,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heatmapContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  heatmapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
