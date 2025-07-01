"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, Users, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const customerGroups = [
  {
    id: 1,
    name: "VIP Customers",
    description: "Premium customers with special pricing",
    discount: 10,
    customers: 45,
    minOrder: 1000,
    status: "Active",
  },
  {
    id: 2,
    name: "Regular Customers",
    description: "Standard customer group",
    discount: 0,
    customers: 1250,
    minOrder: 0,
    status: "Active",
  },
  {
    id: 3,
    name: "Wholesale Customers",
    description: "Bulk purchase customers",
    discount: 15,
    customers: 89,
    minOrder: 5000,
    status: "Active",
  },
  {
    id: 4,
    name: "Government Agencies",
    description: "Government and institutional customers",
    discount: 5,
    customers: 23,
    minOrder: 500,
    status: "Active",
  },
]

export default function CustomerGroupsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Groups</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Organize customers into groups for targeted pricing</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Group
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Groups</p>
                <p className="text-lg sm:text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Customers</p>
                <p className="text-lg sm:text-2xl font-bold">1,407</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Percent className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Avg Discount</p>
                <p className="text-lg sm:text-2xl font-bold">7.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600 mr-2 sm:mr-3" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">VIP Members</p>
                <p className="text-lg sm:text-2xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">Customer Groups</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search groups..." className="pl-10 w-full sm:w-64" />
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
            {customerGroups.map((group) => (
              <div key={group.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{group.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{group.description}</p>
                  </div>
                  <Badge variant={group.status === "Active" ? "default" : "secondary"}>{group.status}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Customers</p>
                    <p className="font-medium">{group.customers}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Discount</p>
                    <p className="font-medium">{group.discount}%</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Min Order</p>
                    <p className="font-medium">${group.minOrder.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
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
                  <th className="text-left py-3 px-4">Group Name</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Customers</th>
                  <th className="text-left py-3 px-4">Discount</th>
                  <th className="text-left py-3 px-4">Min Order</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerGroups.map((group) => (
                  <tr key={group.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{group.name}</td>
                    <td className="py-3 px-4 text-gray-600">{group.description}</td>
                    <td className="py-3 px-4">{group.customers}</td>
                    <td className="py-3 px-4">{group.discount}%</td>
                    <td className="py-3 px-4">${group.minOrder.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge variant={group.status === "Active" ? "default" : "secondary"}>{group.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
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
