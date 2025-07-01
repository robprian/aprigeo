"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Star, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock compare data - in a real app, this would come from an API or local storage
const initialCompareItems = [
  {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    price: 15999,
    originalPrice: 17999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 24,
    brand: "Trimble",
    category: "GPS Equipment",
    inStock: true,
    specifications: {
      Tracking: "GPS, GLONASS, Galileo, BeiDou, QZSS, SBAS",
      Channels: "672",
      "RTK Accuracy": "Horizontal: 8 mm + 1 ppm RMS",
      "Tilt Compensation": "IMU-based, calibration-free",
      "Battery Life": "Up to 6 hours",
      Weight: "1.12 kg (2.49 lb)",
      "Operating Temperature": "-40°C to +65°C",
      "Dust/Water Resistance": "IP67",
      Bluetooth: "Bluetooth 4.1",
      "Wi-Fi": "802.11 b/g/n",
      Cellular: "Integrated 4G LTE",
      Memory: "6 GB internal storage",
    },
  },
  {
    id: 2,
    name: "Leica TS16 Total Station",
    price: 28999,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 18,
    brand: "Leica",
    category: "Survey Equipment",
    inStock: true,
    specifications: {
      Tracking: "N/A",
      Channels: "N/A",
      "RTK Accuracy": '1" angular accuracy',
      "Tilt Compensation": "Automatic compensator",
      "Battery Life": "Up to 8 hours",
      Weight: "5.8 kg (12.8 lb)",
      "Operating Temperature": "-20°C to +50°C",
      "Dust/Water Resistance": "IP55",
      Bluetooth: "Bluetooth 4.0",
      "Wi-Fi": "802.11 b/g/n",
      Cellular: "Optional",
      Memory: "8 GB internal storage",
    },
  },
  {
    id: 6,
    name: "Sokkia GRX3 GNSS Receiver",
    price: 9999,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 28,
    brand: "Sokkia",
    category: "GPS Equipment",
    inStock: true,
    specifications: {
      Tracking: "GPS, GLONASS, Galileo, BeiDou, QZSS",
      Channels: "555",
      "RTK Accuracy": "Horizontal: 10 mm + 1 ppm RMS",
      "Tilt Compensation": "Not available",
      "Battery Life": "Up to 5 hours",
      Weight: "0.95 kg (2.1 lb)",
      "Operating Temperature": "-30°C to +60°C",
      "Dust/Water Resistance": "IP67",
      Bluetooth: "Bluetooth 4.0",
      "Wi-Fi": "802.11 b/g/n",
      Cellular: "Optional",
      Memory: "4 GB internal storage",
    },
  },
]

export default function ComparePage() {
  const [compareItems, setCompareItems] = useState(initialCompareItems)

  const removeFromCompare = (id: number) => {
    setCompareItems(compareItems.filter((item) => item.id !== id))
  }

  const clearCompare = () => {
    setCompareItems([])
  }

  // Get all unique specification keys
  const allSpecs = Array.from(new Set(compareItems.flatMap((item) => Object.keys(item.specifications))))

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Compare Products</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compare Products</h1>
            <p className="text-gray-600 mt-1">{compareItems.length} products to compare</p>
          </div>
          {compareItems.length > 0 && (
            <Button variant="outline" className="mt-4 md:mt-0" onClick={clearCompare}>
              Clear All
            </Button>
          )}
        </div>

        {compareItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <div className="w-8 h-8 border-2 border-gray-400 rounded"></div>
            </div>
            <h2 className="text-xl font-medium mb-2">No products to compare</h2>
            <p className="text-gray-600 mb-6">Add products to compare their features and specifications</p>
            <Link href="/shop">
              <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Product Images and Basic Info */}
              <div
                className="grid grid-cols-1 gap-4 mb-8"
                style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
              >
                <div className="font-medium text-gray-900 py-4"></div>
                {compareItems.map((item) => (
                  <div key={item.id} className="text-center border rounded-lg p-4 relative">
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="w-full h-48 relative mb-4">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                    </div>

                    <Link
                      href={`/product/${item.id}`}
                      className="font-medium text-gray-900 hover:text-green-600 block mb-2"
                    >
                      {item.name}
                    </Link>

                    <div className="flex items-center justify-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                    </div>

                    <div className="mb-4">
                      <span className="text-lg font-bold text-gray-900">${item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700" disabled={!item.inStock}>
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Heart className="w-4 h-4 mr-1" />
                        Wishlist
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Basic Information */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Basic Information</h3>
                <div className="border rounded-lg overflow-hidden">
                  {/* Brand */}
                  <div
                    className="grid grid-cols-1 border-b"
                    style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
                  >
                    <div className="bg-gray-50 p-4 font-medium border-r">Brand</div>
                    {compareItems.map((item) => (
                      <div key={item.id} className="p-4 border-r last:border-r-0">
                        {item.brand}
                      </div>
                    ))}
                  </div>

                  {/* Category */}
                  <div
                    className="grid grid-cols-1 border-b"
                    style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
                  >
                    <div className="bg-gray-50 p-4 font-medium border-r">Category</div>
                    {compareItems.map((item) => (
                      <div key={item.id} className="p-4 border-r last:border-r-0">
                        {item.category}
                      </div>
                    ))}
                  </div>

                  {/* Stock Status */}
                  <div
                    className="grid grid-cols-1"
                    style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
                  >
                    <div className="bg-gray-50 p-4 font-medium border-r">Stock Status</div>
                    {compareItems.map((item) => (
                      <div key={item.id} className="p-4 border-r last:border-r-0">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-bold mb-4">Specifications</h3>
                <div className="border rounded-lg overflow-hidden">
                  {allSpecs.map((spec, index) => (
                    <div
                      key={spec}
                      className={`grid grid-cols-1 ${index < allSpecs.length - 1 ? "border-b" : ""}`}
                      style={{ gridTemplateColumns: `200px repeat(${compareItems.length}, 1fr)` }}
                    >
                      <div className="bg-gray-50 p-4 font-medium border-r">{spec}</div>
                      {compareItems.map((item) => (
                        <div key={item.id} className="p-4 border-r last:border-r-0">
                          {item.specifications[spec] || "N/A"}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Shopping */}
        {compareItems.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
