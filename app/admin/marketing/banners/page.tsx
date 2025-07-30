"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function BannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner, toggleBanner } = useStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<any>(null)
  const [viewingBanner, setViewingBanner] = useState<any>(null)

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    mainText: "",
    highlight: "",
    discount: "",
    discountText: "",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    background: "bg-gradient-to-r from-gray-50 to-gray-100",
    image: "/placeholder.svg?height=300&width=300",
    isActive: true,
    position: "hero" as "hero" | "promo",
    order: 1,
  })

  const heroBanners = banners.filter((b) => b.position === "hero").sort((a, b) => a.order - b.order)
  const promoBanners = banners.filter((b) => b.position === "promo").sort((a, b) => a.order - b.order)

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      mainText: "",
      highlight: "",
      discount: "",
      discountText: "",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      background: "bg-gradient-to-r from-gray-50 to-gray-100",
      image: "/placeholder.svg?height=300&width=300",
      isActive: true,
      position: "hero",
      order: 1,
    })
  }

  const handleAddBanner = () => {
    addBanner(formData)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditBanner = () => {
    if (editingBanner) {
      updateBanner(editingBanner.id, formData)
      setIsEditDialogOpen(false)
      setEditingBanner(null)
      resetForm()
    }
  }

  const openEditDialog = (banner: any) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      mainText: banner.mainText,
      highlight: banner.highlight,
      discount: banner.discount || "",
      discountText: banner.discountText || "",
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      background: banner.background,
      image: banner.image,
      isActive: banner.isActive,
      position: banner.position,
      order: banner.order,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (banner: any) => {
    setViewingBanner(banner)
    setIsViewDialogOpen(true)
  }

  const handleDeleteBanner = (id: number) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      deleteBanner(id)
    }
  }

  const BannerPreview = ({ banner }: { banner: any }) => (
    <div className={`relative rounded-lg overflow-hidden ${banner.background} p-6 h-40`}>
      <div className="flex items-center justify-between h-full">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600">{banner.title}</p>
          <h3 className="text-lg font-bold text-gray-800">
            {banner.mainText}
            {banner.highlight && <span className="text-green-600 ml-1">{banner.highlight}</span>}
          </h3>
          {banner.discount && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{banner.discountText}</span>
              <span className="text-xl font-bold text-orange-500">{banner.discount}%</span>
            </div>
          )}
          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1">
            {banner.buttonText}
          </Button>
        </div>
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  )

  const FormContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="position" className="text-right">
          Position *
        </Label>
        <Select
          value={formData.position}
          onValueChange={(value: "hero" | "promo") => setFormData({ ...formData, position: value })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hero">Hero Banner (Large)</SelectItem>
            <SelectItem value="promo">Promo Banner (Small)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="col-span-3"
          placeholder="Banner title"
        />
      </div>

      {formData.position === "promo" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="subtitle" className="text-right">
            Subtitle
          </Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="col-span-3"
            placeholder="Banner subtitle"
          />
        </div>
      )}

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="mainText" className="text-right">
          Main Text *
        </Label>
        <Input
          id="mainText"
          value={formData.mainText}
          onChange={(e) => setFormData({ ...formData, mainText: e.target.value })}
          className="col-span-3"
          placeholder="Main text"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="highlight" className="text-right">
          Highlight Text
        </Label>
        <Input
          id="highlight"
          value={formData.highlight}
          onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
          className="col-span-3"
          placeholder="Highlighted text"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="discount" className="text-right col-span-2">
            Discount %
          </Label>
          <Input
            id="discount"
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            className="col-span-2"
            placeholder="25"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="discountText" className="text-right col-span-2">
            Discount Text
          </Label>
          <Input
            id="discountText"
            value={formData.discountText}
            onChange={(e) => setFormData({ ...formData, discountText: e.target.value })}
            className="col-span-2"
            placeholder="Save up to"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="buttonText" className="text-right">
          Button Text *
        </Label>
        <Input
          id="buttonText"
          value={formData.buttonText}
          onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
          className="col-span-3"
          placeholder="Shop Now"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="buttonLink" className="text-right">
          Button Link *
        </Label>
        <Input
          id="buttonLink"
          value={formData.buttonLink}
          onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
          className="col-span-3"
          placeholder="/shop"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="background" className="text-right">
          Background Class
        </Label>
        <Select value={formData.background} onValueChange={(value) => setFormData({ ...formData, background: value })}>
          <SelectTrigger className="col-span-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bg-gradient-to-r from-gray-50 to-gray-100">Gray Gradient</SelectItem>
            <SelectItem value="bg-gradient-to-r from-green-50 to-blue-50">Green-Blue Gradient</SelectItem>
            <SelectItem value="bg-gradient-to-r from-orange-50 to-yellow-50">Orange-Yellow Gradient</SelectItem>
            <SelectItem value="bg-yellow-50">Yellow</SelectItem>
            <SelectItem value="bg-blue-50">Blue</SelectItem>
            <SelectItem value="bg-green-50">Green</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="order" className="text-right">
          Display Order
        </Label>
        <Input
          id="order"
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
          className="col-span-3"
          placeholder="1"
          min="1"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isActive" className="text-right">
          Active
        </Label>
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label>Preview</Label>
        <BannerPreview banner={formData} />
      </div>
    </div>
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
            <p className="text-gray-600">Manage homepage banners and promotional content</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Banner
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Banner</DialogTitle>
                <DialogDescription>Design a new banner for your homepage.</DialogDescription>
              </DialogHeader>
              <FormContent />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddBanner}
                  disabled={!formData.title || !formData.mainText || !formData.buttonText}
                >
                  Create Banner
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Hero Banners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Hero Banners (Large - Main Slider)</span>
              <Badge variant="outline">{heroBanners.length} banners</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heroBanners.map((banner, index) => (
                <motion.div
                  key={banner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{banner.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => toggleBanner(banner.id)}>
                        {banner.isActive ? (
                          <ToggleRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <BannerPreview banner={banner} />

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openViewDialog(banner)}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openEditDialog(banner)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteBanner(banner.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            {heroBanners.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hero banners created yet. Add your first banner to get started.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promo Banners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Promo Banners (Small - Grid Layout)</span>
              <Badge variant="outline">{promoBanners.length} banners</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promoBanners.map((banner, index) => (
                <motion.div
                  key={banner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{banner.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => toggleBanner(banner.id)}>
                        {banner.isActive ? (
                          <ToggleRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <BannerPreview banner={banner} />

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openViewDialog(banner)}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => openEditDialog(banner)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteBanner(banner.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            {promoBanners.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No promo banners created yet. Add your first banner to get started.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Banner</DialogTitle>
              <DialogDescription>Update banner information and settings.</DialogDescription>
            </DialogHeader>
            <FormContent />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditBanner}>Update Banner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Banner Details</DialogTitle>
            </DialogHeader>
            {viewingBanner && (
              <div className="space-y-4">
                <BannerPreview banner={viewingBanner} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Position</label>
                    <p className="capitalize">{viewingBanner.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p>
                      <Badge variant={viewingBanner.isActive ? "default" : "secondary"}>
                        {viewingBanner.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order</label>
                    <p>{viewingBanner.order}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Button Link</label>
                    <p className="text-blue-600">{viewingBanner.buttonLink}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Background Class</label>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{viewingBanner.background}</p>
                </div>
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
