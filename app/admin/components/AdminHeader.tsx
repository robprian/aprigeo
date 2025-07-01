"use client"

import { Search, Bell, Menu, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminHeaderProps {
  onMenuClick: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export default function AdminHeader({ onMenuClick, isCollapsed, onToggleCollapse }: AdminHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  // Extract breadcrumb from pathname
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`
      return { name: path.charAt(0).toUpperCase() + path.slice(1), href }
    })
  }

  const breadcrumbs = getBreadcrumbs()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    // Implement actual theme switching logic here
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 transition-all duration-300">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="lg:hidden mr-2 p-2" onClick={onMenuClick}>
              <Menu className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex mr-2 p-2 transition-all duration-200 hover:scale-110"
              onClick={onToggleCollapse}
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>

            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center text-sm">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                Dashboard
              </Link>
              {breadcrumbs.length > 0 && breadcrumbs[0].name !== "Admin" && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              {breadcrumbs.map(
                (breadcrumb, index) =>
                  breadcrumb.name !== "Admin" && (
                    <div key={breadcrumb.href} className="flex items-center">
                      <Link
                        href={breadcrumb.href}
                        className={`${
                          index === breadcrumbs.length - 1
                            ? "text-gray-900 font-medium"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {breadcrumb.name}
                      </Link>
                      {index < breadcrumbs.length - 1 && breadcrumb.name !== "Admin" && (
                        <span className="mx-2 text-gray-400">/</span>
                      )}
                    </div>
                  ),
              )}
            </div>

            {/* Search for desktop */}
            <div className={`relative hidden md:block ml-6`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 w-64 lg:w-80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search button for mobile */}
            <Button variant="ghost" size="sm" className="md:hidden p-2" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme toggle */}
            <Button variant="ghost" size="sm" className="p-2" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-2">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <DropdownMenuItem key={item} className="p-4 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Bell className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New order received</p>
                          <p className="text-xs text-gray-500 mt-1">Order #12345 needs processing</p>
                          <p className="text-xs text-gray-400 mt-1">5 min ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Link href="/admin/notifications" className="text-sm text-blue-600 font-medium">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-200 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-blue-600 text-white text-sm">FA</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">Ferra Alexandra</p>
                    <p className="text-xs text-gray-500">Admin store</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/" className="flex w-full">
                    Back to Store
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile search - conditional render */}
        {searchOpen && (
          <div className="pb-3 px-2 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
