"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Facebook, Twitter, Linkedin, Mail, Link, MessageCircle } from "lucide-react"
import { toast } from "sonner"

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

export default function SocialShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check out this amazing product!",
  description = "Found this great item on GeoTech Store",
  className = "",
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description),
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareData.url}&text=${shareData.title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`,
    whatsapp: `https://wa.me/?text=${shareData.title}%20${shareData.url}`,
    email: `mailto:?subject=${shareData.title}&body=${shareData.description}%0A%0A${shareData.url}`,
  }

  const handleShare = (platform: string) => {
    if (platform === "copy") {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard!")
        })
        .catch(() => {
          toast.error("Failed to copy link")
        })
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], "_blank", "width=600,height=400")
    }
    setIsOpen(false)
  }

  const shareOptions = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "hover:bg-blue-50 hover:text-blue-600" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "hover:bg-sky-50 hover:text-sky-600" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-50 hover:text-blue-700" },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, color: "hover:bg-green-50 hover:text-green-600" },
    { id: "email", name: "Email", icon: Mail, color: "hover:bg-gray-50 hover:text-gray-700" },
    { id: "copy", name: "Copy Link", icon: Link, color: "hover:bg-gray-50 hover:text-gray-700" },
  ]

  return (
    <div className={`relative ${className}`}>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsOpen(false)} />

          {/* Share Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-2">
              <div className="text-sm font-medium text-gray-900 px-3 py-2 border-b border-gray-100">
                Share this item
              </div>
              <div className="mt-2 space-y-1">
                {shareOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleShare(option.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md transition-colors ${option.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      {option.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
