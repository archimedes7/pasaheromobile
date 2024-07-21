import Constants from "expo-constants";
import * as Facebook from "expo-facebook";
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const DEBUG = __DEV__;

export const log = (message, ...args) => {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, ...args);
  }
};

export const checkEnvironment = () => {
  const variables = Constants.expoConfig?.extra || {};
  log("Environment Variables:", variables);

  if (variables.firebaseConfig) {
    log("Firebase API Key:", variables.firebaseConfig.apiKey);
  } else {
    log("Firebase config not found!");
  }

  log("Facebook App ID:", variables.facebookAppId || "Not set");
};

export const initFirebase = () => {
  const firebaseConfig = Constants.expoConfig?.extra?.firebaseConfig;
  log("Initializing Firebase with config:", firebaseConfig);

  if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig);
    log("Firebase initialized:", app.name);
  } else {
    log("Firebase already initialized");
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      log("User is signed in:", user.uid);
    } else {
      log("No user is signed in.");
    }
  });
};

export const checkFacebookSDK = async () => {
  const facebookAppId = Constants.expoConfig?.extra?.facebookAppId;
  log("Facebook App ID:", facebookAppId);

  try {
    await Facebook.initializeAsync({
      appId: facebookAppId,
    });
    log("Facebook SDK initialized successfully");
  } catch (error) {
    log("Error initializing Facebook SDK:", error);
  }
};

export const debugFacebookLogin = async () => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });

    if (type === "success") {
      log("Facebook Login Successful. Token:", token);
    } else {
      log("Facebook Login Cancelled or Failed");
    }
  } catch (error) {
    log("Error in Facebook Login:", error);
  }
};
