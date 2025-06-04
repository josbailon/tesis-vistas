"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Users, UserPlus, Search, Phone, Mail, GraduationCap, Stethoscope, Plus } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

// Mock data para estudiantes disponibles
const mockStudents = [
  {
    id: "EST001",
    name: "Ana María González",
    semester: "8vo Semestre",
    specialty: "Endodoncia",
    schedule: [
      { day: "Lunes", time: "08:00-12:00", available: true },
      { day: "Martes", time: "14:00-18:00", available: true },
      { day: "Miércoles", time: "08:00-12:00", available: false },
      { day: "Jueves", time: "14:00-18:00", available: true },
      { day: "Viernes", time: "08:00-12:00", available: true },
    ],
    professor: "Dr. Carlos Ruiz",
    phone: "+593 99 123 4567",
    email: "ana.gonzalez@uleam.edu.ec",
    completedCases: 15,
    rating: 4.8,
  },
  {
    id: "EST002",
    name: "Carlos Eduardo Ramírez",
    semester: "9no Semestre",
    specialty: "Ortodoncia",
    schedule: [
      { day: "Lunes", time: "14:00-18:00", available: true },
      { day: "Martes", time: "08:00-12:00", available: true },
      { day: "Miércoles", time: "14:00-18:00", available: true },
      { day: "Jueves", time: "08:00-12:00", available: false },
      { day: "Viernes", time: "14:00-18:00", available: true },
    ],
    professor: "Dra. Laura Martín",
    phone: "+593 98 765 4321",
    email: "carlos.ramirez@uleam.edu.ec",
    completedCases: 22,
    rating: 4.9,
  },
  {
    id: "EST003",
    name: "Sofía Alejandra Torres",
    semester: "7mo Semestre",
    specialty: "Cirugía Oral",
    schedule: [
      { day: "Lunes", time: "08:00-12:00", available: true },
      { day: "Martes", time: "08:00-12:00", available: false },
      { day: "Miércoles", time: "14:00-18:00", available: true },
      { day: "Jueves", time: "08:00-12:00", available: true },
      { day: "Viernes", time: "14:00-18:00", available: true },
    ],
    professor: "Dr. Roberto Silva",
    phone: "+593 97 456 7890",
    email: "sofia.torres@uleam.edu.ec",
    completedCases: 8,
    rating: 4.6,
  },
  {
    id: "EST004",
    name: "Diego Alejandro Mendoza",
    semester: "8vo Semestre",
    specialty: "Odontopediatría",
    schedule: [
      { day: "Lunes", time: "14:00-18:00", available: true },
      { day: "Martes", time: "14:00-18:00", available: true },
      { day: "Miércoles", time: "08:00-12:00", available: true },
      { day: "Jueves", time: "14:00-18:00", available: false },
      { day: "Viernes", time: "08:00-12:00", available: true },
    ],
    professor: "Dra. Carmen Vega",
    phone: "+593 96 321 0987",
    email: "diego.mendoza@uleam.edu.ec",
    completedCases: 12,
    rating: 4.7,
  },
]

// Mock data para citas del día
const todayAppointments = [
  {
    id: "CITA001",
    time: "08:00",
    patient: "María Elena Vásquez",
    student: "Ana María González",
    specialty: "Endodoncia",
    status: "confirmada",
    phone: "+593 99 888 7777",
  },
  {
    id: "CITA002",
    time: "09:30",
    patient: "José Luis Morales",
    student: "Carlos Eduardo Ramírez",
    specialty: "Ortodoncia",
    status: "pendiente",
    phone: "+593 98 777 6666",
  },
  {
    id: "CITA003",
    time: "14:00",
    patient: "Carmen Rosa Delgado",
    student: "Sofía Alejandra Torres",
    specialty: "Cirugía Oral",
    status: "confirmada",
    phone: "+593 97 666 5555",
  },
  {
    id: "CITA004",
    time: "15:30",
    patient: "Pedro Antonio Ruiz",
    student: "Diego Alejandro Mendoza",
    specialty: "Odontopediatría",
    status: "completada",
    phone: "+593 96 555 4444",
  },
]

export default function SecretaryPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "all" || student.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

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

  const getAvailabilityColor = (available: boolean) => {
    return available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <ProtectedRoute allowedRoles={["secretary"]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Panel de Secretaría</h1>
            <p className="mt-2 max-w-2xl">
              Gestiona las citas de pacientes, consulta horarios de estudiantes y coordina la agenda de la clínica
              dental.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
                  <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estudiantes Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStudents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayAppointments.filter((apt) => apt.status === "pendiente").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserPlus className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Disponibles</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockStudents.filter((student) => student.schedule.some((slot) => slot.available)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Horarios de Estudiantes</TabsTrigger>
            <TabsTrigger value="appointments">Citas del Día</TabsTrigger>
            <TabsTrigger value="booking">Agendar Nueva Cita</TabsTrigger>
          </TabsList>

          {/* Horarios de Estudiantes */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Horarios de Atención - Estudiantes</CardTitle>
                <CardDescription>Consulta la disponibilidad de estudiantes para agendar citas</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filtros */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar estudiante o especialidad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todas las Especialidades</option>
                    <option value="Endodoncia">Endodoncia</option>
                    <option value="Ortodoncia">Ortodoncia</option>
                    <option value="Cirugía Oral">Cirugía Oral</option>
                    <option value="Odontopediatría">Odontopediatría</option>
                  </select>
                </div>

                {/* Lista de Estudiantes */}
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <Card key={student.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* Información del Estudiante */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <GraduationCap className="h-5 w-5 text-blue-600" />
                              <h3 className="text-lg font-semibold">{student.name}</h3>
                              <Badge variant="outline">{student.id}</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Stethoscope className="h-4 w-4" />
                                <span>{student.specialty}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{student.semester}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{student.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{student.email}</span>
                              </div>
                            </div>

                            <div className="mt-2 text-sm text-gray-600">
                              <span className="font-medium">Profesor Supervisor:</span> {student.professor}
                            </div>
                          </div>

                          {/* Horarios de la Semana */}
                          <div className="lg:w-1/2">
                            <h4 className="font-medium mb-3">Horarios de Atención</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                              {student.schedule.map((slot, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <span className="text-sm font-medium">{slot.day}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">{slot.time}</span>
                                    <Badge className={getAvailabilityColor(slot.available)} variant="secondary">
                                      {slot.available ? "Disponible" : "Ocupado"}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Estadísticas y Acciones */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>
                              Casos Completados: <strong>{student.completedCases}</strong>
                            </span>
                            <span>
                              Calificación: <strong>{student.rating}/5.0</strong>
                            </span>
                          </div>
                          <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Agendar Cita
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Citas del Día */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agenda del Día</CardTitle>
                <CardDescription>
                  Citas programadas para hoy -{" "}
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <Card key={appointment.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{appointment.time}</div>
                              <div className="text-xs text-gray-500">Hora</div>
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <GraduationCap className="h-4 w-4" />
                                  {appointment.student}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Stethoscope className="h-4 w-4" />
                                  {appointment.specialty}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="h-4 w-4" />
                                  {appointment.phone}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agendar Nueva Cita */}
          <TabsContent value="booking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agendar Nueva Cita</CardTitle>
                <CardDescription>Programa una nueva cita para un paciente con un estudiante disponible</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Formulario de Paciente */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Información del Paciente</h3>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre Completo</label>
                      <Input placeholder="Ingrese el nombre del paciente" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Teléfono</label>
                      <Input placeholder="+593 99 123 4567" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="paciente@email.com" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Motivo de Consulta</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Describa el motivo de la consulta..."
                      />
                    </div>
                  </div>

                  {/* Selección de Estudiante y Horario */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Asignación de Cita</h3>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Especialidad Requerida</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione una especialidad</option>
                        <option value="Endodoncia">Endodoncia</option>
                        <option value="Ortodoncia">Ortodoncia</option>
                        <option value="Cirugía Oral">Cirugía Oral</option>
                        <option value="Odontopediatría">Odontopediatría</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estudiante Asignado</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione un estudiante</option>
                        {mockStudents.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name} - {student.specialty}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Fecha</label>
                        <Input type="date" min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Hora</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Seleccione hora</option>
                          <option value="08:00">08:00 AM</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                          <option value="17:00">05:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duración Estimada</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                        <option value="90">1.5 horas</option>
                        <option value="120">2 horas</option>
                      </select>
                    </div>

                    <Button className="w-full mt-6">
                      <Calendar className="h-4 w-4 mr-2" />
                      Confirmar Cita
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
