"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Star, ChevronDown, ChevronUp, Minus, Plus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addToRecentlyViewed } from "@/hooks/useRecentlyViewed"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { useCompare } from "@/hooks/useCompare"
import { toast } from "@/lib/toast"
import SocialShare from "@/app/components/storefront/SocialShare"
import ProductImageZoom from "@/app/components/product/ProductImageZoom"
import ProductVideo from "@/app/components/product/ProductVideo"
import Product360View from "@/app/components/product/Product360View"
import ARProductPreview from "@/app/components/product/ARProductPreview"
import ProductComparison from "@/app/components/product/ProductComparison"
import RecentlyViewedProducts from "@/app/components/storefront/RecentlyViewedProducts"

// Sample product data
const products = [
  {
    id: 1,
    name: "Organic Red Cabbage",
    price: 4.99,
    discount: 3.99,
    rating: 4.5,
    category: "Vegetables",
    description:
      "Fresh organic red cabbage grown locally without pesticides. Rich in vitamins and antioxidants. Perfect for salads, slaws, and stir-fries.",
    features: [
      "Organically grown without pesticides",
      "Rich in vitamins C, K, and B6",
      "High in antioxidants",
      "Locally sourced",
      "Harvested at peak ripeness",
    ],
    specifications: {
      weight: "Approx. 500g per head",
      origin: "Local Organic Farm",
      storage: "Refrigerate for up to 2 weeks",
      certification: "Certified Organic",
    },
    images: ["/images/red-cabbage-main.png", "/red-cabbage-side.png", "/placeholder-qez9v.png"],
    stock: 25,
    reviews: [
      {
        id: 1,
        user: "Sarah J.",
        rating: 5,
        date: "2023-05-15",
        comment: "Very fresh and tasty! Will buy again.",
      },
      {
        id: 2,
        user: "Michael T.",
        rating: 4,
        date: "2023-05-10",
        comment: "Good quality cabbage, lasted well in the fridge.",
      },
    ],
    relatedProducts: [2, 3, 4],
    tags: ["organic", "vegetables", "cabbage", "fresh produce"],
  },
  {
    id: 2,
    name: "Organic Broccoli",
    price: 3.49,
    rating: 4.7,
    category: "Vegetables",
    image: "/organic-broccoli.png",
    isNew: true,
  },
  {
    id: 3,
    name: "Fresh Carrots Bundle",
    price: 2.99,
    rating: 4.3,
    category: "Vegetables",
    image: "/fresh-carrots-bundle.png",
    isSale: true,
  },
  {
    id: 4,
    name: "Organic Spinach",
    price: 3.99,
    rating: 4.8,
    category: "Vegetables",
    image: "/organic-spinach.png",
  },
]

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false)
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const { addItem } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const { addToCompare, isInCompare } = useCompare()

  // Find the product based on the ID from the URL
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0]

  // Add to recently viewed when component mounts
  useEffect(() => {
    setIsClient(true)
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image || "/diverse-products-still-life.png",
        category: product.category,
        rating: product.rating,
        discount: product.discount,
        isNew: product.isNew,
        isSale: product.isSale,
      })
    }
  }, [product])

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discount || product.price,
      image: product.images?.[0] || product.image || "/diverse-products-still-life.png",
      quantity,
    })
    toast.success(`${product.name} added to cart`)
  }

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.discount || product.price,
      image: product.images?.[0] || product.image || "/diverse-products-still-life.png",
      category: product.category,
    })
    toast.success(`${product.name} added to wishlist`)
  }

  const handleAddToCompare = () => {
    addToCompare({
      id: product.id,
      name: product.name,
      price: product.discount || product.price,
      image: product.images?.[0] || product.image || "/diverse-products-still-life.png",
      category: product.category,
      rating: product.rating,
    })
    toast.success(`${product.name} added to compare`)
  }

  // Get related products
  const relatedProducts = product.relatedProducts
    ? product.relatedProducts.map((id) => products.find((p) => p.id === id)).filter(Boolean)
    : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={
                product.images?.[activeImage] || product.image || "/placeholder.svg?height=600&width=600&query=product"
              }
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 border rounded ${
                    activeImage === index ? "border-green-500" : "border-gray-200"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Advanced Product Views */}
          <div className="mt-4">
            <Tabs defaultValue="photos" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="360">360° View</TabsTrigger>
                <TabsTrigger value="ar">AR View</TabsTrigger>
              </TabsList>
              <TabsContent value="photos">
                <ProductImageZoom images={product.images || [product.image || "/diverse-products-still-life.png"]} />
              </TabsContent>
              <TabsContent value="video">
                <ProductVideo productName={product.name} />
              </TabsContent>
              <TabsContent value="360">
                <Product360View productName={product.name} />
              </TabsContent>
              <TabsContent value="ar">
                <ARProductPreview productName={product.name} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="mb-6">
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">${product.discount.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                  {Math.round(((product.price - product.discount) / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Description</h3>
              <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                {isDescriptionExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className={`text-gray-600 ${isDescriptionExpanded ? "" : "line-clamp-3"}`}>{product.description}</div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Features</h3>
              <button onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}>
                {isSpecsExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <ul className={`list-disc list-inside text-gray-600 ${isSpecsExpanded ? "" : "line-clamp-3"}`}>
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Specifications</h3>
              <button onClick={() => setIsReviewsExpanded(!isReviewsExpanded)}>
                {isReviewsExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className={`${isReviewsExpanded ? "" : "line-clamp-3"}`}>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {product.specifications &&
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-gray-500 capitalize">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-3 py-2 border-r border-gray-300"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  className="w-12 text-center border-0 focus:ring-0"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                  min="1"
                  max={product.stock}
                />
                <button
                  className="px-3 py-2 border-l border-gray-300"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2" onClick={handleAddToCart}>
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className={`flex-1 gap-2 ${
                  isClient && isInWishlist(product.id) ? "bg-red-50 text-red-600 border-red-200" : ""
                }`}
                onClick={handleAddToWishlist}
              >
                <Heart
                  className={`w-5 h-5 ${isClient && isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`}
                />
                Wishlist
              </Button>
              <Button
                variant="outline"
                className={`flex-1 gap-2 ${
                  isClient && isInCompare(product.id) ? "bg-blue-50 text-blue-600 border-blue-200" : ""
                }`}
                onClick={handleAddToCompare}
              >
                <Share2 className="w-5 h-5" />
                Compare
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Share this product</h3>
            <SocialShare url={`/product/${product.id}`} title={product.name} />
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-gray-600">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <h3>Key Features</h3>
              <ul>
                {product.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                <div className="space-y-4">
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-600 capitalize">{key}</span>
                        <span className="text-gray-900 font-medium">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                <p className="text-gray-600 mb-4">
                  This product is organically grown and certified by local authorities. It is harvested at peak ripeness
                  to ensure the best flavor and nutritional value.
                </p>
                <p className="text-gray-600">
                  Store in a cool, dry place away from direct sunlight. Refrigerate after opening and consume within a
                  few days for best quality.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-8">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.user}</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                </div>
              )}

              <div className="mt-8">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Write a Review</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="faq">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Is this product organic?</h3>
                <p className="text-gray-600">
                  Yes, this product is certified organic and grown without the use of synthetic pesticides or
                  fertilizers.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">How should I store this product?</h3>
                <p className="text-gray-600">
                  For optimal freshness, store in the refrigerator in the vegetable crisper drawer. It will stay fresh
                  for up to 2 weeks when properly stored.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Is this product locally sourced?</h3>
                <p className="text-gray-600">
                  Yes, we source this product from local organic farms within a 100-mile radius whenever possible to
                  ensure freshness and support local agriculture.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Can I freeze this product?</h3>
                <p className="text-gray-600">
                  Yes, you can freeze this product for up to 3 months. We recommend blanching it first for best results
                  when thawed.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Comparison */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Compare with Similar Products</h2>
        <ProductComparison currentProduct={product} similarProducts={relatedProducts} />
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct?.id} className="border border-gray-200 rounded-lg p-4">
              <div className="relative aspect-square mb-3">
                <Image
                  src={
                    relatedProduct?.image ||
                    relatedProduct?.images?.[0] ||
                    "/placeholder.svg?height=300&width=300&query=product" ||
                    "/placeholder.svg"
                  }
                  alt={relatedProduct?.name || ""}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{relatedProduct?.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">${relatedProduct?.price.toFixed(2)}</span>
                <Button size="sm" variant="outline" className="h-8 px-2">
                  <ShoppingBag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed Products */}
      <RecentlyViewedProducts limit={4} />
    </div>
  )
}
