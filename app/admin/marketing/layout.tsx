"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Megaphone, 
  ImageIcon, 
  Tag, 
  Users, 
  Mail, 
  Percent,
  TrendingUp,
  Gift
} from "lucide-react"

interface MarketingLayoutProps {
  children: ReactNode
}

const marketingNavItems = [
  { href: "/admin/marketing", label: "Overview", icon: TrendingUp },
  { href: "/admin/marketing/promotional-banners", label: "Promotional Banners", icon: ImageIcon },
  { href: "/admin/marketing/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/admin/marketing/coupons", label: "Coupons & Discounts", icon: Percent },
  { href: "/admin/marketing/email", label: "Email Marketing", icon: Mail },
  { href: "/admin/marketing/promotions", label: "Promotions", icon: Gift },
  { href: "/admin/marketing/analytics", label: "Analytics", icon: TrendingUp },
]

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Marketing</h2>
          <p className="text-sm text-gray-600">Manage your marketing activities</p>
        </div>
        
        <nav className="px-3 space-y-1">
          {marketingNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
