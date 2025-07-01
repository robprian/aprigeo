"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "./ProductCard"

// Mock product data
const products = {
  featured: {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    price: 15999,
    originalPrice: 17999,
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=400&width=400",
    hoverImage: "/placeholder.svg?height=400&width=400",
    description:
      "The most advanced GNSS receiver with tilt compensation technology, designed for maximum productivity and accuracy in challenging environments.",
    features: [
      "Multi-constellation GNSS support",
      "Tilt compensation technology",
      "ProPoint GNSS engine",
      "Integrated IMU",
      "xFill technology",
    ],
  },
  newArrivals: [
    {
      id: 2,
      name: "Leica GS18 T GNSS RTK Rover",
      price: 18999,
      originalPrice: null,
      rating: 4.9,
      reviews: 18,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 90,
    },
    {
      id: 3,
      name: "Topcon HiPer VR GNSS",
      price: 12999,
      originalPrice: 13999,
      rating: 4.7,
      reviews: 32,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 85,
    },
    {
      id: 4,
      name: "Sokkia GRX3 GNSS Receiver",
      price: 9999,
      originalPrice: null,
      rating: 4.6,
      reviews: 28,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 80,
    },
    {
      id: 5,
      name: "Spectra Precision SP80 GNSS",
      price: 11499,
      originalPrice: 12499,
      rating: 4.5,
      reviews: 22,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: false,
      popularity: 75,
    },
  ],
  bestSellers: [
    {
      id: 6,
      name: "Trimble S7 Total Station",
      price: 24999,
      originalPrice: null,
      rating: 4.9,
      reviews: 36,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 95,
    },
    {
      id: 7,
      name: "Leica TS16 Total Station",
      price: 28999,
      originalPrice: 30999,
      rating: 4.8,
      reviews: 29,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 92,
    },
    {
      id: 8,
      name: "Topcon GT-1200 Robotic",
      price: 32999,
      originalPrice: 35999,
      rating: 4.7,
      reviews: 19,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 88,
    },
    {
      id: 9,
      name: "Sokkia iX-1200 Robotic",
      price: 29999,
      originalPrice: null,
      rating: 4.6,
      reviews: 15,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: false,
      popularity: 82,
    },
  ],
  topRated: [
    {
      id: 10,
      name: "Trimble TSC7 Controller",
      price: 5999,
      originalPrice: 6499,
      rating: 4.9,
      reviews: 42,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 94,
    },
    {
      id: 11,
      name: "Leica CS20 Field Controller",
      price: 6499,
      originalPrice: null,
      rating: 4.8,
      reviews: 38,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 91,
    },
    {
      id: 12,
      name: "Topcon FC-6000 Field Computer",
      price: 4999,
      originalPrice: 5499,
      rating: 4.7,
      reviews: 31,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 87,
    },
    {
      id: 13,
      name: "Spectra Precision Ranger 7",
      price: 4499,
      originalPrice: null,
      rating: 4.6,
      reviews: 27,
      image: "/placeholder.svg?height=300&width=300",
      hoverImage: "/placeholder.svg?height=300&width=300",
      inStock: true,
      popularity: 83,
    },
  ],
}

// Featured Product Component
const FeaturedProduct = ({ product }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-green-600 uppercase tracking-wider">Featured Product</h3>
          <Link href={`/product/${product.id}`}>
            <h2 className="text-2xl font-bold text-gray-900 mt-1 hover:text-green-600">{product.name}</h2>
          </Link>
        </div>

        <div className="relative flex-grow mb-6">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="mx-auto object-contain"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <ul className="space-y-1 mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EssentialProducts() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Essential Products</h2>
            <p className="text-gray-600 mt-1">Top-rated equipment for surveying professionals</p>
          </div>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="best">Best Sellers</TabsTrigger>
              <TabsTrigger value="rated">Top Rated</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Featured Product - Always visible */}
            <div className="lg:col-span-1">
              <FeaturedProduct product={products.featured} />
            </div>

            {/* Tab Content */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <TabsContent value="new" className="mt-0 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                  {products.newArrivals.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="best" className="mt-0 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                  {products.bestSellers.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rated" className="mt-0 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                  {products.topRated.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
