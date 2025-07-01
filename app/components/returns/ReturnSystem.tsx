"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Package, ArrowLeft, CheckCircle, Clock, XCircle, FileText, Camera, Truck } from "lucide-react"
import Image from "next/image"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReturnItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  purchaseDate: string
  reason: string
  condition: string
  description: string
  photos: string[]
  status: "pending" | "approved" | "rejected" | "processing" | "completed"
  refundAmount: number
  returnShipping: {
    carrier: string
    trackingNumber: string
    labelUrl: string
  } | null
}

// Mock return data
const mockReturns: ReturnItem[] = [
  {
    id: "RET-2024-001",
    orderId: "ORD-2024-001",
    productId: "1",
    productName: "Trimble R12i GNSS Receiver",
    productImage: "/placeholder.svg?height=80&width=80",
    price: 15999,
    quantity: 1,
    purchaseDate: "2024-01-15",
    reason: "defective",
    condition: "damaged",
    description: "Device not powering on after unboxing",
    photos: ["/placeholder.svg?height=200&width=200"],
    status: "approved",
    refundAmount: 15999,
    returnShipping: {
      carrier: "FedEx",
      trackingNumber: "RET123456789",
      labelUrl: "/return-label.pdf",
    },
  },
  {
    id: "RET-2024-002",
    orderId: "ORD-2024-002",
    productId: "2",
    productName: "Leica TS16 Total Station",
    productImage: "/placeholder.svg?height=80&width=80",
    price: 28999,
    quantity: 1,
    purchaseDate: "2024-01-20",
    reason: "not_as_described",
    condition: "new",
    description: "Missing accessories that were listed in description",
    photos: [],
    status: "processing",
    refundAmount: 28999,
    returnShipping: null,
  },
]

const returnReasons = [
  { value: "defective", label: "Defective/Damaged" },
  { value: "not_as_described", label: "Not as described" },
  { value: "wrong_item", label: "Wrong item received" },
  { value: "changed_mind", label: "Changed my mind" },
  { value: "better_price", label: "Found better price elsewhere" },
  { value: "other", label: "Other" },
]

const itemConditions = [
  { value: "new", label: "New/Unopened" },
  { value: "opened", label: "Opened but unused" },
  { value: "used", label: "Used" },
  { value: "damaged", label: "Damaged" },
]

const statusConfig = {
  pending: { label: "Pending Review", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: Package },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-800", icon: CheckCircle },
}

export default function ReturnSystem() {
  const [currentView, setCurrentView] = useState<"list" | "create" | "details">("list")
  const [selectedReturn, setSelectedReturn] = useState<ReturnItem | null>(null)
  const [returns, setReturns] = useState<ReturnItem[]>(mockReturns)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    orderId: "",
    productId: "",
    reason: "",
    condition: "",
    description: "",
    photos: [] as string[],
    agreeToTerms: false,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || Clock
    return (
      <Badge className={`${config?.color || "bg-gray-100 text-gray-800"}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config?.label || status}
      </Badge>
    )
  }

  const handleSubmitReturn = async () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReturn: ReturnItem = {
        id: `RET-2024-${String(returns.length + 1).padStart(3, "0")}`,
        orderId: formData.orderId,
        productId: formData.productId,
        productName: "Sample Product", // In real app, fetch from order
        productImage: "/placeholder.svg?height=80&width=80",
        price: 999,
        quantity: 1,
        purchaseDate: new Date().toISOString().split("T")[0],
        reason: formData.reason,
        condition: formData.condition,
        description: formData.description,
        photos: formData.photos,
        status: "pending",
        refundAmount: 999,
        returnShipping: null,
      }

      setReturns([newReturn, ...returns])
      setCurrentView("list")
      setFormData({
        orderId: "",
        productId: "",
        reason: "",
        condition: "",
        description: "",
        photos: [],
        agreeToTerms: false,
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // In real app, upload to server and get URLs
      const newPhotos = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=200&width=200&text=Photo${formData.photos.length + index + 1}`,
      )
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      }))
    }
  }

  if (currentView === "create") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setCurrentView("list")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Returns
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Request Return</h1>
          <p className="text-gray-600 mt-1">Fill out the form below to request a return</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Return Request Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orderId">Order ID *</Label>
                <Input
                  id="orderId"
                  placeholder="ORD-2024-001"
                  value={formData.orderId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, orderId: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="productId">Product ID *</Label>
                <Input
                  id="productId"
                  placeholder="Product ID or SKU"
                  value={formData.productId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, productId: e.target.value }))}
                />
              </div>
            </div>

            {/* Return Reason */}
            <div>
              <Label>Reason for Return *</Label>
              <RadioGroup
                value={formData.reason}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, reason: value }))}
                className="mt-2"
              >
                {returnReasons.map((reason) => (
                  <div key={reason.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={reason.value} id={reason.value} />
                    <Label htmlFor={reason.value}>{reason.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Item Condition */}
            <div>
              <Label>Item Condition *</Label>
              <RadioGroup
                value={formData.condition}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                className="mt-2"
              >
                {itemConditions.map((condition) => (
                  <div key={condition.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={condition.value} id={condition.value} />
                    <Label htmlFor={condition.value}>{condition.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about the issue or reason for return..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <Label>Photos (Optional)</Label>
              <p className="text-sm text-gray-600 mb-2">Upload photos to support your return request</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload photos</p>
                </label>
              </div>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        width={100}
                        height={100}
                        className="object-cover rounded"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index),
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the return policy and terms & conditions
              </Label>
            </div>

            <Alert>
              <AlertDescription>
                Returns are typically processed within 3-5 business days. You'll receive an email confirmation once your
                return is approved.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button
                onClick={handleSubmitReturn}
                disabled={
                  !formData.orderId ||
                  !formData.reason ||
                  !formData.condition ||
                  !formData.description ||
                  !formData.agreeToTerms ||
                  isSubmitting
                }
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Return Request"}
              </Button>
              <Button variant="outline" onClick={() => setCurrentView("list")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "details" && selectedReturn) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setCurrentView("list")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Returns
          </Button>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Return Details</h1>
              <p className="text-gray-600 mt-1">Return ID: {selectedReturn.id}</p>
            </div>
            {getStatusBadge(selectedReturn.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedReturn.productImage || "/placeholder.svg"}
                    alt={selectedReturn.productName}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{selectedReturn.productName}</h3>
                    <p className="text-sm text-gray-600">Order: {selectedReturn.orderId}</p>
                    <p className="text-sm text-gray-600">Purchased: {formatDate(selectedReturn.purchaseDate)}</p>
                    <p className="font-medium mt-1">{formatCurrency(selectedReturn.price)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Details */}
            <Card>
              <CardHeader>
                <CardTitle>Return Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Reason for Return</Label>
                  <p className="text-gray-600 capitalize">{selectedReturn.reason.replace("_", " ")}</p>
                </div>
                <div>
                  <Label className="font-medium">Item Condition</Label>
                  <p className="text-gray-600 capitalize">{selectedReturn.condition}</p>
                </div>
                <div>
                  <Label className="font-medium">Description</Label>
                  <p className="text-gray-600">{selectedReturn.description}</p>
                </div>
                {selectedReturn.photos.length > 0 && (
                  <div>
                    <Label className="font-medium">Photos</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {selectedReturn.photos.map((photo, index) => (
                        <Image
                          key={index}
                          src={photo || "/placeholder.svg"}
                          alt={`Return photo ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Information */}
            {selectedReturn.returnShipping && (
              <Card>
                <CardHeader>
                  <CardTitle>Return Shipping</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-medium">Carrier</Label>
                      <p className="text-gray-600">{selectedReturn.returnShipping.carrier}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Tracking Number</Label>
                      <p className="text-gray-600">{selectedReturn.returnShipping.trackingNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Truck className="w-4 h-4 mr-1" />
                      Track Package
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Download Label
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Return Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Product Price</span>
                  <span>{formatCurrency(selectedReturn.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>{selectedReturn.quantity}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Refund Amount</span>
                  <span>{formatCurrency(selectedReturn.refundAmount)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about your return? Contact our support team.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns & Refunds</h1>
          <p className="text-gray-600 mt-1">Manage your return requests and track refunds</p>
        </div>
        <Button onClick={() => setCurrentView("create")} className="bg-green-600 hover:bg-green-700 mt-4 md:mt-0">
          Request Return
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Returns</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Returns</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {returns
            .filter((r) => ["pending", "approved", "processing"].includes(r.status))
            .map((returnItem) => (
              <Card key={returnItem.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={returnItem.productImage || "/placeholder.svg"}
                        alt={returnItem.productName}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{returnItem.productName}</h3>
                        <p className="text-sm text-gray-600">Return ID: {returnItem.id}</p>
                        <p className="text-sm text-gray-600">Order: {returnItem.orderId}</p>
                        <p className="text-sm text-gray-600">Requested: {formatDate(returnItem.purchaseDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(returnItem.refundAmount)}</p>
                        {getStatusBadge(returnItem.status)}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedReturn(returnItem)
                          setCurrentView("details")
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {returns
            .filter((r) => r.status === "completed")
            .map((returnItem) => (
              <Card key={returnItem.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={returnItem.productImage || "/placeholder.svg"}
                        alt={returnItem.productName}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{returnItem.productName}</h3>
                        <p className="text-sm text-gray-600">Return ID: {returnItem.id}</p>
                        <p className="text-sm text-gray-600">Refunded: {formatCurrency(returnItem.refundAmount)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      {getStatusBadge(returnItem.status)}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedReturn(returnItem)
                          setCurrentView("details")
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {returns.map((returnItem) => (
            <Card key={returnItem.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={returnItem.productImage || "/placeholder.svg"}
                      alt={returnItem.productName}
                      width={60}
                      height={60}
                      className="object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{returnItem.productName}</h3>
                      <p className="text-sm text-gray-600">Return ID: {returnItem.id}</p>
                      <p className="text-sm text-gray-600">Order: {returnItem.orderId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(returnItem.refundAmount)}</p>
                      {getStatusBadge(returnItem.status)}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedReturn(returnItem)
                        setCurrentView("details")
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {returns.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">No returns yet</h2>
          <p className="text-gray-600 mb-6">When you request returns, they will appear here</p>
          <Button onClick={() => setCurrentView("create")} className="bg-green-600 hover:bg-green-700">
            Request Return
          </Button>
        </div>
      )}
    </div>
  )
}
