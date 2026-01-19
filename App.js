import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screen/login";
import SmartDashboard from "./screen/smartDashboard";
import DrivingMode from "./screen/drivingMode";
import HealthAndAlerts from "./screen/healthAndAlerts";
import GpsTracking from "./screen/gpsTracking";
import ProfileAndPrivacy from "./screen/profileAndPrivacy";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={SmartDashboard} />
        <Stack.Screen name="Drive" component={DrivingMode} />
        <Stack.Screen name="Alerts" component={HealthAndAlerts} />
        <Stack.Screen name="GPS" component={GpsTracking} />
        <Stack.Screen name="Profile" component={ProfileAndPrivacy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}