"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Phone, FileText, UserPlus } from "lucide-react"
import Link from "next/link"

export default function SecretaryDashboard() {
  const quickActions = [
    {
      title: "Nueva Cita",
      description: "Agendar una nueva cita para un paciente",
      href: "/dashboard/secretary/appointments/create",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Registrar Paciente",
      description: "Agregar un nuevo paciente al sistema",
      href: "/dashboard/secretary/patient-registration",
      icon: UserPlus,
      color: "bg-green-500",
    },
    {
      title: "Agenda del Día",
      description: "Ver todas las citas programadas para hoy",
      href: "/dashboard/secretary/daily-agenda",
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      title: "Comunicaciones",
      description: "Gestionar llamadas y mensajes",
      href: "/dashboard/secretary/communications",
      icon: Phone,
      color: "bg-purple-500",
    },
  ]

  const stats = [
    {
      title: "Citas Hoy",
      value: "12",
      description: "3 pendientes",
      icon: Calendar,
    },
    {
      title: "Pacientes Activos",
      value: "156",
      description: "+5 esta semana",
      icon: Users,
    },
    {
      title: "Llamadas Pendientes",
      value: "8",
      description: "2 urgentes",
      icon: Phone,
    },
    {
      title: "Reportes",
      value: "4",
      description: "Listos para enviar",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Secretaría</h1>
        <p className="text-gray-600">Gestiona citas, pacientes y comunicaciones</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={action.href}>Ir a {action.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Cita agendada para María González</p>
                <p className="text-xs text-gray-500">Hace 15 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nuevo paciente registrado: Carlos Pérez</p>
                <p className="text-xs text-gray-500">Hace 30 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Llamada pendiente de confirmación</p>
                <p className="text-xs text-gray-500">Hace 1 hora</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
