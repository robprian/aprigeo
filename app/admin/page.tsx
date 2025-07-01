"use client"

import EnhancedDashboard from "./components/EnhancedDashboard"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
      </div>
      <EnhancedDashboard />
    </div>
  )
}
