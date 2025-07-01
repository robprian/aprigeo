import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"

const gpsProducts = [
  {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    price: 15999,
    originalPrice: 17999,
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=200&width=200",
    features: ["Multi-constellation GNSS", "RTK accuracy", "Long battery life"],
  },
  {
    id: 2,
    name: "Leica GS18 T GNSS RTK Rover",
    price: 18999,
    rating: 4.9,
    reviews: 18,
    image: "/placeholder.svg?height=200&width=200",
    features: ["Tilt compensation", "Visual positioning", "Cloud connectivity"],
  },
  {
    id: 3,
    name: "Topcon HiPer VR GNSS",
    price: 12999,
    rating: 4.7,
    reviews: 32,
    image: "/placeholder.svg?height=200&width=200",
    features: ["Dual frequency", "Bluetooth connectivity", "Rugged design"],
  },
  {
    id: 4,
    name: "Sokkia GRX3 GNSS Receiver",
    price: 9999,
    rating: 4.6,
    reviews: 28,
    image: "/placeholder.svg?height=200&width=200",
    features: ["Multi-GNSS tracking", "Long range radio", "IP67 rating"],
  },
]

export default function GPSPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">GPS Equipment</h1>
        <p className="text-gray-600">Professional GNSS receivers and GPS equipment for surveying and mapping</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gpsProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                <div className="flex items-center mb-2">
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
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>

                <ul className="text-xs text-gray-600 mb-3 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
