import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Package, Eye, ShoppingCart, DollarSign } from "lucide-react"
import { useDashboardStats } from "@/hooks/useDashboardStats"

export default function DashboardStats() {
  const { stats, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return <div>Failed to load dashboard stats</div>
  }

  const statsArray = [
    {
      title: "Total Sales",
      value: `$${stats.total_sales.value.toLocaleString()}`,
      change: `${stats.total_sales.change >= 0 ? '+' : ''}${stats.total_sales.change.toFixed(2)}%`,
      trend: stats.total_sales.trend,
      subtitle: "Sales vs last month",
      icon: DollarSign,
      color: "bg-blue-600",
    },
    {
      title: "Total Orders",
      value: stats.total_orders.value.toLocaleString(),
      change: `${stats.total_orders.change >= 0 ? '+' : ''}${stats.total_orders.change.toFixed(2)}%`,
      trend: stats.total_orders.trend,
      subtitle: "Orders vs last month",
      icon: ShoppingCart,
      color: "bg-white border",
    },
    {
      title: "Visitors",
      value: stats.visitors.value.toLocaleString(),
      change: `${stats.visitors.change >= 0 ? '+' : ''}${stats.visitors.change.toFixed(2)}%`,
      trend: stats.visitors.trend,
      subtitle: "Visitors vs last month",
      icon: Eye,
      color: "bg-white border",
    },
    {
      title: "Total Sold Products",
      value: stats.total_products_sold.value.toLocaleString(),
      change: `${stats.total_products_sold.change >= 0 ? '+' : ''}${stats.total_products_sold.change.toFixed(2)}%`,
      trend: stats.total_products_sold.trend,
      subtitle: "Products vs last month",
      icon: Package,
      color: "bg-white border",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsArray.map((stat, index) => (
        <Card key={index} className={stat.color}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${index === 0 ? "bg-blue-500" : "bg-gray-100"}`}>
                <stat.icon className={`w-6 h-6 ${index === 0 ? "text-white" : "text-gray-600"}`} />
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
              <p className={`text-2xl font-bold ${index === 0 ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
              <p className={`text-xs ${index === 0 ? "text-blue-100" : "text-gray-500"} mt-1`}>{stat.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
