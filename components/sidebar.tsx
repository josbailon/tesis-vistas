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
  Stethoscope,
  UserCheck,
  ClipboardList,
  BookOpen,
  Activity,
  Shield,
  UserCog,
  CalendarCheck,
  FileCheck,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { UleamBranding } from "@/components/uleam-branding"

interface NavigationItem {
  title: string
  href: string
  icon: any
  description?: string
}

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const getNavigationItems = (role: string | undefined): NavigationItem[] => {
    const baseItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Panel principal",
      },
      {
        title: "Notificaciones",
        href: "/dashboard/notifications",
        icon: Bell,
        description: "Ver notificaciones",
      },
      {
        title: "Test Interacciones",
        href: "/dashboard/test-interactions",
        icon: Activity,
        description: "Probar elementos interactivos",
      },
    ]

    switch (role) {
      case "admin":
        return [
          ...baseItems,
          {
            title: "Gestión de Usuarios",
            href: "/dashboard/admin/users",
            icon: UserCog,
            description: "CRUD de usuarios",
          },
          {
            title: "Tratamientos",
            href: "/dashboard/admin/treatments",
            icon: Stethoscope,
            description: "Catálogo de tratamientos",
          },
          {
            title: "Horarios",
            href: "/dashboard/admin/schedules",
            icon: Calendar,
            description: "Gestión de horarios",
          },
          {
            title: "Analíticas",
            href: "/dashboard/admin/analytics",
            icon: Activity,
            description: "Estadísticas del sistema",
          },
          {
            title: "Seguridad",
            href: "/dashboard/admin/security",
            icon: Shield,
            description: "Configuración de seguridad",
          },
          {
            title: "Configuración",
            href: "/dashboard/admin/system-config",
            icon: Settings,
            description: "Configuración del sistema",
          },
        ]

      case "student":
        return [
          ...baseItems,
          {
            title: "Panel Principal",
            href: "/dashboard/student",
            icon: LayoutDashboard,
            description: "Dashboard de estudiante",
          },
          {
            title: "Mi Especialización",
            href: "/dashboard/student/specialization",
            icon: Stethoscope,
            description: "Seleccionar especialización",
          },
          {
            title: "Mis Pacientes",
            href: "/dashboard/student/patients",
            icon: Users,
            description: "Gestionar pacientes",
          },
          {
            title: "Odontogramas",
            href: "/dashboard/student/odontograms",
            icon: Stethoscope,
            description: "Crear odontogramas",
          },
          {
            title: "Historias Clínicas",
            href: "/dashboard/student/clinical-histories",
            icon: FileText,
            description: "Gestionar historias",
          },
          {
            title: "Casos Clínicos",
            href: "/dashboard/student/clinical-cases",
            icon: Stethoscope,
            description: "Administrar casos",
          },
          {
            title: "Programar Citas",
            href: "/dashboard/student/appointments",
            icon: CalendarCheck,
            description: "Agendar citas para pacientes",
          },
          {
            title: "Mis Tareas",
            href: "/dashboard/student/assignments",
            icon: ClipboardList,
            description: "Tareas asignadas",
          },
          {
            title: "Subir Trabajos",
            href: "/dashboard/student/uploads",
            icon: FileCheck,
            description: "Subir asignaciones",
          },
        ]

      case "professor":
        return [
          ...baseItems,
          {
            title: "Mis Estudiantes",
            href: "/dashboard/teacher/students",
            icon: GraduationCap,
            description: "Gestionar estudiantes",
          },
          {
            title: "Evaluaciones",
            href: "/dashboard/teacher/evaluations",
            icon: ClipboardList,
            description: "Evaluar estudiantes",
          },
          {
            title: "Crear Actividades",
            href: "/dashboard/teacher/assignments",
            icon: BookOpen,
            description: "Subir actividades",
          },
          {
            title: "Aprobaciones",
            href: "/dashboard/teacher/approvals",
            icon: UserCheck,
            description: "Revisar trabajos",
          },
          {
            title: "Progreso",
            href: "/dashboard/teacher/progress",
            icon: Activity,
            description: "Seguimiento académico",
          },
        ]

      case "secretary":
        return [
          ...baseItems,
          {
            title: "Gestión de Citas",
            href: "/dashboard/secretary",
            icon: Calendar,
            description: "Programar citas",
          },
          {
            title: "Horarios Estudiantes",
            href: "/dashboard/secretary/schedules",
            icon: ClipboardList,
            description: "Ver horarios",
          },
          {
            title: "Pacientes",
            href: "/dashboard/patients",
            icon: Users,
            description: "Gestionar pacientes",
          },
        ]

      case "patient":
        return [
          ...baseItems,
          {
            title: "Mis Citas",
            href: "/dashboard/my-appointments",
            icon: Calendar,
            description: "Ver mis citas",
          },
          {
            title: "Agendar Cita",
            href: "/dashboard/book-appointment",
            icon: CalendarCheck,
            description: "Solicitar nueva cita",
          },
          {
            title: "Mi Historial",
            href: "/dashboard/my-records",
            icon: FileText,
            description: "Historial médico",
          },
          {
            title: "Odontograma",
            href: "/dashboard/patient/odontogram",
            icon: Stethoscope,
            description: "Ver odontograma",
          },
        ]

      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems(user?.role)

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-gradient-to-b from-blue-50 to-white border-r border-blue-100">
      <div className="flex h-16 items-center border-b border-blue-100 px-6 bg-white/80 backdrop-blur-sm">
        <UleamBranding />
      </div>
      <ScrollArea className="flex-1 px-4 py-6 custom-scrollbar">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-800",
                )}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.title}</div>
                  {item.description && <div className="text-xs opacity-75 truncate">{item.description}</div>}
                </div>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="border-t border-blue-100 p-4 bg-white/80 backdrop-blur-sm">
        <div className="text-xs text-gray-500 text-center">Clínica Dental ULEAM</div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Menu className="h-5 w-5 text-blue-600" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-80">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 flex-shrink-0">
        <SidebarContent />
      </div>
    </>
  )
}
