// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMIxf6jUMTxqpLa7xNlpshHEeSEUmq3TI",
  authDomain: "evmotor-d849f.firebaseapp.com",
  projectId: "evmotor-d849f",
  storageBucket: "evmotor-d849f.firebasestorage.app",
  messagingSenderId: "530894355623",
  appId: "1:530894355623:web:fae0cb037ef1487fbeef82",
  measurementId: "G-GLJ6XEW2WY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
