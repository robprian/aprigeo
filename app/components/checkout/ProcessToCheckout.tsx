"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight, CreditCard } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ProcessToCheckout() {
  const { cartItems, getTotalPrice } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcessToCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Navigate to checkout page
      router.push("/checkout")
      toast.success("Proceeding to checkout...")
    } catch (error) {
      toast.error("Failed to proceed to checkout. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const totalAmount = getTotalPrice()
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-900">Cart Summary</span>
        </div>
        <div className="text-sm text-gray-600">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">Rp {totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping:</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span className="text-green-600">Rp {totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleProcessToCheckout}
        disabled={isProcessing || cartItems.length === 0}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Process to Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      {cartItems.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-2">Add items to your cart to proceed</p>
      )}
    </div>
  )
}
