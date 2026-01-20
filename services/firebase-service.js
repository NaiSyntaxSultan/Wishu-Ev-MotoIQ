import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { firestore } from "../config/firebase-config";

const USERS_COLLECTION = "user_profile";

export const checkStudentOnFirebase = async (studentId) => {
  try {
    console.log(`กำลังค้นหาข้อมูลนักศึกษา: ${studentId} บน Firebase...`);

    const q = query(
      collection(firestore, USERS_COLLECTION),
      where("student_id", "==", studentId),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      console.log("พบข้อมูลผู้ใช้:", userData.fullname);

      return {
        firebase_id: userDoc.id,
        ...userData,
      };
    } else {
      console.log("ไม่พบรหัสนักศึกษานี้ในระบบ");
      return null;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ Firebase:", error);
    return null;
  }
};

// แก้ไขข้อมูลส่วนตัว
export const updateCloudUser = async (firebaseId, updateData) => {
  try {
    if (!firebaseId) return;
    const userRef = doc(firestore, "user_profile", firebaseId);

    await updateDoc(userRef, {
      ...updateData,
      updatedAt: new Date(),
    });
    console.log("Cloud Profile Updated");
  } catch (error) {
    console.error("Cloud Update Error:", error);
  }
};

// ลบบัญชีถาวร
export const deleteCloudUser = async (firebaseId) => {
  try {
    if (!firebaseId) return;
    const userRef = doc(firestore, "user_profile", firebaseId);

    await deleteDoc(userRef);
    console.log("Cloud Account Deleted");
  } catch (error) {
    console.error("Cloud Delete Error:", error);
  }
};
