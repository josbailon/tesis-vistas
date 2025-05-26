"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { sessionManager } from "@/lib/session-manager"

export default function SessionCheck({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Rutas públicas que no requieren autenticación
    const publicPaths = ["/", "/login", "/register"]
    const isPublicPath = publicPaths.includes(pathname)

    // Verificar si hay un parámetro callbackUrl en la URL
    const callbackUrl = searchParams.get("callbackUrl")
    if (callbackUrl && pathname === "/login") {
      console.log("Guardando URL de callback:", callbackUrl)
      sessionManager.saveCallbackUrl(decodeURIComponent(callbackUrl))
    }

    const checkSession = () => {
      console.log("Verificando sesión en ruta:", pathname)
      const isAuthenticated = sessionManager.isAuthenticated()
      console.log("¿Usuario autenticado?", isAuthenticated)

      // Si no está autenticado y no es una ruta pública, redirigir a login
      if (!isAuthenticated && !isPublicPath) {
        console.log("No autenticado en ruta protegida, redirigiendo a login")
        router.push("/login")
        return
      }

      // Si está autenticado y está en login o register, redirigir al dashboard
      if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
        const user = sessionManager.getUser()
        let redirectPath = "/dashboard"

        // Verificar si hay una URL de callback guardada
        const savedCallbackUrl = sessionManager.getCallbackUrl()
        if (savedCallbackUrl) {
          console.log("Redirigiendo a URL de callback guardada:", savedCallbackUrl)
          sessionManager.clearCallbackUrl()
          router.push(savedCallbackUrl)
          return
        }

        // Si no hay callback, redirigir según el rol
        if (user) {
          switch (user.role) {
            case "patient":
              redirectPath = "/dashboard/my-appointments"
              break
            case "student":
              redirectPath = "/dashboard/patients"
              break
            case "professor":
              redirectPath = "/dashboard/specialty"
              break
            case "admin":
              redirectPath = "/dashboard/users"
              break
          }
        }

        console.log("Redirigiendo a dashboard según rol:", redirectPath)
        router.push(redirectPath)
        return
      }

      // IMPORTANTE: No redirigir si el usuario está autenticado y ya está en una ruta protegida
      setIsLoading(false)
    }

    // Ejecutar verificación
    checkSession()

    // Escuchar eventos de login/logout
    const handleUserChange = () => {
      checkSession()
    }

    window.addEventListener("userLogin", handleUserChange)
    window.addEventListener("userLogout", handleUserChange)

    return () => {
      window.removeEventListener("userLogin", handleUserChange)
      window.removeEventListener("userLogout", handleUserChange)
    }
  }, [pathname, router, searchParams])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
