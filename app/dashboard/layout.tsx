"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isInitialized } = useAuth()
  const redirectHandled = useRef(false)

  useEffect(() => {
    if (isInitialized && !isLoading && !user && !redirectHandled.current) {
      redirectHandled.current = true
      console.log("🔄 Dashboard: No user found, redirecting to login")

      setTimeout(() => {
        window.location.href = "/login"
      }, 500)
    }
  }, [user, isLoading, isInitialized])

  // Show loading during initialization
  if (!isInitialized || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-soft-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-800 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  // Show loading if no user (redirecting)
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-soft-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-800 font-medium">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-soft-gradient">
      <Sidebar />
      <div className="flex-grow overflow-y-auto">
        <main className="p-6">
          <div className="bg-white rounded-xl shadow-soft-lg border border-primary-200/50 min-h-full p-6 backdrop-blur-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
