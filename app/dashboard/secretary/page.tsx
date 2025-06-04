"use client"

import { useState } from "react"
import { Calendar, Clock, Users, UserCheck, CalendarDays, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SecretaryAppointmentForm } from "@/components/secretary-appointment-form"
import { StudentScheduleView } from "@/components/student-schedule-view"
import { AppointmentCalendar } from "@/components/appointment-calendar"

export default function SecretaryPage() {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Mock data para estadísticas
  const stats = {
    todayAppointments: 12,
    availableStudents: 8,
    pendingConfirmations: 3,
    completedToday: 7,
  }

  // Mock data para citas de hoy
  const todayAppointments = [
    {
      id: "1",
      time: "09:00",
      patient: "Ana García",
      student: "Carlos Pérez",
      specialty: "Endodoncia",
      status: "confirmada",
      phone: "0987654321",
    },
    {
      id: "2",
      time: "10:30",
      patient: "Luis Rodríguez",
      student: "María González",
      specialty: "Ortodoncia",
      status: "pendiente",
      phone: "0987654322",
    },
    {
      id: "3",
      time: "14:00",
      patient: "Carmen López",
      student: "José Martínez",
      specialty: "Cirugía Oral",
      status: "completada",
      phone: "0987654323",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "completada":
        return "bg-blue-100 text-blue-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Panel de Secretaría</h1>
          <p className="text-green-600">Gestión de citas y coordinación de estudiantes</p>
        </div>
        <Button onClick={() => setShowAppointmentForm(true)} className="mt-4 sm:mt-0">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Cita
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Citas Hoy</CardTitle>
            <CalendarDays className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.todayAppointments}</div>
            <p className="text-xs text-green-600">+2 desde ayer</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Estudiantes Disponibles</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.availableStudents}</div>
            <p className="text-xs text-green-600">De 15 total</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.pendingConfirmations}</div>
            <p className="text-xs text-green-600">Por confirmar</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Completadas</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.completedToday}</div>
            <p className="text-xs text-green-600">Hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">Citas del Día</TabsTrigger>
          <TabsTrigger value="schedules">Horarios Estudiantes</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Citas de Hoy</CardTitle>
              <CardDescription>Gestiona las citas programadas para el día de hoy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-700">{appointment.time}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{appointment.patient}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            <span>Est. {appointment.student}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{appointment.specialty}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            <span>{appointment.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Phone className="h-3 w-3 mr-1" />
                        Llamar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules">
          <StudentScheduleView />
        </TabsContent>

        <TabsContent value="calendar">
          <AppointmentCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </TabsContent>
      </Tabs>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <SecretaryAppointmentForm
          onClose={() => setShowAppointmentForm(false)}
          onSuccess={() => setShowAppointmentForm(false)}
        />
      )}
    </div>
  )
}
