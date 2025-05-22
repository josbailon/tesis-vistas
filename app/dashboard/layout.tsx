"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          router.push("/login")
        }
      } catch (e) {
        console.error("Error al verificar autenticación:", e)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      checkAuth()
    }

    // Verificar la sesión periódicamente
    const intervalId = setInterval(() => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user")
        if (!storedUser) {
          router.push("/login")
        }
      }
    }, 30000) // Verificar cada 30 segundos

    return () => clearInterval(intervalId)
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
