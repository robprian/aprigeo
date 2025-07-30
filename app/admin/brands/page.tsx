"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAdminBrands } from "@/hooks/useAdminBrands"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const { toast } = useToast()
  
  const { 
    brands, 
    isLoading, 
    pagination, 
    updateBrand, 
    deleteBrand,
    mutate 
  } = useAdminBrands({ 
    limit: 50, 
    search: searchTerm,
    status: statusFilter,
    sort: sortBy,
    order: sortOrder
  })

  const handleToggleStatus = async (brand: any) => {
    try {
      await updateBrand(brand.id, {
        ...brand,
        is_active: !brand.is_active
      })
      toast({
        title: "Brand Updated",
        description: `Brand ${brand.is_active ? 'deactivated' : 'activated'} successfully.`
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update brand status.",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (brand: any) => {
    if (brand.product_count > 0) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete brand with products. Move products to another brand first.",
        variant: "destructive"
      })
      return
    }

    if (confirm(`Are you sure you want to delete "${brand.name}"?`)) {
      try {
        await deleteBrand(brand.id)
        toast({
          title: "Brand Deleted",
          description: "Brand has been deleted successfully."
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete brand.",
          variant: "destructive"
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Brands</h1>
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-gray-600">Manage your product brands ({pagination?.total || 0} total brands)</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Brand List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search brands..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="created_at">Date Created</SelectItem>
                  <SelectItem value="product_count">Product Count</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
              >
                <Filter className="w-4 h-4 mr-2" />
                {sortOrder}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Brand Name</th>
                  <th className="text-left py-3 px-4">Slug</th>
                  <th className="text-left py-3 px-4">Products</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand: any) => (
                  <tr key={brand.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={brand.logo_url || '/placeholder.svg'} 
                          alt={brand.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{brand.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {brand.description || 'No description'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{brand.slug}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{brand.product_count || 0} products</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={brand.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(brand)}
                      >
                        {brand.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(brand.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleStatus(brand)}
                        >
                          {brand.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(brand)}
                          disabled={brand.product_count > 0}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {brands.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No brands found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
