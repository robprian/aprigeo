import { useState, useEffect } from 'react'
import { Brand } from '@/lib/types'

interface UseBrandsOptions {
  page?: number
  limit?: number
  includeCount?: boolean
  featured?: boolean
}

interface UseBrandsReturn {
  brands: Brand[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useBrands(options: UseBrandsOptions = {}): UseBrandsReturn {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {
    page = 1,
    limit = 50,
    includeCount = true,
    featured = false
  } = options

  const fetchBrands = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        includeCount: includeCount.toString(),
        featured: featured.toString()
      })
      
      const response = await fetch(`/api/brands?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch brands')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setBrands(data.data || [])
      } else {
        throw new Error(data.error || 'Failed to fetch brands')
      }
    } catch (err) {
      console.error('Error fetching brands:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setBrands([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBrands()
  }, [page, limit, includeCount, featured])

  return {
    brands,
    isLoading,
    error,
    refetch: fetchBrands
  }
}

export function useFeaturedBrands() {
  return useBrands({ featured: true, limit: 6 })
}
