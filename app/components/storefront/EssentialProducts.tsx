"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "./ProductCard"
import { useProducts } from "@/hooks/useProducts"
import { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/currency"

// Featured Product Component
const FeaturedProduct = ({ product }: { product: Product }) => {
  if (!product) return null

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-green-600 uppercase tracking-wider">GPS Tools Unggulan</h3>
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-2xl font-bold text-gray-900 mt-1 hover:text-green-600">{product.name}</h2>
          </Link>
        </div>

        <div className="relative flex-grow mb-6">
          <Image
            src={product.images[0] || "/placeholder.svg"}
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
                    i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews || 0} reviews)</span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-lg text-gray-500 line-through ml-2">{formatCurrency(product.compare_price)}</span>
            )}
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          {product.short_description && (
            <ul className="space-y-1 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-600">{product.short_description}</span>
              </li>
            </ul>
          )}
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

// Helper function untuk konversi format Product ke ProductCard format
function convertToProductCardFormat(product: Product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.compare_price || undefined,
    image: product.images[0] || "/placeholder.svg",
    images: product.images,
    category: product.category?.name,
    badge: product.badge,
    rating: product.rating,
    reviews: product.reviews,
    inStock: product.in_stock,
  }
}

export default function EssentialProducts() {
  // Fetch data menggunakan hooks
  const { products: featuredProducts, isLoading: featuredLoading } = useProducts({ featured: true, limit: 1 })
  const { products: newArrivals, isLoading: newLoading } = useProducts({
    sort: "created_at",
    order: "desc",
    limit: 4,
  })
  const { products: bestSellers, isLoading: bestLoading } = useProducts({
    sort: "rating",
    order: "desc",
    limit: 4,
  })
  const { products: topRated, isLoading: topLoading } = useProducts({
    sort: "rating", 
    order: "desc",
    limit: 4,
  })

  const loading = featuredLoading || newLoading || bestLoading || topLoading

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="h-96 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">GPS Tools Essential</h2>
            <p className="text-gray-600 mt-1">Peralatan GPS dan surveying terbaik untuk profesional</p>
          </div>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="new">GPS Terbaru</TabsTrigger>
              <TabsTrigger value="best">Terlaris</TabsTrigger>
              <TabsTrigger value="rated">Rating Tinggi</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Featured Product - Always visible */}
            <div className="lg:col-span-1">
              {featuredProducts && featuredProducts.length > 0 && (
                <FeaturedProduct product={featuredProducts[0]} />
              )}
            </div>

            {/* Tab Content */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <TabsContent value="new" className="mt-0 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                  {newArrivals?.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={convertToProductCardFormat(product)} />
                  )) || (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-gray-500">Tidak ada produk GPS terbaru saat ini.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="best" className="mt-0 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                  {bestSellers?.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={convertToProductCardFormat(product)} />
                  )) || (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-gray-500">Tidak ada produk GPS terlaris saat ini.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="rated" className="mt-0 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                  {topRated?.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={convertToProductCardFormat(product)} />
                  )) || (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-gray-500">Tidak ada produk GPS dengan rating tinggi saat ini.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
