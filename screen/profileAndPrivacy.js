import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import HeaderBar from "../components/HeaderBar";
import { styles as myStyle } from "../styles/myStyle";

export default function ProfileAndPrivacy({ navigation }) {
  const ACCOUNT_NAME = "Ping W.";

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(ACCOUNT_NAME);
  const [phone, setPhone] = useState("081-234-5678");

  const [vehicleName, setVehicleName] = useState("EV-01");
  const isConnected = !!vehicleName;

  const [confirmName, setConfirmName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const canDelete = confirmName === ACCOUNT_NAME;

  /* ===== ACTIONS ===== */
  const handleSave = () => {
    setIsEditing(false);
    // TODO: call API save profile
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleUnbind = () => {
    setVehicleName(null);
  };

  return (
    <View style={myStyle.container}>
      <HeaderBar title="Profile & Privacy" subtitle="My Data, My Control" />

      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        {/* ===== EDIT PROFILE ===== */}
        <View style={local.card}>
          <View style={local.rowBetween}>
            <Text style={local.title}>Edit Profile</Text>

            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={local.editBtn}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Full Name */}
          <Text style={local.label}>Full Name</Text>
          <View style={local.valueCard}>
            {isEditing ? (
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                style={local.input}
              />
            ) : (
              <Text style={local.value}>{fullName}</Text>
            )}
          </View>

          {/* Emergency Phone */}
          <Text style={local.label}>Emergency Phone</Text>
          <View style={local.valueCard}>
            {isEditing ? (
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={local.input}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={local.value}>{phone}</Text>
            )}
          </View>

          {isEditing && (
            <TouchableOpacity style={local.saveBtn} onPress={handleSave}>
              <Text style={local.saveText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ===== PRIVACY MANAGEMENT ===== */}
        <View style={local.card}>
          <Text style={local.title}>Privacy Management</Text>

          <View style={local.innerCard}>
            <TouchableOpacity style={local.itemRow}>
              <Text style={local.itemText}>Clear Driving History</Text>
            </TouchableOpacity>
          </View>

          <View style={local.innerCard}>
            <TouchableOpacity style={local.itemRow}>
              <Text style={local.itemText}>Delete Biometric Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== VEHICLE BINDING ===== */}
        <View style={local.card}>
          <Text style={local.title}>Vehicle Binding</Text>

          <View style={local.innerCard}>
            <View style={local.rowBetween}>
              <View style={local.row}>
                <View
                  style={[
                    local.statusDot,
                    { backgroundColor: isConnected ? "#35E1A1" : "#FF3B30" },
                  ]}
                />
                <Text style={local.value}>
                  {isConnected ? `Connected: ${vehicleName}` : "Not Connected"}
                </Text>
              </View>

              {isConnected && (
                <TouchableOpacity onPress={handleUnbind}>
                  <Text style={local.dangerText}>Unbind</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* ===== DANGER ZONE ===== */}
        {!isEditing && (
          <View style={[local.card, local.dangerCard]}>
            <Text style={local.dangerTitle}>Delete Account (Hard Delete)</Text>
            <Text style={local.dangerDesc}>Requires double confirmation</Text>

            <TouchableOpacity
              style={local.deleteBtn}
              onPress={() => setShowDeleteModal(true)}
            >
              <Text style={local.deleteText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ===== LOGOUT ===== */}
        <TouchableOpacity style={local.logoutBtn} onPress={handleLogout}>
          <Text style={local.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ===== DELETE MODAL ===== */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={local.modalOverlay}>
          <View style={local.modalBox}>
            <Text style={local.dangerTitle}>Confirm Delete</Text>
            <Text style={local.dangerDesc}>
              Type "{ACCOUNT_NAME}" to confirm
            </Text>

            <TextInput
              style={local.input}
              value={confirmName}
              onChangeText={setConfirmName}
            />

            <View style={local.rowBetween}>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                <Text style={local.value}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!canDelete}
                onPress={handleDeleteAccount}
              >
                <Text
                  style={[local.dangerText, !canDelete && { opacity: 0.4 }]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNavBar active="More" navigation={navigation} />
    </View>
  );
}

/* ===== STYLES ===== */
const local = StyleSheet.create({
  card: {
    backgroundColor: "#0E1627",
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },
  innerCard: {
    backgroundColor: "#0B1220",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    color: "#8A94B8",
    marginTop: 16,
    marginBottom: 6,
  },
  value: {
    color: "#EAF0FF",
  },
  valueCard: {
    backgroundColor: "#0B1220",
    borderRadius: 16,
    padding: 14,
  },
  input: {
    color: "#FFFFFF",
  },
  editBtn: {
    color: "#35E1A1",
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: "#35E1A1",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    color: "#05160F",
    fontWeight: "700",
  },
  itemRow: {
    paddingVertical: 6,
  },
  itemText: {
    color: "#EAF0FF",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  dangerCard: {
    borderWidth: 1,
    borderColor: "#FF3B30",
    marginHorizontal: 10,
  },
  dangerTitle: {
    color: "#FF7A7A",
    fontWeight: "700",
    fontSize: 16,
  },
  dangerDesc: {
    color: "#8A94B8",
    marginVertical: 10,
  },
  dangerText: {
    color: "#FF7A7A",
    fontWeight: "600",
  },
  deleteBtn: {
    borderColor: "#FF3B30",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  deleteText: {
    color: "#FF7A7A",
  },
  logoutBtn: {
    alignItems: "center",
    paddingVertical: 18,
  },
  logoutText: {
    color: "#FF7A7A",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#0E1627",
    borderRadius: 20,
    padding: 20,
    width: "85%",
  },
});
