"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  GraduationCap,
  UserCheck,
  Clock,
  BookOpen,
  Stethoscope,
  FileText,
  Settings,
  BarChart3,
  Plus,
  Eye,
  Bell,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Phone,
  Mail,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "professor":
        return "Profesor"
      case "student":
        return "Estudiante"
      case "patient":
        return "Paciente"
      case "secretary":
        return "Secretaria"
      default:
        return "Usuario"
    }
  }

  // Admin Dashboard
  if (user.role === "admin") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-muted-foreground">Panel de Administración - Clínica Dental ULEAM</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              {getRoleTitle(user.role)}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString("es-ES")}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">En 8 especialidades</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 pendientes de confirmación</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profesores</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Todos activos</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Users className="h-5 w-5" />
                Gestión de Usuarios
              </CardTitle>
              <CardDescription className="text-blue-700">
                Administra estudiantes, profesores y pacientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/admin/students">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Estudiantes
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/admin/professors">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Profesores
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/admin/patients">
                    <Users className="mr-2 h-4 w-4" />
                    Pacientes
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/admin/users">
                    <Settings className="mr-2 h-4 w-4" />
                    Todos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <BarChart3 className="h-5 w-5" />
                Reportes y Analytics
              </CardTitle>
              <CardDescription className="text-green-700">Estadísticas y análisis del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/admin/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/statistics">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Estadísticas
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Settings className="h-5 w-5" />
                Configuración
              </CardTitle>
              <CardDescription className="text-purple-700">Configuración del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/admin/security">
                    <Settings className="mr-2 h-4 w-4" />
                    Seguridad
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/admin/system-config">
                    <Settings className="mr-2 h-4 w-4" />
                    Sistema
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Professor Dashboard
  if (user.role === "professor") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, Dr. {user.name}
            </h1>
            <p className="text-muted-foreground">Especialidad: {user.specialty} - Clínica Dental ULEAM</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              {getRoleTitle(user.role)}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString("es-ES")}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Estudiantes</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Asignados a mi especialidad</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Casos Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Requieren aprobación</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Supervisiones programadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Casos Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Este semestre</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <GraduationCap className="h-5 w-5" />
                Mis Estudiantes
              </CardTitle>
              <CardDescription className="text-blue-700">
                Gestiona y supervisa a tus estudiantes asignados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/students">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Todos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/progress">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Progreso
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/assignments">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Asignaciones
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/student-schedules">
                    <Calendar className="mr-2 h-4 w-4" />
                    Horarios
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <FileText className="h-5 w-5" />
                Casos Clínicos
              </CardTitle>
              <CardDescription className="text-green-700">
                Revisa y aprueba casos clínicos de estudiantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/approvals">
                    <Clock className="mr-2 h-4 w-4" />
                    Pendientes
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/clinical-cases">
                    <FileText className="mr-2 h-4 w-4" />
                    Todos los Casos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/clinical-history">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Historial
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/teacher/student-work">
                    <Award className="mr-2 h-4 w-4" />
                    Trabajos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Stethoscope className="h-5 w-5" />
                Mi Especialidad
              </CardTitle>
              <CardDescription className="text-purple-700">Gestión específica de {user.specialty}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/specialty">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Panel de {user.specialty}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/schedule">
                    <Calendar className="mr-2 h-4 w-4" />
                    Mi Horario
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Student Dashboard
  if (user.role === "student") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-muted-foreground">Estudiante de {user.specialty} - Clínica Dental ULEAM</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              {getRoleTitle(user.role)}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString("es-ES")}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Pacientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Asignados actualmente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Pendientes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Casos Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">Este semestre</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promedio</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5</div>
              <p className="text-xs text-muted-foreground">GPA actual</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Users className="h-5 w-5" />
                Mis Pacientes
              </CardTitle>
              <CardDescription className="text-blue-700">Gestiona y visualiza tus pacientes asignados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/patients">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Todos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/patients?filter=active">
                    <Users className="mr-2 h-4 w-4" />
                    Activos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/patients?action=new">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/medical-records">
                    <FileText className="mr-2 h-4 w-4" />
                    Historiales
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Calendar className="h-5 w-5" />
                Citas y Horarios
              </CardTitle>
              <CardDescription className="text-green-700">Programa y gestiona tus citas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/appointments">
                    <Calendar className="mr-2 h-4 w-4" />
                    Mis Citas
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/schedule">
                    <Clock className="mr-2 h-4 w-4" />
                    Horario
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/book-appointment">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Cita
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/appointments?status=pending">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Pendientes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <BookOpen className="h-5 w-5" />
                Casos Clínicos
              </CardTitle>
              <CardDescription className="text-purple-700">Gestiona tus casos y trabajos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/clinical-cases">
                    <FileText className="mr-2 h-4 w-4" />
                    Mis Casos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/clinical-history">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Historial
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/assignments">
                    <Award className="mr-2 h-4 w-4" />
                    Asignaciones
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/students/odontogram">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Odontograma
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Patient Dashboard
  if (user.role === "patient") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-muted-foreground">Portal del Paciente - Clínica Dental ULEAM</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              {getRoleTitle(user.role)}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString("es-ES")}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Mañana</div>
              <p className="text-xs text-muted-foreground">10:00 AM - Endodoncia</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tratamientos</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">En progreso</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Historial</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Consultas realizadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Activo</div>
              <p className="text-xs text-muted-foreground">Paciente registrado</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Calendar className="h-5 w-5" />
                Mis Citas
              </CardTitle>
              <CardDescription className="text-blue-700">Gestiona tus citas médicas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/my-appointments">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Citas
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/book-appointment">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Cita
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <FileText className="h-5 w-5" />
                Mi Historial
              </CardTitle>
              <CardDescription className="text-green-700">Accede a tu historial médico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/my-records">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Historial
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Settings className="h-5 w-5" />
                Mi Perfil
              </CardTitle>
              <CardDescription className="text-purple-700">Actualiza tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/my-profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Secretary Dashboard
  if (user.role === "secretary") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-muted-foreground">Secretaría - Clínica Dental ULEAM</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              {getRoleTitle(user.role)}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString("es-ES")}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 pendientes de confirmación</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuevos Pacientes</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Llamadas</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Hoy</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recordatorios</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Por enviar</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Calendar className="h-5 w-5" />
                Gestión de Citas
              </CardTitle>
              <CardDescription className="text-blue-700">Programa y administra citas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/secretary/appointments">
                    <Calendar className="mr-2 h-4 w-4" />
                    Ver Citas
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/secretary/appointments/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Cita
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/secretary/daily-agenda">
                    <Clock className="mr-2 h-4 w-4" />
                    Agenda Diaria
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/appointments">
                    <Eye className="mr-2 h-4 w-4" />
                    Todas
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Users className="h-5 w-5" />
                Registro de Pacientes
              </CardTitle>
              <CardDescription className="text-green-700">Registra y gestiona pacientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/secretary/patient-registration">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Paciente
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/secretary/patients">
                    <Users className="mr-2 h-4 w-4" />
                    Ver Pacientes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <FileText className="h-5 w-5" />
                Comunicaciones
              </CardTitle>
              <CardDescription className="text-purple-700">Reportes y comunicaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/secretary/communications">
                    <Mail className="mr-2 h-4 w-4" />
                    Mensajes
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/secretary/reports">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Reportes
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Bienvenido</h2>
        <p className="text-muted-foreground">Tu dashboard se está configurando...</p>
      </div>
    </div>
  )
}
