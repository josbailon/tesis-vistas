"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Edit,
  Eye,
} from "lucide-react"

export default function StudentAppointmentsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Mock data for student appointments
  const appointments = [
    {
      id: "apt1",
      patientName: "Ana García López",
      patientAge: 28,
      patientPhone: "0999-123-456",
      patientEmail: "ana.garcia@gmail.com",
      date: new Date(2024, 0, 25),
      time: "09:00",
      duration: 60,
      specialty: "Endodoncia",
      type: "treatment",
      status: "confirmed",
      location: "Consultorio 3",
      supervisor: "Dr. Martínez",
      notes: "Tratamiento de conducto - Segunda sesión",
      medicalHistory: {
        allergies: "Ninguna conocida",
        medications: "Ibuprofeno 400mg",
        conditions: "Hipertensión controlada",
      },
      treatmentPlan: "Completar endodoncia en pieza 16",
      previousVisits: 2,
    },
    {
      id: "apt2",
      patientName: "Roberto Silva Mendoza",
      patientAge: 35,
      patientPhone: "0998-234-567",
      patientEmail: "roberto.silva@hotmail.com",
      date: new Date(2024, 0, 26),
      time: "11:00",
      duration: 45,
      specialty: "Ortodoncia",
      type: "consultation",
      status: "pending",
      location: "Consultorio 5",
      supervisor: "Dra. Rodríguez",
      notes: "Primera consulta ortodóntica - Evaluación inicial",
      medicalHistory: {
        allergies: "Penicilina",
        medications: "Ninguna",
        conditions: "Ninguna",
      },
      treatmentPlan: "Evaluación para brackets",
      previousVisits: 0,
    },
    {
      id: "apt3",
      patientName: "Carmen Vega Torres",
      patientAge: 42,
      patientPhone: "0997-345-678",
      patientEmail: "carmen.vega@yahoo.com",
      date: new Date(2024, 0, 22),
      time: "14:00",
      duration: 30,
      specialty: "Periodoncia",
      type: "checkup",
      status: "completed",
      location: "Consultorio 2",
      supervisor: "Dr. Silva",
      notes: "Control post-tratamiento periodontal",
      medicalHistory: {
        allergies: "Ninguna conocida",
        medications: "Metformina",
        conditions: "Diabetes tipo 2",
      },
      treatmentPlan: "Mantenimiento periodontal",
      previousVisits: 5,
    },
    {
      id: "apt4",
      patientName: "Luis Morales Castro",
      patientAge: 19,
      patientPhone: "0996-456-789",
      patientEmail: "luis.morales@gmail.com",
      date: new Date(2024, 0, 28),
      time: "15:30",
      duration: 90,
      specialty: "Cirugía Oral",
      type: "surgery",
      status: "scheduled",
      location: "Quirófano 1",
      supervisor: "Dr. López",
      notes: "Extracción de terceros molares",
      medicalHistory: {
        allergies: "Látex",
        medications: "Ninguna",
        conditions: "Ninguna",
      },
      treatmentPlan: "Extracción quirúrgica bilateral",
      previousVisits: 1,
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
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Calendar className="h-3 w-3 mr-1" />
            Programada
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-800">
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

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "scheduled" || apt.status === "pending",
  )

  return (
    <ProtectedRoute requiredRoles={["estudiante"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mis Citas</h1>
            <p className="text-muted-foreground">Gestiona las citas con tus pacientes asignados</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Solicitar Nueva Cita
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "completed").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
              <User className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(appointments.map((a) => a.patientName)).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pacientes o especialidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="confirmed">Confirmadas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="scheduled">Programadas</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
            <TabsTrigger value="all">Todas las Citas</TabsTrigger>
            <TabsTrigger value="completed">Completadas</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4">
              {upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                            {getStatusBadge(appointment.status)}
                            {getTypeBadge(appointment.type)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{format(appointment.date, "dd/MM/yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {appointment.time} ({appointment.duration} min)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.supervisor}</span>
                            </div>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm">
                              <strong>Especialidad:</strong> {appointment.specialty}
                            </p>
                            <p className="text-sm">
                              <strong>Plan:</strong> {appointment.treatmentPlan}
                            </p>
                            {appointment.notes && (
                              <p className="text-sm">
                                <strong>Notas:</strong> {appointment.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Contactar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                          {getStatusBadge(appointment.status)}
                          {getTypeBadge(appointment.type)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{format(appointment.date, "dd/MM/yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {appointment.time} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.supervisor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {appointments
                .filter((appointment) => appointment.status === "completed")
                .map((appointment) => (
                  <Card key={appointment.id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                            {getStatusBadge(appointment.status)}
                            {getTypeBadge(appointment.type)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{format(appointment.date, "dd/MM/yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {appointment.time} ({appointment.duration} min)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{appointment.supervisor}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            Ver Reporte
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* View Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          {selectedAppointment && (
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Detalles de la Cita</DialogTitle>
                <DialogDescription>Información completa del paciente y la cita</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Patient Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información del Paciente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Nombre</p>
                        <p>{selectedAppointment.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Edad</p>
                        <p>{selectedAppointment.patientAge} años</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Teléfono</p>
                        <p>{selectedAppointment.patientPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p>{selectedAppointment.patientEmail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historia Médica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Alergias</p>
                        <p className="text-sm text-muted-foreground">{selectedAppointment.medicalHistory.allergies}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Medicamentos</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedAppointment.medicalHistory.medications}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Condiciones</p>
                        <p className="text-sm text-muted-foreground">{selectedAppointment.medicalHistory.conditions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detalles de la Cita</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Fecha y Hora</p>
                        <p>
                          {format(selectedAppointment.date, "dd/MM/yyyy")} - {selectedAppointment.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duración</p>
                        <p>{selectedAppointment.duration} minutos</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Especialidad</p>
                        <p>{selectedAppointment.specialty}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Supervisor</p>
                        <p>{selectedAppointment.supervisor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ubicación</p>
                        <p>{selectedAppointment.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Visitas Previas</p>
                        <p>{selectedAppointment.previousVisits}</p>
                      </div>
                    </div>
                    {selectedAppointment.notes && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Notas</p>
                        <p className="text-sm text-muted-foreground">{selectedAppointment.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
    </ProtectedRoute>
  )
}
