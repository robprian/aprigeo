"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  LogOut,
  Settings,
  Package,
  Heart
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export default function CustomerHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      // Add logout API call here
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push('/login')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">AG</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Aprinia Geosat</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/account" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === '/account' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/account/orders" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname.startsWith('/account/orders') ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Orders
            </Link>
            <Link 
              href="/account/wishlist" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname.startsWith('/account/wishlist') ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Wishlist
            </Link>
            <Link 
              href="/account/addresses" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname.startsWith('/account/addresses') ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              Addresses
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64"
                />
              </form>
            </div>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/account/wishlist" className="flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link href="/account/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
