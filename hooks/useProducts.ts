import useSWR from 'swr'
import { Product, PaginatedResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UseProductsOptions {
  page?: number
  limit?: number
  category?: string
  featured?: boolean
  search?: string
  sort?: string
  order?: string
}

export function useProducts(options: UseProductsOptions = {}) {
  const {
    page = 1,
    limit = 12,
    category,
    featured,
    search,
    sort = 'created_at',
    order = 'DESC'
  } = options

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
    order
  })

  if (category) params.append('category', category)
  if (featured) params.append('featured', 'true')
  if (search) params.append('search', search)

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Product>>(
    `/api/products?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    products: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate
  }
}

export function useFeaturedProducts() {
  return useProducts({ featured: true, limit: 6 })
}

export function useBestSellingProducts(category?: string) {
  return useProducts({ 
    category, 
    limit: 6,
    sort: 'created_at',
    order: 'DESC'
  })
}