"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { useCompare } from "@/hooks/useCompare"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const categories = [
  {
    name: "GPS Equipment",
    href: "/category/gps-equipment",
    subcategories: ["GNSS Receivers", "GPS Antennas", "GPS Software"],
  },
  {
    name: "Survey Equipment",
    href: "/category/survey-equipment",
    subcategories: ["Total Stations", "Theodolites", "Levels"],
  },
  {
    name: "Mapping Tools",
    href: "/category/mapping-tools",
    subcategories: ["GIS Software", "Mapping Drones", "Laser Scanners"],
  },
  {
    name: "Communication",
    href: "/category/communication",
    subcategories: ["Satellite Phones", "Two-Way Radios", "Emergency Beacons"],
  },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [compareCount, setCompareCount] = useState(0)

  // Client-side only code
  useEffect(() => {
    setMounted(true)

    // Debug message to verify component mounting
    console.log("Header component mounted")
  }, [])

  const { getTotalItems: getCartItems } = useCart()
  const { getWishlistCount } = useWishlist()
  const { getCompareCount } = useCompare()

  useEffect(() => {
    if (!mounted) return

    const updateCounts = () => {
      setCartCount(getCartItems())
      setWishlistCount(getWishlistCount())
      setCompareCount(getCompareCount())
    }

    updateCounts()

    window.addEventListener("cart-updated", updateCounts)
    window.addEventListener("wishlist-updated", updateCounts)
    window.addEventListener("compare-updated", updateCounts)

    return () => {
      window.removeEventListener("cart-updated", updateCounts)
      window.removeEventListener("wishlist-updated", updateCounts)
      window.removeEventListener("compare-updated", updateCounts)
    }
  }, [mounted, getCartItems, getWishlistCount, getCompareCount])

  // Server-side rendering fallback
  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">CV. Aprinia Geosat</div>
            <div className="w-64 h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-xs border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <span className="text-gray-600">Welcome to CV. Aprinia Geosat Solusindo</span>
            </div>
            <div className="flex gap-4">
              <Link href="/tracking" className="text-gray-600 hover:text-green-600">
                Order Tracking
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600">
                Contact Us
              </Link>
              <span className="text-gray-600">Call: (+62) 21-1234-5678</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">AG</span>
                </div>
                <div>
                  <div className="text-xl font-bold">CV. Aprinia Geosat</div>
                  <div className="text-xs text-gray-500">Survey Equipment & GPS Tools</div>
                </div>
              </div>
            </Link>

            {/* Search - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Header Actions - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/account" className="flex flex-col items-center group">
                <User className="w-6 h-6 text-gray-600 group-hover:text-green-500" />
                <span className="text-xs mt-1 text-gray-600 group-hover:text-green-500">Account</span>
              </Link>

              <Link href="/wishlist" className="flex flex-col items-center group relative">
                <Heart className="w-6 h-6 text-gray-600 group-hover:text-green-500" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-xs mt-1 text-gray-600 group-hover:text-green-500">Wishlist</span>
              </Link>

              <Link href="/cart" className="flex flex-col items-center group relative">
                <ShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-green-500" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="text-xs mt-1 text-gray-600 group-hover:text-green-500">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <div className="hidden md:block border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-12">
            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-2 bg-green-500 text-white px-4 h-12 font-medium"
                onClick={() => setIsDropdownOpen(isDropdownOpen === "categories" ? null : "categories")}
              >
                <Menu className="w-5 h-5" />
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen === "categories" && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-200 z-50">
                  {categories.map((category) => (
                    <div key={category.name} className="group/item relative">
                      <Link
                        href={category.href}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <span>{category.name}</span>
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </Link>

                      <div className="absolute left-full top-0 w-64 bg-white shadow-lg border border-gray-200 hidden group-hover/item:block">
                        <div className="p-4">
                          <h4 className="font-medium mb-2">{category.name}</h4>
                          <ul className="space-y-1">
                            {category.subcategories.map((sub) => (
                              <li key={sub}>
                                <Link
                                  href={`${category.href}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-gray-600 hover:text-green-500"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Navigation */}
            <nav className="ml-8">
              <ul className="flex items-center space-x-6">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-700 hover:text-green-500 font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          {/* Search - Mobile */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Navigation - Mobile */}
          <nav className="p-4">
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-green-500 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/account"
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-gray-500" />
                  <span>Account</span>
                </Link>

                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-md relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5 text-gray-500" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-md relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
