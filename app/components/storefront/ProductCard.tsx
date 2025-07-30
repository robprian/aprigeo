"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useWishlist } from "@/hooks/useWishlist"
import { useCompare } from "@/hooks/useCompare"
import { useCart } from "@/hooks/useCart"
import { toast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/currency"
import ContactForPrice from "@/app/components/ui/contact-for-price"
import ProductHoverActions from "../shop/ProductHoverActions"

interface ProductCardProps {
  product: {
    id: number
    name: string
    slug?: string
    price: number
    originalPrice?: number
    image: string
    images?: string[]
    category?: string
    badge?: string
    rating?: number
    reviews?: number
    inStock?: boolean
  }
  onQuickView?: (id: number) => void
  className?: string
}

export default function ProductCard({ product, onQuickView, className = "" }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCompare, removeFromCompare, isInCompare } = useCompare()
  const { addToCart } = useCart()

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsLoading(true)
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id)
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist`,
        })
      } else {
        await addToWishlist(product)
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsLoading(true)
    try {
      if (isInCompare(product.id)) {
        await removeFromCompare(product.id)
        toast({
          title: "Removed from Compare",
          description: `${product.name} has been removed from comparison`,
        })
      } else {
        await addToCompare(product)
        toast({
          title: "Added to Compare",
          description: `${product.name} has been added to comparison`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update comparison list",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.inStock) return

    setIsLoading(true)
    try {
      await addToCart(product, 1)
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickView = (productId: number) => {
    if (onQuickView) {
      onQuickView(productId)
    }
  }

  // Badge color based on type
  const getBadgeColor = (badge: string) => {
    switch (badge?.toLowerCase()) {
      case "new":
        return "bg-green-500 text-white"
      case "sale":
        return "bg-orange-500 text-white"
      case "hot":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <Card className={`group border hover:shadow-md transition-all duration-300 ${className}`}>
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative pt-4 px-4">
          <Link href={`/product/${product.slug || product.id}`} className="block overflow-hidden relative aspect-square">
            <Image
              src={product.image || product.images?.[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>

          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${getBadgeColor(product.badge)}`}
            >
              {product.badge.toUpperCase()}
            </div>
          )}

          {/* Hover Actions */}
          <ProductHoverActions
            product={product}
            onQuickView={handleQuickView}
            onAddToWishlist={handleAddToWishlist}
            onCompare={handleCompare}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && <div className="text-xs text-gray-500 mb-1">{product.category}</div>}

          {/* Product Name */}
          <Link href={`/product/${product.slug || product.id}`}>
            <h3 className="font-medium text-gray-800 mb-1 hover:text-green-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    product.rating && i < Math.floor(product.rating) 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {product.rating && product.rating > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviews || 0} review{(product.reviews || 0) !== 1 ? 's' : ''})
              </span>
            )}
            {(!product.rating || product.rating === 0) && (
              <span className="text-xs text-gray-500 ml-1">No reviews yet</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center">
            {product.price && product.price > 0 ? (
              <>
                <span className="text-base font-semibold text-gray-900">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">{formatCurrency(product.originalPrice)}</span>
                )}
              </>
            ) : (
              <div className="w-full">
                <ContactForPrice 
                  productName={product.name}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
