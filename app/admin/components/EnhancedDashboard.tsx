"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Package, Eye, ShoppingCart, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Sales",
    value: "$612,917",
    change: "+2.08%",
    trend: "up",
    subtitle: "Products vs last month",
    icon: DollarSign,
    color: "bg-blue-600",
  },
  {
    title: "Total Orders",
    value: "34,760",
    change: "+12.4%",
    trend: "up",
    subtitle: "Orders vs last month",
    icon: ShoppingCart,
    color: "bg-green-600",
  },
  {
    title: "Visitors",
    value: "14,987",
    change: "-2.08%",
    trend: "down",
    subtitle: "Users vs last month",
    icon: Eye,
    color: "bg-purple-600",
  },
  {
    title: "Total Products",
    value: "12,987",
    change: "+12.1%",
    trend: "up",
    subtitle: "Products vs last month",
    icon: Package,
    color: "bg-orange-600",
  },
]

const salesData = [
  { month: "Jan", sales: 45000, orders: 320 },
  { month: "Feb", sales: 52000, orders: 380 },
  { month: "Mar", sales: 48000, orders: 350 },
  { month: "Apr", sales: 61000, orders: 420 },
  { month: "May", sales: 55000, orders: 390 },
  { month: "Jun", sales: 67000, orders: 450 },
  { month: "Jul", sales: 59000, orders: 410 },
]

const topProducts = [
  { name: "Trimble R12i GNSS", sales: 145, revenue: 2319855 },
  { name: "Leica TS16 Total Station", sales: 89, revenue: 2580911 },
  { name: "Topcon GT-1200", sales: 67, revenue: 2210733 },
  { name: "Iridium 9575 Satellite", sales: 156, revenue: 202644 },
  { name: "Spectra Laser Level", sales: 234, revenue: 210366 },
]

export default function EnhancedDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <p className="text-sm text-gray-600">Monthly sales and orders</p>
            </div>
            <Select defaultValue="this-year">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-year">This year</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between space-x-2">
              {salesData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-600 rounded-t mb-2"
                    style={{ height: `${(data.sales / 70000) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                  <span className="text-xs font-medium">${(data.sales / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Categories Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <p className="text-sm text-gray-600">Sales by category</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                  {/* GPS Equipment - 40% */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="125.6 188.4"
                    strokeDashoffset="0"
                  />
                  {/* Survey Tools - 30% */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#10b981"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="94.2 219.8"
                    strokeDashoffset="-125.6"
                  />
                  {/* Satellite Phones - 20% */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="62.8 251.2"
                    strokeDashoffset="-219.8"
                  />
                  {/* Others - 10% */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#ef4444"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="31.4 282.6"
                    strokeDashoffset="-282.6"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">9,829</span>
                  <span className="text-sm text-gray-600">Total Sales</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-sm">GPS Equipment</span>
                </div>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-sm">Survey Tools</span>
                </div>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-3"></div>
                  <span className="text-sm">Satellite Phones</span>
                </div>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-sm">Others</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <p className="text-sm text-gray-600">Best performing products this month</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <p className="text-sm text-gray-600">New customers by location</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🇺🇸</span>
                  <div>
                    <p className="font-medium text-sm">United States</p>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
                <span className="font-medium">2,417</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🇩🇪</span>
                  <div>
                    <p className="font-medium text-sm">Germany</p>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
                <span className="font-medium">812</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🇦🇺</span>
                  <div>
                    <p className="font-medium text-sm">Australia</p>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
                <span className="font-medium">287</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🇫🇷</span>
                  <div>
                    <p className="font-medium text-sm">France</p>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
                <span className="font-medium">2,281</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
