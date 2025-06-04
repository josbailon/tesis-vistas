"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, Settings, Calendar, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { UleamBranding } from "@/components/uleam-branding"

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

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const navigationItems = dashboardConfig.getNavigationItems(user?.role)

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <UleamBranding />
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="grid items-start gap-2 text-sm font-medium">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary",
                )}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block w-64">
        <SidebarContent />
      </div>
    </>
  )
}
