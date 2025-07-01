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

interface CompareStore {
  items: Product[]
  add: (product: Product) => Promise<boolean>
  remove: (productId: number) => Promise<void>
  clear: () => Promise<void>
  isInCompare: (productId: number) => boolean
  getCount: () => number
}

// Maximum number of products that can be compared
const MAX_COMPARE_ITEMS = 4

// Create a Zustand store with persistence
const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: async (product) => {
        // Simulate network delay for real-world feel
        await new Promise((resolve) => setTimeout(resolve, 300))

        let success = false

        set((state) => {
          // Check if product already exists
          if (state.items.some((item) => item.id === product.id)) {
            return state
          }

          // Check if we've reached the maximum number of items
          if (state.items.length >= MAX_COMPARE_ITEMS) {
            return state
          }

          success = true

          // Dispatch custom event for header to listen
          window.dispatchEvent(new CustomEvent("compare-updated"))

          return {
            items: [...state.items, product],
          }
        })

        return success
      },
      remove: async (productId) => {
        // Simulate network delay for real-world feel
        await new Promise((resolve) => setTimeout(resolve, 300))

        set((state) => {
          // Dispatch custom event for header to listen
          window.dispatchEvent(new CustomEvent("compare-updated"))

          return {
            items: state.items.filter((item) => item.id !== productId),
          }
        })
      },
      clear: async () => {
        // Simulate network delay for real-world feel
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Dispatch custom event for header to listen
        window.dispatchEvent(new CustomEvent("compare-updated"))

        set({ items: [] })
      },
      isInCompare: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
      getCount: () => {
        return get().items.length
      },
    }),
    {
      name: "compare-storage", // unique name for localStorage
    },
  ),
)

export function useCompare() {
  const [mounted, setMounted] = useState(false)
  const { items, add, remove, clear, isInCompare, getCount } = useCompareStore()

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only return the real values after hydration to avoid hydration mismatch
  return {
    compareItems: mounted ? items : [],
    addToCompare: add,
    removeFromCompare: remove,
    clearCompare: clear,
    isInCompare: mounted ? isInCompare : () => false,
    getCompareCount: mounted ? getCount : () => 0,
  }
}
