"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading, isInitialized } = useAuth()

  useEffect(() => {
    // Only redirect when auth is fully initialized
    if (isInitialized && !isLoading) {
      if (user) {
        console.log("🏠 User authenticated, redirecting to dashboard")
        router.replace("/dashboard")
      } else {
        console.log("🏠 No user, redirecting to login")
        router.replace("/login")
      }
    }
  }, [user, isLoading, isInitialized, router])

  // Show loading while auth is initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Clínica Dental ULEAM</h2>
          <p className="text-white/80">Inicializando aplicación...</p>
        </div>
      </div>
    )
  }

  // This should rarely be seen as the useEffect should redirect
  return (
    <div className="min-h-screen flex items-center justify-center medical-gradient">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-2">Clínica Dental ULEAM</h2>
        <p className="text-white/80">Redirigiendo...</p>
      </div>
    </div>
  )
}
