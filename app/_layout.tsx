import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { AuthProvider } from "../contexts/AuthContext";
import { Colors } from "@/constants/Colors";
import { LogBox } from "react-native";
import {
  checkEnvironment,
  initFirebase,
  checkFacebookSDK,
} from "../utils/DebugUtils";

if (__DEV__) {
  console.log("Running in development mode");
} else {
  console.log("Running in production mode");
}
LogBox.ignoreLogs(["You are initializing Firebase Auth"]);

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const customColors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    // Initialize debugging
    checkEnvironment();
    initFirebase();
    checkFacebookSDK();
  }, []);

  console.log("RootLayout rendered. Current segments:", segments);

  useEffect(() => {
    console.log("Auth state change effect running");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const inAuthGroup = segments[0] === "(auth)";
      const inTempHome = segments[0] === "temp-home"; // Changed from "tempHome" to "temp-home"
      console.log(
        "Auth state changed. User:",
        user ? "Logged in" : "Not logged in",
        "In auth group:",
        inAuthGroup,
        "In TempHome:",
        inTempHome
      );

      if (user) {
        if (inAuthGroup) {
          console.log(
            "User logged in and in auth group. Redirecting to /(main)"
          );
          router.replace("/test");
        } else {
          console.log(
            "User logged in but not in auth group. Current location:",
            segments.join("/test")
          );
        }
      } else {
        if (!inAuthGroup && !inTempHome) {
          console.log(
            "User not logged in and not in auth group or TempHome. Redirecting to /welcome"
          );
          router.replace("/welcome");
        } else {
          console.log(
            "User not logged in but in auth group or TempHome. Current location:",
            segments.join("/")
          );
        }
      }
    });
    return () => unsubscribe();
  }, [segments, router]);

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
        <Stack>
          <Stack.Screen name="welcome" options={{ headerShown: true }} />
          <Stack.Screen name="(auth)" options={{ headerShown: true }} />
          <Stack.Screen name="(main)" options={{ headerShown: true }} />
          <Stack.Screen
            name="temp-home"
            options={{ title: "Temporary Home", headerShown: true }}
          />
          <Stack.Screen
            name="test"
            options={{ title: "Authentication Test", headerShown: true }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
