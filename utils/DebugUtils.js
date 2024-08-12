import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

export const checkEnvironment = () => {
  console.log("[DEBUG] Environment Variables:", Constants.expoConfig?.extra);
};

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
    authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
    projectId: Constants.expoConfig?.extra?.firebaseProjectId,
    storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
    appId: Constants.expoConfig?.extra?.firebaseAppId,
    measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId,
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
  const facebookAppId = Constants.expoConfig?.extra?.facebookAppId;
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
