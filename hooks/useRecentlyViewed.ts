"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  rating?: number
  reviews?: number
  originalPrice?: number
  discount?: number
  isNew?: boolean
  isSale?: boolean
}

interface RecentlyViewedState {
  products: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: number) => void
  clearProducts: () => void
  getRecentProducts: (limit?: number) => Product[] // Renamed back to getRecentProducts for compatibility
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) => {
        set((state) => {
          // Check if product already exists
          const exists = state.products.some((p) => p.id === product.id)
          if (exists) {
            // Move it to the top (most recent)
            const filteredProducts = state.products.filter((p) => p.id !== product.id)
            return { products: [product, ...filteredProducts] }
          } else {
            // Add new product at the top, limit to 20 items
            const newProducts = [product, ...state.products]
            if (newProducts.length > 20) {
              newProducts.pop()
            }
            return { products: newProducts }
          }
        })
      },

      removeProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }))
      },

      clearProducts: () => {
        set({ products: [] })
      },

      getRecentProducts: (limit = 10) => {
        // Return products with optional limit
        return get().products.slice(0, limit || get().products.length)
      },
    }),
    {
      name: "recently-viewed-storage",
    },
  ),
)

// Export a function to add to recently viewed for easier use in components
export function addToRecentlyViewed(product: Product) {
  useRecentlyViewed.getState().addProduct(product)
}
