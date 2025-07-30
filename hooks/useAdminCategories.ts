import useSWR from 'swr'
import { useEffect } from 'react'
import { Category, PaginatedResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UseAdminCategoriesOptions {
  page?: number
  limit?: number
  status?: 'active' | 'inactive' | 'all'
  search?: string
  sort?: string
  order?: string
}

export function useAdminCategories(options: UseAdminCategoriesOptions = {}) {
  const {
    page = 1,
    limit = 50,
    status = 'all',
    search,
    sort = 'sort_order',
    order = 'ASC'
  } = options

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
    order,
    status
  })

  if (search) params.append('search', search)

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Category>>(
    `/api/admin/categories?${params.toString()}`,
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
      if (type === 'category') {
        mutate() // Revalidate data when categories are modified in admin
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

  const createCategory = async (categoryData: any) => {
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) {
        throw new Error('Failed to create category')
      }

      const result = await response.json()
      mutate() // Refresh data after creation
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'category', action: 'create', id: result.id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Create category error:', error)
      throw error
    }
  }

  const updateCategory = async (id: number, categoryData: any) => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) {
        throw new Error('Failed to update category')
      }

      const result = await response.json()
      mutate() // Refresh data after update
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'category', action: 'update', id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Update category error:', error)
      throw error
    }
  }

  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      const result = await response.json()
      mutate() // Refresh data after deletion
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'category', action: 'delete', id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Delete category error:', error)
      throw error
    }
  }

  return {
    categories: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
