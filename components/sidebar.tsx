import { LayoutDashboard, Users, FileText, Settings, Calendar } from "lucide-react"

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
