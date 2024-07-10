import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDflq8Opeulax9_TDSdWqG-fnEsrgvKpbk",
  authDomain: "pasaherotestdrive.firebaseapp.com",
  databaseURL: "https://pasaherotestdrive.firebaseio.com",
  projectId: "pasaherotestdrive",
  storageBucket: "pasaherotestdrive.appspot.com",
  messagingSenderId: "699535507493",
  appId: "1:699535507493:ios:cf73a9c01de822ec0bbfcc",
  measurementId: "G-measurement-id", // Optional, can be omitted
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Connect to Auth Emulator if in development environment
if (__DEV__) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
