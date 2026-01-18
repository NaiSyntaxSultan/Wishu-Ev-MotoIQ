import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: "#060B16",
    paddingHorizontal: 18,
    paddingTop: 24,
  },

  headerWrap: {
    marginBottom: 18,
  },
  textHeader: {
    fontSize: 26,
    fontWeight: "800",
    color: "#EAF0FF",
  },
  textSubHeader: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#7C8DB5",
  },

  // ===== Card / Panel =====
  card: {
    backgroundColor: "#0B1326", // ✅ ตามที่ต้องการ
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#141C2F",
    padding: 18,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#EAF0FF",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#B8C4E6",
  },
  caption: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C8DB5",
  },

  // ===== Button =====
  btnPrimary: {
    backgroundColor: "#2CE6A0",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    color: "#08101A",
    fontSize: 16,
    fontWeight: "900",
  },

  btnSecondary: {
    backgroundColor: "#111A2E",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1A2440",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondaryText: {
    color: "#EAF0FF",
    fontSize: 16,
    fontWeight: "800",
  },

  // ===== Input (ใช้หน้า login/signup/profile ได้) =====
  input: {
    width: "100%",
    height: 46,
    borderRadius: 16,
    paddingHorizontal: 14,
    color: "#EAF0FF",
    backgroundColor: "#0A1122",
    borderWidth: 1,
    borderColor: "#1A2440",
  },

  pillText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#EAF0FF",
  },
});