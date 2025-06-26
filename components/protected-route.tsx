"use client"

import type React from "react"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/loading-spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
}

export function ProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
  const { user, isLoading, isInitialized } = useAuth()

  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      console.log("🔄 No user found, redirecting to login")
      window.location.href = "/login"
    }
  }, [user, isLoading, isInitialized])

  // Show loading during initialization
  if (!isInitialized || isLoading) {
    return <LoadingSpinner message="Verificando permisos..." />
  }

  // Redirect if no user
  if (!user) {
    return <LoadingSpinner message="Redirigiendo al login..." />
  }

  // Check role permissions if required roles are specified
  if (requiredRoles.length > 0) {
    const userRole = user.role?.toLowerCase()
    const hasPermission = requiredRoles.some((role) => {
      const requiredRole = role.toLowerCase()
      // Handle role variations
      if (requiredRole === "estudiante" && (userRole === "student" || userRole === "estudiante")) {
        return true
      }
      if (requiredRole === "profesor" && (userRole === "teacher" || userRole === "profesor")) {
        return true
      }
      if (requiredRole === "admin" && (userRole === "admin" || userRole === "administrator")) {
        return true
      }
      if (requiredRole === "secretario" && (userRole === "secretary" || userRole === "secretario")) {
        return true
      }
      if (requiredRole === "paciente" && (userRole === "patient" || userRole === "paciente")) {
        return true
      }
      return requiredRole === userRole
    })

    if (!hasPermission) {
      console.log(`🔄 Insufficient permissions. User role: ${userRole}, Required: ${requiredRoles.join(", ")}`)
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Acceso Denegado</h2>
            <p className="text-gray-600 mb-4">No tienes permisos para acceder a esta página.</p>
            <p className="text-sm text-gray-500">
              Tu rol: <span className="font-medium">{user.role}</span>
            </p>
            <p className="text-sm text-gray-500">
              Roles requeridos: <span className="font-medium">{requiredRoles.join(", ")}</span>
            </p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
