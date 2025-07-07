import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export interface Banner {
  id: number
  title: string
  subtitle?: string
  description?: string
  image_url: string
  mobile_image_url?: string
  button_text?: string
  button_url?: string
  background_color: string
  text_color: string
  position: 'hero' | 'banner' | 'sidebar' | 'footer'
  size: 'small' | 'medium' | 'large' | 'full'
  is_active: boolean
  display_order: number
  start_date: string
  end_date?: string
  click_count: number
  view_count: number
  target_audience?: string
  created_at: string
  updated_at: string
}

interface BannerResponse {
  success: boolean
  data: Banner[]
  pagination?: {
    limit: number
    offset: number
    total: number
  }
}

interface UseBannersOptions {
  position?: string
  active?: boolean
  includeInactive?: boolean
  limit?: number
  offset?: number
}

export function useBanners(options: UseBannersOptions = {}) {
  const {
    position,
    active = true,
    includeInactive = false,
    limit = 10,
    offset = 0
  } = options

  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString()
  })

  if (position) params.append('position', position)
  if (includeInactive || active !== undefined) {
    params.append('active', includeInactive ? 'all' : active.toString())
  }

  const { data, error, isLoading, mutate } = useSWR<BannerResponse>(
    `/api/banners?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    banners: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate
  }
}

export function useBanner(id: number) {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: Banner }>(
    id ? `/api/banners/${id}` : null,
    fetcher
  )

  return {
    banner: data?.data,
    isLoading,
    error,
    mutate
  }
}

export function useBannerAnalytics(bannerId?: number, days: number = 30) {
  const params = new URLSearchParams({
    days: days.toString()
  })

  if (bannerId) params.append('banner_id', bannerId.toString())

  const { data, error, isLoading } = useSWR<{ success: boolean; data: any[] }>(
    `/api/banners/analytics?${params.toString()}`,
    fetcher
  )

  return {
    analytics: data?.data || [],
    isLoading,
    error
  }
}

export function useBannerActions() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const trackBannerEvent = async (bannerId: number, eventType: 'view' | 'click') => {
    try {
      const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop'
      
      await fetch('/api/banners/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          banner_id: bannerId,
          event_type: eventType,
          device_type: deviceType
        })
      })
    } catch (err) {
      console.error('Error tracking banner event:', err)
    }
  }

  const createBanner = async (bannerData: Partial<Banner>) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bannerData)
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to create banner')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create banner'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateBanner = async (id: number, bannerData: Partial<Banner>) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bannerData)
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to update banner')
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update banner'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBanner = async (id: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete banner')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete banner'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createBanner,
    updateBanner,
    deleteBanner,
    trackBannerEvent,
    isLoading,
    error
  }
}
