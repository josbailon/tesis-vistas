"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/contexts/auth-context"
import {
  Calendar,
  Users,
  FileText,
  Home,
  Stethoscope,
  UserCheck,
  BookOpen,
  BarChart3,
  Shield,
  User,
  Clock,
  ChevronDown,
  ChevronRight,
  Plus,
  Eye,
  MessageSquare,
  UserPlus,
  CalendarPlus,
  SmileIcon as Tooth,
  CalendarIcon,
  Image,
  GraduationCapIcon as Cap,
  GraduationCapIcon as Cap,
  SettingsIcon as Setting,
  ClipboardIcon as Clip,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: any
  children?: SidebarItem[]
}

const sidebarItems: Record<string, SidebarItem[]> = {
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Gestión de Usuarios",
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
  ],
  professor: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Mis Estudiantes",
      href: "/dashboard/teacher/students",
      icon: Users,
    },
    {
      title: "Tareas y Asignaciones",
      href: "/dashboard/teacher/assignments",
      icon: Image,
    },
    {
      title: "Solicitudes de Aprobación",
      href: "/dashboard/teacher/approvals",
      icon: UserCheck,
    },
    {
      title: "Casos Clínicos",
      href: "/dashboard/teacher/clinical-cases",
      icon: Stethoscope,
    },
    {
      title: "Horarios de Estudiantes",
      href: "/dashboard/teacher/student-schedules",
      icon: Calendar,
    },
    {
      title: "Progreso Académico",
      href: "/dashboard/teacher/progress",
      icon: BarChart3,
    },
    {
      title: "Historial Clínico",
      href: "/dashboard/teacher/clinical-history",
      icon: FileText,
    },
    {
      title: "Trabajos de Estudiantes",
      href: "/dashboard/teacher/student-work",
      icon: BookOpen,
    },
  ],
  student: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Mis Citas",
      href: "/dashboard/appointments",
      icon: Calendar,
    },
    {
      title: "Mis Pacientes",
      href: "/dashboard/patients",
      icon: Users,
    },
    {
      title: "Casos Clínicos",
      href: "/dashboard/clinical-cases",
      icon: Stethoscope,
    },
    {
      title: "Historias Clínicas",
      href: "/dashboard/clinical-history",
      icon: FileText,
    },
    {
      title: "Odontograma",
      href: "/dashboard/odontogram",
      icon: Tooth,
    },
    {
      title: "Tareas Académicas",
      href: "/dashboard/assignments",
      icon: BookOpen,
    },
    {
      title: "Mi Horario",
      href: "/dashboard/schedule",
      icon: Clock,
    },
    {
      title: "Solicitudes de Aprobación",
      href: "/dashboard/approvals",
      icon: UserCheck,
    },
    {
      title: "Especialidad",
      href: "/dashboard/specialty",
      icon: GraduationCap,
    },
    {
      title: "Académico",
      href: "/dashboard/academic",
      icon: BookOpen,
    },
  ],
  secretary: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Gestión de Citas",
      href: "/dashboard/secretary/appointments",
      icon: Calendar,
      children: [
        {
          title: "Ver Citas",
          href: "/dashboard/secretary/appointments",
          icon: Eye,
        },
        {
          title: "Nueva Cita",
          href: "/dashboard/secretary/appointments/create",
          icon: Plus,
        },
      ],
    },
    {
      title: "Registro de Pacientes",
      href: "/dashboard/secretary/patient-registration",
      icon: UserPlus,
    },
    {
      title: "Historias Clínicas",
      href: "/dashboard/secretary/clinical-history",
      icon: FileText,
    },
    {
      title: "Casos Clínicos",
      href: "/dashboard/secretary/clinical-cases",
      icon: Stethoscope,
    },
    {
      title: "Horarios de Estudiantes",
      href: "/dashboard/secretary/student-schedules",
      icon: Clock,
    },
    {
      title: "Agenda Diaria",
      href: "/dashboard/secretary/daily-agenda",
      icon: CalendarIcon,
    },
    {
      title: "Comunicaciones",
      href: "/dashboard/secretary/communications",
      icon: MessageSquare,
    },
    {
      title: "Reportes",
      href: "/dashboard/secretary/reports",
      icon: BarChart3,
    },
  ],
  patient: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Agendar Cita",
      href: "/dashboard/book-appointment",
      icon: CalendarPlus,
    },
    {
      title: "Mis Citas",
      href: "/dashboard/my-appointments",
      icon: Calendar,
    },
    {
      title: "Mi Historia Clínica",
      href: "/dashboard/my-records",
      icon: FileText,
    },
    {
      title: "Mi Perfil",
      href: "/dashboard/my-profile",
      icon: User,
    },
  ],
}

export function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  if (!user) return null

  const userSidebarItems = sidebarItems[user.role] || []

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isActive = pathname === item.href
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.title}>
        <div className="relative">
          {hasChildren ? (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                level > 0 && "pl-8",
                isActive && "bg-accent text-accent-foreground",
              )}
              onClick={() => toggleExpanded(item.title)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
              {hasChildren && (
                <div className="ml-auto">
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
              )}
            </Button>
          ) : (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                level > 0 && "pl-8",
                isActive && "bg-accent text-accent-foreground",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4 border-l border-border pl-2">
            {item.children?.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Clínica Dental ULEAM</h2>
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {userSidebarItems.map((item) => renderSidebarItem(item))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
