// App.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "./styles/myStyle";

import ScanForLogin from "./screen/scanForLogin";
import SmartDashboard from "./screen/smartDashboard";
import GPSTracking from "./screen/gpsTracking";
import HealthAndAlerts from "./screen/healthAndAlerts";
import DrivingMode from "./screen/drivingMode";
import ProfileAndPrivacy from "./screen/profileAndPrivacy";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="SmartDashboard" component={SmartDashboard} />
      <DashboardStack.Screen name="DrivingMode" component={DrivingMode} />
    </DashboardStack.Navigator>
  );
}

function MoreStackScreen() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="ProfileAndPrivacy" component={ProfileAndPrivacy} />
    </MoreStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: "transparent",
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },

        tabBarIcon: ({ color, size, focused }) => {
          const iconSize = size ?? 22;
          let name = "apps";

          if (route.name === "Dashboard") name = focused ? "speedometer" : "speedometer-outline";
          if (route.name === "Map") name = focused ? "map" : "map-outline";
          if (route.name === "Alerts") name = focused ? "alert-circle" : "alert-circle-outline";
          if (route.name === "More") name = focused ? "menu" : "menu-outline";

          return <Ionicons name={name} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
      <Tab.Screen name="Map" component={GPSTracking} />
      <Tab.Screen name="Alerts" component={HealthAndAlerts} />
      <Tab.Screen name="More" component={MoreStackScreen} />
    </Tab.Navigator>
  );
}

// ธีมสำหรับ NavigationContainer (ให้สีพื้นหลังและสีตัวอักษรไปในทิศทางเดียวกัน)
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.bg,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
    primary: theme.colors.primary,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* หน้าแรก: สแกน Student ID */}
        <Stack.Screen name="ScanForLogin" component={ScanForLogin} />

        {/* เข้าหน้าหลัก (tabs) หลัง verify สำเร็จ */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}