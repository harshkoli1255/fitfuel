"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistContextType {
  wishlist: string[];
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fitfuel-wishlist");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load wishlist from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("fitfuel-wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error("Could not save wishlist to localStorage", e);
      }
    }
  }, [wishlist, isInitialized]);

  const addFavorite = (productId: string) => {
    setWishlist((prev) => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFavorite = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const isFavorite = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
