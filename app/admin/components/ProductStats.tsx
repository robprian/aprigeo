import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp } from "lucide-react"

const categories = [
  { name: "Electronic", value: 2487, change: "+0.8%", color: "text-green-600" },
  { name: "Games", value: 1828, change: "+2.3%", color: "text-green-600" },
  { name: "Furniture", value: 1463, change: "-1.0%", color: "text-red-600" },
]

export default function ProductStats() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Statistic</CardTitle>
          <p className="text-sm text-gray-600">Track your product sales</p>
        </div>
        <Select defaultValue="today">
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {/* Circular progress chart representation */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray="314"
                strokeDashoffset="94"
                strokeLinecap="round"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                stroke="#ef4444"
                strokeWidth="6"
                fill="none"
                strokeDasharray="251"
                strokeDashoffset="150"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">9,829</span>
              <span className="text-sm text-gray-600">Products Sales</span>
              <span className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.34%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    index === 0 ? "bg-blue-600" : index === 1 ? "bg-green-600" : "bg-red-600"
                  }`}
                ></div>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{category.value.toLocaleString()}</div>
                <div className={`text-xs ${category.color}`}>{category.change}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
