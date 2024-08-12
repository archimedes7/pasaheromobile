import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    eas: {
      projectId: "3b08e8e5-563d-480d-8ae1-d5d798c9a7db",
    },
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    googleExpoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
    googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    facebookAppId: process.env.FACEBOOK_APP_ID,
  },
  facebookScheme: `fb${process.env.FACEBOOK_APP_ID}`,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookDisplayName: "PasaheroTestDrive",
  facebookAutoInitEnabled: true,
  facebookAutoLogAppEventsEnabled: true,
  facebookAdvertiserIDCollectionEnabled: false,
});
