"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, Users, Eye, MousePointer } from "lucide-react"

const campaigns = [
  {
    id: 1,
    name: "Monthly Newsletter",
    status: "sent",
    recipients: 3250,
    sent: "2024-01-15 10:30",
    opened: 2180,
    clicked: 890,
    subject: "New GPS Equipment Arrivals",
  },
  {
    id: 2,
    name: "Flash Sale Alert",
    status: "scheduled",
    recipients: 2100,
    scheduled: "2024-01-20 09:00",
    opened: 0,
    clicked: 0,
    subject: "50% Off Survey Equipment",
  },
  {
    id: 3,
    name: "Product Catalog",
    status: "draft",
    recipients: 0,
    sent: null,
    opened: 0,
    clicked: 0,
    subject: "",
  },
]

export default function EmailBlastPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Blast</h1>
          <p className="text-gray-600">Send email campaigns to your customers</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Mail className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Campaign */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Create Email Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Name</label>
              <Input placeholder="Enter campaign name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="promotion">Promotional</SelectItem>
                  <SelectItem value="product-launch">Product Launch</SelectItem>
                  <SelectItem value="custom">Custom HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Audience</label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscribers (3,450)</SelectItem>
                  <SelectItem value="active">Active Customers (2,200)</SelectItem>
                  <SelectItem value="inactive">Inactive Customers (800)</SelectItem>
                  <SelectItem value="vip">VIP Members (450)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject Line</label>
              <Input placeholder="Enter email subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Content</label>
              <Textarea
                placeholder="Enter your email content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
              />
            </div>

            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline">Schedule</Button>
              <Button variant="outline">Preview</Button>
              <Button variant="outline">Save Draft</Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Email Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm">Total Subscribers</span>
              </div>
              <span className="font-semibold">3,450</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Send className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm">Emails Sent</span>
              </div>
              <span className="font-semibold">28,560</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm">Open Rate</span>
              </div>
              <span className="font-semibold">67.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MousePointer className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-sm">Click Rate</span>
              </div>
              <span className="font-semibold">31.4%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign History */}
      <Card>
        <CardHeader>
          <CardTitle>Email Campaign History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Campaign Name</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Recipients</th>
                  <th className="text-left py-3 px-4">Sent</th>
                  <th className="text-left py-3 px-4">Opened</th>
                  <th className="text-left py-3 px-4">Clicked</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{campaign.name}</td>
                    <td className="py-3 px-4">{campaign.subject || "-"}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          campaign.status === "sent"
                            ? "default"
                            : campaign.status === "scheduled"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{campaign.recipients.toLocaleString()}</td>
                    <td className="py-3 px-4">{campaign.sent || campaign.scheduled || "-"}</td>
                    <td className="py-3 px-4">{campaign.opened.toLocaleString()}</td>
                    <td className="py-3 px-4">{campaign.clicked.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {campaign.status === "draft" && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
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
