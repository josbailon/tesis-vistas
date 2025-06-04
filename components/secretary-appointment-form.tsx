"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface SecretaryAppointmentFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function SecretaryAppointmentForm({ onClose, onSuccess }: SecretaryAppointmentFormProps) {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientAge: "",
    specialty: "",
    student: "",
    date: "",
    time: "",
    duration: "60",
    priority: "medium",
    notes: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock data para especialidades y estudiantes
  const specialties = [
    { id: "endodoncia", name: "Endodoncia" },
    { id: "ortodoncia", name: "Ortodoncia" },
    { id: "cirugia", name: "Cirugía Oral" },
    { id: "pediatria", name: "Odontopediatría" },
    { id: "periodoncia", name: "Periodoncia" },
  ]

  const students = [
    { id: "1", name: "Carlos Pérez", specialty: "endodoncia", available: true },
    { id: "2", name: "María González", specialty: "ortodoncia", available: true },
    { id: "3", name: "José Martínez", specialty: "cirugia", available: false },
    { id: "4", name: "Ana Torres", specialty: "pediatria", available: true },
    { id: "5", name: "Luis Ramírez", specialty: "periodoncia", available: true },
  ]

  const availableStudents = students.filter((student) => student.specialty === formData.specialty && student.available)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.patientName.trim()) newErrors.patientName = "El nombre del paciente es requerido"
    if (!formData.patientPhone.trim()) newErrors.patientPhone = "El teléfono es requerido"
    if (!formData.specialty) newErrors.specialty = "La especialidad es requerida"
    if (!formData.student) newErrors.student = "El estudiante es requerido"
    if (!formData.date) newErrors.date = "La fecha es requerida"
    if (!formData.time) newErrors.time = "La hora es requerida"

    // Validar formato de teléfono (básico)
    const phoneRegex = /^[0-9]{10}$/
    if (formData.patientPhone && !phoneRegex.test(formData.patientPhone.replace(/\D/g, ""))) {
      newErrors.patientPhone = "Formato de teléfono inválido (10 dígitos)"
    }

    // Validar email si se proporciona
    if (formData.patientEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.patientEmail)) {
        newErrors.patientEmail = "Formato de email inválido"
      }
    }

    // Validar fecha
    const selectedDate = new Date(`${formData.date}T${formData.time}`)
    if (selectedDate < new Date()) {
      newErrors.date = "No se pueden programar citas en el pasado"
    }

    const dayOfWeek = selectedDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      newErrors.date = "No se pueden programar citas los fines de semana"
    }

    const hour = selectedDate.getHours()
    if (hour < 8 || hour >= 18) {
      newErrors.time = "Las citas deben ser entre 8:00 AM y 6:00 PM"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      // Aquí iría la lógica para guardar la cita
      console.log("Cita agendada:", formData)

      toast({
        title: "Cita Agendada",
        description: `Cita programada para ${formData.patientName} el ${formData.date} a las ${formData.time}`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al agendar la cita. Intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agendar Nueva Cita</CardTitle>
              <CardDescription>Programa una cita para un paciente con un estudiante disponible</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información del Paciente */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Información del Paciente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">
                    <User className="inline h-4 w-4 mr-1" />
                    Nombre Completo *
                  </Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleChange("patientName", e.target.value)}
                    placeholder="Nombre completo del paciente"
                    className={errors.patientName ? "border-red-500" : ""}
                  />
                  {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientAge">Edad</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    value={formData.patientAge}
                    onChange={(e) => handleChange("patientAge", e.target.value)}
                    placeholder="Edad del paciente"
                    min="1"
                    max="120"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientPhone">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Teléfono *
                  </Label>
                  <Input
                    id="patientPhone"
                    value={formData.patientPhone}
                    onChange={(e) => handleChange("patientPhone", e.target.value)}
                    placeholder="0987654321"
                    className={errors.patientPhone ? "border-red-500" : ""}
                  />
                  {errors.patientPhone && <p className="text-sm text-red-500">{errors.patientPhone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patientEmail">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email (Opcional)
                  </Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) => handleChange("patientEmail", e.target.value)}
                    placeholder="paciente@email.com"
                    className={errors.patientEmail ? "border-red-500" : ""}
                  />
                  {errors.patientEmail && <p className="text-sm text-red-500">{errors.patientEmail}</p>}
                </div>
              </div>

              {/* Contacto de Emergencia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange("emergencyContact", e.target.value)}
                    placeholder="Nombre del contacto de emergencia"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                    placeholder="0987654321"
                  />
                </div>
              </div>
            </div>

            {/* Información de la Cita */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800">Información de la Cita</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Especialidad *
                  </Label>
                  <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
                    <SelectTrigger className={errors.specialty ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona una especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.id} value={specialty.id}>
                          {specialty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.specialty && <p className="text-sm text-red-500">{errors.specialty}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student">Estudiante Asignado *</Label>
                  <Select
                    value={formData.student}
                    onValueChange={(value) => handleChange("student", value)}
                    disabled={!formData.specialty}
                  >
                    <SelectTrigger className={errors.student ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona un estudiante" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} {!student.available && "(No disponible)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.student && <p className="text-sm text-red-500">{errors.student}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Fecha *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={errors.date ? "border-red-500" : ""}
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Hora *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    min="08:00"
                    max="18:00"
                    className={errors.time ? "border-red-500" : ""}
                  />
                  {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duración</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="90">1.5 horas</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
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
            </div>

            {/* Notas */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Información adicional sobre la cita, síntomas, etc..."
                rows={3}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Agendar Cita</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
