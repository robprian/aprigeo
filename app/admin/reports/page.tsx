import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

const reportData = [
  { period: "Today", sales: 12450, orders: 89, customers: 67, products: 234 },
  { period: "Yesterday", sales: 11200, orders: 78, customers: 54, products: 198 },
  { period: "This Week", sales: 78900, orders: 567, customers: 423, products: 1456 },
  { period: "Last Week", sales: 72300, orders: 523, customers: 398, products: 1234 },
  { period: "This Month", sales: 312450, orders: 2234, customers: 1678, products: 5678 },
  { period: "Last Month", sales: 298700, orders: 2156, customers: 1543, products: 5234 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Analyze your business performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">$312,450</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +4.6% from last month
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">2,234</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3.6% from last month
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Customers</p>
                <p className="text-2xl font-bold">1,678</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.7% from last month
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Products Sold</p>
                <p className="text-2xl font-bold">5,678</p>
                <div className="flex items-center text-red-600 text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -1.2% from last month
                </div>
              </div>
              <Package className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{data.period}</p>
                    <p className="text-sm text-gray-600">{data.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${data.sales.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      {index % 2 === 0 ? (
                        <span className="text-green-600">+12.5%</span>
                      ) : (
                        <span className="text-red-600">-5.2%</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">GPS Equipment</p>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <span className="font-bold">$234,567</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Survey Tools</p>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <span className="font-bold">$187,432</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Satellite Phones</p>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <span className="font-bold">$142,876</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Laser Tools</p>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <span className="font-bold">$109,234</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Accessories</p>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                <span className="font-bold">$78,543</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
