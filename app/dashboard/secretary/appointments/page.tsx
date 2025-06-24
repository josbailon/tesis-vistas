"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarPlus, Search, Phone, Mail, Clock, User, MapPin, CheckCircle, AlertCircle, Edit } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function SecretaryAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateAppointmentOpen, setIsCreateAppointmentOpen] = useState(false)

  const appointments = [
    {
      id: "apt1",
      patientName: "Ana García López",
      patientPhone: "0999-123-456",
      patientEmail: "ana.garcia@gmail.com",
      studentName: "Carlos López",
      specialty: "Endodoncia",
      date: new Date(2024, 0, 22),
      time: "09:00",
      duration: 60,
      location: "Consultorio 3",
      status: "confirmed",
      type: "treatment",
      notes: "Tratamiento de conducto - Segunda sesión",
      createdBy: "Secretaria María",
      createdAt: "2024-01-20",
    },
    {
      id: "apt2",
      patientName: "Roberto Silva Mendoza",
      patientPhone: "0998-234-567",
      patientEmail: "roberto.silva@hotmail.com",
      studentName: "María Fernández",
      specialty: "Ortodoncia",
      date: new Date(2024, 0, 22),
      time: "11:00",
      duration: 45,
      location: "Consultorio 5",
      status: "pending",
      type: "consultation",
      notes: "Primera consulta ortodóntica",
      createdBy: "Secretaria María",
      createdAt: "2024-01-21",
    },
    {
      id: "apt3",
      patientName: "Carmen Vega Torres",
      patientPhone: "0997-345-678",
      patientEmail: "carmen.vega@yahoo.com",
      studentName: "Juan Pérez",
      specialty: "Cirugía Oral",
      date: new Date(2024, 0, 23),
      time: "14:00",
      duration: 90,
      location: "Quirófano 1",
      status: "confirmed",
      type: "surgery",
      notes: "Extracción de terceros molares",
      createdBy: "Secretaria María",
      createdAt: "2024-01-19",
    },
    {
      id: "apt4",
      patientName: "Luis Morales Castro",
      patientPhone: "0996-456-789",
      patientEmail: "luis.morales@gmail.com",
      studentName: "Sofía Ramírez",
      specialty: "Odontopediatría",
      date: new Date(2024, 0, 22),
      time: "15:30",
      duration: 30,
      location: "Consultorio 2",
      status: "cancelled",
      type: "checkup",
      notes: "Control rutinario - Cancelado por el paciente",
      createdBy: "Secretaria María",
      createdAt: "2024-01-18",
    },
  ]

  const students = [
    { id: "s1", name: "Carlos López", specialty: "Endodoncia" },
    { id: "s2", name: "María Fernández", specialty: "Ortodoncia" },
    { id: "s3", name: "Juan Pérez", specialty: "Cirugía Oral" },
    { id: "s4", name: "Sofía Ramírez", specialty: "Odontopediatría" },
  ]

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmada
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Cancelada
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completada
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            Consulta
          </Badge>
        )
      case "treatment":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Tratamiento
          </Badge>
        )
      case "surgery":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            Cirugía
          </Badge>
        )
      case "checkup":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-700">
            Control
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const appointmentsForSelectedDate = appointments.filter(
    (appointment) => appointment.date.toDateString() === selectedDate.toDateString(),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Citas</h1>
          <p className="text-muted-foreground">Administra las citas de la clínica dental</p>
        </div>
        <Dialog open={isCreateAppointmentOpen} onOpenChange={setIsCreateAppointmentOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agendar Nueva Cita</DialogTitle>
              <DialogDescription>Completa la información para agendar una nueva cita</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Nombre del Paciente</Label>
                  <Input id="patientName" placeholder="Ana García López" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientPhone">Teléfono</Label>
                  <Input id="patientPhone" placeholder="0999-123-456" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientEmail">Correo Electrónico</Label>
                <Input id="patientEmail" type="email" placeholder="paciente@gmail.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Estudiante Asignado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estudiante" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} - {student.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="endodoncia">Endodoncia</SelectItem>
                      <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                      <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                      <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                      <SelectItem value="periodoncia">Periodoncia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (min)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                      <SelectItem value="90">90 minutos</SelectItem>
                      <SelectItem value="120">120 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Cita</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de cita" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consulta</SelectItem>
                      <SelectItem value="treatment">Tratamiento</SelectItem>
                      <SelectItem value="surgery">Cirugía</SelectItem>
                      <SelectItem value="checkup">Control</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Consultorio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultorio1">Consultorio 1</SelectItem>
                      <SelectItem value="consultorio2">Consultorio 2</SelectItem>
                      <SelectItem value="consultorio3">Consultorio 3</SelectItem>
                      <SelectItem value="consultorio4">Consultorio 4</SelectItem>
                      <SelectItem value="consultorio5">Consultorio 5</SelectItem>
                      <SelectItem value="quirofano1">Quirófano 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea id="notes" placeholder="Información adicional sobre la cita..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateAppointmentOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateAppointmentOpen(false)}>Agendar Cita</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
            <CalendarPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "confirmed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoy</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsForSelectedDate.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendario</CardTitle>
              <CardDescription>Selecciona una fecha para ver las citas</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                locale={es}
              />
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="today">Hoy</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar citas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="confirmed">Confirmadas</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="cancelled">Canceladas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{appointment.patientName}</h3>
                            {getStatusBadge(appointment.status)}
                            {getTypeBadge(appointment.type)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{appointment.studentName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {format(appointment.date, "dd/MM/yyyy")} - {appointment.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              <span>{appointment.patientPhone}</span>
                            </div>
                          </div>

                          {appointment.notes && <p className="text-sm text-muted-foreground">{appointment.notes}</p>}
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {appointment.status === "pending" && (
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="today" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Citas para {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}</CardTitle>
                  <CardDescription>{appointmentsForSelectedDate.length} citas programadas</CardDescription>
                </CardHeader>
                <CardContent>
                  {appointmentsForSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                      {appointmentsForSelectedDate
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{appointment.time}</span>
                                <span>{appointment.patientName}</span>
                                {getStatusBadge(appointment.status)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {appointment.studentName} • {appointment.specialty} • {appointment.location}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No hay citas para esta fecha</h3>
                      <p className="text-muted-foreground">Selecciona otra fecha o agenda una nueva cita</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <div className="space-y-4">
                {appointments
                  .filter((appointment) => appointment.status === "pending")
                  .map((appointment) => (
                    <Card key={appointment.id} className="border-yellow-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{appointment.patientName}</h3>
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Clock className="h-3 w-3 mr-1" />
                                Pendiente Confirmación
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(appointment.date, "dd/MM/yyyy")} - {appointment.time} • {appointment.studentName}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Llamar
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirmar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="confirmed" className="space-y-4">
              <div className="space-y-4">
                {appointments
                  .filter((appointment) => appointment.status === "confirmed")
                  .map((appointment) => (
                    <Card key={appointment.id} className="border-green-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{appointment.patientName}</h3>
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Confirmada
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(appointment.date, "dd/MM/yyyy")} - {appointment.time} • {appointment.studentName}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-1" />
                              Recordatorio
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
