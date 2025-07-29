"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, ImageIcon, Upload, Wand2, Download, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useDebounce } from "@/hooks/use-debounce"

interface Banner {
  id: number
  title: string
  subtitle: string
  description: string
  image_url: string
  button_text: string
  button_url: string
  is_active: boolean
  order_index: number
  created_at: string
  updated_at: string
}

interface Product {
  id: number
  name: string
  slug: string
  category?: string
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [generatingMagic, setGeneratingMagic] = useState(false)
  const [searchingProducts, setSearchingProducts] = useState(false)
  const [productSearchQuery, setProductSearchQuery] = useState("")
  const [productResults, setProductResults] = useState<Product[]>([])
  const { toast } = useToast()

  const [newBanner, setNewBanner] = useState<Partial<Banner>>({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    button_text: "Lihat Produk",
    button_url: "/shop",
    is_active: true,
    order_index: 0,
  })

  const debouncedProductSearch = useDebounce(productSearchQuery, 300)

  // Load banners
  const loadBanners = async () => {
    try {
      const response = await fetch('/api/admin/banners')
      if (response.ok) {
        const data = await response.json()
        setBanners(data.banners || [])
      }
    } catch (error) {
      console.error('Error loading banners:', error)
      toast({
        title: "Error",
        description: "Failed to load banners",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBanners()
  }, [])

  // Search products
  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedProductSearch.trim()) {
        setProductResults([])
        return
      }

      setSearchingProducts(true)
      try {
        const response = await fetch(`/api/products?search=${encodeURIComponent(debouncedProductSearch)}&limit=10`)
        if (response.ok) {
          const data = await response.json()
          setProductResults(data.products || [])
        }
      } catch (error) {
        console.error('Error searching products:', error)
      } finally {
        setSearchingProducts(false)
      }
    }

    searchProducts()
  }, [debouncedProductSearch])

  // Add banner
  const addBanner = async (banner: Partial<Banner>) => {
    try {
      // Upload image if file is selected
      let imageUrl = banner.image_url || ""

      const response = await fetch('/api/admin/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...banner,
          image_url: imageUrl,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Banner added successfully",
        })
        setNewBanner({
          title: "",
          subtitle: "",
          description: "",
          image_url: "",
          button_text: "Lihat Produk",
          button_url: "/shop",
          is_active: true,
          order_index: 0,
        })
        setShowAddForm(false)
        loadBanners()
      } else {
        throw new Error('Failed to add banner')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add banner",
        variant: "destructive",
      })
    }
  }

  // Update banner
  const updateBanner = async (id: number, banner: Partial<Banner>) => {
    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banner),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Banner updated successfully",
        })
        setEditingBanner(null)
        loadBanners()
      } else {
        throw new Error('Failed to update banner')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update banner",
        variant: "destructive",
      })
    }
  }

  // Delete banner
  const deleteBanner = async (id: number) => {
    if (!confirm('Are you sure you want to delete this banner?')) return

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Banner deleted successfully",
        })
        loadBanners()
      } else {
        throw new Error('Failed to delete banner')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete banner",
        variant: "destructive",
      })
    }
  }

  // Toggle banner status
  const toggleBannerStatus = async (id: number, isActive: boolean) => {
    await updateBanner(id, { is_active: isActive })
  }

  // Handle file upload
  const handleFileUpload = async (file: File, isEdit = false) => {
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'banners')

    setUploading(true)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        if (isEdit && editingBanner) {
          setEditingBanner({ ...editingBanner, image_url: data.url })
        } else {
          setNewBanner({ ...newBanner, image_url: data.url })
        }
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        })
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  // Generate magic SEO content
  const generateMagicContent = async (isEdit = false) => {
    setGeneratingMagic(true)
    try {
      // Simulate API call for SEO content generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const magicContent = {
        title: "GPS Survey Equipment - Precision Tools",
        subtitle: "Professional Grade Mapping Solutions",
        description: "Discover our comprehensive range of GPS survey equipment, GNSS receivers, and professional mapping tools. Get accurate positioning and reliable data collection for your surveying projects.",
        button_text: "Explore Products",
        button_url: "/shop/gps-equipment"
      }

      if (isEdit && editingBanner) {
        setEditingBanner({ ...editingBanner, ...magicContent })
      } else {
        setNewBanner({ ...newBanner, ...magicContent })
      }

      toast({
        title: "✨ Magic Applied!",
        description: "SEO-optimized content generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive",
      })
    } finally {
      setGeneratingMagic(false)
    }
  }

  // Select product for banner URL
  const selectProduct = (product: Product, isEdit = false) => {
    const productUrl = `/product/${product.slug}`
    if (isEdit && editingBanner) {
      setEditingBanner({ ...editingBanner, button_url: productUrl })
    } else {
      setNewBanner({ ...newBanner, button_url: productUrl })
    }
    setProductSearchQuery("")
    setProductResults([])
    toast({
      title: "Product Selected",
      description: `Banner will link to ${product.name}`,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Banner Management</h1>
          <p className="text-gray-600">Manage homepage banners and promotional content</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {/* Add Banner Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Banner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  placeholder="Banner title..."
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={newBanner.subtitle}
                  onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                  placeholder="Banner subtitle..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newBanner.description}
                onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
                placeholder="Banner description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="button_text">Button Text</Label>
                <Input
                  id="button_text"
                  value={newBanner.button_text}
                  onChange={(e) => setNewBanner({ ...newBanner, button_text: e.target.value })}
                  placeholder="Button text..."
                />
              </div>
              <div>
                <Label htmlFor="button_url">Button URL</Label>
                <Input
                  id="button_url"
                  value={newBanner.button_url}
                  onChange={(e) => setNewBanner({ ...newBanner, button_url: e.target.value })}
                  placeholder="/shop or /product/slug"
                />
              </div>
            </div>

            {/* Product Search */}
            <div>
              <Label>Search Products for Banner Link</Label>
              <Input
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
                placeholder="Type product name to search..."
              />
              {searchingProducts && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching products...
                </div>
              )}
              {productResults.length > 0 && (
                <div className="mt-2 border border-gray-200 rounded-md max-h-40 overflow-y-auto">
                  {productResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => selectProduct(product)}
                    >
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">/product/{product.slug}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Banner Image</Label>
              <div className="mt-2 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploading && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading image...
                  </div>
                )}
                {newBanner.image_url && (
                  <div className="relative">
                    <img
                      src={newBanner.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => generateMagicContent()}
                disabled={generatingMagic}
                className="flex items-center gap-2"
              >
                {generatingMagic ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                {generatingMagic ? "Generating..." : "✨ Magic SEO"}
              </Button>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => addBanner(newBanner)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Add Banner
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banners List */}
      <div className="grid gap-4">
        {banners.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No banners found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first banner</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Banner
              </Button>
            </CardContent>
          </Card>
        ) : (
          banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Banner Preview */}
                  <div className="lg:w-1/3">
                    {banner.image_url ? (
                      <img
                        src={banner.image_url}
                        alt={banner.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Banner Info */}
                  <div className="lg:w-2/3 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{banner.title}</h3>
                        <p className="text-gray-600 mt-1">{banner.subtitle}</p>
                        <p className="text-sm text-gray-500 mt-2">{banner.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={banner.is_active ? "default" : "secondary"}>
                          {banner.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Button: {banner.button_text}</span>
                      <span>URL: {banner.button_url}</span>
                      <span>Order: {banner.order_index}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingBanner(banner)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleBannerStatus(banner.id, !banner.is_active)}
                      >
                        {banner.is_active ? (
                          <>
                            <ToggleRight className="w-4 h-4 mr-1" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteBanner(banner.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Banner Modal/Form */}
      {editingBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Banner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingBanner.title}
                    onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-subtitle">Subtitle</Label>
                  <Input
                    id="edit-subtitle"
                    value={editingBanner.subtitle}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingBanner.description}
                  onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-button-text">Button Text</Label>
                  <Input
                    id="edit-button-text"
                    value={editingBanner.button_text}
                    onChange={(e) => setEditingBanner({ ...editingBanner, button_text: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-button-url">Button URL</Label>
                  <Input
                    id="edit-button-url"
                    value={editingBanner.button_url}
                    onChange={(e) => setEditingBanner({ ...editingBanner, button_url: e.target.value })}
                  />
                </div>
              </div>

              {/* Current Image */}
              {editingBanner.image_url && (
                <div>
                  <Label>Current Image</Label>
                  <img
                    src={editingBanner.image_url}
                    alt="Current"
                    className="w-full h-32 object-cover rounded-md mt-2"
                  />
                </div>
              )}

              {/* Upload New Image */}
              <div>
                <Label htmlFor="edit-image">Upload New Image</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, true)
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
                />
                {uploading && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading image...
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => generateMagicContent(true)}
                  disabled={generatingMagic}
                  className="flex items-center gap-2"
                >
                  {generatingMagic ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                  {generatingMagic ? "Generating..." : "✨ Magic SEO"}
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingBanner(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => updateBanner(editingBanner.id, editingBanner)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Update Banner
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
