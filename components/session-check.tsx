"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function SessionCheck({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Rutas públicas que no requieren autenticación
    const publicPaths = ["/", "/login", "/register"]
    const isPublicPath = publicPaths.some((path) => pathname === path)

    // Verificar si hay un usuario en localStorage
    const storedUser = localStorage.getItem("user")
    const isAuthenticated = !!storedUser

    // Si no está autenticado y no es una ruta pública, redirigir a login
    if (!isAuthenticated && !isPublicPath) {
      router.push("/login")
    }

    // Si está autenticado y está en una ruta pública, redirigir al dashboard
    if (isAuthenticated && isPublicPath && pathname !== "/") {
      const user = JSON.parse(storedUser!)
      let redirectPath = "/dashboard"

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

      router.push(redirectPath)
    }

    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
