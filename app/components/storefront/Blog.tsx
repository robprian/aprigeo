"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFeaturedBlogPosts } from "@/hooks/useBlog"

export default function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(4)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const { posts: blogPosts, isLoading } = useFeaturedBlogPosts()

  const maxSlides = Math.max(0, blogPosts.length - slidesToShow)

  // Handle responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset slide when slidesToShow changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [slidesToShow])

  const nextSlide = () => {
    if (isAnimating || currentSlide >= maxSlides) return
    setIsAnimating(true)
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating || currentSlide <= 0) return
    setIsAnimating(true)
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const slideWidth = 100 / slidesToShow

  return (
    <section className="container mx-auto px-4 py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Latest blog</h2>
          <p className="text-gray-600">The freshest and most exciting news</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 border border-gray-300 hover:bg-green-50 hover:border-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={prevSlide}
            disabled={currentSlide === 0 || isAnimating}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 border border-gray-300 hover:bg-green-50 hover:border-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextSlide}
            disabled={currentSlide >= maxSlides || isAnimating}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Posts */}
      {!isLoading && (
        <div className="overflow-hidden" ref={sliderRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * slideWidth}%)`,
            }}
          >
            {blogPosts.map((post) => (
              <div key={post.id} className="px-3 flex-shrink-0" style={{ width: `${slideWidth}%` }}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.featured_image || "/placeholder.svg"}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Blog</span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold mb-2 group-hover:text-green-600 line-clamp-2 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                        <span>5 min read</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        By {post.author?.first_name} {post.author?.last_name}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile pagination dots */}
      <div className="flex justify-center gap-1 mt-4 md:hidden">
        {Array.from({ length: maxSlides + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => !isAnimating && setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
