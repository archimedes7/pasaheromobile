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
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const firebaseConfig = {
  apiKey: "AIzaSyDX3F94mvzaNC0aGt0T59ugsqfBggOOLjU",
  authDomain: "pasaherotestdrive.firebaseapp.com",
  projectId: "pasaherotestdrive",
  storageBucket: "pasaherotestdrive.appspot.com",
  messagingSenderId: "699535507493",
  appId: "1:699535507493:web:418b01f559e5f2a70bbfcc",
  measurementId: "G-LHTGGX330Z",
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
