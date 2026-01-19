import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { myStyle } from "../style/myStyle";

export default function Login({ navigation }) {
  return (
    <ScrollView
      style={myStyle.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
    </ScrollView>
  );
}