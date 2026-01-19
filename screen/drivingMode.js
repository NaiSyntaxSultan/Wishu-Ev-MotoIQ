import React from "react";
import { View, Text } from "react-native";
import { myStyle } from "../style/myStyle";

export default function DrivingMode() {
  return (
    <View style={myStyle.container}>
      <Text style={{ color: "#FFFFFF", fontSize: 20 }}>
        Driving Mode
      </Text>
    </View>
  );
}