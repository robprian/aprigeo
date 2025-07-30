import jsPDF from 'jspdf'
import { formatCurrency } from '@/lib/currency'

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

interface InvoiceSettings {
  company_name: string
  company_address: string
  company_phone: string
  company_email: string
  footer_text: string
  footer_support_text: string
  logo_url: string
}

// Fetch invoice settings
const getInvoiceSettings = async (): Promise<InvoiceSettings> => {
  try {
    const response = await fetch('/api/admin/invoice-settings')
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Error fetching invoice settings:', error)
  }
  
  // Fallback to default settings
  return {
    company_name: 'Aprinia Geosat',
    company_address: 'Jl. Raya Survey No. 123, Jakarta',
    company_phone: '(+62) 21-1234-5678',
    company_email: 'info@apriniageosat.com',
    footer_text: 'Thank you for choosing Aprinia Geosat!',
    footer_support_text: 'For support or questions about this invoice, contact us at support@apriniageosat.com',
    logo_url: '/logo-aprinia-geosat.png'
  }
}

export const generateInvoice = async (data: InvoiceData) => {
  const { order } = data
  const settings = await getInvoiceSettings()
  const doc = new jsPDF()

  // Set background color for header
  doc.setFillColor(240, 248, 255) // Light blue background
  doc.rect(0, 0, 210, 70, "F")

  // Company Header with logo space
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(30, 58, 138) // Dark blue
  doc.text(settings.company_name, 20, 30)

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(75, 85, 99) // Gray
  doc.text("Professional GPS & Survey Equipment", 20, 40)
  doc.text(settings.company_address, 20, 48)
  doc.text(`Phone: ${settings.company_phone}`, 20, 56)
  doc.text(`Email: ${settings.company_email}`, 20, 64)

  // Invoice Title with background
  doc.setFillColor(30, 58, 138) // Dark blue
  doc.rect(140, 15, 50, 25, "F")
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255) // White text
  doc.text("INVOICE", 150, 32)

  // Invoice Details
  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(75, 85, 99) // Gray
  doc.text(`Invoice #: ${order.id}`, 150, 50)
  doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 150, 58)
  doc.text(`Status: ${order.status.toUpperCase()}`, 150, 66)

  // Reset color for content
  doc.setTextColor(0, 0, 0)

  // Billing Information with styled header
  doc.setFillColor(249, 250, 251) // Light gray background
  doc.rect(15, 80, 180, 30, "F")
  doc.setDrawColor(229, 231, 235) // Border color
  doc.rect(15, 80, 180, 30, "S")

  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(30, 58, 138) // Dark blue
  doc.text("Bill To:", 20, 92)

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(75, 85, 99) // Gray
  doc.text(order.shipping.address, 20, 103)

  // Items Table with enhanced styling
  let yPosition = 125
  
  // Table header with background
  doc.setFillColor(30, 58, 138) // Dark blue
  doc.rect(15, yPosition - 8, 180, 15, "F")
  
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255) // White text
  doc.text("Item Description", 20, yPosition)
  doc.text("Qty", 120, yPosition)
  doc.text("Unit Price", 140, yPosition)
  doc.text("Total", 170, yPosition)

  // Items with alternating row colors
  yPosition += 12
  doc.setFont("helvetica", "normal")
  doc.setTextColor(0, 0, 0)

  order.items.forEach((item, index) => {
    // Alternating row background
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251) // Light gray
      doc.rect(15, yPosition - 6, 180, 10, "F")
    }
    
    const itemTotal = item.price * item.quantity
    doc.text(item.name.substring(0, 35), 20, yPosition)
    doc.text(item.quantity.toString(), 125, yPosition)
    doc.text(formatCurrency(item.price), 145, yPosition)
    doc.text(formatCurrency(itemTotal), 175, yPosition)
    yPosition += 10
  })

  // Totals section with styling
  yPosition += 15
  doc.setDrawColor(30, 58, 138)
  doc.setLineWidth(1)
  doc.line(120, yPosition, 190, yPosition)
  yPosition += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Subtotal:", 130, yPosition)
  doc.text(formatCurrency(order.payment.subtotal), 175, yPosition)
  yPosition += 8

  doc.text("Shipping:", 130, yPosition)
  doc.text(formatCurrency(order.payment.shipping), 175, yPosition)
  yPosition += 8

  doc.text("Tax:", 130, yPosition)
  doc.text(formatCurrency(order.payment.tax), 175, yPosition)
  yPosition += 10

  // Total with background
  doc.setFillColor(30, 58, 138)
  doc.rect(125, yPosition - 6, 70, 12, "F")
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.text("TOTAL:", 130, yPosition)
  doc.text(formatCurrency(order.payment.total), 175, yPosition)

  // Payment Information with styling
  yPosition += 25
  doc.setFillColor(249, 250, 251)
  doc.rect(15, yPosition - 5, 180, 25, "F")
  doc.setDrawColor(229, 231, 235)
  doc.rect(15, yPosition - 5, 180, 25, "S")

  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(30, 58, 138)
  doc.text("Payment Information:", 20, yPosition + 3)

  yPosition += 12
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(75, 85, 99)
  doc.text(`Payment Method: ${order.payment.method}`, 20, yPosition)
  if (order.payment.last4) {
    yPosition += 6
    doc.text(`Card ending in: ****${order.payment.last4}`, 20, yPosition)
  }
  if (order.payment.email) {
    yPosition += 6
    doc.text(`PayPal Account: ${order.payment.email}`, 20, yPosition)
  }

  // Professional footer
  doc.setFillColor(30, 58, 138)
  doc.rect(0, 270, 210, 27, "F")
  
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.text(settings.footer_text, 20, 282)
  
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text(settings.footer_support_text, 20, 290)

  // Save the PDF
  doc.save(`${settings.company_name.replace(/\s+/g, '-')}-Invoice-${order.id}.pdf`)
}
