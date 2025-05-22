"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Home,
  Calendar,
  FileText,
  Users,
  Stethoscope,
  GraduationCap,
  CheckSquare,
  BarChart,
  Settings,
  Clock,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { sessionManager } from "@/lib/session-manager"
import type { AuthUser } from "@/lib/session-manager"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar la sesión al cargar el componente
    const checkAuth = () => {
      try {
        const currentUser = sessionManager.getUser()

        if (currentUser) {
          console.log("Usuario autenticado:", currentUser)
          setUser(currentUser)
        } else {
          console.log("No hay usuario autenticado, redirigiendo a login")
          window.location.href = "/login"
        }
      } catch (e) {
        console.error("Error al verificar autenticación:", e)
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Verificar la sesión periódicamente
    const intervalId = setInterval(() => {
      const currentUser = sessionManager.getUser()
      if (!currentUser) {
        console.log("Sesión expirada, redirigiendo a login")
        window.location.href = "/login"
      }
    }, 30000) // Verificar cada 30 segundos

    return () => clearInterval(intervalId)
  }, [])

  const handleLogout = () => {
    sessionManager.logout()
    window.location.href = "/login"
  }

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
      <div className="w-64 bg-gray-100 border-r p-4">
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Clínica Dental</h2>
            <p className="text-sm text-muted-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>

          <nav className="flex-1 space-y-1">
            <Link href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-200">
              <Home className="h-4 w-4 mr-2" />
              <span>Inicio</span>
            </Link>

            {/* Patient Links */}
            {user.role === "patient" && (
              <>
                <Link href="/dashboard/my-appointments" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Mis Citas</span>
                </Link>
                <Link href="/dashboard/my-records" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Mi Historial Clínico</span>
                </Link>
              </>
            )}

            {/* Student Links */}
            {user.role === "student" && (
              <>
                <Link
                  href="/dashboard/appointment-management"
                  className="flex items-center p-2 rounded-md hover:bg-gray-200"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Gestión de Citas</span>
                </Link>
                <Link href="/dashboard/patients" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Pacientes</span>
                </Link>
                <Link href="/dashboard/clinical-history" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Historias Clínicas</span>
                </Link>
                <Link
                  href="/dashboard/approval-requests"
                  className="flex items-center p-2 rounded-md hover:bg-gray-200"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  <span>Solicitudes de Aprobación</span>
                </Link>
                <Link href="/dashboard/academic" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span>Tareas Académicas</span>
                </Link>
              </>
            )}

            {/* Professor Links */}
            {user.role === "professor" && (
              <>
                <Link href="/dashboard/specialty" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  <span>Mi Especialidad</span>
                </Link>
                <Link href="/dashboard/students" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span>Mis Estudiantes</span>
                </Link>
                <Link href="/dashboard/approvals" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  <span>Aprobaciones</span>
                </Link>
                <Link href="/dashboard/schedule" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Horario</span>
                </Link>
              </>
            )}

            {/* Admin Links */}
            {user.role === "admin" && (
              <>
                <Link href="/dashboard/users" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Gestión de Usuarios</span>
                </Link>
                <Link href="/dashboard/specialties" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  <span>Especialidades</span>
                </Link>
                <Link href="/dashboard/statistics" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <BarChart className="h-4 w-4 mr-2" />
                  <span>Estadísticas</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center p-2 rounded-md hover:bg-gray-200">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Configuración</span>
                </Link>
              </>
            )}
          </nav>

          <div className="mt-auto pt-4">
            <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
