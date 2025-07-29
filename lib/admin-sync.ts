/**
 * Admin-Frontend Synchronization System
 * This module handles real-time synchronization between admin actions and frontend data
 */

import { useStore } from '@/lib/store'

type SyncEventType = 'product' | 'category' | 'brand' | 'blog' | 'banner'
type SyncAction = 'create' | 'update' | 'delete'

interface SyncEvent {
  type: SyncEventType
  action: SyncAction
  id: number | string
  data?: any
}

class AdminSyncManager {
  private eventListeners: Map<string, ((event: SyncEvent) => void)[]> = new Map()

  // Subscribe to sync events
  subscribe(eventType: SyncEventType, callback: (event: SyncEvent) => void) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, [])
    }
    this.eventListeners.get(eventType)!.push(callback)

    // Return unsubscribe function
    return () => {
      const listeners = this.eventListeners.get(eventType)
      if (listeners) {
        const index = listeners.indexOf(callback)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }

  // Emit sync event
  emit(event: SyncEvent) {
    const listeners = this.eventListeners.get(event.type)
    if (listeners) {
      listeners.forEach(callback => callback(event))
    }

    // Also emit to global window event for frontend components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('admin-sync', { detail: event }))
    }
  }

  // Sync product operations
  async syncProduct(action: SyncAction, data: any, id?: number) {
    // Update store first
    const store = useStore.getState()
    
    try {
      // Make API call to sync with database
      let response
      switch (action) {
        case 'create':
          response = await fetch('/api/admin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          if (response.ok) {
            const result = await response.json()
            store.addProduct({ ...data, id: result.id })
            this.emit({ type: 'product', action: 'create', id: result.id, data: { ...data, id: result.id } })
          }
          break
          
        case 'update':
          if (!id) throw new Error('ID required for update')
          response = await fetch(`/api/admin/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          if (response.ok) {
            store.updateProduct(id, data)
            this.emit({ type: 'product', action: 'update', id, data })
          }
          break
          
        case 'delete':
          if (!id) throw new Error('ID required for delete')
          response = await fetch(`/api/admin/products/${id}`, {
            method: 'DELETE'
          })
          if (response.ok) {
            store.deleteProduct(id)
            this.emit({ type: 'product', action: 'delete', id })
          }
          break
      }
      
      return response?.ok
    } catch (error) {
      console.error('Product sync error:', error)
      return false
    }
  }

  // Sync category operations
  async syncCategory(action: SyncAction, data: any, id?: number) {
    const store = useStore.getState()
    
    try {
      let response
      switch (action) {
        case 'create':
          response = await fetch('/api/admin/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          if (response.ok) {
            const result = await response.json()
            store.addCategory({ ...data, id: result.id })
            this.emit({ type: 'category', action: 'create', id: result.id, data: { ...data, id: result.id } })
          }
          break
          
        case 'update':
          if (!id) throw new Error('ID required for update')
          response = await fetch(`/api/admin/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          if (response.ok) {
            store.updateCategory(id, data)
            this.emit({ type: 'category', action: 'update', id, data })
          }
          break
          
        case 'delete':
          if (!id) throw new Error('ID required for delete')
          response = await fetch(`/api/admin/categories/${id}`, {
            method: 'DELETE'
          })
          if (response.ok) {
            store.deleteCategory(id)
            this.emit({ type: 'category', action: 'delete', id })
          }
          break
      }
      
      return response?.ok
    } catch (error) {
      console.error('Category sync error:', error)
      return false
    }
  }

  // Sync blog operations
  async syncBlog(action: SyncAction, data: any, id?: number) {
    const store = useStore.getState()
    
    try {
      let response
      switch (action) {
        case 'create':
          response = await fetch('/api/admin/blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          if (response.ok) {
            const result = await response.json()
            store.addBlogPost({ ...data, id: result.id })
            this.emit({ type: 'blog', action: 'create', id: result.id, data: { ...data, id: result.id } })
          }
          break
          
        case 'update':
          if (!id) throw new Error('ID required for update')
          response = await fetch(`/api/admin/blog/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          if (response.ok) {
            store.updateBlogPost(id, data)
            this.emit({ type: 'blog', action: 'update', id, data })
          }
          break
          
        case 'delete':
          if (!id) throw new Error('ID required for delete')
          response = await fetch(`/api/admin/blog/${id}`, {
            method: 'DELETE'
          })
          if (response.ok) {
            store.deleteBlogPost(id)
            this.emit({ type: 'blog', action: 'delete', id })
          }
          break
      }
      
      return response?.ok
    } catch (error) {
      console.error('Blog sync error:', error)
      return false
    }
  }

  // Clear all caches to force fresh data
  async clearCaches() {
    try {
      await fetch('/api/admin/cache/clear', { method: 'POST' })
    } catch (error) {
      console.error('Cache clear error:', error)
    }
  }
}

// Create singleton instance
export const adminSync = new AdminSyncManager()

// Hook for components to use admin sync
export function useAdminSync() {
  return {
    syncProduct: adminSync.syncProduct.bind(adminSync),
    syncCategory: adminSync.syncCategory.bind(adminSync),
    syncBlog: adminSync.syncBlog.bind(adminSync),
    clearCaches: adminSync.clearCaches.bind(adminSync),
    subscribe: adminSync.subscribe.bind(adminSync)
  }
}

// Frontend data invalidation hook
export function useFrontendSync() {
  const invalidateQueries = () => {
    // Trigger re-fetch for frontend hooks
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('data-invalidate'))
    }
  }

  return { invalidateQueries }
}
