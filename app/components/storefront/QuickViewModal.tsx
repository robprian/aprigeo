"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Heart, ShoppingCart, Star, Minus, Plus, Eye, Share2 } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { useMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  category: string
  rating: number
  reviews: number
  description: string
  features: string[]
  inStock: boolean
  discount?: number
}

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isMobile = useMobile()

  if (!product) return null

  const images = [product.image, product.hoverImage].filter(Boolean) as string[]
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      })
      toast.success(`Added ${product.name} to cart`)
    } catch (error) {
      toast.error("Failed to add to cart")
    } finally {
      setIsLoading(false)
    }
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist")
    }
  }

  const handleClose = () => {
    setQuantity(1)
    setSelectedImage(0)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`${
          isMobile ? "w-[95vw] h-[95vh] max-w-none max-h-none m-2" : "max-w-4xl w-full max-h-[85vh]"
        } p-0 overflow-hidden`}
        hideCloseButton={true}
      >
        <div className="relative h-full flex flex-col">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-md"
            aria-label="Close quick view"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className={`flex ${isMobile ? "flex-col" : "flex-row"} h-full overflow-hidden`}>
            {/* Product Images */}
            <div className={`${isMobile ? "w-full h-64 flex-shrink-0" : "w-1/2"} relative bg-gray-50`}>
              <div className="relative w-full h-full">
                <Image
                  src={images[selectedImage] || product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes={isMobile ? "95vw" : "50vw"}
                  priority
                />
              </div>

              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">-{product.discount}%</Badge>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        selectedImage === index ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className={`${isMobile ? "w-full flex-1" : "w-1/2"} p-4 sm:p-6 overflow-y-auto`}>
              <div className="space-y-4">
                {/* Product Title & Category */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h2 className={`font-bold text-gray-900 ${isMobile ? "text-lg" : "text-xl"} leading-tight`}>
                    {product.name}
                  </h2>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-green-600 ${isMobile ? "text-lg" : "text-xl"}`}>
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Stock Status */}
                <Badge variant={product.inStock ? "default" : "destructive"} className="w-fit">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>

                {/* Description */}
                <p className={`text-gray-600 ${isMobile ? "text-sm" : "text-base"} line-clamp-3`}>
                  {product.description}
                </p>

                {/* Features */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className={`space-y-1 ${isMobile ? "text-sm" : "text-base"}`}>
                    {(isMobile ? product.features.slice(0, 3) : product.features.slice(0, 4)).map((feature, index) => (
                      <li key={index} className="text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-4 pt-4 border-t">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-sm">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="px-3 py-1 min-w-[3rem] text-center text-sm">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex gap-2 ${isMobile ? "flex-col" : "flex-row"}`}>
                    <Button
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isLoading}
                      className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? "w-full" : "flex-1"} h-10`}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <ShoppingCart className="w-4 h-4 mr-2" />
                      )}
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleWishlistToggle}
                      className={`${isMobile ? "w-full" : ""} h-10 ${
                        isWishlisted ? "text-red-500 border-red-500 hover:bg-red-50" : ""
                      }`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Details
                    </Button>

                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
