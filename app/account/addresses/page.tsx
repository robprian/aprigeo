"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2, Check, MapPin, Home, Building, Briefcase } from "lucide-react"
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

// Mock address data
const initialAddresses = [
  {
    id: 1,
    type: "home",
    default: true,
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "United States",
  },
  {
    id: 2,
    type: "work",
    default: false,
    name: "John Doe",
    phone: "+1 (555) 987-6543",
    address: "456 Office Park",
    city: "Business City",
    state: "NY",
    zip: "67890",
    country: "United States",
  },
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<any>(null)
  const [newAddress, setNewAddress] = useState({
    type: "home",
    default: false,
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  })

  const handleAddAddress = () => {
    const id = Math.max(0, ...addresses.map((a) => a.id)) + 1
    const addressToAdd = { ...newAddress, id }

    // If this is the first address or marked as default, update all others
    if (newAddress.default || addresses.length === 0) {
      setAddresses([...addresses.map((a) => ({ ...a, default: false })), { ...addressToAdd, default: true }])
    } else {
      setAddresses([...addresses, addressToAdd])
    }

    setIsAddDialogOpen(false)
    setNewAddress({
      type: "home",
      default: false,
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
    })
  }

  const handleEditAddress = () => {
    // If setting as default, update all addresses
    if (currentAddress.default) {
      setAddresses(
        addresses.map((address) => ({
          ...address,
          default: address.id === currentAddress.id,
        })),
      )
    } else {
      setAddresses(addresses.map((address) => (address.id === currentAddress.id ? currentAddress : address)))
    }
    setIsEditDialogOpen(false)
  }

  const handleDeleteAddress = () => {
    const updatedAddresses = addresses.filter((address) => address.id !== currentAddress.id)

    // If we deleted the default address and there are other addresses, make the first one default
    if (currentAddress.default && updatedAddresses.length > 0) {
      updatedAddresses[0].default = true
    }

    setAddresses(updatedAddresses)
    setIsDeleteDialogOpen(false)
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-5 h-5" />
      case "work":
        return <Briefcase className="w-5 h-5" />
      default:
        return <Building className="w-5 h-5" />
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
        <p className="text-gray-600 mt-1">Manage your shipping and billing addresses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className={address.default ? "border-green-500" : ""}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                  {getAddressIcon(address.type)}
                </div>
                <CardTitle className="text-lg capitalize">{address.type} Address</CardTitle>
              </div>
              {address.default && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <Check className="w-3 h-3 mr-1" />
                  Default
                </span>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-1 mb-4">
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-gray-600">{address.phone}</p>
                <p className="text-sm text-gray-600">{address.address}</p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state} {address.zip}
                </p>
                <p className="text-sm text-gray-600">{address.country}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentAddress(address)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    setCurrentAddress(address)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
                {!address.default && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updatedAddresses = addresses.map((a) => ({
                        ...a,
                        default: a.id === address.id,
                      }))
                      setAddresses(updatedAddresses)
                    }}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Set as Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Address Card */}
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <CardContent
            className="flex flex-col items-center justify-center h-full py-8"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
              <PlusCircle className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium text-gray-900">Add New Address</h3>
            <p className="text-sm text-gray-600 text-center mt-1">Add a new shipping or billing address</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>Add a new shipping or billing address to your account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="address-type">Address Type</Label>
                <RadioGroup
                  id="address-type"
                  className="flex space-x-4 mt-2"
                  defaultValue={newAddress.type}
                  onValueChange={(value) => setNewAddress({ ...newAddress, type: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home" className="cursor-pointer">
                      Home
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="work" id="work" />
                    <Label htmlFor="work" className="cursor-pointer">
                      Work
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input
                  id="zip"
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  defaultValue={newAddress.country}
                  onValueChange={(value) => setNewAddress({ ...newAddress, country: value })}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="default"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={newAddress.default}
                  onChange={(e) => setNewAddress({ ...newAddress, default: e.target.checked })}
                />
                <Label htmlFor="default" className="cursor-pointer">
                  Set as default address
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAddress}>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>Make changes to your address.</DialogDescription>
          </DialogHeader>
          {currentAddress && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="edit-address-type">Address Type</Label>
                  <RadioGroup
                    id="edit-address-type"
                    className="flex space-x-4 mt-2"
                    defaultValue={currentAddress.type}
                    onValueChange={(value) => setCurrentAddress({ ...currentAddress, type: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="edit-home" />
                      <Label htmlFor="edit-home" className="cursor-pointer">
                        Home
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="work" id="edit-work" />
                      <Label htmlFor="edit-work" className="cursor-pointer">
                        Work
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="edit-other" />
                      <Label htmlFor="edit-other" className="cursor-pointer">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={currentAddress.name}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={currentAddress.phone}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, phone: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-address">Street Address</Label>
                  <Input
                    id="edit-address"
                    value={currentAddress.address}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, address: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={currentAddress.city}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-state">State/Province</Label>
                  <Input
                    id="edit-state"
                    value={currentAddress.state}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-zip">ZIP/Postal Code</Label>
                  <Input
                    id="edit-zip"
                    value={currentAddress.zip}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, zip: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-country">Country</Label>
                  <Select
                    defaultValue={currentAddress.country}
                    onValueChange={(value) => setCurrentAddress({ ...currentAddress, country: value })}
                  >
                    <SelectTrigger id="edit-country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-default"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    checked={currentAddress.default}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, default: e.target.checked })}
                    disabled={currentAddress.default}
                  />
                  <Label htmlFor="edit-default" className="cursor-pointer">
                    Set as default address
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAddress}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Address Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentAddress && currentAddress.default && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                  <div className="text-sm text-yellow-700">
                    <p>
                      You are deleting your default address. If you have other addresses, the first one will be set as
                      default.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAddress}>
              Delete Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
