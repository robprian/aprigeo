"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Key, Bot, Globe, Mail, MessageSquare } from "lucide-react"

export default function SettingsPage() {
  const [geminiApiKey, setGeminiApiKey] = useState("")
  const [chatgptApiKey, setChatgptApiKey] = useState("")
  const [autoSeoEnabled, setAutoSeoEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your application settings and configurations</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai-seo">AI & SEO</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

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
