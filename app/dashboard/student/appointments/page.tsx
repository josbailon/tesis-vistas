"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, User, AlertCircle, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const specialties = ["Endodoncia", "Ortodoncia", "Cirugía Oral", "Odontopediatría", "Periodoncia"]

const mockPatients = [
  { id: 1, name: "María González", phone: "0987654321", lastVisit: "2024-01-15" },
  { id: 2, name: "Carlos Rodríguez", phone: "0976543210", lastVisit: "2024-01-10" },
  { id: 3, name: "Ana Martínez", phone: "0965432109", lastVisit: "2024-01-08" },
]

const mockAppointments = [
  {
    id: 1,
    patient: "María González",
    date: "2024-01-25",
    time: "09:00",
    specialty: "Endodoncia",
    status: "confirmed",
    notes: "Control post-tratamiento",
  },
  {
    id: 2,
    patient: "Carlos Rodríguez",
    date: "2024-01-26",
    time: "14:30",
    specialty: "Ortodoncia",
    status: "pending",
    notes: "Primera consulta",
  },
]

export default function StudentAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [notes, setNotes] = useState("")
  const [appointments, setAppointments] = useState(mockAppointments)

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedPatient || !selectedSpecialty) {
      alert("Por favor complete todos los campos requeridos")
      return
    }

    // Check for conflicts
    const dateStr = format(selectedDate, "yyyy-MM-dd")
    const conflict = appointments.find((apt) => apt.date === dateStr && apt.time === selectedTime)

    if (conflict) {
      alert("Ya existe una cita programada para esta fecha y hora")
      return
    }

    // Check if it's weekend
    const dayOfWeek = selectedDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert("No se pueden programar citas los fines de semana")
      return
    }

    const newAppointment = {
      id: appointments.length + 1,
      patient: mockPatients.find((p) => p.id.toString() === selectedPatient)?.name || "",
      date: dateStr,
      time: selectedTime,
      specialty: selectedSpecialty,
      status: "pending" as const,
      notes,
    }

    setAppointments([...appointments, newAppointment])

    // Reset form
    setSelectedDate(undefined)
    setSelectedTime("")
    setSelectedPatient("")
    setSelectedSpecialty("")
    setNotes("")

    alert("Cita programada exitosamente")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmada
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Programar Citas para Pacientes
        </h1>
        <p className="text-gray-600 mt-2">Agenda citas médicas para tus pacientes asignados</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Formulario de nueva cita */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              Nueva Cita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Paciente *</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-gray-500">{patient.phone}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar hora" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad *</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Motivo de la consulta, observaciones..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleScheduleAppointment} className="w-full btn-medical">
              Programar Cita
            </Button>
          </CardContent>
        </Card>

        {/* Lista de citas programadas */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Clock className="h-5 w-5 text-green-500" />
              Citas Programadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay citas programadas</p>
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{appointment.patient}</h4>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {format(new Date(appointment.date), "dd/MM/yyyy")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </span>
                      </div>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {appointment.specialty}
                        </Badge>
                      </div>
                      {appointment.notes && <p className="mt-2 text-xs italic">{appointment.notes}</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
