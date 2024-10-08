import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { LogBox } from "react-native";
import {
  initFirebase,
  checkEnvironment,
  checkFacebookSDK,
  checkNetworkConnection,
} from "../utils/DebugUtils";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { LoadingScreen } from "../components/LoadingScreen";
import { useAuth, AuthProvider } from "../contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletContext";

LogBox.ignoreLogs(["You are initializing Firebase Auth"]);

function RootLayoutNav() {
  const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
  const environment = process.env.EXPO_PUBLIC_ENVIRONMENT;
  const { userType, isLoading, isAdmin } = useAuth();

  console.log("Firebase API Key:", apiKey); // Add this line to verify the environment variable
  console.log("Environment:", environment); // Add this line to verify the custom environment variable
  console.log("RootLayoutNav rendering", { userType, isLoading, isAdmin });

  useProtectedRoute();

  if (isLoading) {
    console.log("RootLayoutNav: Loading");
    return <LoadingScreen />;
  }

  console.log("RootLayoutNav: Rendering layout", { isAdmin, userType });

  return (
    <Stack>
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="temp-home"
        options={{ title: "Temporary Home", headerShown: true }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const customColors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    const initializeApp = async () => {
      checkEnvironment();
      initFirebase();
      await checkNetworkConnection();
      checkFacebookSDK();
    };
    initializeApp();
  }, []);

  return (
    <ThemeProvider
      value={{
        ...theme,
        colors: {
          ...theme.colors,
          ...customColors,
        },
      }}
    >
      <AuthProvider>
        <WalletProvider>
          <RootLayoutNav />
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
