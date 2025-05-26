"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirigir según el rol solo desde la página principal del dashboard
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "patient":
          router.replace("/dashboard/my-appointments")
          break
        case "student":
          router.replace("/dashboard/patients")
          break
        case "professor":
          router.replace("/dashboard/teacher")
          break
        case "admin":
          router.replace("/dashboard/admin")
          break
      }
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-800">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
        <p className="text-green-600">Bienvenido, {user.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Redirigiendo...</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">Cargando</div>
            <p className="text-xs text-green-600">Preparando tu dashboard</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
