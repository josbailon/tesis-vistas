"use client"

import type React from "react"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface SafeRedirectProps {
  children: React.ReactNode
}

export function SafeRedirect({ children }: SafeRedirectProps) {
  const { user, isInitialized, isLoading } = useAuth()

  useEffect(() => {
    // Solo verificar después de la inicialización
    if (isInitialized && !isLoading) {
      if (user) {
        console.log("✅ Usuario autenticado:", user.role)
      } else {
        console.log("❌ No hay usuario autenticado")
      }
    }
  }, [user, isInitialized, isLoading])

  return <>{children}</>
}
