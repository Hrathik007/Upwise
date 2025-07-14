// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase config here (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBDg6ohdEb_zr7aAtlnVwpUkAF3U2hRpb0",
  authDomain: "upwise-c5bea.firebaseapp.com",
  projectId: "upwise-c5bea",
  storageBucket: "upwise-c5bea.firebasestorage.app",
  messagingSenderId: "876377457333",
  appId: "1:876377457333:web:5121f219d26eaea235f4fc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
