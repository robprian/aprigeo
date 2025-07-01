"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCategories } from "@/hooks/useCategories"

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  
  const { categories, isLoading } = useCategories()

  // Check if scrolling is needed and update arrow visibility
  const checkScrollPosition = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition()
    window.addEventListener("resize", checkScrollPosition)
    return () => window.removeEventListener("resize", checkScrollPosition)
  }, [])

  // Scroll handlers
  const scrollLeft = () => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    setTimeout(checkScrollPosition, 500) // Check after animation
  }

  const scrollRight = () => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    setTimeout(checkScrollPosition, 500) // Check after animation
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Survey Equipment</h2>

        <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          {/* Loading State */}
          {isLoading && (
            <div className="flex gap-4 pb-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex flex-col items-center flex-shrink-0 w-24 animate-pulse">
                  <div className="w-16 h-16 mb-2 bg-gray-200 rounded-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          )}

          {/* Scroll Container */}
          {!isLoading && (
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 scroll-smooth"
              onScroll={checkScrollPosition}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex flex-col items-center flex-shrink-0 group w-24"
                >
                  <div className="w-16 h-16 mb-2 bg-white rounded-full overflow-hidden shadow-sm flex items-center justify-center">
                    <Image
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      width={60}
                      height={60}
                      className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="text-xs text-center text-gray-700 group-hover:text-green-600 line-clamp-2">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Navigation Arrows - Only visible on hover or mobile */}
          {(showLeftArrow || isHovering) && (
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 transition-opacity ${
                showLeftArrow ? "opacity-100" : "opacity-0"
              } ${isHovering ? "md:opacity-100" : "md:opacity-0"}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {(showRightArrow || isHovering) && (
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 transition-opacity ${
                showRightArrow ? "opacity-100" : "opacity-0"
              } ${isHovering ? "md:opacity-100" : "md:opacity-0"}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
