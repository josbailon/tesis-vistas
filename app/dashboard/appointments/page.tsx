"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  CalendarIcon,
  Clock,
  MapPin,
  User,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  ArrowRight,
  Star,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { StudentSelector } from "@/components/student-selector"
import { TimeSlotSelector } from "@/components/time-slot-selector"
import {
  type StudentProfile,
  type AppointmentType,
  type TimeSlot,
  appointmentTypes,
  getStudentsBySpecialty,
} from "@/lib/student-availability"

// Datos de ejemplo para las citas
const sampleAppointments = [
  {
    id: 1,
    patientName: "Ana García",
    date: new Date(2025, 4, 22, 10, 0),
    duration: 60,
    status: "confirmed",
    type: "Revisión",
    doctor: "Dr. Martínez",
    specialty: "Ortodoncia",
    notes: "Ajuste de brackets",
    location: "Consultorio 3",
  },
  {
    id: 2,
    patientName: "Carlos López",
    date: new Date(2025, 4, 23, 15, 30),
    duration: 45,
    status: "pending",
    type: "Primera Consulta",
    doctor: "Dra. Rodríguez",
    specialty: "Endodoncia",
    notes: "Evaluación inicial",
    location: "Consultorio 5",
  },
  {
    id: 3,
    patientName: "María Fernández",
    date: new Date(2025, 4, 24, 9, 0),
    duration: 90,
    status: "confirmed",
    type: "Tratamiento",
    doctor: "Dr. Sánchez",
    specialty: "Periodoncia",
    notes: "Limpieza profunda",
    location: "Consultorio 2",
  },
]

// Datos de ejemplo para horarios disponibles
const availableTimeSlots = [
  { time: "09:00", available: true },
  { time: "09:30", available: false },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: false },
  { time: "11:30", available: true },
  { time: "12:00", available: true },
  { time: "12:30", available: false },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: false },
  { time: "17:00", available: true },
]

// Datos de ejemplo para especialidades
const specialties = [
  { id: "ortodoncia", name: "Ortodoncia", description: "Corrección de la posición dental y maxilar", icon: "🦷" },
  { id: "endodoncia", name: "Endodoncia", description: "Tratamiento de conductos", icon: "🔬" },
  { id: "periodoncia", name: "Periodoncia", description: "Tratamiento de encías", icon: "🧠" },
  { id: "odontopediatria", name: "Odontopediatría", description: "Odontología para niños", icon: "👶" },
  { id: "cirugia", name: "Cirugía Oral", description: "Extracciones y cirugías", icon: "🔪" },
]

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [appointments, setAppointments] = useState(sampleAppointments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")
  const { user } = useAuth()

  const [selectedAppointmentType, setSelectedAppointmentType] = useState<AppointmentType | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null)
  const [availableStudents, setAvailableStudents] = useState<StudentProfile[]>([])
  const [bookingStep, setBookingStep] = useState<"specialty" | "student" | "datetime" | "confirm">("specialty")
  const [selectedTimeSlotObj, setSelectedTimeSlotObj] = useState<TimeSlot | null>(null)

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filtrar citas según la pestaña activa
  const filteredAppointments = appointments.filter((appointment) => {
    const today = new Date()
    if (activeTab === "upcoming") {
      return appointment.date >= today
    } else if (activeTab === "past") {
      return appointment.date < today
    }
    return true
  })

  // Función para manejar la selección de horario
  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time)
  }

  // Función para manejar la selección de especialidad
  const handleSpecialtySelect = (id: string) => {
    setSelectedSpecialty(id)
  }

  // Función para manejar la solicitud de cita
  const handleAppointmentRequest = () => {
    // Aquí iría la lógica para crear la cita
    console.log("Creando cita:", {
      appointmentType: selectedAppointmentType,
      student: selectedStudent,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    })

    // Resetear el formulario
    setBookingStep("specialty")
    setSelectedAppointmentType(null)
    setSelectedStudent(null)
    setSelectedDate(new Date())
    setSelectedTimeSlot(null)
    setIsDialogOpen(false)

    // Mostrar mensaje de éxito (aquí podrías usar un toast)
    alert("¡Cita solicitada exitosamente! Recibirás una confirmación pronto.")
  }

  const handleAppointmentTypeSelect = (type: AppointmentType) => {
    setSelectedAppointmentType(type)
    setSelectedSpecialty(type.specialty)
    const students = getStudentsBySpecialty(type.specialty)
    setAvailableStudents(students)
  }

  const handleStudentSelect = (student: StudentProfile) => {
    setSelectedStudent(student)
  }

  const handleTimeSlotSelectObj = (slot: TimeSlot) => {
    setSelectedTimeSlotObj(slot)
  }

  if (loading) {
    return <LoadingSpinner message="Cargando información de citas..." />
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        {/* Encabezado con información contextual */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">
              {user?.role === "patient" ? "Mis Citas Dentales" : "Gestión de Citas"}
            </h1>
            <p className="mt-2 max-w-2xl">
              {user?.role === "patient"
                ? "Consulta tus próximas citas, historial de visitas y solicita nuevas consultas con nuestros especialistas."
                : "Administra las citas de pacientes, consulta el calendario y gestiona los horarios disponibles."}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Panel principal con citas */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList className="grid w-[400px] grid-cols-2">
                  <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
                  <TabsTrigger value="past">Historial de Citas</TabsTrigger>
                </TabsList>
                {user?.role !== "patient" && (
                  <Button className="gap-2">
                    <Plus size={16} />
                    Nueva Cita
                  </Button>
                )}
              </div>

              <TabsContent value="upcoming" className="mt-6">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden">
                          <div
                            className={`h-2 w-full ${
                              appointment.status === "confirmed" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          ></div>
                          <CardContent className="p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-xl font-semibold">{appointment.type}</h3>
                                  <Badge
                                    variant={appointment.status === "confirmed" ? "default" : "outline"}
                                    className={
                                      appointment.status === "confirmed"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    }
                                  >
                                    {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5">
                                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>{format(appointment.date, "EEEE, d 'de' MMMM", { locale: es })}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {format(appointment.date, "h:mm a", { locale: es })} ({appointment.duration} min)
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 rounded-lg bg-muted/50 p-4 md:grid-cols-3">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Doctor</p>
                                  <p className="text-sm font-medium">{appointment.doctor}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Ubicación</p>
                                  <p className="text-sm font-medium">{appointment.location}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Notas</p>
                                  <p className="text-sm font-medium">{appointment.notes}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                              {user?.role !== "patient" ? (
                                <>
                                  <Button variant="outline" size="sm" className="gap-1">
                                    <Edit className="h-3.5 w-3.5" />
                                    Editar
                                  </Button>
                                  <Button variant="destructive" size="sm" className="gap-1">
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Cancelar
                                  </Button>
                                </>
                              ) : (
                                <Button variant="outline" size="sm" className="gap-1">
                                  <CalendarIcon className="h-3.5 w-3.5" />
                                  Añadir a Calendario
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-blue-100 p-3">
                        <CalendarIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="mt-4 text-xl font-medium">No tienes citas próximas</h3>
                      <p className="mt-2 text-center text-muted-foreground">
                        No hay citas programadas para los próximos días.
                      </p>
                      {user?.role === "patient" && (
                        <Button className="mt-6" onClick={() => setIsDialogOpen(true)}>
                          Solicitar Nueva Cita
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-semibold">{appointment.type}</h3>
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                  Completada
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center gap-1.5">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>{format(appointment.date, "EEEE, d 'de' MMMM", { locale: es })}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {format(appointment.date, "h:mm a", { locale: es })} ({appointment.duration} min)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              Ver Detalles
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-gray-100 p-3">
                        <FileText className="h-8 w-8 text-gray-600" />
                      </div>
                      <h3 className="mt-4 text-xl font-medium">No hay historial de citas</h3>
                      <p className="mt-2 text-center text-muted-foreground">
                        No se encontraron registros de citas anteriores.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Panel lateral con calendario y acciones rápidas */}
          <div className="space-y-6">
            {user?.role === "patient" && (
              <Card className="overflow-hidden">
                <CardHeader className="bg-blue-50 pb-3">
                  <CardTitle className="text-blue-700">Solicitar Nueva Cita</CardTitle>
                  <CardDescription>Programa una consulta con nuestros especialistas en pocos pasos</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Solicitar Cita
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Consulta la disponibilidad de citas</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  locale={es}
                  disabled={(date) => date < new Date()}
                />
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Disponible</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                    <span>No disponible</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información Útil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-800">Preparación para tu cita</h4>
                    <p className="text-sm text-amber-700">
                      Recuerda llegar 15 minutos antes de tu cita y traer tu identificación.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Cancelación de citas</h4>
                    <p className="text-sm text-green-700">
                      Puedes cancelar o reprogramar tu cita hasta 24 horas antes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Diálogo para solicitar nueva cita */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Solicitar Nueva Cita</DialogTitle>
              <DialogDescription>
                Sigue los pasos para programar tu cita con nuestros estudiantes especializados
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {/* Indicador de pasos */}
              <div className="mb-6 flex items-center justify-center space-x-4">
                {[
                  { step: "specialty", label: "Especialidad", icon: "🦷" },
                  { step: "student", label: "Estudiante", icon: "👨‍⚕️" },
                  { step: "datetime", label: "Fecha y Hora", icon: "📅" },
                  { step: "confirm", label: "Confirmar", icon: "✅" },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        bookingStep === item.step
                          ? "bg-blue-600 text-white"
                          : index < ["specialty", "student", "datetime", "confirm"].indexOf(bookingStep)
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="ml-2 text-sm font-medium">{item.label}</span>
                    {index < 3 && <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />}
                  </div>
                ))}
              </div>

              {/* Contenido según el paso */}
              {bookingStep === "specialty" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Selecciona el Tipo de Cita</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {appointmentTypes.map((type) => (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedAppointmentType?.id === type.id ? "border-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => {
                          handleAppointmentTypeSelect(type)
                          setBookingStep("student")
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{type.name}</h4>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                              <div className="mt-2 flex items-center gap-2 text-xs">
                                <Badge variant="outline">{type.duration} min</Badge>
                                <Badge variant="outline">{type.specialty}</Badge>
                                {type.estimatedCost > 0 && <Badge variant="outline">${type.estimatedCost}</Badge>}
                              </div>
                            </div>
                            {selectedAppointmentType?.id === type.id && (
                              <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === "student" && selectedAppointmentType && (
                <StudentSelector
                  students={availableStudents}
                  selectedStudent={selectedStudent}
                  onStudentSelect={(student) => {
                    handleStudentSelect(student)
                    setBookingStep("datetime")
                  }}
                />
              )}

              {bookingStep === "datetime" && selectedStudent && selectedAppointmentType && (
                <TimeSlotSelector
                  student={selectedStudent}
                  appointmentType={selectedAppointmentType}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlotObj}
                  onDateSelect={setSelectedDate}
                  onTimeSlotSelect={(slot) => {
                    handleTimeSlotSelectObj(slot)
                    setBookingStep("confirm")
                  }}
                />
              )}

              {bookingStep === "confirm" &&
                selectedStudent &&
                selectedAppointmentType &&
                selectedDate &&
                selectedTimeSlotObj && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Confirmar Cita</h3>

                    <Card>
                      <CardContent className="p-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h4 className="font-medium">Detalles de la Cita</h4>
                            <div className="mt-2 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tipo:</span>
                                <span>{selectedAppointmentType.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Duración:</span>
                                <span>{selectedAppointmentType.duration} minutos</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Fecha:</span>
                                <span>{format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Hora:</span>
                                <span>{format(selectedTimeSlotObj.start, "HH:mm")}</span>
                              </div>
                              {selectedAppointmentType.estimatedCost > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Costo estimado:</span>
                                  <span>${selectedAppointmentType.estimatedCost}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">Estudiante Asignado</h4>
                            <div className="mt-2 flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={selectedStudent.profileImage || "/placeholder.svg"}
                                  alt={selectedStudent.name}
                                />
                                <AvatarFallback>
                                  {selectedStudent.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{selectedStudent.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedStudent.specialty}</p>
                                <div className="flex items-center gap-1 text-xs">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {selectedStudent.rating} • {selectedStudent.completedCases} casos
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Label htmlFor="additional-notes">Notas Adicionales (Opcional)</Label>
                      <Textarea
                        id="additional-notes"
                        placeholder="Información adicional que consideres importante para tu cita"
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                )}
            </div>

            <DialogFooter className="flex justify-between">
              <div>
                {bookingStep !== "specialty" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const steps = ["specialty", "student", "datetime", "confirm"]
                      const currentIndex = steps.indexOf(bookingStep)
                      if (currentIndex > 0) {
                        setBookingStep(steps[currentIndex - 1] as any)
                      }
                    }}
                  >
                    Anterior
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>

                {bookingStep === "specialty" && selectedAppointmentType && (
                  <Button onClick={() => setBookingStep("student")}>Continuar</Button>
                )}

                {bookingStep === "student" && selectedStudent && (
                  <Button onClick={() => setBookingStep("datetime")}>Continuar</Button>
                )}

                {bookingStep === "datetime" && selectedDate && selectedTimeSlotObj && (
                  <Button onClick={() => setBookingStep("confirm")}>Continuar</Button>
                )}

                {bookingStep === "confirm" && <Button onClick={handleAppointmentRequest}>Confirmar Cita</Button>}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
