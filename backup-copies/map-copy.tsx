import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import Modal from "react-native-modal";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import * as Notifications from "expo-notifications";
import { useTheme } from "../../../styles/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const generateHeatmapData = (locations) => {
  return locations.map((loc) => ({
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
    count: Math.floor(loc.weight * 10),
  }));
};

const regions = {
  "Central Luzon": {
    latitude: 15.4827,
    longitude: 120.712,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  },
  CALABARZON: {
    latitude: 14.1008,
    longitude: 121.0794,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  },
  "Metro Manila": {
    latitude: 14.5995,
    longitude: 120.9842,
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
  Batangas: {
    latitude: 13.7565,
    longitude: 121.0583,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  Tagaytay: {
    latitude: 14.1153,
    longitude: 120.9621,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const carTypes = [
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
];

const MapScreen = ({ route, navigation }) => {
  const { theme, typography } = useTheme();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [settingPickup, setSettingPickup] = useState(true);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [showCarOptions, setShowCarOptions] = useState(false);
  const [isLookingForDriver, setIsLookingForDriver] = useState(false);

  //
  const [driverLocations, setDriverLocations] = useState([]);
  const [trafficData, setTrafficData] = useState([]);

  const fetchDriverLocations = () => {
    // This is mock data. In a real app, this would be an API call
    const mockDrivers = [
      { latitude: 14.5995, longitude: 120.9842, weight: 1 },
      { latitude: 14.601, longitude: 120.986, weight: 1 },
      { latitude: 14.598, longitude: 120.983, weight: 1 },
      // Add more mock driver locations as needed
    ];
    setDriverLocations(mockDrivers);
  };

  const fetchTrafficData = () => {
    // This is mock data. In a real app, this would be an API call
    const mockTraffic = [
      { latitude: 14.599, longitude: 120.9845, weight: 0.7 },
      { latitude: 14.6, longitude: 120.985, weight: 0.9 },
      { latitude: 14.5985, longitude: 120.9835, weight: 0.5 },
      // Add more mock traffic data as needed
    ];
    setTrafficData(mockTraffic);
  };

  const getDistance = (from, to) => {
    // This is a simple distance calculation, you might want to use a more accurate method
    const R = 6371; // Radius of the Earth in km
    const dLat = (to.latitude - from.latitude) * (Math.PI / 180);
    const dLon = (to.longitude - from.longitude) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(from.latitude * (Math.PI / 180)) *
        Math.cos(to.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const calculateEstimatedPrice = (carType) => {
    if (fromLocation && toLocation) {
      const distance = getDistance(fromLocation, toLocation);
      const basePrice = 50; // Base price in your currency
      const pricePerKm = carType.price * 10; // Price per km based on car type
      return basePrice + distance * pricePerKm;
    }
    return null;
  };

  useEffect(() => {
    const region = route.params?.region;
    if (region && regions[region]) {
      setSelectedRegion(regions[region]);
    } else {
      setSelectedRegion(regions["Metro Manila"]);
    }
  }, [route.params]);

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

    // Request notification permissions
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to send notifications was denied");
      }
    })();
  }, []);

  const handleGetCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setFromLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // Instead of fetching the address, just set the coordinates as the address
      setFromAddress(
        `Lat: ${location.coords.latitude.toFixed(
          6
        )}, Lon: ${location.coords.longitude.toFixed(6)}`
      );

      // Optionally, you can still try to fetch the address
      // const address = await getAddressFromCoordinates({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude
      // });
      // setFromAddress(address);
    } catch (error) {
      console.error("Error getting current location:", error);
      Alert.alert("Error", "Unable to get current location");
    }
  };

  const handleMapPress = async (event) => {
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

  const getAddressFromCoordinates = async (coordinates) => {
    const { latitude, longitude } = coordinates;
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      console.log("Requesting URL:", url); // Debug log
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "YourAppName/1.0", // Replace with your app name
        },
      });
      if (response.data.address) {
        return response.data.display_name;
      } else {
        return "Address not found";
      }
    } catch (error) {
      console.error(
        "Error fetching address:",
        error.response ? error.response.data : error.message
      );
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

  // In MapScreen.js
  const handleBookRide = async () => {
    if (fromLocation && toLocation && selectedCarType) {
      const finalPrice = estimatedPrice * selectedCarType.price;
      await scheduleNotification(
        fromAddress,
        toAddress,
        selectedCarType.name,
        finalPrice
      );
      setIsLookingForDriver(true);
      // Simulate finding a driver after 5 seconds
      setTimeout(() => {
        setIsLookingForDriver(false);
        navigation.navigate("DriverFound", {
          driverName: "John Doe", // Replace with actual driver info
          estimatedArrival: "5 minutes",
          fromAddress,
          toAddress,
          carType: selectedCarType.name,
          estimatedPrice: finalPrice,
        });
      }, 5000);
    } else {
      Alert.alert(
        "Please enter both pickup and drop-off locations and select a car type"
      );
    }
  };

  const scheduleNotification = async (from, to, carType, price) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Ride Booked!",
        body: `Your ${carType} ride from ${from} to ${to} has been booked. Estimated price: ₱${price.toFixed(
          2
        )}`,
        data: { from, to, carType, price },
      },
      trigger: { seconds: 1 },
    });
  };

  const handleSelectCarType = (carType) => {
    setSelectedCarType(carType);
    const price = calculateEstimatedPrice(carType);
    setEstimatedPrice(price);
  };

  const renderCarOption = (carType) => (
    <TouchableOpacity
      key={carType.id}
      style={[
        styles.carOption,
        selectedCarType?.id === carType.id && styles.selectedCarOption,
      ]}
      onPress={() => handleSelectCarType(carType)}
    >
      <MaterialCommunityIcons
        name={carType.icon}
        size={40}
        color={
          selectedCarType?.id === carType.id
            ? theme.colors.primary
            : theme.colors.primaryText
        }
      />
      <Text style={[styles.carOptionName, { color: theme.colors.primaryText }]}>
        {carType.name}
      </Text>
      <Text
        style={[
          styles.carOptionCapacity,
          { color: theme.colors.secondaryText },
        ]}
      >
        <Ionicons name="person" size={14} /> {carType.capacity}
      </Text>
      <Text
        style={[
          styles.carOptionDescription,
          { color: theme.colors.secondaryText },
        ]}
      >
        {carType.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView
        style={[
          styles.scrollView,
          { backgroundColor: theme.colors.primaryBackground },
        ]}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.primaryBackground },
          ]}
        >
          <Text
            style={[
              styles.title,
              typography.headlineMedium,
              { color: theme.colors.primaryText },
            ]}
          >
            {route.params?.region || "Default"} Map
          </Text>
          {selectedRegion && (
            <MapView
              style={styles.map}
              initialRegion={selectedRegion}
              onMapReady={() => console.log("Map is ready")} // Debug log
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
                style={[styles.input, { borderColor: theme.colors.primary }]}
                placeholder="Pickup Location"
                value={fromAddress}
                onChangeText={setFromAddress}
              />
              <TouchableOpacity
                onPress={handleGetCurrentLocation}
                style={styles.locationButton}
              >
                <Ionicons
                  name="location"
                  size={24}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { borderColor: theme.colors.primary }]}
                placeholder="Drop-off Location"
                value={toAddress}
                onChangeText={setToAddress}
              />
            </View>
            {fromLocation && toLocation && (
              <View style={styles.carSelectionContainer}>
                <Text
                  style={[
                    styles.carOptionsTitle,
                    { color: theme.colors.primaryText },
                  ]}
                >
                  Select a ride
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.carOptionsScrollView}
                >
                  {carTypes.map((carType) => (
                    <TouchableOpacity
                      key={carType.id}
                      style={[
                        styles.carOption,
                        selectedCarType?.id === carType.id &&
                          styles.selectedCarOption,
                      ]}
                      onPress={() => handleSelectCarType(carType)}
                    >
                      <MaterialCommunityIcons
                        name={carType.icon}
                        size={40}
                        color={
                          selectedCarType?.id === carType.id
                            ? theme.colors.primary
                            : theme.colors.primaryText
                        }
                      />
                      <Text
                        style={[
                          styles.carOptionName,
                          { color: theme.colors.primaryText },
                        ]}
                      >
                        {carType.name}
                      </Text>
                      <Text
                        style={[
                          styles.carOptionCapacity,
                          { color: theme.colors.secondaryText },
                        ]}
                      >
                        <Ionicons name="person" size={14} /> {carType.capacity}
                      </Text>
                      <Text
                        style={[
                          styles.carOptionPrice,
                          { color: theme.colors.primary },
                        ]}
                      >
                        ₱{(estimatedPrice * carType.price).toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            {selectedCarType && (
              <TouchableOpacity
                onPress={handleBookRide}
                style={[
                  styles.button,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text
                  style={[
                    typography.labelLarge,
                    styles.buttonText,
                    { color: theme.colors.primaryBtnText },
                  ]}
                >
                  Book {selectedCarType.name} - ₱
                  {(estimatedPrice * selectedCarType.price).toFixed(2)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <Modal isVisible={isLookingForDriver}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            style={[
              styles.modalText,
              { color: theme.colors.primaryText },
              typography.headlineSmall,
            ]}
          >
            Looking for a driver...
          </Text>
          <View style={styles.heatmapContainer}>
            <Text style={styles.heatmapTitle}>Driver Density Heatmap</Text>
            <ContributionGraph
              values={generateHeatmapData(driverLocations)}
              endDate={new Date()}
              numDays={30}
              width={Dimensions.get("window").width - 40}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>

          <View style={styles.heatmapContainer}>
            <Text style={styles.heatmapTitle}>Traffic Intensity Heatmap</Text>
            <ContributionGraph
              values={generateHeatmapData(trafficData)}
              endDate={new Date()}
              numDays={30}
              width={Dimensions.get("window").width - 40}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
        </View>
      </Modal>
    </>
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
  carSelectionContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  carOptionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carOptionsScrollView: {
    flexGrow: 0,
  },
  carOption: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    width: 120,
    height: 160,
  },
  selectedCarOption: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderColor: "#007f8A",
  },
  carOptionName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  carOptionCapacity: {
    fontSize: 14,
    marginTop: 5,
  },
  carOptionPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
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
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalText: {
    marginTop: 20,
    textAlign: "center",
  },
  heatmapContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  heatmapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MapScreen;
