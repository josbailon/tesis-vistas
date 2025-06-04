"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Bell, User, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useState } from "react"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const [notificationCount] = useState(3) // Simulado

  const handleLogout = async () => {
    try {
      // Show loading state
      const button = document.querySelector("[data-logout-btn]") as HTMLButtonElement
      if (button) {
        button.disabled = true
        button.innerHTML =
          '<div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>Cerrando...'
      }

      // Call logout from auth context
      await logout()

      // Clear any local storage
      localStorage.clear()
      sessionStorage.clear()

      // Force redirect to login
      window.location.href = "/login"
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      // Reset button state
      const button = document.querySelector("[data-logout-btn]") as HTMLButtonElement
      if (button) {
        button.disabled = false
        button.innerHTML = '<LogOut class="h-4 w-4 mr-2" />Cerrar Sesión'
      }
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "student":
        return "Estudiante"
      case "professor":
        return "Profesor"
      case "secretary":
        return "Secretaria"
      case "patient":
        return "Paciente"
      default:
        return role
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700"
      case "student":
        return "bg-blue-100 text-blue-700"
      case "professor":
        return "bg-green-100 text-green-700"
      case "secretary":
        return "bg-purple-100 text-purple-700"
      case "patient":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-blue-200 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-blue-800">{user?.name || "Usuario"}</p>
            <Badge className={getRoleBadge(user?.role || "")}>{getRoleLabel(user?.role || "")}</Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notificaciones */}
        <Link href="/dashboard/notifications">
          <Button variant="outline" size="sm" className="relative border-blue-300 text-blue-700 hover:bg-blue-50">
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                {notificationCount}
              </Badge>
            )}
          </Button>
        </Link>

        {/* Configuración */}
        <Link href="/dashboard/settings">
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>

        {/* Cerrar Sesión */}
        <Button
          onClick={handleLogout}
          data-logout-btn
          variant="outline"
          size="sm"
          className="border-red-300 text-red-700 hover:bg-red-50 hover:scale-105 transition-all duration-200"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
