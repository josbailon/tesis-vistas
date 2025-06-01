"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useAppointments } from "@/contexts/appointment-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, isBefore, isAfter, isWeekend, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface AppointmentFormProps {
  appointmentId?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function AppointmentForm({ appointmentId, onSuccess, onCancel }: AppointmentFormProps) {
  const { user } = useAuth()
  const { appointments, addAppointment, updateAppointment } = useAppointments()
  const { toast } = useToast()

  // Si hay un ID, buscar la cita para editar
  const appointmentToEdit = appointmentId ? appointments.find((a) => a.id === appointmentId) : undefined

  // Estados del formulario
  const [patientName, setPatientName] = useState(appointmentToEdit?.patientName || "")
  const [doctorName, setDoctorName] = useState(appointmentToEdit?.doctorName || "")
  const [date, setDate] = useState<Date | undefined>(
    appointmentToEdit?.date ? new Date(appointmentToEdit.date) : undefined,
  )
  const [time, setTime] = useState(appointmentToEdit?.time || "")
  const [duration, setDuration] = useState(appointmentToEdit?.duration || "30")
  const [specialty, setSpecialty] = useState(appointmentToEdit?.specialty || "")
  const [status, setStatus] = useState(appointmentToEdit?.status || "scheduled")
  const [priority, setPriority] = useState(appointmentToEdit?.priority || "medium")
  const [notes, setNotes] = useState(appointmentToEdit?.notes || "")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!patientName.trim()) newErrors.patientName = "El nombre del paciente es obligatorio"
    if (!doctorName.trim()) newErrors.doctorName = "El nombre del doctor es obligatorio"
    if (!date) newErrors.date = "La fecha es obligatoria"
    if (!time) newErrors.time = "La hora es obligatoria"
    if (!specialty) newErrors.specialty = "La especialidad es obligatoria"

    // Validar que la fecha no sea en el pasado
    if (date && isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      newErrors.date = "No se pueden agendar citas en fechas pasadas"
    }

    // Validar que no sea fin de semana
    if (date && isWeekend(date)) {
      newErrors.date = "No se pueden agendar citas en fines de semana"
    }

    // Validar horario laboral (8:00 AM - 6:00 PM)
    if (time) {
      const [hours, minutes] = time.split(":").map(Number)
      if (hours < 8 || hours >= 18) {
        newErrors.time = "Las citas solo pueden ser entre 8:00 AM y 6:00 PM"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const appointmentData = {
        id: appointmentToEdit?.id || `appointment-${Date.now()}`,
        patientName,
        doctorName,
        date: date!.toISOString(),
        time,
        duration: Number.parseInt(duration),
        specialty,
        status,
        priority,
        notes,
      }

      if (appointmentToEdit) {
        updateAppointment(appointmentData)
        toast({
          title: "Cita actualizada",
          description: `La cita para ${patientName} ha sido actualizada correctamente.`,
        })
      } else {
        addAppointment(appointmentData)
        toast({
          title: "Cita agendada",
          description: `La cita para ${patientName} ha sido agendada correctamente.`,
        })
      }

      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error al guardar la cita:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al guardar la cita. Inténtelo de nuevo.",
        variant: "destructive",
      })
    }
  }

  // Generar opciones de tiempo (cada 30 minutos de 8:00 AM a 6:00 PM)
  const timeOptions = []
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patientName">Nombre del Paciente</Label>
          <Input
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Nombre completo del paciente"
            className={errors.patientName ? "border-red-500" : ""}
          />
          {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="doctorName">Doctor/Estudiante Asignado</Label>
          <Input
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Nombre del doctor o estudiante"
            className={errors.doctorName ? "border-red-500" : ""}
          />
          {errors.doctorName && <p className="text-sm text-red-500">{errors.doctorName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  errors.date && "border-red-500",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  (isBefore(date, new Date()) && !isSameDay(date, new Date())) ||
                  isWeekend(date) ||
                  isAfter(date, addDays(new Date(), 60))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Hora</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id="time" className={errors.time ? "border-red-500" : ""}>
              <SelectValue placeholder="Seleccionar hora" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((timeOption) => (
                <SelectItem key={timeOption} value={timeOption}>
                  {timeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duración (minutos)</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Seleccionar duración" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutos</SelectItem>
              <SelectItem value="30">30 minutos</SelectItem>
              <SelectItem value="45">45 minutos</SelectItem>
              <SelectItem value="60">1 hora</SelectItem>
              <SelectItem value="90">1 hora 30 minutos</SelectItem>
              <SelectItem value="120">2 horas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialty">Especialidad</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty" className={errors.specialty ? "border-red-500" : ""}>
              <SelectValue placeholder="Seleccionar especialidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Endodoncia">Endodoncia</SelectItem>
              <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
              <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
              <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
              <SelectItem value="Periodoncia">Periodoncia</SelectItem>
              <SelectItem value="Prostodoncia">Prostodoncia</SelectItem>
              <SelectItem value="Odontología General">Odontología General</SelectItem>
            </SelectContent>
          </Select>
          {errors.specialty && <p className="text-sm text-red-500">{errors.specialty}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Programada</SelectItem>
              <SelectItem value="confirmed">Confirmada</SelectItem>
              <SelectItem value="completed">Completada</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
              <SelectItem value="no-show">No asistió</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Seleccionar prioridad" />
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
        <Label htmlFor="notes">Notas</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Información adicional sobre la cita"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">{appointmentToEdit ? "Actualizar Cita" : "Agendar Cita"}</Button>
      </div>
    </form>
  )
}
