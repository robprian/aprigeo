"use client"

import { useState } from "react"
import { ChevronDown, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "../components/storefront/ProductCard"
import QuickViewModal from "../components/storefront/QuickViewModal"
import Link from "next/link"
import Image from "next/image"

// Mock data for products
const products = [
  {
    id: 1,
    name: "Cherry Tomatoes",
    price: 12.0,
    originalPrice: null,
    rating: 5,
    reviews: 24,
    image: "/placeholder.svg?height=300&width=300&text=Cherry+Tomatoes",
    images: [
      "/placeholder.svg?height=300&width=300&text=Cherry+Tomatoes+1",
      "/placeholder.svg?height=300&width=300&text=Cherry+Tomatoes+2",
      "/placeholder.svg?height=300&width=300&text=Cherry+Tomatoes+3",
    ],
    badge: null,
    inStock: true,
    category: "vegetables",
  },
  {
    id: 2,
    name: "Violet Cauliflower",
    price: 30.0,
    originalPrice: null,
    rating: 4,
    reviews: 18,
    image: "/placeholder.svg?height=300&width=300&text=Violet+Cauliflower",
    images: [
      "/placeholder.svg?height=300&width=300&text=Violet+Cauliflower+1",
      "/placeholder.svg?height=300&width=300&text=Violet+Cauliflower+2",
    ],
    badge: "new",
    inStock: true,
    category: "vegetables",
  },
  {
    id: 3,
    name: "Red Onion",
    price: 10.0,
    originalPrice: null,
    rating: 4,
    reviews: 32,
    image: "/placeholder.svg?height=300&width=300&text=Red+Onion",
    images: ["/placeholder.svg?height=300&width=300&text=Red+Onion"],
    badge: null,
    inStock: true,
    category: "vegetables",
  },
  {
    id: 4,
    name: "Red Cabbage",
    price: 15.0,
    originalPrice: null,
    rating: 4,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300&text=Red+Cabbage",
    images: [
      "/placeholder.svg?height=300&width=300&text=Red+Cabbage+1",
      "/placeholder.svg?height=300&width=300&text=Red+Cabbage+2",
    ],
    badge: null,
    inStock: true,
    category: "vegetables",
  },
  {
    id: 5,
    name: "Organic Lemon",
    price: 20.0,
    originalPrice: null,
    rating: 5,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=300&text=Organic+Lemon",
    images: ["/placeholder.svg?height=300&width=300&text=Organic+Lemon"],
    badge: "sale",
    inStock: true,
    category: "fruits",
  },
  {
    id: 6,
    name: "Organic Alexamole",
    price: 18.0,
    originalPrice: null,
    rating: 4,
    reviews: 35,
    image: "/placeholder.svg?height=300&width=300&text=Organic+Alexamole",
    images: ["/placeholder.svg?height=300&width=300&text=Organic+Alexamole"],
    badge: null,
    inStock: true,
    category: "vegetables",
  },
  {
    id: 7,
    name: "Orange Cauliflower",
    price: 16.0,
    originalPrice: null,
    rating: 4,
    reviews: 22,
    image: "/placeholder.svg?height=300&width=300&text=Orange+Cauliflower",
    images: ["/placeholder.svg?height=300&width=300&text=Orange+Cauliflower"],
    badge: null,
    inStock: true,
    category: "vegetables",
  },
  {
    id: 8,
    name: "Plum Tomato",
    price: 15.0,
    originalPrice: null,
    rating: 4,
    reviews: 19,
    image: "/placeholder.svg?height=300&width=300&text=Plum+Tomato",
    images: ["/placeholder.svg?height=300&width=300&text=Plum+Tomato"],
    badge: null,
    inStock: true,
    category: "vegetables",
  },
]

const categories = [
  { name: "Milk & Creams", image: "/placeholder.svg?height=80&width=80&text=Milk", href: "/category/milk-creams" },
  { name: "Fruits", image: "/placeholder.svg?height=80&width=80&text=Fruits", href: "/category/fruits" },
  { name: "Vegetables", image: "/placeholder.svg?height=80&width=80&text=Vegetables", href: "/category/vegetables" },
  { name: "Nut Gifts", image: "/placeholder.svg?height=80&width=80&text=Nuts", href: "/category/nut-gifts" },
  { name: "Nut & Seeds", image: "/placeholder.svg?height=80&width=80&text=Seeds", href: "/category/nut-seeds" },
  {
    name: "Fresh Tomatoes",
    image: "/placeholder.svg?height=80&width=80&text=Tomatoes",
    href: "/category/fresh-tomatoes",
  },
]

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("latest")
  const [quickViewProduct, setQuickViewProduct] = useState<number | null>(null)

  const handleQuickView = (productId: number) => {
    setQuickViewProduct(productId)
  }

  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  const selectedProduct = products.find((p) => p.id === quickViewProduct)

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Organics</h1>
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-green-500">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Organics</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="flex flex-col items-center group">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-orange-200 transition-colors">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm text-gray-700 text-center group-hover:text-green-500">{category.name}</span>
                </Link>
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
            <span className="text-gray-600">Filter by:</span>
            <button className="text-gray-700 hover:text-green-500 flex items-center gap-1">
              Categories <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-gray-700 hover:text-green-500 flex items-center gap-1">
              Price <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-gray-700 hover:text-green-500 flex items-center gap-1">
              Status <ChevronDown className="w-4 h-4" />
            </button>
            <span className="text-gray-600">20 results</span>
          </div>

          {/* Right side - Sort and View */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
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

        {/* Products Grid */}
        <div
          className={`grid gap-6 mb-12 ${
            viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-12">
          <button className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
            1
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm hover:bg-gray-300">
            2
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm hover:bg-gray-300">
            3
          </button>
        </div>

        {/* Recommended Products */}
        <div className="bg-gray-50 py-12 -mx-4 px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Products</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={`rec-${product.id}`} product={product} onQuickView={handleQuickView} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal isOpen={quickViewProduct !== null} onClose={closeQuickView} product={selectedProduct} />
      )}
    </div>
  )
}
