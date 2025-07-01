"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Minus, Plus, X, Check } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { useMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image: string
  gallery?: string[]
  category?: string
  brand?: string
  description?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  isNew?: boolean
  onSale?: boolean
}

interface ProductQuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addingToCart, setAddingToCart] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isMobile = useMobile()

  if (!product) return null

  const images = product.gallery || [product.image]
  const isWishlisted = isInWishlist(product.id)

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(99, quantity + value))
    setQuantity(newQuantity)
  }

  const handleAddToCart = async () => {
    setAddingToCart(true)
    try {
      await addToCart(product, quantity)
      toast.success(`Added ${quantity} ${quantity > 1 ? "items" : "item"} to cart`, {
        description: product.name,
        action: {
          label: "View Cart",
          onClick: () => (window.location.href = "/cart"),
        },
      })
      setTimeout(() => {
        onClose()
        setQuantity(1)
      }, 1000)
    } catch (error) {
      toast.error("Failed to add to cart")
    } finally {
      setAddingToCart(false)
    }
  }

  const handleWishlistToggle = async () => {
    if (isWishlisted) {
      await removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      await addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden" hideCloseButton>
        <div className="relative flex flex-col md:flex-row max-h-[90vh]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Product Images */}
          <div className="md:w-1/2 bg-gray-50">
            <div className="relative aspect-square">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500 text-white">NEW</Badge>}
              {product.onSale && <Badge className="absolute top-4 right-4 bg-orange-500 text-white">SALE</Badge>}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 p-4 border-t">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 border-2 rounded overflow-hidden ${
                      selectedImage === index ? "border-green-500" : "border-transparent"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Brand */}
              {(product.category || product.brand) && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {product.category && <span>{product.category}</span>}
                  {product.category && product.brand && <span>•</span>}
                  {product.brand && <span>{product.brand}</span>}
                </div>
              )}

              {/* Product Name */}
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {product.reviews && <span className="text-sm text-gray-500">({product.reviews} reviews)</span>}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              {product.description && <p className="text-gray-600 leading-relaxed">{product.description}</p>}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-4">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={addingToCart || !product.inStock}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white h-12"
                >
                  {addingToCart ? (
                    <>
                      <span className="animate-spin mr-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  className={`h-12 ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                {product.inStock ? (
                  <div className="flex items-center text-green-500">
                    <Check className="w-4 h-4 mr-1" />
                    <span>In stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <X className="w-4 h-4 mr-1" />
                    <span>Out of stock</span>
                  </div>
                )}
              </div>

              {/* View Full Details Link */}
              <div className="pt-4 border-t">
                <Link
                  href={`/product/${product.id}`}
                  className="text-green-500 hover:text-green-600 font-medium flex items-center"
                >
                  View full details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
