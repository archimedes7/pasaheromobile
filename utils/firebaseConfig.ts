import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
  enableIndexedDbPersistence,
  doc,
  setDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

// Function to hash the admin code
async function hashAdminCode(adminCode: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    adminCode
  );
}

// Function to update the admin code in Firestore
export async function updateAdminCode(adminCode: string): Promise<void> {
  const hashedCode = await hashAdminCode(adminCode);
  const docRef = doc(db, "app_settings", "admin_settings");
  await setDoc(
    docRef,
    {
      hashedAdminCode: hashedCode,
    },
    { merge: true }
  );
  console.log("Admin code updated successfully");
}

export { app, auth, FacebookAuthProvider, db };
