"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

export default function Recommendations() {
  const [activeTab, setActiveTab] = useState("all")
  
  const { categories } = useCategories()
  const { products, isLoading } = useProducts({
    page: 1,
    limit: 6,
    category: activeTab === "all" ? undefined : activeTab,
    sort: "rating",
    order: "desc"
  })

  // Create tabs from categories
  const tabs = [
    { id: "all", label: "All" },
    ...categories.slice(0, 4).map(category => ({
      id: category.slug,
      label: category.name
    }))
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Recommendations</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-8 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-4 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "text-green-600 border-b-2 border-green-600" : "text-gray-600 hover:text-green-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                originalPrice: product.compare_price,
                image: product.images?.[0] || "/placeholder.svg?height=200&width=200",
                rating: product.rating || 0,
                reviews: product.reviews || 0,
                badge: product.is_featured ? "FEATURED" : undefined,
                inStock: product.in_stock,
                category: product.category?.name,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
