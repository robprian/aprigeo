"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"

interface ProductImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function ProductImageZoom({ src, alt, width = 500, height = 500 }: ProductImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()

    // Calculate position as percentage
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    // Limit values to stay within bounds
    const boundedX = Math.max(0, Math.min(100, x))
    const boundedY = Math.max(0, Math.min(100, y))

    setPosition({ x: boundedX, y: boundedY })
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  return (
    <div
      className="relative overflow-hidden bg-white rounded-lg"
      style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
      ref={imageRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Regular image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Loading placeholder */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Zoom lens indicator */}
      {isZoomed && (
        <div
          className="absolute pointer-events-none border-2 border-green-500 rounded-full w-16 h-16 -ml-8 -mt-8 z-10"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            display: loaded ? "block" : "none",
          }}
        ></div>
      )}

      {/* Zoomed image */}
      {isZoomed && loaded && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200%",
            zIndex: 20,
          }}
        ></div>
      )}
    </div>
  )
}
