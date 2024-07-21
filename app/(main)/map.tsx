import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const regions = {
  // ... your regions object ...
};

const MapScreen = () => {
  console.log("MapScreen rendered"); // Debug log
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("Route params:", params); // Debug log
    const region = params?.region;
    if (region && regions[region]) {
      console.log("Setting selected region:", regions[region]); // Debug log
      setSelectedRegion(regions[region]);
    } else {
      console.log("Setting default region: Metro Manila"); // Debug log
      setSelectedRegion(regions["Metro Manila"]);
    }
  }, [params]);

  useEffect(() => {
    (async () => {
      console.log("Requesting location permission"); // Debug log
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location permission status:", status); // Debug log
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      console.log("Getting current position"); // Debug log
      let location = await Location.getCurrentPositionAsync({});
      console.log("Current location:", location); // Debug log
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setFromLocation("Current Location");
    }
  };

  const handleBookRide = () => {
    if (fromLocation && toLocation) {
      alert(`Ride booked from ${fromLocation} to ${toLocation}`);
      router.push("/temp-home");
    } else {
      alert("Please enter both pickup and drop-off locations");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <Text
        style={[
          styles.title,
          { color: colors.primaryText, fontSize: 24, fontWeight: "bold" },
        ]}
      >
        {params?.region || "Default"} Map
      </Text>
      {selectedRegion && (
        <MapView
          style={styles.map}
          initialRegion={selectedRegion}
          onMapReady={() => console.log("Map is ready")} // Debug log
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
      )}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { borderColor: colors.primary }]}
            placeholder="Pickup Location"
            value={fromLocation}
            onChangeText={setFromLocation}
          />
          <TouchableOpacity
            onPress={handleUseCurrentLocation}
            style={styles.locationButton}
          >
            <Ionicons name="location" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, { borderColor: colors.primary }]}
          placeholder="Drop-off Location"
          value={toLocation}
          onChangeText={setToLocation}
        />
        <TouchableOpacity
          onPress={handleBookRide}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
            Book Ride
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginVertical: 20,
  },
  map: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.4,
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  locationButton: {
    padding: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MapScreen;
