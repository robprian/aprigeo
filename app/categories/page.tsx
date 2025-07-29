"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Category {
  id: number
  name: string
  slug: string
  description: string
  image_url?: string
  is_active: boolean
  sort_order: number
  products_count?: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?include_count=true')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.data || [])
          setFilteredCategories(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCategories(filtered)
  }, [searchTerm, categories])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-300 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Product Categories
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Discover our comprehensive range of professional surveying and GPS equipment
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* View Toggle and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Browse Categories
            </h2>
            <p className="text-gray-600">
              {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} available
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Categories Grid/List */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all available categories.
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={
                  viewMode === 'grid'
                    ? "group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    : "group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex items-center space-x-6"
                }
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Grid View */}
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
                      <Image
                        src={category.image_url || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">
                          {category.name}
                        </h3>
                        {category.products_count !== undefined && (
                          <p className="text-white/90 text-sm">
                            {category.products_count} products
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        {category.products_count !== undefined && (
                          <span className="text-sm text-gray-500">
                            {category.products_count} products
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden flex-shrink-0">
                      <Image
                        src={category.image_url || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400"}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                            {category.description}
                          </p>
                          {category.products_count !== undefined && (
                            <span className="text-sm text-gray-500">
                              {category.products_count} products available
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team of surveying experts is here to help you find the perfect equipment for your specific needs. 
            Contact us for personalized recommendations and professional advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Contact Our Experts</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
