"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, Stethoscope, X, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AppointmentFormProps {
  onClose: () => void
  onSuccess: () => void
  appointment?: any
}

export function AppointmentForm({ onClose, onSuccess, appointment }: AppointmentFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    patientName: appointment?.patientName || "",
    patientPhone: appointment?.patientPhone || "",
    patientEmail: appointment?.patientEmail || "",
    appointmentType: appointment?.type || "",
    specialty: appointment?.specialty || "",
    date: appointment?.date || "",
    time: appointment?.time || "",
    duration: appointment?.duration || "60",
    notes: appointment?.notes || "",
    priority: appointment?.priority || "normal",
    student: appointment?.student || "",
    professor: appointment?.professor || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.patientName || !formData.date || !formData.time || !formData.appointmentType) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos requeridos",
          variant: "destructive",
        })
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create appointment object
      const appointmentData = {
        id: appointment?.id || `apt_${Date.now()}`,
        ...formData,
        status: appointment?.status || "pending",
        createdAt: appointment?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log("Appointment saved:", appointmentData)

      toast({
        title: "¡Éxito!",
        description: appointment ? "Cita actualizada correctamente" : "Cita creada correctamente",
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving appointment:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar la cita. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {appointment ? "Editar Cita" : "Nueva Cita"}
              </CardTitle>
              <CardDescription>
                {appointment
                  ? "Modifica los detalles de la cita"
                  : "Completa la información para programar una nueva cita"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Información del Paciente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Nombre Completo *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange("patientName", e.target.value)}
                    placeholder="Nombre del paciente"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="patientPhone">Teléfono</Label>
                  <Input
                    id="patientPhone"
                    value={formData.patientPhone}
                    onChange={(e) => handleInputChange("patientPhone", e.target.value)}
                    placeholder="Número de teléfono"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="patientEmail">Correo Electrónico</Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) => handleInputChange("patientEmail", e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Detalles de la Cita
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="appointmentType">Tipo de Cita *</Label>
                  <Select
                    value={formData.appointmentType}
                    onValueChange={(value) => handleInputChange("appointmentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consulta</SelectItem>
                      <SelectItem value="treatment">Tratamiento</SelectItem>
                      <SelectItem value="followup">Seguimiento</SelectItem>
                      <SelectItem value="emergency">Emergencia</SelectItem>
                      <SelectItem value="cleaning">Limpieza</SelectItem>
                      <SelectItem value="checkup">Revisión</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Odontología General</SelectItem>
                      <SelectItem value="endodoncia">Endodoncia</SelectItem>
                      <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                      <SelectItem value="periodoncia">Periodoncia</SelectItem>
                      <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                      <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Fecha *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Hora *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duración (minutos)</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="90">1.5 horas</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Asignación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="student">Estudiante Asignado</Label>
                  <Select value={formData.student} onValueChange={(value) => handleInputChange("student", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estudiante" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="juan_perez">Juan Pérez</SelectItem>
                      <SelectItem value="maria_lopez">María López</SelectItem>
                      <SelectItem value="carlos_rodriguez">Carlos Rodríguez</SelectItem>
                      <SelectItem value="ana_garcia">Ana García</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="professor">Profesor Supervisor</Label>
                  <Select value={formData.professor} onValueChange={(value) => handleInputChange("professor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar profesor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr_martinez">Dr. Martínez</SelectItem>
                      <SelectItem value="dra_rodriguez">Dra. Rodríguez</SelectItem>
                      <SelectItem value="dr_sanchez">Dr. Sánchez</SelectItem>
                      <SelectItem value="dra_lopez">Dra. López</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Información adicional sobre la cita..."
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Guardando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {appointment ? "Actualizar" : "Crear"} Cita
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
