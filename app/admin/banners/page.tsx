"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BannerManagement from '@/app/admin/components/BannerManagement'
import BannerForm from '@/app/admin/components/BannerForm'
import { useBanners } from '@/hooks/useBanners'

export default function AdminBannersPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState<any>(null)
  const { banners, isLoading, mutate } = useBanners({ includeInactive: true })

  const handleCreateBanner = () => {
    setEditingBanner(null)
    setShowForm(true)
  }

  const handleEditBanner = (banner: any) => {
    setEditingBanner(banner)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingBanner(null)
  }

  const handleSaveBanner = () => {
    mutate() // Refresh the banners list
    handleCloseForm()
  }

  if (showForm) {
    return (
      <div className="p-6">
        <BannerForm
          banner={editingBanner}
          onSave={handleSaveBanner}
          onClose={handleCloseForm}
          onCancel={handleCloseForm}
        />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Banner</h1>
        <Button onClick={handleCreateBanner} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Banner
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <BannerManagement
          banners={banners}
          isLoading={isLoading}
          onEdit={handleEditBanner}
          onRefresh={() => mutate()}
        />
      </div>
    </div>
  )
}
