"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/app/components/auth/LoginForm"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/account")
    }
  }, [router])

  const handleLoginSuccess = () => {
    router.push("/account")
  }

  return <LoginForm onSuccess={handleLoginSuccess} />
}
