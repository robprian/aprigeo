import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const countries = [
  { name: "United States", flag: "🇺🇸", value: 2417 },
  { name: "Germany", flag: "🇩🇪", value: 812 },
  { name: "Australia", flag: "🇦🇺", value: 287 },
  { name: "France", flag: "🇫🇷", value: 2281 },
]

export default function CustomerGrowth() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Customer Growth</CardTitle>
          <p className="text-sm text-gray-600">Track customer by locations</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bubble chart representation */}
          <div className="relative h-64 flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                287
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm">
                2,417
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white">
                2,281
              </div>
              <div className="absolute top-8 -right-8 w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-white text-xs">
                812
              </div>
            </div>
          </div>

          {/* Country list */}
          <div className="space-y-4">
            {countries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <span className="text-sm text-gray-700">{country.name}</span>
                </div>
                <span className="text-sm font-semibold">{country.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
