"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, TrendingUp, Eye, MousePointer, Wand2, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const seoData = [
  {
    page: "GPS Equipment",
    url: "/gps-equipment",
    title: "Professional GPS Equipment | GeoTech Store",
    meta_description:
      "Shop professional GPS equipment from top brands like Trimble, Leica, and Topcon. Free shipping on orders over $500.",
    keywords: "GPS equipment, GNSS receivers, surveying tools",
    traffic: 2450,
    ranking: 3,
    optimized: true,
  },
  {
    page: "Survey Equipment",
    url: "/survey-equipment",
    title: "Survey Equipment - Total Stations & More",
    meta_description: "Professional survey equipment including total stations, theodolites, and laser levels.",
    keywords: "survey equipment, total stations, theodolites",
    traffic: 1890,
    ranking: 7,
    optimized: false,
  },
  {
    page: "Satellite Phones",
    url: "/satellite-phones",
    title: "Satellite Phones for Remote Communication",
    meta_description: "Reliable satellite phones for remote areas. Iridium and other top brands available.",
    keywords: "satellite phones, remote communication, Iridium",
    traffic: 1230,
    ranking: 5,
    optimized: true,
  },
]

export default function SEOToolsPage() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const handleGenerateSEO = async (pageUrl: string) => {
    setIsGenerating(pageUrl)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Tools</h1>
          <p className="text-gray-600">Optimize your website for search engines with AI-powered tools</p>
        </div>
      </div>

      {/* SEO Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Search className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Avg. Ranking</p>
                <p className="text-2xl font-bold">5.2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Monthly Traffic</p>
                <p className="text-2xl font-bold">15.6K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MousePointer className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold">3.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Growth</p>
                <p className="text-2xl font-bold">+12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI SEO Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wand2 className="w-5 h-5 mr-2" />
              AI SEO Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Target Keyword</label>
              <Input placeholder="Enter your target keyword" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Product/Page Description</label>
              <Textarea placeholder="Describe your product or page content..." rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Audience</label>
              <Input placeholder="e.g., Professional surveyors, construction companies" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate SEO Content
            </Button>
          </CardContent>
        </Card>

        {/* Keyword Research */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Keyword Research
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Seed Keyword</label>
              <Input placeholder="Enter a keyword to research" />
            </div>
            <Button className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Research Keywords
            </Button>

            <div className="space-y-2">
              <h4 className="font-medium">Suggested Keywords:</h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">GPS surveying equipment</span>
                  <Badge variant="outline">1.2K/mo</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">professional GPS receivers</span>
                  <Badge variant="outline">890/mo</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">GNSS survey tools</span>
                  <Badge variant="outline">650/mo</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page SEO Status */}
      <Card>
        <CardHeader>
          <CardTitle>Page SEO Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Page</th>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Traffic</th>
                  <th className="text-left py-3 px-4">Ranking</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {seoData.map((page, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-gray-500">{page.url}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-sm">{page.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{page.meta_description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{page.traffic.toLocaleString()}/mo</td>
                    <td className="py-3 px-4">
                      <Badge variant={page.ranking <= 3 ? "default" : page.ranking <= 10 ? "secondary" : "destructive"}>
                        #{page.ranking}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={page.optimized ? "default" : "outline"}>
                        {page.optimized ? "Optimized" : "Needs Work"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateSEO(page.url)}
                        disabled={isGenerating === page.url}
                      >
                        <Wand2 className={`w-3 h-3 mr-1 ${isGenerating === page.url ? "animate-spin" : ""}`} />
                        {isGenerating === page.url ? "Optimizing..." : "Optimize"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
