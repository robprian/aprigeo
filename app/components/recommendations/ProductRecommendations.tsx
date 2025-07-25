"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye, Star, TrendingUp, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { useProducts } from "@/hooks/useProducts"
import { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/currency"

interface RecommendationSection {
  title: string
  subtitle: string
  icon: React.ReactNode
  products: Product[]
  type: "trending" | "personalized" | "similar" | "recently_viewed" | "bestsellers"
}

export default function ProductRecommendations({
  currentProductId,
  userBehavior = {},
}: {
  currentProductId?: string
  userBehavior?: {
    viewedProducts?: string[]
    purchaseHistory?: string[]
    searchHistory?: string[]
  }
}) {
  const [recommendations, setRecommendations] = useState<RecommendationSection[]>([])
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  // Fetch data menggunakan hooks
  const { products: featuredProducts } = useProducts({ featured: true, limit: 8 })
  const { products: latestProducts } = useProducts({
    sort: "created_at",
    order: "desc",
    limit: 6,
  })
  const { products: trendingProducts } = useProducts({
    sort: "rating",
    order: "desc", 
    limit: 8,
  })

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.svg",
    }, 1)
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "/placeholder.svg",
      })
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  useEffect(() => {
    const generateRecommendations = () => {
      if (!featuredProducts && !latestProducts && !trendingProducts) return

      const sections: RecommendationSection[] = []

      // Produk Unggulan GPS Tools
      if (featuredProducts && featuredProducts.length > 0) {
        sections.push({
          title: "GPS Tools Unggulan",
          subtitle: "Peralatan GPS terbaik pilihan kami untuk surveying dan mapping",
          icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
          products: featuredProducts.slice(0, 4),
          type: "trending",
        })
      }

      // GPS Tools Terbaru
      if (latestProducts && latestProducts.length > 0) {
        sections.push({
          title: "GPS Tools Terbaru",
          subtitle: "Koleksi terbaru dari berbagai brand GPS dan surveying equipment",
          icon: <Clock className="h-5 w-5 text-blue-500" />,
          products: latestProducts.slice(0, 4),
          type: "recently_viewed",
        })
      }

      // GPS Tools Populer
      if (trendingProducts && trendingProducts.length > 0) {
        sections.push({
          title: "GPS Tools Terpopuler",
          subtitle: "Peralatan GPS dengan rating tertinggi dari para profesional",
          icon: <Users className="h-5 w-5 text-green-500" />,
          products: trendingProducts.slice(0, 4),
          type: "bestsellers",
        })
      }

      setRecommendations(sections)
      setLoading(false)
    }

    generateRecommendations()
  }, [featuredProducts, latestProducts, trendingProducts])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {recommendations.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              {section.icon}
              <div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <p className="text-sm text-gray-600 font-normal">{section.subtitle}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-lg bg-white shadow">
                      <img
                        alt={product.name}
                        className="aspect-square w-full object-cover transition-transform hover:scale-105"
                        height="200"
                        src={product.images[0] || "/placeholder.svg"}
                        width="200"
                      />
                      {product.compare_price && product.compare_price > product.price && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          -{Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}%
                        </Badge>
                      )}
                      {product.is_featured && <Badge className="absolute top-2 right-2 bg-green-500 text-white">Featured</Badge>}
                      {product.badge && (
                        <Badge className="absolute top-2 right-2 bg-blue-500 text-white">{product.badge}</Badge>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-full items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleAddToCart(product)}
                            className="bg-white text-black hover:bg-gray-100"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleWishlistToggle(product)}
                            className={`bg-white hover:bg-gray-100 ${
                              isInWishlist(product.id) ? "text-red-500" : "text-black"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                          </Button>
                          <Button size="sm" variant="secondary" asChild className="bg-white text-black hover:bg-gray-100">
                            <Link href={`/product/${product.slug}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link href={`/product/${product.slug}`} className="block">
                        <h4 className="font-medium text-sm hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                      <div className="text-xs text-gray-600">
                        {product.brand?.name || "GPS Tools"} • {product.category?.name || "Surveying Equipment"}
                      </div>
                      <div className="flex items-center gap-1">
                        {product.rating && renderStars(product.rating)}
                        <span className="text-xs text-gray-500 ml-1">({product.rating || 0})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{formatCurrency(product.price)}</span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-gray-500 line-through">{formatCurrency(product.compare_price)}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{product.reviews || 0} reviews</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {section.products.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada produk GPS tools yang tersedia untuk kategori ini.</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {recommendations.length === 0 && !loading && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">Tidak ada rekomendasi GPS tools yang tersedia saat ini.</p>
            <p className="text-sm text-gray-400 mt-2">Silakan kembali lagi nanti untuk melihat produk GPS terbaru.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
