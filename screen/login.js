import { Ionicons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ScanCamera from "../components/ScanCamera";
import { myStyle } from "../style/myStyle";

export default function Login({ navigation }) {
  const [mode, setMode] = useState("login");
  const [scanned, setScanned] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (mode === "scan" && permission?.granted === false) {
      requestPermission();
    }
  }, [mode, permission]);

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;

    setScanned(true);
    console.log("Student ID:", data);

    // mock login (ยังไม่เชื่อม backend / firebase)
    navigation.replace("Dashboard");
  };

  /* ================= SCAN MODE ================= */
  if (mode === "scan") {
    if (!permission) {
      return (
        <View style={styles.permissionBox}>
          <Text style={styles.permissionText}>
            Loading camera permission...
          </Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={styles.permissionBox}>
          <Text style={styles.permissionText}>
            Camera permission is required
          </Text>

          <TouchableOpacity
            style={styles.permissionBtn}
            onPress={requestPermission}
          >
            <Text style={styles.permissionBtnText}>Grant Permission</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.permissionCancel}
            onPress={() => {
              setScanned(false);
              setMode("login");
            }}
          >
            <Text style={{ color: "#fff" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScanCamera
        scanned={scanned}
        onScanned={handleBarCodeScanned}
        onCancel={() => {
          setScanned(false);
          setMode("login");
        }}
      />
    );
  }

  /* ================= LOGIN MODE ================= */
  return (
    <ScrollView
      style={myStyle.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>WISHU</Text>
        <Text style={styles.logoSub}>EV-MotoIQ • Digital Key</Text>
      </View>

      {/* MAIN CARD */}
      <View style={styles.mainCard}>
        <View style={styles.cameraIcon}>
          <Ionicons name="camera" size={34} color="#35E1A1" />
        </View>

        <TouchableOpacity
          style={myStyle.buttonPrimary}
          onPress={() => {
            setScanned(false);
            setMode("scan");
          }}
        >
          <Text style={myStyle.buttonPrimaryText}>
            Scan Student ID to Start
          </Text>
        </TouchableOpacity>

        <Text style={styles.descText}>
          Tap to open camera and scan your student barcode
        </Text>
        <Text style={styles.descSub}>
          If authorized → unlock bike → go to Dashboard
        </Text>
      </View>

      {/* HOW IT WORKS */}
      <View style={styles.howCard}>
        <Text style={styles.howTitle}>How it works</Text>

        <View style={styles.stepItem}>
          <Text style={styles.stepText}>1) Scan Student ID</Text>
        </View>

        <View style={styles.stepItem}>
          <Text style={styles.stepText}>2) Verify access (database)</Text>
        </View>

        <View style={styles.stepItem}>
          <Text style={styles.stepText}>3) Unlock / Start → Dashboard</Text>
        </View>
      </View>

      <Text style={[styles.footerNote, { marginTop: 20 }]}>
        Note: Scanner is on the bike — app shows status & logs for complete
        system.
      </Text>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logoText: {
    fontSize: 50,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  logoSub: {
    marginTop: 6,
    fontSize: 16,
    color: "#9AA4BF",
  },
  mainCard: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#121C2E",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  cameraIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#0B1220",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  descText: {
    marginTop: 16,
    fontSize: 14,
    color: "#9AA4BF",
    textAlign: "center",
  },
  descSub: {
    marginTop: 6,
    fontSize: 13,
    color: "#6F7A99",
    textAlign: "center",
  },
  howCard: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "#121C2E",
    borderRadius: 20,
    padding: 20,
  },
  howTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 14,
  },
  stepItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#0B1220",
    marginBottom: 10,
  },
  stepText: {
    color: "#D6DBF5",
    fontSize: 16,
  },
  footerNote: {
    fontSize: 14,
    color: "#6F7A99",
    textAlign: "center",
    paddingHorizontal: 30,
  },

  /* permission */
  permissionBox: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
  },
  permissionBtn: {
    backgroundColor: "#35E1A1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  permissionBtnText: {
    fontWeight: "600",
  },
  permissionCancel: {
    marginTop: 20,
  },
});
