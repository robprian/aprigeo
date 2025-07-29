"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Globe, 
  FileText, 
  Settings, 
  Save, 
  X,
  Loader2
} from "lucide-react"
import { toast } from "@/lib/toast"

interface PageSetting {
  id: number
  page_slug: string
  page_name: string
  is_visible: boolean
  meta_title: string
  meta_description: string
  custom_content: string
  page_type: string
  display_order: number
  created_at: string
  updated_at: string
}

const pageTypes = [
  { value: 'static', label: 'Static Page' },
  { value: 'category', label: 'Category Page' },
  { value: 'service', label: 'Service Page' },
  { value: 'account', label: 'Account Page' },
  { value: 'legal', label: 'Legal Page' },
]

export default function PageManagementPage() {
  const [pages, setPages] = useState<PageSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPage, setEditingPage] = useState<PageSetting | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const [newPage, setNewPage] = useState<Partial<PageSetting>>({
    page_slug: "",
    page_name: "",
    is_visible: true,
    meta_title: "",
    meta_description: "",
    custom_content: "",
    page_type: "static",
    display_order: 0,
  })

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      const data = await response.json()
      if (data.success) {
        setPages(data.pages || [])
      }
    } catch (error) {
      console.error('Error loading pages:', error)
      toast.error('Failed to load pages')
    } finally {
      setLoading(false)
    }
  }

  const addPage = async (page: Partial<PageSetting>) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Page added successfully!')
        setNewPage({
          page_slug: "",
          page_name: "",
          is_visible: true,
          meta_title: "",
          meta_description: "",
          custom_content: "",
          page_type: "static",
          display_order: 0,
        })
        setShowAddForm(false)
        loadPages()
      } else {
        toast.error(data.error || 'Failed to add page')
      }
    } catch (error) {
      console.error('Error adding page:', error)
      toast.error('Failed to add page')
    } finally {
      setSaving(false)
    }
  }

  const updatePage = async (id: number, page: Partial<PageSetting>) => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...page }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Page updated successfully!')
        setEditingPage(null)
        loadPages()
      } else {
        toast.error(data.error || 'Failed to update page')
      }
    } catch (error) {
      console.error('Error updating page:', error)
      toast.error('Failed to update page')
    } finally {
      setSaving(false)
    }
  }

  const deletePage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      const response = await fetch(`/api/admin/pages?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Page deleted successfully!')
        loadPages()
      } else {
        toast.error(data.error || 'Failed to delete page')
      }
    } catch (error) {
      console.error('Error deleting page:', error)
      toast.error('Failed to delete page')
    }
  }

  const togglePageVisibility = async (id: number, isVisible: boolean) => {
    await updatePage(id, { is_visible: isVisible })
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
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
          <h1 className="text-2xl font-bold">Page Management</h1>
          <p className="text-gray-600">Manage website pages visibility and content</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Page
        </Button>
      </div>

      {/* Add Page Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="page_name">Page Name</Label>
                <Input
                  id="page_name"
                  value={newPage.page_name}
                  onChange={(e) => {
                    const name = e.target.value
                    setNewPage({ 
                      ...newPage, 
                      page_name: name,
                      page_slug: generateSlug(name),
                      meta_title: name
                    })
                  }}
                  placeholder="About Us"
                />
              </div>
              <div>
                <Label htmlFor="page_slug">Page Slug</Label>
                <Input
                  id="page_slug"
                  value={newPage.page_slug}
                  onChange={(e) => setNewPage({ ...newPage, page_slug: e.target.value })}
                  placeholder="about-us"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="page_type">Page Type</Label>
                <Select
                  value={newPage.page_type}
                  onValueChange={(value) => setNewPage({ ...newPage, page_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select page type" />
                  </SelectTrigger>
                  <SelectContent>
                    {pageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={newPage.display_order}
                  onChange={(e) => setNewPage({ ...newPage, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={newPage.meta_title}
                onChange={(e) => setNewPage({ ...newPage, meta_title: e.target.value })}
                placeholder="SEO optimized title"
              />
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={newPage.meta_description}
                onChange={(e) => setNewPage({ ...newPage, meta_description: e.target.value })}
                placeholder="SEO meta description"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="custom_content">Custom Content (Optional)</Label>
              <Textarea
                id="custom_content"
                value={newPage.custom_content}
                onChange={(e) => setNewPage({ ...newPage, custom_content: e.target.value })}
                placeholder="Custom HTML or markdown content"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_visible"
                checked={newPage.is_visible}
                onCheckedChange={(checked) => setNewPage({ ...newPage, is_visible: checked })}
              />
              <Label htmlFor="is_visible">Page Visible</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => addPage(newPage)}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Add Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pages List */}
      <div className="grid gap-4">
        {pages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first page</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Page
              </Button>
            </CardContent>
          </Card>
        ) : (
          pages.map((page) => (
            <Card key={page.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{page.page_name}</h3>
                      <Badge variant={page.is_visible ? "default" : "secondary"}>
                        {page.is_visible ? "Visible" : "Hidden"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {page.page_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>URL:</strong> /{page.page_slug}
                    </p>
                    <p className="text-sm text-gray-500">
                      {page.meta_description || 'No description available'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingPage(page)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePageVisibility(page.id, !page.is_visible)}
                    >
                      {page.is_visible ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Show
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deletePage(page.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Page Modal */}
      {editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Edit Page: {editingPage.page_name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingPage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-page_name">Page Name</Label>
                  <Input
                    id="edit-page_name"
                    value={editingPage.page_name}
                    onChange={(e) => setEditingPage({ ...editingPage, page_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-page_slug">Page Slug</Label>
                  <Input
                    id="edit-page_slug"
                    value={editingPage.page_slug}
                    onChange={(e) => setEditingPage({ ...editingPage, page_slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-page_type">Page Type</Label>
                  <Select
                    value={editingPage.page_type}
                    onValueChange={(value) => setEditingPage({ ...editingPage, page_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pageTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-display_order">Display Order</Label>
                  <Input
                    id="edit-display_order"
                    type="number"
                    value={editingPage.display_order}
                    onChange={(e) => setEditingPage({ ...editingPage, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-meta_title">Meta Title</Label>
                <Input
                  id="edit-meta_title"
                  value={editingPage.meta_title}
                  onChange={(e) => setEditingPage({ ...editingPage, meta_title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-meta_description">Meta Description</Label>
                <Textarea
                  id="edit-meta_description"
                  value={editingPage.meta_description}
                  onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="edit-custom_content">Custom Content</Label>
                <Textarea
                  id="edit-custom_content"
                  value={editingPage.custom_content}
                  onChange={(e) => setEditingPage({ ...editingPage, custom_content: e.target.value })}
                  rows={6}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_visible"
                  checked={editingPage.is_visible}
                  onCheckedChange={(checked) => setEditingPage({ ...editingPage, is_visible: checked })}
                />
                <Label htmlFor="edit-is_visible">Page Visible</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingPage(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => updatePage(editingPage.id, editingPage)}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Update Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
