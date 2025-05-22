"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { sessionManager } from "@/lib/session-manager"

interface SessionCheckProps {
  children: React.ReactNode
}

export function SessionCheck({ children }: SessionCheckProps) {
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Verificar la sesión al cargar el componente
    const checkSession = () => {
      try {
        const isAuthenticated = sessionManager.isAuthenticated()
        const currentPath = window.location.pathname

        // Si no está autenticado y no está en una ruta pública, redirigir a login
        if (!isAuthenticated && !isPublicRoute(currentPath)) {
          console.log("No autenticado, redirigiendo a login")
          window.location.href = "/login"
          return
        }

        // Si está autenticado y está en login o register, redirigir a dashboard
        if (isAuthenticated && (currentPath === "/login" || currentPath === "/register")) {
          console.log("Ya autenticado, redirigiendo a dashboard")
          window.location.href = "/dashboard"
          return
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error)
      } finally {
        setIsChecking(false)
      }
    }

    checkSession()

    // Verificar la sesión periódicamente
    const intervalId = setInterval(() => {
      if (sessionManager.isAuthenticated()) {
        console.log("Verificación periódica de sesión: sesión activa")
      }
    }, 60000) // Verificar cada minuto

    return () => clearInterval(intervalId)
  }, [])

  // Determinar si una ruta es pública
  const isPublicRoute = (path: string): boolean => {
    const publicRoutes = ["/", "/login", "/register", "/about"]
    return publicRoutes.some((route) => path === route || path.startsWith(`${route}/`))
  }

  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-lg font-medium">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
