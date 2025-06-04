"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Phone, Plus, Search } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const mockAppointments = [
  {
    id: 1,
    patient: "María González",
    student: "Carlos Pérez",
    specialty: "Endodoncia",
    date: "2024-01-25",
    time: "09:00",
    status: "confirmed",
    phone: "0987654321",
  },
  {
    id: 2,
    patient: "Juan Rodríguez",
    student: "Ana Martínez",
    specialty: "Ortodoncia",
    date: "2024-01-25",
    time: "10:30",
    status: "pending",
    phone: "0976543210",
  },
  {
    id: 3,
    patient: "Laura Vásquez",
    student: "Diego López",
    specialty: "Cirugía Oral",
    date: "2024-01-26",
    time: "14:00",
    status: "confirmed",
    phone: "0965432109",
  },
]

export default function SecretaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAppointments = mockAppointments.filter(
    (apt) =>
      apt.date === selectedDate &&
      (apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.student.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <ProtectedRoute allowedRoles={["secretary"]}>
      <div className="space-y-6 p-6">
        <div className="fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Panel de Secretaría
          </h1>
          <p className="text-blue-600 mt-2 text-lg">Gestión de citas y coordinación de horarios</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {mockAppointments.filter((a) => a.status === "confirmed").length}
              </div>
              <p className="text-blue-500">Citas Confirmadas</p>
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
              <div className="text-3xl font-bold text-green-600 mb-2">{mockAppointments.length}</div>
              <p className="text-blue-500">Total Hoy</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <p className="text-blue-500">Estudiantes Activos</p>
            </CardContent>
          </Card>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar paciente o estudiante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
              />
            </div>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
          />
          <Button className="btn-medical">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cita
          </Button>
        </div>

        {/* Lista de citas */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Calendar className="h-5 w-5 text-blue-500" />
              Citas del Día - {new Date(selectedDate).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-300" />
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">No hay citas programadas</h3>
                  <p className="text-blue-500">No se encontraron citas para la fecha seleccionada</p>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-blue-700">{appointment.patient}</h4>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-600">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span>Estudiante: {appointment.student}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span>
                              {appointment.time} - {appointment.specialty}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-500" />
                            <span>{appointment.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                          Editar
                        </Button>
                        <Button size="sm" className="btn-medical">
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
