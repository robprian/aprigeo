import { jsPDF } from "jspdf"

interface InvoiceData {
  order: {
    id: string
    date: string
    status: string
    items: Array<{
      id: number
      name: string
      price: number
      quantity: number
    }>
    shipping: {
      address: string
      method: string
    }
    payment: {
      method: string
      last4?: string
      email?: string
      subtotal: number
      shipping: number
      tax: number
      total: number
    }
  }
}

export const generateInvoice = (data: InvoiceData) => {
  const { order } = data
  const doc = new jsPDF()

  // Company Header
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("Elessi", 20, 30)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("GPS Survey Equipment Store", 20, 40)
  doc.text("123 Business Street", 20, 45)
  doc.text("City, State 12345", 20, 50)
  doc.text("Phone: (+01)-800-3456-88", 20, 55)
  doc.text("Email: info@elessi.com", 20, 60)

  // Invoice Title
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("INVOICE", 150, 30)

  // Invoice Details
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Invoice #: ${order.id}`, 150, 40)
  doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 150, 45)
  doc.text(`Status: ${order.status.toUpperCase()}`, 150, 50)

  // Billing Information
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Bill To:", 20, 80)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(order.shipping.address, 20, 90)

  // Items Table Header
  let yPosition = 110
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

  order.items.forEach((item) => {
    const itemTotal = item.price * item.quantity
    doc.text(item.name.substring(0, 40), 20, yPosition)
    doc.text(item.quantity.toString(), 120, yPosition)
    doc.text(`$${item.price.toLocaleString()}`, 140, yPosition)
    doc.text(`$${itemTotal.toLocaleString()}`, 170, yPosition)
    yPosition += 8
  })

  // Totals
  yPosition += 10
  doc.line(120, yPosition, 190, yPosition)
  yPosition += 8

  doc.text("Subtotal:", 120, yPosition)
  doc.text(`$${order.payment.subtotal.toLocaleString()}`, 170, yPosition)
  yPosition += 6

  doc.text("Shipping:", 120, yPosition)
  doc.text(`$${order.payment.shipping.toLocaleString()}`, 170, yPosition)
  yPosition += 6

  doc.text("Tax:", 120, yPosition)
  doc.text(`$${order.payment.tax.toLocaleString()}`, 170, yPosition)
  yPosition += 6

  doc.setFont("helvetica", "bold")
  doc.text("Total:", 120, yPosition)
  doc.text(`$${order.payment.total.toLocaleString()}`, 170, yPosition)

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
  if (order.payment.email) {
    yPosition += 6
    doc.text(`PayPal: ${order.payment.email}`, 20, yPosition)
  }

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "italic")
  doc.text("Thank you for your business!", 20, 270)
  doc.text("For questions about this invoice, contact us at support@elessi.com", 20, 275)

  // Save the PDF
  doc.save(`invoice-${order.id}.pdf`)
}
