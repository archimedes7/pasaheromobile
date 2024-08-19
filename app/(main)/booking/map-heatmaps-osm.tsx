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
import { WebView } from "react-native-webview";
import Modal from "react-native-modal";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { fetchAddress } from "@/services/apiServices";
import {
  generateHeatmapData,
  getDistance,
  calculateEstimatedPrice,
} from "@/utils/mapUtils";
import { CarOption } from "@/components/CarOption";
import { HeatmapView } from "@/components/HeatmapView";
import { CarType, LocationData } from "@/types";

const MapScreenHeatmapsOSM: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const params = useLocalSearchParams();
  const mapRef = useRef<WebView>(null);

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
  const [fromLocation, setFromLocation] = useState<Region | null>(null);
  const [toLocation, setToLocation] = useState<Region | null>(null);
  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [selectedCarType, setSelectedCarType] = useState<CarType | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLookingForDriver, setIsLookingForDriver] = useState<boolean>(false);
  const [driverLocations, setDriverLocations] = useState<LocationData[]>([]);
  const [trafficData, setTrafficData] = useState<LocationData[]>([]);

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

  useEffect(() => {
    if (currentLocation) {
      const initMapScript = `
        if (typeof L !== 'undefined') {
          var map = L.map('map').setView([${currentLocation.latitude}, ${currentLocation.longitude}], 13);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          var offlineLayer = L.tileLayer.offline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            subdomains: 'abc',
            minZoom: 13,
            maxZoom: 19,
            crossOrigin: true
          });
          offlineLayer.addTo(map);

          var control = L.control.savetiles(offlineLayer, {
            zoomlevels: [13, 14, 15, 16, 17],
            confirm: function(layer, successCallback) {
              successCallback();
            },
            confirmRemoval: function(layer, successCallback) {
              successCallback();
            },
            saveText: 'Save map',
            rmText: 'Remove tiles'
          });
          control.addTo(map);

          map.on('click', function(e) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'mapClick',
              lat: e.latlng.lat,
              lng: e.latlng.lng
            }));
          });

          window.map = map;
        }
      `;
      mapRef.current?.injectJavaScript(initMapScript);
    }
  }, [currentLocation]);

  const handleMapMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === "mapClick") {
      handleMapPress({
        nativeEvent: {
          coordinate: { latitude: data.lat, longitude: data.lng },
        },
      });
    }
  };

  const handleMapPress = useCallback(
    async (event) => {
      const coordinate = event.nativeEvent.coordinate;
      const address = await fetchAddress(coordinate);

      if (!fromLocation) {
        setFromLocation(coordinate);
        setFromAddress(address);
      } else if (!toLocation) {
        setToLocation(coordinate);
        setToAddress(address);
      }

      const addMarkerScript = `
      L.marker([${coordinate.latitude}, ${coordinate.longitude}])
        .addTo(map)
        .bindPopup('${!fromLocation ? "From" : "To"}: ${address}')
        .openPopup();
    `;
      mapRef.current?.injectJavaScript(addMarkerScript);
    },
    [fromLocation, toLocation]
  );

  const handleSelectCarType = useCallback(
    (carType: CarType) => {
      setSelectedCarType(carType);
      if (fromLocation && toLocation) {
        const price = calculateEstimatedPrice(
          fromLocation,
          toLocation,
          carType
        );
        setEstimatedPrice(price);
      }
    },
    [fromLocation, toLocation]
  );

  const handleBookRide = useCallback(() => {
    if (fromLocation && toLocation && selectedCarType) {
      const finalPrice = estimatedPrice
        ? estimatedPrice * selectedCarType.price
        : 0;
      setIsLookingForDriver(true);
      setTimeout(() => {
        setIsLookingForDriver(false);
        router.push({
          pathname: "/booking/driver-found",
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

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.primaryBackground }]}
    >
      <View style={styles.mapContainer}>
        <WebView
          ref={mapRef}
          style={styles.map}
          source={{
            html: `
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <script src="https://unpkg.com/leaflet.offline@2.0.0/dist/leaflet.offline.min.js"></script>
                <style>body, html, #map { height: 100%; margin: 0; padding: 0; }</style>
              </head>
              <body><div id="map"></div></body>
            </html>
          `,
          }}
          onMessage={handleMapMessage}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { borderColor: colors.primary }]}
          placeholder="From"
          value={fromAddress}
          onChangeText={setFromAddress}
        />
        <TextInput
          style={[styles.input, { borderColor: colors.primary }]}
          placeholder="To"
          value={toAddress}
          onChangeText={setToAddress}
        />
      </View>

      {fromLocation && toLocation && (
        <View style={styles.carSelectionContainer}>
          <Text style={[styles.carOptionsTitle, { color: colors.primaryText }]}>
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
          <Text style={[styles.buttonText, { color: colors.primaryBtnText }]}>
            Book {selectedCarType.name} - ₱
            {((estimatedPrice || 0) * selectedCarType.price).toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}

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
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  mapContainer: { height: 300, marginBottom: 20 },
  map: { flex: 1 },
  inputContainer: { padding: 20 },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  carSelectionContainer: { padding: 20 },
  carOptionsTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  carOptionsScrollView: { flexGrow: 0 },
  button: { margin: 20, padding: 10, borderRadius: 5, alignItems: "center" },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  modalContent: { padding: 20, borderRadius: 10, alignItems: "center" },
  modalText: { marginTop: 10, fontSize: 18 },
});

export default MapScreenHeatmapsOSM;
