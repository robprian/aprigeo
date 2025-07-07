"use client"

import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBannerActions } from '@/hooks/useBanners'

interface BannerFormProps {
  banner?: any
  onClose: () => void
  onSave?: () => void
  onCancel?: () => void
}

export default function BannerForm({ banner, onClose, onSave, onCancel }: BannerFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    mobile_image_url: '',
    button_text: '',
    button_url: '',
    background_color: '#1e40af',
    text_color: '#ffffff',
    position: 'hero',
    size: 'large',
    is_active: true,
    display_order: 0,
    start_date: new Date().toISOString().slice(0, 16),
    end_date: '',
    target_audience: 'all'
  })

  const [preview, setPreview] = useState(false)
  const { createBanner, updateBanner, isLoading, error } = useBannerActions()

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        description: banner.description || '',
        image_url: banner.image_url || '',
        mobile_image_url: banner.mobile_image_url || '',
        button_text: banner.button_text || '',
        button_url: banner.button_url || '',
        background_color: banner.background_color || '#1e40af',
        text_color: banner.text_color || '#ffffff',
        position: banner.position || 'hero',
        size: banner.size || 'large',
        is_active: banner.is_active ?? true,
        display_order: banner.display_order || 0,
        start_date: banner.start_date ? new Date(banner.start_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        end_date: banner.end_date ? new Date(banner.end_date).toISOString().slice(0, 16) : '',
        target_audience: banner.target_audience || 'all'
      })
    }
  }, [banner])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (banner) {
        await updateBanner(banner.id, formData as any)
      } else {
        await createBanner(formData as any)
      }
      onSave?.()
      onClose()
    } catch (error) {
      console.error('Error saving banner:', error)
    }
  }

  const generateImageFromUnsplash = (searchTerm: string) => {
    const width = formData.size === 'small' ? 400 : formData.size === 'medium' ? 600 : 1200
    const height = formData.size === 'small' ? 200 : formData.size === 'medium' ? 300 : 400
    return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(searchTerm)}`
  }

  const handleGenerateImage = () => {
    const searchTerm = `${formData.title} ${formData.position} technology`
    const imageUrl = generateImageFromUnsplash(searchTerm)
    setFormData(prev => ({ ...prev, image_url: imageUrl }))
    
    // Generate mobile version
    const mobileUrl = generateImageFromUnsplash(`${searchTerm} mobile`)
    setFormData(prev => ({ ...prev, mobile_image_url: mobileUrl }))
  }

  if (preview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setPreview(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Form
          </Button>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg">
          <div 
            className="relative overflow-hidden rounded-lg"
            style={{
              height: formData.size === 'small' ? '128px' : 
                     formData.size === 'medium' ? '192px' : '320px',
              backgroundColor: formData.background_color,
              color: formData.text_color
            }}
          >
            {formData.image_url && (
              <div className="absolute inset-0">
                <img
                  src={formData.image_url}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            )}
            
            <div className="relative z-10 h-full flex items-center p-6">
              <div className="max-w-lg">
                <h1 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
                  {formData.title}
                </h1>
                {formData.subtitle && (
                  <h2 className="text-lg font-medium mb-3 text-white/90 drop-shadow-lg">
                    {formData.subtitle}
                  </h2>
                )}
                {formData.description && (
                  <p className="text-sm mb-4 text-white/80 drop-shadow-lg">
                    {formData.description}
                  </p>
                )}
                {formData.button_text && (
                  <Button className="bg-white text-gray-900 hover:bg-gray-100">
                    {formData.button_text}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {banner ? 'Edit Banner' : 'Tambah Banner'}
            </h1>
            <p className="text-gray-600 mt-1">
              {banner ? 'Update informasi banner' : 'Buat banner baru untuk storefront'}
            </p>
          </div>
        </div>
        <Button onClick={() => setPreview(true)} variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Banner *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Button
                </label>
                <input
                  type="text"
                  name="button_text"
                  value={formData.button_text}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Button
                </label>
                <input
                  type="url"
                  name="button_url"
                  value={formData.button_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Tampilan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Posisi Banner *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="hero">Hero</option>
                  <option value="banner">Banner</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="footer">Footer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ukuran Banner *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="full">Full Screen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urutan Tampilan
                </label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warna Background
                  </label>
                  <input
                    type="color"
                    name="background_color"
                    value={formData.background_color}
                    onChange={handleInputChange}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warna Text
                  </label>
                  <input
                    type="color"
                    name="text_color"
                    value={formData.text_color}
                    onChange={handleInputChange}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <select
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua</option>
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                  <option value="new_visitors">Pengunjung Baru</option>
                  <option value="returning_visitors">Pengunjung Lama</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Banner Aktif
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Gambar Banner
              <Button type="button" variant="outline" onClick={handleGenerateImage}>
                <Upload className="w-4 h-4 mr-2" />
                Generate Gambar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar Desktop *
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {formData.image_url && (
                <div className="mt-2">
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="max-w-full h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar Mobile
              </label>
              <input
                type="url"
                name="mobile_image_url"
                value={formData.mobile_image_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.mobile_image_url && (
                <div className="mt-2">
                  <img 
                    src={formData.mobile_image_url} 
                    alt="Mobile Preview" 
                    className="max-w-full h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Tampil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Mulai *
                </label>
                <input
                  type="datetime-local"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Berakhir
                </label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : banner ? 'Update Banner' : 'Simpan Banner'}
          </Button>
        </div>
      </form>
    </div>
  )
}
