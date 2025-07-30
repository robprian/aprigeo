"use client"

import { MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactForPriceProps {
  productName?: string
  whatsappNumber?: string
  email?: string
  className?: string
}

export default function ContactForPrice({ 
  productName = "",
  whatsappNumber = "6281234567890",
  email = "info@apriniageosat.co.id",
  className = ""
}: ContactForPriceProps) {
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan produk "${productName}". Bisakah Anda memberikan informasi harga dan ketersediaan stok? Terima kasih.`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const handlePhoneClick = () => {
    window.open(`tel:+${whatsappNumber}`, '_self')
  }

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Inquiry Harga - ${productName}`)
    const body = encodeURIComponent(
      `Halo,\n\nSaya tertarik dengan produk "${productName}".\nMohon informasi mengenai:\n- Harga produk\n- Ketersediaan stok\n- Spesifikasi lengkap\n- Garansi\n\nTerima kasih.`
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self')
  }

  return (
    <div className={`bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
          <MessageCircle className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Hubungi Kami untuk Harga
        </h3>
        <p className="text-sm text-gray-600">
          Tim kami siap membantu Anda dengan penawaran terbaik
        </p>
      </div>

      {/* Contact Options */}
      <div className="space-y-3">
        {/* WhatsApp - Primary */}
        <Button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center space-x-2 h-11"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Chat WhatsApp</span>
        </Button>

        {/* Phone & Email - Secondary */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handlePhoneClick}
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50 flex items-center justify-center space-x-1 h-10"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">Telepon</span>
          </Button>
          
          <Button
            onClick={handleEmailClick}
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center justify-center space-x-1 h-10"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-3 border-t border-green-200">
        <div className="text-xs text-gray-500 text-center space-y-1">
          <div className="flex items-center justify-center space-x-4">
            <span>📞 Konsultasi Gratis</span>
            <span>🚚 Pengiriman Seluruh Indonesia</span>
          </div>
          <div>Respon cepat dalam 1-2 jam kerja</div>
        </div>
      </div>
    </div>
  )
}
