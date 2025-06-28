"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"
import { useAppointments } from "@/contexts/appointment-context"

const STUDENTS = [
  { id: "1", name: "Juan Pérez", specialties: ["Endodoncia", "Ortodoncia"] },
  { id: "2", name: "María García", specialties: ["Periodoncia", "Cirugía"] },
  { id: "3", name: "Carlos López", specialties: ["Endodoncia", "Prótesis"] },
  { id: "4", name: "Ana Rodríguez", specialties: ["Ortodoncia", "Pediatría"] },
]

const SPECIALTIES = ["Endodoncia", "Ortodoncia", "Periodoncia", "Cirugía", "Prótesis", "Pediatría", "Implantología"]

const TIME_SLOTS = [
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
  "18:00",
]

export default function CreateAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addAppointment } = useAppointments()

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientCedula: "",
    studentId: "",
    specialty: "",
    date: undefined as Date | undefined,
    time: "",
    duration: "30",
    type: "checkup",
    notes: "",
    priority: "medium",
  })

  const [availableStudents, setAvailableStudents] = useState(STUDENTS)

  const handleSpecialtyChange = (specialty: string) => {
    setFormData((prev) => ({ ...prev, specialty, studentId: "" }))
    // Filter students by specialty
    const filtered = STUDENTS.filter((student) => student.specialties.includes(specialty))
    setAvailableStudents(filtered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.patientName || !formData.studentId || !formData.specialty || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    const selectedStudent = STUDENTS.find((s) => s.id === formData.studentId)

    const newAppointment = {
      id: Date.now().toString(),
      title: `${formData.specialty} - ${formData.patientName}`,
      patientName: formData.patientName,
      date: format(formData.date, "yyyy-MM-dd"),
      time: formData.time,
      duration: formData.duration,
      type: formData.type,
      notes: formData.notes,
      priority: formData.priority,
      status: "programada" as const,
      createdAt: new Date().toISOString(),
      studentName: selectedStudent?.name || "",
      specialty: formData.specialty,
      patientPhone: formData.patientPhone,
      patientEmail: formData.patientEmail,
      patientCedula: formData.patientCedula,
    }

    addAppointment(newAppointment)

    toast({
      title: "Cita creada",
      description: "La cita ha sido programada exitosamente",
    })

    router.push("/dashboard/secretary/appointments")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Cita</h1>
          <p className="text-gray-600">Programa una nueva cita para un paciente</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Información de la Cita
          </CardTitle>
          <CardDescription>Complete todos los campos para programar la cita</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nombre del Paciente *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, patientName: e.target.value }))}
                  placeholder="Nombre completo del paciente"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientCedula">Cédula</Label>
                <Input
                  id="patientCedula"
                  value={formData.patientCedula}
                  onChange={(e) => setFormData((prev) => ({ ...prev, patientCedula: e.target.value }))}
                  placeholder="1234567890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientPhone">Teléfono</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, patientPhone: e.target.value }))}
                  placeholder="+593 99 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientEmail">Email</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, patientEmail: e.target.value }))}
                  placeholder="paciente@email.com"
                />
              </div>
            </div>

            {/* Specialty and Student Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad *</Label>
                <Select value={formData.specialty} onValueChange={handleSpecialtyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="student">Estudiante Asignado *</Label>
                <Select
                  value={formData.studentId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, studentId: value }))}
                  disabled={!formData.specialty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.specialty && availableStudents.length === 0 && (
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    No hay estudiantes disponibles para esta especialidad
                  </p>
                )}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Fecha *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (min)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="90">1.5 horas</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Cita</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Consulta General</SelectItem>
                    <SelectItem value="treatment">Tratamiento</SelectItem>
                    <SelectItem value="emergency">Emergencia</SelectItem>
                    <SelectItem value="followup">Seguimiento</SelectItem>
                    <SelectItem value="cleaning">Limpieza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Información adicional sobre la cita..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Programar Cita
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
