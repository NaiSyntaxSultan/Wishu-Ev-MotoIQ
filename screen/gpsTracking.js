import { Text, View } from "react-native";
import BottomNavBar from "../components/BottomNavBar";

export default function GpsTracking({ navigation }) {
  return (
    <View style={myStyle.container}>
      <Text style={{ color: "#fff", fontSize: 20 }}>GPS Tracking</Text>
      <BottomNavBar active="Map" navigation={navigation} />
    </View>
  );
}
