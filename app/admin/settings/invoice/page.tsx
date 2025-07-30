"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, FileText, Loader2 } from "lucide-react"
import { toast } from "@/lib/toast"

interface InvoiceSettings {
  id: number
  company_name: string
  company_address: string
  company_phone: string
  company_email: string
  footer_text: string
  footer_support_text: string
  logo_url: string
}

export default function InvoiceSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<InvoiceSettings>({
    id: 1,
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    footer_text: '',
    footer_support_text: '',
    logo_url: ''
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/invoice-settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      toast.error('Failed to load invoice settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/invoice-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Invoice settings updated successfully!')
      } else {
        throw new Error('Failed to update settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save invoice settings')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof InvoiceSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
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
      <div>
        <h1 className="text-2xl font-bold">Invoice Settings</h1>
        <p className="text-gray-600">Manage invoice header and footer information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={settings.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company_email">Email Address</Label>
                <Input
                  id="company_email"
                  type="email"
                  value={settings.company_email}
                  onChange={(e) => handleInputChange('company_email', e.target.value)}
                  placeholder="Enter company email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_phone">Phone Number</Label>
                <Input
                  id="company_phone"
                  value={settings.company_phone}
                  onChange={(e) => handleInputChange('company_phone', e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  value={settings.logo_url}
                  onChange={(e) => handleInputChange('logo_url', e.target.value)}
                  placeholder="Enter logo URL or path"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company_address">Company Address</Label>
              <Textarea
                id="company_address"
                value={settings.company_address}
                onChange={(e) => handleInputChange('company_address', e.target.value)}
                placeholder="Enter complete company address"
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Footer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="footer_text">Thank You Message</Label>
              <Input
                id="footer_text"
                value={settings.footer_text}
                onChange={(e) => handleInputChange('footer_text', e.target.value)}
                placeholder="Enter thank you message"
                required
              />
            </div>

            <div>
              <Label htmlFor="footer_support_text">Support Information</Label>
              <Textarea
                id="footer_support_text"
                value={settings.footer_support_text}
                onChange={(e) => handleInputChange('footer_support_text', e.target.value)}
                placeholder="Enter support contact information"
                rows={2}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LOGO</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-blue-800">{settings.company_name}</h3>
                    <p className="text-sm text-gray-600">Professional GPS & Survey Equipment</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{settings.company_address}</p>
                  <p>Phone: {settings.company_phone}</p>
                  <p>Email: {settings.company_email}</p>
                </div>
                <div className="border-t pt-4 mt-8">
                  <p className="font-bold text-blue-800">{settings.footer_text}</p>
                  <p className="text-sm text-gray-600 mt-1">{settings.footer_support_text}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
