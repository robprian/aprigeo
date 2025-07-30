// Utility functions for data synchronization between frontend and admin

export const triggerDataSync = (type: 'product' | 'category' | 'brand', action: 'create' | 'update' | 'delete', id?: number) => {
  if (typeof window !== 'undefined') {
    // Trigger admin sync event
    window.dispatchEvent(new CustomEvent('admin-sync', { 
      detail: { type, action, id } 
    }))
    
    // Trigger general data invalidation for frontend
    window.dispatchEvent(new CustomEvent('data-invalidate'))
    
    // Clear related localStorage cache if needed
    const cacheKeys = [
      `products-cache`,
      `categories-cache`,
      `brands-cache`,
      `featured-products-cache`
    ]
    
    cacheKeys.forEach(key => {
      localStorage.removeItem(key)
    })
  }
}

export const clearAllCaches = () => {
  if (typeof window !== 'undefined') {
    // Clear all local storage cache
    Object.keys(localStorage).forEach(key => {
      if (key.includes('cache') || key.includes('swr-cache')) {
        localStorage.removeItem(key)
      }
    })
    
    // Trigger data invalidation
    window.dispatchEvent(new CustomEvent('data-invalidate'))
  }
}

export const validateDataConsistency = async () => {
  try {
    // Check if admin and frontend data are consistent
    const adminProductsResponse = await fetch('/api/admin/products?limit=1')
    const frontendProductsResponse = await fetch('/api/products?limit=1')
    
    const adminData = await adminProductsResponse.json()
    const frontendData = await frontendProductsResponse.json()
    
    const adminCount = adminData.pagination?.total || 0
    const frontendCount = frontendData.pagination?.total || 0
    
    if (adminCount !== frontendCount) {
      console.warn(`Data inconsistency detected: Admin has ${adminCount} products, Frontend has ${frontendCount} products`)
      clearAllCaches()
      return false
    }
    
    return true
  } catch (error) {
    console.error('Data consistency validation failed:', error)
    return false
  }
}

// Auto-sync data every 5 minutes in admin mode
export const startDataSyncMonitor = () => {
  if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
    const interval = setInterval(() => {
      validateDataConsistency()
    }, 5 * 60 * 1000) // 5 minutes
    
    return () => clearInterval(interval)
  }
}
