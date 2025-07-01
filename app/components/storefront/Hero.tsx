"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Discover Real",
    subtitle: "Organic Flavors",
    tagline: "PURE AND NATURE",
    discount: "30%",
    image: "/placeholder.svg?height=400&width=800&text=Fresh+Organic+Vegetables",
  },
  {
    id: 2,
    title: "Farm Fresh",
    subtitle: "Vegetables & Fruits",
    tagline: "100% ORGANIC",
    discount: "25%",
    image: "/placeholder.svg?height=400&width=800&text=Farm+Fresh+Selection",
  },
  {
    id: 3,
    title: "Natural Products",
    subtitle: "Healthy Living",
    tagline: "ECO FRIENDLY",
    discount: "20%",
    image: "/placeholder.svg?height=400&width=800&text=Natural+Products",
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay])

  const goToSlide = (index: number) => {
    setActiveSlide(index)
    // Temporarily disable autoplay when manually changing slides
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  const nextSlide = () => {
    goToSlide((activeSlide + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    goToSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Hero Banner with Slider */}
        <div className="lg:col-span-2 relative bg-gray-50 rounded-lg overflow-hidden">
          {/* Slide Content */}
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-start p-12 z-10">
                <div className="max-w-md">
                  <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">{slide.tagline}</div>
                  <h1 className="text-4xl font-bold mb-2">
                    {slide.title}
                    <br />
                    <span className="text-green-600">{slide.subtitle}</span>
                  </h1>
                  <div className="flex items-center mb-6">
                    <span className="text-6xl font-bold text-orange-500">{slide.discount.split("%")[0]}</span>
                    <span className="text-2xl font-bold text-orange-500 ml-1">%</span>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-sm">Shop now</Button>
                </div>
              </div>
              <div className="relative h-80 lg:h-96">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={`${slide.title} ${slide.subtitle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeSlide ? "bg-green-500 w-6" : "bg-white bg-opacity-70"
                } transition-all`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Banners */}
        <div className="flex flex-col gap-6">
          {/* Top Banner */}
          <div className="relative bg-orange-50 rounded-lg overflow-hidden h-44">
            <div className="absolute inset-0 flex items-center justify-start p-6 z-10">
              <div>
                <div className="text-xs uppercase text-orange-500 font-semibold mb-1">GET EXTRA 50% OFF</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Fresh
                  <br />
                  Everyday
                </h3>
                <Link href="/shop" className="text-sm text-green-600 hover:underline font-medium">
                  Shop now
                </Link>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
              <Image
                src="/placeholder.svg?height=180&width=200&text=Fresh+Food"
                alt="Fresh food"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="relative bg-green-50 rounded-lg overflow-hidden h-44">
            <div className="absolute inset-0 flex items-center justify-start p-6 z-10">
              <div>
                <div className="text-xs uppercase text-orange-500 font-semibold mb-1">HOT THIS WEEK</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Fresh <span className="text-green-600">vegetable</span>
                </h3>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  & Fruit <span className="text-gray-600">basket</span>
                </h3>
                <div className="text-xs text-gray-500">Fresh Packed to order</div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
              <Image
                src="/placeholder.svg?height=180&width=200&text=Fruit+Basket"
                alt="Fruit basket"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
