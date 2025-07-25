"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Grid, List, Star, MapPin, Phone, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useBrands, useFeaturedBrands } from "@/hooks/useBrands"

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterCategory, setFilterCategory] = useState("all")

  const { brands, isLoading } = useBrands({ includeCount: true })
  const { brands: featuredBrands } = useFeaturedBrands()

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (brand.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    
    // For now, since we don't have categories in brand table, we'll match all
    const matchesCategory = filterCategory === "all"
    
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Trusted Brands</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our network of verified suppliers and manufacturers offering high-quality surveying and GPS
              equipment.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBrands.map((brand) => (
              <Card key={brand.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={brand.logo_url || "/placeholder.svg"}
                        alt={brand.name}
                        fill
                        className="object-contain rounded-lg"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{brand.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{brand.rating || 4.5}</span>
                        <span className="text-sm text-gray-500">(0)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{brand.products_count || 0} products</span>
                    <Link href={`/brands/${brand.id}`}>
                      <Button size="sm" variant="outline">
                        View Store
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="gps">GPS Receivers</option>
                <option value="total">Total Stations</option>
                <option value="laser">Laser Levels</option>
                <option value="drones">Drones & UAVs</option>
                <option value="measuring">Measuring Tools</option>
              </select>

              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Brands Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredBrands.map((brand) => (
            <Card key={brand.id} className={`hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}>
              <CardContent className={`p-6 ${viewMode === "list" ? "flex items-center gap-6 w-full" : ""}`}>
                <div className={`flex items-center gap-4 ${viewMode === "list" ? "flex-shrink-0" : "mb-4"}`}>
                  <div className="relative w-16 h-16">
                    <Image
                      src={brand.logo_url || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain rounded-lg"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{brand.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{brand.rating || 4.5}</span>
                      <span className="text-sm text-gray-500">(0)</span>
                    </div>
                  </div>
                </div>

                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <p className="text-sm text-gray-600 mb-4">{brand.description}</p>

                  <div className="space-y-2 mb-4">
                    {brand.country && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{brand.country}</span>
                      </div>
                    )}
                    {brand.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{brand.phone}</span>
                      </div>
                    )}
                    {brand.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{brand.email}</span>
                      </div>
                    )}
                    {brand.website_url && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        <span>{brand.website_url}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{brand.products_count || 0} products</span>
                    <Link href={`/brands/${brand.id}`}>
                      <Button size="sm">View Store</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No brands found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
