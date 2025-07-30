import useSWR from 'swr'
import { useEffect } from 'react'
import { Product, PaginatedResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UseAdminProductsOptions {
  page?: number
  limit?: number
  category?: string
  status?: 'active' | 'inactive' | 'all'
  search?: string
  sort?: string
  order?: string
}

export function useAdminProducts(options: UseAdminProductsOptions = {}) {
  const {
    page = 1,
    limit = 50,
    category,
    status = 'all',
    search,
    sort = 'created_at',
    order = 'DESC'
  } = options

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
    order,
    status
  })

  if (category) params.append('category', category)
  if (search) params.append('search', search)

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Product>>(
    `/api/admin/products?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 seconds for admin
    }
  )

  // Listen for admin sync events to invalidate data
  useEffect(() => {
    const handleAdminSync = (event: CustomEvent) => {
      const { type } = event.detail
      if (type === 'product') {
        mutate() // Revalidate data when products are modified in admin
      }
    }

    const handleDataInvalidate = () => {
      mutate() // Force refresh when data invalidation is triggered
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('admin-sync', handleAdminSync as EventListener)
      window.addEventListener('data-invalidate', handleDataInvalidate)
      
      return () => {
        window.removeEventListener('admin-sync', handleAdminSync as EventListener)
        window.removeEventListener('data-invalidate', handleDataInvalidate)
      }
    }
  }, [mutate])

  const createProduct = async (productData: any) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      const result = await response.json()
      mutate() // Refresh data after creation
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'product', action: 'create', id: result.id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Create product error:', error)
      throw error
    }
  }

  const updateProduct = async (id: number, productData: any) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      const result = await response.json()
      mutate() // Refresh data after update
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'product', action: 'update', id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Update product error:', error)
      throw error
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      const result = await response.json()
      mutate() // Refresh data after deletion
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'product', action: 'delete', id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Delete product error:', error)
      throw error
    }
  }

  return {
    products: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
