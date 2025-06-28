"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import {
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
  UserCheck,
  ClipboardList,
  Stethoscope,
  GraduationCap,
  Shield,
  Phone,
  Clock,
  UserPlus,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[]
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["admin", "profesor", "estudiante", "paciente", "secretario"],
  },
  {
    title: "Administración",
    href: "/dashboard/admin",
    icon: Shield,
    roles: ["admin"],
    children: [
      { title: "Usuarios", href: "/dashboard/admin/users", icon: Users },
      { title: "Estudiantes", href: "/dashboard/admin/students", icon: GraduationCap },
      { title: "Profesores", href: "/dashboard/admin/professors", icon: UserCheck },
      { title: "Pacientes", href: "/dashboard/admin/patients", icon: Users },
      { title: "Analíticas", href: "/dashboard/admin/analytics", icon: BarChart3 },
      { title: "Seguridad", href: "/dashboard/admin/security", icon: Shield },
    ],
  },
  {
    title: "Profesor",
    href: "/dashboard/teacher",
    icon: UserCheck,
    roles: ["profesor"],
    children: [
      { title: "Estudiantes", href: "/dashboard/teacher/students", icon: GraduationCap },
      { title: "Asignaciones", href: "/dashboard/teacher/assignments", icon: ClipboardList },
      { title: "Aprobaciones", href: "/dashboard/teacher/approvals", icon: UserCheck },
      { title: "Casos Clínicos", href: "/dashboard/teacher/clinical-cases", icon: FileText },
      { title: "Progreso", href: "/dashboard/teacher/progress", icon: BarChart3 },
    ],
  },
  {
    title: "Estudiante",
    href: "/dashboard/academic",
    icon: GraduationCap,
    roles: ["estudiante"],
    children: [
      { title: "Mis Pacientes", href: "/dashboard/patients", icon: Users },
      { title: "Casos Clínicos", href: "/dashboard/clinical-cases", icon: FileText },
      { title: "Asignaciones", href: "/dashboard/assignments", icon: ClipboardList },
      { title: "Citas", href: "/dashboard/appointments", icon: Calendar },
      { title: "Odontograma", href: "/dashboard/odontogram", icon: Stethoscope },
    ],
  },
  {
    title: "Secretaría",
    href: "/dashboard/secretary",
    icon: Phone,
    roles: ["secretario"],
    children: [
      { title: "Citas", href: "/dashboard/secretary/appointments", icon: Calendar },
      { title: "Registro Pacientes", href: "/dashboard/secretary/patient-registration", icon: UserPlus },
      { title: "Agenda Diaria", href: "/dashboard/secretary/daily-agenda", icon: Clock },
      { title: "Comunicaciones", href: "/dashboard/secretary/communications", icon: Phone },
      { title: "Reportes", href: "/dashboard/secretary/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Paciente",
    href: "/dashboard/my-appointments",
    icon: Calendar,
    roles: ["paciente"],
    children: [
      { title: "Mis Citas", href: "/dashboard/my-appointments", icon: Calendar },
      { title: "Agendar Cita", href: "/dashboard/book-appointment", icon: UserPlus },
      { title: "Mis Registros", href: "/dashboard/my-records", icon: FileText },
    ],
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["admin", "profesor", "estudiante", "paciente", "secretario"],
  },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]))
  }

  const filteredNavigation = navigationItems.filter((item) => !item.roles || item.roles.includes(user?.role || ""))

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = pathname === item.href
    const isExpanded = expandedItems.includes(item.href)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.href}>
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            level > 0 && "ml-4",
            isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <Link href={item.href} className="flex items-center flex-1">
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
          {hasChildren && (
            <button onClick={() => toggleExpanded(item.href)} className="p-1 hover:bg-gray-200 rounded">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">{item.children?.map((child) => renderNavItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900">Clínica ULEAM</h2>
            <p className="text-sm text-gray-500">Sistema Dental</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredNavigation.map((item) => renderNavItem(item))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">{user?.name.charAt(0)}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
