import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  useColorScheme,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

const regions = {
  "Metro Manila": {
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  Tagaytay: {
    latitude: 14.1153,
    longitude: 120.9621,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
  Batangas: {
    latitude: 13.7565,
    longitude: 121.0583,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  Pampanga: {
    latitude: 15.0794,
    longitude: 120.62,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  Bulacan: {
    latitude: 14.7942,
    longitude: 120.88,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  "La Union": {
    latitude: 16.6159,
    longitude: 120.3209,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
};

const MapScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
  const [fromLocation, setFromLocation] = useState<Coordinate | null>(null);
  const [toLocation, setToLocation] = useState<Coordinate | null>(null);
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [settingPickup, setSettingPickup] = useState<boolean>(true);

  useEffect(() => {
    const region = params.region as string | undefined;
    if (region && regions[region]) {
      setSelectedRegion(regions[region]);
    } else {
      setSelectedRegion(regions["Metro Manila"]);
    }
  }, [params]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const handleMapPress = async (event: any) => {
    const coordinate = event.nativeEvent.coordinate;
    const address = await getAddressFromCoordinates(coordinate);
    if (settingPickup) {
      setFromLocation(coordinate);
      setFromAddress(address);
      setSettingPickup(false);
    } else {
      setToLocation(coordinate);
      setToAddress(address);
      setSettingPickup(true);
    }
  };

  const getAddressFromCoordinates = async (
    coordinates: Coordinate
  ): Promise<string> => {
    const { latitude, longitude } = coordinates;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      if (response.data.address) {
        return response.data.display_name;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not found";
    }
  };

  const handleUseCurrentLocation = async () => {
    if (currentLocation) {
      setFromLocation(currentLocation);
      const address = await getAddressFromCoordinates(currentLocation);
      setFromAddress(address);
    }
  };

  const handleBookRide = () => {
    if (fromLocation && toLocation) {
      Alert.alert(`Ride booked from ${fromAddress} to ${toAddress}`);
      router.push("/temp-home");
    } else {
      Alert.alert("Please enter both pickup and drop-off locations");
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
        {(params.region as string) || "Default"} Map
      </Text>
      {selectedRegion && (
        <MapView
          style={styles.map}
          initialRegion={selectedRegion}
          onMapReady={() => console.log("Map is ready")}
          onPress={handleMapPress}
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
          {fromLocation && (
            <Marker
              coordinate={fromLocation}
              title="Pickup Location"
              pinColor="green"
            />
          )}
          {toLocation && (
            <Marker
              coordinate={toLocation}
              title="Drop-off Location"
              pinColor="red"
            />
          )}
        </MapView>
      )}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { borderColor: colors.primary }]}
            placeholder="Pickup Location"
            placeholderTextColor={colors.secondaryText}
            value={fromAddress}
            onChangeText={setFromAddress}
          />
          <TouchableOpacity
            onPress={handleUseCurrentLocation}
            style={styles.locationButton}
          >
            <Ionicons name="location" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { borderColor: colors.primary }]}
            placeholder="Drop-off Location"
            placeholderTextColor={colors.secondaryText}
            value={toAddress}
            onChangeText={setToAddress}
          />
        </View>
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
