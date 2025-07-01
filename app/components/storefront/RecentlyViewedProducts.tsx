"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Star, X, Grid3X3, List, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"

interface RecentlyViewedProductsProps {
  limit?: number
  showHeader?: boolean
  className?: string
}

export default function RecentlyViewedProducts({
  limit = 6,
  showHeader = true,
  className = "",
}: RecentlyViewedProductsProps) {
  const { getRecentProducts, removeProduct, clearProducts } = useRecentlyViewed()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [products, setProducts] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"recent" | "name" | "price">("recent")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    try {
      const recentProducts = getRecentProducts(limit) || []
      const sortedProducts = [...recentProducts]

      switch (sortBy) {
        case "name":
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "price":
          sortedProducts.sort((a, b) => a.price - b.price)
          break
        case "recent":
        default:
          // Already in recent order
          break
      }

      setProducts(sortedProducts)
    } catch (error) {
      console.error("Error getting recent products:", error)
      setProducts([])
    }
  }, [getRecentProducts, limit, sortBy, mounted])

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleAddToWishlist = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToWishlist(product)
  }

  const handleRemoveProduct = (productId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeProduct(productId)
  }

  if (!mounted || products.length === 0) {
    return null
  }

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        {showHeader && (
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recently Viewed Products</h2>
              <p className="text-gray-600">Products you've recently browsed</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name A-Z</option>
                  <option value="price">Price Low-High</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none h-8 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Clear All */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => clearProducts()}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear All
              </Button>

              {/* View All Link */}
              <Link href="/recently-viewed" className="text-green-600 hover:text-green-700 font-medium text-sm">
                View All →
              </Link>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" : "space-y-4"}>
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                viewMode === "list" ? "flex items-center p-4" : ""
              }`}
            >
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleRemoveProduct(product.id, e)}
                className="absolute top-2 right-2 z-10 w-6 h-6 p-0 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </Button>

              <Link href={`/product/${product.id}`} className={viewMode === "list" ? "flex items-center w-full" : ""}>
                {/* Product Image */}
                <div
                  className={`relative overflow-hidden bg-gray-50 ${
                    viewMode === "list" ? "w-20 h-20 rounded-md flex-shrink-0" : "aspect-square"
                  }`}
                >
                  <Image
                    src={product.image || "/placeholder.svg?height=200&width=200&query=product"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Hover Actions - Grid Mode Only */}
                  {viewMode === "grid" && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white hover:bg-gray-100"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white hover:bg-gray-100"
                        onClick={(e) => handleAddToWishlist(product, e)}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        className="w-8 h-8 p-0 bg-green-500 hover:bg-green-600"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className={`p-3 ${viewMode === "list" ? "ml-4 flex-1" : ""}`}>
                  <h3
                    className={`font-medium text-gray-900 mb-1 line-clamp-2 ${
                      viewMode === "list" ? "text-base" : "text-sm"
                    }`}
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviews || 0})</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-green-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* List Mode Actions */}
                  {viewMode === "list" && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => handleAddToCart(product, e)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => handleAddToWishlist(product, e)}>
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Show More Link */}
        {products.length >= limit && (
          <div className="text-center mt-8">
            <Link
              href="/recently-viewed"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              View All Recently Viewed Products
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
