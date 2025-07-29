"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, Package, CreditCard, Settings, CheckCircle, Clock, Truck } from "lucide-react"
import Link from "next/link"

export default function AccountDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, John! Here's an overview of your account.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">$89,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-0 shadow-sm mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
          <Link href="/account/orders">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Order 1 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">#ORD-2024-001</p>
                    <p className="text-sm text-gray-600">Trimble R12i GNSS Receiver</p>
                    <p className="text-xs text-gray-500">Ordered on Jan 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">$15,999</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order 2 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">#ORD-2024-002</p>
                    <p className="text-sm text-gray-600">Leica TS16 Total Station</p>
                    <p className="text-xs text-gray-500">Ordered on Jan 20, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">$28,999</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Truck className="w-3 h-3 mr-1" />
                      Shipped
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order 3 */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">#ORD-2024-003</p>
                    <p className="text-sm text-gray-600">Iridium 9575 Satellite Phone</p>
                    <p className="text-xs text-gray-500">Ordered on Jan 25, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">$1,299</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" />
                      Processing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/account/orders">
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <Package className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">View Orders</p>
              </div>
            </Link>
            
            <Link href="/account/wishlist">
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <Heart className="w-8 h-8 text-red-600 mb-2" />
                <p className="font-medium text-gray-900">Manage Wishlist</p>
              </div>
            </Link>
            
            <Link href="/account/settings">
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <Settings className="w-8 h-8 text-gray-600 mb-2" />
                <p className="font-medium text-gray-900">Account Settings</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
