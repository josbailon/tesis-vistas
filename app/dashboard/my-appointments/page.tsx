"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const mockAppointments = [
  {
    id: 1,
    date: "2024-01-25",
    time: "09:00",
    student: "Dr. Carlos Pérez",
    specialty: "Endodoncia",
    location: "Consultorio 3",
    status: "confirmed",
    notes: "Control post-tratamiento de conducto",
    phone: "0987654321",
  },
  {
    id: 2,
    date: "2024-02-05",
    time: "14:30",
    student: "Dra. Ana Martínez",
    specialty: "Ortodoncia",
    location: "Consultorio 1",
    status: "pending",
    notes: "Evaluación para brackets",
    phone: "0976543210",
  },
  {
    id: 3,
    date: "2024-01-15",
    time: "10:00",
    student: "Dr. Diego López",
    specialty: "Cirugía Oral",
    location: "Consultorio 2",
    status: "completed",
    notes: "Extracción de muela del juicio",
    phone: "0965432109",
  },
]

export default function MyAppointmentsPage() {
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredAppointments = mockAppointments.filter((apt) => {
    return filterStatus === "all" || apt.status === filterStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700">Completada</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSpecialtyColor = (specialty: string) => {
    const colors: { [key: string]: string } = {
      Endodoncia: "from-purple-500 to-purple-600",
      Ortodoncia: "from-blue-500 to-blue-600",
      "Cirugía Oral": "from-red-500 to-red-600",
      Odontopediatría: "from-green-500 to-green-600",
      Periodoncia: "from-pink-500 to-pink-600",
    }
    return colors[specialty] || "from-gray-500 to-gray-600"
  }

  const upcomingAppointments = filteredAppointments.filter(
    (apt) => new Date(apt.date) >= new Date() && apt.status !== "completed",
  )
  const pastAppointments = filteredAppointments.filter(
    (apt) => new Date(apt.date) < new Date() || apt.status === "completed",
  )

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <div className="space-y-6 p-6">
        <div className="fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mis Citas Médicas
          </h1>
          <p className="text-blue-600 mt-2 text-lg">Gestiona y revisa todas tus citas programadas</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{upcomingAppointments.length}</div>
              <p className="text-blue-500">Próximas Citas</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockAppointments.filter((a) => a.status === "completed").length}
              </div>
              <p className="text-blue-500">Completadas</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {mockAppointments.filter((a) => a.status === "pending").length}
              </div>
              <p className="text-blue-500">Pendientes</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{mockAppointments.length}</div>
              <p className="text-blue-500">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Todas las Citas</option>
              <option value="confirmed">Confirmadas</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
          <Button className="btn-medical">
            <Plus className="h-4 w-4 mr-2" />
            Solicitar Nueva Cita
          </Button>
        </div>

        {/* Próximas citas */}
        {upcomingAppointments.length > 0 && (
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Calendar className="h-5 w-5 text-blue-500" />
                Próximas Citas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${getSpecialtyColor(appointment.specialty)}`}
                          >
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-blue-700">{appointment.specialty}</h3>
                            <p className="text-blue-600">{appointment.student}</p>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-white/60 rounded-lg">
                            <p className="text-sm text-blue-700">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                          Reagendar
                        </Button>
                        <Button size="sm" className="btn-medical">
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Historial de citas */}
        {pastAppointments.length > 0 && (
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Clock className="h-5 w-5 text-blue-500" />
                Historial de Citas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-gray-300">
                            <Calendar className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-blue-700">{appointment.specialty}</h3>
                            <p className="text-blue-600">{appointment.student}</p>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-white/60 rounded-lg">
                            <p className="text-sm text-blue-700">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mensaje cuando no hay citas */}
        {filteredAppointments.length === 0 && (
          <Card className="medical-card">
            <CardContent className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-300" />
              <h3 className="text-lg font-semibold text-blue-600 mb-2">No tienes citas programadas</h3>
              <p className="text-blue-500 mb-4">¡Solicita una nueva cita para comenzar tu tratamiento!</p>
              <Button className="btn-medical">
                <Plus className="h-4 w-4 mr-2" />
                Solicitar Cita
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  )
}
