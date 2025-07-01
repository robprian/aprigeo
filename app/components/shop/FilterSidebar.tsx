"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FilterSidebarProps {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  selectedCategories: string[]
  selectedBrands: string[]
  selectedPriceRange: [number, number]
  onCategoryChange: (category: string, checked: boolean) => void
  onBrandChange: (brand: string, checked: boolean) => void
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
  className?: string
  isMobile?: boolean
}

export default function FilterSidebar({
  categories,
  brands,
  priceRange,
  selectedCategories,
  selectedBrands,
  selectedPriceRange,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onClearFilters,
  className = "",
  isMobile = false,
}: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [filteredBrands, setFilteredBrands] = useState(brands)
  const [isOpen, setIsOpen] = useState(false)

  // Filter categories and brands based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredCategories(categories.filter((category) => category.toLowerCase().includes(searchQuery.toLowerCase())))
      setFilteredBrands(brands.filter((brand) => brand.toLowerCase().includes(searchQuery.toLowerCase())))
    } else {
      setFilteredCategories(categories)
      setFilteredBrands(brands)
    }
  }, [searchQuery, categories, brands])

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (selectedPriceRange[0] > priceRange[0] || selectedPriceRange[1] < priceRange[1] ? 1 : 0)

  const handleClearFilters = () => {
    onClearFilters()
    setSearchQuery("")
  }

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h4 className="font-medium mb-3">Search Filters</h4>
        <Input
          placeholder="Search categories or brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          value={selectedPriceRange}
          onValueChange={onPriceRangeChange as (value: number[]) => void}
          min={priceRange[0]}
          max={priceRange[1]}
          step={1}
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${selectedPriceRange[0].toLocaleString()}</span>
          <span>${selectedPriceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => onCategoryChange(category, checked as boolean)}
                />
                <label htmlFor={`category-${category}`} className="text-sm cursor-pointer flex-1">
                  {category}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No categories found</p>
          )}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-medium mb-3">Brands</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => onBrandChange(brand, checked as boolean)}
                />
                <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer flex-1">
                  {brand}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No brands found</p>
          )}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t">
        <Button variant="outline" className="w-full" onClick={handleClearFilters} disabled={activeFiltersCount === 0}>
          Clear All Filters
          {activeFiltersCount > 0 && <span className="ml-2">({activeFiltersCount})</span>}
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative" onClick={() => setIsOpen(true)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6">{filterContent}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5" />
        Filters
        {activeFiltersCount > 0 && <span className="text-sm text-gray-500">({activeFiltersCount})</span>}
      </h3>

      {filterContent}
    </div>
  )
}
