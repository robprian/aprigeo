"use client"

import Link from "next/link"
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react"
import { usePathname } from "next/navigation"

export default function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/shop", icon: Search, label: "Shop" },
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
    { href: "/account", icon: User, label: "Account" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 text-xs ${
                isActive ? "text-green-600" : "text-gray-600 hover:text-green-600"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
