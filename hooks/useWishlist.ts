"use client"

import { useState, useEffect } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Product {
  id: number
  name: string
  price: number
  image?: string
}

interface WishlistStore {
  items: Product[]
  add: (product: Product) => Promise<void>
  remove: (productId: number) => Promise<void>
  clear: () => Promise<void>
  isInWishlist: (productId: number) => boolean
  getCount: () => number
}

// Create a Zustand store with persistence
const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: async (product) => {
        // Simulate network delay for real-world feel
        await new Promise((resolve) => setTimeout(resolve, 300))

        set((state) => {
          // Check if product already exists
          if (state.items.some((item) => item.id === product.id)) {
            return state
          }

          // Dispatch custom event for header to listen
          window.dispatchEvent(new CustomEvent("wishlist-updated"))

          return {
            items: [...state.items, product],
          }
        })
      },
      remove: async (productId) => {
        // Simulate network delay for real-world feel
        await new Promise((resolve) => setTimeout(resolve, 300))

        set((state) => {
          // Dispatch custom event for header to listen
          window.dispatchEvent(new CustomEvent("wishlist-updated"))

          return {
            items: state.items.filter((item) => item.id !== productId),
          }
        })
      },
      clear: async () => {
        // Simulate network delay for real-world feel
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Dispatch custom event for header to listen
        window.dispatchEvent(new CustomEvent("wishlist-updated"))

        set({ items: [] })
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
      getCount: () => {
        return get().items.length
      },
    }),
    {
      name: "wishlist-storage", // unique name for localStorage
    },
  ),
)

export function useWishlist() {
  const [mounted, setMounted] = useState(false)
  const { items, add, remove, clear, isInWishlist, getCount } = useWishlistStore()

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only return the real values after hydration to avoid hydration mismatch
  return {
    wishlistItems: mounted ? items : [],
    addToWishlist: add,
    removeFromWishlist: remove,
    clearWishlist: clear,
    isInWishlist: mounted ? isInWishlist : () => false,
    getWishlistCount: mounted ? getCount : () => 0,
  }
}
