"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAdminCategories } from "@/hooks/useAdminCategories"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortBy, setSortBy] = useState('sort_order')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const { toast } = useToast()
  
  const { 
    categories, 
    isLoading, 
    pagination, 
    updateCategory, 
    deleteCategory,
    mutate 
  } = useAdminCategories({ 
    limit: 50, 
    search: searchTerm,
    status: statusFilter,
    sort: sortBy,
    order: sortOrder
  })

  const handleToggleStatus = async (category: any) => {
    try {
      await updateCategory(category.id, {
        ...category,
        is_active: !category.is_active
      })
      toast({
        title: "Category Updated",
        description: `Category ${category.is_active ? 'deactivated' : 'activated'} successfully.`
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category status.",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (category: any) => {
    if (category.product_count > 0) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete category with products. Move products to another category first.",
        variant: "destructive"
      })
      return
    }

    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deleteCategory(category.id)
        toast({
          title: "Category Deleted",
          description: "Category has been deleted successfully."
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete category.",
          variant: "destructive"
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categories</h1>
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
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage your product categories ({pagination?.total || 0} total categories)</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Category List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search categories..." 
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
                  <SelectItem value="sort_order">Sort Order</SelectItem>
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
                  <th className="text-left py-3 px-4">Category Name</th>
                  <th className="text-left py-3 px-4">Slug</th>
                  <th className="text-left py-3 px-4">Products</th>
                  <th className="text-left py-3 px-4">Sort Order</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category: any) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={category.image_url || '/placeholder.svg'} 
                          alt={category.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {category.description || 'No description'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{category.slug}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{category.product_count || 0} products</Badge>
                    </td>
                    <td className="py-3 px-4">{category.sort_order}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={category.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(category)}
                      >
                        {category.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(category.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleStatus(category)}
                        >
                          {category.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(category)}
                          disabled={category.product_count > 0}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {categories.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No categories found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
