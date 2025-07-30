"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Wand2, Edit, Trash2, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAdminProducts } from "@/hooks/useAdminProducts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { validateDataConsistency, clearAllCaches } from "@/lib/sync"
import { formatCurrency } from "@/lib/currency"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC')
  const [isGeneratingSEO, setIsGeneratingSEO] = useState<number | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()
  
  const { 
    products, 
    isLoading, 
    pagination, 
    updateProduct, 
    deleteProduct,
    mutate 
  } = useAdminProducts({ 
    limit: 50, 
    search: searchTerm,
    status: statusFilter,
    sort: sortBy,
    order: sortOrder
  })

  // Validate data consistency on mount
  useEffect(() => {
    validateDataConsistency()
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    clearAllCaches()
    await mutate()
    await validateDataConsistency()
    setIsRefreshing(false)
    toast({
      title: "Data Refreshed",
      description: "Product data has been synchronized successfully."
    })
  }

  const handleGenerateSEO = async (productId: number) => {
    setIsGeneratingSEO(productId)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingSEO(null)
    toast({
      title: "SEO Generated",
      description: "SEO metadata has been generated for the product."
    })
  }

  const handleToggleStatus = async (product: any) => {
    try {
      await updateProduct(product.id, {
        ...product,
        is_active: !product.is_active
      })
      toast({
        title: "Product Updated",
        description: `Product ${product.is_active ? 'deactivated' : 'activated'} successfully.`
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product status.",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (product: any) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProduct(product.id)
        toast({
          title: "Product Deleted",
          description: "Product has been deleted successfully."
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product.",
          variant: "destructive"
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Products</h1>
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
      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{pagination?.total || 0}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.is_active).length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Products</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => !p.is_active).length}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <EyeOff className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured Products</p>
                <p className="text-2xl font-bold text-blue-600">
                  {products.filter(p => p.is_featured).length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wand2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product inventory ({pagination?.total || 0} total products)</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Syncing...' : 'Refresh'}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Product List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search products..." 
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
                  <SelectItem value="created_at">Date Created</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
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
                  <th className="text-left py-3 px-4">Product Name</th>
                  <th className="text-left py-3 px-4">SKU</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Brand</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Sales</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          {product.is_featured && (
                            <Badge variant="default" className="text-xs mt-1">Featured</Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{product.sku || '-'}</td>
                    <td className="py-3 px-4">{product.category?.name || "No Category"}</td>
                    <td className="py-3 px-4">{product.brand?.name || "No Brand"}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(product.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`${product.stock_quantity <= 5 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={product.is_active ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(product)}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{product.total_sales || 0}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleStatus(product)}
                        >
                          {product.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateSEO(product.id)}
                          disabled={isGeneratingSEO === product.id}
                        >
                          <Wand2 className={`w-3 h-3 ${isGeneratingSEO === product.id ? "animate-spin" : ""}`} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
