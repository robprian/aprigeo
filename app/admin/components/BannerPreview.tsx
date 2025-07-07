"use client"

import { useState } from 'react'
import { ArrowLeft, Monitor, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BannerPreviewProps {
  banner: any
  onClose: () => void
}

export default function BannerPreview({ banner, onClose }: BannerPreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  const getSizeClasses = (size: string, isMobile: boolean): string => {
    if (isMobile) {
      switch (size) {
        case 'small':
          return 'h-32'
        case 'medium':
          return 'h-48'
        case 'large':
          return 'h-64'
        case 'full':
          return 'h-screen'
        default:
          return 'h-64'
      }
    } else {
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
  }

  const imageUrl = viewMode === 'mobile' && banner.mobile_image_url 
    ? banner.mobile_image_url 
    : banner.image_url

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Preview Banner</h1>
            <p className="text-gray-600 mt-1">{banner.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('desktop')}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={viewMode === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('mobile')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-gray-100 p-8 rounded-lg">
        <div 
          className={`mx-auto transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-lg ${getSizeClasses(banner.size, viewMode === 'mobile')}`}
            style={{
              backgroundColor: banner.background_color,
              color: banner.text_color
            }}
          >
            {/* Background Image */}
            {imageUrl && (
              <div className="absolute inset-0">
                <img
                  src={imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg">
                  <h1 className={`font-bold mb-2 text-white drop-shadow-lg ${
                    viewMode === 'mobile' 
                      ? 'text-xl' 
                      : banner.size === 'small' 
                        ? 'text-lg sm:text-xl' 
                        : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                  }`}>
                    {banner.title}
                  </h1>
                  {banner.subtitle && (
                    <h2 className={`font-medium mb-3 text-white/90 drop-shadow-lg ${
                      viewMode === 'mobile' 
                        ? 'text-base' 
                        : banner.size === 'small' 
                          ? 'text-sm sm:text-base' 
                          : 'text-lg sm:text-xl md:text-2xl'
                    }`}>
                      {banner.subtitle}
                    </h2>
                  )}
                  {banner.description && (
                    <p className={`mb-4 text-white/80 drop-shadow-lg ${
                      viewMode === 'mobile' 
                        ? 'text-sm' 
                        : banner.size === 'small' 
                          ? 'text-xs sm:text-sm' 
                          : 'text-sm sm:text-base md:text-lg'
                    }`}>
                      {banner.description}
                    </p>
                  )}
                  {banner.button_text && banner.button_url && (
                    <Button
                      size={viewMode === 'mobile' || banner.size === 'small' ? 'default' : 'lg'}
                      className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                    >
                      {banner.button_text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Information */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Informasi Banner</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Posisi:</span>
            <div className="font-medium capitalize">{banner.position}</div>
          </div>
          <div>
            <span className="text-gray-500">Ukuran:</span>
            <div className="font-medium capitalize">{banner.size}</div>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <div className={`font-medium ${banner.is_active ? 'text-green-600' : 'text-red-600'}`}>
              {banner.is_active ? 'Aktif' : 'Tidak Aktif'}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Target:</span>
            <div className="font-medium capitalize">{banner.target_audience}</div>
          </div>
        </div>
        
        {(banner.start_date || banner.end_date) && (
          <div className="mt-4 pt-4 border-t">
            <span className="text-gray-500">Jadwal:</span>
            <div className="font-medium">
              {banner.start_date && new Date(banner.start_date).toLocaleDateString('id-ID')}
              {banner.start_date && banner.end_date && ' - '}
              {banner.end_date && new Date(banner.end_date).toLocaleDateString('id-ID')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
