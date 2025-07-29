import { useState, useEffect } from 'react'

interface WishlistItem {
  id: number
  productId: number
  title: string
  price: number
  image: string
  addedAt: string
}

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  // Load wishlist from localStorage or API
  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      // For now, use localStorage. In production, this would be an API call
      const saved = localStorage.getItem('wishlist')
      if (saved) {
        setWishlistItems(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveWishlist = (items: WishlistItem[]) => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(items))
      setWishlistItems(items)
      
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
        detail: { items, count: items.length } 
      }))
    } catch (error) {
      console.error('Error saving wishlist:', error)
    }
  }

  const addToWishlist = (product: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    const existingItem = wishlistItems.find(item => item.productId === product.productId)
    
    if (!existingItem) {
      const newItem: WishlistItem = {
        ...product,
        id: Date.now(),
        addedAt: new Date().toISOString(),
      }
      const updatedItems = [...wishlistItems, newItem]
      saveWishlist(updatedItems)
      return true
    }
    
    return false // Item already in wishlist
  }

  const removeFromWishlist = (productId: number) => {
    const updatedItems = wishlistItems.filter(item => item.productId !== productId)
    saveWishlist(updatedItems)
  }

  const clearWishlist = () => {
    saveWishlist([])
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.productId === productId)
  }

  const getWishlistCount = () => {
    return wishlistItems.length
  }

  // Listen for storage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wishlist' && e.newValue) {
        setWishlistItems(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    refreshWishlist: loadWishlist,
  }
}
