"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye, Star, TrendingUp, Users, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  brand: string
  isNew?: boolean
  isBestseller?: boolean
  discount?: number
}

interface RecommendationSection {
  title: string
  subtitle: string
  icon: React.ReactNode
  products: Product[]
  type: "trending" | "personalized" | "similar" | "recently_viewed" | "bestsellers"
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Trimble R12i GNSS Receiver",
    price: 15999,
    originalPrice: 17999,
    image: "/placeholder.svg?height=200&width=200&text=Trimble+R12i",
    rating: 4.8,
    reviewCount: 124,
    category: "GPS Receivers",
    brand: "Trimble",
    isBestseller: true,
    discount: 11,
  },
  {
    id: "2",
    name: "Leica TS16 Total Station",
    price: 28999,
    image: "/placeholder.svg?height=200&width=200&text=Leica+TS16",
    rating: 4.9,
    reviewCount: 89,
    category: "Total Stations",
    brand: "Leica",
    isNew: true,
  },
  {
    id: "3",
    name: "Topcon GT-1200 Robotic",
    price: 32999,
    originalPrice: 35999,
    image: "/placeholder.svg?height=200&width=200&text=Topcon+GT1200",
    rating: 4.7,
    reviewCount: 156,
    category: "Total Stations",
    brand: "Topcon",
    discount: 8,
  },
  {
    id: "4",
    name: "Iridium 9575 Satellite Phone",
    price: 1299,
    image: "/placeholder.svg?height=200&width=200&text=Iridium+9575",
    rating: 4.6,
    reviewCount: 203,
    category: "Satellite Phones",
    brand: "Iridium",
    isBestseller: true,
  },
  {
    id: "5",
    name: "Spectra Precision Laser Level",
    price: 899,
    originalPrice: 1099,
    image: "/placeholder.svg?height=200&width=200&text=Spectra+Laser",
    rating: 4.5,
    reviewCount: 78,
    category: "Laser Levels",
    brand: "Spectra",
    discount: 18,
  },
  {
    id: "6",
    name: "DJI Phantom 4 RTK Drone",
    price: 6499,
    image: "/placeholder.svg?height=200&width=200&text=DJI+Phantom",
    rating: 4.8,
    reviewCount: 312,
    category: "Drones",
    brand: "DJI",
    isNew: true,
  },
]

export default function ProductRecommendations({
  currentProductId,
  userBehavior = {},
}: {
  currentProductId?: string
  userBehavior?: {
    viewedProducts?: string[]
    purchaseHistory?: string[]
    searchHistory?: string[]
    categories?: string[]
  }
}) {
  const [recommendations, setRecommendations] = useState<RecommendationSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    // Simulate AI recommendation engine
    const generateRecommendations = () => {
      const sections: RecommendationSection[] = []

      // Trending Products
      sections.push({
        title: "Trending Now",
        subtitle: "Popular products this week",
        icon: <TrendingUp className="w-5 h-5" />,
        type: "trending",
        products: mockProducts.filter((p) => p.isBestseller || p.isNew).slice(0, 4),
      })

      // Personalized Recommendations
      if (userBehavior.viewedProducts?.length || userBehavior.purchaseHistory?.length) {
        sections.push({
          title: "Recommended for You",
          subtitle: "Based on your browsing and purchase history",
          icon: <Users className="w-5 h-5" />,
          type: "personalized",
          products: mockProducts.slice(1, 5),
        })
      }

      // Similar Products (if viewing a specific product)
      if (currentProductId) {
        const currentProduct = mockProducts.find((p) => p.id === currentProductId)
        if (currentProduct) {
          sections.push({
            title: "Similar Products",
            subtitle: `Other ${currentProduct.category.toLowerCase()} you might like`,
            icon: <Eye className="w-5 h-5" />,
            type: "similar",
            products: mockProducts
              .filter((p) => p.category === currentProduct.category && p.id !== currentProductId)
              .slice(0, 4),
          })
        }
      }

      // Recently Viewed
      if (userBehavior.viewedProducts?.length) {
        sections.push({
          title: "Recently Viewed",
          subtitle: "Products you looked at recently",
          icon: <Clock className="w-5 h-5" />,
          type: "recently_viewed",
          products: mockProducts.filter((p) => userBehavior.viewedProducts?.includes(p.id)).slice(0, 4),
        })
      }

      // Bestsellers
      sections.push({
        title: "Best Sellers",
        subtitle: "Most popular products in all categories",
        icon: <Star className="w-5 h-5" />,
        type: "bestsellers",
        products: mockProducts.filter((p) => p.isBestseller).slice(0, 4),
      })

      setRecommendations(sections)
      setIsLoading(false)
    }

    // Simulate API delay
    setTimeout(generateRecommendations, 1000)
  }, [currentProductId, userBehavior])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    )
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Link href={`/product/${product.id}`}>
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.discount && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
              )}
              {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500 text-white">New</Badge>}
              {product.isBestseller && !product.isNew && (
                <Badge className="absolute top-2 right-2 bg-blue-500 text-white">Bestseller</Badge>
              )}
            </div>
          </Link>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleWishlistToggle(product)}
                className="bg-white hover:bg-gray-100"
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleAddToCart(product)}
                className="bg-white hover:bg-gray-100"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand} • {product.category}
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {renderStars(product.rating)}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-900">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>
            <div className="text-xs text-gray-500">{product.reviewCount} reviews</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {recommendations.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">{section.subtitle}</p>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {recommendations.length === 0 && (
        <Card>
          <CardContent className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Recommendations Available</h3>
            <p className="text-gray-600">Browse our products to get personalized recommendations</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
