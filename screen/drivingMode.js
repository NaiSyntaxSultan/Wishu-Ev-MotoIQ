import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { myStyle } from "../styles/myStyle";

export default function DrivingMode() {
  const [mode, setMode] = useState("ECO"); // ECO | MANUAL
  const [holding, setHolding] = useState(false);

  const holdTimer = useRef(null);

  const isEco = mode === "ECO";

  /* ================= HOLD LOGIC ================= */
  const handlePressIn = () => {
    setHolding(true);

    holdTimer.current = setTimeout(() => {
      setMode((prev) => (prev === "ECO" ? "MANUAL" : "ECO"));
      setHolding(false);
    }, 3000);
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
      {/* HEADER */}
      <Text style={styles.title}>Driving Mode</Text>
      <Text style={styles.subtitle}>Press and hold 3 seconds to switch</Text>

      {/* HOLD BUTTON */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.outerGlow,
          { shadowColor: isEco ? "#35E1A1" : "#FF3B30" },
        ]}
      >
        <View
          style={[
            styles.outerRing,
            { borderColor: isEco ? "#35E1A1" : "#FF3B30" },
          ]}
        >
          <View
            style={[
              styles.innerCore,
              { backgroundColor: isEco ? "#35E1A1" : "#FF3B30" },
            ]}
          />
        </View>

        <Text style={styles.tapText}>
          {holding ? "HOLDING..." : "HOLD TO SWITCH"}
        </Text>
      </Pressable>

      {/* MODE INFO */}
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={styles.modeTitle}>
          โหมดปัจจุบัน: {isEco ? "ECO" : "MANUAL"}
        </Text>

        <Text style={styles.modeDesc}>
          {isEco
            ? "Eco Mode • ประหยัดพลังงาน • ควบคุมเสถียร"
            : "Manual Mode • ควบคุมเอง • ตอบสนองตรงมือ"}
        </Text>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
  },
  subtitle: {
    color: "#8A94B8",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 40,
  },

  outerGlow: {
    alignSelf: "center",
    marginTop: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 35,
  },
  outerRing: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B1220",
  },
  innerCore: {
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.95,
  },
  tapText: {
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    color: "#E6ECFF",
    fontWeight: "600",
    letterSpacing: 1,
  },

  modeTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  modeDesc: {
    marginTop: 8,
    color: "#8A94B8",
    fontSize: 14,
    textAlign: "center",
  },
});
