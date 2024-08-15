// services/walletServices.ts
import { db } from "../utils/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, WalletProfile } from "@/types";

export async function getCards(lastCardId = null, limit = 10) {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const cardsRef = collection(db, "cards");
    let q = query(
      cardsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(limit)
    );

    if (lastCardId) {
      const lastCardDoc = await getDoc(doc(db, "cards", lastCardId));
      if (lastCardDoc.exists()) {
        q = query(q, startAfter(lastCardDoc));
      }
    }

    const querySnapshot = await getDocs(q);
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Card[];

    // Store cards locally for offline access
    await AsyncStorage.setItem("userCards", JSON.stringify(cards));
    return cards;
  } catch (error) {
    console.error("Error fetching cards:", error);
    // If online fetch fails, try to get cached cards
    const cachedCards = await AsyncStorage.getItem("userCards");
    return cachedCards ? JSON.parse(cachedCards) : [];
  }
}

export async function fetchWalletData(): Promise<WalletProfile | null> {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const walletRef = doc(db, "wallets", userId);
    const walletDoc = await getDoc(walletRef);

    if (!walletDoc.exists()) {
      // If wallet doesn't exist, create a new one
      const newWalletData: WalletProfile = {
        userId,
        walletId: userId,
        balance: 0,
        currency: "PHP",
        cards: [],
        transactions: [],
      };
      await setDoc(walletRef, newWalletData);
      return newWalletData;
    }

    return { id: walletDoc.id, ...walletDoc.data() } as WalletProfile;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return null;
  }
}

export async function addCard(cardData: Card): Promise<Card> {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const walletRef = doc(db, "wallets", userId);
    const walletDoc = await getDoc(walletRef);

    if (!walletDoc.exists()) {
      throw new Error("Wallet not found");
    }

    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    await updateDoc(walletRef, {
      cards: arrayUnion(newCard),
    });

    // Update local storage
    const cachedCards = await AsyncStorage.getItem("userCards");
    const cards = cachedCards ? JSON.parse(cachedCards) : [];
    cards.unshift(newCard);
    await AsyncStorage.setItem("userCards", JSON.stringify(cards));

    return newCard;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
}

export async function updateWalletBalance(
  userId: string,
  newBalance: number
): Promise<void> {
  try {
    const walletRef = doc(db, "wallets", userId);
    await updateDoc(walletRef, {
      balance: newBalance,
    });
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    throw error;
  }
}

export async function addTransaction(
  userId: string,
  transaction: Transaction
): Promise<void> {
  try {
    const walletRef = doc(db, "wallets", userId);
    await updateDoc(walletRef, {
      transactions: arrayUnion(transaction),
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
}
