import useSWR from 'swr'
import { useEffect } from 'react'
import { BlogPost, PaginatedResponse } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UseBlogOptions {
  page?: number
  limit?: number
  featured?: boolean
}

export function useBlog(options: UseBlogOptions = {}) {
  const {
    page = 1,
    limit = 6,
    featured = false
  } = options

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  })

  if (featured) params.append('featured', 'true')

  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<BlogPost>>(
    `/api/blog?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  // Listen for admin sync events to invalidate data
  useEffect(() => {
    const handleAdminSync = (event: CustomEvent) => {
      const { type } = event.detail
      if (type === 'blog') {
        mutate() // Revalidate data when blog posts are modified in admin
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

  return {
    posts: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate
  }
}

export function useFeaturedBlogPosts() {
  return useBlog({ featured: true, limit: 3 })
}