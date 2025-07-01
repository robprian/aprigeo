"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Camera, Smartphone, X, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import Image from "next/image"

interface ARProductPreviewProps {
  product: {
    id: number
    name: string
    image: string
    model3D?: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function ARProductPreview({ product, isOpen, onClose }: ARProductPreviewProps) {
  const [isARSupported, setIsARSupported] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Check if AR is supported
    const checkARSupport = () => {
      if ("xr" in navigator) {
        // @ts-ignore
        navigator.xr
          ?.isSessionSupported("immersive-ar")
          .then((supported: boolean) => {
            setIsARSupported(supported)
          })
          .catch(() => {
            setIsARSupported(false)
          })
      } else {
        setIsARSupported(false)
      }
    }

    checkARSupport()
  }, [])

  const startCamera = async () => {
    setIsLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 })
    setScale(1)
    setRotation(0)
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5))
  }

  const rotateProduct = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <span>AR Preview - {product.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="relative flex-1 bg-black">
          {/* Camera Feed */}
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />

          {/* AR Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative cursor-move"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={200}
                height={200}
                className="drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
                }}
              />
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Starting camera...</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/70 rounded-full px-4 py-2">
            <Button variant="ghost" size="sm" onClick={zoomOut} className="text-white hover:text-green-400">
              <ZoomOut className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={zoomIn} className="text-white hover:text-green-400">
              <ZoomIn className="w-4 h-4" />
            </Button>

            <div className="w-px h-4 bg-white/30"></div>

            <Button variant="ghost" size="sm" onClick={rotateProduct} className="text-white hover:text-green-400">
              <RotateCcw className="w-4 h-4" />
            </Button>

            <div className="w-px h-4 bg-white/30"></div>

            <Button variant="ghost" size="sm" onClick={resetPosition} className="text-white hover:text-green-400">
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-xs">
            <h4 className="font-medium mb-2">AR Instructions:</h4>
            <ul className="text-sm space-y-1">
              <li>• Drag to move the product</li>
              <li>• Use zoom controls to resize</li>
              <li>• Rotate button to change angle</li>
              <li>• Point camera at flat surface</li>
            </ul>
          </div>

          {/* AR Support Status */}
          <div className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isARSupported ? "bg-green-500" : "bg-yellow-500"}`}></div>
              <span className="text-sm">{isARSupported ? "AR Ready" : "Basic AR"}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Move your device to see the product from different angles</span>
            </div>

            <div className="flex space-x-2">
              {isARSupported && (
                <Button variant="outline" size="sm">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Full AR Mode
                </Button>
              )}
              <Button onClick={onClose}>Close Preview</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
