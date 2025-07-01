"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import ProcessToCheckout from "@/components/checkout/ProcessToCheckout"
import { toast } from "@/lib/toast"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart, isLoading } = useCart()
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set())

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = async (id: number) => {
    setRemovingItems((prev) => new Set(prev).add(id))
    try {
      await removeFromCart(id)
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleClearCart = async () => {
    const loadingToast = toast.loading("Clearing cart...")
    try {
      await clearCart()
      toast.success("Cart cleared successfully")
    } catch (error) {
      toast.error("Failed to clear cart")
    } finally {
      // Remove loading toast
      if (loadingToast) {
        // Toast library will handle this automatically
      }
    }
  }

  const totalPrice = getTotalPrice()
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-bounce">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to your cart to get started.</p>
            <Link href="/shop">
              <Button className="bg-green-600 hover:bg-green-700 transition-all duration-200 transform hover:scale-105">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/shop"
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cart Items</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCart}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                >
                  {isLoading ? "Clearing..." : "Clear Cart"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg transition-all duration-300 hover:shadow-md ${
                      removingItems.has(item.id) ? "opacity-50 scale-95" : "opacity-100 scale-100"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInUp 0.5s ease-out forwards",
                    }}
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain transition-transform duration-200 hover:scale-110"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate hover:text-green-600 transition-colors duration-200">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">SKU: {item.id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-lg font-bold text-green-600">Rp {item.price.toLocaleString()}</p>
                        {item.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">Rp {item.originalPrice.toLocaleString()}</p>
                        )}
                      </div>
                      {item.stock && item.stock <= 10 && (
                        <p className="text-xs text-orange-600 mt-1">Only {item.stock} left in stock!</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg bg-white shadow-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
                          disabled={removingItems.has(item.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
                          disabled={removingItems.has(item.id) || (item.stock && item.quantity >= item.stock)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={removingItems.has(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">Rp {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ProcessToCheckout />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
