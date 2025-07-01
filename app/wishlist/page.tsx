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
  },
  {
    id: 3,
    name: "Topcon GT-1200 Robotic",
    price: 32999,
    originalPrice: 35999,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: 5,
    name: "Spectra Precision Laser Level",
    price: 899,
    originalPrice: 999,
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlistItems.length} items in your wishlist</p>
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
            <p className="text-gray-600 mb-6">Items added to your wishlist will be saved here</p>
            <Link href="/shop">
              <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-4 px-6 text-left">Product</th>
                  <th className="py-4 px-6 text-left">Price</th>
                  <th className="py-4 px-6 text-left">Stock Status</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {wishlistItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <Link href={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-green-600">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900">${item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" disabled={!item.inStock}>
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart2 className="w-4 h-4 mr-1" />
                          Compare
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => removeFromWishlist(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </div>
  )
}
