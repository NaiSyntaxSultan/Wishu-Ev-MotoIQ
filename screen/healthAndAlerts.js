import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import Card from "../components/Card";
import HeaderBar from "../components/HeaderBar";
import { styles as myStyle } from "../styles/myStyle";

/* ===== Mock Data ===== */
const STATUS_LIST = [
  {
    id: "motor",
    title: "Motor Temperature",
    value: "ปกติ • 54°C",
    status: "OK",
    color: "#35E1A1",
  },
  {
    id: "battery",
    title: "Battery Voltage",
    value: "ใกล้ต่ำ • 48.2V",
    status: "WARNING",
    color: "#F5C76A",
  },
  {
    id: "current",
    title: "Current Draw",
    value: "สูงผิดปกติ • 92A",
    status: "CRITICAL",
    color: "#FF6B6B",
  },
  {
    id: "gps",
    title: "GPS Status",
    value: "Fix • tracking enabled",
    status: "OK",
    color: "#35E1A1",
  },
];

const ALERT_LOG = [
  {
    id: "1",
    level: "CRITICAL",
    title: "กระแสสูงผิดปกติ",
    desc: "ตรวจพบเมื่อ 2 นาทีที่แล้ว",
    color: "#FF6B6B",
  },
  {
    id: "2",
    level: "WARNING",
    title: "แรงดันแบตใกล้ต่ำ",
    desc: "ตรวจพบเมื่อ 10 นาทีที่แล้ว",
    color: "#F5C76A",
  },
  {
    id: "3",
    level: "INFO",
    title: "พฤติกรรมขับขี่ปลอดภัย",
    desc: "ตรวจพบเมื่อ 1 ชม.ที่แล้ว",
    color: "#7C8DB5",
  },
];

export default function HealthAndAlerts({ navigation }) {
  return (
    <View style={myStyle.container}>
      <HeaderBar
        title="Health & Alerts"
        subtitle="Intelligent warning • vehicle health status"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ===== Status List ===== */}
        <Card>
          <View style={local.sectionHeader}>
            <Text style={local.sectionTitle}>Status List</Text>
            <Text style={local.sectionSub}>real-time</Text>
          </View>

          {STATUS_LIST.map((item) => (
            <View
              key={item.id}
              style={[local.statusCard, { borderColor: item.color }]}
            >
              <View style={local.statusLeft}>
                <View style={[local.dot, { backgroundColor: item.color }]} />
                <View>
                  <Text style={local.statusTitle}>{item.title}</Text>
                  <Text style={local.statusValue}>{item.value}</Text>
                </View>
              </View>

              <Text style={[local.statusBadge, { color: item.color }]}>
                {item.status}
              </Text>
            </View>
          ))}
        </Card>

        {/* ===== Alert Log ===== */}
        <Card>
          <View style={local.sectionHeader}>
            <Text style={local.sectionTitle}>Alert Log</Text>
            <Text style={local.sectionSub}>history</Text>
          </View>

          {ALERT_LOG.map((item) => (
            <View
              key={item.id}
              style={[local.alertItem, { borderColor: item.color }]}
            >
              <View
                style={[
                  local.alertBadge,
                  { backgroundColor: `${item.color}22` },
                ]}
              >
                <Text style={[local.alertLevel, { color: item.color }]}>
                  {item.level}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={local.alertTitle}>{item.title}</Text>
                <Text style={local.alertDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>

      <BottomNavBar active="Alerts" navigation={navigation} />
    </View>
  );
}

/* ===== Local Styles (เฉพาะหน้านี้) ===== */
const local = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSub: {
    color: "#7C8DB5",
    fontSize: 12,
  },

  /* Status */
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E2A44",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusTitle: {
    color: "#EAF0FF",
    fontWeight: "600",
  },
  statusValue: {
    color: "#7C8DB5",
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    fontWeight: "800",
    fontSize: 12,
  },

  /* Alert */
  alertItem: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "#10182A",
  },
  alertBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  alertLevel: {
    fontWeight: "800",
    fontSize: 12,
  },
  alertTitle: {
    color: "#EAF0FF",
    fontWeight: "600",
  },
  alertDesc: {
    color: "#7C8DB5",
    fontSize: 12,
    marginTop: 2,
  },

  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#10182A",
    marginBottom: 12,
  },
});
