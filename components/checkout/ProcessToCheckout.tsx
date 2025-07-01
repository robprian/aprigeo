"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, ArrowRight, CreditCard, Tag, X, Percent } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { toast } from "@/lib/toast"

export default function ProcessToCheckout() {
  const { cartItems, getTotalPrice, getDiscountAmount, getFinalPrice, appliedPromo, applyPromo, removePromo } =
    useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const handleProcessToCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Proceeding to checkout...")
      // Navigate to checkout page
      router.push("/checkout")
    } catch (error) {
      toast.error("Failed to proceed to checkout. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.warning("Please enter a promo code")
      return
    }

    setIsApplyingPromo(true)

    try {
      const success = await applyPromo(promoCode.trim())
      if (success) {
        setPromoCode("")
      }
    } catch (error) {
      toast.error("Failed to apply promo code")
    } finally {
      setIsApplyingPromo(false)
    }
  }

  const handleRemovePromo = () => {
    removePromo()
    setPromoCode("")
  }

  const totalAmount = getTotalPrice()
  const discountAmount = getDiscountAmount()
  const finalAmount = getFinalPrice()
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const tax = finalAmount * 0.11 // 11% PPN
  const shipping = finalAmount > 500000 ? 0 : 15000 // Free shipping over 500k
  const grandTotal = finalAmount + tax + shipping

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-green-600" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items Summary */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Items ({itemCount}):</span>
          <span className="font-medium">Rp {totalAmount.toLocaleString()}</span>
        </div>

        {/* Promo Code Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Promo Code</span>
          </div>

          {appliedPromo ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium text-green-800">{appliedPromo.code}</span>
                  <p className="text-xs text-green-600">
                    {appliedPromo.type === "percentage"
                      ? `${appliedPromo.discount}% off`
                      : `Rp ${appliedPromo.discount.toLocaleString()} off`}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemovePromo} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                disabled={isApplyingPromo || !promoCode.trim()}
                className="whitespace-nowrap"
              >
                {isApplyingPromo ? "Applying..." : "Apply"}
              </Button>
            </div>
          )}

          {/* Available Promo Codes Hint */}
          <div className="text-xs text-gray-500">
            Try: <span className="font-mono bg-gray-100 px-1 rounded">WELCOME10</span>,{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">SAVE20K</span>, or{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">NEWUSER</span>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">Rp {totalAmount.toLocaleString()}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount:</span>
              <span className="font-medium text-green-600">-Rp {discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping:</span>
            <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
              {shipping === 0 ? "Free" : `Rp ${shipping.toLocaleString()}`}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (PPN 11%):</span>
            <span className="font-medium">Rp {Math.round(tax).toLocaleString()}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-green-600">Rp {Math.round(grandTotal).toLocaleString()}</span>
          </div>
        </div>

        {/* Free Shipping Notice */}
        {shipping > 0 && totalAmount < 500000 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Add Rp {(500000 - totalAmount).toLocaleString()} more for free shipping! 🚚
            </p>
          </div>
        )}

        {/* Checkout Button */}
        <Button
          onClick={handleProcessToCheckout}
          disabled={isProcessing || cartItems.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
          size="lg"
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

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
          <span>🔒</span>
          <span>Secure checkout with SSL encryption</span>
        </div>
      </CardContent>
    </Card>
  )
}
