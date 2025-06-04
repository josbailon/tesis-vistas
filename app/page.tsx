"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/dashboard")
      } else {
        router.replace("/login")
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center medical-gradient">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-2">Clínica Dental ULEAM</h2>
        <p className="text-white/80">Cargando aplicación...</p>
      </div>
    </div>
  )
}
