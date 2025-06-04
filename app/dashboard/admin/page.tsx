"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  GraduationCap,
  Calendar,
  Activity,
  TrendingUp,
  AlertTriangle,
  Shield,
  Settings,
  BarChart3,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const systemStats = {
  totalUsers: 156,
  activeStudents: 45,
  professors: 12,
  patients: 89,
  appointmentsToday: 23,
  systemUptime: 99.8,
  storageUsed: 67,
  activeConnections: 34,
}

const recentActivities = [
  {
    id: 1,
    type: "user_registration",
    message: "Nuevo estudiante registrado: María González",
    time: "Hace 5 minutos",
    severity: "info",
  },
  {
    id: 2,
    type: "appointment_created",
    message: "Nueva cita programada para mañana",
    time: "Hace 15 minutos",
    severity: "success",
  },
  {
    id: 3,
    type: "system_alert",
    message: "Uso de almacenamiento al 67%",
    time: "Hace 1 hora",
    severity: "warning",
  },
  {
    id: 4,
    type: "backup_completed",
    message: "Respaldo automático completado",
    time: "Hace 2 horas",
    severity: "success",
  },
]

export default function AdminPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <Users className="h-4 w-4" />
      case "appointment_created":
        return <Calendar className="h-4 w-4" />
      case "system_alert":
        return <AlertTriangle className="h-4 w-4" />
      case "backup_completed":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6 p-6">
        <div className="fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Panel de Administración
          </h1>
          <p className="text-blue-600 mt-2 text-lg">Monitoreo y gestión del sistema</p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-500 text-sm font-medium">Total Usuarios</p>
                  <p className="text-3xl font-bold text-blue-600">{systemStats.totalUsers}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% este mes</span>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-500 text-sm font-medium">Estudiantes Activos</p>
                  <p className="text-3xl font-bold text-green-600">{systemStats.activeStudents}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8% este mes</span>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-500 text-sm font-medium">Citas Hoy</p>
                  <p className="text-3xl font-bold text-purple-600">{systemStats.appointmentsToday}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Activity className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-600">Normal</span>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-500 text-sm font-medium">Uptime Sistema</p>
                  <p className="text-3xl font-bold text-green-600">{systemStats.systemUptime}%</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Shield className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">Excelente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos y métricas */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Uso de Recursos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-600">Almacenamiento</span>
                  <span className="text-blue-700">{systemStats.storageUsed}%</span>
                </div>
                <Progress value={systemStats.storageUsed} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-600">Conexiones Activas</span>
                  <span className="text-blue-700">{systemStats.activeConnections}/100</span>
                </div>
                <Progress value={(systemStats.activeConnections / 100) * 100} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-600">CPU</span>
                  <span className="text-blue-700">23%</span>
                </div>
                <Progress value={23} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-600">Memoria RAM</span>
                  <span className="text-blue-700">45%</span>
                </div>
                <Progress value={45} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Activity className="h-5 w-5 text-blue-500" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${getSeverityColor(activity.severity)}`}>
                      {getSeverityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-700 font-medium">{activity.message}</p>
                      <p className="text-blue-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-blue-700">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="btn-medical h-16 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Gestionar Usuarios
              </Button>
              <Button className="btn-medical-secondary h-16 flex-col">
                <Settings className="h-6 w-6 mb-2" />
                Configuración
              </Button>
              <Button className="btn-medical-accent h-16 flex-col">
                <Shield className="h-6 w-6 mb-2" />
                Seguridad
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
