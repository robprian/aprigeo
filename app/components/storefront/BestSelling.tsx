"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"
import QuickViewModal from "./QuickViewModal"
import CartPopup from "./CartPopup"
import { useBestSellingProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"

export default function BestSelling() {
  const [activeTab, setActiveTab] = useState("all")
  const [quickViewProduct, setQuickViewProduct] = useState<number | null>(null)
  const [cartPopupOpen, setCartPopupOpen] = useState(false)
  const [addedProduct, setAddedProduct] = useState<any>(null)

  const { categories } = useCategories()
  const { products, isLoading } = useBestSellingProducts(activeTab === "all" ? undefined : activeTab)

  // Create tabs from categories
  const tabs = [
    { id: "all", label: "All" },
    ...categories.slice(0, 4).map(category => ({
      id: category.slug,
      label: category.name
    }))
  ]

  const filteredProducts = products

  const handleQuickView = (productId: number) => {
    setQuickViewProduct(productId)
  }

  const handleAddToCart = (product: any) => {
    setAddedProduct(product)
    setCartPopupOpen(true)
  }

  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  // Convert API product to component format
  const convertedProducts = filteredProducts.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.compare_price,
    image: product.images[0] || "/placeholder.svg?height=200&width=200",
    rating: product.rating,
    reviews: product.reviews,
    category: product.category?.name,
    badge: product.badge,
    inStock: product.in_stock
  }))

  const selectedProduct = convertedProducts.find((p) => p.id === quickViewProduct)

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Top Best Selling Items</h2>

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

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Products grid */}
      {!isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {convertedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal isOpen={quickViewProduct !== null} onClose={closeQuickView} product={selectedProduct} />
      )}

      {/* Cart Popup */}
      <CartPopup isOpen={cartPopupOpen} onClose={() => setCartPopupOpen(false)} addedProduct={addedProduct} />
    </section>
  )
}
