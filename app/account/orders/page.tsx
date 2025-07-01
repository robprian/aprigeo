"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Package, Truck, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateInvoice } from "@/app/components/account/InvoiceGenerator"
import ReviewModal from "@/app/components/account/ReviewModal"

// Mock order data
const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 15999,
    items: [
      {
        id: 1,
        name: "Trimble R12i GNSS Receiver",
        price: 15999,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shipping: {
      address: "123 Main St, Anytown, ST 12345",
      method: "Express Shipping",
      tracking: "TRK123456789",
      carrier: "FedEx",
      estimatedDelivery: "2024-01-18",
      deliveredDate: "2024-01-17",
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
      subtotal: 15999,
      shipping: 0,
      tax: 1280,
      total: 17279,
    },
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 28999,
    items: [
      {
        id: 2,
        name: "Leica TS16 Total Station",
        price: 28999,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shipping: {
      address: "123 Main St, Anytown, ST 12345",
      method: "Standard Shipping",
      tracking: "TRK987654321",
      carrier: "UPS",
      estimatedDelivery: "2024-01-27",
    },
    payment: {
      method: "Credit Card",
      last4: "5555",
      subtotal: 28999,
      shipping: 0,
      tax: 2320,
      total: 31319,
    },
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-25",
    status: "processing",
    total: 2598,
    items: [
      {
        id: 4,
        name: "Iridium 9575 Satellite Phone",
        price: 1299,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shipping: {
      address: "123 Main St, Anytown, ST 12345",
      method: "Standard Shipping",
      tracking: null,
      estimatedDelivery: "2024-02-01",
    },
    payment: {
      method: "PayPal",
      email: "john.doe@example.com",
      subtotal: 2598,
      shipping: 15,
      tax: 208,
      total: 2821,
    },
  },
  {
    id: "ORD-2024-004",
    date: "2024-01-10",
    status: "cancelled",
    total: 899,
    items: [
      {
        id: 5,
        name: "Spectra Precision Laser Level",
        price: 899,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shipping: {
      address: "123 Main St, Anytown, ST 12345",
      method: "Standard Shipping",
      tracking: null,
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
      subtotal: 899,
      shipping: 15,
      tax: 72,
      total: 986,
    },
    cancellationReason: "Changed mind",
  },
]

const statusConfig = {
  processing: { label: "Processing", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  shipped: { label: "Shipped", color: "bg-blue-100 text-blue-800", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: Package },
}

export default function OrderHistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [isTrackingOpen, setIsTrackingOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || Package
    return <Icon className="w-4 h-4" />
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge className={`${config?.color || "bg-gray-100 text-gray-800"}`}>
        {getStatusIcon(status)}
        <span className="ml-1">{config?.label || status}</span>
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const renderTrackingInfo = () => {
    if (!selectedOrder) return null

    const { shipping, status } = selectedOrder
    const { tracking, carrier, estimatedDelivery, deliveredDate } = shipping

    // Mock tracking events
    const trackingEvents = [
      {
        status: "Delivered",
        date: deliveredDate || new Date().toISOString(),
        location: "Anytown, ST",
        description: "Package delivered",
      },
      {
        status: "Out for Delivery",
        date: new Date(new Date(estimatedDelivery).getTime() - 86400000).toISOString(),
        location: "Anytown, ST",
        description: "Package is out for delivery",
      },
      {
        status: "Arrived at Local Facility",
        date: new Date(new Date(estimatedDelivery).getTime() - 172800000).toISOString(),
        location: "Anytown, ST",
        description: "Package has arrived at local facility",
      },
      {
        status: "In Transit",
        date: new Date(new Date(estimatedDelivery).getTime() - 259200000).toISOString(),
        location: "Distribution Center",
        description: "Package is in transit",
      },
      {
        status: "Shipped",
        date: new Date(new Date(estimatedDelivery).getTime() - 345600000).toISOString(),
        location: "Shipping Origin",
        description: "Package has been shipped",
      },
    ]

    // Filter events based on order status
    let filteredEvents = trackingEvents
    if (status === "shipped") {
      filteredEvents = trackingEvents.slice(2)
    } else if (status === "processing") {
      filteredEvents = [trackingEvents[4]]
    }

    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Carrier</p>
              <p className="font-medium">{carrier || "Not assigned yet"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tracking Number</p>
              <p className="font-medium">{tracking || "Not available yet"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium">{estimatedDelivery ? formatDate(estimatedDelivery) : "Not available yet"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{getStatusBadge(status)}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="font-medium">Tracking History</h3>
          </div>
          <div className="divide-y">
            {status !== "cancelled" ? (
              filteredEvents.map((event, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 mr-3 ${index === 0 ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                      </div>
                      <p className="text-sm text-gray-600">{event.location}</p>
                      <p className="text-sm text-gray-500">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                This order was cancelled. No tracking information available.
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-1">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-sm text-gray-600">Ordered on {formatDate(order.date)}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(order.total)}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <Link href={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-green-600">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-sm text-gray-600">{order.shipping.address}</p>
                    <p className="text-sm text-gray-600 mt-1">Method: {order.shipping.method}</p>
                  </div>
                  <div>
                    {order.shipping.tracking && (
                      <div>
                        <h4 className="font-medium mb-2">Tracking Information</h4>
                        <p className="text-sm text-gray-600">Tracking #: {order.shipping.tracking}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(order)
                      setIsOrderDetailsOpen(true)
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generateInvoice({ order })}>
                    <Download className="w-4 h-4 mr-1" />
                    Download Invoice
                  </Button>
                  {order.shipping.tracking && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order)
                        setIsTrackingOpen(true)
                      }}
                    >
                      <Truck className="w-4 h-4 mr-1" />
                      Track Package
                    </Button>
                  )}
                  {order.status === "delivered" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // For demo, use the first item. In real app, you'd show a product selector
                        setSelectedProduct({
                          id: order.items[0].id,
                          name: order.items[0].name,
                          image: order.items[0].image,
                        })
                        setIsReviewModalOpen(true)
                      }}
                    >
                      Write Review
                    </Button>
                  )}
                  {order.status === "processing" && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">When you place orders, they will appear here</p>
          <Link href="/shop">
            <Button className="bg-green-600 hover:bg-green-700">Start Shopping</Button>
          </Link>
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Order ID: ${selectedOrder.id} - Placed on ${formatDate(selectedOrder.date)}`}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <Tabs defaultValue="items">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
              <TabsContent value="items" className="space-y-4">
                {selectedOrder.items.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(selectedOrder.payment.subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatCurrency(selectedOrder.payment.shipping)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Tax</span>
                    <span>{formatCurrency(selectedOrder.payment.tax)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-medium border-t mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.payment.total)}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-gray-600">{selectedOrder.shipping.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <p className="text-gray-600">{selectedOrder.shipping.method}</p>
                  </div>
                  {selectedOrder.shipping.tracking && (
                    <div>
                      <h3 className="font-medium mb-2">Tracking Information</h3>
                      <p className="text-gray-600">Carrier: {selectedOrder.shipping.carrier}</p>
                      <p className="text-gray-600">Tracking Number: {selectedOrder.shipping.tracking}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setIsOrderDetailsOpen(false)
                          setIsTrackingOpen(true)
                        }}
                      >
                        <Truck className="w-4 h-4 mr-1" />
                        Track Package
                      </Button>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium mb-2">Status</h3>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="payment">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-gray-600">
                      {selectedOrder.payment.method}
                      {selectedOrder.payment.last4 && ` ending in ${selectedOrder.payment.last4}`}
                      {selectedOrder.payment.email && ` (${selectedOrder.payment.email})`}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Payment Summary</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(selectedOrder.payment.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>{formatCurrency(selectedOrder.payment.shipping)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>{formatCurrency(selectedOrder.payment.tax)}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-1">
                        <span>Total</span>
                        <span>{formatCurrency(selectedOrder.payment.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedOrder && generateInvoice({ order: selectedOrder })}>
              <Download className="w-4 h-4 mr-1" />
              Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Package Tracking Dialog */}
      <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Package Tracking</DialogTitle>
            <DialogDescription>{selectedOrder && `Order ID: ${selectedOrder.id}`}</DialogDescription>
          </DialogHeader>
          {renderTrackingInfo()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTrackingOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      {selectedProduct && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false)
            setSelectedProduct(null)
          }}
          product={selectedProduct}
          orderId={selectedOrder?.id || ""}
        />
      )}
    </div>
  )
}
