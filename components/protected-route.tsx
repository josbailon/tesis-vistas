"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: string[]
  fallbackPath?: string
}

export function ProtectedRoute({ children, requiredRoles = [], fallbackPath = "/login" }: ProtectedRouteProps) {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect after auth is initialized
    if (isInitialized && !isLoading) {
      if (!user) {
        console.log("🔄 No user found, redirecting to:", fallbackPath)
        router.replace(fallbackPath)
        return
      }

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        console.log("🔄 Insufficient permissions, redirecting to dashboard")
        router.replace("/dashboard")
        return
      }
    }
  }, [user, isLoading, isInitialized, requiredRoles, router, fallbackPath])

  // Show loading while initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-green-800">Verificando acceso...</p>
          <p className="text-sm text-green-600 mt-2">Inicializando autenticación</p>
        </div>
      </div>
    )
  }

  // Show unauthorized if no user after initialization
  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-green-800">Redirigiendo...</p>
        </div>
      </div>
    )
  }

  // Show access denied for insufficient permissions
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-6 bg-green-50">
        <div className="w-full max-w-md text-center">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Acceso Denegado</h2>
            <p className="text-red-600 mb-4">No tienes permisos para acceder a esta página.</p>
            <p className="text-sm text-red-500 mb-4">
              Rol requerido: {requiredRoles.join(", ")} | Tu rol: {user.role}
            </p>
            <button
              onClick={() => router.replace("/dashboard")}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
