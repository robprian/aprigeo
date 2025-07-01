"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { searchProducts } from "@/lib/meilisearch"
import { useDebounce } from "@/hooks/use-debounce"

interface Product {
  id: number
  name: string
  price: number
  image?: string
  category?: string
  brand?: string
}

interface SearchWithSuggestionsProps {
  placeholder?: string
  className?: string
}

export default function SearchWithSuggestions({
  placeholder = "I'm shopping for...",
  className = "",
}: SearchWithSuggestionsProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [processingTime, setProcessingTime] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  // Real-time search with Meilisearch
  useEffect(() => {
    const searchWithMeilisearch = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([])
        setProcessingTime(0)
        return
      }

      setIsLoading(true)

      try {
        const { hits, processingTimeMs } = await searchProducts(debouncedQuery, {
          limit: 8,
          attributesToHighlight: ["name", "category", "brand"],
        })

        setSuggestions(hits as Product[])
        setProcessingTime(processingTimeMs)
      } catch (error) {
        console.error("Search error:", error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    searchWithMeilisearch()
  }, [debouncedQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(true)
  }

  const handleClear = () => {
    setQuery("")
    setSuggestions([])
    setIsOpen(false)
  }

  const handleSuggestionClick = () => {
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-4 pr-20 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClear}
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </Button>
          )}
          <Button
            size="sm"
            className="rounded-full bg-white hover:bg-gray-100 border border-gray-300 h-8 w-8 p-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (query || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
              <span className="mt-2 block">Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <div>
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Products ({suggestions.length})</span>
                {processingTime > 0 && <span className="text-xs text-gray-400">{processingTime}ms</span>}
              </div>
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                  onClick={handleSuggestionClick}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.category || product.brand}</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">${product.price.toLocaleString()}</span>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="p-4 text-center text-gray-500">
              <span>No products found for "{query}"</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
