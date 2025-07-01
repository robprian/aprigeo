import useSWR from 'swr'
import { DashboardStats, ApiResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useDashboardStats() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<DashboardStats>>(
    '/api/admin/stats',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 300000, // 5 minutes
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    stats: data?.data,
    isLoading,
    error,
    mutate
  }
}