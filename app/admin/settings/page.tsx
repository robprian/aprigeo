"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Key, Bot, Globe, Mail, MessageSquare, Building, MapPin, Phone, Clock } from "lucide-react"
import { toast } from "@/lib/toast"

interface StoreSettings {
  general: Record<string, { value: string; type: string; description: string }>
  contact: Record<string, { value: string; type: string; description: string }>
  social: Record<string, { value: string; type: string; description: string }>
}

export default function SettingsPage() {
  const [geminiApiKey, setGeminiApiKey] = useState("")
  const [chatgptApiKey, setChatgptApiKey] = useState("")
  const [autoSeoEnabled, setAutoSeoEnabled] = useState(false)
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchStoreSettings()
  }, [])

  const fetchStoreSettings = async () => {
    try {
      const response = await fetch('/api/admin/store-settings')
      const data = await response.json()
      if (data.success) {
        setStoreSettings(data.data)
      }
    } catch (error) {
      console.error('Error fetching store settings:', error)
      toast.error('Failed to load store settings')
    } finally {
      setLoading(false)
    }
  }

  const handleStoreSettingChange = (group: string, key: string, value: string) => {
    if (!storeSettings) return
    
    setStoreSettings(prev => ({
      ...prev!,
      [group]: {
        ...prev![group as keyof StoreSettings],
        [key]: {
          ...prev![group as keyof StoreSettings][key],
          value
        }
      }
    }))
  }

  const saveStoreSettings = async () => {
    if (!storeSettings) return
    
    setSaving(true)
    try {
      // Flatten settings for API
      const flatSettings: Record<string, string> = {}
      Object.entries(storeSettings).forEach(([group, settings]) => {
        Object.entries(settings).forEach(([key, config]) => {
          flatSettings[key] = (config as { value: string; type: string; description: string }).value
        })
      })

      const response = await fetch('/api/admin/store-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: flatSettings }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Store settings updated successfully!')
      } else {
        toast.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving store settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your application settings and configurations</p>
        </div>
      </div>

      <Tabs defaultValue="store-info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="store-info">Store Info</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai-seo">AI & SEO</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="store-info" className="space-y-6">
          {loading ? (
            <Card>
              <CardContent className="p-8">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ) : storeSettings ? (
            <>
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={storeSettings.general?.company_name?.value || ''}
                      onChange={(e) => handleStoreSettingChange('general', 'company_name', e.target.value)}
                      placeholder="Enter company name"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {storeSettings.general?.company_name?.description}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="company-description">Company Description</Label>
                    <Textarea
                      id="company-description"
                      value={storeSettings.general?.company_description?.value || ''}
                      onChange={(e) => handleStoreSettingChange('general', 'company_description', e.target.value)}
                      placeholder="Enter company description"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {storeSettings.general?.company_description?.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contact-address">Address</Label>
                    <Textarea
                      id="contact-address"
                      value={storeSettings.contact?.contact_address?.value || ''}
                      onChange={(e) => handleStoreSettingChange('contact', 'contact_address', e.target.value)}
                      placeholder="Enter business address"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {storeSettings.contact?.contact_address?.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-phone">Phone Number</Label>
                      <Input
                        id="contact-phone"
                        value={storeSettings.contact?.contact_phone?.value || ''}
                        onChange={(e) => handleStoreSettingChange('contact', 'contact_phone', e.target.value)}
                        placeholder="Enter phone number"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {storeSettings.contact?.contact_phone?.description}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={storeSettings.contact?.contact_email?.value || ''}
                        onChange={(e) => handleStoreSettingChange('contact', 'contact_email', e.target.value)}
                        placeholder="Enter email address"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {storeSettings.contact?.contact_email?.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="business-hours">Business Hours</Label>
                    <Input
                      id="business-hours"
                      value={storeSettings.contact?.business_hours?.value || ''}
                      onChange={(e) => handleStoreSettingChange('contact', 'business_hours', e.target.value)}
                      placeholder="e.g., Mon-Fri: 8:00 AM - 5:00 PM"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {storeSettings.contact?.business_hours?.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Social Media Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebook-url">Facebook URL</Label>
                      <Input
                        id="facebook-url"
                        type="url"
                        value={storeSettings.social?.facebook_url?.value || ''}
                        onChange={(e) => handleStoreSettingChange('social', 'facebook_url', e.target.value)}
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram-url">Instagram URL</Label>
                      <Input
                        id="instagram-url"
                        type="url"
                        value={storeSettings.social?.instagram_url?.value || ''}
                        onChange={(e) => handleStoreSettingChange('social', 'instagram_url', e.target.value)}
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="twitter-url">Twitter URL</Label>
                      <Input
                        id="twitter-url"
                        type="url"
                        value={storeSettings.social?.twitter_url?.value || ''}
                        onChange={(e) => handleStoreSettingChange('social', 'twitter_url', e.target.value)}
                        placeholder="https://twitter.com/yourpage"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Leave fields empty or enter '#' to hide social media links in the footer.
                  </p>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={saveStoreSettings} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Store Information'}
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">Failed to load store settings</p>
                <Button onClick={fetchStoreSettings} className="mt-4">
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="GeoTech Store" />
                </div>
                <div>
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input id="site-url" defaultValue="https://geotechstore.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Professional GPS, survey equipment, and geodetic instruments"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@geotechstore.com" />
                </div>
                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@geotechstore.com" />
                </div>
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                AI & SEO Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gemini-api">Google Gemini API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="gemini-api"
                      type="password"
                      placeholder="Enter your Gemini API key"
                      value={geminiApiKey}
                      onChange={(e) => setGeminiApiKey(e.target.value)}
                    />
                    <Button variant="outline">Test</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Used for generating SEO descriptions and meta tags</p>
                </div>

                <div>
                  <Label htmlFor="chatgpt-api">OpenAI ChatGPT API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="chatgpt-api"
                      type="password"
                      placeholder="Enter your ChatGPT API key"
                      value={chatgptApiKey}
                      onChange={(e) => setChatgptApiKey(e.target.value)}
                    />
                    <Button variant="outline">Test</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Alternative AI provider for content generation</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-seo">Auto-generate SEO Content</Label>
                    <p className="text-sm text-gray-500">
                      Automatically generate SEO descriptions when adding products
                    </p>
                  </div>
                  <Switch id="auto-seo" checked={autoSeoEnabled} onCheckedChange={setAutoSeoEnabled} />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">SEO Template Settings</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meta-title-template">Meta Title Template</Label>
                    <Input
                      id="meta-title-template"
                      defaultValue="{product_name} - Professional {category} | GeoTech Store"
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta-description-template">Meta Description Template</Label>
                    <Textarea
                      id="meta-description-template"
                      defaultValue="Shop {product_name} at GeoTech Store. Professional {category} with {key_features}. Free shipping on orders over $500."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" placeholder="smtp.gmail.com" />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" placeholder="587" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input id="smtp-username" type="email" placeholder="your-email@gmail.com" />
                </div>
                <div>
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input id="smtp-password" type="password" placeholder="Your app password" />
                </div>
              </div>
              <div>
                <Label htmlFor="from-email">From Email</Label>
                <Input id="from-email" type="email" defaultValue="noreply@geotechstore.com" />
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="whatsapp-token">WhatsApp Business API Token</Label>
                <Input id="whatsapp-token" type="password" placeholder="Enter your WhatsApp API token" />
              </div>
              <div>
                <Label htmlFor="whatsapp-phone">WhatsApp Business Phone Number</Label>
                <Input id="whatsapp-phone" placeholder="+62 21 123-4567" />
              </div>
              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" defaultValue="https://geotechstore.com/api/whatsapp/webhook" />
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save WhatsApp Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Login Notifications</Label>
                  <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
