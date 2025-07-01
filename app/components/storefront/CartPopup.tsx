"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Minus, Plus, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface CartPopupProps {
  isOpen: boolean
  onClose: () => void
  addedProduct: {
    id: number
    name: string
    price: number
    image: string
    quantity?: number
  } | null
}

export default function CartPopup({ isOpen, onClose, addedProduct }: CartPopupProps) {
  const [quantity, setQuantity] = useState(addedProduct?.quantity || 1)

  // Mock cart data
  const cartItems = 2
  const subtotal = 24.0
  const shipping = 19.0
  const total = 43.0
  const freeShippingThreshold = 176.0
  const progressToFreeShipping = (total / freeShippingThreshold) * 100

  const relatedProducts = [
    {
      id: 1,
      name: "Related Product 1",
      price: 15.0,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Related Product 2",
      price: 20.0,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  if (!addedProduct) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-semibold text-center">Successfully added to your cart.</DialogTitle>
          </DialogHeader>

          {/* Added Product */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Image
              src={addedProduct.image || "/placeholder.svg"}
              alt={addedProduct.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{addedProduct.name}</h3>
              <p className="text-sm text-gray-500 mb-2">1KG</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex border rounded overflow-hidden">
                  <button
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input type="text" value={quantity} readOnly className="w-8 text-center border-none text-sm" />
                  <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-sm">×</span>
                <span className="font-medium">${addedProduct.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">${(addedProduct.price * quantity).toFixed(2)}</div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              There are <span className="font-medium text-green-600">{cartItems} items</span> in your cart.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Flat rate: ${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Free Shipping Progress */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Progress value={progressToFreeShipping} className="flex-1 h-2" />
              <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                {Math.round(progressToFreeShipping)}%
              </span>
            </div>
            <p className="text-sm text-center">
              Spend <span className="font-medium text-green-600">${(freeShippingThreshold - total).toFixed(2)}</span>{" "}
              more to reach <span className="font-medium text-red-600">FREE SHIPPING!</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/cart">VIEW CART</Link>
            </Button>
            <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
              <Link href="/checkout">CHECKOUT</Link>
            </Button>
          </div>

          {/* Related Products */}
          <div>
            <h4 className="font-medium mb-3">You may be interested in...</h4>
            <div className="grid grid-cols-2 gap-3">
              {relatedProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
