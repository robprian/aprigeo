"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { RotateCcw, Play, Pause } from "lucide-react"

interface Product360ViewProps {
  images: string[]
  productName: string
}

export default function Product360View({ images, productName }: Product360ViewProps) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(new Array(images.length).fill(false))
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalFrames = images.length

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames)
      }, 100) // 10 FPS
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, totalFrames])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setIsPlaying(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    const sensitivity = 3
    const frameChange = Math.floor(deltaX / sensitivity)

    if (Math.abs(frameChange) > 0) {
      setCurrentFrame((prev) => {
        let newFrame = prev + frameChange
        if (newFrame < 0) newFrame = totalFrames + newFrame
        if (newFrame >= totalFrames) newFrame = newFrame % totalFrames
        return newFrame
      })
      setStartX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setIsPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaX = e.touches[0].clientX - startX
    const sensitivity = 2
    const frameChange = Math.floor(deltaX / sensitivity)

    if (Math.abs(frameChange) > 0) {
      setCurrentFrame((prev) => {
        let newFrame = prev + frameChange
        if (newFrame < 0) newFrame = totalFrames + newFrame
        if (newFrame >= totalFrames) newFrame = newFrame % totalFrames
        return newFrame
      })
      setStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const resetView = () => {
    setCurrentFrame(0)
    setIsPlaying(false)
  }

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev]
      newLoaded[index] = true
      return newLoaded
    })
  }

  return (
    <div className="relative bg-white rounded-lg border overflow-hidden">
      <div
        ref={containerRef}
        className="relative h-96 md:h-[500px] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 360° Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-150 ${
              index === currentFrame ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - 360° View ${index + 1}`}
              fill
              className="object-contain p-8"
              onLoad={() => handleImageLoad(index)}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Loading Indicator */}
        {!loaded[currentFrame] && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* 360° Badge */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          360°
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/70 rounded-full px-4 py-2">
          <button
            onClick={togglePlayback}
            className="text-white hover:text-green-400 transition-colors"
            aria-label={isPlaying ? "Pause rotation" : "Play rotation"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <div className="w-px h-4 bg-white/30"></div>

          <button
            onClick={resetView}
            className="text-white hover:text-green-400 transition-colors"
            aria-label="Reset to front view"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <div className="w-px h-4 bg-white/30"></div>

          <span className="text-white text-sm">
            {currentFrame + 1}/{totalFrames}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <div
            className="h-full bg-green-500 transition-all duration-150"
            style={{ width: `${((currentFrame + 1) / totalFrames) * 100}%` }}
          ></div>
        </div>

        {/* Drag Instruction */}
        {!isDragging && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm opacity-0 hover:opacity-100 transition-opacity">
              Drag to rotate • Click play to auto-rotate
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
