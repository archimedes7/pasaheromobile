import { useEffect, useRef, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const ROUTES = {
  WELCOME: "/welcome",
  USER_TYPE_SELECTION: "/(auth)/user-type",
  ADMIN_DASHBOARD: "/(admin)",
  MAIN_PROFILE: "/(main)/profile",
  WALLET: "/(wallet)",
};

export function useProtectedRoute() {
  const { user, userType, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const hasRedirected = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading || hasRedirected.current || !isMounted) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inMainGroup = segments[0] === "(main)";
    const inAdminGroup = segments[0] === "(admin)";
    const inWalletGroup = segments[0] === "(wallet)";

    console.log("useProtectedRoute effect", {
      user,
      userType,
      isAdmin,
      segments,
    });

    if (user) {
      if (isAdmin && !inAdminGroup) {
        console.log("Redirecting to admin dashboard");
        router.replace(ROUTES.ADMIN_DASHBOARD);
        hasRedirected.current = true;
      } else if (!isAdmin && !userType && !inAuthGroup) {
        console.log("Redirecting to user type selection");
        router.replace(ROUTES.USER_TYPE_SELECTION);
        hasRedirected.current = true;
      } else if (!isAdmin && userType && !inMainGroup && !inWalletGroup) {
        console.log("Redirecting to main profile");
        router.replace(ROUTES.MAIN_PROFILE);
        hasRedirected.current = true;
      }
    } else if (!inAuthGroup) {
      console.log("Redirecting to welcome screen");
      router.replace(ROUTES.WELCOME);
      hasRedirected.current = true;
    }
  }, [user, userType, isAdmin, segments, isLoading, router, isMounted]);

  // Reset the redirect flag when the segments change
  useEffect(() => {
    hasRedirected.current = false;
  }, [segments]);
}
