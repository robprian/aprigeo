"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Heart, ShoppingBag, Star, ChevronDown, ChevronUp, Minus, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addToRecentlyViewed } from "@/hooks/useRecentlyViewed"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { useCompare } from "@/hooks/useCompare"
import { toast } from "@/lib/toast"
import { formatCurrency } from "@/lib/currency"
import SocialShare from "@/app/components/storefront/SocialShare"
import RecentlyViewedProducts from "@/app/components/storefront/RecentlyViewedProducts"

interface Product {
  id: number
  name: string
  slug: string
  price: number
  original_price?: number
  description: string
  specifications: string
  images: string[]
  stock: number
  category_id: number
  brand_id: number
  category: {
    name: string
    slug: string
  }
  brand: {
    name: string
    slug: string
  }
  rating: number
  review_count: number
  features: string[]
  tags: string[]
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  return <ProductPageClient slug={resolvedParams.slug} />
}

function ProductPageClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showReviews, setShowReviews] = useState(false)
  
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCompare, isInCompare } = useCompare()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/slug/${slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        setProduct(data)
        
        // Add to recently viewed
        addToRecentlyViewed(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-300 rounded"></div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      image: product.images[0] || "/placeholder.jpg",
      inStock: product.stock > 0,
      stock: product.stock
    }
    addToCart(cartProduct, quantity)
    toast.success("Product added to cart!")
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist(product)
      toast.success("Added to wishlist!")
    }
  }

  const handleAddToCompare = () => {
    addToCompare(product)
    toast.success("Added to comparison!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-600 mb-6">
        <a href="/" className="hover:text-green-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/shop" className="hover:text-green-600">Shop</a>
        <span className="mx-2">/</span>
        <a href={`/categories/${product.category.slug}`} className="hover:text-green-600">
          {product.category.name}
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage] || "/placeholder.jpg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image || "/placeholder.jpg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.review_count} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Brand: <a href={`/brands/${product.brand.slug}`} className="text-green-600 hover:underline">
                  {product.brand.name}
                </a>
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-green-600">
              {formatCurrency(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xl text-gray-500 line-through">
                {formatCurrency(product.original_price)}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleToggleWishlist}>
              <Heart className={`w-5 h-5 mr-2 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
              {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
            
            <Button variant="outline" onClick={handleAddToCompare}>
              Compare
            </Button>
            
            <SocialShare 
              url={`${window.location.origin}/product/${product.slug}`}
              title={product.name}
              description={product.description}
            />
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.review_count})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.specifications || 'No specifications available.' }} />
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600">Reviews feature coming soon!</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <div className="prose max-w-none">
              <h3>Shipping Information</h3>
              <ul>
                <li>Free shipping on orders over $50</li>
                <li>Standard delivery: 3-5 business days</li>
                <li>Express delivery: 1-2 business days (additional charges apply)</li>
                <li>International shipping available</li>
              </ul>
              
              <h3>Returns Policy</h3>
              <ul>
                <li>30-day return policy</li>
                <li>Items must be in original condition</li>
                <li>Return shipping costs may apply</li>
                <li>Refunds processed within 5-7 business days</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recently Viewed Products */}
      <div className="mt-12">
        <RecentlyViewedProducts />
      </div>
    </div>
  )
}
