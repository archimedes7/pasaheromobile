import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Modal from "react-native-modal";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { fetchAddress, scheduleNotification } from "@/services/apiServices";
import {
  generateHeatmapData,
  getDistance,
  calculateEstimatedPrice,
} from "@/utils/mapUtils";
import { CarOption } from "@/components/CarOption";
import { HeatmapView } from "@/components/HeatmapView";
import { CarType, LocationData } from "@/types";
import axios from "axios";

const regions: Record<string, Region> = {
  "Metro Manila": {
    latitude: 14.5995,
    longitude: 120.9842,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  // ... other regions
};

const handleSavedPlaceSelect = (place: SavedPlace) => {
  setToAddress(place.address);
  setToLocation(place.coordinates);
  setIsSearchingDropoff(false);
  setDropoffSuggestions([]);

  // Update the map view to show the selected location
  if (mapViewRef.current) {
    mapViewRef.current.animateToRegion(
      {
        ...place.coordinates,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    ); // Animate for 1 second
  }
};

const handleRecentTripSelect = (trip: RecentTrip) => {
  setToAddress(trip.address);
  setToLocation(trip.coordinates);
  setIsSearchingDropoff(false);
  setDropoffSuggestions([]);

  // Update the map view to show the selected location
  if (mapViewRef.current) {
    mapViewRef.current.animateToRegion(
      {
        ...trip.coordinates,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    ); // Animate for 1 second
  }
};

const carTypes: CarType[] = [
  {
    id: 1,
    name: "Standard",
    price: 1,
    icon: "car-side",
    capacity: "4",
    description: "Affordable, everyday rides",
  },
  {
    id: 2,
    name: "Premium",
    price: 1.5,
    icon: "car-sports",
    capacity: "4",
    description: "High-end cars with top-rated drivers",
  },
  {
    id: 3,
    name: "SUV",
    price: 2,
    icon: "car-estate",
    capacity: "6",
    description: "Extra space, perfect for groups",
  },
  {
    id: 4,
    name: "Van",
    price: 2.5,
    icon: "bus",
    capacity: "6-10",
    description: "Extra space, perfect for groups",
  },
  // ... other car types
];
console.log("Regions and car types defined:", { regions, carTypes });

const MapScreenHeatmaps: React.FC = () => {
  console.log("MapScreenHeatmaps component rendered");

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const params = useLocalSearchParams();
  const mapViewRef = useRef<MapView>(null);

  console.log("Initial Params:", params);

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
  const [fromLocation, setFromLocation] = useState<Region | null>(null);
  const [toLocation, setToLocation] = useState<Region | null>(null);
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [settingPickup, setSettingPickup] = useState<boolean>(true);
  const [selectedCarType, setSelectedCarType] = useState<CarType | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLookingForDriver, setIsLookingForDriver] = useState<boolean>(false);
  const [driverLocations, setDriverLocations] = useState<LocationData[]>([]);
  const [trafficData, setTrafficData] = useState<LocationData[]>([]);

  const [isSearchingPickup, setIsSearchingPickup] = useState(false);
  const [isSearchingDropoff, setIsSearchingDropoff] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);
  const [isSettingPickupPin, setIsSettingPickupPin] = useState(false);
  const [isSettingDropoffPin, setIsSettingDropoffPin] = useState(false);

  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([
    {
      id: "1",
      name: "Home",
      icon: "home",
      address: "123 Home Street, Hometown, ST 12345",
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    {
      id: "2",
      name: "Work",
      icon: "briefcase",
      address: "456 Work Avenue, Worktown, ST 67890",
      coordinates: { latitude: 40.7484, longitude: -73.9857 },
    },
    {
      id: "3",
      name: "Park",
      icon: "leaf",
      address: "789 Park Road, Parkville, ST 13579",
      coordinates: { latitude: 40.7829, longitude: -73.9654 },
    },
    {
      id: "4",
      name: "Vet",
      icon: "paw",
      address: "321 Vet Lane, Pettown, ST 24680",
      coordinates: { latitude: 40.7306, longitude: -73.9352 },
    },
  ]);

  const [recentTrips, setRecentTrips] = useState<RecentTrip[]>([
    {
      id: "1",
      address: "415 Mueller Brook, Luellwitzmouth, NV 06328",
      name: "Home",
      coordinates: { latitude: 36.1699, longitude: -115.1398 },
    },
    {
      id: "2",
      address: "641 Marcelino Mountain, Rueckermouth, NV 06278",
      name: "Marcelino Mountain",
      coordinates: { latitude: 36.1215, longitude: -115.1739 },
    },
  ]);

  useEffect(() => {
    const region = params?.region as string;
    console.log("Setting initial region:", region);
    if (region && regions[region]) {
      setSelectedRegion(regions[region]);
    } else {
      setSelectedRegion(regions["Metro Manila"]);
    }
  }, [params]);

  useEffect(() => {
    (async () => {
      console.log("Requesting location permissions");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        Alert.alert("Permission to access location was denied");
        return;
      }

      console.log("Getting current position");
      let location = await Location.getCurrentPositionAsync({});
      console.log("Current location:", location);
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();

    console.log("Fetching mock driver and traffic data");
    fetchDriverLocations();
    fetchTrafficData();
  }, []);

  const fetchDriverLocations = () => {
    // Simulated API call
    const mockDrivers: LocationData[] = [
      { latitude: 14.5995, longitude: 120.9842, weight: 1 },
      { latitude: 14.601, longitude: 120.986, weight: 1 },
      { latitude: 14.598, longitude: 120.983, weight: 1 },
    ];
    console.log("Mock driver locations:", mockDrivers);
    setDriverLocations(mockDrivers);
  };

  const fetchTrafficData = () => {
    // Simulated API call
    const mockTraffic: LocationData[] = [
      { latitude: 14.599, longitude: 120.9845, weight: 0.7 },
      { latitude: 14.6, longitude: 120.985, weight: 0.9 },
      { latitude: 14.5985, longitude: 120.9835, weight: 0.5 },
    ];
    console.log("Mock traffic data:", mockTraffic);
    setTrafficData(mockTraffic);
  };

  const searchLocation = async (query: string, isPickup: boolean) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const suggestions = response.data.slice(0, 5); // Limit to 5 suggestions
      if (isPickup) {
        setPickupSuggestions(suggestions);
      } else {
        setDropoffSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error searching for location:", error);
      Alert.alert("Error", "Failed to search for location");
    }
  };

  const handleLocationSelect = (location: any, isPickup: boolean) => {
    const selectedLocation = {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    if (isPickup) {
      setFromLocation(selectedLocation);
      setFromAddress(location.display_name);
      setIsSearchingPickup(false);
      setPickupSuggestions([]);
    } else {
      setToLocation(selectedLocation);
      setToAddress(location.display_name);
      setIsSearchingDropoff(false);
      setDropoffSuggestions([]);
    }
  };

  const handleMapPress = useCallback(
    async (event: any) => {
      const coordinate = event.nativeEvent.coordinate;
      const address = await fetchAddress(coordinate);

      if (isSettingPickupPin) {
        setFromLocation(coordinate);
        setFromAddress(address);
        setIsSettingPickupPin(false);
      } else if (isSettingDropoffPin) {
        setToLocation(coordinate);
        setToAddress(address);
        setIsSettingDropoffPin(false);
      }
    },
    [isSettingPickupPin, isSettingDropoffPin]
  );

  const togglePinMode = (isPickup: boolean) => {
    if (isPickup) {
      setIsSettingPickupPin(!isSettingPickupPin);
      setIsSettingDropoffPin(false);
    } else {
      setIsSettingDropoffPin(!isSettingDropoffPin);
      setIsSettingPickupPin(false);
    }
  };

  const handleGetCurrentLocation = useCallback(async () => {
    console.log("Getting current location");
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Current location:", location);
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setCurrentLocation(currentLocation);
      setFromLocation(currentLocation);
      const address = await fetchAddress(currentLocation);
      console.log("Fetched address for current location:", address);
      setFromAddress(address);
    } catch (error) {
      console.error("Error getting current location:", error);
      Alert.alert("Error", "Unable to get current location");
    }
  }, []);

  const handleSelectCarType = useCallback(
    (carType: CarType) => {
      console.log("Selected car type:", carType);
      setSelectedCarType(carType);
      if (fromLocation && toLocation) {
        const price = calculateEstimatedPrice(
          fromLocation,
          toLocation,
          carType
        );
        console.log("Calculated estimated price:", price);
        setEstimatedPrice(price);
      }
    },
    [fromLocation, toLocation]
  );

  const handleBookRide = useCallback(async () => {
    console.log("Booking ride");
    if (fromLocation && toLocation && selectedCarType) {
      const finalPrice = estimatedPrice
        ? estimatedPrice * selectedCarType.price
        : 0;
      console.log("Final price:", finalPrice);
      await scheduleNotification(
        fromAddress,
        toAddress,
        selectedCarType.name,
        finalPrice
      );
      setIsLookingForDriver(true);
      setTimeout(() => {
        setIsLookingForDriver(false);
        console.log("Navigating to driver-found screen");
        router.push({
          pathname: "booking/driver-found",
          params: {
            driverName: "John Doe",
            estimatedArrival: "5 minutes",
            fromAddress,
            toAddress,
            carType: selectedCarType.name,
            estimatedPrice: finalPrice,
          },
        });
      }, 5000);
    } else {
      console.log("Incomplete booking information");
      Alert.alert(
        "Please enter both pickup and drop-off locations and select a car type"
      );
    }
  }, [
    fromLocation,
    toLocation,
    selectedCarType,
    estimatedPrice,
    fromAddress,
    toAddress,
    router,
  ]);

  console.log("Current state:", {
    selectedRegion,
    currentLocation,
    fromLocation,
    toLocation,
    fromAddress,
    toAddress,
    settingPickup,
    selectedCarType,
    estimatedPrice,
    isLookingForDriver,
    driverLocations,
    trafficData,
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.primaryBackground }]}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find HEROES nearby</Text>
        <View style={styles.currentLocationContainer}>
          <Text style={styles.currentLocationLabel}>You're currently in:</Text>
          <View style={styles.currentLocationBox}>
            <Text style={styles.currentLocationText}>
              {fromAddress || "Zitan"}
            </Text>
            <TouchableOpacity onPress={handleGetCurrentLocation}>
              <Ionicons name="map-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.primaryBackground },
        ]}
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
            onPress={handleMapPress}
          >
            {currentLocation && (
              <Marker coordinate={currentLocation} title="Your Location" />
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
              value={fromAddress}
              onChangeText={(text) => {
                setFromAddress(text);
                searchLocation(text, true);
                setIsSearchingPickup(true);
              }}
              placeholderTextColor={colors.secondaryText}
            />
            <TouchableOpacity
              onPress={() => togglePinMode(true)}
              style={styles.pinButton}
            >
              <Ionicons
                name={isSettingPickupPin ? "location" : "location-outline"}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGetCurrentLocation}
              style={styles.locationButton}
            >
              <Ionicons name="navigate" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {isSearchingPickup && pickupSuggestions.length > 0 && (
            <ScrollView style={styles.suggestionsContainer}>
              {pickupSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => handleLocationSelect(suggestion, true)}
                >
                  <Text style={{ color: colors.primaryText }}>
                    {suggestion.display_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { borderColor: colors.primary }]}
              placeholder="Where are you headed?"
              value={toAddress}
              onChangeText={(text) => {
                setToAddress(text);
                searchLocation(text, false);
                setIsSearchingDropoff(true);
              }}
              placeholderTextColor={colors.secondaryText}
            />
            <TouchableOpacity
              onPress={() => togglePinMode(false)}
              style={styles.pinButton}
            >
              <Ionicons
                name={isSettingDropoffPin ? "location" : "location-outline"}
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          {isSearchingDropoff && dropoffSuggestions.length > 0 && (
            <ScrollView style={styles.suggestionsContainer}>
              {dropoffSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => handleLocationSelect(suggestion, false)}
                >
                  <Text style={{ color: colors.primaryText }}>
                    {suggestion.display_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {fromLocation && toLocation && (
            <View style={styles.carSelectionContainer}>
              <Text
                style={[styles.carOptionsTitle, { color: colors.primaryText }]}
              >
                Select a ride
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.carOptionsScrollView}
              >
                {carTypes.map((carType) => (
                  <CarOption
                    key={carType.id}
                    carType={carType}
                    isSelected={selectedCarType?.id === carType.id}
                    onSelect={() => handleSelectCarType(carType)}
                    colors={colors}
                  />
                ))}
              </ScrollView>
            </View>
          )}
          {selectedCarType && (
            <TouchableOpacity
              onPress={handleBookRide}
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              <Text
                style={[styles.buttonText, { color: colors.primaryBtnText }]}
              >
                Book {selectedCarType.name} - ₱
                {((estimatedPrice || 0) * selectedCarType.price).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.savedPlacesContainer}>
            <Text style={styles.sectionTitle}>Saved Places</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {savedPlaces.map((place) => (
                <TouchableOpacity
                  key={place.id}
                  style={styles.savedPlaceItem}
                  onPress={() => handleSavedPlaceSelect(place)}
                >
                  <View style={styles.savedPlaceIconContainer}>
                    <Ionicons
                      name={place.icon}
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.savedPlaceText}>{place.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.recentTripsContainer}>
            <Text style={styles.sectionTitle}>Your recent trips</Text>
            {recentTrips.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={styles.recentTripItem}
                onPress={() => handleRecentTripSelect(trip)}
              >
                <View style={styles.recentTripIconContainer}>
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.recentTripTextContainer}>
                  <Text style={styles.recentTripAddress}>{trip.address}</Text>
                  <Text style={styles.recentTripName}>{trip.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <Modal isVisible={isLookingForDriver}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colors.primaryBackground },
          ]}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.modalText, { color: colors.primaryText }]}>
            Looking for a driver...
          </Text>
          <HeatmapView
            title="Driver Density Heatmap"
            data={generateHeatmapData(driverLocations)}
            color={(opacity = 1) => `rgba(255, 0, 0, ${opacity})`}
            colors={colors}
          />
          <HeatmapView
            title="Traffic Intensity Heatmap"
            data={generateHeatmapData(trafficData)}
            color={(opacity = 1) => `rgba(0, 255, 0, ${opacity})`}
            colors={colors}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  scrollViewContent: { flexGrow: 1 },
  container: { flex: 1, alignItems: "center" },
  title: { marginVertical: 20 },
  map: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.4,
    marginBottom: 20,
  },
  inputContainer: { width: "90%" },
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
  locationButton: { padding: 10 },
  carSelectionContainer: { marginTop: 20, marginBottom: 20, width: "100%" },
  carOptionsTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  carOptionsScrollView: { flexGrow: 0 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
  modalContent: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  suggestionsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pinButton: {
    padding: 10,
  },
  header: {
    backgroundColor: "#2A9D8F",
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  currentLocationContainer: {
    marginBottom: 10,
  },
  currentLocationLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  currentLocationBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 10,
  },
  currentLocationText: {
    color: "white",
    flex: 1,
  },
  savedPlacesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  savedPlaceItem: {
    alignItems: "center",
    marginRight: 20,
  },
  savedPlaceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  savedPlaceText: {
    fontSize: 12,
  },
  recentTripsContainer: {
    marginTop: 20,
  },
  recentTripItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  recentTripIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  recentTripTextContainer: {
    flex: 1,
  },
  recentTripAddress: {
    fontSize: 14,
    fontWeight: "500",
  },
  recentTripName: {
    fontSize: 12,
    color: "#666",
  },
});

export default MapScreenHeatmaps;
