"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useBanners, useBannerActions } from '@/hooks/useBanners'
import { Button } from '@/components/ui/button'

interface SidebarBannerProps {
  position?: 'sidebar' | 'footer'
  className?: string
}

export default function SidebarBanner({
  position = 'sidebar',
  className = ''
}: SidebarBannerProps) {
  const { banners, isLoading } = useBanners({ position, active: true })
  const { trackBannerEvent } = useBannerActions()

  useEffect(() => {
    // Track banner views
    banners.forEach(banner => {
      trackBannerEvent(banner.id, 'view')
    })
  }, [banners, trackBannerEvent])

  const handleBannerClick = (banner: any) => {
    trackBannerEvent(banner.id, 'click')
  }

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 w-full h-32 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (banners.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          style={{
            backgroundColor: banner.background_color,
            color: banner.text_color
          }}
        >
          {/* Background Image */}
          <div className="relative h-32">
            <Image
              src={banner.image_url}
              alt={banner.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-1 text-white drop-shadow-lg">
              {banner.title}
            </h3>
            {banner.subtitle && (
              <p className="text-sm text-white/90 mb-2 drop-shadow-lg">
                {banner.subtitle}
              </p>
            )}
            {banner.button_text && banner.button_url && (
              <Link href={banner.button_url}>
                <Button
                  size="sm"
                  className="bg-white text-gray-900 hover:bg-gray-100 text-xs mt-2"
                  onClick={() => handleBannerClick(banner)}
                >
                  {banner.button_text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
