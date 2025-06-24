"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CalendarIcon,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Edit,
  Plus,
  Filter,
  Download,
  PrinterIcon as Print,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function SecretaryDailyAgendaPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewFilter, setViewFilter] = useState("all")

  // Mock data for daily appointments
  const todayAppointments = [
    {
      id: "apt1",
      time: "08:00",
      duration: 60,
      patientName: "Ana García López",
      patientPhone: "0999-123-456",
      studentName: "Carlos López",
      specialty: "Endodoncia",
      location: "Consultorio 3",
      type: "treatment",
      status: "confirmed",
      supervisor: "Dr. Martínez",
      notes: "Tratamiento de conducto - Segunda sesión",
      isFirstVisit: false,
    },
    {
      id: "apt2",
      time: "09:30",
      duration: 45,
      patientName: "Roberto Silva Mendoza",
      patientPhone: "0998-234-567",
      studentName: "María Fernández",
      specialty: "Ortodoncia",
      location: "Consultorio 5",
      type: "consultation",
      status: "pending",
      supervisor: "Dra. Rodríguez",
      notes: "Primera consulta ortodóntica",
      isFirstVisit: true,
    },
    {
      id: "apt3",
      time: "11:00",
      duration: 30,
      patientName: "Carmen Vega Torres",
      patientPhone: "0997-345-678",
      studentName: "Juan Pérez",
      specialty: "Periodoncia",
      location: "Consultorio 2",
      type: "checkup",
      status: "confirmed",
      supervisor: "Dr. Silva",
      notes: "Control post-tratamiento",
      isFirstVisit: false,
    },
    {
      id: "apt4",
      time: "14:00",
      duration: 90,
      patientName: "Luis Morales Castro",
      patientPhone: "0996-456-789",
      studentName: "Sofía Ramírez",
      specialty: "Cirugía Oral",
      location: "Quirófano 1",
      type: "surgery",
      status: "confirmed",
      supervisor: "Dr. López",
      notes: "Extracción de terceros molares",
      isFirstVisit: false,
    },
    {
      id: "apt5",
      time: "15:30",
      duration: 45,
      patientName: "Pedro Gómez Ruiz",
      patientPhone: "0995-567-890",
      studentName: "Elena Morales",
      specialty: "Odontopediatría",
      location: "Consultorio 4",
      type: "treatment",
      status: "pending",
      supervisor: "Dra. Castro",
      notes: "Tratamiento de caries en niño de 8 años",
      isFirstVisit: false,
    },
    {
      id: "apt6",
      time: "16:30",
      duration: 60,
      patientName: "Isabel Mendoza Vera",
      patientPhone: "0994-678-901",
      studentName: "Miguel Sánchez",
      specialty: "Prostodoncia",
      location: "Consultorio 6",
      type: "treatment",
      status: "confirmed",
      supervisor: "Dr. Herrera",
      notes: "Toma de impresiones para prótesis",
      isFirstVisit: false,
    },
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
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completada
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Cancelada
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return <Badge variant="outline">Consulta</Badge>
      case "treatment":
        return <Badge variant="outline">Tratamiento</Badge>
      case "surgery":
        return <Badge variant="outline">Cirugía</Badge>
      case "checkup":
        return <Badge variant="outline">Control</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getTimeSlotColor = (time: string) => {
    const hour = Number.parseInt(time.split(":")[0])
    if (hour < 10) return "bg-blue-50 border-blue-200"
    if (hour < 14) return "bg-green-50 border-green-200"
    return "bg-purple-50 border-purple-200"
  }

  const filteredAppointments = todayAppointments.filter((appointment) => {
    if (viewFilter === "all") return true
    if (viewFilter === "pending") return appointment.status === "pending"
    if (viewFilter === "confirmed") return appointment.status === "confirmed"
    if (viewFilter === "first-visit") return appointment.isFirstVisit
    return true
  })

  const appointmentsByTimeSlot = {
    morning: filteredAppointments.filter((apt) => Number.parseInt(apt.time.split(":")[0]) < 12),
    afternoon: filteredAppointments.filter((apt) => Number.parseInt(apt.time.split(":")[0]) >= 12),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agenda Diaria</h1>
          <p className="text-muted-foreground">
            Gestión de citas para {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Print className="mr-2 h-4 w-4" />
            Imprimir Agenda
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citas Hoy</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.filter((a) => a.status === "confirmed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.filter((a) => a.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Primeras Visitas</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.filter((a) => a.isFirstVisit).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendario</CardTitle>
              <CardDescription>Selecciona una fecha</CardDescription>
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

        {/* Daily Schedule */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Agenda del Día</CardTitle>
                  <CardDescription>
                    {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })} - {filteredAppointments.length} citas
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={viewFilter} onValueChange={setViewFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filtrar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="confirmed">Confirmadas</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                      <SelectItem value="first-visit">Primeras Visitas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList>
                  <TabsTrigger value="timeline">Vista Cronológica</TabsTrigger>
                  <TabsTrigger value="morning">Mañana</TabsTrigger>
                  <TabsTrigger value="afternoon">Tarde</TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="space-y-4">
                  <div className="space-y-3">
                    {filteredAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment) => (
                        <Card
                          key={appointment.id}
                          className={`hover:shadow-md transition-shadow cursor-pointer ${getTimeSlotColor(appointment.time)}`}
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="text-lg font-bold">{appointment.time}</div>
                                  <div className="text-xs text-muted-foreground">{appointment.duration} min</div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{appointment.patientName}</h3>
                                    {getStatusBadge(appointment.status)}
                                    {getTypeBadge(appointment.type)}
                                    {appointment.isFirstVisit && (
                                      <Badge variant="outline" className="text-blue-600">
                                        Primera Visita
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <User className="h-3 w-3" />
                                      <span>{appointment.studentName}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{appointment.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      <span>{appointment.patientPhone}</span>
                                    </div>
                                    <div>
                                      <span>{appointment.specialty}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
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

                <TabsContent value="morning" className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Citas de la Mañana ({appointmentsByTimeSlot.morning.length})
                    </h3>
                    {appointmentsByTimeSlot.morning.map((appointment) => (
                      <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold">{appointment.time}</div>
                                <div className="text-xs text-muted-foreground">{appointment.duration} min</div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{appointment.patientName}</h3>
                                  {getStatusBadge(appointment.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.studentName} • {appointment.location}
                                </p>
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="afternoon" className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      Citas de la Tarde ({appointmentsByTimeSlot.afternoon.length})
                    </h3>
                    {appointmentsByTimeSlot.afternoon.map((appointment) => (
                      <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold">{appointment.time}</div>
                                <div className="text-xs text-muted-foreground">{appointment.duration} min</div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{appointment.patientName}</h3>
                                  {getStatusBadge(appointment.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.studentName} • {appointment.location}
                                </p>
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedAppointment && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles de la Cita</DialogTitle>
              <DialogDescription>
                {selectedAppointment.patientName} - {selectedAppointment.time}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Información del Paciente</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Nombre:</strong> {selectedAppointment.patientName}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {selectedAppointment.patientPhone}
                      </p>
                      <p>
                        <strong>Tipo:</strong> {selectedAppointment.isFirstVisit ? "Primera Visita" : "Seguimiento"}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Detalles de la Cita</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Hora:</strong> {selectedAppointment.time}
                      </p>
                      <p>
                        <strong>Duración:</strong> {selectedAppointment.duration} minutos
                      </p>
                      <p>
                        <strong>Ubicación:</strong> {selectedAppointment.location}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Información Académica</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Estudiante:</strong> {selectedAppointment.studentName}
                    </p>
                    <p>
                      <strong>Especialidad:</strong> {selectedAppointment.specialty}
                    </p>
                    <p>
                      <strong>Supervisor:</strong> {selectedAppointment.supervisor}
                    </p>
                  </div>
                </div>
              </Card>

              {selectedAppointment.notes && (
                <Card className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Notas</h4>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.notes}</p>
                  </div>
                </Card>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Estado:</span>
                {getStatusBadge(selectedAppointment.status)}
                {getTypeBadge(selectedAppointment.type)}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Cerrar
              </Button>
              <Button>
                <Phone className="mr-2 h-4 w-4" />
                Contactar Paciente
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
