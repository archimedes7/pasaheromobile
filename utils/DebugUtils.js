import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

export const checkEnvironment = () => {
  console.log("[DEBUG] Environment Variables:", {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    environment: process.env.EXPO_PUBLIC_ENVIRONMENT,
  });
};

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  console.log("[DEBUG] Firebase config:", firebaseConfig);

  if (!getApps().length) {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      console.log("[DEBUG] Firebase initialized successfully");
      return { app, auth };
    } catch (error) {
      console.error("[DEBUG] Error initializing Firebase:", error);
    }
  } else {
    console.log("[DEBUG] Firebase already initialized");
    return { app: getApps()[0], auth: getAuth() };
  }
};

export const checkFacebookSDK = () => {
  const facebookAppId = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID;
  console.log("[DEBUG] Facebook App ID:", facebookAppId);

  if (facebookAppId) {
    console.log(
      "[DEBUG] Facebook App ID found, but SDK initialization skipped"
    );
    // Facebook SDK initialization can be added here if needed in the future
  } else {
    console.log("[DEBUG] Facebook App ID not found");
  }
};

export const checkNetworkConnection = async () => {
  try {
    const response = await fetch("https://www.google.com");
    console.log("[DEBUG] Network connection:", response.ok ? "OK" : "Failed");
  } catch (error) {
    console.error("[DEBUG] Network connection error:", error);
  }
};
