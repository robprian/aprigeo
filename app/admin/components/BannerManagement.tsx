"use client"

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, BarChart3, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useBanners, useBannerActions, useBannerAnalytics } from '@/hooks/useBanners'
import BannerForm from './BannerForm'
import BannerPreview from './BannerPreview'

interface BannerManagementProps {
  banners?: any[]
  isLoading?: boolean
  onEdit?: (banner: any) => void
  onRefresh?: () => void
}

export default function BannerManagement({ 
  banners: propBanners, 
  isLoading: propIsLoading, 
  onEdit, 
  onRefresh 
}: BannerManagementProps = {}) {
  const [showForm, setShowForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState<any>(null)
  const [previewBanner, setPreviewBanner] = useState<any>(null)
  const [selectedPosition, setSelectedPosition] = useState<string>('all')
  
  const { banners: hookBanners, isLoading: hookIsLoading, mutate } = useBanners({ 
    position: selectedPosition === 'all' ? undefined : selectedPosition 
  })
  const { analytics } = useBannerAnalytics()
  const { deleteBanner } = useBannerActions()

  // Use props if provided, otherwise use hook data
  const banners = propBanners || hookBanners
  const isLoading = propIsLoading !== undefined ? propIsLoading : hookIsLoading

  const handleEdit = (banner: any) => {
    if (onEdit) {
      onEdit(banner)
    } else {
      setEditingBanner(banner)
      setShowForm(true)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus banner ini?')) {
      try {
        await deleteBanner(id)
        if (onRefresh) {
          onRefresh()
        } else {
          mutate()
        }
      } catch (error) {
        console.error('Error deleting banner:', error)
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingBanner(null)
    mutate()
  }

  const getPositionBadge = (position: string) => {
    const colors = {
      hero: 'bg-blue-100 text-blue-800',
      banner: 'bg-green-100 text-green-800',
      sidebar: 'bg-yellow-100 text-yellow-800',
      footer: 'bg-purple-100 text-purple-800'
    }
    return colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getSizeBadge = (size: string) => {
    const colors = {
      small: 'bg-gray-100 text-gray-600',
      medium: 'bg-blue-100 text-blue-600',
      large: 'bg-green-100 text-green-600',
      full: 'bg-red-100 text-red-600'
    }
    return colors[size as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  if (showForm) {
    return (
      <BannerForm 
        banner={editingBanner} 
        onClose={handleFormClose} 
      />
    )
  }

  if (previewBanner) {
    return (
      <BannerPreview 
        banner={previewBanner} 
        onClose={() => setPreviewBanner(null)} 
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600 mt-1">Kelola banner iklan untuk storefront</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Banner
        </Button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Banner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.reduce((sum, item) => sum + parseInt(item.views || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.reduce((sum, item) => sum + parseInt(item.clicks || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Filter berdasarkan posisi:</label>
        <select 
          value={selectedPosition} 
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">Semua Posisi</option>
          <option value="hero">Hero</option>
          <option value="banner">Banner</option>
          <option value="sidebar">Sidebar</option>
          <option value="footer">Footer</option>
        </select>
      </div>

      {/* Banner List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posisi & Ukuran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="animate-pulse flex items-center">
                        <div className="w-16 h-12 bg-gray-200 rounded mr-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                  </tr>
                ))
              ) : banners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Image className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Belum ada banner yang dibuat</p>
                  </td>
                </tr>
              ) : (
                banners.map((banner) => {
                  const bannerAnalytics = analytics.find(a => a.id === banner.id)
                  return (
                    <tr key={banner.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 h-12 bg-gray-200 rounded mr-4 overflow-hidden">
                            <img 
                              src={banner.image_url} 
                              alt={banner.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {banner.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {banner.subtitle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <Badge className={getPositionBadge(banner.position)}>
                            {banner.position}
                          </Badge>
                          <Badge className={getSizeBadge(banner.size)}>
                            {banner.size}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={banner.is_active ? "default" : "secondary"}>
                          {banner.is_active ? 'Aktif' : 'Tidak Aktif'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="space-y-1">
                          <div>Views: {bannerAnalytics?.views || 0}</div>
                          <div>Clicks: {bannerAnalytics?.clicks || 0}</div>
                          <div>CTR: {bannerAnalytics?.ctr || 0}%</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPreviewBanner(banner)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(banner)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(banner.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
