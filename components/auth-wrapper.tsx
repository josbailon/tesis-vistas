"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/loading-spinner"

interface AuthWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthWrapper({ children, fallback }: AuthWrapperProps) {
  const { isInitialized, isLoading } = useAuth()

  if (!isInitialized || isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center medical-gradient">
          <div className="text-center text-white">
            <LoadingSpinner />
            <h2 className="text-2xl font-bold mb-2">Clínica Dental ULEAM</h2>
            <p className="text-white/80">Inicializando autenticación...</p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
