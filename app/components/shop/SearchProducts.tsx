"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  brand?: string
}

interface SearchProductsProps {
  products: Product[]
  placeholder?: string
  onSearch: (results: Product[] | null) => void
}

export default function SearchProducts({
  products,
  placeholder = "Search products...",
  onSearch,
}: SearchProductsProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle search
  useEffect(() => {
    if (debouncedQuery.trim()) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(debouncedQuery.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 5)) // Show max 5 suggestions
      onSearch(filtered)
      setIsOpen(true)
    } else {
      setSuggestions([])
      onSearch(null)
      setIsOpen(false)
    }
  }, [debouncedQuery, products, onSearch])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery("")
    onSearch(null)
    setIsOpen(false)
  }

  const handleSuggestionClick = (product: Product) => {
    setQuery(product.name)
    setIsOpen(false)
    onSearch([product])
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="pl-10 pr-10 h-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2 px-2">
              {suggestions.length} suggestion{suggestions.length !== 1 ? "s" : ""}
            </div>
            {suggestions.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">{product.name}</div>
                  <div className="text-xs text-gray-500">
                    {product.category} • ${product.price.toFixed(2)}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-100 p-2">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block w-full text-center text-sm text-green-500 hover:text-green-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              View all results for "{query}"
            </Link>
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
          <div className="p-4 text-center text-gray-500">
            <div className="text-sm">No products found for "{query}"</div>
            <div className="text-xs mt-1">Try searching for something else</div>
          </div>
        </div>
      )}
    </div>
  )
}
