"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Grid, List, Filter, SortAsc, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/currency"
import ContactForPrice from "@/app/components/ui/contact-for-price"

interface Product {
  id: number
  name: string
  slug: string
  price: number
  currency: string
  image_url?: string
  description?: string
  brand_name?: string
  category_name?: string
  is_active: boolean
}

interface Category {
  id: number
  name: string
  slug: string
  description: string
  image_url?: string
  products_count?: number
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true)
        
        // Fetch category info
        const categoryResponse = await fetch(`/api/categories/slug/${resolvedParams.slug}`)
        if (!categoryResponse.ok) {
          notFound()
          return
        }
        const categoryData = await categoryResponse.json()
        setCategory(categoryData.data)

        // Fetch products for this category
        const productsResponse = await fetch(`/api/products?category=${resolvedParams.slug}&limit=50`)
        if (productsResponse.ok) {
          const productsData = await productsResponse.json()
          setProducts(productsData.data || [])
        }
      } catch (error) {
        console.error('Error fetching category data:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryAndProducts()
  }, [resolvedParams])

  const sortedProducts = products.sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price
      case 'price_high':
        return b.price - a.price
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-blue-600">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl opacity-90 mb-6">
              {category.description}
            </p>
            {category.products_count !== undefined && (
              <p className="text-lg opacity-75">
                {category.products_count} {category.products_count === 1 ? 'product' : 'products'} available
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <Button variant="outline" asChild>
              <Link href="/categories">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="name">Urutkan berdasarkan Nama</option>
              <option value="price_low">Harga: Rendah ke Tinggi</option>
              <option value="price_high">Harga: Tinggi ke Rendah</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              We're working on adding more products to this category.
            </p>
            <Button asChild>
              <Link href="/categories">Browse Other Categories</Link>
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className={
                  viewMode === 'grid'
                    ? "group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    : "group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex items-center space-x-6"
                }
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Grid View */}
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <Image
                        src={product.image_url || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        {product.brand_name && (
                          <Badge variant="secondary" className="text-xs mb-2">
                            {product.brand_name}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        {product.price > 0 ? (
                          <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(product.price)}
                          </span>
                        ) : (
                          <ContactForPrice productName={product.name} />
                        )}
                        <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image_url || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-1">
                            {product.brand_name && (
                              <Badge variant="secondary" className="text-xs">
                                {product.brand_name}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {product.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          {product.price > 0 ? (
                            <div className="text-lg font-bold text-blue-600 mb-2">
                              {formatCurrency(product.price)}
                            </div>
                          ) : (
                            <div className="mb-2">
                              <ContactForPrice productName={product.name} />
                            </div>
                          )}
                          <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Explore Related Categories</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/categories">All Categories</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/brands">Browse Brands</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shop">All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
