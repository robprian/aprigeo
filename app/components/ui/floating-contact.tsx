"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Phone, X, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FloatingContactProps {
  whatsappNumber?: string
  companyName?: string
  position?: "bottom-right" | "bottom-left"
}

export default function FloatingContact({ 
  whatsappNumber = "6281234567890", 
  companyName = "Aprinia Geosat",
  position = "bottom-right" 
}: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000) // Show after 2 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Halo ${companyName}, saya tertarik dengan produk GPS/Survey equipment Anda. Bisakah Anda membantu saya?`)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const handlePhoneClick = () => {
    window.open(`tel:+${whatsappNumber}`, '_self')
  }

  const positionClasses = position === "bottom-right" 
    ? "bottom-6 right-6" 
    : "bottom-6 left-6"

  if (!isVisible) return null

  return (
    <div className={`fixed ${positionClasses} z-50 flex flex-col items-end space-y-3`}>
      {/* Expanded Contact Options */}
      {isOpen && (
        <Card className="w-80 shadow-2xl border-green-200 animate-in slide-in-from-bottom-5 duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-800">Customer Service Online</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-3">
                Butuh bantuan? Tim kami siap membantu Anda!
              </div>
              
              {/* WhatsApp Option */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-start space-x-3 h-12"
              >
                <MessageCircle className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Chat via WhatsApp</div>
                  <div className="text-xs opacity-90">Respon cepat & langsung</div>
                </div>
              </Button>

              {/* Phone Option */}
              <Button
                onClick={handlePhoneClick}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 flex items-center justify-start space-x-3 h-12"
              >
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Telepon Langsung</div>
                  <div className="text-xs text-gray-500">Konsultasi produk</div>
                </div>
              </Button>

              {/* Operating Hours */}
              <div className="text-xs text-gray-500 text-center pt-2 border-t">
                <div>Jam Operasional:</div>
                <div>Senin - Jumat: 08:00 - 17:00 WIB</div>
                <div>Sabtu: 08:00 - 12:00 WIB</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Floating Button */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          size="lg"
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </Button>
        
        {/* Pulse Animation */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        )}
        
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </div>
    </div>
  )
}
