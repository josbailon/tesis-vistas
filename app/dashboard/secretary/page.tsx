"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, Phone, UserPlus, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function SecretaryDashboard() {
  const [stats] = useState({
    todayAppointments: 12,
    pendingApprovals: 5,
    totalPatients: 248,
    weeklyAppointments: 67,
  })

  const [todayAppointments] = useState([
    {
      id: "1",
      time: "09:00",
      patient: "María González",
      student: "Juan Pérez",
      specialty: "Endodoncia",
      status: "confirmada",
    },
    {
      id: "2",
      time: "10:30",
      patient: "Carlos Ruiz",
      student: "Ana López",
      specialty: "Ortodoncia",
      status: "pendiente",
    },
    {
      id: "3",
      time: "14:00",
      patient: "Laura Martínez",
      student: "Pedro Silva",
      specialty: "Cirugía Oral",
      status: "confirmada",
    },
    {
      id: "4",
      time: "15:30",
      patient: "Roberto Díaz",
      student: "Carmen Torres",
      specialty: "Periodoncia",
      status: "cancelada",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmada
          </Badge>
        )
      case "pendiente":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "cancelada":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Secretaría</h1>
        <p className="text-gray-600 mt-2">Gestiona citas, pacientes y comunicaciones</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">+12 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobaciones Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Semanales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyAppointments}</div>
            <p className="text-xs text-muted-foreground">+15% vs semana anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Tareas frecuentes de secretaría</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/secretary/appointments/create">
              <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Calendar className="h-6 w-6" />
                <span>Nueva Cita</span>
              </Button>
            </Link>

            <Link href="/dashboard/secretary/patient-registration">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <UserPlus className="h-6 w-6" />
                <span>Registrar Paciente</span>
              </Button>
            </Link>

            <Link href="/dashboard/secretary/daily-agenda">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Clock className="h-6 w-6" />
                <span>Agenda Diaria</span>
              </Button>
            </Link>

            <Link href="/dashboard/secretary/communications">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Phone className="h-6 w-6" />
                <span>Comunicaciones</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Citas de Hoy</CardTitle>
          <CardDescription>Agenda del día actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-blue-600">{appointment.time}</div>
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">
                      Estudiante: {appointment.student} • {appointment.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(appointment.status)}
                  <Button variant="ghost" size="sm">
                    Ver detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <Link href="/dashboard/secretary/appointments">
              <Button variant="outline" className="w-full bg-transparent">
                Ver todas las citas
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm">
                <span className="font-medium">María González</span> confirmó su cita para mañana
              </p>
              <span className="text-xs text-gray-500 ml-auto">Hace 5 min</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm">
                Nuevo paciente <span className="font-medium">Carlos Ruiz</span> registrado
              </p>
              <span className="text-xs text-gray-500 ml-auto">Hace 15 min</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm">
                Cita de <span className="font-medium">Laura Martínez</span> reprogramada
              </p>
              <span className="text-xs text-gray-500 ml-auto">Hace 30 min</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-sm">
                <span className="font-medium">Roberto Díaz</span> canceló su cita
              </p>
              <span className="text-xs text-gray-500 ml-auto">Hace 1 hora</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
