"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function UserPortal() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to account page
    router.push("/account")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to User Portal...</h1>
        <p className="text-gray-600">Please wait while we redirect you to your account.</p>
      </div>
    </div>
  )
}
