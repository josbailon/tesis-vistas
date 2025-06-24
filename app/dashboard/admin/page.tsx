"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, GraduationCap, UserCheck, Activity, Database, Shield, Settings, BarChart3 } from "lucide-react"

export default function AdminDashboard() {
  const [systemStats, setSystemStats] = useState({
    totalUsers: 245,
    activeUsers: 198,
    totalStudents: 85,
    totalTeachers: 12,
    totalPatients: 148,
    pendingApprovals: 23,
    systemUptime: "99.8%",
    storageUsed: 68,
    activeConnections: 42,
    securityAlerts: 3,
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "user_created",
      message: "Nuevo estudiante registrado: María González",
      time: "hace 5 min",
      severity: "info",
    },
    {
      id: 2,
      type: "security",
      message: "Intento de acceso fallido detectado",
      time: "hace 12 min",
      severity: "warning",
    },
    {
      id: 3,
      type: "backup",
      message: "Respaldo automático completado exitosamente",
      time: "hace 1 hora",
      severity: "success",
    },
    {
      id: 4,
      type: "system",
      message: "Actualización del sistema programada para mañana",
      time: "hace 2 horas",
      severity: "info",
    },
    {
      id: 5,
      type: "approval",
      message: "15 nuevas solicitudes de aprobación pendientes",
      time: "hace 3 horas",
      severity: "warning",
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "error":
        return "text-red-600 bg-red-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestión integral del sistema de la clínica dental universitaria</p>
      </div>

      {/* System Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {systemStats.activeUsers} activos ({Math.round((systemStats.activeUsers / systemStats.totalUsers) * 100)}
              %)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Profesores: {systemStats.totalTeachers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Aprobaciones pendientes: {systemStats.pendingApprovals}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado del Sistema</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}</div>
            <p className="text-xs text-muted-foreground">Uptime del sistema</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* System Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Recursos del Sistema</CardTitle>
            <CardDescription>Monitoreo en tiempo real de recursos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Almacenamiento</span>
                <span>{systemStats.storageUsed}%</span>
              </div>
              <Progress value={systemStats.storageUsed} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conexiones Activas</span>
                <span>{systemStats.activeConnections}/100</span>
              </div>
              <Progress value={(systemStats.activeConnections / 100) * 100} className="h-2" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Base de Datos</span>
              </div>
              <Badge variant="outline" className="text-green-600">
                Operacional
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Seguridad</span>
              </div>
              <Badge variant="outline" className="text-yellow-600">
                {systemStats.securityAlerts} Alertas
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Eventos y notificaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(activity.severity)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todos los Eventos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Tareas administrativas frecuentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Gestionar Usuarios</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="h-6 w-6" />
              <span>Respaldo Manual</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>Generar Reportes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span>Configuración</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
