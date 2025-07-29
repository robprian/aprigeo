"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  MapPin, 
  CreditCard,
  Package,
  Clock,
  Star,
  Bell,
  Shield,
  HelpCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CustomerMenuItem {
  id: number
  title: string
  url: string
  icon: string
  description?: string
  badge?: string
  is_active: boolean
  order_index: number
}

export default function CustomerSidebar() {
  const [menuItems, setMenuItems] = useState<CustomerMenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    user: User,
    'shopping-bag': ShoppingBag,
    heart: Heart,
    settings: Settings,
    'map-pin': MapPin,
    'credit-card': CreditCard,
    package: Package,
    clock: Clock,
    star: Star,
    bell: Bell,
    shield: Shield,
    'help-circle': HelpCircle,
  }

  // Load menu items from database
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const response = await fetch('/api/customer/menu')
        if (response.ok) {
          const data = await response.json()
          setMenuItems(data.menuItems || [])
        } else {
          // Fallback to static data if API fails
          console.warn('Failed to load menu from API, using fallback data')
          setMenuItems(getStaticMenuItems())
        }
      } catch (error) {
        console.error('Error loading menu items:', error)
        // Fallback to static data
        setMenuItems(getStaticMenuItems())
      } finally {
        setLoading(false)
      }
    }

    loadMenuItems()
  }, [])

  // Static fallback menu items
  const getStaticMenuItems = (): CustomerMenuItem[] => {
    return [
      {
        id: 1,
        title: "Dashboard",
        url: "/account",
        icon: "user",
        description: "Account overview and summary",
        is_active: true,
        order_index: 1
      },
      {
        id: 2,
        title: "My Orders",
        url: "/account/orders",
        icon: "shopping-bag",
        description: "View and track your orders",
        badge: "3",
        is_active: true,
        order_index: 2
      },
      {
        id: 3,
        title: "Wishlist",
        url: "/account/wishlist",
        icon: "heart",
        description: "Your saved products",
        is_active: true,
        order_index: 3
      },
      {
        id: 4,
        title: "Addresses",
        url: "/account/addresses",
        icon: "map-pin",
        description: "Manage shipping addresses",
        is_active: true,
        order_index: 4
      },
      {
        id: 5,
        title: "Payment Methods",
        url: "/account/payment",
        icon: "credit-card",
        description: "Manage payment methods",
        is_active: true,
        order_index: 5
      },
      {
        id: 6,
        title: "Order History",
        url: "/account/orders/history",
        icon: "clock",
        description: "View past orders",
        is_active: true,
        order_index: 6
      },
      {
        id: 7,
        title: "Reviews & Ratings",
        url: "/account/reviews",
        icon: "star",
        description: "Your product reviews",
        is_active: true,
        order_index: 7
      },
      {
        id: 8,
        title: "Notifications",
        url: "/account/notifications",
        icon: "bell",
        description: "Manage notifications",
        badge: "2",
        is_active: true,
        order_index: 8
      },
      {
        id: 9,
        title: "Security",
        url: "/account/security",
        icon: "shield",
        description: "Password and security settings",
        is_active: true,
        order_index: 9
      },
      {
        id: 10,
        title: "Settings",
        url: "/account/settings",
        icon: "settings",
        description: "Account preferences",
        is_active: true,
        order_index: 10
      },
      {
        id: 11,
        title: "Support",
        url: "/account/support",
        icon: "help-circle",
        description: "Get help and support",
        is_active: true,
        order_index: 11
      }
    ].filter(item => item.is_active).sort((a, b) => a.order_index - b.order_index)
  }

  if (loading) {
    return (
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg border p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border p-6 sticky top-24">
        {/* User Profile */}
        <div className="flex items-center mb-6 pb-6 border-b">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-600">john@example.com</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const IconComponent = iconMap[item.icon] || User
            const isActive = pathname === item.url || 
                           (item.url !== '/account' && pathname.startsWith(item.url))

            return (
              <Link
                key={item.id}
                href={item.url}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <IconComponent className="w-4 h-4 mr-3" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t">
          <div className="text-xs text-gray-500 mb-2">Quick Stats</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Wishlist Items</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Reward Points</span>
              <span className="font-medium text-blue-600">250</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
