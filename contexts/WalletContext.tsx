// contexts/WalletContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { WalletProfile, Card } from "@/types";
import { useAuth } from "./AuthContext";
import { fetchWalletData, addCardToWallet } from "@/services/walletServices";

interface WalletContextType {
  wallet: WalletProfile | null;
  isLoading: boolean;
  error: string | null;
  addCard: (card: Card) => Promise<void>;
  // Add other wallet-related functions here
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<WalletProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    console.log("WalletProvider mounted");
  }, []);

  useEffect(() => {
    async function loadWallet() {
      console.log("loadWallet function called, user:", user);
      if (user) {
        try {
          setIsLoading(true);
          setError(null);
          console.log("Fetching wallet data for user:", user.id);
          const walletData = await fetchWalletData();
          console.log("Wallet data fetched:", walletData);
          setWallet(walletData);
        } catch (err) {
          console.error("Error fetching wallet data:", err);
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No user, setting wallet to null");
        setWallet(null);
        setIsLoading(false);
      }
    }

    loadWallet();
  }, [user]);

  const addCard = async (card: Card) => {
    if (!wallet || !user) {
      console.error("Cannot add card: wallet or user is null");
      return;
    }
    try {
      setIsLoading(true);
      console.log("Adding card to wallet:", card);
      const updatedWallet = await addCardToWallet(user.id, card);
      console.log("Card added, updated wallet:", updatedWallet);
      setWallet(updatedWallet);
    } catch (err) {
      console.error("Error adding card:", err);
      setError(err instanceof Error ? err.message : "Failed to add card");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("WalletContext rendering, state:", { wallet, isLoading, error });

  return (
    <WalletContext.Provider value={{ wallet, isLoading, error, addCard }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
