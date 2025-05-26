"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { UleamBranding } from "@/components/uleam-branding"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  type StudentProfile,
  type AppointmentType,
  type TimeSlot,
  appointmentTypes,
  getStudentsBySpecialty,
} from "@/lib/student-availability"
import { CheckCircle2, ArrowRight, Star, ArrowLeft, Info, Stethoscope } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SpecializationGrid } from "@/components/specialization-grid"
import { StudentSelectionInterface } from "@/components/student-selection-interface"
import { TimeSlotBookingInterface } from "@/components/time-slot-booking-interface"

export default function BookAppointmentPage() {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<AppointmentType | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [availableStudents, setAvailableStudents] = useState<StudentProfile[]>([])
  const [bookingStep, setBookingStep] = useState<"specialty" | "student" | "datetime" | "confirm">("specialty")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const { user } = useAuth()

  // Función para manejar la selección de tipo de cita
  const handleAppointmentTypeSelect = (type: AppointmentType) => {
    setSelectedAppointmentType(type)
    const students = getStudentsBySpecialty(type.specialty)
    setAvailableStudents(students)
  }

  // Función para manejar la selección de estudiante
  const handleStudentSelect = (student: StudentProfile) => {
    setSelectedStudent(student)
  }

  // Función para manejar la selección de horario
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot)
  }

  // Función para confirmar la cita
  const handleConfirmAppointment = async () => {
    setLoading(true)

    // Simular proceso de creación de cita
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Aquí iría la lógica para crear la cita en la base de datos
    console.log("Creando cita:", {
      appointmentType: selectedAppointmentType,
      student: selectedStudent,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes: additionalNotes,
      patient: user,
    })

    // Resetear el formulario
    setBookingStep("specialty")
    setSelectedAppointmentType(null)
    setSelectedStudent(null)
    setSelectedDate(new Date())
    setSelectedTimeSlot(null)
    setAdditionalNotes("")
    setLoading(false)

    // Mostrar mensaje de éxito
    alert("¡Cita solicitada exitosamente! Recibirás una confirmación por correo electrónico.")
  }

  // Función para ir al paso anterior
  const goToPreviousStep = () => {
    const steps = ["specialty", "student", "datetime", "confirm"]
    const currentIndex = steps.indexOf(bookingStep)
    if (currentIndex > 0) {
      setBookingStep(steps[currentIndex - 1] as any)
    }
  }

  // Función para ir al siguiente paso
  const goToNextStep = () => {
    const steps = ["specialty", "student", "datetime", "confirm"]
    const currentIndex = steps.indexOf(bookingStep)
    if (currentIndex < steps.length - 1) {
      setBookingStep(steps[currentIndex + 1] as any)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Procesando tu solicitud de cita..." />
  }

  return (
    <ProtectedRoute requiredRoles={["patient"]}>
      <div className="space-y-8">
        {/* Encabezado con branding ULEAM */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 p-8 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <UleamBranding variant="header" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight">Reservar Nueva Cita</h2>
                <p className="mt-2 max-w-2xl text-blue-100">
                  Programa tu cita con nuestros estudiantes especializados de la Universidad Laica Eloy Alfaro de Manabí
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-blue-200">
                  <div className="flex items-center gap-1">
                    <Stethoscope className="h-4 w-4" />
                    <span>Atención Profesional</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Supervisión Docente</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>Tecnología Avanzada</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="rounded-full bg-white/20 p-6">
                  <Stethoscope className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de progreso mejorado */}
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {[
                { step: "specialty", label: "Especialidad", icon: "🦷", description: "Tipo de tratamiento" },
                { step: "student", label: "Especialista", icon: "👨‍⚕️", description: "Estudiante ULEAM" },
                { step: "datetime", label: "Fecha y Hora", icon: "📅", description: "Horario disponible" },
                { step: "confirm", label: "Confirmar", icon: "✅", description: "Finalizar reserva" },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-lg transition-all ${
                      bookingStep === item.step
                        ? "bg-blue-600 text-white shadow-lg scale-110"
                        : index < ["specialty", "student", "datetime", "confirm"].indexOf(bookingStep)
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="mx-4 hidden sm:block">
                      <ArrowRight
                        className={`h-5 w-5 ${
                          index < ["specialty", "student", "datetime", "confirm"].indexOf(bookingStep)
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contenido principal */}
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* Paso 1: Selección de especialidad */}
            {bookingStep === "specialty" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <SpecializationGrid
                  onSpecializationSelect={(spec) => {
                    // Find the appointment type that matches the specialization
                    const matchingType = appointmentTypes.find((type) => type.specialty === spec.name)
                    if (matchingType) {
                      handleAppointmentTypeSelect(matchingType)
                      setBookingStep("student")
                    }
                  }}
                  selectedSpecialization={
                    selectedAppointmentType
                      ? {
                          id: selectedAppointmentType.specialty.toLowerCase().replace(/\s+/g, "-"),
                          name: selectedAppointmentType.specialty,
                          icon: "🦷",
                          description: selectedAppointmentType.description,
                          color: "blue",
                          gradient: "from-blue-500 to-cyan-600",
                          studentCount: availableStudents.length,
                          avgDuration: `${selectedAppointmentType.duration} min`,
                          treatments: [selectedAppointmentType.name],
                          benefits: ["Atención supervisada", "Servicio gratuito", "Tecnología moderna"],
                        }
                      : null
                  }
                />
              </motion.div>
            )}

            {/* Paso 2: Selección de estudiante */}
            {bookingStep === "student" && selectedAppointmentType && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <StudentSelectionInterface
                  students={availableStudents}
                  selectedStudent={selectedStudent}
                  onStudentSelect={handleStudentSelect}
                  specialtyName={selectedAppointmentType.specialty}
                />
              </motion.div>
            )}

            {/* Paso 3: Selección de fecha y hora */}
            {bookingStep === "datetime" && selectedStudent && selectedAppointmentType && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <TimeSlotBookingInterface
                  student={selectedStudent}
                  appointmentType={selectedAppointmentType}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onDateSelect={setSelectedDate}
                  onTimeSlotSelect={handleTimeSlotSelect}
                />
              </motion.div>
            )}

            {/* Paso 4: Confirmación */}
            {bookingStep === "confirm" &&
              selectedStudent &&
              selectedAppointmentType &&
              selectedDate &&
              selectedTimeSlot && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Confirmar Cita en ULEAM
                      </CardTitle>
                      <CardDescription>Revisa los detalles de tu cita antes de confirmar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Resumen de la cita */}
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg border-b pb-2">Detalles de la Cita</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <span className="text-sm text-muted-foreground">Tipo:</span>
                              <span className="font-medium">{selectedAppointmentType.name}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                              <span className="text-sm text-muted-foreground">Especialidad:</span>
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                {selectedAppointmentType.specialty}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                              <span className="text-sm text-muted-foreground">Duración:</span>
                              <span className="font-medium">{selectedAppointmentType.duration} minutos</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                              <span className="text-sm text-muted-foreground">Fecha:</span>
                              <span className="font-medium">
                                {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                              <span className="text-sm text-muted-foreground">Hora:</span>
                              <span className="font-medium">
                                {format(selectedTimeSlot.start, "HH:mm")} - {format(selectedTimeSlot.end, "HH:mm")}
                              </span>
                            </div>
                            {selectedAppointmentType.estimatedCost > 0 ? (
                              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                <span className="text-sm text-muted-foreground">Costo estimado:</span>
                                <span className="font-medium text-red-600">
                                  ${selectedAppointmentType.estimatedCost}
                                </span>
                              </div>
                            ) : (
                              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                <span className="text-sm text-muted-foreground">Costo:</span>
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Gratuito
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg border-b pb-2">Estudiante Asignado</h4>
                          <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                                <AvatarImage
                                  src={selectedStudent.profileImage || "/placeholder.svg"}
                                  alt={selectedStudent.name}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-green-600 text-white text-lg">
                                  {selectedStudent.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-semibold text-lg">{selectedStudent.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedStudent.specialty}</p>
                                <div className="flex items-center gap-2 text-sm mt-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{selectedStudent.rating}</span>
                                  </div>
                                  <span className="text-muted-foreground">•</span>
                                  <span>{selectedStudent.completedCases} casos completados</span>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    Semestre {selectedStudent.semester}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {selectedStudent.experience === "advanced"
                                      ? "Avanzado"
                                      : selectedStudent.experience === "intermediate"
                                        ? "Intermedio"
                                        : "Principiante"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Notas adicionales */}
                      <div className="space-y-3">
                        <Label htmlFor="additional-notes" className="text-base font-medium">
                          Notas Adicionales (Opcional)
                        </Label>
                        <Textarea
                          id="additional-notes"
                          placeholder="Información adicional que consideres importante para tu cita (síntomas, alergias, medicamentos, etc.)"
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>

                      {/* Información importante */}
                      <Alert className="border-blue-200 bg-blue-50">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          <strong>Información importante:</strong> Tu solicitud será revisada por el personal de la
                          Clínica Dental ULEAM y recibirás una confirmación por correo electrónico o teléfono dentro de
                          las próximas 24 horas. Recuerda llegar 15 minutos antes de tu cita con tu cédula de identidad.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
          </div>

          {/* Panel lateral con información */}
          <div className="space-y-6">
            {/* Progreso actual */}
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Tu Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${selectedAppointmentType ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <span className="text-sm">Tipo de cita seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${selectedStudent ? "bg-green-500" : "bg-gray-300"}`}></div>
                  <span className="text-sm">Estudiante seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${selectedTimeSlot ? "bg-green-500" : "bg-gray-300"}`}></div>
                  <span className="text-sm">Fecha y hora seleccionadas</span>
                </div>
              </CardContent>
            </Card>

            {/* Información de ULEAM */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <UleamBranding variant="sidebar" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="font-medium text-blue-900">Clínica Dental Universitaria</p>
                  <p className="text-muted-foreground">
                    Atención odontológica de calidad con estudiantes supervisados por docentes especializados.
                  </p>
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Supervisión profesional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Equipos modernos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Precios accesibles</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">¿Necesitas Ayuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Si tienes preguntas sobre el proceso de reserva, contáctanos:
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Teléfono:</strong> (05) 2623-740
                  </p>
                  <p>
                    <strong>Email:</strong> clinica.dental@uleam.edu.ec
                  </p>
                  <p>
                    <strong>Horario:</strong> Lun-Vie 8:00-18:00
                  </p>
                  <p>
                    <strong>Dirección:</strong> Av. Circunvalación, Manta, Manabí
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between">
          <div>
            {bookingStep !== "specialty" && (
              <Button variant="outline" onClick={goToPreviousStep} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {bookingStep === "specialty" && selectedAppointmentType && (
              <Button onClick={goToNextStep} className="gap-2 bg-blue-600 hover:bg-blue-700">
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {bookingStep === "student" && selectedStudent && (
              <Button onClick={goToNextStep} className="gap-2 bg-green-600 hover:bg-green-700">
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {bookingStep === "datetime" && selectedDate && selectedTimeSlot && (
              <Button onClick={goToNextStep} className="gap-2 bg-purple-600 hover:bg-purple-700">
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {bookingStep === "confirm" && (
              <Button
                onClick={handleConfirmAppointment}
                className="gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmar Cita
              </Button>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
