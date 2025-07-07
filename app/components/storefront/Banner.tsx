"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useBanners, useBannerActions } from '@/hooks/useBanners'
import { Button } from '@/components/ui/button'

interface BannerProps {
  position?: 'hero' | 'banner' | 'sidebar' | 'footer'
  size?: 'small' | 'medium' | 'large' | 'full'
  className?: string
  autoPlay?: boolean
  showNavigation?: boolean
  showDots?: boolean
}

export default function Banner({
  position = 'hero',
  size = 'large',
  className = '',
  autoPlay = true,
  showNavigation = true,
  showDots = true
}: BannerProps) {
  const { banners, isLoading } = useBanners({ position, active: true })
  const { trackBannerEvent } = useBannerActions()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (autoPlay && banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length)
      }, 5000) // Change slide every 5 seconds
      return () => clearInterval(interval)
    }
  }, [autoPlay, banners.length])

  useEffect(() => {
    // Track banner views
    if (banners.length > 0 && banners[currentIndex]) {
      trackBannerEvent(banners[currentIndex].id, 'view')
    }
  }, [currentIndex, banners, trackBannerEvent])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleBannerClick = (banner: any) => {
    trackBannerEvent(banner.id, 'click')
  }

  if (isLoading) {
    return (
      <div className={`animate-pulse ${getSizeClasses(size)} ${className}`}>
        <div className="bg-gray-200 w-full h-full rounded-lg"></div>
      </div>
    )
  }

  if (banners.length === 0) {
    return null
  }

  const currentBanner = banners[currentIndex]
  const imageUrl = isMobile && currentBanner.mobile_image_url 
    ? currentBanner.mobile_image_url 
    : currentBanner.image_url

  return (
    <div className={`relative overflow-hidden rounded-lg ${getSizeClasses(size)} ${className}`}>
      <div 
        className="w-full h-full relative"
        style={{
          backgroundColor: currentBanner.background_color,
          color: currentBanner.text_color
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={currentBanner.title}
            fill
            className="object-cover"
            priority={position === 'hero'}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
                {currentBanner.title}
              </h1>
              {currentBanner.subtitle && (
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 text-white/90 drop-shadow-lg">
                  {currentBanner.subtitle}
                </h2>
              )}
              {currentBanner.description && (
                <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-white/80 drop-shadow-lg">
                  {currentBanner.description}
                </p>
              )}
              {currentBanner.button_text && currentBanner.button_url && (
                <Link href={currentBanner.button_url}>
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                    onClick={() => handleBannerClick(currentBanner)}
                  >
                    {currentBanner.button_text}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {showNavigation && banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
              aria-label="Next banner"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {showDots && banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function getSizeClasses(size: string): string {
  switch (size) {
    case 'small':
      return 'h-32 sm:h-40'
    case 'medium':
      return 'h-48 sm:h-56 md:h-64'
    case 'large':
      return 'h-64 sm:h-72 md:h-80 lg:h-96'
    case 'full':
      return 'h-screen'
    default:
      return 'h-64 sm:h-72 md:h-80 lg:h-96'
  }
}
