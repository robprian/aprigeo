"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, Eye, Wand2, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const brands = [
  {
    id: 1,
    name: "Trimble",
    slug: "trimble",
    country: "USA",
    products: 28,
    status: "Active",
    seo_optimized: true,
    logo: "/placeholder.svg?height=60&width=60",
    website: "https://trimble.com",
  },
  {
    id: 2,
    name: "Leica Geosystems",
    slug: "leica-geosystems",
    country: "Switzerland",
    products: 22,
    status: "Active",
    seo_optimized: false,
    logo: "/placeholder.svg?height=60&width=60",
    website: "https://leica-geosystems.com",
  },
  {
    id: 3,
    name: "Topcon",
    slug: "topcon",
    country: "Japan",
    products: 18,
    status: "Active",
    seo_optimized: true,
    logo: "/placeholder.svg?height=60&width=60",
    website: "https://topcon.com",
  },
  {
    id: 4,
    name: "Sokkia",
    slug: "sokkia",
    country: "Japan",
    products: 15,
    status: "Active",
    seo_optimized: false,
    logo: "/placeholder.svg?height=60&width=60",
    website: "https://sokkia.com",
  },
]

export default function BrandsPage() {
  const [isGeneratingSEO, setIsGeneratingSEO] = useState<number | null>(null)

  const handleGenerateSEO = async (brandId: number) => {
    setIsGeneratingSEO(brandId)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingSEO(null)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage product brands and manufacturers</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">Brand List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search brands..." className="pl-10 w-full sm:w-64" />
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile view */}
          <div className="block sm:hidden space-y-4">
            {brands.map((brand) => (
              <div key={brand.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-sm">{brand.name}</h3>
                      <p className="text-xs text-gray-500">{brand.country}</p>
                    </div>
                  </div>
                  <Badge variant={brand.status === "Active" ? "default" : "secondary"}>{brand.status}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{brand.products} products</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Globe className="w-3 h-3 text-gray-400" />
                      <a
                        href={brand.website}
                        className="text-xs text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </a>
                    </div>
                  </div>
                  <Badge variant={brand.seo_optimized ? "default" : "outline"} className="text-xs">
                    {brand.seo_optimized ? "SEO ✓" : "SEO ✗"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateSEO(brand.id)}
                    disabled={isGeneratingSEO === brand.id}
                    className="flex-1"
                  >
                    <Wand2 className={`w-3 h-3 mr-1 ${isGeneratingSEO === brand.id ? "animate-spin" : ""}`} />
                    {isGeneratingSEO === brand.id ? "..." : "SEO"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Brand</th>
                  <th className="text-left py-3 px-4">Country</th>
                  <th className="text-left py-3 px-4">Products</th>
                  <th className="text-left py-3 px-4">Website</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">SEO</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-medium">{brand.name}</span>
                          <p className="text-xs text-gray-500">/{brand.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{brand.country}</td>
                    <td className="py-3 px-4">{brand.products}</td>
                    <td className="py-3 px-4">
                      <a
                        href={brand.website}
                        className="text-blue-600 hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-4 h-4 inline mr-1" />
                        Visit
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={brand.status === "Active" ? "default" : "secondary"}>{brand.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={brand.seo_optimized ? "default" : "outline"}>
                          {brand.seo_optimized ? "Optimized" : "Not Optimized"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateSEO(brand.id)}
                          disabled={isGeneratingSEO === brand.id}
                        >
                          <Wand2 className={`w-3 h-3 mr-1 ${isGeneratingSEO === brand.id ? "animate-spin" : ""}`} />
                          {isGeneratingSEO === brand.id ? "Generating..." : "Magic"}
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
