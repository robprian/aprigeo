"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, CreditCard, MapPin, Heart, User, Calendar } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/currency"

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: string
  emailVerifiedAt?: string
  createdAt: string
  profile: {
    companyName?: string
    taxId?: string
    dateOfBirth?: string
    gender?: string
    totalOrders: number
    totalSpent: number
    lastOrderDate?: string
    customerGroup?: string
    discountPercentage?: number
  }
  addresses: any[]
}

export default function AccountDashboard() {
  const { data: session } = useSession()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch('/api/user/profile')
        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          setUserProfile(profileData.data)
        }

        // Fetch recent orders
        const ordersResponse = await fetch('/api/orders')
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json()
          setRecentOrders(ordersData.data?.slice(0, 3) || [])
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchUserData()
    }
  }, [session])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      processing: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      pending: "bg-gray-100 text-gray-800",
    }
    
    const statusLabels = {
      processing: "Memproses",
      shipped: "Dikirim",
      delivered: "Diterima",
      cancelled: "Dibatalkan",
      pending: "Menunggu",
    }

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </Badge>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {userProfile?.firstName || session?.user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your account and track your orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProfile?.profile.totalOrders || 0}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(userProfile?.profile.totalSpent || 0)}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Addresses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProfile?.addresses.length || 0}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Member Since</p>
                <p className="text-sm font-bold text-gray-900">
                  {userProfile?.createdAt ? formatDate(userProfile.createdAt) : 'N/A'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-gray-900">
                {userProfile?.firstName} {userProfile?.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-900">{userProfile?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <p className="text-gray-900">{userProfile?.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Company</label>
              <p className="text-gray-900">{userProfile?.profile.companyName || 'Not provided'}</p>
            </div>
          </div>
          <div className="pt-4">
            <Link href="/account/settings">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Recent Orders
            </CardTitle>
            <Link href="/account/orders">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.date)} • {order.items.length} item(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                      {getStatusBadge(order.status)}
                    </div>
                    <Link href="/account/orders">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No orders yet</p>
              <Link href="/shop">
                <Button className="mt-4">Start Shopping</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Track Orders</h3>
            <p className="text-sm text-gray-600 mb-4">
              View and track your order status
            </p>
            <Link href="/account/orders">
              <Button variant="outline" size="sm" className="w-full">
                Go to Orders
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Manage Addresses</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add or edit your shipping addresses
            </p>
            <Link href="/account/addresses">
              <Button variant="outline" size="sm" className="w-full">
                Manage Addresses
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Wishlist</h3>
            <p className="text-sm text-gray-600 mb-4">
              Save items for later purchase
            </p>
            <Link href="/account/wishlist">
              <Button variant="outline" size="sm" className="w-full">
                View Wishlist
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
