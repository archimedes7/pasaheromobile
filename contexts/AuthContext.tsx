import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onSnapshot, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserProfileTypes } from "@/types";

type UserType = "Passenger" | "Pet Owner" | "Driver" | "Admin" | null;
type ApprovalStatus = "Pending" | "Approved" | "Rejected";

type AuthContextType = {
  user: User | null;
  userProfile: UserProfileTypes | null;
  userType: UserType;
  isLoading: boolean;
  isAdmin: boolean;
  approvalStatus: ApprovalStatus;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    userType: UserType
  ) => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
  updateUserType: (userType: UserType) => Promise<void>;
  submitForApproval: () => Promise<void>;
  handleApproval: (uid: string, status: ApprovalStatus) => Promise<void>;
  operationLoading: boolean;
  isSessionValid: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const handleAuthError = (error: any): string => {
  switch (error.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password";
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/weak-password":
      return "Password is too weak";
    default:
      return "An unexpected error occurred";
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileTypes | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] =
    useState<ApprovalStatus>("Pending");
  const [operationLoading, setOperationLoading] = useState<boolean>(false);

  //for userData
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, "users", user.uid),
        (doc) => {
          if (doc.exists()) {
            console.log("User data:", doc.data());
            setUserData(doc.data());
          } else {
            console.log("No such document!");
            setUserData(null);
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log(
        "Auth state changed:",
        firebaseUser ? "User signed in" : "User signed out"
      );
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.data();
        if (userData) {
          console.log("User data from Firestore:", userData);
          setUserType(userData.userType as UserType);
          setIsAdmin(userData.userType === "Admin");
          setApprovalStatus(userData.approvalStatus as ApprovalStatus);
          setUserProfile(userData as UserProfileTypes);
          await AsyncStorage.setItem("userType", userData.userType);
        } else {
          console.warn("User document does not contain data");
          setUserType(null);
          setIsAdmin(false);
          setUserProfile(null);
        }
      } else {
        setUserType(null);
        setIsAdmin(false);
        setUserProfile(null);
        setApprovalStatus("Pending");
        await AsyncStorage.removeItem("userType");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken(true);
        await AsyncStorage.setItem("userToken", token);
      }
    };

    const tokenRefreshInterval = setInterval(refreshToken, 55 * 60 * 1000);

    return () => clearInterval(tokenRefreshInterval);
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setOperationLoading(true);
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.data();
      if (userData) {
        setUserType(userData.userType as UserType);
        setIsAdmin(userData.userType === "Admin");
        setApprovalStatus(userData.approvalStatus as ApprovalStatus);
        setUserProfile(userData as UserProfileTypes);
        await AsyncStorage.setItem("userType", userData.userType);
      } else {
        console.warn("User document does not contain data");
        setUserType(null);
        setIsAdmin(false);
        setUserProfile(null);
      }
      await AsyncStorage.setItem("loginTimestamp", Date.now().toString());
      console.log("User signed in successfully:", userCredential.user.uid);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error signing in:", error);
      throw new Error(handleAuthError(error));
    } finally {
      setOperationLoading(false);
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    userType: UserType,
    profileData: Partial<UserProfileTypes>
  ): Promise<User> => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user) {
        throw new Error("Failed to create user account");
      }
      const newUserData = {
        email,
        userType,
        approvalStatus: userType === "Driver" ? "Pending" : "Approved",
        ...profileData,
      };
      await setDoc(doc(db, "users", userCredential.user.uid), newUserData);
      setUserType(userType);
      setIsAdmin(userType === "Admin");
      setUserProfile(newUserData as UserProfileTypes);
      setApprovalStatus(newUserData.approvalStatus as ApprovalStatus);
      await AsyncStorage.setItem("userType", userType);
      await AsyncStorage.setItem("loginTimestamp", Date.now().toString());
      console.log("User signed up successfully:", userCredential.user.uid);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw new Error(handleAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      await AsyncStorage.removeItem("userType");
      await AsyncStorage.removeItem("loginTimestamp");
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      throw new Error(handleAuthError(error));
    } finally {
      setUser(null);
      setUserType(null);
      setIsAdmin(false);
      setUserProfile(null); // Clear the user profile
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw new Error(handleAuthError(error));
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfileTypes>) => {
    try {
      if (user) {
        await updateDoc(doc(db, "users", user.uid), profileData);
        setUserProfile(
          (prevProfile) =>
            ({ ...prevProfile, ...profileData } as UserProfileTypes)
        );
      } else {
        throw new Error("No user is currently signed in");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new Error(handleAuthError(error));
    }
  };

  const updateUserType = async (newUserType: UserType) => {
    try {
      if (user) {
        await setDoc(
          doc(db, "users", user.uid),
          { userType: newUserType },
          { merge: true }
        );
        setUserType(newUserType);
        setIsAdmin(newUserType === "Admin");
        await AsyncStorage.setItem("userType", newUserType);
      }
    } catch (error) {
      console.error("Error updating user type:", error);
      throw new Error(handleAuthError(error));
    }
  };

  const submitForApproval = async () => {
    try {
      if (user && userType === "Driver") {
        await updateDoc(doc(db, "users", user.uid), {
          approvalStatus: "Pending",
        });
        setApprovalStatus("Pending");
      }
    } catch (error) {
      console.error("Error submitting for approval:", error);
      throw new Error(handleAuthError(error));
    }
  };

  const handleApproval = async (uid: string, status: ApprovalStatus) => {
    try {
      if (isAdmin) {
        await updateDoc(doc(db, "users", uid), { approvalStatus: status });
        if (user && user.uid === uid) {
          setApprovalStatus(status);
        }
      } else {
        throw new Error("Only admins can approve or reject users");
      }
    } catch (error) {
      console.error("Error handling approval:", error);
      throw new Error(handleAuthError(error));
    }
  };

  const isSessionValid = async (): Promise<boolean> => {
    const loginTimestamp = await AsyncStorage.getItem("loginTimestamp");
    if (!loginTimestamp) return false;

    const currentTime = Date.now();
    return currentTime - parseInt(loginTimestamp) <= SESSION_DURATION;
  };

  const contextValue = useMemo(
    () => ({
      user,
      userProfile,
      userType,
      isLoading,
      isAdmin,
      approvalStatus,
      operationLoading,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetPassword,
      updateUserProfile,
      updateUserType,
      submitForApproval,
      handleApproval,
      isSessionValid,
    }),
    [
      user,
      userProfile,
      userType,
      isLoading,
      isAdmin,
      approvalStatus,
      operationLoading,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetPassword,
      updateUserProfile,
      updateUserType,
      submitForApproval,
      handleApproval,
      isSessionValid,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
