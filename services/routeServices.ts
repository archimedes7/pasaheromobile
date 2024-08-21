import { db } from "../utils/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface Route {
  id?: string;
  driverId: string;
  startLocation: string;
  endLocation: string;
  viaPoints: string[];
  days: string[];
  departureTime: Timestamp;
  seats: number;
  notes: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const registerRoute = async (
  driverId: string,
  routeData: Omit<Route, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  try {
    const newRoute = {
      ...routeData,
      driverId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "routes"), newRoute);
    return docRef.id;
  } catch (error) {
    console.error("Error registering route:", error);
    throw error;
  }
};

export const fetchDriverRoutes = async (driverId: string): Promise<Route[]> => {
  try {
    const routesQuery = query(
      collection(db, "routes"),
      where("driverId", "==", driverId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(routesQuery);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Route)
    );
  } catch (error) {
    console.error("Error fetching driver routes:", error);
    throw error;
  }
};

export const fetchRouteDetails = async (
  routeId: string
): Promise<Route | null> => {
  try {
    const docRef = doc(db, "routes", routeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Route;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching route details:", error);
    throw error;
  }
};

export const updateRoute = async (
  routeId: string,
  updateData: Partial<Route>
): Promise<void> => {
  try {
    const docRef = doc(db, "routes", routeId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating route:", error);
    throw error;
  }
};

export const deleteRoute = async (routeId: string): Promise<void> => {
  try {
    const docRef = doc(db, "routes", routeId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting route:", error);
    throw error;
  }
};

export const searchRoutes = async (
  startLocation: string,
  endLocation: string,
  date: Date,
  flexibleTime: number
): Promise<Route[]> => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const routesQuery = query(
      collection(db, "routes"),
      where("startLocation", "==", startLocation),
      where("endLocation", "==", endLocation),
      where("departureTime", ">=", startOfDay),
      where("departureTime", "<=", endOfDay)
    );
    const snapshot = await getDocs(routesQuery);
    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Route)
    );
  } catch (error) {
    console.error("Error searching routes:", error);
    throw error;
  }
};
