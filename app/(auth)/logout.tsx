import { router } from "expo-router";
import { Alert } from "react-native";

export const createHandleLogout = (authContext) => {
  return async () => {
    try {
      if (typeof authContext.signOut !== "function") {
        throw new Error("signOut is not a function");
      }
      await authContext.signOut();
      // Redirect to login screen
      router.replace("/welcome");
    } catch (error) {
      console.error("Error signing out:", error);
      // Show an alert to the user
      Alert.alert(
        "Logout Error",
        "An error occurred while logging out. Please try again."
      );
    }
  };
};
