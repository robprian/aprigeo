"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"

const tabs = ["All", "GPS Equipment", "Survey Tools", "Best Sellers", "Total Stations"]

const products = [
  {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    price: 15999,
    originalPrice: undefined,
    image: "/placeholder.svg?height=200&width=200&text=Trimble+R12i",
    rating: 5,
    reviews: 24,
    badge: "FEATURED",
    inStock: true,
    category: "GPS Equipment",
  },
  {
    id: 2,
    name: "Leica TS16 Total Station",
    price: 28999,
    originalPrice: undefined,
    image: "/placeholder.svg?height=200&width=200&text=Leica+TS16",
    rating: 4,
    reviews: 18,
    badge: "NEW",
    inStock: true,
    category: "Total Stations",
  },
  {
    id: 3,
    name: "Topcon GT-1200 Robotic",
    price: 32999,
    originalPrice: 35999,
    image: "/placeholder.svg?height=200&width=200&text=Topcon+GT1200",
    rating: 4,
    reviews: 32,
    badge: "SALE",
    inStock: true,
    category: "Total Stations",
  },
  {
    id: 4,
    name: "Sokkia GRX3 GNSS",
    price: 12999,
    originalPrice: undefined,
    image: "/placeholder.svg?height=200&width=200&text=Sokkia+GRX3",
    rating: 5,
    reviews: 36,
    badge: undefined,
    inStock: true,
    category: "GPS Equipment",
  },
  {
    id: 5,
    name: "Spectra SP80 GNSS",
    price: 18999,
    originalPrice: 21999,
    image: "/placeholder.svg?height=200&width=200&text=Spectra+SP80",
    rating: 4,
    reviews: 29,
    badge: "SALE",
    inStock: true,
    category: "GPS Equipment",
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
              category: "GPS Equipment",
            }}
          />
        ))}
      </div>
    </section>
  )
}
