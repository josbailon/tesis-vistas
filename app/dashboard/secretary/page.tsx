"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Phone, Clock, UserPlus, FileText } from "lucide-react"
import Link from "next/link"

export default function SecretaryDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Secretaría</h1>
        <p className="text-gray-600">Gestiona citas, pacientes y comunicaciones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Gestión de Citas
            </CardTitle>
            <CardDescription>Programa y administra las citas de los pacientes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/secretary/appointments">
              <Button className="w-full">Ver Citas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              Registro de Pacientes
            </CardTitle>
            <CardDescription>Registra nuevos pacientes en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/secretary/patient-registration">
              <Button className="w-full">Registrar Paciente</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Agenda Diaria
            </CardTitle>
            <CardDescription>Revisa la agenda del día actual</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/secretary/daily-agenda">
              <Button className="w-full">Ver Agenda</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Comunicaciones
            </CardTitle>
            <CardDescription>Gestiona llamadas y mensajes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/secretary/communications">
              <Button className="w-full">Ver Comunicaciones</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Gestión de Pacientes
            </CardTitle>
            <CardDescription>Administra la información de pacientes</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/secretary/patients">
              <Button className="w-full">Ver Pacientes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Reportes
            </CardTitle>
            <CardDescription>Genera reportes y estadísticas</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/secretary/reports">
              <Button className="w-full">Ver Reportes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Citas de Hoy</CardTitle>
            <CardDescription>Resumen de las citas programadas para hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Juan Pérez</p>
                  <p className="text-sm text-gray-600">09:00 - Consulta General</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Confirmada</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">María García</p>
                  <p className="text-sm text-gray-600">14:30 - Emergencia</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendiente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Tareas frecuentes del día a día</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Nueva Cita
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <UserPlus className="mr-2 h-4 w-4" />
              Registrar Paciente
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Phone className="mr-2 h-4 w-4" />
              Llamar a Paciente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
