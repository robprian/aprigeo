"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Star, X, Grid3X3, List, ArrowUpDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import Header from "@/app/components/storefront/Header"
import Footer from "@/app/components/storefront/Footer"

export default function RecentlyViewedPage() {
  const { getRecentProducts, removeProduct, clearAll } = useRecentlyViewed()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [products, setProducts] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"recent" | "name" | "price" | "rating">("recent")

  useEffect(() => {
    const recentProducts = getRecentProducts(50) // Get more products for the dedicated page
    const sortedProducts = [...recentProducts]

    switch (sortBy) {
      case "name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating)
        break
      case "recent":
      default:
        // Already in recent order
        break
    }

    setProducts(sortedProducts)
  }, [getRecentProducts, sortBy])

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

  const handleRemoveProduct = (productId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeProduct(productId)
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all recently viewed products?")) {
      clearAll()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900">Recently Viewed</span>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Recently Viewed Products</h1>
              <p className="text-gray-600">
                {products.length > 0
                  ? `You have viewed ${products.length} product${products.length !== 1 ? "s" : ""} recently`
                  : "You haven't viewed any products recently"}
              </p>
            </div>

            {products.length > 0 && (
              <div className="flex items-center gap-4">
                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="name">Name A-Z</option>
                    <option value="price">Price Low-High</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none h-9 px-4"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none h-9 px-4"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Clear All */}
                <Button
                  variant="outline"
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* Products */}
          {products.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  : "space-y-4"
              }
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "flex items-center p-6" : ""
                  }`}
                >
                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleRemoveProduct(product.id, e)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 p-0 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <Link href={product.href} className={viewMode === "list" ? "flex items-center w-full" : ""}>
                    {/* Product Image */}
                    <div
                      className={`relative overflow-hidden bg-gray-50 ${
                        viewMode === "list" ? "w-24 h-24 rounded-md flex-shrink-0" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
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
                            className="w-9 h-9 p-0 bg-white hover:bg-gray-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-9 h-9 p-0 bg-white hover:bg-gray-100"
                            onClick={(e) => handleAddToWishlist(product, e)}
                          >
                            <Heart
                              className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                          <Button
                            size="sm"
                            className="w-9 h-9 p-0 bg-green-500 hover:bg-green-600"
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 ${viewMode === "list" ? "ml-6 flex-1" : ""}`}>
                      <h3
                        className={`font-medium text-gray-900 mb-2 line-clamp-2 ${
                          viewMode === "list" ? "text-lg" : "text-sm"
                        }`}
                      >
                        {product.name}
                      </h3>

                      {/* Category */}
                      <p className="text-xs text-gray-500 mb-2">{product.category}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
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
                        <span className="text-xs text-gray-600">({product.rating})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-green-600 text-lg">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>

                      {/* List Mode Actions */}
                      {viewMode === "list" && (
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={(e) => handleAddToCart(product, e)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" onClick={(e) => handleAddToWishlist(product, e)}>
                            <Heart
                              className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Eye className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recently Viewed Products</h3>
              <p className="text-gray-600 mb-6">Start browsing our products to see them here</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Browse Products
                <ShoppingCart className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
