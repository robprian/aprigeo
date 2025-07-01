"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, ShoppingBag, Check, ArrowLeft, Lock, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Midtrans integration types
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: any) => void
    }
  }
}

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Indonesia",
  })

  const [paymentMethod, setPaymentMethod] = useState("midtrans")
  const [shippingMethod, setShippingMethod] = useState("standard")

  const subtotal = getTotalPrice()
  const shippingCost = shippingMethod === "express" ? 25000 : shippingMethod === "overnight" ? 50000 : 10000
  const tax = subtotal * 0.11 // 11% PPN for Indonesia
  const total = subtotal + shippingCost + tax

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }

    // Load Midtrans Snap script
    const script = document.createElement("script")
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-dummy")
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [cartItems, router])

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleMidtransPayment = async () => {
    setIsLoading(true)

    try {
      // Create order data for Midtrans
      const orderData = {
        transaction_details: {
          order_id: `ORDER-${Date.now()}`,
          gross_amount: Math.round(total),
        },
        customer_details: {
          first_name: shippingInfo.firstName,
          last_name: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          billing_address: {
            first_name: shippingInfo.firstName,
            last_name: shippingInfo.lastName,
            address: shippingInfo.address,
            city: shippingInfo.city,
            postal_code: shippingInfo.zipCode,
            country_code: "IDN",
          },
          shipping_address: {
            first_name: shippingInfo.firstName,
            last_name: shippingInfo.lastName,
            address: shippingInfo.address,
            city: shippingInfo.city,
            postal_code: shippingInfo.zipCode,
            country_code: "IDN",
          },
        },
        item_details: cartItems.map((item) => ({
          id: item.id.toString(),
          price: Math.round(item.price),
          quantity: item.quantity,
          name: item.name,
        })),
      }

      // In a real app, you would send this to your backend to get the snap token
      // For demo purposes, we'll simulate the payment flow
      const dummySnapToken = "dummy-snap-token-" + Date.now()

      // Simulate Midtrans Snap payment
      if (window.snap) {
        window.snap.pay(dummySnapToken, {
          onSuccess: async (result: any) => {
            console.log("Payment success:", result)
            await clearCart()
            toast.success("Payment successful!")
            router.push("/checkout/success")
          },
          onPending: (result: any) => {
            console.log("Payment pending:", result)
            toast.info("Payment is pending. Please complete your payment.")
          },
          onError: (result: any) => {
            console.log("Payment error:", result)
            toast.error("Payment failed. Please try again.")
          },
          onClose: () => {
            console.log("Payment popup closed")
            toast.info("Payment cancelled")
          },
        })
      } else {
        // Fallback for demo - simulate successful payment
        setTimeout(async () => {
          await clearCart()
          toast.success("Payment successful! (Demo mode)")
          router.push("/checkout/success")
        }, 2000)
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (paymentMethod === "midtrans") {
      await handleMidtransPayment()
    } else {
      // Handle other payment methods
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        await clearCart()
        toast.success("Order placed successfully!")
        router.push("/checkout/success")
      } catch (error) {
        toast.error("Failed to place order. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-xl font-bold">Checkout</h1>
            <div className="flex items-center text-sm text-gray-600">
              <Lock className="w-4 h-4 mr-1" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Shipping", icon: Truck },
              { step: 2, title: "Payment", icon: CreditCard },
              { step: 3, title: "Review", icon: ShoppingBag },
              { step: 4, title: "Complete", icon: Check },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep >= step ? "bg-green-600 border-green-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${currentStep >= step ? "text-green-600" : "text-gray-400"}`}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className="mt-1"
                        placeholder="+62 812 3456 7890"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Province *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Postal Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="pt-4">
                    <Label className="text-base font-medium">Shipping Method</Label>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="mt-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <div>
                              <div className="font-medium">Regular Shipping</div>
                              <div className="text-sm text-gray-600">5-7 business days</div>
                            </div>
                          </Label>
                        </div>
                        <span className="font-medium">Rp 10.000</span>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer">
                            <div>
                              <div className="font-medium">Express Shipping</div>
                              <div className="text-sm text-gray-600">2-3 business days</div>
                            </div>
                          </Label>
                        </div>
                        <span className="font-medium">Rp 25.000</span>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="overnight" id="overnight" />
                          <Label htmlFor="overnight" className="cursor-pointer">
                            <div>
                              <div className="font-medium">Same Day Delivery</div>
                              <div className="text-sm text-gray-600">Same day (Jakarta area only)</div>
                            </div>
                          </Label>
                        </div>
                        <span className="font-medium">Rp 50.000</span>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleNextStep} className="bg-green-600 hover:bg-green-700">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Choose Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="midtrans" id="midtrans" />
                          <Label htmlFor="midtrans" className="cursor-pointer flex items-center">
                            <div>
                              <div className="font-medium">Midtrans Payment Gateway</div>
                              <div className="text-sm text-gray-600">
                                Credit Card, Bank Transfer, E-Wallet, and more
                              </div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                            VISA
                          </div>
                          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                            MC
                          </div>
                          <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">
                            DANA
                          </div>
                          <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                            OVO
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                          <Label htmlFor="bank_transfer" className="cursor-pointer">
                            <div>
                              <div className="font-medium">Bank Transfer</div>
                              <div className="text-sm text-gray-600">Manual bank transfer</div>
                            </div>
                          </Label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="cursor-pointer">
                            <div>
                              <div className="font-medium">Cash on Delivery</div>
                              <div className="text-sm text-gray-600">Pay when you receive the order</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "midtrans" && (
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-start">
                        <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                        <div>
                          <h4 className="font-medium text-blue-900">Secure Payment with Midtrans</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            You will be redirected to Midtrans secure payment page to complete your transaction. We
                            support various payment methods including credit cards, bank transfers, and e-wallets.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back to Shipping
                    </Button>
                    <Button onClick={handleNextStep} className="bg-green-600 hover:bg-green-700">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className="relative w-16 h-16">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain rounded"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Rp {(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div>
                    <h4 className="font-medium mb-3">Shipping Information</h4>
                    <div className="p-3 border rounded-lg bg-gray-50">
                      <p className="font-medium">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{shippingInfo.address}</p>
                      <p className="text-sm text-gray-600">
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p className="text-sm text-gray-600">{shippingInfo.email}</p>
                      <p className="text-sm text-gray-600">{shippingInfo.phone}</p>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h4 className="font-medium mb-3">Payment Method</h4>
                    <div className="p-3 border rounded-lg bg-gray-50">
                      {paymentMethod === "midtrans" && (
                        <div className="flex items-center">
                          <Shield className="w-6 h-6 text-blue-600 mr-2" />
                          <span>Midtrans Payment Gateway</span>
                        </div>
                      )}
                      {paymentMethod === "bank_transfer" && <span>Bank Transfer</span>}
                      {paymentMethod === "cod" && <span>Cash on Delivery</span>}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back to Payment
                    </Button>
                    <Button onClick={handleNextStep} className="bg-green-600 hover:bg-green-700">
                      Place Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Order Confirmation */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Confirm Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Ready to Place Your Order</h3>
                    <p className="text-gray-600 mb-6">
                      By clicking "Place Order", you agree to our terms and conditions and confirm that all information
                      is correct.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Review Order
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Place Order
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain rounded"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">Rp {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}

                  {cartItems.length > 3 && (
                    <p className="text-sm text-gray-600 text-center">+{cartItems.length - 3} more items</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Rp {shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (PPN 11%)</span>
                    <span>Rp {Math.round(tax).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>Rp {Math.round(total).toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Secured by Midtrans</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
