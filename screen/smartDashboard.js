import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/myStyle";

import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import CircleGauge from "../components/CircleGauge";
import HeaderBar from "../components/HeaderBar";
import MiniCard from "../components/MiniCard";

export default function SmartDashboard({ navigation }) {
  const speed = 32;
  const battery = 78;
  const distance = 45;
  const online = true;

  return (
    <View style={styles.container}>
      {/* ===== HEADER ===== */}
      <HeaderBar
        title="Smart Dashboard"
        subtitle="Real-time • AI DTE"
        showNotification
        notificationCount={2}
      />

      {/* ===== CONTENT ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160, // กันชน BottomNavBar
        }}
      >
        {/* ===== SPEED CARD ===== */}
        <Card>
          <CircleGauge
            value={speed}
            unit="km/h"
            label="Speedometer (digital)"
          />

          <View style={styles.row}>
            <MiniCard title="Battery" value={`${battery}%`} />
            <MiniCard
              title="Connection"
              value={online ? "Online" : "Offline"}
              status={online ? "success" : "danger"}
            />
          </View>
        </Card>

        {/* ===== DTE ===== */}
        <Card>
          <Text style={styles.sectionTitle}>AI DTE (Distance-to-Empty)</Text>

          <Text style={styles.bigText}>วิ่งได้อีก {distance} กม.</Text>

          <Text style={styles.desc}>
            Estimated by AI from battery + speed + driving behavior
          </Text>
        </Card>

        {/* ===== COLOR INFO ===== */}
        <Card>
          <Text style={styles.info}>
            Color cue:{" "}
            <Text style={{ color: "#4DB6FF", fontWeight: "600" }}>Blue</Text> =
            Normal •{" "}
            <Text style={{ color: "#FF9F0A", fontWeight: "600" }}>Orange</Text>{" "}
            = Low battery warning
          </Text>
        </Card>

        {/* ===== ECO BUTTON (ใต้ Color cue) ===== */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={local.ecoButton}
          onPress={() => navigation.navigate("DrivingMode")}
        >
          <Ionicons name="leaf" size={26} color="#05160F" />
          <Text style={local.ecoText}>Eco Mode</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ===== BOTTOM NAV ===== */}
      <BottomNavBar active="Dashboard" navigation={navigation} />
    </View>
  );
}

/* ===== LOCAL STYLES ===== */
const local = {
  ecoButton: {
    alignSelf: "center",
    marginTop: 24,
    width: 150,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#35E1A1",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    shadowColor: "#35E1A1",
    shadowOpacity: 0.6,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  ecoText: {
    color: "#05160F",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
};
