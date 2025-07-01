import useSWR from 'swr'
import { Category, ApiResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useCategories(includeCount: boolean = false) {
  const params = new URLSearchParams()
  if (includeCount) params.append('include_count', 'true')

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Category[]>>(
    `/api/categories?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    categories: data?.data || [],
    isLoading,
    error,
    mutate
  }
}