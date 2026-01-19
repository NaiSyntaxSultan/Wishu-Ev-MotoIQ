import React from "react";
import { View, Text } from "react-native";
import { myStyle } from "../style/myStyle";

export default function GpsTracking() {
  return (
    <View style={myStyle.container}>
      <Text style={{ color: "#FFFFFF", fontSize: 20 }}>
        GPS Tracking
      </Text>
    </View>
  );
}