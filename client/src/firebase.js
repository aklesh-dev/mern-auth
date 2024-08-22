// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b2c2f.firebaseapp.com",
  projectId: "mern-auth-b2c2f",
  storageBucket: "mern-auth-b2c2f.appspot.com",
  messagingSenderId: "448443474982",
  appId: "1:448443474982:web:145b0099a6dc2e1a1ab2e7",
  measurementId: "G-J83Y6KJRXL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
