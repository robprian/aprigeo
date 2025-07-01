"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const categoriesData = [
  {
    name: "Fruits & Vegetables",
    image: "/placeholder.svg?height=40&width=40&text=🥕",
    subCategories: [
      { name: "Fresh Fruits", href: "/category/fresh-fruits" },
      { name: "Fresh Vegetables", href: "/category/fresh-vegetables" },
      { name: "Herbs & Seasonings", href: "/category/herbs-seasonings" },
      { name: "Packaged Produce", href: "/category/packaged-produce" },
      { name: "Exotic Fruits & Vegetables", href: "/category/exotic" },
    ],
  },
  {
    name: "Breakfast & Dairy",
    image: "/placeholder.svg?height=40&width=40&text=🥛",
    subCategories: [
      { name: "Milk & Cream", href: "/category/milk-cream" },
      { name: "Butter & Margarine", href: "/category/butter" },
      { name: "Eggs", href: "/category/eggs" },
      { name: "Cheese", href: "/category/cheese" },
      { name: "Yogurt", href: "/category/yogurt" },
    ],
  },
  {
    name: "Meat & Seafood",
    image: "/placeholder.svg?height=40&width=40&text=🥩",
    subCategories: [
      { name: "Chicken", href: "/category/chicken" },
      { name: "Beef & Lamb", href: "/category/beef-lamb" },
      { name: "Fish & Seafood", href: "/category/fish" },
      { name: "Pork", href: "/category/pork" },
      { name: "Sausages", href: "/category/sausages" },
    ],
  },
  {
    name: "Beverages",
    image: "/placeholder.svg?height=40&width=40&text=🧃",
    subCategories: [
      { name: "Water", href: "/category/water" },
      { name: "Juice", href: "/category/juice" },
      { name: "Soft Drinks", href: "/category/soft-drinks" },
      { name: "Tea & Coffee", href: "/category/tea-coffee" },
      { name: "Energy Drinks", href: "/category/energy-drinks" },
    ],
  },
  {
    name: "Bakery & Snacks",
    image: "/placeholder.svg?height=40&width=40&text=🍞",
    subCategories: [
      { name: "Bread", href: "/category/bread" },
      { name: "Cookies & Cakes", href: "/category/cookies-cakes" },
      { name: "Chips & Crisps", href: "/category/chips" },
      { name: "Chocolate & Candy", href: "/category/chocolate" },
      { name: "Nuts & Dried Fruits", href: "/category/nuts" },
    ],
  },
  {
    name: "Organic & Health",
    image: "/placeholder.svg?height=40&width=40&text=🌱",
    subCategories: [
      { name: "Organic Food", href: "/category/organic-food" },
      { name: "Gluten Free", href: "/category/gluten-free" },
      { name: "Vegan", href: "/category/vegan" },
      { name: "Sugar Free", href: "/category/sugar-free" },
      { name: "Protein Food", href: "/category/protein-food" },
    ],
  },
]

export default function BrowseCategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Browse Categories Button */}
      <Button
        className="bg-green-500 hover:bg-green-600 text-white h-10 px-5 flex items-center justify-between w-full sm:w-52"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>BROWSE CATEGORIES</span>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full sm:w-52 bg-white border border-gray-200 shadow-lg">
          <div className="flex">
            {/* Main Categories */}
            <ul className="w-full">
              {categoriesData.map((category) => (
                <li
                  key={category.name}
                  className="border-b border-gray-100 last:border-0"
                  onMouseEnter={() => setActiveCategory(category.name)}
                >
                  <Link
                    href={`/category/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-sm"
                  >
                    <div className="w-5 h-5 relative flex-shrink-0">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    <span className="flex-grow">{category.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sub Categories */}
            {activeCategory && (
              <div className="absolute left-full top-0 w-60 bg-white border border-gray-200 shadow-lg">
                <div className="p-4">
                  <h3 className="font-medium text-base mb-2">{activeCategory}</h3>
                  <ul className="space-y-1">
                    {categoriesData
                      .find((cat) => cat.name === activeCategory)
                      ?.subCategories.map((subCat) => (
                        <li key={subCat.name}>
                          <Link href={subCat.href} className="block px-2 py-1 hover:bg-gray-50 text-sm">
                            {subCat.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
