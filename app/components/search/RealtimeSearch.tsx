"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Clock, Tag, Building2, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/currency"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchSuggestion {
  products: Array<{
    id: number
    name: string
    slug: string
    price: number
    image: string
    category: string
    brand: string
    type: 'product'
  }>
  categories: Array<{
    id: number
    name: string
    slug: string
    type: 'category'
  }>
  brands: Array<{
    id: number
    name: string
    slug: string
    type: 'brand'
  }>
}

interface RealtimeSearchProps {
  className?: string
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function RealtimeSearch({ 
  className = "", 
  placeholder = "Search products, categories, brands...",
  onSearch 
}: RealtimeSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion>({
    products: [],
    categories: [],
    brands: []
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery)
    } else {
      setSuggestions({ products: [], categories: [], brands: [] })
      setIsLoading(false)
    }
  }, [debouncedQuery])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)
    
    if (value.length >= 2) {
      setIsLoading(true)
      setIsOpen(true)
    } else {
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  // Fetch suggestions from API
  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}&limit=5`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.suggestions)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (finalQuery.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        finalQuery,
        ...recentSearches.filter(s => s !== finalQuery)
      ].slice(0, 5)
      
      setRecentSearches(newRecentSearches)
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches))
      
      // Navigate to search results
      router.push(`/shop?search=${encodeURIComponent(finalQuery)}`)
      setIsOpen(false)
      setQuery("")
      
      if (onSearch) {
        onSearch(finalQuery)
      }
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'product') {
      router.push(`/product/${suggestion.slug}`)
    } else if (suggestion.type === 'category') {
      router.push(`/categories/${suggestion.slug}`)
    } else if (suggestion.type === 'brand') {
      router.push(`/brands/${suggestion.slug}`)
    }
    setIsOpen(false)
    setQuery("")
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = suggestions.products.length + suggestions.categories.length + suggestions.brands.length

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => prev < totalItems - 1 ? prev + 1 : -1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > -1 ? prev - 1 : totalItems - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0) {
        const allSuggestions = [
          ...suggestions.products,
          ...suggestions.categories,
          ...suggestions.brands
        ]
        handleSuggestionClick(allSuggestions[selectedIndex])
      } else {
        handleSearch()
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const allSuggestions = [
    ...suggestions.products,
    ...suggestions.categories,
    ...suggestions.brands
  ]

  const hasResults = suggestions.products.length > 0 || suggestions.categories.length > 0 || suggestions.brands.length > 0
  const showRecentSearches = query.length < 2 && recentSearches.length > 0 && isOpen

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {showRecentSearches && (
            <div className="p-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {hasResults && (
            <>
              {/* Products */}
              {suggestions.products.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Products
                  </div>
                  {suggestions.products.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className={`block w-full text-left p-3 hover:bg-gray-50 rounded transition-colors ${
                        selectedIndex === index ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.category} • {formatCurrency(product.price)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Categories */}
              {suggestions.categories.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Categories
                  </div>
                  {suggestions.categories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => handleSuggestionClick(category)}
                      className={`block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors ${
                        selectedIndex === suggestions.products.length + index ? 'bg-blue-50' : ''
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Brands */}
              {suggestions.brands.length > 0 && (
                <div className="p-3">
                  <div className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Brands
                  </div>
                  {suggestions.brands.map((brand, index) => (
                    <button
                      key={brand.id}
                      onClick={() => handleSuggestionClick(brand)}
                      className={`block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors ${
                        selectedIndex === suggestions.products.length + suggestions.categories.length + index ? 'bg-blue-50' : ''
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              )}

              {/* View All Results */}
              {query.length >= 2 && (
                <div className="p-3 border-t border-gray-100">
                  <button
                    onClick={() => handleSearch()}
                    className="w-full px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    View all results for "{query}"
                  </button>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {query.length >= 2 && !isLoading && !hasResults && (
            <div className="p-6 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <div className="text-sm">No results found for "{query}"</div>
              <div className="text-xs text-gray-400 mt-1">Try different keywords or check your spelling</div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && query.length >= 2 && (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <div className="text-sm text-gray-500">Searching...</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
