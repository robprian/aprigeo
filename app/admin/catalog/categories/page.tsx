"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, Eye, Wand2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: 1,
    name: "GPS Equipment",
    slug: "gps-equipment",
    parent: null,
    products: 45,
    status: "Active",
    seo_optimized: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Survey Equipment",
    slug: "survey-equipment",
    parent: null,
    products: 32,
    status: "Active",
    seo_optimized: false,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "GNSS Receivers",
    slug: "gnss-receivers",
    parent: "GPS Equipment",
    products: 28,
    status: "Active",
    seo_optimized: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Total Stations",
    slug: "total-stations",
    parent: "Survey Equipment",
    products: 18,
    status: "Active",
    seo_optimized: false,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function CategoriesPage() {
  const [isGeneratingSEO, setIsGeneratingSEO] = useState<number | null>(null)

  const handleGenerateSEO = async (categoryId: number) => {
    setIsGeneratingSEO(categoryId)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingSEO(null)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Organize your products into categories</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">Category List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search categories..." className="pl-10 w-full sm:w-64" />
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
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-sm">{category.name}</h3>
                      <p className="text-xs text-gray-500">{category.parent || "Root Category"}</p>
                    </div>
                  </div>
                  <Badge variant={category.status === "Active" ? "default" : "secondary"}>{category.status}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{category.products} products</p>
                    <p className="text-xs text-gray-500">/{category.slug}</p>
                  </div>
                  <Badge variant={category.seo_optimized ? "default" : "outline"} className="text-xs">
                    {category.seo_optimized ? "SEO ✓" : "SEO ✗"}
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
                    onClick={() => handleGenerateSEO(category.id)}
                    disabled={isGeneratingSEO === category.id}
                    className="flex-1"
                  >
                    <Wand2 className={`w-3 h-3 mr-1 ${isGeneratingSEO === category.id ? "animate-spin" : ""}`} />
                    {isGeneratingSEO === category.id ? "..." : "SEO"}
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
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Parent</th>
                  <th className="text-left py-3 px-4">Products</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">SEO</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-medium">{category.name}</span>
                          <p className="text-xs text-gray-500">/{category.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{category.parent || "Root"}</td>
                    <td className="py-3 px-4">{category.products}</td>
                    <td className="py-3 px-4">
                      <Badge variant={category.status === "Active" ? "default" : "secondary"}>{category.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={category.seo_optimized ? "default" : "outline"}>
                          {category.seo_optimized ? "Optimized" : "Not Optimized"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateSEO(category.id)}
                          disabled={isGeneratingSEO === category.id}
                        >
                          <Wand2 className={`w-3 h-3 mr-1 ${isGeneratingSEO === category.id ? "animate-spin" : ""}`} />
                          {isGeneratingSEO === category.id ? "Generating..." : "Magic"}
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
