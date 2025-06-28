"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, User, AlertCircle, CheckCircle } from "lucide-react"
import { cn, getSpecialtyColor } from "@/lib/utils"

interface AppointmentFormProps {
  patientId?: string
  studentId?: string
  onSubmit?: (appointment: any) => void
  mode?: "patient" | "secretary" | "student"
}

export function AppointmentForm({ patientId, studentId, onSubmit, mode = "patient" }: AppointmentFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    emergencyContact: "",
    allergies: "",
    medications: "",
    previousTreatments: "",
  })
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const specialties = [
    { id: "endodoncia", name: "Endodoncia", description: "Tratamientos de conducto" },
    { id: "ortodoncia", name: "Ortodoncia", description: "Corrección dental" },
    { id: "cirugia", name: "Cirugía Oral", description: "Extracciones y cirugías" },
    { id: "odontopediatria", name: "Odontopediatría", description: "Atención infantil" },
    { id: "periodoncia", name: "Periodoncia", description: "Encías y soporte dental" },
    { id: "protesis", name: "Prótesis", description: "Rehabilitación dental" },
  ]

  const students = [
    { id: "s1", name: "Pedro Gómez", specialty: "endodoncia", semester: 8, rating: 4.8 },
    { id: "s2", name: "Laura Torres", specialty: "ortodoncia", semester: 7, rating: 4.6 },
    { id: "s3", name: "Miguel Sánchez", specialty: "periodoncia", semester: 9, rating: 4.9 },
    { id: "s4", name: "Carmen Díaz", specialty: "cirugia", semester: 6, rating: 4.5 },
    { id: "s5", name: "Javier Ruiz", specialty: "odontopediatria", semester: 8, rating: 4.7 },
  ]

  const appointmentTypes = [
    { id: "consultation", name: "Consulta General", duration: 30, description: "Evaluación inicial" },
    { id: "treatment", name: "Tratamiento", duration: 60, description: "Procedimiento específico" },
    { id: "followup", name: "Seguimiento", duration: 30, description: "Control post-tratamiento" },
    { id: "emergency", name: "Emergencia", duration: 45, description: "Atención urgente" },
    { id: "cleaning", name: "Limpieza", duration: 45, description: "Profilaxis dental" },
    { id: "checkup", name: "Revisión", duration: 30, description: "Control rutinario" },
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

  const availableStudents = selectedSpecialty ? students.filter((s) => s.specialty === selectedSpecialty) : students

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const appointmentData = {
        patientId: patientId || "new",
        studentId: selectedStudent,
        specialty: selectedSpecialty,
        type: appointmentType,
        date: selectedDate,
        time: selectedTime,
        isUrgent,
        patientInfo: mode === "secretary" ? patientInfo : undefined,
        notes,
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular API call

      onSubmit?.(appointmentData)

      // Reset form
      setSelectedDate(undefined)
      setSelectedTime("")
      setSelectedSpecialty("")
      setSelectedStudent("")
      setAppointmentType("")
      setIsUrgent(false)
      setNotes("")
      setPatientInfo({
        name: "",
        phone: "",
        email: "",
        age: "",
        emergencyContact: "",
        allergies: "",
        medications: "",
        previousTreatments: "",
      })
    } catch (error) {
      console.error("Error al agendar cita:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Agendar Nueva Cita
        </CardTitle>
        <CardDescription>
          {mode === "patient" && "Solicita una cita con nuestros estudiantes supervisados"}
          {mode === "secretary" && "Registra una nueva cita para un paciente"}
          {mode === "student" && "Programa una cita con tu paciente"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Paciente (solo para secretarios) */}
          {mode === "secretary" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Información del Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Nombre Completo *</Label>
                    <Input
                      id="patientName"
                      placeholder="Nombre del paciente"
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientAge">Edad</Label>
                    <Input
                      id="patientAge"
                      type="number"
                      placeholder="Edad"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientPhone">Teléfono *</Label>
                    <Input
                      id="patientPhone"
                      placeholder="0999-123-456"
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientEmail">Correo Electrónico</Label>
                    <Input
                      id="patientEmail"
                      type="email"
                      placeholder="paciente@email.com"
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Nombre y teléfono de contacto de emergencia"
                    value={patientInfo.emergencyContact}
                    onChange={(e) => setPatientInfo({ ...patientInfo, emergencyContact: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Alergias</Label>
                    <Textarea
                      id="allergies"
                      placeholder="Alergias conocidas..."
                      value={patientInfo.allergies}
                      onChange={(e) => setPatientInfo({ ...patientInfo, allergies: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications">Medicamentos</Label>
                    <Textarea
                      id="medications"
                      placeholder="Medicamentos actuales..."
                      value={patientInfo.medications}
                      onChange={(e) => setPatientInfo({ ...patientInfo, medications: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selección de Especialidad */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Especialidad Requerida *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specialties.map((specialty) => (
                <Card
                  key={specialty.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedSpecialty === specialty.id && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedSpecialty(specialty.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{specialty.name}</h3>
                        <Badge className={getSpecialtyColor(specialty.id)}>{specialty.id}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{specialty.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Selección de Estudiante */}
          {selectedSpecialty && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Estudiante Asignado *</Label>
              <div className="grid gap-4">
                {availableStudents.map((student) => (
                  <Card
                    key={student.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedStudent === student.id && "ring-2 ring-primary",
                    )}
                    onClick={() => setSelectedStudent(student.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {student.semester}° Semestre • Calificación: {student.rating}/5.0
                          </p>
                        </div>
                        <Badge className={getSpecialtyColor(student.specialty)}>{student.specialty}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tipo de Cita */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Tipo de Cita *</Label>
            <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {appointmentTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id} className="cursor-pointer">
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {type.duration} min • {type.description}
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Fecha y Hora */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Fecha *</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Hora *</Label>
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="justify-center"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Opciones Adicionales */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
              <Label htmlFor="urgent" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Marcar como urgente
              </Label>
            </div>
          </div>

          {/* Notas Adicionales */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Describe el motivo de la consulta, síntomas, o cualquier información relevante..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Resumen de la Cita */}
          {selectedDate && selectedTime && selectedSpecialty && selectedStudent && appointmentType && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Resumen de la Cita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Fecha:</span>
                    <p>
                      {selectedDate.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Hora:</span>
                    <p>{selectedTime}</p>
                  </div>
                  <div>
                    <span className="font-medium">Especialidad:</span>
                    <p>{specialties.find((s) => s.id === selectedSpecialty)?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Estudiante:</span>
                    <p>{students.find((s) => s.id === selectedStudent)?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span>
                    <p>{appointmentTypes.find((t) => t.id === appointmentType)?.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Duración:</span>
                    <p>{appointmentTypes.find((t) => t.id === appointmentType)?.duration} minutos</p>
                  </div>
                </div>
                {isUrgent && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Cita marcada como urgente</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                !selectedDate ||
                !selectedTime ||
                !selectedSpecialty ||
                !selectedStudent ||
                !appointmentType ||
                isSubmitting
              }
            >
              {isSubmitting ? "Agendando..." : "Agendar Cita"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
