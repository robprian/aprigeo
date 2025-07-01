"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Grid, List, Star, MapPin, Phone, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const brands = [
  {
    id: 1,
    name: "TechPro Solutions",
    logo: "/placeholder.svg?height=80&width=80&text=TechPro",
    description: "Leading provider of GPS and surveying equipment with over 20 years of experience.",
    rating: 4.8,
    reviewCount: 156,
    location: "Jakarta, Indonesia",
    phone: "+62 21 1234 5678",
    email: "info@techpro.co.id",
    website: "www.techpro.co.id",
    productCount: 45,
    categories: ["GPS Receivers", "Total Stations", "Theodolites"],
    featured: true,
  },
  {
    id: 2,
    name: "SurveyMaster",
    logo: "/placeholder.svg?height=80&width=80&text=SurveyMaster",
    description: "Specialized in precision surveying instruments and laser measurement tools.",
    rating: 4.6,
    reviewCount: 89,
    location: "Surabaya, Indonesia",
    phone: "+62 31 9876 5432",
    email: "contact@surveymaster.id",
    website: "www.surveymaster.id",
    productCount: 32,
    categories: ["Laser Levels", "Measuring Tools", "Accessories"],
    featured: false,
  },
  {
    id: 3,
    name: "GeoTech Indonesia",
    logo: "/placeholder.svg?height=80&width=80&text=GeoTech",
    description: "Innovative geospatial technology solutions for modern surveying needs.",
    rating: 4.9,
    reviewCount: 203,
    location: "Bandung, Indonesia",
    phone: "+62 22 5555 7777",
    email: "hello@geotech.co.id",
    website: "www.geotech.co.id",
    productCount: 67,
    categories: ["Drones & UAVs", "GPS Receivers", "Software"],
    featured: true,
  },
  {
    id: 4,
    name: "Precision Instruments",
    logo: "/placeholder.svg?height=80&width=80&text=Precision",
    description: "High-precision measurement and surveying equipment for professionals.",
    rating: 4.7,
    reviewCount: 124,
    location: "Medan, Indonesia",
    phone: "+62 61 3333 4444",
    email: "sales@precision.id",
    website: "www.precision.id",
    productCount: 28,
    categories: ["Total Stations", "Theodolites", "Accessories"],
    featured: false,
  },
  {
    id: 5,
    name: "NaviSat Systems",
    logo: "/placeholder.svg?height=80&width=80&text=NaviSat",
    description: "Satellite navigation and communication equipment specialists.",
    rating: 4.5,
    reviewCount: 76,
    location: "Makassar, Indonesia",
    phone: "+62 411 2222 3333",
    email: "info@navisat.co.id",
    website: "www.navisat.co.id",
    productCount: 19,
    categories: ["Satellite Phones", "GPS Receivers", "Communication"],
    featured: false,
  },
  {
    id: 6,
    name: "MeasureTech Pro",
    logo: "/placeholder.svg?height=80&width=80&text=MeasureTech",
    description: "Professional measurement solutions for construction and surveying.",
    rating: 4.8,
    reviewCount: 167,
    location: "Yogyakarta, Indonesia",
    phone: "+62 274 8888 9999",
    email: "support@measuretech.id",
    website: "www.measuretech.id",
    productCount: 41,
    categories: ["Laser Levels", "Measuring Tools", "Construction Tools"],
    featured: true,
  },
]

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      filterCategory === "all" ||
      brand.categories.some((cat) => cat.toLowerCase().includes(filterCategory.toLowerCase()))
    return matchesSearch && matchesCategory
  })

  const featuredBrands = brands.filter((brand) => brand.featured)

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
                        src={brand.logo || "/placeholder.svg"}
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
                        <span className="text-sm font-medium">{brand.rating}</span>
                        <span className="text-sm text-gray-500">({brand.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{brand.productCount} products</span>
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
                      src={brand.logo || "/placeholder.svg"}
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
                      <span className="text-sm font-medium">{brand.rating}</span>
                      <span className="text-sm text-gray-500">({brand.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <p className="text-sm text-gray-600 mb-4">{brand.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{brand.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{brand.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{brand.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>{brand.website}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {brand.categories.map((category) => (
                      <span key={category} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{brand.productCount} products</span>
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
