"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Truck, Package, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { formatCurrency } from "@/lib/currency"
import { motion } from "framer-motion"
import PageTransition from "@/components/ui/page-transition"
import { jsPDF } from "jspdf"

export default function OrdersPage() {
  const { orders = [] } = useStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "default"
      case "Shipped":
        return "secondary"
      case "Processing":
        return "outline"
      case "Pending":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "destructive"
      case "Refunded":
        return "secondary"
      default:
        return "outline"
    }
  }

  const generateInvoicePDF = (order: any) => {
    const doc = new jsPDF()

    // Company Header
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("GeoTech Store", 20, 30)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("GPS Survey Equipment Store", 20, 40)
    doc.text("Jl. Teknologi No. 123", 20, 45)
    doc.text("Jakarta Selatan, DKI Jakarta 12560", 20, 50)
    doc.text("Phone: (+62) 21-1234-5678", 20, 55)
    doc.text("Email: info@geotech.co.id", 20, 60)

    // Invoice Title
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("INVOICE", 150, 30)

    // Invoice Details
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Invoice #: ${order.id}`, 150, 40)
    doc.text(`Date: ${new Date(order.date).toLocaleDateString("id-ID")}`, 150, 45)
    doc.text(`Status: ${order.status.toUpperCase()}`, 150, 50)

    // Customer Information
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Bill To:", 20, 80)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(order.customer, 20, 90)
    doc.text(order.email, 20, 95)
    doc.text(order.shipping_address, 20, 100)

    // Items Table Header
    let yPosition = 120
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Item", 20, yPosition)
    doc.text("Qty", 120, yPosition)
    doc.text("Price", 140, yPosition)
    doc.text("Total", 170, yPosition)

    // Draw line under header
    doc.line(20, yPosition + 2, 190, yPosition + 2)

    // Items
    yPosition += 10
    doc.setFont("helvetica", "normal")

    order.items_detail.forEach((item: any) => {
      const itemTotal = item.price * item.quantity
      doc.text(item.name.substring(0, 40), 20, yPosition)
      doc.text(item.quantity.toString(), 120, yPosition)
      doc.text(formatCurrency(item.price), 140, yPosition)
      doc.text(formatCurrency(itemTotal), 170, yPosition)
      yPosition += 8
    })

    // Totals
    yPosition += 10
    doc.line(120, yPosition, 190, yPosition)
    yPosition += 8

    doc.text("Subtotal:", 120, yPosition)
    doc.text(formatCurrency(order.payment.subtotal), 170, yPosition)
    yPosition += 6

    doc.text("Shipping:", 120, yPosition)
    doc.text(formatCurrency(order.payment.shipping), 170, yPosition)
    yPosition += 6

    doc.text("Tax (10%):", 120, yPosition)
    doc.text(formatCurrency(order.payment.tax), 170, yPosition)
    yPosition += 6

    doc.setFont("helvetica", "bold")
    doc.text("Total:", 120, yPosition)
    doc.text(formatCurrency(order.payment.total), 170, yPosition)

    // Payment Information
    yPosition += 20
    doc.setFontSize(12)
    doc.text("Payment Information:", 20, yPosition)

    yPosition += 8
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Method: ${order.payment.method}`, 20, yPosition)
    if (order.payment.last4) {
      yPosition += 6
      doc.text(`Card ending in: ${order.payment.last4}`, 20, yPosition)
    }

    // Footer
    doc.setFontSize(8)
    doc.setFont("helvetica", "italic")
    doc.text("Terima kasih atas kepercayaan Anda!", 20, 270)
    doc.text("Untuk pertanyaan mengenai invoice ini, hubungi kami di support@geotech.co.id", 20, 275)

    // Save the PDF
    doc.save(`invoice-${order.id}.pdf`)
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage customer orders and fulfillment</p>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Shipped</p>
                    <p className="text-2xl font-bold">987</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Processing</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold">91</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order Management</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search orders..." className="pl-10 w-64" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mobile view */}
            <div className="block md:hidden space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                      <p className="text-sm font-medium mt-1">{formatCurrency(order.total)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{order.items} items</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <Badge variant={getPaymentStatusColor(order.payment_status)}>{order.payment_status}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => generateInvoicePDF(order)}>
                        <Download className="w-3 h-3 mr-1" />
                        Invoice
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop view */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.items} items</td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getPaymentStatusColor(order.payment_status)}>{order.payment_status}</Badge>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" onClick={() => generateInvoicePDF(order)}>
                              <Download className="w-3 h-3 mr-1" />
                              Invoice
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm">
                              <Truck className="w-3 h-3 mr-1" />
                              Ship
                            </Button>
                          </motion.div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
