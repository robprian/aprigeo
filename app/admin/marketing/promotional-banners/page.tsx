"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, ImageIcon, Upload, Wand2, Save, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/lib/toast"

interface PromoBanner {
  id: number
  title: string
  subtitle: string
  description: string
  primary_text: string
  secondary_text: string
  discount_text: string
  button_text: string
  button_url: string
  image_url?: string
  background_color: string
  text_color: string
  accent_color: string
  banner_type: string
  is_active: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}

const backgroundOptions = [
  { value: 'bg-yellow-50', label: 'Light Yellow', preview: 'bg-yellow-50' },
  { value: 'bg-green-50', label: 'Light Green', preview: 'bg-green-50' },
  { value: 'bg-blue-50', label: 'Light Blue', preview: 'bg-blue-50' },
  { value: 'bg-red-50', label: 'Light Red', preview: 'bg-red-50' },
  { value: 'bg-purple-50', label: 'Light Purple', preview: 'bg-purple-50' },
  { value: 'bg-gray-50', label: 'Light Gray', preview: 'bg-gray-50' },
  { value: 'bg-orange-50', label: 'Light Orange', preview: 'bg-orange-50' },
]

const accentColorOptions = [
  { value: 'text-red-500', label: 'Red', preview: 'bg-red-500' },
  { value: 'text-green-600', label: 'Green', preview: 'bg-green-600' },
  { value: 'text-blue-600', label: 'Blue', preview: 'bg-blue-600' },
  { value: 'text-purple-600', label: 'Purple', preview: 'bg-purple-600' },
  { value: 'text-orange-600', label: 'Orange', preview: 'bg-orange-600' },
  { value: 'text-yellow-600', label: 'Yellow', preview: 'bg-yellow-600' },
  { value: 'text-gray-800', label: 'Dark Gray', preview: 'bg-gray-800' },
]

export default function PromotionalBannersPage() {
  const [banners, setBanners] = useState<PromoBanner[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [newBanner, setNewBanner] = useState<Partial<PromoBanner>>({
    title: "",
    subtitle: "",
    description: "",
    primary_text: "",
    secondary_text: "",
    discount_text: "",
    button_text: "Shop now",
    button_url: "/shop",
    background_color: "bg-yellow-50",
    text_color: "text-gray-900",
    accent_color: "text-red-500",
    banner_type: "promotional",
    is_active: true,
    display_order: 0,
  })

  useEffect(() => {
    loadBanners()
  }, [])

  const loadBanners = async () => {
    try {
      const response = await fetch('/api/admin/promotional-banners')
      const data = await response.json()
      if (data.success) {
        setBanners(data.banners || [])
      }
    } catch (error) {
      console.error('Error loading promotional banners:', error)
      toast.error('Failed to load promotional banners')
    } finally {
      setLoading(false)
    }
  }

  const addBanner = async (banner: Partial<PromoBanner>) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/promotional-banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banner),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Promotional banner added successfully!')
        setNewBanner({
          title: "",
          subtitle: "",
          description: "",
          primary_text: "",
          secondary_text: "",
          discount_text: "",
          button_text: "Shop now",
          button_url: "/shop",
          background_color: "bg-yellow-50",
          text_color: "text-gray-900",
          accent_color: "text-red-500",
          banner_type: "promotional",
          is_active: true,
          display_order: 0,
        })
        setShowAddForm(false)
        loadBanners()
      } else {
        toast.error(data.error || 'Failed to add banner')
      }
    } catch (error) {
      console.error('Error adding banner:', error)
      toast.error('Failed to add banner')
    } finally {
      setSaving(false)
    }
  }

  const updateBanner = async (id: number, banner: Partial<PromoBanner>) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/promotional-banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...banner }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Promotional banner updated successfully!')
        setEditingBanner(null)
        loadBanners()
      } else {
        toast.error(data.error || 'Failed to update banner')
      }
    } catch (error) {
      console.error('Error updating banner:', error)
      toast.error('Failed to update banner')
    } finally {
      setSaving(false)
    }
  }

  const deleteBanner = async (id: number) => {
    if (!confirm('Are you sure you want to delete this promotional banner?')) return

    try {
      const response = await fetch(`/api/admin/promotional-banners?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Promotional banner deleted successfully!')
        loadBanners()
      } else {
        toast.error(data.error || 'Failed to delete banner')
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast.error('Failed to delete banner')
    }
  }

  const toggleBannerStatus = async (id: number, isActive: boolean) => {
    await updateBanner(id, { is_active: isActive })
  }

  const handleFileUpload = async (file: File, isEdit = false) => {
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'promotional-banners')

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
        toast.success('Image uploaded successfully!')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const generateSampleContent = (bannerType: string, isEdit = false) => {
    const sampleContent = {
      discount: {
        title: 'GET EXTRA 50% OFF',
        primary_text: 'Fresh Products',
        secondary_text: 'Everyday',
        discount_text: 'SAVE UP TO 50%',
        background_color: 'bg-yellow-50',
        accent_color: 'text-red-500'
      },
      featured: {
        title: 'HOT THIS WEEK',
        primary_text: 'Premium Quality',
        secondary_text: 'Products',
        discount_text: 'Limited Time Offer',
        background_color: 'bg-green-50',
        accent_color: 'text-green-600'
      },
      promotional: {
        title: 'Special Offer',
        primary_text: 'Quality Products',
        secondary_text: 'Best Prices',
        discount_text: 'Free Shipping Available',
        background_color: 'bg-blue-50',
        accent_color: 'text-blue-600'
      }
    }

    const content = sampleContent[bannerType as keyof typeof sampleContent] || sampleContent.promotional

    if (isEdit && editingBanner) {
      setEditingBanner({ ...editingBanner, ...content })
    } else {
      setNewBanner({ ...newBanner, ...content })
    }

    toast.success('Sample content applied!')
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
          <h1 className="text-2xl font-bold">Promotional Banners</h1>
          <p className="text-gray-600">Manage promotional banners displayed on the homepage</p>
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
              Add New Promotional Banner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Banner Title</Label>
                <Input
                  id="title"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  placeholder="e.g., GET EXTRA 50% OFF"
                />
              </div>
              <div>
                <Label htmlFor="banner_type">Banner Type</Label>
                <Select
                  value={newBanner.banner_type}
                  onValueChange={(value) => setNewBanner({ ...newBanner, banner_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select banner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Discount Banner</SelectItem>
                    <SelectItem value="featured">Featured Banner</SelectItem>
                    <SelectItem value="promotional">Promotional Banner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary_text">Primary Text</Label>
                <Input
                  id="primary_text"
                  value={newBanner.primary_text}
                  onChange={(e) => setNewBanner({ ...newBanner, primary_text: e.target.value })}
                  placeholder="e.g., Fresh Products"
                />
              </div>
              <div>
                <Label htmlFor="secondary_text">Secondary Text</Label>
                <Input
                  id="secondary_text"
                  value={newBanner.secondary_text}
                  onChange={(e) => setNewBanner({ ...newBanner, secondary_text: e.target.value })}
                  placeholder="e.g., Everyday"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="discount_text">Discount/Promotional Text</Label>
              <Input
                id="discount_text"
                value={newBanner.discount_text}
                onChange={(e) => setNewBanner({ ...newBanner, discount_text: e.target.value })}
                placeholder="e.g., SAVE UP TO 50%"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="button_text">Button Text</Label>
                <Input
                  id="button_text"
                  value={newBanner.button_text}
                  onChange={(e) => setNewBanner({ ...newBanner, button_text: e.target.value })}
                  placeholder="Shop now"
                />
              </div>
              <div>
                <Label htmlFor="button_url">Button URL</Label>
                <Input
                  id="button_url"
                  value={newBanner.button_url}
                  onChange={(e) => setNewBanner({ ...newBanner, button_url: e.target.value })}
                  placeholder="/shop"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="background_color">Background Color</Label>
                <Select
                  value={newBanner.background_color}
                  onValueChange={(value) => setNewBanner({ ...newBanner, background_color: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    {backgroundOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${option.preview} border`}></div>
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accent_color">Accent Color</Label>
                <Select
                  value={newBanner.accent_color}
                  onValueChange={(value) => setNewBanner({ ...newBanner, accent_color: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    {accentColorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${option.preview}`}></div>
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={newBanner.display_order}
                  onChange={(e) => setNewBanner({ ...newBanner, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="is_active"
                  checked={newBanner.is_active}
                  onCheckedChange={(checked) => setNewBanner({ ...newBanner, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Banner Image (Optional)</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file, false)
                }}
                className="w-full p-2 border rounded-md"
                disabled={uploading}
              />
              {uploading && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading image...
                </div>
              )}
              {newBanner.image_url && (
                <div className="mt-2">
                  <img
                    src={newBanner.image_url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => generateSampleContent(newBanner.banner_type || 'promotional')}
                disabled={saving}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Sample Content
              </Button>
              
              <div className="flex gap-2 ml-auto">
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
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No promotional banners found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first promotional banner</p>
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
                    <div className={`relative overflow-hidden rounded-lg ${banner.background_color} p-4 h-48`}>
                      {banner.image_url && (
                        <img
                          src={banner.image_url}
                          alt={banner.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className={`relative z-10 ${banner.text_color}`}>
                        <div className={`text-sm ${banner.accent_color} font-bold mb-1`}>{banner.title}</div>
                        <h3 className="text-lg font-bold">{banner.primary_text}</h3>
                        <h4 className="text-lg font-bold">{banner.secondary_text}</h4>
                        <div className={`text-sm ${banner.accent_color} mt-2`}>{banner.discount_text}</div>
                        <div className={`text-xs ${banner.accent_color} mt-2 font-medium`}>{banner.button_text.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Banner Info */}
                  <div className="lg:w-2/3 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{banner.title}</h3>
                        <p className="text-gray-600 mt-1">{banner.primary_text} {banner.secondary_text}</p>
                        <p className="text-sm text-gray-500 mt-2">{banner.discount_text}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={banner.is_active ? "default" : "secondary"}>
                          {banner.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {banner.banner_type}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Button: {banner.button_text}</span>
                      <span>URL: {banner.button_url}</span>
                      <span>Order: {banner.display_order}</span>
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

      {/* Edit Banner Modal */}
      {editingBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Promotional Banner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Banner Title</Label>
                  <Input
                    id="edit-title"
                    value={editingBanner.title}
                    onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-banner_type">Banner Type</Label>
                  <Select
                    value={editingBanner.banner_type}
                    onValueChange={(value) => setEditingBanner({ ...editingBanner, banner_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Discount Banner</SelectItem>
                      <SelectItem value="featured">Featured Banner</SelectItem>
                      <SelectItem value="promotional">Promotional Banner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-primary_text">Primary Text</Label>
                  <Input
                    id="edit-primary_text"
                    value={editingBanner.primary_text}
                    onChange={(e) => setEditingBanner({ ...editingBanner, primary_text: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-secondary_text">Secondary Text</Label>
                  <Input
                    id="edit-secondary_text"
                    value={editingBanner.secondary_text}
                    onChange={(e) => setEditingBanner({ ...editingBanner, secondary_text: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-discount_text">Discount/Promotional Text</Label>
                <Input
                  id="edit-discount_text"
                  value={editingBanner.discount_text}
                  onChange={(e) => setEditingBanner({ ...editingBanner, discount_text: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-button_text">Button Text</Label>
                  <Input
                    id="edit-button_text"
                    value={editingBanner.button_text}
                    onChange={(e) => setEditingBanner({ ...editingBanner, button_text: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-button_url">Button URL</Label>
                  <Input
                    id="edit-button_url"
                    value={editingBanner.button_url}
                    onChange={(e) => setEditingBanner({ ...editingBanner, button_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-background_color">Background Color</Label>
                  <Select
                    value={editingBanner.background_color}
                    onValueChange={(value) => setEditingBanner({ ...editingBanner, background_color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${option.preview} border`}></div>
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-accent_color">Accent Color</Label>
                  <Select
                    value={editingBanner.accent_color}
                    onValueChange={(value) => setEditingBanner({ ...editingBanner, accent_color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accentColorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${option.preview}`}></div>
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-display_order">Display Order</Label>
                  <Input
                    id="edit-display_order"
                    type="number"
                    value={editingBanner.display_order}
                    onChange={(e) => setEditingBanner({ ...editingBanner, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="edit-is_active"
                    checked={editingBanner.is_active}
                    onCheckedChange={(checked) => setEditingBanner({ ...editingBanner, is_active: checked })}
                  />
                  <Label htmlFor="edit-is_active">Active</Label>
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
                  className="w-full p-2 border rounded-md"
                  disabled={uploading}
                />
                {uploading && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading image...
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => generateSampleContent(editingBanner.banner_type, true)}
                  disabled={saving}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Sample Content
                </Button>
                
                <div className="flex gap-2 ml-auto">
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
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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
