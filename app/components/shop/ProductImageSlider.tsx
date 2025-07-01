"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ProductImageSliderProps {
  images: string[]
  productName: string
  className?: string
}

export default function ProductImageSlider({ images, productName, className = "" }: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-advance images when hovering
  useEffect(() => {
    if (!isHovered || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 1500) // Faster auto-slide every 1.5 seconds

    return () => clearInterval(interval)
  }, [isHovered, images.length])

  if (images.length === 0) {
    return (
      <div className={`relative aspect-square bg-gray-100 rounded-lg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
      </div>
    )
  }

  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-lg group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCurrentIndex(0) // Reset to first image when not hovering
      }}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex] || "/placeholder.svg?height=300&width=300"}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Dot Indicators - Only show if multiple images and on hover */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
