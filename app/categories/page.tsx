import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Categories | GeoTech Store",
  description: "Browse all product categories for GPS and survey equipment",
}

const categories = [
  {
    id: "gps-receivers",
    name: "GPS Receivers",
    description: "High-precision GPS and GNSS receivers for surveying and mapping",
    image: "/placeholder.svg?height=300&width=300&text=GPS",
    count: 24,
  },
  {
    id: "total-stations",
    name: "Total Stations",
    description: "Advanced total stations for precise angle and distance measurements",
    image: "/placeholder.svg?height=300&width=300&text=Total+Stations",
    count: 18,
  },
  {
    id: "theodolites",
    name: "Theodolites",
    description: "Optical instruments for measuring angles in horizontal and vertical planes",
    image: "/placeholder.svg?height=300&width=300&text=Theodolites",
    count: 12,
  },
  {
    id: "laser-levels",
    name: "Laser Levels",
    description: "Self-leveling laser tools for accurate horizontal and vertical reference lines",
    image: "/placeholder.svg?height=300&width=300&text=Laser+Levels",
    count: 15,
  },
  {
    id: "measuring-tools",
    name: "Measuring Tools",
    description: "Precision measuring instruments for construction and surveying",
    image: "/placeholder.svg?height=300&width=300&text=Measuring+Tools",
    count: 32,
  },
  {
    id: "satellite-phones",
    name: "Satellite Phones",
    description: "Reliable communication devices for remote field operations",
    image: "/placeholder.svg?height=300&width=300&text=Satellite+Phones",
    count: 8,
  },
  {
    id: "drones",
    name: "Drones & UAVs",
    description: "Unmanned aerial vehicles for aerial mapping and surveying",
    image: "/placeholder.svg?height=300&width=300&text=Drones",
    count: 14,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Essential accessories for survey equipment and GPS devices",
    image: "/placeholder.svg?height=300&width=300&text=Accessories",
    count: 56,
  },
  {
    id: "data-collectors",
    name: "Data Collectors",
    description: "Rugged field computers for data collection and management",
    image: "/placeholder.svg?height=300&width=300&text=Data+Collectors",
    count: 22,
  },
  {
    id: "software",
    name: "Software",
    description: "Professional software solutions for surveying and mapping",
    image: "/placeholder.svg?height=300&width=300&text=Software",
    count: 19,
  },
  {
    id: "training",
    name: "Training & Certification",
    description: "Educational resources and certification programs",
    image: "/placeholder.svg?height=300&width=300&text=Training",
    count: 7,
  },
  {
    id: "rentals",
    name: "Equipment Rentals",
    description: "Rent professional survey equipment for your projects",
    image: "/placeholder.svg?height=300&width=300&text=Rentals",
    count: 31,
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-500">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="font-medium text-gray-900">Categories</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Product Categories</h1>
      <p className="text-gray-600 mb-8">Browse our complete range of GPS and survey equipment by category</p>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="group bg-white rounded-lg overflow-hidden border border-gray-200 transition-shadow hover:shadow-lg"
          >
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1 group-hover:text-green-500">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{category.description}</p>
              <span className="text-sm text-gray-500">{category.count} products</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden h-64">
            <Image
              src="/placeholder.svg?height=400&width=800&text=GPS+Receivers"
              alt="GPS Receivers"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold mb-2">GPS Receivers</h3>
              <p className="text-white/80 mb-4">Professional-grade GPS receivers for precise positioning</p>
              <Link
                href="/category/gps-receivers"
                className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
              >
                Shop Now <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden h-64">
            <Image
              src="/placeholder.svg?height=400&width=800&text=Total+Stations"
              alt="Total Stations"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold mb-2">Total Stations</h3>
              <p className="text-white/80 mb-4">Advanced total stations for precise measurements</p>
              <Link
                href="/category/total-stations"
                className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
              >
                Shop Now <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Brands */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Link
              key={i}
              href={`/brand/brand-${i + 1}`}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <Image
                src={`/placeholder.svg?height=60&width=120&text=Brand+${i + 1}`}
                alt={`Brand ${i + 1}`}
                width={120}
                height={60}
                className="max-h-12 w-auto"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
