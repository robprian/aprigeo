"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Bot, Key, Wand2, TestTube } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AIConfigurationPage() {
  const [geminiApiKey, setGeminiApiKey] = useState("")
  const [chatgptApiKey, setChatgptApiKey] = useState("")
  const [autoSeoEnabled, setAutoSeoEnabled] = useState(false)
  const [testingGemini, setTestingGemini] = useState(false)
  const [testingChatGPT, setTestingChatGPT] = useState(false)

  const testGeminiConnection = async () => {
    setTestingGemini(true)
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTestingGemini(false)
  }

  const testChatGPTConnection = async () => {
    setTestingChatGPT(true)
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTestingChatGPT(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Configuration</h1>
          <p className="text-gray-600">Configure AI services for SEO generation and content optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Gemini Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              Google Gemini AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="gemini-api">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="gemini-api"
                  type="password"
                  placeholder="Enter your Gemini API key"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                />
                <Button variant="outline" onClick={testGeminiConnection} disabled={testingGemini || !geminiApiKey}>
                  <TestTube className={`w-4 h-4 mr-1 ${testingGemini ? "animate-spin" : ""}`} />
                  {testingGemini ? "Testing..." : "Test"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Get your API key from Google AI Studio</p>
            </div>

            <div>
              <Label htmlFor="gemini-model">Model</Label>
              <Input id="gemini-model" defaultValue="gemini-pro" />
            </div>

            <div>
              <Label htmlFor="gemini-temperature">Temperature</Label>
              <Input id="gemini-temperature" type="number" step="0.1" min="0" max="1" defaultValue="0.7" />
              <p className="text-xs text-gray-500 mt-1">Controls randomness (0.0 = deterministic, 1.0 = creative)</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Primary AI Provider</Label>
                <p className="text-sm text-gray-500">Use Gemini as the primary AI service</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Badge variant="default" className="mr-2">
                  Connected
                </Badge>
                <span className="text-sm text-green-700">Gemini AI is ready to use</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OpenAI ChatGPT Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2" />
              OpenAI ChatGPT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="chatgpt-api">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="chatgpt-api"
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  value={chatgptApiKey}
                  onChange={(e) => setChatgptApiKey(e.target.value)}
                />
                <Button variant="outline" onClick={testChatGPTConnection} disabled={testingChatGPT || !chatgptApiKey}>
                  <TestTube className={`w-4 h-4 mr-1 ${testingChatGPT ? "animate-spin" : ""}`} />
                  {testingChatGPT ? "Testing..." : "Test"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Get your API key from OpenAI Platform</p>
            </div>

            <div>
              <Label htmlFor="chatgpt-model">Model</Label>
              <Input id="chatgpt-model" defaultValue="gpt-4" />
            </div>

            <div>
              <Label htmlFor="chatgpt-temperature">Temperature</Label>
              <Input id="chatgpt-temperature" type="number" step="0.1" min="0" max="1" defaultValue="0.7" />
              <p className="text-xs text-gray-500 mt-1">Controls randomness (0.0 = deterministic, 1.0 = creative)</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Fallback Provider</Label>
                <p className="text-sm text-gray-500">Use ChatGPT when Gemini is unavailable</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  Not Connected
                </Badge>
                <span className="text-sm text-yellow-700">Enter API key to connect</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Generation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wand2 className="w-5 h-5 mr-2" />
              SEO Generation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-generate SEO Content</Label>
                <p className="text-sm text-gray-500">Automatically generate SEO when adding products</p>
              </div>
              <Switch checked={autoSeoEnabled} onCheckedChange={setAutoSeoEnabled} />
            </div>

            <div>
              <Label htmlFor="meta-title-template">Meta Title Template</Label>
              <Input id="meta-title-template" defaultValue="{product_name} - Professional {category} | GeoTech Store" />
            </div>

            <div>
              <Label htmlFor="meta-description-template">Meta Description Template</Label>
              <Textarea
                id="meta-description-template"
                defaultValue="Shop {product_name} at GeoTech Store. Professional {category} with {key_features}. Free shipping on orders over $500."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="seo-prompt">SEO Generation Prompt</Label>
              <Textarea
                id="seo-prompt"
                defaultValue="Generate SEO-optimized content for a professional GPS and surveying equipment store. Focus on technical accuracy, professional terminology, and search optimization."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">API Calls This Month</span>
                <Badge variant="outline">1,247</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SEO Content Generated</span>
                <Badge variant="outline">89</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Success Rate</span>
                <Badge variant="default">98.5%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Response Time</span>
                <Badge variant="outline">2.3s</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Product SEO generated</span>
                  <span className="text-gray-500">2 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Category description updated</span>
                  <span className="text-gray-500">15 min ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Brand content optimized</span>
                  <span className="text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Save Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save AI Configuration
            </Button>
            <Button variant="outline">
              <TestTube className="w-4 h-4 mr-2" />
              Test All Connections
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
