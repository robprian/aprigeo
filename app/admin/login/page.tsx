"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Eye, EyeOff, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Login berhasil!",
          description: "Selamat datang di Admin Portal.",
        })
        router.push('/admin')
      } else {
        setError(data.error || 'Login gagal')
      }
    } catch (error) {
      setError('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-gray-600">
                Masuk ke panel administrasi CV. Aprinia
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Masukkan username"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Masukkan password"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Masuk...
                  </div>
                ) : (
                  "Masuk ke Admin Portal"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p>Default credentials:</p>
                <p className="font-mono text-xs mt-1">
                  admin / admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
