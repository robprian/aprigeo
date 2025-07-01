"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const categories = ["GPS Receivers", "Total Stations", "Theodolites", "Laser Levels", "Measuring Tools", "Accessories"]
const brands = ["Trimble", "Leica", "Topcon", "Sokkia", "Garmin", "Spectra"]

interface MobileFilterToggleProps {
  onFiltersChange?: (filters: any) => void
}

function MobileFilterToggle({ onFiltersChange }: MobileFilterToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category)

    setSelectedCategories(newCategories)

    if (onFiltersChange) {
      onFiltersChange({
        categories: newCategories,
        brands: selectedBrands,
        priceRange,
        search: searchQuery,
      })
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...selectedBrands, brand] : selectedBrands.filter((b) => b !== brand)

    setSelectedBrands(newBrands)

    if (onFiltersChange) {
      onFiltersChange({
        categories: selectedCategories,
        brands: newBrands,
        priceRange,
        search: searchQuery,
      })
    }
  }

  const handlePriceChange = (newPriceRange: number[]) => {
    setPriceRange(newPriceRange)

    if (onFiltersChange) {
      onFiltersChange({
        categories: selectedCategories,
        brands: selectedBrands,
        priceRange: newPriceRange,
        search: searchQuery,
      })
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)

    if (onFiltersChange) {
      onFiltersChange({
        categories: selectedCategories,
        brands: selectedBrands,
        priceRange,
        search: value,
      })
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 50000])
    setSearchQuery("")

    if (onFiltersChange) {
      onFiltersChange({
        categories: [],
        brands: [],
        priceRange: [0, 50000],
        search: "",
      })
    }
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0) +
    (searchQuery ? 1 : 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden relative" onClick={() => setIsOpen(true)}>
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
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Search */}
          <div>
            <h4 className="font-medium mb-3">Search Products</h4>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">Price Range</h4>
            <Slider value={priceRange} onValueChange={handlePriceChange} max={50000} step={100} className="mb-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <label htmlFor={`mobile-${category}`} className="text-sm cursor-pointer flex-1">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-medium mb-3">Brands</h4>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <label htmlFor={`mobile-${brand}`} className="text-sm cursor-pointer flex-1">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full" onClick={clearAllFilters} disabled={activeFiltersCount === 0}>
              Clear All Filters
            </Button>
          </div>

          {/* Apply Filters */}
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsOpen(false)}>
            Apply Filters ({activeFiltersCount})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilterToggle
