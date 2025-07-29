"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  MapPin, 
  Bell, 
  Camera, 
  Save, 
  Plus, 
  Edit, 
  Trash2,
  Home,
  Building2,
  Loader2,
  Upload,
  Lock,
  Eye,
  EyeOff
} from "lucide-react"
import { toast } from "@/lib/toast"

interface UserProfile {
  id?: number
  user_id: number
  username: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth: string
  gender: string
  profile_image_url: string
  bio: string
  preferences: any
  notification_settings: any
}

interface UserAddress {
  id?: number
  user_id: number
  address_type: string
  is_default: boolean
  label: string
  recipient_name: string
  phone: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  postal_code: string
  country: string
  notes: string
}

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [addresses, setAddresses] = useState<UserAddress[]>([])
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Mock user ID - in real app this would come from auth
  const userId = 1

  const [newAddress, setNewAddress] = useState<Partial<UserAddress>>({
    user_id: userId,
    address_type: 'delivery',
    is_default: false,
    label: '',
    recipient_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Indonesia',
    notes: ''
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await fetch(`/api/account/profile?userId=${userId}`)
      const data = await response.json()
      
      if (data.success) {
        setProfile(data.profile || {
          user_id: userId,
          username: '',
          first_name: '',
          last_name: '',
          phone: '',
          date_of_birth: '',
          gender: '',
          profile_image_url: '',
          bio: '',
          preferences: {},
          notification_settings: { email: true, sms: false, push: true }
        })
        setAddresses(data.addresses || [])
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    if (!profile) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/account/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'profile', ...profile }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Profile updated successfully!')
        setProfile(data.profile)
      } else {
        toast.error(data.error || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const saveAddress = async (address: Partial<UserAddress>) => {
    setSaving(true)
    try {
      const response = await fetch('/api/account/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'address', ...address }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Address saved successfully!')
        setNewAddress({
          user_id: userId,
          address_type: 'delivery',
          is_default: false,
          label: '',
          recipient_name: '',
          phone: '',
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'Indonesia',
          notes: ''
        })
        setShowAddressForm(false)
        loadProfile()
      } else {
        toast.error(data.error || 'Failed to save address')
      }
    } catch (error) {
      console.error('Error saving address:', error)
      toast.error('Failed to save address')
    } finally {
      setSaving(false)
    }
  }

  const updateAddress = async (id: number, address: Partial<UserAddress>) => {
    setSaving(true)
    try {
      const response = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'address', id, ...address }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Address updated successfully!')
        setEditingAddress(null)
        loadProfile()
      } else {
        toast.error(data.error || 'Failed to update address')
      }
    } catch (error) {
      console.error('Error updating address:', error)
      toast.error('Failed to update address')
    } finally {
      setSaving(false)
    }
  }

  const deleteAddress = async (id: number) => {
    if (!confirm('Are you sure you want to delete this address?')) return

    try {
      const response = await fetch(`/api/account/profile?id=${id}&type=address`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Address deleted successfully!')
        loadProfile()
      } else {
        toast.error(data.error || 'Failed to delete address')
      }
    } catch (error) {
      console.error('Error deleting address:', error)
      toast.error('Failed to delete address')
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'profiles')

    setUploading(true)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(prev => prev ? { ...prev, profile_image_url: data.url } : prev)
        toast.success('Profile image updated!')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile?.profile_image_url} />
                  <AvatarFallback className="text-2xl">
                    {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium mb-2">Profile Photo</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload">
                    <Button variant="outline" asChild disabled={uploading}>
                      <span className="cursor-pointer">
                        {uploading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Camera className="w-4 h-4 mr-2" />
                        )}
                        Change Photo
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile?.username || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, username: e.target.value } : prev)}
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile?.phone || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : prev)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={profile?.first_name || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, first_name: e.target.value } : prev)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={profile?.last_name || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, last_name: e.target.value } : prev)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={profile?.date_of_birth || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, date_of_birth: e.target.value } : prev)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={profile?.gender || ''}
                    onValueChange={(value) => setProfile(prev => prev ? { ...prev, gender: value } : prev)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile?.bio || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, bio: e.target.value } : prev)}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={saveProfile} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current_password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current_password"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new_password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new_password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button>Update Password</Button>
                </div>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Saved Addresses</h3>
              <Button onClick={() => setShowAddressForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </div>

            {/* Add Address Form */}
            {showAddressForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="label">Address Label</Label>
                      <Input
                        id="label"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                        placeholder="Home, Office, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="address_type">Address Type</Label>
                      <Select
                        value={newAddress.address_type}
                        onValueChange={(value) => setNewAddress({ ...newAddress, address_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delivery">Delivery</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipient_name">Recipient Name</Label>
                      <Input
                        id="recipient_name"
                        value={newAddress.recipient_name}
                        onChange={(e) => setNewAddress({ ...newAddress, recipient_name: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address_phone">Phone</Label>
                      <Input
                        id="address_phone"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address_line_1">Street Address</Label>
                    <Input
                      id="address_line_1"
                      value={newAddress.address_line_1}
                      onChange={(e) => setNewAddress({ ...newAddress, address_line_1: e.target.value })}
                      placeholder="Street address line 1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                    <Input
                      id="address_line_2"
                      value={newAddress.address_line_2}
                      onChange={(e) => setNewAddress({ ...newAddress, address_line_2: e.target.value })}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        placeholder="State/Province"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postal_code">Postal Code</Label>
                      <Input
                        id="postal_code"
                        value={newAddress.postal_code}
                        onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                        placeholder="Postal code"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_default"
                      checked={newAddress.is_default}
                      onCheckedChange={(checked) => setNewAddress({ ...newAddress, is_default: checked })}
                    />
                    <Label htmlFor="is_default">Set as default address</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddressForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => saveAddress(newAddress)}
                      disabled={saving}
                    >
                      {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Save Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Addresses List */}
            <div className="grid gap-4">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{address.label}</h4>
                          {address.is_default && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded capitalize">
                            {address.address_type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>{address.recipient_name}</strong> • {address.phone}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.address_line_1}
                          {address.address_line_2 && `, ${address.address_line_2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingAddress(address)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteAddress(address.id!)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={profile?.notification_settings?.email || false}
                    onCheckedChange={(checked) => 
                      setProfile(prev => prev ? {
                        ...prev,
                        notification_settings: { ...prev.notification_settings, email: checked }
                      } : prev)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                  <Switch
                    checked={profile?.notification_settings?.sms || false}
                    onCheckedChange={(checked) => 
                      setProfile(prev => prev ? {
                        ...prev,
                        notification_settings: { ...prev.notification_settings, sms: checked }
                      } : prev)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Receive push notifications</p>
                  </div>
                  <Switch
                    checked={profile?.notification_settings?.push || false}
                    onCheckedChange={(checked) => 
                      setProfile(prev => prev ? {
                        ...prev,
                        notification_settings: { ...prev.notification_settings, push: checked }
                      } : prev)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveProfile} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and security settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Survey Solutions Inc." />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Professional surveyor with 10+ years of experience in GPS and total station operations."
                />
              </div>

              <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input id="newPassword" type={showNewPassword ? "text" : "password"} />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains at least one uppercase letter</li>
                    <li>• Contains at least one lowercase letter</li>
                    <li>• Contains at least one number</li>
                    <li>• Contains at least one special character</li>
                  </ul>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Addresses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Home Address</p>
                    <div className="text-sm text-gray-600">
                      <p>John Doe</p>
                      <p>123 Main Street</p>
                      <p>Anytown, ST 12345</p>
                      <p>United States</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Office Address</p>
                    <div className="text-sm text-gray-600">
                      <p>Survey Solutions Inc.</p>
                      <p>456 Business Ave</p>
                      <p>Business City, ST 67890</p>
                      <p>United States</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              <Button variant="outline">Add New Address</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-gray-600">Receive notifications about your order status</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional Emails</p>
                    <p className="text-sm text-gray-600">Receive emails about sales and new products</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Product Recommendations</p>
                    <p className="text-sm text-gray-600">Get personalized product suggestions</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-gray-600">Important security notifications</p>
                  </div>
                  <Switch defaultChecked disabled />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive text messages for urgent updates</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold mr-3">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/26</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold mr-3">
                        MC
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 5678</p>
                        <p className="text-sm text-gray-600">Expires 08/25</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline">Add New Payment Method</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">Invoice #INV-2024-001</p>
                      <p className="text-sm text-gray-600">January 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$15,999.00</p>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">Invoice #INV-2024-002</p>
                      <p className="text-sm text-gray-600">January 20, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$28,999.00</p>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">Invoice #INV-2024-003</p>
                      <p className="text-sm text-gray-600">January 25, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$2,598.00</p>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
