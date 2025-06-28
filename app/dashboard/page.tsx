"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Calendar,
  Users,
  FileText,
  Settings,
  BarChart3,
  Clock,
  CheckSquare,
  UserPlus,
  Stethoscope,
  GraduationCap,
  Shield,
  Activity,
  MessageSquare,
  ClipboardList,
  User,
  Phone,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Star,
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "from-red-500 to-red-600",
      professor: "from-purple-500 to-purple-600",
      student: "from-blue-500 to-blue-600",
      patient: "from-green-500 to-green-600",
      secretary: "from-orange-500 to-orange-600",
    }
    return colors[role as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  const getRoleIcon = (role: string) => {
    const icons = {
      admin: Shield,
      professor: Stethoscope,
      student: GraduationCap,
      patient: User,
      secretary: Phone,
    }
    const IconComponent = icons[role as keyof typeof icons] || User
    return <IconComponent className="h-6 w-6 lg:h-8 lg:w-8" />
  }

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: "Administrador",
      professor: "Profesor",
      student: "Estudiante",
      patient: "Paciente",
      secretary: "Secretario",
    }
    return labels[role as keyof typeof labels] || role
  }

  const getQuickActions = () => {
    switch (user.role) {
      case "admin":
        return [
          {
            title: "Gestión de Usuarios",
            description: "Administrar usuarios del sistema",
            href: "/dashboard/admin/users",
            icon: Users,
            color: "bg-blue-600 hover:bg-blue-700",
            badge: "8 usuarios",
          },
          {
            title: "Analíticas",
            description: "Ver reportes y estadísticas",
            href: "/dashboard/admin/analytics",
            icon: BarChart3,
            color: "bg-green-600 hover:bg-green-700",
            badge: "Nuevo",
          },
          {
            title: "Configuración",
            description: "Configurar el sistema",
            href: "/dashboard/admin/system-config",
            icon: Settings,
            color: "bg-purple-600 hover:bg-purple-700",
          },
          {
            title: "Seguridad",
            description: "Gestionar permisos y accesos",
            href: "/dashboard/admin/security",
            icon: Shield,
            color: "bg-red-600 hover:bg-red-700",
          },
        ]

      case "professor":
        return [
          {
            title: "Mis Estudiantes",
            description: "Gestionar estudiantes asignados",
            href: "/dashboard/teacher/students",
            icon: GraduationCap,
            color: "bg-blue-600 hover:bg-blue-700",
            badge: "12 estudiantes",
          },
          {
            title: "Aprobaciones Pendientes",
            description: "Revisar trabajos y casos clínicos",
            href: "/dashboard/teacher/approvals",
            icon: CheckSquare,
            color: "bg-orange-600 hover:bg-orange-700",
            badge: "3 pendientes",
          },
          {
            title: "Casos Clínicos",
            description: "Supervisar casos en progreso",
            href: "/dashboard/teacher/clinical-cases",
            icon: FileText,
            color: "bg-green-600 hover:bg-green-700",
            badge: "8 activos",
          },
          {
            title: "Mi Especialidad",
            description: `Gestión de ${user.specialty || "especialidad"}`,
            href: `/dashboard/professor/${user.specialty?.toLowerCase() || "general"}`,
            icon: Stethoscope,
            color: "bg-purple-600 hover:bg-purple-700",
          },
        ]

      case "student":
        return [
          {
            title: "Mis Pacientes",
            description: "Ver pacientes asignados",
            href: "/dashboard/patients",
            icon: Users,
            color: "bg-blue-600 hover:bg-blue-700",
            badge: "5 pacientes",
          },
          {
            title: "Próximas Citas",
            description: "Gestionar citas programadas",
            href: "/dashboard/my-appointments",
            icon: Calendar,
            color: "bg-green-600 hover:bg-green-700",
            badge: "2 hoy",
          },
          {
            title: "Casos Clínicos",
            description: "Trabajar en casos asignados",
            href: "/dashboard/students/clinical-cases",
            icon: FileText,
            color: "bg-purple-600 hover:bg-purple-700",
            badge: "3 activos",
          },
          {
            title: "Odontograma",
            description: "Herramienta de diagnóstico",
            href: "/dashboard/students/odontogram",
            icon: Activity,
            color: "bg-orange-600 hover:bg-orange-700",
          },
        ]

      case "secretary":
        return [
          {
            title: "Gestión de Citas",
            description: "Programar y gestionar citas",
            href: "/dashboard/secretary/appointments",
            icon: Calendar,
            color: "bg-blue-600 hover:bg-blue-700",
            badge: "15 hoy",
          },
          {
            title: "Registro de Pacientes",
            description: "Registrar nuevos pacientes",
            href: "/dashboard/secretary/patient-registration",
            icon: UserPlus,
            color: "bg-green-600 hover:bg-green-700",
          },
          {
            title: "Agenda Diaria",
            description: "Ver agenda del día",
            href: "/dashboard/secretary/daily-agenda",
            icon: ClipboardList,
            color: "bg-purple-600 hover:bg-purple-700",
          },
          {
            title: "Comunicaciones",
            description: "Mensajes y notificaciones",
            href: "/dashboard/secretary/communications",
            icon: MessageSquare,
            color: "bg-orange-600 hover:bg-orange-700",
            badge: "2 nuevos",
          },
        ]

      case "patient":
        return [
          {
            title: "Mis Citas",
            description: "Ver citas programadas",
            href: "/dashboard/my-appointments",
            icon: Calendar,
            color: "bg-blue-600 hover:bg-blue-700",
            badge: "1 próxima",
          },
          {
            title: "Agendar Cita",
            description: "Solicitar nueva cita",
            href: "/dashboard/book-appointment",
            icon: UserPlus,
            color: "bg-green-600 hover:bg-green-700",
          },
          {
            title: "Mis Registros",
            description: "Historial médico",
            href: "/dashboard/my-records",
            icon: FileText,
            color: "bg-purple-600 hover:bg-purple-700",
          },
          {
            title: "Mi Perfil",
            description: "Actualizar información personal",
            href: "/dashboard/my-profile",
            icon: User,
            color: "bg-orange-600 hover:bg-orange-700",
          },
        ]

      default:
        return []
    }
  }

  const getRecentActivity = () => {
    switch (user.role) {
      case "admin":
        return [
          { action: "Nuevo usuario registrado", time: "Hace 2 horas", type: "user" },
          { action: "Backup del sistema completado", time: "Hace 4 horas", type: "system" },
          { action: "Actualización de seguridad aplicada", time: "Ayer", type: "security" },
        ]
      case "professor":
        return [
          { action: "Caso clínico aprobado - Juan Pérez", time: "Hace 1 hora", type: "approval" },
          { action: "Nueva asignación de estudiante", time: "Hace 3 horas", type: "assignment" },
          { action: "Revisión de progreso completada", time: "Ayer", type: "review" },
        ]
      case "student":
        return [
          { action: "Nuevo paciente asignado", time: "Hace 30 min", type: "patient" },
          { action: "Caso clínico actualizado", time: "Hace 2 horas", type: "case" },
          { action: "Cita completada exitosamente", time: "Ayer", type: "appointment" },
        ]
      case "secretary":
        return [
          { action: "15 citas programadas para hoy", time: "Hace 1 hora", type: "appointment" },
          { action: "Nuevo paciente registrado", time: "Hace 2 horas", type: "patient" },
          { action: "Recordatorios enviados", time: "Hace 3 horas", type: "notification" },
        ]
      case "patient":
        return [
          { action: "Cita confirmada para mañana", time: "Hace 1 hora", type: "appointment" },
          { action: "Recordatorio de cita enviado", time: "Hace 4 horas", type: "reminder" },
          { action: "Historial médico actualizado", time: "Hace 2 días", type: "record" },
        ]
      default:
        return []
    }
  }

  const quickActions = getQuickActions()
  const recentActivity = getRecentActivity()

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${getRoleColor(user.role)} rounded-full flex items-center justify-center shadow-lg`}
            >
              {getRoleIcon(user.role)}
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">¡Bienvenido, {user.name}!</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <Badge className="bg-white/20 text-white border-white/30 w-fit">{getRoleLabel(user.role)}</Badge>
                {user.specialty && (
                  <Badge className="bg-white/20 text-white border-white/30 w-fit">{user.specialty}</Badge>
                )}
                {user.semester && (
                  <Badge className="bg-white/20 text-white border-white/30 w-fit">Semestre {user.semester}</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/90 text-sm lg:text-base">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-white/80 text-xs lg:text-sm">
              {new Date().toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 lg:w-14 lg:h-14 ${action.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                    {action.badge && <Badge className="bg-blue-100 text-blue-800 text-xs">{action.badge}</Badge>}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-xs lg:text-sm mb-3">{action.description}</p>
                  <div className="flex items-center text-blue-600 text-xs lg:text-sm font-medium">
                    Acceder
                    <ArrowRight className="ml-1 h-3 w-3 lg:h-4 lg:w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-2">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Estadísticas Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">12</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+15% vs ayer</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Casos Activos</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">8</p>
                  </div>
                  <FileText className="h-8 w-8 text-green-500" />
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-xs text-gray-600">3 prioritarios</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendientes</p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900">3</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-500" />
                </div>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-xs text-orange-600">Requieren atención</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Actividad Reciente</h2>
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 text-sm bg-transparent">
                Ver toda la actividad
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
