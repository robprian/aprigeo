"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"

const tabs = ["All", "Fruits & Vegetables", "Meat & Seafood", "Best Sellers", "Pet Foods"]

const products = [
  {
    id: 1,
    name: "Cherry Tomatoes",
    price: 8.5,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Cherry+Tomatoes",
    rating: 5,
    reviews: 24,
    badge: "SALE",
  },
  {
    id: 2,
    name: "Violet Cauliflower",
    price: 19.0,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Violet+Cauliflower",
    rating: 4,
    reviews: 18,
    badge: "NEW",
  },
  {
    id: 3,
    name: "Red Onion",
    price: 5.0,
    originalPrice: 7.0,
    image: "/placeholder.svg?height=200&width=200&text=Red+Onion",
    rating: 5,
    reviews: 12,
    badge: null,
  },
  {
    id: 4,
    name: "Red Cabbage",
    price: 12.0,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Red+Cabbage",
    rating: 4,
    reviews: 35,
    badge: null,
  },
  {
    id: 5,
    name: "Organic Lemon",
    price: 20.0,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Organic+Lemon",
    rating: 5,
    reviews: 42,
    badge: "SALE",
  },
  {
    id: 6,
    name: "Organic Avocado",
    price: 8.5,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200&text=Organic+Avocado",
    rating: 4,
    reviews: 28,
    badge: null,
  },
]

export default function Recommendations() {
  const [activeTab, setActiveTab] = useState("All")

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Recommendations</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-8 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-4 text-sm font-medium transition-colors ${
              activeTab === tab ? "text-green-600 border-b-2 border-green-600" : "text-gray-600 hover:text-green-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              inStock: true,
              category: "Organic Food",
            }}
          />
        ))}
      </div>
    </section>
  )
}
