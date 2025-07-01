"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeaturedProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  badge?: "Sale" | "New" | "Hot"
  discount?: number
}

interface CategoryData {
  name: string
  href: string
  icon: string
  description: string
  subcategories: {
    name: string
    href: string
    items: string[]
  }[]
  featuredProducts: FeaturedProduct[]
  promotionalBanner?: {
    title: string
    subtitle: string
    image: string
    href: string
    bgColor: string
  }
}

const megaMenuData: Record<string, CategoryData> = {
  Fruits: {
    name: "Fruits",
    href: "/category/fruits",
    icon: "🍎",
    description: "Fresh, organic fruits delivered daily",
    subcategories: [
      {
        name: "Citrus Fruits",
        href: "/category/fruits/citrus",
        items: ["Oranges", "Lemons", "Limes", "Grapefruits", "Tangerines"],
      },
      {
        name: "Tropical Fruits",
        href: "/category/fruits/tropical",
        items: ["Pineapples", "Mangoes", "Papayas", "Coconuts", "Dragon Fruit"],
      },
      {
        name: "Berries",
        href: "/category/fruits/berries",
        items: ["Strawberries", "Blueberries", "Raspberries", "Blackberries", "Cranberries"],
      },
      {
        name: "Stone Fruits",
        href: "/category/fruits/stone",
        items: ["Peaches", "Plums", "Apricots", "Cherries", "Nectarines"],
      },
    ],
    featuredProducts: [
      {
        id: "1",
        name: "Organic Strawberries",
        price: 4.99,
        originalPrice: 6.99,
        rating: 4.8,
        image: "/placeholder.svg?height=120&width=120&text=Strawberries",
        badge: "Sale",
        discount: 29,
      },
      {
        id: "2",
        name: "Fresh Mangoes",
        price: 3.49,
        rating: 4.9,
        image: "/placeholder.svg?height=120&width=120&text=Mangoes",
        badge: "New",
      },
      {
        id: "3",
        name: "Premium Blueberries",
        price: 5.99,
        rating: 4.7,
        image: "/placeholder.svg?height=120&width=120&text=Blueberries",
        badge: "Hot",
      },
    ],
    promotionalBanner: {
      title: "Summer Fruit Sale",
      subtitle: "Up to 30% off on fresh fruits",
      image: "/placeholder.svg?height=200&width=300&text=Summer+Fruits",
      href: "/category/fruits/sale",
      bgColor: "bg-gradient-to-r from-orange-400 to-red-500",
    },
  },
  Vegetables: {
    name: "Vegetables",
    href: "/category/vegetables",
    icon: "🥕",
    description: "Farm-fresh vegetables for healthy living",
    subcategories: [
      {
        name: "Leafy Greens",
        href: "/category/vegetables/leafy",
        items: ["Spinach", "Lettuce", "Kale", "Arugula", "Swiss Chard"],
      },
      {
        name: "Root Vegetables",
        href: "/category/vegetables/root",
        items: ["Carrots", "Potatoes", "Onions", "Beets", "Radishes"],
      },
      {
        name: "Cruciferous",
        href: "/category/vegetables/cruciferous",
        items: ["Broccoli", "Cauliflower", "Brussels Sprouts", "Cabbage", "Bok Choy"],
      },
      {
        name: "Peppers & Tomatoes",
        href: "/category/vegetables/peppers-tomatoes",
        items: ["Bell Peppers", "Cherry Tomatoes", "Roma Tomatoes", "Jalapeños", "Chili Peppers"],
      },
    ],
    featuredProducts: [
      {
        id: "4",
        name: "Organic Spinach",
        price: 2.99,
        rating: 4.6,
        image: "/placeholder.svg?height=120&width=120&text=Spinach",
        badge: "New",
      },
      {
        id: "5",
        name: "Fresh Broccoli",
        price: 3.49,
        originalPrice: 4.49,
        rating: 4.5,
        image: "/placeholder.svg?height=120&width=120&text=Broccoli",
        badge: "Sale",
        discount: 22,
      },
      {
        id: "6",
        name: "Rainbow Carrots",
        price: 2.79,
        rating: 4.8,
        image: "/placeholder.svg?height=120&width=120&text=Carrots",
        badge: "Hot",
      },
    ],
    promotionalBanner: {
      title: "Organic Vegetables",
      subtitle: "100% pesticide-free guarantee",
      image: "/placeholder.svg?height=200&width=300&text=Organic+Vegetables",
      href: "/category/vegetables/organic",
      bgColor: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
  },
  Drinks: {
    name: "Drinks",
    href: "/category/drinks",
    icon: "🥤",
    description: "Refreshing beverages for every occasion",
    subcategories: [
      {
        name: "Fresh Juices",
        href: "/category/drinks/juices",
        items: ["Orange Juice", "Apple Juice", "Cranberry Juice", "Grape Juice", "Mixed Berry"],
      },
      {
        name: "Smoothies",
        href: "/category/drinks/smoothies",
        items: ["Green Smoothie", "Berry Blast", "Tropical Mix", "Protein Smoothie", "Detox Blend"],
      },
      {
        name: "Tea & Coffee",
        href: "/category/drinks/tea-coffee",
        items: ["Green Tea", "Black Tea", "Herbal Tea", "Cold Brew", "Espresso"],
      },
      {
        name: "Water & Sparkling",
        href: "/category/drinks/water",
        items: ["Spring Water", "Sparkling Water", "Flavored Water", "Coconut Water", "Alkaline Water"],
      },
    ],
    featuredProducts: [
      {
        id: "7",
        name: "Cold Pressed Orange Juice",
        price: 6.99,
        rating: 4.9,
        image: "/placeholder.svg?height=120&width=120&text=Orange+Juice",
        badge: "New",
      },
      {
        id: "8",
        name: "Green Detox Smoothie",
        price: 8.49,
        originalPrice: 9.99,
        rating: 4.7,
        image: "/placeholder.svg?height=120&width=120&text=Green+Smoothie",
        badge: "Sale",
        discount: 15,
      },
      {
        id: "9",
        name: "Premium Coconut Water",
        price: 4.99,
        rating: 4.8,
        image: "/placeholder.svg?height=120&width=120&text=Coconut+Water",
        badge: "Hot",
      },
    ],
    promotionalBanner: {
      title: "Hydration Station",
      subtitle: "Stay refreshed all day long",
      image: "/placeholder.svg?height=200&width=300&text=Fresh+Drinks",
      href: "/category/drinks/hydration",
      bgColor: "bg-gradient-to-r from-blue-400 to-cyan-500",
    },
  },
}

interface MegaMenuProps {
  categoryName: string
  isOpen: boolean
  onClose: () => void
}

export default function MegaMenu({ categoryName, isOpen, onClose }: MegaMenuProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const categoryData = megaMenuData[categoryName]

  if (!categoryData || !isOpen) return null

  const handleAddToCart = (productId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic
    console.log("Added to cart:", productId)
  }

  const handleAddToWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to wishlist logic
    console.log("Added to wishlist:", productId)
  }

  const handleQuickView = (productId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Quick view logic
    console.log("Quick view:", productId)
  }

  return (
    <div
      className="absolute left-0 top-full z-50 w-screen bg-white shadow-2xl border-t border-gray-200"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Category Navigation - 3 columns */}
          <div className="col-span-3">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{categoryData.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{categoryData.name}</h3>
                  <p className="text-sm text-gray-600">{categoryData.description}</p>
                </div>
              </div>
              <Link
                href={categoryData.href}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
              >
                View All {categoryData.name}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              {categoryData.subcategories.map((subcategory) => (
                <div key={subcategory.name}>
                  <Link
                    href={subcategory.href}
                    className="block font-semibold text-gray-900 hover:text-green-600 mb-2 transition-colors"
                  >
                    {subcategory.name}
                  </Link>
                  <ul className="space-y-1">
                    {subcategory.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`${subcategory.href}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Products - 6 columns */}
          <div className="col-span-6">
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Featured Products</h4>
              <p className="text-sm text-gray-600">Handpicked selections from our {categoryData.name.toLowerCase()}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {categoryData.featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-2 left-2 z-10 px-2 py-1 text-xs font-medium rounded ${
                        product.badge === "Sale"
                          ? "bg-red-500 text-white"
                          : product.badge === "New"
                            ? "bg-green-500 text-white"
                            : "bg-orange-500 text-white"
                      }`}
                    >
                      {product.badge}
                      {product.discount && ` -${product.discount}%`}
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Hover Actions */}
                    <div
                      className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                        hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white hover:bg-gray-100"
                        onClick={(e) => handleQuickView(product.id, e)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0 bg-white hover:bg-gray-100"
                        onClick={(e) => handleAddToWishlist(product.id, e)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="w-8 h-8 p-0 bg-green-500 hover:bg-green-600"
                        onClick={(e) => handleAddToCart(product.id, e)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <h5 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h5>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.rating})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Products */}
            <div className="mt-6 text-center">
              <Link
                href={categoryData.href}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                View All {categoryData.name}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Promotional Banner - 3 columns */}
          <div className="col-span-3">
            {categoryData.promotionalBanner && (
              <Link href={categoryData.promotionalBanner.href} className="block group">
                <div
                  className={`relative rounded-lg overflow-hidden h-full min-h-[400px] ${categoryData.promotionalBanner.bgColor} p-6 text-white`}
                >
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold mb-2">{categoryData.promotionalBanner.title}</h4>
                      <p className="text-sm opacity-90 mb-4">{categoryData.promotionalBanner.subtitle}</p>
                    </div>

                    <div className="mt-auto">
                      <Button
                        variant="secondary"
                        className="bg-white text-gray-900 hover:bg-gray-100 group-hover:scale-105 transition-transform"
                      >
                        Shop Now
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-20">
                    <Image
                      src={categoryData.promotionalBanner.image || "/placeholder.svg"}
                      alt={categoryData.promotionalBanner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            )}

            {/* Quick Links */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">Quick Links</h5>
              <div className="space-y-2">
                <Link
                  href={`${categoryData.href}/bestsellers`}
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  Best Sellers
                </Link>
                <Link
                  href={`${categoryData.href}/new-arrivals`}
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  New Arrivals
                </Link>
                <Link
                  href={`${categoryData.href}/on-sale`}
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  On Sale
                </Link>
                <Link
                  href={`${categoryData.href}/organic`}
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  Organic Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
