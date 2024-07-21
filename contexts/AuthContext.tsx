import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  User,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [, googleResponse, promptGoogleAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      "699535507493-nnpn4nigg7k2tsi2coadat6f7i5rl2k8.apps.googleusercontent.com",
    iosClientId:
      "699535507493-77kcp40r3rpv9h62hr5oade8i1uaurdp.apps.googleusercontent.com",
    webClientId:
      "699535507493-ns5s2df0ktg8kfe2v5g093odhg700ejg.apps.googleusercontent.com",
    expoClientId: "ns5s2df0ktg8kfe2v5g093odhg700ejg", // Only if you're using Expo Go
  });

  const [, facebookResponse, promptFacebookAsync] = Facebook.useAuthRequest({
    clientId: "424468263764363",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    GoogleSignin.configure({
      webClientId:
        "699535507493-ns5s2df0ktg8kfe2v5g093odhg700ejg.apps.googleusercontent.com",
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(console.error);
    }
  }, [googleResponse]);

  useEffect(() => {
    if (facebookResponse?.type === "success") {
      const { access_token } = facebookResponse.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential).catch(console.error);
    }
  }, [facebookResponse]);

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    await promptGoogleAsync();
  };

  const signInWithFacebook = async () => {
    await promptFacebookAsync();
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
