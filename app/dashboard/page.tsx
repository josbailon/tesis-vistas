"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  FileText,
  Activity,
  Clock,
  CheckCircle,
  TrendingUp,
  Stethoscope,
  GraduationCap,
  UserCheck,
  Settings,
  Bell,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock data for dashboard
const mockData = {
  appointments: {
    today: 8,
    pending: 3,
    completed: 12,
    cancelled: 1,
  },
  patients: {
    total: 45,
    active: 38,
    new: 7,
  },
  students: {
    total: 25,
    active: 22,
    evaluations: 5,
  },
  cases: {
    active: 15,
    completed: 28,
    pending: 6,
  },
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <LoadingSpinner message="Cargando dashboard..." />
  }

  const getDashboardContent = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />
      case "student":
        return <StudentDashboard />
      case "professor":
        return <ProfessorDashboard />
      case "secretary":
        return <SecretaryDashboard />
      case "patient":
        return <PatientDashboard />
      default:
        return <DefaultDashboard />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido, {user?.name || "Usuario"}!</h1>
            <p className="text-blue-100 mb-4">
              {currentTime.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <Badge className="bg-white/20 text-white">
              {user?.role === "admin"
                ? "Administrador"
                : user?.role === "student"
                  ? "Estudiante"
                  : user?.role === "professor"
                    ? "Profesor"
                    : user?.role === "secretary"
                      ? "Secretaria"
                      : "Paciente"}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currentTime.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-blue-200 text-sm">Hora actual</div>
          </div>
        </div>
      </div>

      {/* Role-specific Dashboard Content */}
      {getDashboardContent()}
    </div>
  )
}

// Admin Dashboard
function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.appointments.today}</div>
            <p className="text-xs text-muted-foreground">{mockData.appointments.pending} pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.cases.active}</div>
            <p className="text-xs text-muted-foreground">{mockData.cases.pending} pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sistema</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Activo</div>
            <p className="text-xs text-muted-foreground">99.9% uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Gestiona las funciones principales del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/admin/users">
              <Button className="w-full h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Gestionar Usuarios</span>
              </Button>
            </Link>
            <Link href="/dashboard/admin/treatments">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Stethoscope className="h-6 w-6" />
                <span>Tratamientos</span>
              </Button>
            </Link>
            <Link href="/dashboard/admin/schedules">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Calendar className="h-6 w-6" />
                <span>Horarios</span>
              </Button>
            </Link>
            <Link href="/dashboard/admin/analytics">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <TrendingUp className="h-6 w-6" />
                <span>Analíticas</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Student Dashboard
function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Progreso Académico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completado</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Mis Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 casos activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Hoy 14:00</div>
            <p className="text-xs text-muted-foreground">Ana García - Endodoncia</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/student/patients">
              <Button className="w-full h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Mis Pacientes</span>
              </Button>
            </Link>
            <Link href="/dashboard/student/clinical-cases">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <FileText className="h-6 w-6" />
                <span>Casos Clínicos</span>
              </Button>
            </Link>
            <Link href="/dashboard/student/appointments">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Calendar className="h-6 w-6" />
                <span>Programar Cita</span>
              </Button>
            </Link>
            <Link href="/dashboard/student/odontograms">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Stethoscope className="h-6 w-6" />
                <span>Odontogramas</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Professor Dashboard
function ProfessorDashboard() {
  return (
    <div className="space-y-6">
      {/* Teaching Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Estudiantes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.students.total}</div>
            <p className="text-xs text-muted-foreground">{mockData.students.active} activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evaluaciones</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.students.evaluations}</div>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobaciones</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clases Hoy</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Próxima: 10:00</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/teacher/students">
              <Button className="w-full h-20 flex flex-col gap-2">
                <GraduationCap className="h-6 w-6" />
                <span>Mis Estudiantes</span>
              </Button>
            </Link>
            <Link href="/dashboard/teacher/evaluations">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <UserCheck className="h-6 w-6" />
                <span>Evaluaciones</span>
              </Button>
            </Link>
            <Link href="/dashboard/teacher/approvals">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <CheckCircle className="h-6 w-6" />
                <span>Aprobaciones</span>
              </Button>
            </Link>
            <Link href="/dashboard/teacher/assignments">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Plus className="h-6 w-6" />
                <span>Crear Actividad</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Secretary Dashboard
function SecretaryDashboard() {
  return (
    <div className="space-y-6">
      {/* Appointment Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.appointments.today}</div>
            <p className="text-xs text-muted-foreground">{mockData.appointments.pending} pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.patients.total}</div>
            <p className="text-xs text-muted-foreground">{mockData.patients.new} nuevos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmaciones</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recordatorios</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Para enviar</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/secretary">
              <Button className="w-full h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Gestionar Citas</span>
              </Button>
            </Link>
            <Link href="/dashboard/patients">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Users className="h-6 w-6" />
                <span>Pacientes</span>
              </Button>
            </Link>
            <Link href="/dashboard/secretary/schedules">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Clock className="h-6 w-6" />
                <span>Horarios</span>
              </Button>
            </Link>
            <Link href="/dashboard/notifications">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Bell className="h-6 w-6" />
                <span>Notificaciones</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Patient Dashboard
function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Patient Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">25 Mayo, 14:00</div>
            <p className="text-xs text-muted-foreground">Dr. Martínez - Endodoncia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tratamiento Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Tratamiento de Conducto</div>
            <div className="mt-2">
              <Progress value={60} />
              <p className="text-xs text-muted-foreground mt-1">60% completado</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-800">Activo</Badge>
            <p className="text-xs text-muted-foreground mt-2">Última visita: 18 Mayo</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/book-appointment">
              <Button className="w-full h-20 flex flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>Agendar Cita</span>
              </Button>
            </Link>
            <Link href="/dashboard/my-appointments">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Calendar className="h-6 w-6" />
                <span>Mis Citas</span>
              </Button>
            </Link>
            <Link href="/dashboard/my-records">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <FileText className="h-6 w-6" />
                <span>Mi Historial</span>
              </Button>
            </Link>
            <Link href="/dashboard/patient/odontogram">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Stethoscope className="h-6 w-6" />
                <span>Odontograma</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Default Dashboard
function DefaultDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido al Sistema</CardTitle>
          <CardDescription>Selecciona una opción del menú lateral para comenzar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/dashboard/settings">
              <Button className="w-full h-20 flex flex-col gap-2">
                <Settings className="h-6 w-6" />
                <span>Configuración</span>
              </Button>
            </Link>
            <Link href="/dashboard/notifications">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Bell className="h-6 w-6" />
                <span>Notificaciones</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
