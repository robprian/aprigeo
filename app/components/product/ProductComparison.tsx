"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star, Check, Minus, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import { useCompare } from "@/hooks/useCompare"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  specifications?: { name: string; value: string }[]
  features?: string[]
  inStock: boolean
}

interface ProductComparisonProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductComparison({ isOpen, onClose }: ProductComparisonProps) {
  const { compareItems, removeFromCompare, clearCompare } = useCompare()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])

  // Mock product data - in real app, fetch from API
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Trimble R12i GNSS Receiver",
      price: 15999,
      originalPrice: 17999,
      image: "/placeholder.svg?height=300&width=300&text=Trimble+R12i",
      rating: 4.8,
      reviews: 24,
      category: "GPS Equipment",
      brand: "Trimble",
      inStock: true,
      specifications: [
        { name: "Tracking", value: "GPS, GLONASS, Galileo, BeiDou" },
        { name: "Channels", value: "672" },
        { name: "RTK Accuracy", value: "8 mm + 1 ppm RMS" },
        { name: "Battery Life", value: "6 hours" },
        { name: "Weight", value: "1.12 kg" },
      ],
      features: ["Tilt Compensation", "ProPoint Technology", "Rugged Design", "Long Battery Life"],
    },
    {
      id: 2,
      name: "Leica TS16 Total Station",
      price: 28999,
      image: "/placeholder.svg?height=300&width=300&text=Leica+TS16",
      rating: 4.9,
      reviews: 18,
      category: "Survey Equipment",
      brand: "Leica",
      inStock: true,
      specifications: [
        { name: "Tracking", value: "Laser Technology" },
        { name: "Channels", value: "N/A" },
        { name: "RTK Accuracy", value: "1 mm + 1.5 ppm" },
        { name: "Battery Life", value: "8 hours" },
        { name: "Weight", value: "5.2 kg" },
      ],
      features: ["PowerSearch", "ATRplus", "Captivate Software", "Wireless Connectivity"],
    },
    {
      id: 3,
      name: "Topcon GT-1200 Robotic",
      price: 32999,
      originalPrice: 35999,
      image: "/placeholder.svg?height=300&width=300&text=Topcon+GT1200",
      rating: 4.7,
      reviews: 12,
      category: "Survey Equipment",
      brand: "Topcon",
      inStock: false,
      specifications: [
        { name: "Tracking", value: "Robotic Technology" },
        { name: "Channels", value: "N/A" },
        { name: "RTK Accuracy", value: "2 mm + 2 ppm" },
        { name: "Battery Life", value: "10 hours" },
        { name: "Weight", value: "6.1 kg" },
      ],
      features: ["RC-5 Remote", "LongLink Communications", "Hybrid Positioning", "TopSURV Software"],
    },
  ]

  useEffect(() => {
    // Filter products based on compare items
    const filteredProducts = mockProducts.filter((product) => compareItems.some((item) => item.id === product.id))
    setProducts(filteredProducts)
  }, [compareItems])

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product, 1)
      toast.success(`${product.name} added to cart`)
    } catch (error) {
      toast.error("Failed to add to cart")
    }
  }

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product)
    toast.success(`${product.name} added to wishlist`)
  }

  const handleRemoveFromCompare = (productId: number) => {
    removeFromCompare(productId)
    toast.success("Product removed from comparison")
  }

  const getAllSpecifications = () => {
    const allSpecs = new Set<string>()
    products.forEach((product) => {
      product.specifications?.forEach((spec) => allSpecs.add(spec.name))
    })
    return Array.from(allSpecs)
  }

  const getSpecValue = (product: Product, specName: string) => {
    return product.specifications?.find((spec) => spec.name === specName)?.value || "N/A"
  }

  if (products.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Product Comparison</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Minus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No products to compare</h3>
            <p className="text-gray-600 mb-4">Add products to comparison to see them here</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Compare Products ({products.length})</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={clearCompare}>
                Clear All
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-auto flex-1">
          <div className="p-6">
            {/* Product Images and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white border rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromCompare(product.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="relative h-48 mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-green-600">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <span className="text-sm text-gray-600">{product.brand}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToWishlist(product)}
                      className={isInWishlist(product.id) ? "text-red-500" : ""}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications Comparison */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Specifications Comparison</h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Specification</th>
                      {products.map((product) => (
                        <th key={product.id} className="text-left py-3 px-4 font-medium min-w-[200px]">
                          {product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getAllSpecifications().map((specName) => (
                      <tr key={specName} className="border-b">
                        <td className="py-3 px-4 font-medium text-gray-700">{specName}</td>
                        {products.map((product) => (
                          <td key={product.id} className="py-3 px-4">
                            {getSpecValue(product, specName)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Features Comparison */}
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Features Comparison</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id}>
                    <h4 className="font-medium mb-3">{product.name}</h4>
                    <ul className="space-y-2">
                      {product.features?.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
