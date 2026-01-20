import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import HeaderBar from "../components/HeaderBar";
import MiniCard from "../components/MiniCard";

/* ================= UTILS ================= */
const toRad = (v) => (v * Math.PI) / 180;

const calcDistance = (a, b) => {
  const R = 6371; // km
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
};

/* ================= DARK MAP STYLE ================= */
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0B1220" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8FA2C9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0B1220" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#141E30" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8FA2C9" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#060B16" }],
  },
];

/* ================= SCREEN ================= */
export default function GPSTracking({ navigation }) {
  const mapRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(0);
  const [history, setHistory] = useState([]);

  /* ================= PERMISSION ================= */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("GPS permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();

    loadHistory();
  }, []);

  /* ================= TRACKING ================= */
  useEffect(() => {
    let subscription;

    if (tracking) {
      subscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
          timeInterval: 3000,
        },
        (loc) => {
          const point = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };

          setRoute((prev) => {
            if (prev.length > 0) {
              setDistance(
                (d) => d + calcDistance(prev[prev.length - 1], point),
              );
            }
            return [...prev, point];
          });

          setLocation(loc.coords);
        },
      );
    }

    return () => {
      if (subscription) subscription.then((s) => s.remove());
    };
  }, [tracking]);

  /* ================= STORAGE ================= */
  const loadHistory = async () => {
    const data = await AsyncStorage.getItem("tripHistory");
    if (data) setHistory(JSON.parse(data));
  };

  const saveTrip = async () => {
    if (route.length < 2) return;

    const trip = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      distance: distance.toFixed(2),
      route,
    };

    const updated = [trip, ...history];
    setHistory(updated);
    await AsyncStorage.setItem("tripHistory", JSON.stringify(updated));

    setTracking(false);
    setRoute([]);
    setDistance(0);
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Loading GPS...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar
        title="GPS Tracking"
        subtitle="My bike location • Route history"
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* MAP */}
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={darkMapStyle}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} />

          {route.length > 1 && (
            <Polyline
              coordinates={route}
              strokeColor="#35E1A1"
              strokeWidth={4}
            />
          )}
        </MapView>

        {/* INFO */}
        <View style={styles.infoRow}>
          <MiniCard title="GPS Status" value="Online" />
          <MiniCard title="Distance" value={`${distance.toFixed(2)} km`} />
        </View>

        {/* CONTROLS */}
        <Card style={{ marginHorizontal: 16 }}>
          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: tracking ? "#FF3B30" : "#35E1A1" },
            ]}
            onPress={() => {
              if (tracking) saveTrip();
              else setTracking(true);
            }}
          >
            <Text style={styles.btnText}>
              {tracking ? "Stop & Save Trip" : "Start Tracking"}
            </Text>
          </TouchableOpacity>
        </Card>

        {/* HISTORY */}
        <Card style={{ marginHorizontal: 16 }}>
          <Text style={styles.sectionTitle}>Trip History</Text>

          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.tripItem}>
                <Text style={styles.tripText}>{item.date}</Text>
                <Text style={styles.tripKm}>{item.distance} km</Text>
              </View>
            )}
          />
        </Card>
      </ScrollView>

      <BottomNavBar active="Map" navigation={navigation} />
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B1220",
  },
  map: {
    height: 320,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  btn: {
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  tripItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1E2A44",
  },
  tripText: {
    color: "#9AA4BF",
  },
  tripKm: {
    color: "#35E1A1",
    fontWeight: "700",
  },
});
