"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, Search, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TrackingEvent {
  id: string
  status: string
  description: string
  location: string
  timestamp: string
  isCompleted: boolean
}

interface TrackingInfo {
  orderId: string
  trackingNumber: string
  carrier: string
  status: string
  estimatedDelivery: string
  currentLocation: string
  events: TrackingEvent[]
  packageInfo: {
    weight: string
    dimensions: string
    service: string
  }
}

// Mock tracking data
const mockTrackingData: { [key: string]: TrackingInfo } = {
  TRK123456789: {
    orderId: "ORD-2024-001",
    trackingNumber: "TRK123456789",
    carrier: "FedEx",
    status: "in_transit",
    estimatedDelivery: "2024-01-18T15:00:00Z",
    currentLocation: "Distribution Center - Chicago, IL",
    packageInfo: {
      weight: "2.5 lbs",
      dimensions: "12 x 8 x 6 inches",
      service: "FedEx Ground",
    },
    events: [
      {
        id: "1",
        status: "Package shipped",
        description: "Package has been picked up and is on its way",
        location: "Origin Facility - New York, NY",
        timestamp: "2024-01-15T09:00:00Z",
        isCompleted: true,
      },
      {
        id: "2",
        status: "In transit",
        description: "Package is in transit to next facility",
        location: "Distribution Center - Philadelphia, PA",
        timestamp: "2024-01-16T14:30:00Z",
        isCompleted: true,
      },
      {
        id: "3",
        status: "In transit",
        description: "Package arrived at distribution center",
        location: "Distribution Center - Chicago, IL",
        timestamp: "2024-01-17T08:15:00Z",
        isCompleted: true,
      },
      {
        id: "4",
        status: "Out for delivery",
        description: "Package is out for delivery",
        location: "Local Facility - Chicago, IL",
        timestamp: "2024-01-18T07:00:00Z",
        isCompleted: false,
      },
      {
        id: "5",
        status: "Delivered",
        description: "Package delivered to recipient",
        location: "123 Main St, Chicago, IL",
        timestamp: "2024-01-18T15:00:00Z",
        isCompleted: false,
      },
    ],
  },
  TRK987654321: {
    orderId: "ORD-2024-002",
    trackingNumber: "TRK987654321",
    carrier: "UPS",
    status: "delivered",
    estimatedDelivery: "2024-01-20T16:00:00Z",
    currentLocation: "Delivered",
    packageInfo: {
      weight: "15.2 lbs",
      dimensions: "24 x 18 x 12 inches",
      service: "UPS Ground",
    },
    events: [
      {
        id: "1",
        status: "Package shipped",
        description: "Package has been picked up",
        location: "Origin Facility - Los Angeles, CA",
        timestamp: "2024-01-18T10:00:00Z",
        isCompleted: true,
      },
      {
        id: "2",
        status: "In transit",
        description: "Package in transit",
        location: "Distribution Center - Phoenix, AZ",
        timestamp: "2024-01-19T12:00:00Z",
        isCompleted: true,
      },
      {
        id: "3",
        status: "Out for delivery",
        description: "Package out for delivery",
        location: "Local Facility - Denver, CO",
        timestamp: "2024-01-20T08:00:00Z",
        isCompleted: true,
      },
      {
        id: "4",
        status: "Delivered",
        description: "Package delivered successfully",
        location: "456 Oak Ave, Denver, CO",
        timestamp: "2024-01-20T15:30:00Z",
        isCompleted: true,
      },
    ],
  },
}

const statusConfig = {
  shipped: { label: "Shipped", color: "bg-blue-100 text-blue-800", icon: Package },
  in_transit: { label: "In Transit", color: "bg-yellow-100 text-yellow-800", icon: Truck },
  out_for_delivery: { label: "Out for Delivery", color: "bg-orange-100 text-orange-800", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  exception: { label: "Exception", color: "bg-red-100 text-red-800", icon: Clock },
}

export default function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrackPackage = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber.trim()]
      if (data) {
        setTrackingInfo(data)
        setError("")
      } else {
        setError("Tracking number not found. Please check and try again.")
        setTrackingInfo(null)
      }
      setIsLoading(false)
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || Package
    return <Icon className="w-4 h-4" />
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge className={`${config?.color || "bg-gray-100 text-gray-800"}`}>
        {getStatusIcon(status)}
        <span className="ml-1">{config?.label || status}</span>
      </Badge>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Package</h1>
        <p className="text-gray-600">Enter your tracking number to get real-time updates</p>
      </div>

      {/* Tracking Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Package Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="tracking">Tracking Number</Label>
              <Input
                id="tracking"
                placeholder="Enter tracking number (e.g., TRK123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTrackPackage()}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleTrackPackage} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? "Tracking..." : "Track Package"}
              </Button>
            </div>
          </div>

          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Tracking Results */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* Package Summary */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Package Details</CardTitle>
                  <p className="text-gray-600 mt-1">Tracking #{trackingInfo.trackingNumber}</p>
                </div>
                <div className="mt-4 md:mt-0">{getStatusBadge(trackingInfo.status)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Order ID</span>
                  </div>
                  <p className="text-gray-600">{trackingInfo.orderId}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Carrier</span>
                  </div>
                  <p className="text-gray-600">{trackingInfo.carrier}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Current Location</span>
                  </div>
                  <p className="text-gray-600">{trackingInfo.currentLocation}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Est. Delivery</span>
                  </div>
                  <p className="text-gray-600">{formatDate(trackingInfo.estimatedDelivery)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Info */}
          <Card>
            <CardHeader>
              <CardTitle>Package Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="font-medium">Weight:</span>
                  <p className="text-gray-600">{trackingInfo.packageInfo.weight}</p>
                </div>
                <div>
                  <span className="font-medium">Dimensions:</span>
                  <p className="text-gray-600">{trackingInfo.packageInfo.dimensions}</p>
                </div>
                <div>
                  <span className="font-medium">Service:</span>
                  <p className="text-gray-600">{trackingInfo.packageInfo.service}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingInfo.events.map((event, index) => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${event.isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                      ></div>
                      {index < trackingInfo.events.length - 1 && (
                        <div className={`w-0.5 h-12 ${event.isCompleted ? "bg-green-500" : "bg-gray-300"}`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className={`font-medium ${event.isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                            {event.status}
                          </h3>
                          <p className={`text-sm ${event.isCompleted ? "text-gray-600" : "text-gray-400"}`}>
                            {event.description}
                          </p>
                          <p className={`text-sm ${event.isCompleted ? "text-gray-500" : "text-gray-400"}`}>
                            {event.location}
                          </p>
                        </div>
                        <div
                          className={`text-sm mt-2 md:mt-0 ${event.isCompleted ? "text-gray-500" : "text-gray-400"}`}
                        >
                          {event.isCompleted ? formatDate(event.timestamp) : "Pending"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carrier Link */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Need more details?</h3>
                  <p className="text-sm text-gray-600">Track directly on {trackingInfo.carrier}'s website</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit {trackingInfo.carrier}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sample Tracking Numbers */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Try Sample Tracking Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">In Transit Package</h4>
              <p className="text-sm text-gray-600 mb-2">TRK123456789</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTrackingNumber("TRK123456789")
                  handleTrackPackage()
                }}
              >
                Try This Number
              </Button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Delivered Package</h4>
              <p className="text-sm text-gray-600 mb-2">TRK987654321</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTrackingNumber("TRK987654321")
                  handleTrackPackage()
                }}
              >
                Try This Number
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
