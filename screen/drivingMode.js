import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { styles as myStyle } from "../styles/myStyle";

import BottomNavBar from "../components/BottomNavBar";
import HeaderBar from "../components/HeaderBar";

/* ===== MODE THEME ===== */
const MODE_THEME = {
  ECO: {
    color: "#35E1A1",
    title: "ECO",
    desc: "Eco Mode • ประหยัดพลังงาน • จำกัดความเร็ว • เน้น DTE",
  },
  MANUAL: {
    color: "#FF3B30",
    title: "MANUAL",
    desc: "Manual Mode • ควบคุมเอง • ตอบสนองตรงมือ",
  },
};

export default function DrivingMode({ navigation }) {
  const [mode, setMode] = useState("ECO");
  const [holding, setHolding] = useState(false);
  const holdTimer = useRef(null);

  const theme = MODE_THEME[mode];

  /* ===== HOLD LOGIC ===== */
  const handlePressIn = () => {
    setHolding(true);
    holdTimer.current = setTimeout(() => {
      setMode((prev) => (prev === "ECO" ? "MANUAL" : "ECO"));
      setHolding(false);
    }, 1000);
  };

  const handlePressOut = () => {
    setHolding(false);
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  return (
    <View style={myStyle.container}>
      {/* ===== HEADER BAR ===== */}
      <HeaderBar title="Driving Mode" subtitle="Tap the button to toggle" />

      {/* ===== SWITCH BUTTON ===== */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[local.glow, { shadowColor: theme.color }]}
      >
        <View style={[local.ring, { borderColor: theme.color }]}>
          <Image
            source={require("../assets/Eco.png")}
            style={[local.icon, { tintColor: theme.color }]}
            resizeMode="contain"
          />
        </View>

        <Text style={local.tapText}>
          {holding ? "HOLDING..." : "TAP TO SWITCH"}
        </Text>
      </Pressable>

      {/* ===== MODE INFO ===== */}
      <View style={local.infoWrap}>
        <Text style={local.modeTitle}>
          โหมดปัจจุบัน: {theme.title === "ECO" ? "ประหยัดพลังงาน" : "ควบคุมเอง"}
        </Text>
        <Text style={local.modeDesc}>{theme.desc}</Text>
      </View>

      {/* ===== MOCK INFO ===== */}
      <View style={local.mockBox}>
        <Text style={local.mockText}>Haptic: vibrate on tap</Text>
      </View>

      {/* ===== BOTTOM NAVBAR ===== */}
      <BottomNavBar active="Eco" navigation={navigation} />
    </View>
  );
}

/* ===== LOCAL STYLES ===== */
const local = StyleSheet.create({
  glow: {
    alignSelf: "center",
    marginTop: 40,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 40,
  },
  ring: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0F1A",
  },

  icon: {
    width: 140,
    height: 140,
    opacity: 0.95,
  },

  tapText: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    color: "#E6ECFF",
    fontWeight: "600",
    letterSpacing: 1,
  },

  infoWrap: {
    marginTop: 40,
    alignItems: "center",
  },
  modeTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  modeDesc: {
    marginTop: 8,
    color: "#8A94B8",
    fontSize: 14,
    textAlign: "center",
  },

  mockBox: {
    marginTop: 30,
    backgroundColor: "#10182A",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: "center",
  },
  mockText: {
    color: "#8A94B8",
    fontSize: 13,
  },

  apiText: {
    marginTop: 20,
    color: "#6C7A99",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 120,
  },
});
