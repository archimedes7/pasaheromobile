import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useTheme } from "./../../../styles/ThemeContext";

const DriverFound = ({ route }) => {
  const { theme, typography } = useTheme();
  const {
    driverName,
    estimatedArrival,
    fromAddress,
    toAddress,
    carType,
    estimatedPrice,
  } = route.params;
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    // Simulate driver movement
    const interval = setInterval(() => {
      setDriverLocation((prevLocation) => {
        if (!prevLocation) {
          // Initial driver location (you'd get this from your backend in a real app)
          return {
            latitude: 14.5995 + (Math.random() - 0.5) * 0.01,
            longitude: 120.9842 + (Math.random() - 0.5) * 0.01,
          };
        }
        // Move the driver slightly (in a real app, you'd get updates from the driver's device)
        return {
          latitude: prevLocation.latitude + (Math.random() - 0.5) * 0.001,
          longitude: prevLocation.longitude + (Math.random() - 0.5) * 0.001,
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 14.5995,
          longitude: 120.9842,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title={`Driver: ${driverName}`}
            description={`Estimated arrival: ${estimatedArrival}`}
          >
            <View style={styles.driverMarker}>
              <Text style={styles.driverMarkerText}>🚗</Text>
            </View>
          </Marker>
        )}
      </MapView>
      <View
        style={[
          styles.infoContainer,
          { backgroundColor: theme.colors.primaryBackground },
        ]}
      >
        <Text
          style={[
            styles.infoText,
            { color: theme.colors.primaryText },
            typography.bodyLarge,
          ]}
        >
          Driver: {driverName}
        </Text>
        <Text
          style={[
            styles.infoText,
            { color: theme.colors.primaryText },
            typography.bodyMedium,
          ]}
        >
          Estimated Arrival: {estimatedArrival}
        </Text>
        <Text
          style={[
            styles.infoText,
            { color: theme.colors.primaryText },
            typography.bodyMedium,
          ]}
        >
          From: {fromAddress}
        </Text>
        <Text
          style={[
            styles.infoText,
            { color: theme.colors.primaryText },
            typography.bodyMedium,
          ]}
        >
          To: {toAddress}
        </Text>
        <Text
          style={[
            styles.infoText,
            { color: theme.colors.primaryText },
            typography.bodyMedium,
          ]}
        >
          Car Type: {carType}
        </Text>
        <Text
          style={[
            styles.infoText,
            { color: theme.colors.primaryText },
            typography.bodyLarge,
          ]}
        >
          Estimated Price: ₱{estimatedPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  },
  driverMarker: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  driverMarkerText: {
    fontSize: 20,
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  infoText: {
    marginBottom: 10,
  },
});

export default DriverFound;
