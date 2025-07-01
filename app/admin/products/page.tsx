"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Wand2, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    category: "GPS",
    price: 15999,
    stock: 12,
    status: "Active",
    seo_optimized: true,
  },
  {
    id: 2,
    name: "Leica TS16 Total Station",
    category: "Survey",
    price: 28999,
    stock: 8,
    status: "Active",
    seo_optimized: false,
  },
  {
    id: 3,
    name: "Topcon GT-1200 Robotic",
    category: "Survey",
    price: 32999,
    stock: 5,
    status: "Active",
    seo_optimized: true,
  },
  {
    id: 4,
    name: "Iridium 9575 Satellite Phone",
    category: "Satellite",
    price: 1299,
    stock: 25,
    status: "Active",
    seo_optimized: false,
  },
]

export default function ProductsPage() {
  const [isGeneratingSEO, setIsGeneratingSEO] = useState<number | null>(null)

  const handleGenerateSEO = async (productId: number) => {
    setIsGeneratingSEO(productId)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingSEO(null)
    // Update product SEO status
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Product List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search products..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product Name</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">SEO</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">${product.price.toLocaleString()}</td>
                    <td className="py-3 px-4">{product.stock}</td>
                    <td className="py-3 px-4">
                      <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={product.seo_optimized ? "default" : "outline"}>
                          {product.seo_optimized ? "Optimized" : "Not Optimized"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateSEO(product.id)}
                          disabled={isGeneratingSEO === product.id}
                        >
                          <Wand2 className={`w-3 h-3 mr-1 ${isGeneratingSEO === product.id ? "animate-spin" : ""}`} />
                          {isGeneratingSEO === product.id ? "Generating..." : "Magic"}
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
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
