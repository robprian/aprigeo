"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronDown, Grid3X3, List, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "../components/storefront/ProductCard"
import QuickViewModal from "../components/storefront/QuickViewModal"
import Link from "next/link"
import Image from "next/image"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { Product } from "@/lib/types"

// Helper function untuk konversi Product ke format ProductCard
function convertToProductCardFormat(product: Product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.compare_price || undefined,
    image: product.images[0] || "/placeholder.svg",
    images: product.images,
    category: product.category?.name,
    badge: product.badge,
    rating: product.rating,
    reviews: product.reviews,
    inStock: product.in_stock,
  }
}

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("desc")
  const [quickViewProduct, setQuickViewProduct] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Fetch categories for filter
  const { categories } = useCategories()
  const mainCategories = categories.filter(cat => !cat.parent_id)

  // Fetch products dengan pagination
  const { products, isLoading, pagination } = useProducts({
    page,
    limit: 16, // Increase to 16 for better UX
    sort: sortBy,
    order: sortOrder,
    category: selectedCategory,
  })

  // Update allProducts ketika ada data baru
  useEffect(() => {
    if (products) {
      if (page === 1) {
        setAllProducts(products)
      } else {
        setAllProducts(prev => [...prev, ...products])
      }
      setIsLoadingMore(false)
    }
  }, [products, page])

  // Infinite scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        !isLoading &&
        !isLoadingMore &&
        pagination &&
        page < pagination.pages
      ) {
        setIsLoadingMore(true)
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, isLoadingMore, pagination, page])

  const handleQuickView = (productId: number) => {
    setQuickViewProduct(productId)
  }

  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  const handleSortChange = (value: string) => {
    const [sort, order] = value.split('-')
    setSortBy(sort)
    setSortOrder(order)
    setPage(1)
    setAllProducts([])
    setIsLoadingMore(false)
  }

  const handleCategoryFilter = (categorySlug?: string) => {
    setSelectedCategory(categorySlug)
    setPage(1)
    setAllProducts([])
    setIsLoadingMore(false)
  }

  const loadMore = useCallback(() => {
    if (pagination && page < pagination.pages && !isLoadingMore && !isLoading) {
      setIsLoadingMore(true)
      setPage(prev => prev + 1)
    }
  }, [pagination, page, isLoadingMore, isLoading])

  const selectedProduct = allProducts.find((p) => p.id === quickViewProduct)
  const hasMorePages = pagination && page < pagination.pages

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GPS Tools & Survey Equipment</h1>
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-green-500">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Shop</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              <button 
                onClick={() => handleCategoryFilter(undefined)}
                className={`flex flex-col items-center group ${!selectedCategory ? 'opacity-100' : 'opacity-60'}`}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">🗂️</span>
                </div>
                <span className="text-sm text-gray-700 text-center group-hover:text-green-500">All Products</span>
              </button>
              {mainCategories.slice(0, 5).map((category) => (
                <button 
                  key={category.id} 
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={`flex flex-col items-center group ${selectedCategory === category.slug ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-orange-200 transition-colors">
                    <Image
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-gray-700 text-center group-hover:text-green-500">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter and Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          {/* Left side - Filters */}
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-600">
              {pagination ? `${pagination.total} results` : 'Loading...'}
            </span>
            {selectedCategory && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                Filtered by: {categories.find(c => c.slug === selectedCategory)?.name}
                <button 
                  onClick={() => handleCategoryFilter(undefined)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          {/* Right side - Sort and View */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Sort by:</span>
              <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Latest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="rating-desc">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-200 rounded">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State untuk halaman pertama */}
        {isLoading && page === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {(!isLoading || page > 1) && allProducts.length > 0 && (
          <div
            className={`grid gap-6 mb-8 ${
              viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-1"
            }`}
          >
            {allProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={convertToProductCardFormat(product)} 
                onQuickView={handleQuickView} 
              />
            ))}
          </div>
        )}

        {/* Loading More State */}
        {isLoadingMore && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Loading more GPS products...</span>
            </div>
          </div>
        )}

        {/* No Products Message */}
        {!isLoading && allProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No GPS products found</h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory 
                ? `No products found in this category. Try browsing all products.`
                : 'We are currently updating our GPS inventory. Please check back soon.'
              }
            </p>
            {selectedCategory && (
              <Button 
                onClick={() => handleCategoryFilter(undefined)}
                className="bg-green-600 hover:bg-green-700"
              >
                Show All Products
              </Button>
            )}
          </div>
        )}

        {/* Load More Button (fallback untuk manual loading) */}
        {hasMorePages && !isLoadingMore && allProducts.length > 0 && (
          <div className="flex justify-center py-8">
            <Button 
              onClick={loadMore}
              disabled={isLoading || isLoadingMore}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all"
            >
              Load More GPS Products
            </Button>
          </div>
        )}

        {/* End of Results Message */}
        {!hasMorePages && allProducts.length > 0 && !isLoadingMore && (
          <div className="text-center py-12 border-t border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">You've seen all our GPS products!</h3>
            <p className="text-gray-500 mb-4">
              Total {pagination?.total} professional GPS tools and survey equipment
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/categories">Browse Categories</Link>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/contact">Need Help Choosing?</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal 
          isOpen={quickViewProduct !== null} 
          onClose={closeQuickView} 
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            originalPrice: selectedProduct.compare_price || undefined,
            image: selectedProduct.images[0] || "/placeholder.svg",
            hoverImage: selectedProduct.images[1],
            rating: selectedProduct.rating || 0,
            reviews: selectedProduct.reviews || 0,
            category: selectedProduct.category?.name || "GPS Tools",
            description: selectedProduct.description || "Professional GPS tool",
            features: [selectedProduct.description || "Professional GPS tool"],
            inStock: selectedProduct.in_stock,
            discount: selectedProduct.compare_price && selectedProduct.price ? 
              Math.round(((selectedProduct.compare_price - selectedProduct.price) / selectedProduct.compare_price) * 100) : 
              undefined
          }} 
        />
      )}
    </div>
  )
}
