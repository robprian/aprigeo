"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PlusCircle,
  Pencil,
  Trash2,
  Check,
  CreditCard,
  ShoppingCartIcon as PaypalIcon,
  AppleIcon,
  Shield,
  Lock,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Mock payment methods data
const initialPaymentMethods = [
  {
    id: 1,
    type: "credit_card",
    default: true,
    cardType: "visa",
    cardHolder: "John Doe",
    cardNumber: "•••• •••• •••• 4242",
    expiryDate: "12/25",
    billingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  },
  {
    id: 2,
    type: "credit_card",
    default: false,
    cardType: "mastercard",
    cardHolder: "John Doe",
    cardNumber: "•••• •••• •••• 5555",
    expiryDate: "08/24",
    billingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },
  },
  {
    id: 3,
    type: "paypal",
    default: false,
    email: "john.doe@example.com",
  },
]

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "credit_card",
    default: false,
    cardType: "",
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  })
  const [paymentType, setPaymentType] = useState("credit_card")

  const handleAddPaymentMethod = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const id = Math.max(0, ...paymentMethods.map((p) => p.id)) + 1
      let paymentMethodToAdd = { id }

      if (paymentType === "credit_card") {
        paymentMethodToAdd = {
          ...paymentMethodToAdd,
          type: "credit_card",
          default: newPaymentMethod.default,
          cardType: detectCardType(newPaymentMethod.cardNumber),
          cardHolder: newPaymentMethod.cardHolder,
          cardNumber: maskCardNumber(newPaymentMethod.cardNumber),
          expiryDate: newPaymentMethod.expiryDate,
          billingAddress: newPaymentMethod.billingAddress,
        }
      } else if (paymentType === "paypal") {
        paymentMethodToAdd = {
          ...paymentMethodToAdd,
          type: "paypal",
          default: newPaymentMethod.default,
          email: newPaymentMethod.email,
        }
      }

      // If this is the first payment method or marked as default, update all others
      if (newPaymentMethod.default || paymentMethods.length === 0) {
        setPaymentMethods([
          ...paymentMethods.map((p) => ({ ...p, default: false })),
          { ...paymentMethodToAdd, default: true },
        ])
      } else {
        setPaymentMethods([...paymentMethods, paymentMethodToAdd])
      }

      setIsAddDialogOpen(false)
      resetNewPaymentMethod()
      toast.success("Payment method added successfully")
    } catch (error) {
      toast.error("Failed to add payment method")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPaymentMethod = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // If setting as default, update all payment methods
      if (currentPaymentMethod.default) {
        setPaymentMethods(
          paymentMethods.map((method) => ({
            ...method,
            default: method.id === currentPaymentMethod.id,
          })),
        )
      } else {
        setPaymentMethods(
          paymentMethods.map((method) => (method.id === currentPaymentMethod.id ? currentPaymentMethod : method)),
        )
      }
      setIsEditDialogOpen(false)
      toast.success("Payment method updated successfully")
    } catch (error) {
      toast.error("Failed to update payment method")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePaymentMethod = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600))

      const updatedPaymentMethods = paymentMethods.filter((method) => method.id !== currentPaymentMethod.id)

      // If we deleted the default payment method and there are other methods, make the first one default
      if (currentPaymentMethod.default && updatedPaymentMethods.length > 0) {
        updatedPaymentMethods[0].default = true
      }

      setPaymentMethods(updatedPaymentMethods)
      setIsDeleteDialogOpen(false)
      toast.success("Payment method deleted successfully")
    } catch (error) {
      toast.error("Failed to delete payment method")
    } finally {
      setIsLoading(false)
    }
  }

  const resetNewPaymentMethod = () => {
    setNewPaymentMethod({
      type: "credit_card",
      default: false,
      cardType: "",
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      email: "",
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
    })
    setPaymentType("credit_card")
  }

  const detectCardType = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\D/g, "")
    if (cleaned.startsWith("4")) return "visa"
    if (cleaned.startsWith("5")) return "mastercard"
    if (cleaned.startsWith("3")) return "amex"
    if (cleaned.startsWith("6")) return "discover"
    return "unknown"
  }

  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\D/g, "")
    return `•••• •••• •••• ${cleaned.slice(-4)}`
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim()
    return formatted.substring(0, 19) // Limit to 16 digits + 3 spaces
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`
    }
    return cleaned
  }

  const getPaymentMethodIcon = (type: string, cardType?: string) => {
    if (type === "paypal") {
      return <PaypalIcon className="w-6 h-6 text-blue-600" />
    } else if (type === "apple_pay") {
      return <AppleIcon className="w-6 h-6" />
    } else {
      // Credit card
      switch (cardType) {
        case "visa":
          return <div className="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold">VISA</div>
        case "mastercard":
          return <div className="bg-red-600 text-white rounded px-2 py-1 text-xs font-bold">MC</div>
        case "amex":
          return <div className="bg-blue-500 text-white rounded px-2 py-1 text-xs font-bold">AMEX</div>
        case "discover":
          return <div className="bg-orange-500 text-white rounded px-2 py-1 text-xs font-bold">DISC</div>
        default:
          return <CreditCard className="w-6 h-6" />
      }
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
        <p className="text-gray-600 mt-1">Manage your payment methods securely</p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Secure Payment Processing</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and securely stored. We never store your full card details.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className={`relative ${method.default ? "border-green-500 bg-green-50" : ""}`}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
                  {getPaymentMethodIcon(method.type, method.cardType)}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {method.type === "credit_card"
                      ? `${method.cardType?.charAt(0).toUpperCase() + method.cardType?.slice(1)} Card`
                      : "PayPal"}
                  </CardTitle>
                  {method.default && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center w-fit mt-1">
                      <Check className="w-3 h-3 mr-1" />
                      Default
                    </span>
                  )}
                </div>
              </div>
              <Lock className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {method.type === "credit_card" ? (
                  <>
                    <p className="font-medium text-gray-900">{method.cardHolder}</p>
                    <p className="text-sm text-gray-600 font-mono tracking-wider">{method.cardNumber}</p>
                    <p className="text-sm text-gray-600">Expires: {method.expiryDate}</p>
                    {method.billingAddress && (
                      <p className="text-xs text-gray-500">
                        {method.billingAddress.city}, {method.billingAddress.state} {method.billingAddress.zipCode}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-600">{method.email}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentPaymentMethod(method)
                    setIsEditDialogOpen(true)
                  }}
                  className="flex-1 min-w-[80px]"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:border-red-300 flex-1 min-w-[80px]"
                  onClick={() => {
                    setCurrentPaymentMethod(method)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
                {!method.default && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updatedPaymentMethods = paymentMethods.map((m) => ({
                        ...m,
                        default: m.id === method.id,
                      }))
                      setPaymentMethods(updatedPaymentMethods)
                      toast.success("Default payment method updated")
                    }}
                    className="w-full mt-2"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Set as Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Payment Method Card */}
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <CardContent
            className="flex flex-col items-center justify-center h-full py-8"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
              <PlusCircle className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium text-gray-900">Add Payment Method</h3>
            <p className="text-sm text-gray-600 text-center mt-1">Add a new credit card or PayPal account</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Method Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new payment method to your account securely.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-4">
              <div>
                <Label className="text-base font-medium">Payment Type</Label>
                <RadioGroup className="flex space-x-6 mt-3" defaultValue={paymentType} onValueChange={setPaymentType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="cursor-pointer flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer flex items-center">
                      <PaypalIcon className="w-4 h-4 mr-2" />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentType === "credit_card" ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="cardHolder">Cardholder Name *</Label>
                      <Input
                        id="cardHolder"
                        value={newPaymentMethod.cardHolder}
                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cardHolder: e.target.value })}
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) =>
                          setNewPaymentMethod({ ...newPaymentMethod, cardNumber: formatCardNumber(e.target.value) })
                        }
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 font-mono"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          value={newPaymentMethod.expiryDate}
                          onChange={(e) =>
                            setNewPaymentMethod({ ...newPaymentMethod, expiryDate: formatExpiryDate(e.target.value) })
                          }
                          placeholder="MM/YY"
                          className="mt-1 font-mono"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          value={newPaymentMethod.cvv}
                          onChange={(e) =>
                            setNewPaymentMethod({ ...newPaymentMethod, cvv: e.target.value.replace(/\D/g, "") })
                          }
                          placeholder="123"
                          className="mt-1 font-mono"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="border-t pt-4">
                    <Label className="text-base font-medium">Billing Address</Label>
                    <div className="grid gap-4 mt-3">
                      <div>
                        <Label htmlFor="street">Street Address *</Label>
                        <Input
                          id="street"
                          value={newPaymentMethod.billingAddress.street}
                          onChange={(e) =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              billingAddress: { ...newPaymentMethod.billingAddress, street: e.target.value },
                            })
                          }
                          placeholder="123 Main Street"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={newPaymentMethod.billingAddress.city}
                            onChange={(e) =>
                              setNewPaymentMethod({
                                ...newPaymentMethod,
                                billingAddress: { ...newPaymentMethod.billingAddress, city: e.target.value },
                              })
                            }
                            placeholder="New York"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={newPaymentMethod.billingAddress.state}
                            onChange={(e) =>
                              setNewPaymentMethod({
                                ...newPaymentMethod,
                                billingAddress: { ...newPaymentMethod.billingAddress, state: e.target.value },
                              })
                            }
                            placeholder="NY"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={newPaymentMethod.billingAddress.zipCode}
                            onChange={(e) =>
                              setNewPaymentMethod({
                                ...newPaymentMethod,
                                billingAddress: { ...newPaymentMethod.billingAddress, zipCode: e.target.value },
                              })
                            }
                            placeholder="10001"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country *</Label>
                          <Select
                            value={newPaymentMethod.billingAddress.country}
                            onValueChange={(value) =>
                              setNewPaymentMethod({
                                ...newPaymentMethod,
                                billingAddress: { ...newPaymentMethod.billingAddress, country: value },
                              })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <Label htmlFor="email">PayPal Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPaymentMethod.email}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="default"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={newPaymentMethod.default}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, default: e.target.checked })}
                />
                <Label htmlFor="default" className="cursor-pointer text-sm">
                  Set as default payment method
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Save Payment Method"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Method Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>Make changes to your payment method.</DialogDescription>
          </DialogHeader>
          {currentPaymentMethod && (
            <div className="grid gap-4 py-4">
              {currentPaymentMethod.type === "credit_card" ? (
                <>
                  <div>
                    <Label htmlFor="edit-cardHolder">Cardholder Name</Label>
                    <Input
                      id="edit-cardHolder"
                      value={currentPaymentMethod.cardHolder}
                      onChange={(e) =>
                        setCurrentPaymentMethod({
                          ...currentPaymentMethod,
                          cardHolder: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-expiryDate">Expiry Date</Label>
                    <Input
                      id="edit-expiryDate"
                      value={currentPaymentMethod.expiryDate}
                      onChange={(e) =>
                        setCurrentPaymentMethod({
                          ...currentPaymentMethod,
                          expiryDate: formatExpiryDate(e.target.value),
                        })
                      }
                      placeholder="MM/YY"
                      className="mt-1 font-mono"
                      maxLength={5}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <Label htmlFor="edit-email">PayPal Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentPaymentMethod.email}
                    onChange={(e) =>
                      setCurrentPaymentMethod({
                        ...currentPaymentMethod,
                        email: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-default"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={currentPaymentMethod.default}
                  onChange={(e) =>
                    setCurrentPaymentMethod({
                      ...currentPaymentMethod,
                      default: e.target.checked,
                    })
                  }
                  disabled={currentPaymentMethod.default}
                />
                <Label htmlFor="edit-default" className="cursor-pointer text-sm">
                  Set as default payment method
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleEditPaymentMethod} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Payment Method Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment method? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentPaymentMethod && currentPaymentMethod.default && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                  <div className="text-sm text-yellow-700">
                    <p>
                      You are deleting your default payment method. If you have other payment methods, the first one
                      will be set as default.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePaymentMethod} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete Payment Method"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
