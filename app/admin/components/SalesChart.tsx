"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SalesChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Customer Habits</CardTitle>
          <p className="text-sm text-gray-600">Track your customer habits</p>
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
          {/* Simplified bar chart representation */}
          <div className="flex flex-col items-center">
            <div className="w-8 bg-blue-600 rounded-t" style={{ height: "60px" }}></div>
            <span className="text-xs text-gray-600 mt-2">Jan</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 bg-blue-600 rounded-t" style={{ height: "80px" }}></div>
            <span className="text-xs text-gray-600 mt-2">Feb</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 bg-blue-600 rounded-t" style={{ height: "45px" }}></div>
            <span className="text-xs text-gray-600 mt-2">Mar</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 bg-blue-600 rounded-t" style={{ height: "120px" }}></div>
            <span className="text-xs text-gray-600 mt-2">Apr</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 bg-blue-600 rounded-t" style={{ height: "35px" }}></div>
            <span className="text-xs text-gray-600 mt-2">May</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 bg-blue-600 rounded-t" style={{ height: "90px" }}></div>
            <span className="text-xs text-gray-600 mt-2">Jun</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 bg-blue-600 rounded-t" style={{ height: "70px" }}></div>
            <span className="text-xs text-gray-600 mt-2">Jul</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Search product</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Sales</span>
            </div>
          </div>

          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-green-400">●</span>
                <span className="text-sm ml-1">43,787 Products</span>
              </div>
              <div>
                <span className="text-gray-400">●</span>
                <span className="text-sm ml-1">39,784 Products</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
