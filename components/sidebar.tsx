"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
  UserPlus,
  ClipboardList,
  BookOpen,
  Stethoscope,
  Shield,
  ChevronDown,
  ChevronRight,
  User,
  Activity,
  CheckSquare,
  Clock,
  MessageSquare,
  BarChart3,
  UserCheck,
  GraduationCap,
  SmileIcon as Tooth,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavItem[]
}

export function Sidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const getNavItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
    ]

    switch (user?.role) {
      case "admin":
        return [
          ...baseItems,
          {
            title: "Usuarios",
            href: "/dashboard/admin/users",
            icon: Users,
          },
          {
            title: "Estudiantes",
            href: "/dashboard/admin/students",
            icon: GraduationCap,
          },
          {
            title: "Profesores",
            href: "/dashboard/admin/professors",
            icon: UserCheck,
          },
          {
            title: "Pacientes",
            href: "/dashboard/admin/patients",
            icon: User,
          },
          {
            title: "Analíticas",
            href: "/dashboard/admin/analytics",
            icon: BarChart3,
          },
          {
            title: "Seguridad",
            href: "/dashboard/admin/security",
            icon: Shield,
          },
          {
            title: "Configuración",
            href: "/dashboard/admin/system-config",
            icon: Settings,
          },
        ]

      case "secretary":
        return [
          ...baseItems,
          {
            title: "Citas",
            href: "/dashboard/secretary/appointments",
            icon: Calendar,
          },
          {
            title: "Pacientes",
            href: "/dashboard/secretary/patients",
            icon: Users,
          },
          {
            title: "Registro de Pacientes",
            href: "/dashboard/secretary/patient-registration",
            icon: UserPlus,
          },
          {
            title: "Agenda Diaria",
            href: "/dashboard/secretary/daily-agenda",
            icon: ClipboardList,
          },
          {
            title: "Comunicaciones",
            href: "/dashboard/secretary/communications",
            icon: MessageSquare,
          },
          {
            title: "Reportes",
            href: "/dashboard/secretary/reports",
            icon: FileText,
          },
        ]

      case "professor":
        return [
          ...baseItems,
          {
            title: "Estudiantes",
            href: "/dashboard/teacher/students",
            icon: GraduationCap,
          },
          {
            title: "Aprobaciones",
            href: "/dashboard/teacher/approvals",
            icon: CheckSquare,
            badge: "3",
          },
          {
            title: "Casos Clínicos",
            href: "/dashboard/teacher/clinical-cases",
            icon: FileText,
          },
          {
            title: "Tareas",
            href: "/dashboard/teacher/assignments",
            icon: BookOpen,
          },
          {
            title: "Progreso",
            href: "/dashboard/teacher/progress",
            icon: Activity,
          },
          {
            title: "Especialidad",
            href: `/dashboard/professor/${user.specialty?.toLowerCase()}`,
            icon: Stethoscope,
          },
        ]

      case "student":
        return [
          ...baseItems,
          {
            title: "Mis Citas",
            href: "/dashboard/my-appointments",
            icon: Calendar,
          },
          {
            title: "Pacientes",
            href: "/dashboard/patients",
            icon: Users,
          },
          {
            title: "Casos Clínicos",
            href: "/dashboard/students/clinical-cases",
            icon: FileText,
          },
          {
            title: "Odontograma",
            href: "/dashboard/students/odontogram",
            icon: Tooth,
          },
          {
            title: "Tareas",
            href: "/dashboard/assignments",
            icon: BookOpen,
          },
          {
            title: "Horarios",
            href: "/dashboard/schedule",
            icon: Clock,
          },
          {
            title: "Historial Clínico",
            href: "/dashboard/clinical-history",
            icon: Activity,
          },
        ]

      case "patient":
        return [
          ...baseItems,
          {
            title: "Mis Citas",
            href: "/dashboard/my-appointments",
            icon: Calendar,
          },
          {
            title: "Agendar Cita",
            href: "/dashboard/book-appointment",
            icon: UserPlus,
          },
          {
            title: "Mis Registros",
            href: "/dashboard/my-records",
            icon: FileText,
          },
          {
            title: "Mi Perfil",
            href: "/dashboard/my-profile",
            icon: User,
          },
        ]

      default:
        return baseItems
    }
  }

  const navItems = getNavItems()

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = pathname === item.href
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.title}>
        <div className="relative">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.title)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                level > 0 && "ml-4",
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <div className="flex items-center">
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
                {item.badge && (
                  <Badge variant="secondary" className="ml-2">
                    {item.badge}
                  </Badge>
                )}
              </div>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                level > 0 && "ml-4",
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
              {item.badge && (
                <Badge variant="secondary" className="ml-2">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">{item.children!.map((child) => renderNavItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
          <div className="flex items-center">
            <Tooth className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ULEAM</span>
          </div>
        </div>

        {/* User Info */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">{navItems.map((item) => renderNavItem(item))}</nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
