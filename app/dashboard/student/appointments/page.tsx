"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Phone, Mail, MapPin, Plus, Search, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const mockAppointments = [
  {
    id: "apt1",
    patientName: "María González",
    patientPhone: "+593 99 123 4567",
    patientEmail: "maria.gonzalez@email.com",
    date: "2024-12-28",
    time: "09:00",
    duration: 60,
    specialty: "Endodoncia",
    status: "confirmed",
    notes: "Primera consulta para evaluación de dolor en molar superior",
    location: "Consultorio 3",
  },
  {
    id: "apt2",
    patientName: "Carlos Rodríguez",
    patientPhone: "+593 98 765 4321",
    patientEmail: "carlos.rodriguez@email.com",
    date: "2024-12-29",
    time: "14:30",
    duration: 90,
    specialty: "Endodoncia",
    status: "pending",
    notes: "Seguimiento de tratamiento de conducto",
    location: "Consultorio 3",
  },
  {
    id: "apt3",
    patientName: "Ana Martínez",
    patientPhone: "+593 97 456 7890",
    patientEmail: "ana.martinez@email.com",
    date: "2024-12-30",
    time: "10:00",
    duration: 45,
    specialty: "Endodoncia",
    status: "completed",
    notes: "Control post-tratamiento",
    location: "Consultorio 3",
  },
]

export default function StudentAppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    date: "",
    time: "",
    duration: "60",
    notes: "",
    location: "Consultorio 3",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate appointment time conflicts
    const appointmentDateTime = new Date(`${newAppointment.date}T${newAppointment.time}`)
    const conflictingAppointment = appointments.find((apt) => {
      const aptDateTime = new Date(`${apt.date}T${apt.time}`)
      const timeDiff = Math.abs(appointmentDateTime.getTime() - aptDateTime.getTime())
      return timeDiff < 60 * 60 * 1000 && apt.status !== "cancelled" // 1 hour buffer
    })

    if (conflictingAppointment) {
      toast({
        title: "Conflicto de Horario",
        description: "Ya tienes una cita programada en ese horario. Por favor selecciona otro horario.",
        variant: "destructive",
      })
      return
    }

    // Check if appointment is in the past
    if (appointmentDateTime < new Date()) {
      toast({
        title: "Fecha Inválida",
        description: "No puedes programar citas en el pasado.",
        variant: "destructive",
      })
      return
    }

    // Check business hours (8 AM to 6 PM)
    const hour = appointmentDateTime.getHours()
    if (hour < 8 || hour >= 18) {
      toast({
        title: "Horario No Disponible",
        description: "Las citas deben programarse entre 8:00 AM y 6:00 PM.",
        variant: "destructive",
      })
      return
    }

    // Check weekends
    const dayOfWeek = appointmentDateTime.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      toast({
        title: "Día No Disponible",
        description: "No se pueden programar citas los fines de semana.",
        variant: "destructive",
      })
      return
    }

    const appointment = {
      id: `apt${Date.now()}`,
      ...newAppointment,
      specialty: "Endodoncia", // Student's specialization
      status: "pending" as const,
    }

    setAppointments([...appointments, appointment])
    setNewAppointment({
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      date: "",
      time: "",
      duration: "60",
      notes: "",
      location: "Consultorio 3",
    })
    setShowNewAppointment(false)

    toast({
      title: "Cita Programada",
      description: `Cita programada para ${newAppointment.patientName} el ${newAppointment.date} a las ${newAppointment.time}`,
    })
  }

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientPhone.includes(searchTerm) ||
      apt.patientEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="medical-gradient rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Gestión de Citas</h1>
                <p className="text-white/80">Programa y gestiona citas para tus pacientes</p>
              </div>
            </div>
            <Button
              onClick={() => setShowNewAppointment(true)}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Cita
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {appointments.filter((apt) => apt.status === "confirmed").length}
              </div>
              <p className="text-gray-600">Confirmadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {appointments.filter((apt) => apt.status === "pending").length}
              </div>
              <p className="text-gray-600">Pendientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {appointments.filter((apt) => apt.status === "completed").length}
              </div>
              <p className="text-gray-600">Completadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{appointments.length}</div>
              <p className="text-gray-600">Total</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments">Mis Citas</TabsTrigger>
            <TabsTrigger value="schedule">Programar Nueva</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar por nombre, teléfono o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos los Estados</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="pending">Pendientes</option>
                    <option value="completed">Completadas</option>
                    <option value="cancelled">Canceladas</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Appointments List */}
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(appointment.status)}
                              {appointment.status === "confirmed"
                                ? "Confirmada"
                                : appointment.status === "pending"
                                  ? "Pendiente"
                                  : appointment.status === "completed"
                                    ? "Completada"
                                    : "Cancelada"}
                            </div>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {appointment.date} a las {appointment.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>Duración: {appointment.duration} minutos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{appointment.patientPhone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{appointment.patientEmail}</span>
                            </div>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{appointment.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        {appointment.status === "pending" && (
                          <Button size="sm" className="btn-medical">
                            Confirmar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Programar Nueva Cita</CardTitle>
                <CardDescription>Completa la información para programar una nueva cita con un paciente</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleScheduleAppointment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Información del Paciente</h3>

                      <div className="space-y-2">
                        <Label htmlFor="patientName">Nombre Completo *</Label>
                        <Input
                          id="patientName"
                          value={newAppointment.patientName}
                          onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                          placeholder="Nombre del paciente"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientPhone">Teléfono *</Label>
                        <Input
                          id="patientPhone"
                          value={newAppointment.patientPhone}
                          onChange={(e) => setNewAppointment({ ...newAppointment, patientPhone: e.target.value })}
                          placeholder="+593 99 123 4567"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientEmail">Email</Label>
                        <Input
                          id="patientEmail"
                          type="email"
                          value={newAppointment.patientEmail}
                          onChange={(e) => setNewAppointment({ ...newAppointment, patientEmail: e.target.value })}
                          placeholder="paciente@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Detalles de la Cita</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Fecha *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newAppointment.date}
                            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                            min={new Date().toISOString().split("T")[0]}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="time">Hora *</Label>
                          <Input
                            id="time"
                            type="time"
                            value={newAppointment.time}
                            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                            min="08:00"
                            max="18:00"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duración</Label>
                        <select
                          id="duration"
                          value={newAppointment.duration}
                          onChange={(e) => setNewAppointment({ ...newAppointment, duration: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="30">30 minutos</option>
                          <option value="45">45 minutos</option>
                          <option value="60">1 hora</option>
                          <option value="90">1.5 horas</option>
                          <option value="120">2 horas</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                          id="location"
                          value={newAppointment.location}
                          onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                          placeholder="Consultorio 3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Motivo de la consulta, observaciones especiales..."
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => setShowNewAppointment(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="btn-medical">
                      <Calendar className="h-4 w-4 mr-2" />
                      Programar Cita
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
