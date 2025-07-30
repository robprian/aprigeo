import useSWR from 'swr'
import { useEffect } from 'react'
import { Brand, PaginatedResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UseAdminBrandsOptions {
  page?: number
  limit?: number
  status?: 'active' | 'inactive' | 'all'
  search?: string
  sort?: string
  order?: string
}

export function useAdminBrands(options: UseAdminBrandsOptions = {}) {
  const {
    page = 1,
    limit = 50,
    status = 'all',
    search,
    sort = 'name',
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

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Brand & { product_count: number }>>(
    `/api/admin/brands?${params.toString()}`,
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
      if (type === 'brand') {
        mutate() // Revalidate data when brands are modified in admin
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

  const createBrand = async (brandData: any) => {
    try {
      const response = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brandData),
      })

      if (!response.ok) {
        throw new Error('Failed to create brand')
      }

      const result = await response.json()
      mutate() // Refresh data after creation
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'brand', action: 'create', id: result.id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Create brand error:', error)
      throw error
    }
  }

  const updateBrand = async (id: number, brandData: any) => {
    try {
      const response = await fetch(`/api/admin/brands/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brandData),
      })

      if (!response.ok) {
        throw new Error('Failed to update brand')
      }

      const result = await response.json()
      mutate() // Refresh data after update
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'brand', action: 'update', id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Update brand error:', error)
      throw error
    }
  }

  const deleteBrand = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/brands/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete brand')
      }

      const result = await response.json()
      mutate() // Refresh data after deletion
      
      // Trigger admin sync event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('admin-sync', { 
          detail: { type: 'brand', action: 'delete', id } 
        }))
      }
      
      return result
    } catch (error) {
      console.error('Delete brand error:', error)
      throw error
    }
  }

  return {
    brands: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
    createBrand,
    updateBrand,
    deleteBrand
  }
}
