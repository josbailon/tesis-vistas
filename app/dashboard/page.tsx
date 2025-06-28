"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, FileText, Activity } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Memoize role-based redirects to prevent unnecessary re-calculations
  const roleRedirects = useMemo(
    () => ({
      patient: "/dashboard/my-appointments",
      estudiante: "/dashboard/patients",
      profesor: "/dashboard/teacher",
      admin: "/dashboard/admin",
      secretario: "/dashboard/secretary",
    }),
    [],
  )

  // Redirect based on user role
  useEffect(() => {
    if (user && !loading) {
      const redirectPath = roleRedirects[user.role as keyof typeof roleRedirects]
      if (redirectPath) {
        router.replace(redirectPath)
      }
    }
  }, [user, loading, router, roleRedirects])

  // Memoize dashboard stats to prevent recalculation
  const dashboardStats = useMemo(
    () => [
      {
        title: "Citas Hoy",
        value: "12",
        icon: Calendar,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Pacientes Activos",
        value: "48",
        icon: Users,
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        title: "Casos Clínicos",
        value: "23",
        icon: FileText,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        title: "Actividad",
        value: "95%",
        icon: Activity,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
    ],
    [],
  )

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text="Cargando dashboard..." variant="medical" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bienvenido, {user.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">Redirigiendo a tu dashboard...</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Preparando tu espacio de trabajo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="md" text="Configurando dashboard personalizado..." variant="medical" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
