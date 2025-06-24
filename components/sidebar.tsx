"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Calendar,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface SidebarNavItem {
  title: string
  href: string
  icon: any
  description?: string
}

interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
}

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  getNavigationItems: (role: string | undefined) => SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [],
  getNavigationItems: (role: string | undefined) => {
    let navigationItems: SidebarNavItem[] = []

    if (role === "admin") {
      navigationItems = [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Usuarios",
          href: "/dashboard/users",
          icon: Users,
          description: "Gestión de usuarios y roles",
        },
        {
          title: "Citas",
          href: "/appointments",
          icon: Calendar,
          description: "Gestión de citas médicas",
        },
        {
          title: "Estudiantes",
          href: "/students-info",
          icon: GraduationCap,
          description: "Información de estudiantes",
        },
        {
          title: "Documentos",
          href: "/dashboard/medical-records",
          icon: FileText,
          description: "Gestión de documentos",
        },
        {
          title: "Ajustes",
          href: "/dashboard/settings",
          icon: Settings,
          description: "Configuración general del sistema",
        },
      ]
    } else if (role === "profesor") {
      navigationItems = [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Citas",
          href: "/appointments",
          icon: Calendar,
          description: "Gestión de citas médicas",
        },
        {
          title: "Estudiantes Info",
          href: "/students-info",
          icon: GraduationCap,
          description: "Información de estudiantes",
        },
        {
          title: "Documentos",
          href: "/dashboard/medical-records",
          icon: FileText,
          description: "Gestión de documentos",
        },
      ]
    } else if (role === "paciente") {
      navigationItems = [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Mis Citas",
          href: "/appointments",
          icon: Calendar,
          description: "Gestionar citas médicas",
        },
        {
          title: "Mi Perfil",
          href: "/dashboard/my-profile",
          icon: User,
          description: "Información personal",
        },
      ]
    } else if (role === "estudiante") {
      navigationItems = [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Información Estudiantes",
          href: "/students-info",
          icon: GraduationCap,
          description: "Información académica",
        },
        {
          title: "Citas",
          href: "/appointments",
          icon: Calendar,
          description: "Gestionar citas",
        },
        {
          title: "Mi Perfil",
          href: "/dashboard/my-profile",
          icon: User,
          description: "Información personal",
        },
      ]
    } else {
      navigationItems = [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Citas",
          href: "/appointments",
          icon: Calendar,
          description: "Gestión de citas médicas",
        },
      ]
    }

    return navigationItems
  },
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navigationItems = dashboardConfig.getNavigationItems(user?.role)

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-primary-200/50 shadow-soft-lg transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-200/50">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UC</span>
            </div>
            <div>
              <h2 className="font-semibold text-primary-900">ULEAM</h2>
              <p className="text-xs text-primary-600">Clínica Dental</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-primary-200/50">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary-100 text-primary-700">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-900 truncate">{user?.name || "Usuario"}</p>
              <p className="text-xs text-primary-600 truncate">{user?.role || "Sin rol"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-100 text-primary-900 border border-primary-200"
                  : "text-primary-700 hover:bg-primary-50 hover:text-primary-900",
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <span className="truncate">{item.title}</span>
                  {item.description && <p className="text-xs text-primary-500 truncate mt-0.5">{item.description}</p>}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-primary-200/50">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && "justify-center",
          )}
          title={collapsed ? "Cerrar Sesión" : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  )
}
