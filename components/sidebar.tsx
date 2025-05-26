"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { UleamBranding } from "@/components/uleam-branding"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Stethoscope,
  GraduationCap,
  Shield,
  BarChart3,
  Clock,
  BookOpen,
  User,
  Activity,
  Database,
  CheckSquare,
  FileCheck,
  TrendingUp,
  CalendarIcon,
  Bell,
  HelpCircle,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
  description?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const getNavigationForRole = (role: string): NavSection[] => {
    switch (role) {
      case "patient":
        return [
          {
            title: "Mi Cuenta",
            items: [
              {
                title: "Mis Citas",
                href: "/dashboard/my-appointments",
                icon: Calendar,
                description: "Ver y gestionar citas",
              },
              {
                title: "Reservar Cita",
                href: "/dashboard/book-appointment",
                icon: CalendarIcon,
                description: "Agendar nueva cita",
              },
              { title: "Mi Perfil", href: "/dashboard/my-profile", icon: User, description: "Información personal" },
              {
                title: "Historial Médico",
                href: "/dashboard/my-records",
                icon: FileText,
                description: "Expediente clínico",
              },
            ],
          },
          {
            title: "Información",
            items: [
              {
                title: "Especialidades",
                href: "/dashboard/specialties",
                icon: Stethoscope,
                description: "Servicios disponibles",
              },
              { title: "Configuración", href: "/dashboard/settings", icon: Settings, description: "Preferencias" },
            ],
          },
        ]

      case "student":
        return [
          {
            title: "Pacientes",
            items: [
              {
                title: "Lista de Pacientes",
                href: "/dashboard/patients",
                icon: Users,
                description: "Gestionar pacientes",
              },
              { title: "Citas", href: "/dashboard/appointments", icon: Calendar, description: "Agenda de citas" },
              {
                title: "Casos Clínicos",
                href: "/dashboard/clinical-cases",
                icon: FileCheck,
                description: "Casos asignados",
              },
              {
                title: "Historial Clínico",
                href: "/dashboard/clinical-history",
                icon: FileText,
                description: "Expedientes",
              },
            ],
          },
          {
            title: "Académico",
            items: [
              {
                title: "Mis Tareas",
                href: "/dashboard/academic",
                icon: BookOpen,
                description: "Actividades académicas",
              },
              { title: "Horarios", href: "/dashboard/schedule", icon: Clock, description: "Programación" },
              {
                title: "Mi Progreso",
                href: "/dashboard/my-progress",
                icon: TrendingUp,
                description: "Avance académico",
              },
            ],
          },
          {
            title: "Herramientas",
            items: [
              { title: "Mi Perfil", href: "/dashboard/my-profile", icon: User, description: "Información personal" },
              { title: "Configuración", href: "/dashboard/settings", icon: Settings, description: "Preferencias" },
            ],
          },
        ]

      case "professor":
        return [
          {
            title: "Gestión Académica",
            items: [
              { title: "Dashboard", href: "/dashboard/teacher", icon: Home, description: "Panel principal" },
              {
                title: "Estudiantes",
                href: "/dashboard/teacher/students",
                icon: GraduationCap,
                description: "Gestionar estudiantes",
              },
              {
                title: "Aprobaciones",
                href: "/dashboard/teacher/approvals",
                icon: CheckSquare,
                description: "Revisar solicitudes",
              },
              {
                title: "Asignaciones",
                href: "/dashboard/teacher/assignments",
                icon: FileCheck,
                description: "Tareas y proyectos",
              },
            ],
          },
          {
            title: "Supervisión",
            items: [
              {
                title: "Progreso",
                href: "/dashboard/teacher/progress",
                icon: TrendingUp,
                description: "Seguimiento académico",
              },
              {
                title: "Especialidad",
                href: "/dashboard/specialty",
                icon: Stethoscope,
                description: "Mi especialidad",
              },
              {
                title: "Estadísticas",
                href: "/dashboard/statistics",
                icon: BarChart3,
                description: "Métricas y reportes",
              },
            ],
          },
          {
            title: "Herramientas",
            items: [
              { title: "Horarios", href: "/dashboard/schedule", icon: Clock, description: "Programación" },
              { title: "Mi Perfil", href: "/dashboard/my-profile", icon: User, description: "Información personal" },
              { title: "Configuración", href: "/dashboard/settings", icon: Settings, description: "Preferencias" },
            ],
          },
        ]

      case "admin":
        return [
          {
            title: "Administración",
            items: [
              { title: "Dashboard", href: "/dashboard/admin", icon: Home, description: "Panel principal" },
              { title: "Usuarios", href: "/dashboard/admin/users", icon: Users, description: "Gestión de usuarios" },
              {
                title: "Analíticas",
                href: "/dashboard/admin/analytics",
                icon: BarChart3,
                description: "Reportes y métricas",
              },
              {
                title: "Seguridad",
                href: "/dashboard/admin/security",
                icon: Shield,
                description: "Configuración de seguridad",
              },
            ],
          },
          {
            title: "Sistema",
            items: [
              {
                title: "Configuración",
                href: "/dashboard/admin/system-config",
                icon: Settings,
                description: "Configuración del sistema",
              },
              {
                title: "Base de Datos",
                href: "/dashboard/admin/database",
                icon: Database,
                description: "Gestión de datos",
              },
              {
                title: "Respaldos",
                href: "/dashboard/admin/backups",
                icon: FileText,
                description: "Copias de seguridad",
              },
            ],
          },
          {
            title: "Herramientas",
            items: [
              { title: "Logs", href: "/dashboard/admin/logs", icon: Activity, description: "Registros del sistema" },
              {
                title: "Notificaciones",
                href: "/dashboard/admin/notifications",
                icon: Bell,
                description: "Sistema de alertas",
              },
              { title: "Soporte", href: "/dashboard/admin/support", icon: HelpCircle, description: "Centro de ayuda" },
            ],
          },
        ]

      default:
        return [
          {
            title: "General",
            items: [
              { title: "Dashboard", href: "/dashboard", icon: Home, description: "Panel principal" },
              { title: "Mi Perfil", href: "/dashboard/my-profile", icon: User, description: "Información personal" },
              { title: "Configuración", href: "/dashboard/settings", icon: Settings, description: "Preferencias" },
            ],
          },
        ]
    }
  }

  const handleLogout = async () => {
    await logout()
    router.replace("/login")
  }

  const navigation = user ? getNavigationForRole(user.role) : []

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "patient":
        return "Paciente"
      case "student":
        return "Estudiante"
      case "professor":
        return "Profesor"
      case "admin":
        return "Administrador"
      default:
        return "Usuario"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "patient":
        return "bg-info-100 text-info-600 border-info-300"
      case "student":
        return "bg-success-100 text-success-600 border-success-300"
      case "professor":
        return "bg-specialty-endodoncia-light text-specialty-endodoncia border-specialty-endodoncia/30"
      case "admin":
        return "bg-error-100 text-error-600 border-error-300"
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-300"
    }
  }

  return (
    <div
      className={`${collapsed ? "w-16" : "w-72"} transition-all duration-300 bg-white border-r border-primary-200 flex flex-col h-full shadow-soft-lg`}
    >
      {/* Header */}
      <div className="p-4 border-b border-primary-200 bg-gradient-to-r from-primary-50 to-medical-light">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <UleamBranding variant="logo-only" />
              <div>
                <h2 className="text-lg font-bold text-primary-700">ULEAM</h2>
                <p className="text-xs text-primary-600">Clínica Dental</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary-600 hover:text-primary-700 hover:bg-primary-100 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-primary-200 bg-gradient-to-r from-neutral-50 to-primary-50/30">
          <div className={`${collapsed ? "text-center" : "flex items-center space-x-3"}`}>
            <div className="w-10 h-10 bg-medical-gradient rounded-full flex items-center justify-center text-white font-semibold shadow-soft">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-800 truncate">{user.name}</p>
                <p className="text-xs text-primary-600 truncate">{user.email}</p>
                <Badge className={`text-xs mt-1 border ${getRoleColor(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </Badge>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-6">
          {navigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="px-4">
              {!collapsed && (
                <h3 className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Button
                      key={itemIndex}
                      variant={isActive ? "default" : "ghost"}
                      className={`
                        w-full justify-start h-auto py-3 px-3 transition-all duration-200
                        ${
                          isActive
                            ? "bg-medical-gradient text-white shadow-soft hover:shadow-soft-lg"
                            : "text-primary-700 hover:text-primary-800 hover:bg-primary-50"
                        }
                        ${collapsed ? "px-2" : ""}
                      `}
                      onClick={() => router.push(item.href)}
                    >
                      <Icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"} flex-shrink-0`} />
                      {!collapsed && (
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.title}</div>
                          {item.description && <div className="text-xs opacity-75 mt-0.5">{item.description}</div>}
                        </div>
                      )}
                      {!collapsed && item.badge && (
                        <Badge variant="secondary" className="ml-auto bg-white/20 text-current border-white/30">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  )
                })}
              </div>
              {sectionIndex < navigation.length - 1 && !collapsed && <Separator className="mt-4 bg-primary-200" />}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-primary-200 bg-gradient-to-r from-neutral-50 to-error-50/30">
        <Button
          variant="ghost"
          className="w-full justify-start text-error-600 hover:text-error-700 hover:bg-error-50 transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </div>
  )
}
