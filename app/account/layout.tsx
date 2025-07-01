"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { User, ShoppingBag, Heart, Settings, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Account Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-600">john@example.com</p>
              </div>
            </div>

            <nav className="space-y-2">
              <AccountNavLink href="/account" icon={User} label="Dashboard" />
              <AccountNavLink href="/account/orders" icon={ShoppingBag} label="Orders" />
              <AccountNavLink href="/account/wishlist" icon={Heart} label="Wishlist" />
              <AccountNavLink href="/account/addresses" icon={MapPin} label="Addresses" />
              <AccountNavLink href="/account/payment" icon={CreditCard} label="Payment Methods" />
              <AccountNavLink href="/account/settings" icon={Settings} label="Settings" />
            </nav>
          </div>
        </div>

        {/* Account Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

function AccountNavLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start" size="sm">
        <Icon className="w-4 h-4 mr-2" />
        {label}
      </Button>
    </Link>
  )
}
