"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, BarChart2, Eye, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/hooks/useWishlist"
import { useCompare } from "@/hooks/useCompare"
import { Button } from "@/components/ui/button"

interface ProductHoverActionsProps {
  product: any
  onQuickView?: (productId: number) => void
  onAddToWishlist?: (e: React.MouseEvent) => void
  onCompare?: (e: React.MouseEvent) => void
  onAddToCart?: (e: React.MouseEvent) => void
  className?: string
}

export default function ProductHoverActions({
  product,
  onQuickView,
  onAddToWishlist,
  onCompare,
  onAddToCart,
  className,
}: ProductHoverActionsProps) {
  const [mounted, setMounted] = useState(false)
  const { isInWishlist } = useWishlist()
  const { isInCompare } = useCompare()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isWishlisted = isInWishlist(product.id)
  const isCompared = isInCompare(product.id)

  return (
    <div
      className={cn(
        "absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center",
        className,
      )}
    >
      {/* Vertical Icons */}
      <div className="absolute right-2 top-2 flex flex-col gap-1">
        <button
          className={cn(
            "w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:bg-gray-100",
            isWishlisted ? "text-red-500" : "text-gray-600",
          )}
          onClick={onAddToWishlist}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("w-4 h-4", isWishlisted ? "fill-current" : "")} />
        </button>

        <button
          className={cn(
            "w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:bg-gray-100",
            isCompared ? "text-blue-500" : "text-gray-600",
          )}
          onClick={onCompare}
          aria-label="Compare product"
        >
          <BarChart2 className="w-4 h-4" />
        </button>

        <button
          className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 transition-all hover:bg-gray-100"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            if (onQuickView) onQuickView(product.id)
          }}
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Add To Cart */}
      <div className="absolute bottom-0 left-0 right-0 mb-4 flex justify-center">
        <Button
          className={cn(
            "bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md px-5 py-2 flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300",
            !product.inStock && "bg-gray-400 hover:bg-gray-400 cursor-not-allowed",
          )}
          disabled={!product.inStock}
          onClick={onAddToCart}
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  )
}
