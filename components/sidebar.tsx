import { LayoutDashboard, Users, FileText, Settings, Calendar, GraduationCap } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

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
          href: "/users",
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
          title: "Documentos",
          href: "/documents",
          icon: FileText,
          description: "Gestión de documentos",
        },
        {
          title: "Ajustes",
          href: "/settings",
          icon: Settings,
          description: "Configuración general del sistema",
        },
        {
          title: "Estudiantes",
          href: "/students-info",
          icon: GraduationCap,
          description: "Información de estudiantes",
        },
      ]
    } else if (role === "doctor") {
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
          title: "Documentos",
          href: "/documents",
          icon: FileText,
          description: "Gestión de documentos",
        },
      ]
    } else if (role === "patient") {
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
      ]
    } else if (role === "student") {
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
      ]
    } else if (role === "professor") {
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
          description: "Gestionar citas médicas",
        },
        {
          title: "Estudiantes Info",
          href: "/students-info",
          icon: GraduationCap,
          description: "Información de estudiantes",
        },
      ]
    } else if (role === "secretary") {
      navigationItems = [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Panel Secretaría",
          href: "/dashboard/secretary",
          icon: Calendar,
          description: "Gestión de citas y horarios",
        },
        {
          title: "Horarios Estudiantes",
          href: "/students-info",
          icon: GraduationCap,
          description: "Consultar horarios",
        },
        {
          title: "Citas",
          href: "/appointments",
          icon: Calendar,
          description: "Gestionar todas las citas",
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
