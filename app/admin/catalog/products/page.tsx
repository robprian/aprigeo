"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Wand2, Edit, Trash2, Eye, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { formatCurrency } from "@/lib/currency"
import { motion } from "framer-motion"
import PageTransition from "@/components/ui/page-transition"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const { products, categories, brands, addProduct, updateProduct, deleteProduct, generateSEO } = useStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [viewingProduct, setViewingProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    status: "Active" as "Active" | "Inactive",
    description: "",
    brand: "",
    image: "/placeholder.svg?height=60&width=60",
    meta_title: "",
    meta_description: "",
    meta_tags: [] as string[],
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleGenerateSEO = async () => {
    setIsGeneratingSEO(true)
    try {
      const seoData = await generateSEO("product", `${formData.name} ${formData.description}`)
      setFormData((prev) => ({
        ...prev,
        meta_title: seoData.meta_title,
        meta_description: seoData.meta_description,
        meta_tags: seoData.meta_tags,
      }))
    } catch (error) {
      console.error("Failed to generate SEO:", error)
    } finally {
      setIsGeneratingSEO(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      category: "",
      stock: 0,
      status: "Active",
      description: "",
      brand: "",
      image: "/placeholder.svg?height=60&width=60",
      meta_title: "",
      meta_description: "",
      meta_tags: [],
    })
  }

  const handleAddProduct = () => {
    addProduct({
      ...formData,
      seo_optimized: !!(formData.meta_title && formData.meta_description),
    })
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        seo_optimized: !!(formData.meta_title && formData.meta_description),
      })
      setIsEditDialogOpen(false)
      setEditingProduct(null)
      resetForm()
    }
  }

  const openEditDialog = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      status: product.status,
      description: product.description || "",
      brand: product.brand || "",
      image: product.image,
      meta_title: product.meta_title || "",
      meta_description: product.meta_description || "",
      meta_tags: product.meta_tags || [],
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (product: any) => {
    setViewingProduct(product)
    setIsViewDialogOpen(true)
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
    }
  }

  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="seo">SEO Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-3"
            placeholder="Product name"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price (IDR) *
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="col-span-3"
            placeholder="0"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="brand" className="text-right">
            Brand
          </Label>
          <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.name}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">
            Stock *
          </Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            className="col-span-3"
            placeholder="0"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(value: "Active" | "Inactive") => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right pt-2">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="col-span-3"
            rows={3}
            placeholder="Product description"
          />
        </div>
      </TabsContent>

      <TabsContent value="seo" className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">SEO Optimization</h4>
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateSEO}
            disabled={isGeneratingSEO || !formData.name || !formData.description}
            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            {isGeneratingSEO ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            {isGeneratingSEO ? "Generating..." : "Magic SEO"}
          </Button>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="meta_title" className="text-right">
            Meta Title
          </Label>
          <Input
            id="meta_title"
            value={formData.meta_title}
            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            className="col-span-3"
            placeholder="SEO meta title"
            maxLength={60}
          />
        </div>
        <p className="text-xs text-gray-500 col-start-2 col-span-3">{formData.meta_title.length}/60 characters</p>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="meta_description" className="text-right pt-2">
            Meta Description
          </Label>
          <Textarea
            id="meta_description"
            value={formData.meta_description}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            className="col-span-3"
            rows={3}
            placeholder="SEO meta description"
            maxLength={160}
          />
        </div>
        <p className="text-xs text-gray-500 col-start-2 col-span-3">
          {formData.meta_description.length}/160 characters
        </p>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="meta_tags" className="text-right pt-2">
            Meta Tags
          </Label>
          <Input
            id="meta_tags"
            value={formData.meta_tags.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                meta_tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              })
            }
            className="col-span-3"
            placeholder="tag1, tag2, tag3"
          />
        </div>
        <p className="text-xs text-gray-500 col-start-2 col-span-3">Separate tags with commas</p>
      </TabsContent>
    </Tabs>
  )

  return (
    <PageTransition>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your product inventory</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product for your inventory.</DialogDescription>
              </DialogHeader>
              <FormContent />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleAddProduct}
                  disabled={!formData.name || !formData.category || formData.price <= 0}
                >
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl">Product List ({filteredProducts.length})</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.category}</p>
                        <p className="text-xs text-blue-600">{product.brand}</p>
                      </div>
                    </div>
                    <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{formatCurrency(product.price)}</p>
                      <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    </div>
                    <Badge variant={product.seo_optimized ? "default" : "outline"} className="text-xs">
                      {product.seo_optimized ? "SEO ✓" : "SEO ✗"}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openViewDialog(product)}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openEditDialog(product)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop view */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Brand</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Stock</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">SEO</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">{product.brand || "-"}</td>
                      <td className="py-3 px-4">{formatCurrency(product.price)}</td>
                      <td className="py-3 px-4">{product.stock}</td>
                      <td className="py-3 px-4">
                        <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={product.seo_optimized ? "default" : "outline"}>
                          {product.seo_optimized ? "Optimized" : "Not Optimized"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" onClick={() => openViewDialog(product)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                              <Edit className="w-3 h-3" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </motion.div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update product information and SEO settings.</DialogDescription>
            </DialogHeader>
            <FormContent isEdit />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleEditProduct}>
                Update Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {viewingProduct && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={viewingProduct.image || "/placeholder.svg"}
                    alt={viewingProduct.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{viewingProduct.name}</h3>
                    <p className="text-gray-600">{viewingProduct.category}</p>
                    <p className="text-blue-600">{viewingProduct.brand}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Price</label>
                    <p className="text-lg font-semibold">{formatCurrency(viewingProduct.price)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Stock</label>
                    <p className="text-lg font-semibold">{viewingProduct.stock}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p>
                      <Badge variant={viewingProduct.status === "Active" ? "default" : "secondary"}>
                        {viewingProduct.status}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">SEO Status</label>
                    <p>
                      <Badge variant={viewingProduct.seo_optimized ? "default" : "outline"}>
                        {viewingProduct.seo_optimized ? "Optimized" : "Not Optimized"}
                      </Badge>
                    </p>
                  </div>
                </div>

                {viewingProduct.description && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="mt-1 text-gray-900">{viewingProduct.description}</p>
                  </div>
                )}

                {viewingProduct.meta_title && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Meta Title</label>
                    <p className="mt-1 text-gray-900">{viewingProduct.meta_title}</p>
                  </div>
                )}

                {viewingProduct.meta_description && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Meta Description</label>
                    <p className="mt-1 text-gray-900">{viewingProduct.meta_description}</p>
                  </div>
                )}

                {viewingProduct.meta_tags && viewingProduct.meta_tags.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Meta Tags</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {viewingProduct.meta_tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}
