"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { useFeaturedProducts } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import { toast } from "@/hooks/use-toast"

export default function FeaturedProduct() {
  const [quantity, setQuantity] = useState(1)
  const { products, isLoading } = useFeaturedProducts()
  const { addToCart } = useCart()

  const featuredProduct = products[0] // Get the first featured product

  const handleAddToCart = async () => {
    if (!featuredProduct) return
    
    try {
      await addToCart(featuredProduct, quantity)
      toast({
        title: "Added to Cart",
        description: `${featuredProduct.name} has been added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-pulse bg-gray-300 aspect-video rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </section>
    )
  }

  if (!featuredProduct) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <Link href={`/product/${featuredProduct.slug}`}>
            <Image
              src={featuredProduct.images?.[0] || "/placeholder.svg?height=400&width=500"}
              alt={featuredProduct.name}
              width={500}
              height={400}
              className="rounded-lg object-contain"
            />
          </Link>
        </div>

        <div>
          <div className="text-sm text-gray-500 uppercase mb-2">
            {featuredProduct.brand?.name} • {featuredProduct.category?.name} • PROFESSIONAL GRADE
          </div>
          <Link href={`/product/${featuredProduct.slug}`}>
            <h2 className="text-3xl font-bold mb-4 hover:text-green-600 transition-colors">
              {featuredProduct.name}
            </h2>
          </Link>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  featuredProduct.rating && i < Math.floor(featuredProduct.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({featuredProduct.reviews || 0} review{(featuredProduct.reviews || 0) !== 1 ? 's' : ''})
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-green-600">${featuredProduct.price?.toFixed(2)}</span>
              {featuredProduct.compare_price && (
                <span className="ml-3 text-xl text-gray-400 line-through">
                  ${featuredProduct.compare_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {featuredProduct.short_description && (
            <div className="mb-6">
              <p className="text-gray-600">{featuredProduct.short_description}</p>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex border rounded overflow-hidden">
              <button 
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                onClick={decrementQuantity}
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity} 
                className="w-12 text-center border-none" 
                readOnly 
              />
              <button 
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>

            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={handleAddToCart}
              disabled={!featuredProduct.in_stock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {featuredProduct.in_stock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
