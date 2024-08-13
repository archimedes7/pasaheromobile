import { useEffect } from "react";
import * as Facebook from "expo-auth-session/providers/facebook";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig"; // Adjust this import path as needed

export function useFacebookAuth() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "424468263764363",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log("User signed in successfully:", result.user.uid);
        })
        .catch((error) => {
          console.error("Error signing in with Facebook:", error);
        });
    }
  }, [response]);

  return {
    promptAsync,
  };
}
