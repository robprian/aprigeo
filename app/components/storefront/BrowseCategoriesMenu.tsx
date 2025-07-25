"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCategories } from "@/hooks/useCategories"

export default function BrowseCategoriesMenu() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const { categories, isLoading } = useCategories(true)

  // Get main categories (parent categories)
  const mainCategories = categories.filter(cat => !cat.parent_id)
  
  // Get subcategories for selected category
  const getSubCategories = (parentId: number) => {
    return categories.filter(cat => cat.parent_id === parentId)
  }

  if (isLoading) {
    return (
      <div className="bg-white border-r border-gray-200 w-80 h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-4 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-r border-gray-200 w-80 h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Browse GPS Categories</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {mainCategories.map((category) => {
          const subCategories = getSubCategories(category.id)
          const isSelected = selectedCategory === category.id
          
          return (
            <div key={category.id} className="border-b border-gray-100">
              <div
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={category.image_url || "/placeholder.svg"}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <p className="text-sm text-gray-500">{category.products_count || 0} products</p>
                  </div>
                </div>
                <ChevronRight 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isSelected ? 'rotate-90' : ''
                  }`} 
                />
              </div>
              
              {isSelected && subCategories.length > 0 && (
                <div className="bg-gray-50 pb-2">
                  {subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.id}
                      href={`/category/${subCategory.slug}`}
                      className="block px-4 py-2 pl-16 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    >
                      {subCategory.name}
                      <span className="text-xs text-gray-400 ml-2">
                        ({subCategory.products_count || 0})
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Button asChild className="w-full">
          <Link href="/categories">
            View All Categories
          </Link>
        </Button>
      </div>
    </div>
  )
}
