"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BannerData {
  id: number
  title: string
  subtitle: string
  description: string
  image_url: string
  button_text: string
  button_link: string
  discount_percentage: number
  background_color: string
  text_color: string
  position_order: number
}

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  tagline: string
  discount: string
  image: string
  buttonText: string
  buttonLink: string
  background: string
}

// Default slides as fallback (GPS/Survey themed)
const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Precision GPS",
    subtitle: "Professional Tools",
    tagline: "SURVEY GRADE ACCURACY",
    discount: "15%",
    image: "/placeholder.svg?height=400&width=800&text=GPS+Survey+Equipment",
    buttonText: "Shop Now",
    buttonLink: "/products",
    background: "from-orange-50 to-orange-100",
  },
  {
    id: 2,
    title: "Modern Survey",
    subtitle: "Technology Solutions",
    tagline: "INDUSTRY LEADING",
    discount: "20%",
    image: "/placeholder.svg?height=400&width=800&text=Survey+Technology",
    buttonText: "Explore",
    buttonLink: "/shop",
    background: "from-blue-50 to-blue-100",
  },
  {
    id: 3,
    title: "Professional",
    subtitle: "GPS Equipment",
    tagline: "TRUSTED BRANDS",
    discount: "0%",
    image: "/placeholder.svg?height=400&width=800&text=Professional+GPS",
    buttonText: "View Catalog",
    buttonLink: "/brands",
    background: "from-green-50 to-green-100",
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides)
  const [loading, setLoading] = useState(true)

  // Transform database banner to hero slide format
  const transformBannerData = (banners: BannerData[]): HeroSlide[] => {
    return banners.map((banner) => ({
      id: banner.id,
      title: banner.subtitle.split(' ').slice(0, 2).join(' '), // First 2 words
      subtitle: banner.subtitle.split(' ').slice(2).join(' ') || banner.description.split(' ').slice(0, 2).join(' '), // Remaining words or description
      tagline: banner.title.toUpperCase(),
      discount: banner.discount_percentage > 0 ? `${banner.discount_percentage}%` : "0%",
      image: banner.image_url || "/placeholder.svg?height=400&width=800&text=GPS+Equipment",
      buttonText: banner.button_text,
      buttonLink: banner.button_link,
      background: banner.background_color,
    }))
  }

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners')
        if (response.ok) {
          const banners: BannerData[] = await response.json()
          if (banners.length > 0) {
            setHeroSlides(transformBannerData(banners))
          }
        }
      } catch (error) {
        console.error('Error fetching banners:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay && heroSlides.length > 0) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, heroSlides.length])

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
              className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-r ${slide.background} ${
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
                  {slide.discount !== "0%" && (
                    <div className="flex items-center mb-6">
                      <span className="text-6xl font-bold text-orange-500">{slide.discount.split("%")[0]}</span>
                      <span className="text-2xl font-bold text-orange-500 ml-1">%</span>
                    </div>
                  )}
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-sm">
                    <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                  </Button>
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
