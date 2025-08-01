import useSWR from 'swr'
import { useEffect } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Order {
  id: string
  user_id: string
  order_number: string
  status: string
  payment_status: string
  subtotal: string
  tax_amount: string
  shipping_amount: string
  discount_amount: string
  total: string
  notes: string | null
  shipping_address: any
  billing_address: any
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  email: string
  items_count: string
}

interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

interface UseAdminOrdersOptions {
  page?: number
  limit?: number
  status?: string
  search?: string
}

export function useAdminOrders(options: UseAdminOrdersOptions = {}) {
  const {
    page = 1,
    limit = 50,
    status,
    search
  } = options

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  })

  if (status) params.append('status', status)
  if (search) params.append('search', search)

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Order>>(
    `/api/admin/orders?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 seconds for admin
    }
  )

  // Listen for admin sync events to invalidate data
  useEffect(() => {
    const handleAdminSync = () => {
      mutate()
    }

    window.addEventListener('admin-orders-updated', handleAdminSync)
    return () => window.removeEventListener('admin-orders-updated', handleAdminSync)
  }, [mutate])

  return {
    orders: data?.data || [],
    pagination: data?.pagination || { page: 1, limit: 50, total: 0, pages: 0 },
    isLoading,
    error,
    mutate
  }
}
