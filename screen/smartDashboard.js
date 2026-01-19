import React from "react";
import { View, Text } from "react-native";
import { myStyle } from "../style/myStyle";

export default function SmartDashboard() {
  return (
    <View style={myStyle.container}>
      <Text style={{ color: "#FFFFFF", fontSize: 20 }}>
        Smart Dashboard
      </Text>
    </View>
  );
}