"use client"

import { useState } from "react"
import { Calendar, Clock, User, Phone, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface Appointment {
  id: string
  patientName: string
  patientPhone: string
  date: string
  time: string
  specialty: string
  student: string
  professor: string
  status: "confirmada" | "pendiente" | "cancelada" | "completada"
  notes?: string
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "María González",
    patientPhone: "+593 99 123 4567",
    date: "2024-01-15",
    time: "09:00",
    specialty: "Endodoncia",
    student: "Juan Pérez",
    professor: "Dr. Carlos Ruiz",
    status: "confirmada",
    notes: "Primera consulta",
  },
  {
    id: "2",
    patientName: "Carlos Mendoza",
    patientPhone: "+593 99 234 5678",
    date: "2024-01-15",
    time: "10:30",
    specialty: "Ortodoncia",
    student: "Ana López",
    professor: "Dra. Laura Martín",
    status: "pendiente",
    notes: "Revisión de brackets",
  },
  {
    id: "3",
    patientName: "Luis Rodríguez",
    patientPhone: "+593 99 345 6789",
    date: "2024-01-15",
    time: "14:00",
    specialty: "Cirugía Oral",
    student: "Pedro Sánchez",
    professor: "Dr. Roberto Silva",
    status: "completada",
    notes: "Extracción de muela del juicio",
  },
  {
    id: "4",
    patientName: "Ana Morales",
    patientPhone: "+593 99 456 7890",
    date: "2024-01-16",
    time: "08:30",
    specialty: "Odontopediatría",
    student: "María García",
    professor: "Dra. Carmen Vega",
    status: "confirmada",
    notes: "Control rutinario",
  },
]

const statusColors = {
  confirmada: "bg-green-100 text-green-800",
  pendiente: "bg-yellow-100 text-yellow-800",
  cancelada: "bg-red-100 text-red-800",
  completada: "bg-blue-100 text-blue-800",
}

const statusLabels = {
  confirmada: "Confirmada",
  pendiente: "Pendiente",
  cancelada: "Cancelada",
  completada: "Completada",
}

export default function SecretaryAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const router = useRouter()

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientPhone.includes(searchTerm) ||
      appointment.student.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    const matchesDate = dateFilter === "all" || appointment.date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const updateAppointmentStatus = (id: string, newStatus: Appointment["status"]) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)))
  }

  const todayAppointments = appointments.filter((apt) => apt.date === new Date().toISOString().split("T")[0])
  const pendingAppointments = appointments.filter((apt) => apt.status === "pendiente")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-600">Administra las citas de la clínica dental</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push("/dashboard/secretary/appointments/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Cita
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {todayAppointments.filter((apt) => apt.status === "confirmada").length} confirmadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Requieren confirmación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">En el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((apt) => apt.status === "completada").length}</div>
            <p className="text-xs text-muted-foreground">Este período</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Busca y filtra las citas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por paciente, teléfono o estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fechas</SelectItem>
                <SelectItem value="2024-01-15">15 Enero 2024</SelectItem>
                <SelectItem value="2024-01-16">16 Enero 2024</SelectItem>
                <SelectItem value="2024-01-17">17 Enero 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Citas</CardTitle>
          <CardDescription>{filteredAppointments.length} citas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                      <Badge className={statusColors[appointment.status]}>{statusLabels[appointment.status]}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {appointment.patientPhone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {appointment.date} a las {appointment.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Estudiante: {appointment.student}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profesor: {appointment.professor}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-blue-600">{appointment.specialty}</span>
                      {appointment.notes && <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {appointment.status === "pendiente" && (
                      <Button
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment.id, "confirmada")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Confirmar
                      </Button>
                    )}
                    {appointment.status === "confirmada" && (
                      <Button
                        size="sm"
                        onClick={() => updateAppointmentStatus(appointment.id, "completada")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Completar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment.id, "cancelada")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
