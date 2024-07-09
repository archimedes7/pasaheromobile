import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

// Initialize Firebase
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { app, auth };
