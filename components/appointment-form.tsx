"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Stethoscope, MapPin } from "lucide-react"
import { cn, getSpecialtyColor } from "@/lib/utils"

interface AppointmentFormProps {
  onSubmit?: (data: AppointmentData) => void
  initialData?: Partial<AppointmentData>
  mode?: "create" | "edit"
  userRole?: string
}

interface AppointmentData {
  patientName: string
  patientEmail: string
  patientPhone: string
  patientId?: string
  specialty: string
  professor?: string
  student?: string
  date: string
  time: string
  duration: string
  reason: string
  notes?: string
  priority: "low" | "medium" | "high" | "urgent"
  location: string
}

const specialties = [
  { id: "endodoncia", name: "Endodoncia", description: "Tratamiento de conductos" },
  { id: "ortodoncia", name: "Ortodoncia", description: "Corrección dental y facial" },
  { id: "cirugia", name: "Cirugía Oral", description: "Procedimientos quirúrgicos" },
  { id: "odontopediatria", name: "Odontopediatría", description: "Odontología infantil" },
  { id: "periodoncia", name: "Periodoncia", description: "Tratamiento de encías" },
  { id: "protesis", name: "Prótesis", description: "Rehabilitación oral" },
]

const professors = [
  { id: "prof1", name: "Dr. Carlos Ruiz", specialty: "endodoncia" },
  { id: "prof2", name: "Dra. Laura Martín", specialty: "ortodoncia" },
  { id: "prof3", name: "Dr. Roberto Silva", specialty: "cirugia" },
  { id: "prof4", name: "Dra. Carmen Vega", specialty: "odontopediatria" },
  { id: "prof5", name: "Dr. Ana García", specialty: "periodoncia" },
  { id: "prof6", name: "Dr. Luis Torres", specialty: "protesis" },
]

const students = [
  { id: "est1", name: "Juan Pérez", specialty: "endodoncia", professor: "prof1" },
  { id: "est2", name: "María González", specialty: "ortodoncia", professor: "prof2" },
  { id: "est3", name: "Carlos López", specialty: "cirugia", professor: "prof3" },
  { id: "est4", name: "Ana Rodríguez", specialty: "odontopediatria", professor: "prof4" },
  { id: "est5", name: "Pedro Martínez", specialty: "periodoncia", professor: "prof5" },
  { id: "est6", name: "Laura Sánchez", specialty: "protesis", professor: "prof6" },
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
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const durations = [
  { value: "30", label: "30 minutos" },
  { value: "60", label: "1 hora" },
  { value: "90", label: "1.5 horas" },
  { value: "120", label: "2 horas" },
]

const priorities = [
  { value: "low", label: "Baja", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Media", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "Alta", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "Urgente", color: "bg-red-100 text-red-800" },
]

const locations = [
  "Consultorio 1 - Endodoncia",
  "Consultorio 2 - Ortodoncia",
  "Consultorio 3 - Cirugía",
  "Consultorio 4 - Odontopediatría",
  "Consultorio 5 - Periodoncia",
  "Consultorio 6 - Prótesis",
  "Sala de Emergencias",
]

export default function AppointmentForm({
  onSubmit,
  initialData,
  mode = "create",
  userRole = "patient",
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentData>({
    patientName: initialData?.patientName || "",
    patientEmail: initialData?.patientEmail || "",
    patientPhone: initialData?.patientPhone || "",
    patientId: initialData?.patientId || "",
    specialty: initialData?.specialty || "",
    professor: initialData?.professor || "",
    student: initialData?.student || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    duration: initialData?.duration || "60",
    reason: initialData?.reason || "",
    notes: initialData?.notes || "",
    priority: initialData?.priority || "medium",
    location: initialData?.location || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.patientName.trim()) {
      newErrors.patientName = "El nombre del paciente es obligatorio"
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = "El email no es válido"
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = "El teléfono es obligatorio"
    }

    if (!formData.specialty) {
      newErrors.specialty = "Debe seleccionar una especialidad"
    }

    if (!formData.date) {
      newErrors.date = "La fecha es obligatoria"
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = "La fecha no puede ser anterior a hoy"
      }
    }

    if (!formData.time) {
      newErrors.time = "La hora es obligatoria"
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "El motivo de la consulta es obligatorio"
    }

    if (!formData.location) {
      newErrors.location = "Debe seleccionar una ubicación"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (onSubmit) {
        onSubmit(formData)
      }

      // Reset form if creating new appointment
      if (mode === "create") {
        setFormData({
          patientName: "",
          patientEmail: "",
          patientPhone: "",
          patientId: "",
          specialty: "",
          professor: "",
          student: "",
          date: "",
          time: "",
          duration: "60",
          reason: "",
          notes: "",
          priority: "medium",
          location: "",
        })
      }
    } catch (error) {
      console.error("Error submitting appointment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof AppointmentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const filteredProfessors = professors.filter((prof) => !formData.specialty || prof.specialty === formData.specialty)

  const filteredStudents = students.filter((student) => !formData.specialty || student.specialty === formData.specialty)

  const selectedSpecialty = specialties.find((s) => s.id === formData.specialty)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {mode === "create" ? "Agendar Nueva Cita" : "Editar Cita"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Complete el formulario para agendar una nueva cita médica"
            : "Modifique los datos de la cita médica"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4" />
              <h3 className="text-lg font-semibold">Información del Paciente</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nombre Completo *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  placeholder="Ej: Juan Pérez García"
                  className={errors.patientName ? "border-red-500" : ""}
                />
                {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientPhone">Teléfono *</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => handleInputChange("patientPhone", e.target.value)}
                  placeholder="Ej: 0999-123-456"
                  className={errors.patientPhone ? "border-red-500" : ""}
                />
                {errors.patientPhone && <p className="text-sm text-red-500">{errors.patientPhone}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="patientEmail">Correo Electrónico *</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => handleInputChange("patientEmail", e.target.value)}
                  placeholder="Ej: juan.perez@email.com"
                  className={errors.patientEmail ? "border-red-500" : ""}
                />
                {errors.patientEmail && <p className="text-sm text-red-500">{errors.patientEmail}</p>}
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="h-4 w-4" />
              <h3 className="text-lg font-semibold">Información Médica</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad *</Label>
                <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
                  <SelectTrigger className={errors.specialty ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.id}>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-3 h-3 rounded-full", getSpecialtyColor(specialty.id))} />
                          <div>
                            <div className="font-medium">{specialty.name}</div>
                            <div className="text-xs text-muted-foreground">{specialty.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.specialty && <p className="text-sm text-red-500">{errors.specialty}</p>}
                {selectedSpecialty && (
                  <Badge className={getSpecialtyColor(selectedSpecialty.id)}>{selectedSpecialty.name}</Badge>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange("priority", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={priority.color}>{priority.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {userRole !== "patient" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="professor">Profesor Supervisor</Label>
                    <Select
                      value={formData.professor}
                      onValueChange={(value) => handleInputChange("professor", value)}
                      disabled={!formData.specialty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar profesor" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredProfessors.map((professor) => (
                          <SelectItem key={professor.id} value={professor.id}>
                            {professor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student">Estudiante Asignado</Label>
                    <Select
                      value={formData.student}
                      onValueChange={(value) => handleInputChange("student", value)}
                      disabled={!formData.specialty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estudiante" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4" />
              <h3 className="text-lg font-semibold">Detalles de la Cita</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={errors.date ? "border-red-500" : ""}
                />
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                  <SelectTrigger className={errors.time ? "border-red-500" : ""}>
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
                {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar duración" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                <SelectTrigger className={errors.location ? "border-red-500" : ""}>
                  <SelectValue placeholder="Seleccionar consultorio" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo de la Consulta *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                placeholder="Describa el motivo de la consulta..."
                rows={3}
                className={errors.reason ? "border-red-500" : ""}
              />
              {errors.reason && <p className="text-sm text-red-500">{errors.reason}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Información adicional relevante..."
                rows={2}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : mode === "create" ? "Agendar Cita" : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
