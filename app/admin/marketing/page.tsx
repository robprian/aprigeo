"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Megaphone, 
  ImageIcon, 
  Tag, 
  TrendingUp,
  Plus,
  Eye,
  Users,
  MousePointer,
  Percent
} from "lucide-react"
import Link from "next/link"

export default function MarketingPage() {
  const [stats, setStats] = useState({
    activeBanners: 0,
    activeCampaigns: 0,
    activeCoupons: 0,
    totalImpressions: 0,
    totalClicks: 0,
    conversionRate: 0
  })

  useEffect(() => {
    loadMarketingStats()
  }, [])

  const loadMarketingStats = async () => {
    try {
      // Load promotional banners count
      const bannersResponse = await fetch('/api/admin/promotional-banners')
      const bannersData = await bannersResponse.json()
      
      if (bannersData.success) {
        const activeBanners = bannersData.banners?.filter((banner: any) => banner.is_active).length || 0
        setStats(prev => ({ ...prev, activeBanners }))
      }
    } catch (error) {
      console.error('Error loading marketing stats:', error)
    }
  }

  const quickActions = [
    {
      title: "Create Promotional Banner",
      description: "Design and publish promotional banners for your homepage",
      icon: ImageIcon,
      href: "/admin/marketing/promotional-banners",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Launch Campaign",
      description: "Create and manage marketing campaigns",
      icon: Megaphone,
      href: "/admin/marketing/campaigns",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Create Coupon",
      description: "Generate discount coupons and promotional codes",
      icon: Tag,
      href: "/admin/marketing/coupons",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ]

  const marketingStats = [
    {
      title: "Active Banners",
      value: stats.activeBanners,
      icon: ImageIcon,
      color: "text-blue-600",
      description: "Currently displayed promotional banners"
    },
    {
      title: "Active Campaigns", 
      value: stats.activeCampaigns,
      icon: Megaphone,
      color: "text-green-600",
      description: "Running marketing campaigns"
    },
    {
      title: "Active Coupons",
      value: stats.activeCoupons,
      icon: Percent,
      color: "text-purple-600",
      description: "Available discount codes"
    },
    {
      title: "Total Impressions",
      value: stats.totalImpressions.toLocaleString(),
      icon: Eye,
      color: "text-orange-600",
      description: "Banner and campaign views"
    },
    {
      title: "Total Clicks",
      value: stats.totalClicks.toLocaleString(),
      icon: MousePointer,
      color: "text-red-600",
      description: "User interactions"
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: "text-indigo-600",
      description: "Click-through rate"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Marketing Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your promotional content, campaigns, and marketing analytics
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card key={action.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                      <Link href={action.href}>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Marketing Stats */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Marketing Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-500 mb-4">
                Start by creating promotional banners or campaigns to see activity here
              </p>
              <Link href="/admin/marketing/promotional-banners">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Banner
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
