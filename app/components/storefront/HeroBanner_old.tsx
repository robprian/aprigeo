"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const bannerSlides = [
  {
    id: 1,
    title: "PRECISION AND QUALITY",
    mainText: "Farm Market",
    highlight: "Organic Shop",
    discount: "30%",
    discountText: "Save up to",
    buttonText: "Shop now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-gray-50 to-gray-100",
    image: "/placeholder.svg?height=300&width=300&text=Fresh+Vegetables+Collection",
    decorativeElements: [
      { top: "10", left: "40", size: "16", color: "green-200", opacity: "30" },
      { bottom: "20", left: "20", size: "12", color: "green-200", opacity: "30" },
      { top: "32", left: "60", size: "8", color: "green-200", opacity: "40" },
    ],
  },
  {
    id: 2,
    title: "PRECISION AND QUALITY",
    mainText: "Farm Market",
    highlight: "Organic Shop",
    discount: "30%",
    discountText: "Save up to",
    buttonText: "Shop now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-green-50 to-blue-50",
    image: "/placeholder.svg?height=300&width=300&text=Organic+Fruits+Mix",
    decorativeElements: [
      { top: "15", left: "35", size: "14", color: "blue-200", opacity: "35" },
      { bottom: "25", left: "25", size: "10", color: "blue-200", opacity: "25" },
      { top: "28", left: "55", size: "6", color: "blue-200", opacity: "45" },
    ],
  },
  {
    id: 3,
    title: "PRECISION AND QUALITY",
    mainText: "Farm Market",
    highlight: "Organic Shop",
    discount: "30%",
    discountText: "Save up to",
    buttonText: "Shop now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-orange-50 to-yellow-50",
    image: "/placeholder.svg?height=300&width=300&text=Premium+Organic+Produce",
    decorativeElements: [
      { top: "12", left: "42", size: "18", color: "orange-200", opacity: "28" },
      { bottom: "18", left: "18", size: "14", color: "orange-200", opacity: "32" },
      { top: "35", left: "65", size: "10", color: "orange-200", opacity: "38" },
    ],
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto">
        {/* Large Left Banner with Slider */}
        <div
          className="lg:col-span-2 relative overflow-hidden rounded-lg min-h-[300px] group"
          onMouseEnter={() => {
            setIsAutoPlaying(false)
            setShowControls(true)
          }}
          onMouseLeave={() => {
            setIsAutoPlaying(true)
            setShowControls(false)
          }}
        >
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`min-w-full ${slide.background} p-8 lg:p-10 relative flex items-center min-h-[300px]`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-full">
                  {slide.decorativeElements.map((element, idx) => (
                    <div
                      key={idx}
                      className={`absolute w-${element.size} h-${element.size} border border-${element.color} rounded-full opacity-${element.opacity}`}
                      style={{
                        top: element.top ? `${element.top}%` : "auto",
                        bottom: element.bottom ? `${element.bottom}%` : "auto",
                        left: `${element.left}%`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg">
                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-medium tracking-wider uppercase text-gray-500">{slide.title}</p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                      {slide.mainText}
                      <br />
                      <span className="text-green-600">{slide.highlight}</span>
                    </h1>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-sm text-gray-500">{slide.discountText}</span>
                      <span className="text-4xl font-bold text-orange-500">{slide.discount}</span>
                    </div>
                  </div>

                  <Link href={slide.buttonLink}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-all duration-300 hover:scale-105">
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>

                {/* Product Images */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
                  <div className="relative w-64 h-64">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={`${slide.mainText} ${slide.highlight}`}
                      fill
                      className="object-contain transition-transform duration-700 ease-in-out"
                      priority={index === 0}
                      sizes="256px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Visible on Hover */}
          <div
            className={`absolute inset-0 flex items-center justify-between px-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"} pointer-events-none`}
          >
            <button
              onClick={prevSlide}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 pointer-events-auto"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 pointer-events-auto"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-green-600 w-6" : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
            <div
              className="h-full bg-green-600 transition-all duration-300 ease-linear"
              style={{
                width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Right Side - Two Stacked Banners (Static) */}
        <div className="space-y-6 flex flex-col">
          {/* Top Right Banner */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-100 rounded-lg p-6 relative overflow-hidden flex-1 min-h-[140px]">
            <div className="relative z-10 max-w-[60%]">
              <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">GET EXTRA 50% OFF</p>
              <h2 className="text-xl font-bold text-orange-500 leading-tight mb-2">
                Fresh
                <br />
                Everyday
              </h2>
              <Link href="/shop?category=fresh">
                <Button
                  variant="link"
                  className="text-gray-800 hover:text-green-600 transition-colors p-0 text-sm underline"
                >
                  Shop now
                </Button>
              </Link>
            </div>

            {/* Product Image */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128&text=Fresh+Fruits"
                  alt="Fresh Fruits"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </div>
          </div>

          {/* Bottom Right Banner */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 relative overflow-hidden flex-1 min-h-[140px]">
            <div className="relative z-10 max-w-[60%]">
              <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">HOT THIS WEEK</p>
              <h2 className="text-xl font-bold text-gray-800 leading-tight mb-1">
                Fresh vegetable
                <br />
                <span className="text-green-600">& Fruit</span> basket
              </h2>
              <p className="text-xs text-gray-600">Fresh Packed to order</p>
            </div>

            {/* Product Images */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128&text=Fruit+Basket"
                  alt="Fruit Basket"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
