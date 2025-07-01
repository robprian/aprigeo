"use client"

import { useState, useEffect, useCallback } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "@/lib/toast"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image?: string
  inStock?: boolean
  stock?: number
}

interface CartItem extends Product {
  quantity: number
}

interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minAmount?: number
  maxDiscount?: number
  expiresAt?: Date
}

interface CartStore {
  items: CartItem[]
  appliedPromo: PromoCode | null
  isLoading: boolean
  add: (product: Product, quantity: number) => Promise<void>
  remove: (productId: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  clear: () => Promise<void>
  applyPromo: (code: string) => Promise<boolean>
  removePromo: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getDiscountAmount: () => number
  getFinalPrice: () => number
  setLoading: (loading: boolean) => void
}

// Mock promo codes for demo
const PROMO_CODES: PromoCode[] = [
  {
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    minAmount: 100000,
    maxDiscount: 50000,
  },
  {
    code: "SAVE20K",
    discount: 20000,
    type: "fixed",
    minAmount: 150000,
  },
  {
    code: "NEWUSER",
    discount: 15,
    type: "percentage",
    minAmount: 50000,
    maxDiscount: 75000,
  },
]

// Debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }) as T
}

// Create a Zustand store with persistence
const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      add: async (product, quantity = 1) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === product.id)
        const currentQuantity = existingItem?.quantity || 0
        const newQuantity = currentQuantity + quantity

        // Stock validation
        const maxStock = product.stock || 999
        if (newQuantity > maxStock) {
          toast.error(`Only ${maxStock} items available in stock`)
          return
        }

        set({ isLoading: true })

        try {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 300))

          set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id)

            // Dispatch custom event for header to listen
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("cart-updated", {
                  detail: {
                    action: "add",
                    product,
                    quantity,
                    totalItems: state.items.reduce((total, item) => total + item.quantity, 0) + quantity,
                  },
                }),
              )
            }

            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
                ),
                isLoading: false,
              }
            } else {
              return {
                items: [...state.items, { ...product, quantity }],
                isLoading: false,
              }
            }
          })

          toast.success(`${product.name} added to cart`, {
            description: `Quantity: ${quantity}`,
          })
        } catch (error) {
          toast.error("Failed to add item to cart")
          set({ isLoading: false })
        }
      },

      remove: async (productId) => {
        set({ isLoading: true })

        try {
          await new Promise((resolve) => setTimeout(resolve, 200))

          const removedItem = get().items.find((item) => item.id === productId)

          set((state) => {
            // Dispatch custom event for header to listen
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("cart-updated", {
                  detail: {
                    action: "remove",
                    productId,
                    totalItems:
                      state.items.reduce((total, item) => total + item.quantity, 0) -
                      (state.items.find((item) => item.id === productId)?.quantity || 0),
                  },
                }),
              )
            }

            return {
              items: state.items.filter((item) => item.id !== productId),
              isLoading: false,
            }
          })

          if (removedItem) {
            toast.success(`${removedItem.name} removed from cart`)
          }
        } catch (error) {
          toast.error("Failed to remove item from cart")
          set({ isLoading: false })
        }
      },

      updateQuantity: async (productId, quantity) => {
        if (quantity <= 0) {
          get().remove(productId)
          return
        }

        const item = get().items.find((item) => item.id === productId)
        if (!item) return

        // Stock validation
        const maxStock = item.stock || 999
        if (quantity > maxStock) {
          toast.error(`Only ${maxStock} items available in stock`)
          return
        }

        set({ isLoading: true })

        try {
          await new Promise((resolve) => setTimeout(resolve, 200))

          set((state) => {
            // Dispatch custom event for header to listen
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("cart-updated", {
                  detail: {
                    action: "update",
                    productId,
                    quantity,
                    totalItems: state.items.reduce(
                      (total, item) => (item.id === productId ? total + quantity : total + item.quantity),
                      0,
                    ),
                  },
                }),
              )
            }

            return {
              items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
              isLoading: false,
            }
          })

          toast.info(`Quantity updated to ${quantity}`)
        } catch (error) {
          toast.error("Failed to update quantity")
          set({ isLoading: false })
        }
      },

      clear: async () => {
        set({ isLoading: true })

        try {
          await new Promise((resolve) => setTimeout(resolve, 300))

          // Dispatch custom event for header to listen
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("cart-updated", {
                detail: {
                  action: "clear",
                  totalItems: 0,
                },
              }),
            )
          }

          set({ items: [], appliedPromo: null, isLoading: false })
          toast.success("Cart cleared successfully")
        } catch (error) {
          toast.error("Failed to clear cart")
          set({ isLoading: false })
        }
      },

      applyPromo: async (code: string) => {
        const promoCode = PROMO_CODES.find((promo) => promo.code.toLowerCase() === code.toLowerCase())

        if (!promoCode) {
          toast.error("Invalid promo code")
          return false
        }

        const totalPrice = get().getTotalPrice()

        if (promoCode.minAmount && totalPrice < promoCode.minAmount) {
          toast.error(`Minimum order amount is Rp ${promoCode.minAmount.toLocaleString()}`)
          return false
        }

        if (promoCode.expiresAt && new Date() > promoCode.expiresAt) {
          toast.error("Promo code has expired")
          return false
        }

        set({ appliedPromo: promoCode })

        let discountAmount = 0
        if (promoCode.type === "percentage") {
          discountAmount = (totalPrice * promoCode.discount) / 100
          if (promoCode.maxDiscount) {
            discountAmount = Math.min(discountAmount, promoCode.maxDiscount)
          }
        } else {
          discountAmount = promoCode.discount
        }

        toast.success(`Promo code applied! You saved Rp ${discountAmount.toLocaleString()}`)
        return true
      },

      removePromo: () => {
        set({ appliedPromo: null })
        toast.info("Promo code removed")
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getDiscountAmount: () => {
        const { appliedPromo, getTotalPrice } = get()
        if (!appliedPromo) return 0

        const totalPrice = getTotalPrice()

        if (appliedPromo.type === "percentage") {
          let discount = (totalPrice * appliedPromo.discount) / 100
          if (appliedPromo.maxDiscount) {
            discount = Math.min(discount, appliedPromo.maxDiscount)
          }
          return discount
        } else {
          return appliedPromo.discount
        }
      },

      getFinalPrice: () => {
        const totalPrice = get().getTotalPrice()
        const discountAmount = get().getDiscountAmount()
        return Math.max(0, totalPrice - discountAmount)
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        appliedPromo: state.appliedPromo,
      }),
    },
  ),
)

// Debounced cart operations
const debouncedUpdateQuantity = debounce((productId: number, quantity: number) => {
  useCartStore.getState().updateQuantity(productId, quantity)
}, 500)

export function useCart() {
  const [mounted, setMounted] = useState(false)
  const {
    items,
    appliedPromo,
    add,
    remove,
    updateQuantity,
    clear,
    applyPromo,
    removePromo,
    getTotalItems,
    getTotalPrice,
    getDiscountAmount,
    getFinalPrice,
    isLoading,
    setLoading,
  } = useCartStore()

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Optimized update quantity with debouncing
  const updateQuantityOptimized = useCallback((productId: number, quantity: number) => {
    // Optimistic update
    useCartStore.setState((state) => ({
      items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    }))

    // Debounced actual update
    debouncedUpdateQuantity(productId, quantity)
  }, [])

  // Only return the real values after hydration to avoid hydration mismatch
  return {
    cartItems: mounted ? items : [],
    appliedPromo: mounted ? appliedPromo : null,
    addToCart: add,
    removeFromCart: remove,
    updateQuantity: updateQuantityOptimized,
    clearCart: clear,
    applyPromo,
    removePromo,
    getTotalItems: mounted ? getTotalItems : () => 0,
    getTotalPrice: mounted ? getTotalPrice : () => 0,
    getDiscountAmount: mounted ? getDiscountAmount : () => 0,
    getFinalPrice: mounted ? getFinalPrice : () => 0,
    isLoading,
    setLoading,
  }
}
