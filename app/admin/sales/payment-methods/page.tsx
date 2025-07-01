"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, CreditCard, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const paymentMethods = [
  {
    id: 1,
    name: "Credit Card",
    code: "credit_card",
    description: "Visa, MasterCard, American Express",
    isActive: true,
    transactions: 1250,
    icon: "💳",
  },
  {
    id: 2,
    name: "PayPal",
    code: "paypal",
    description: "PayPal payment gateway",
    isActive: true,
    transactions: 890,
    icon: "🅿️",
  },
  {
    id: 3,
    name: "Bank Transfer",
    code: "bank_transfer",
    description: "Direct bank transfer",
    isActive: true,
    transactions: 456,
    icon: "🏦",
  },
  {
    id: 4,
    name: "Check",
    code: "check",
    description: "Payment by check",
    isActive: false,
    transactions: 23,
    icon: "📝",
  },
  {
    id: 5,
    name: "Purchase Order",
    code: "purchase_order",
    description: "Corporate purchase orders",
    isActive: true,
    transactions: 167,
    icon: "📋",
  },
]

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Configure available payment options</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Methods</p>
                <p className="text-lg sm:text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Active Methods</p>
                <p className="text-lg sm:text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Transactions</p>
                <p className="text-lg sm:text-2xl font-bold">2,786</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Most Used</p>
                <p className="text-lg sm:text-2xl font-bold">Credit Card</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">Payment Methods</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search methods..." className="pl-10 w-full sm:w-64" />
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile view */}
          <div className="block sm:hidden space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{method.name}</h3>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </div>
                  </div>
                  <Switch checked={method.isActive} />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{method.transactions} transactions</p>
                    <p className="text-xs text-gray-500">Code: {method.code}</p>
                  </div>
                  <Badge variant={method.isActive ? "default" : "secondary"}>
                    {method.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-3 h-3 mr-1" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Method</th>
                  <th className="text-left py-3 px-4">Code</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Transactions</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentMethods.map((method) => (
                  <tr key={method.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          {method.icon}
                        </div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{method.code}</td>
                    <td className="py-3 px-4 text-gray-600">{method.description}</td>
                    <td className="py-3 px-4">{method.transactions.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Switch checked={method.isActive} />
                        <Badge variant={method.isActive ? "default" : "secondary"}>
                          {method.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
