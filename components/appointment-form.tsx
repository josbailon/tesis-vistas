"use client"

import type React from "react"
import { useState } from "react"
import { X, Calendar, Clock, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppointments } from "@/contexts/appointment-context"
import { useToast } from "@/hooks/use-toast"

interface AppointmentFormProps {
  onClose: () => void
  onSuccess: () => void
  editingAppointment?: any
}

export function AppointmentForm({ onClose, onSuccess, editingAppointment }: AppointmentFormProps) {
  const { addAppointment, updateAppointment } = useAppointments()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: editingAppointment?.title || "",
    patientName: editingAppointment?.patientName || "",
    date: editingAppointment?.date || "",
    time: editingAppointment?.time || "",
    duration: editingAppointment?.duration || "30",
    type: editingAppointment?.type || "consultation",
    notes: editingAppointment?.notes || "",
    priority: editingAppointment?.priority || "medium",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "El título es requerido"
    if (!formData.patientName.trim()) newErrors.patientName = "El nombre del paciente es requerido"
    if (!formData.date) newErrors.date = "La fecha es requerida"
    if (!formData.time) newErrors.time = "La hora es requerida"

    // Check if date is in the past
    const selectedDate = new Date(`${formData.date}T${formData.time}`)
    if (selectedDate < new Date()) {
      newErrors.date = "No se pueden programar citas en el pasado"
    }

    // Check for weekend restrictions
    const dayOfWeek = selectedDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      newErrors.date = "No se pueden programar citas los fines de semana"
    }

    // Check business hours (8 AM to 6 PM)
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

    const appointmentData = {
      ...formData,
      id: editingAppointment?.id || Date.now().toString(),
      status: editingAppointment?.status || "programada",
      createdAt: editingAppointment?.createdAt || new Date().toISOString(),
    }

    try {
      if (editingAppointment) {
        updateAppointment(appointmentData)
        toast({
          title: "Cita Actualizada",
          description: "La cita ha sido actualizada exitosamente.",
        })
      } else {
        addAppointment(appointmentData)
        toast({
          title: "Cita Creada",
          description: "La cita ha sido programada exitosamente.",
        })
      }
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar la cita. Intenta nuevamente.",
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
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingAppointment ? "Editar Cita" : "Programar Nueva Cita"}</CardTitle>
              <CardDescription>
                Completa los detalles para {editingAppointment ? "actualizar" : "crear"} una cita
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  <FileText className="inline h-4 w-4 mr-1" />
                  Título de la Cita
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="ej. Consulta General"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientName">
                  <User className="inline h-4 w-4 mr-1" />
                  Nombre del Paciente
                </Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleChange("patientName", e.target.value)}
                  placeholder="Ingresa el nombre del paciente"
                  className={errors.patientName ? "border-red-500" : ""}
                />
                {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Fecha
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
                  Hora
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
                <Label htmlFor="duration">Duración (minutos)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="90">1.5 horas</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Type and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Cita</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consulta</SelectItem>
                    <SelectItem value="checkup">Revisión General</SelectItem>
                    <SelectItem value="treatment">Tratamiento</SelectItem>
                    <SelectItem value="followup">Seguimiento</SelectItem>
                    <SelectItem value="emergency">Emergencia</SelectItem>
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

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (Opcional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Notas adicionales o instrucciones especiales..."
                rows={3}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">{editingAppointment ? "Actualizar Cita" : "Programar Cita"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
