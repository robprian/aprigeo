"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, BarChart2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock wishlist data - in a real app, this would come from an API or local storage
const initialWishlistItems = [
  {
    id: 1,
    name: "Trimble R12i GNSS Receiver",
    price: 15999,
    originalPrice: 17999,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    dateAdded: "2024-01-10",
  },
  {
    id: 3,
    name: "Topcon GT-1200 Robotic",
    price: 32999,
    originalPrice: 35999,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    dateAdded: "2024-01-15",
  },
  {
    id: 5,
    name: "Spectra Precision Laser Level",
    price: 899,
    originalPrice: 999,
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
    dateAdded: "2024-01-20",
  },
  {
    id: 6,
    name: "Sokkia GRX3 GNSS Receiver",
    price: 9999,
    originalPrice: null,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
    dateAdded: "2024-01-22",
  },
]

export default function AccountWishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlistItems.length} items saved for later</p>
        </div>
        {wishlistItems.length > 0 && (
          <Button variant="outline" className="mt-4 md:mt-0" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Items you save will be stored here for easy access</p>
          <Link href="/shop">
            <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <Link
                  href={`/product/${item.id}`}
                  className="font-medium text-gray-900 hover:text-green-600 block mb-2"
                >
                  {item.name}
                </Link>

                <div className="flex items-center mb-2">
                  <span className="font-bold text-gray-900">${item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-4">Added on {new Date(item.dateAdded).toLocaleDateString()}</p>

                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700" disabled={!item.inStock}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Compare
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue Shopping */}
      {wishlistItems.length > 0 && (
        <div className="mt-8 text-center">
          <Link href="/shop">
            <Button variant="outline" className="mr-4">
              Continue Shopping
            </Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700">Add All to Cart</Button>
        </div>
      )}
    </div>
  )
}
