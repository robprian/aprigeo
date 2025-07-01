"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Users, CheckCircle } from "lucide-react"

const campaigns = [
  {
    id: 1,
    name: "GPS Equipment Sale",
    status: "sent",
    recipients: 1250,
    sent: "2024-01-15 10:30",
    delivered: 1180,
    read: 890,
  },
  {
    id: 2,
    name: "New Product Launch",
    status: "scheduled",
    recipients: 2100,
    scheduled: "2024-01-20 09:00",
    delivered: 0,
    read: 0,
  },
  {
    id: 3,
    name: "Survey Tools Promotion",
    status: "draft",
    recipients: 0,
    sent: null,
    delivered: 0,
    read: 0,
  },
]

export default function WhatsAppBlastPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [message, setMessage] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Blast</h1>
          <p className="text-gray-600">Send promotional messages to your customers</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <MessageCircle className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Campaign */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Name</label>
              <Input placeholder="Enter campaign name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotion">Product Promotion</SelectItem>
                  <SelectItem value="new-arrival">New Arrival</SelectItem>
                  <SelectItem value="discount">Discount Offer</SelectItem>
                  <SelectItem value="custom">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Group</label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers (2,450)</SelectItem>
                  <SelectItem value="vip">VIP Customers (180)</SelectItem>
                  <SelectItem value="regular">Regular Customers (1,200)</SelectItem>
                  <SelectItem value="new">New Customers (320)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">{message.length}/1000 characters</p>
            </div>

            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline">Schedule</Button>
              <Button variant="outline">Save Draft</Button>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm">Total Contacts</span>
              </div>
              <span className="font-semibold">2,450</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Send className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm">Messages Sent</span>
              </div>
              <span className="font-semibold">15,680</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm">Delivered</span>
              </div>
              <span className="font-semibold">14,920</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-sm">Read</span>
              </div>
              <span className="font-semibold">11,240</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign History */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Campaign Name</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Recipients</th>
                  <th className="text-left py-3 px-4">Sent/Scheduled</th>
                  <th className="text-left py-3 px-4">Delivered</th>
                  <th className="text-left py-3 px-4">Read</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{campaign.name}</td>
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
                    <td className="py-3 px-4">{campaign.delivered.toLocaleString()}</td>
                    <td className="py-3 px-4">{campaign.read.toLocaleString()}</td>
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
