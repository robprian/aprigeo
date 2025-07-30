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
    mainText: "GPS Tools",
    highlight: "Professional Grade",
    discount: "30%",
    discountText: "Save up to",
    buttonText: "Shop now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-gray-50 to-gray-100",
    image: "/placeholder.svg?height=300&width=300&text=Professional+GPS+Equipment",
    decorativeElements: [
      { top: "10", left: "40", size: "16", color: "blue-200", opacity: "30" },
      { bottom: "20", left: "20", size: "12", color: "blue-200", opacity: "30" },
      { top: "32", left: "60", size: "8", color: "blue-200", opacity: "40" },
    ],
  },
  {
    id: 2,
    title: "PRECISION AND QUALITY",
    mainText: "Survey Tools",
    highlight: "Industry Leading",
    discount: "25%",
    discountText: "Save up to",
    buttonText: "Shop now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-green-50 to-blue-50",
    image: "/placeholder.svg?height=300&width=300&text=Advanced+Surveying+Equipment",
    decorativeElements: [
      { top: "15", left: "35", size: "14", color: "green-200", opacity: "35" },
      { bottom: "25", left: "25", size: "10", color: "green-200", opacity: "25" },
      { top: "28", left: "55", size: "6", color: "green-200", opacity: "45" },
    ],
  },
  {
    id: 3,
    title: "PRECISION AND QUALITY",
    mainText: "GNSS Receivers",
    highlight: "High Accuracy",
    discount: "20%",
    discountText: "Save up to",
    buttonText: "Shop now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-orange-50 to-red-50",
    image: "/placeholder.svg?height=300&width=300&text=Premium+GNSS+Technology",
    decorativeElements: [
      { top: "8", left: "45", size: "18", color: "orange-200", opacity: "25" },
      { bottom: "30", left: "15", size: "14", color: "orange-200", opacity: "35" },
      { top: "35", left: "65", size: "10", color: "orange-200", opacity: "30" },
    ],
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  const currentBanner = bannerSlides[currentSlide]

  return (
    <div className="relative overflow-hidden">
      <div
        className={`min-h-[400px] md:min-h-[500px] flex items-center transition-all duration-500 ${currentBanner.background}`}
      >
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                  {currentBanner.title}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                  {currentBanner.mainText}
                  <span className="block text-green-600">{currentBanner.highlight}</span>
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium">{currentBanner.discountText}</span>
                  <span className="text-2xl font-bold ml-2">{currentBanner.discount}</span>
                </div>
                <span className="text-gray-600">On GPS and surveying equipment</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href={currentBanner.buttonLink}>{currentBanner.buttonText}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src={currentBanner.image}
                  alt={`${currentBanner.mainText} ${currentBanner.highlight}`}
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-md mx-auto"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              {currentBanner.decorativeElements.map((element, index) => (
                <div
                  key={index}
                  className={`absolute w-${element.size} h-${element.size} bg-${element.color} opacity-${element.opacity} rounded-full`}
                  style={{
                    top: element.top ? `${element.top}%` : undefined,
                    bottom: element.bottom ? `${element.bottom}%` : undefined,
                    left: `${element.left}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-green-600" : "bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Additional Features Section */}
      <div className="bg-white py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=GPS"
                  alt="Professional GPS"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional GPS</h3>
              <p className="text-gray-600">High-precision GPS and GNSS equipment for professional surveying</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=Survey"
                  alt="Survey Equipment"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Survey Equipment</h3>
              <p className="text-gray-600">Complete range of surveying instruments and accessories</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=Support"
                  alt="Expert Support"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional technical support and training services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
