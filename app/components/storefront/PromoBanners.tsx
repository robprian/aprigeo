"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface PromoBanner {
  id: number
  title: string
  subtitle: string
  description: string
  primary_text: string
  secondary_text: string
  discount_text: string
  button_text: string
  button_url: string
  image_url?: string
  background_color: string
  text_color: string
  accent_color: string
  banner_type: string
  is_active: boolean
  display_order: number
}

export default function PromoBanners() {
  const [banners, setBanners] = useState<PromoBanner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/admin/promotional-banners')
        const data = await response.json()
        if (data.success) {
          setBanners(data.banners || [])
        }
      } catch (error) {
        console.error('Error fetching promotional banners:', error)
        // Fallback banners
        setBanners([
          {
            id: 1,
            title: 'GET EXTRA 50% OFF',
            subtitle: 'Fresh',
            description: 'Everyday',
            primary_text: 'Fresh',
            secondary_text: 'Everyday',
            discount_text: 'GET EXTRA 50% OFF',
            button_text: 'Shop now',
            button_url: '/shop',
            background_color: 'bg-yellow-50',
            text_color: 'text-gray-900',
            accent_color: 'text-red-500',
            banner_type: 'discount',
            is_active: true,
            display_order: 1
          },
          {
            id: 2,
            title: 'HOT THIS WEEK',
            subtitle: 'Fresh vegetable',
            description: '& Fruit basket',
            primary_text: 'Fresh vegetable',
            secondary_text: '& Fruit basket',
            discount_text: 'Fresh Packed to order',
            button_text: 'Shop now',
            button_url: '/shop/fresh',
            background_color: 'bg-green-50',
            text_color: 'text-gray-900',
            accent_color: 'text-green-600',
            banner_type: 'featured',
            is_active: true,
            display_order: 2
          },
          {
            id: 3,
            title: 'Fresh food',
            subtitle: 'Premium Quality',
            description: 'Delivered Fresh Daily',
            primary_text: 'Fresh food',
            secondary_text: 'Premium Quality',
            discount_text: 'Delivered Fresh Daily',
            button_text: 'Order Now',
            button_url: '/shop/fresh-food',
            background_color: 'bg-blue-50',
            text_color: 'text-gray-900',
            accent_color: 'text-blue-600',
            banner_type: 'promotional',
            is_active: true,
            display_order: 3
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (banners.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">No promotional banners available</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.slice(0, 3).map((banner, index) => (
          <div key={banner.id} className={`relative overflow-hidden rounded-lg ${banner.background_color}`}>
            {banner.image_url ? (
              <Image
                src={banner.image_url}
                alt={banner.title}
                width={400}
                height={200}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200"></div>
            )}
            <div className={`absolute inset-0 flex flex-col justify-center p-6 ${banner.text_color}`}>
              {banner.banner_type === 'discount' && (
                <>
                  <div className="mb-2">
                    <span className={`text-sm ${banner.accent_color}`}>{banner.discount_text}</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${banner.accent_color} mb-1`}>50%</h3>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">{banner.primary_text}</h4>
                    <p className="text-sm text-gray-600">{banner.secondary_text}</p>
                  </div>
                  <Link href={banner.button_url} className={`text-sm font-medium ${banner.accent_color} hover:underline`}>
                    {banner.button_text.toUpperCase()}
                  </Link>
                </>
              )}

              {banner.banner_type === 'featured' && (
                <>
                  <div className="mb-2">
                    <span className={`text-sm ${banner.accent_color} font-bold`}>{banner.title}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{banner.primary_text}</h3>
                  <h3 className="text-xl font-bold mb-3">{banner.secondary_text}</h3>
                  <div className={`text-sm ${banner.accent_color} mb-2 font-medium`}>{banner.discount_text}</div>
                  <Link href={banner.button_url} className={`text-sm font-medium ${banner.accent_color} hover:underline`}>
                    {banner.button_text.toUpperCase()}
                  </Link>
                </>
              )}

              {banner.banner_type === 'promotional' && (
                <>
                  <h3 className="text-xl font-bold mb-1">{banner.primary_text}</h3>
                  <h3 className="text-xl font-bold mb-3">{banner.secondary_text}</h3>
                  <div className={`text-lg font-bold ${banner.accent_color} mb-2`}>{banner.discount_text}</div>
                  <Link href={banner.button_url} className={`text-sm font-medium ${banner.accent_color} hover:underline`}>
                    {banner.button_text.toUpperCase()}
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
