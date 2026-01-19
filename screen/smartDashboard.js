import { ScrollView, Text, View } from "react-native";
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
      <HeaderBar
        title="Smart Dashboard"
        subtitle="Real-time • AI DTE"
        showNotification
        notificationCount={2}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* SPEED CARD */}
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
            />
          </View>
        </Card>

        {/* DTE */}
        <Card>
          <Text style={styles.sectionTitle}>AI DTE (Distance-to-Empty)</Text>

          <Text style={styles.bigText}>วิ่งได้อีก {distance} กม.</Text>

          <Text style={styles.desc}>
            Estimated by AI from battery + speed + driving behavior
          </Text>
        </Card>

        {/* INFO */}
        <Card>
          <Text style={styles.info}>
            Color cue: <Text style={{ color: "#4DB6FF" }}>Blue</Text> = Normal •{" "}
            <Text style={{ color: "#FF9F0A" }}>Orange</Text> = Low battery
            warning
          </Text>
        </Card>
      </ScrollView>

      <BottomNavBar active="Dashboard" navigation={navigation} />
    </View>
  );
}
