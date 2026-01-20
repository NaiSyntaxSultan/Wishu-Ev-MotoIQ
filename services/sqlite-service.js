import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("ev_motor.db");

export const initDB = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id TEXT,
        fullname TEXT,
        emergency_phone TEXT,
        profile_image_uri TEXT,
        firebase_id TEXT,
        is_synced INTEGER DEFAULT 0
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id TEXT,        
        vehicle_id TEXT,        
        start_time TEXT,        
        end_time TEXT,          
        distance_km REAL,       
        firebase_id TEXT,
        is_synced INTEGER DEFAULT 0
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS gps_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER,        
        latitude REAL,
        longitude REAL,
        speed REAL,             
        timestamp TEXT,
        firebase_id TEXT,
        is_synced INTEGER DEFAULT 0
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS vehicle_alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id TEXT,
        alert_event TEXT,       
        severity_level TEXT,    
        detail TEXT,            
        timestamp TEXT,
        firebase_id TEXT,
        is_synced INTEGER DEFAULT 0
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS driving_mode_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mode_name TEXT,         
        timestamp TEXT,
        firebase_id TEXT,
        is_synced INTEGER DEFAULT 0
      );
    `);

    db.execSync(`
      CREATE TABLE IF NOT EXISTS vehicle_status_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        battery_level INTEGER,  
        dte_km INTEGER,         
        last_updated TEXT
      );
    `);

    console.log("Database by NaiSyntaxSultan");
  } catch (error) {
    console.error("Error init DB:", error);
  }
};

// บันทึกข้อมูลผู้ใช้ลงเครื่อง
export const saveLocalUser = (studentData) => {
  const {
    student_id,
    fullname,
    emergency_phone,
    profile_image_uri,
    firebase_id,
  } = studentData;

  try {
    // ลบข้อมูลเก่าออกก่อน
    db.runSync("DELETE FROM user_profile");

    // บันทึกข้อมูลใหม่
    db.runSync(
      `INSERT INTO user_profile (student_id, fullname, emergency_phone, profile_image_uri, firebase_id, is_synced) 
       VALUES (?, ?, ?, ?, ?, 1)`,
      [
        student_id,
        fullname,
        emergency_phone,
        profile_image_uri || "",
        firebase_id,
      ],
    );
    console.log("User saved locally:", fullname);
    return true;
  } catch (error) {
    console.error("Save user error:", error);
    return false;
  }
};

// ดึงข้อมูลผู้ใช้ปัจจุบัน
export const getLocalUser = () => {
  try {
    const users = db.getAllSync("SELECT * FROM user_profile LIMIT 1");
    if (users.length > 0) {
      return users[0];
    }
    return null;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

// ออกจากระบบ
export const logoutLocalUser = () => {
  try {
    db.runSync("DELETE FROM user_profile");
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// อัปเดตข้อมูลส่วนตัว
export const updateLocalUserProfile = (fullname, emergencyPhone, imageUri) => {
  try {
    db.runSync(
      `UPDATE user_profile SET fullname = ?, emergency_phone = ?, profile_image_uri = ?, is_synced = 0`,
      [fullname, emergencyPhone, imageUri],
    );
    console.log("Profile updated locally");
  } catch (error) {
    console.error("Update profile error:", error);
  }
};

// // 2. สร้างข้อมูลใหม่ (Create)
// export const createLocalItem = (title, detail) => {
//   try {
//     const result = db.runSync(
//       "INSERT INTO data_items (title, detail, is_synced) VALUES (?, ?, 0)",
//       [title, detail],
//     );
//     return result.lastInsertRowId; // คืนค่า ID ของเครื่อง
//   } catch (error) {
//     console.error("Error insert:", error);
//     return null;
//   }
// };

// // 3. อ่านข้อมูลทั้งหมด (Read)
// export const getAllLocalItems = () => {
//   try {
//     return db.getAllSync("SELECT * FROM data_items ORDER BY id DESC");
//   } catch (error) {
//     console.error("Error get all:", error);
//     return [];
//   }
// };

// // 4. อัปเดตข้อมูล (Update)
// // ใช้สำหรับแก้ไขข้อมูล หรือใช้อัปเดต firebase_id หลังซิงค์เสร็จ
// export const updateLocalItem = (id, title, detail, firebaseId = null) => {
//   try {
//     let sql = "UPDATE data_items SET title = ?, detail = ?";
//     let params = [title, detail];

//     if (firebaseId) {
//       sql += ", firebase_id = ?, is_synced = 1";
//       params.push(firebaseId);
//     } else {
//       sql += ", is_synced = 0"; // ถ้าแก้ local ให้มองว่ายังไม่ซิงค์
//     }

//     sql += " WHERE id = ?";
//     params.push(id);

//     db.runSync(sql, params);
//   } catch (error) {
//     console.error("Error update:", error);
//   }
// };

// // 5. ลบข้อมูล (Delete)
// export const deleteLocalItem = (id) => {
//   try {
//     db.runSync("DELETE FROM data_items WHERE id = ?", [id]);
//   } catch (error) {
//     console.error("Error delete:", error);
//   }
// };
