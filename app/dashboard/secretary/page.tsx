"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  UserPlus,
  CalendarPlus,
} from "lucide-react"

export default function SecretaryDashboard() {
  const [todayStats] = useState({
    totalAppointments: 24,
    confirmedAppointments: 18,
    pendingAppointments: 4,
    cancelledAppointments: 2,
    newPatients: 3,
    callsMade: 15,
    emailsSent: 8,
    documentsProcessed: 12,
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: "appointment",
      message: "Cita confirmada para Ana García - 10:00 AM",
      time: "hace 5 min",
      priority: "normal",
    },
    {
      id: 2,
      type: "patient",
      message: "Nuevo paciente registrado: Roberto Silva",
      time: "hace 15 min",
      priority: "normal",
    },
    {
      id: 3,
      type: "call",
      message: "Llamada realizada a María López - Recordatorio de cita",
      time: "hace 30 min",
      priority: "normal",
    },
    {
      id: 4,
      type: "urgent",
      message: "Cita de emergencia solicitada - Carlos Mendoza",
      time: "hace 45 min",
      priority: "high",
    },
    {
      id: 5,
      type: "document",
      message: "Documento procesado: Historia clínica de Juan Pérez",
      time: "hace 1 hora",
      priority: "normal",
    },
  ])

  const [upcomingTasks] = useState([
    {
      id: 1,
      task: "Confirmar citas de mañana",
      dueTime: "17:00",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      task: "Enviar recordatorios por email",
      dueTime: "16:30",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      task: "Actualizar archivo de pacientes",
      dueTime: "18:00",
      priority: "low",
      completed: false,
    },
    {
      id: 4,
      task: "Preparar reporte semanal",
      dueTime: "19:00",
      priority: "medium",
      completed: false,
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "patient":
        return <UserPlus className="h-4 w-4 text-green-600" />
      case "call":
        return <Phone className="h-4 w-4 text-purple-600" />
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "document":
        return <FileText className="h-4 w-4 text-orange-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Secretaría</h1>
          <p className="text-muted-foreground">Panel de control para gestión administrativa</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Nueva Cita
          </Button>
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Paciente
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas de Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              {todayStats.confirmedAppointments} confirmadas, {todayStats.pendingAppointments} pendientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.newPatients}</div>
            <p className="text-xs text-muted-foreground">Registrados hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comunicaciones</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.callsMade + todayStats.emailsSent}</div>
            <p className="text-xs text-muted-foreground">
              {todayStats.callsMade} llamadas, {todayStats.emailsSent} emails
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.documentsProcessed}</div>
            <p className="text-xs text-muted-foreground">Procesados hoy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.priority === "high" && (
                    <Badge variant="destructive" className="text-xs">
                      Urgente
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Tareas Pendientes</CardTitle>
            <CardDescription>Actividades programadas para hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-muted-foreground">Vence a las {task.dueTime}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {task.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso del Día</CardTitle>
          <CardDescription>Resumen de actividades completadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Citas Confirmadas</span>
                <span>{Math.round((todayStats.confirmedAppointments / todayStats.totalAppointments) * 100)}%</span>
              </div>
              <Progress value={(todayStats.confirmedAppointments / todayStats.totalAppointments) * 100} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Llamadas Realizadas</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Emails Enviados</span>
                <span>60%</span>
              </div>
              <Progress value={60} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Documentos Procesados</span>
                <span>90%</span>
              </div>
              <Progress value={90} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Tareas frecuentes de secretaría</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Agendar Cita</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Phone className="h-6 w-6" />
              <span>Hacer Llamada</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Mail className="h-6 w-6" />
              <span>Enviar Email</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span>Procesar Documento</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
