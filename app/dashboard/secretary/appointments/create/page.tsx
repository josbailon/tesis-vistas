"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import { CalendarIcon, Clock, User, Stethoscope } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface Patient {
  id: string
  name: string
  cedula: string
  phone: string
}

interface Student {
  id: string
  name: string
  specialty: string
  semester: number
}

interface Specialty {
  id: string
  name: string
  duration: number // in minutes
}

export default function CreateAppointment() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [notes, setNotes] = useState("")

  // Mock data
  const patients: Patient[] = [
    { id: "1", name: "María González", cedula: "1234567890", phone: "+593 99 123 4567" },
    { id: "2", name: "Carlos Ruiz", cedula: "2345678901", phone: "+593 99 234 5678" },
    { id: "3", name: "Laura Martínez", cedula: "3456789012", phone: "+593 99 345 6789" },
    { id: "4", name: "Roberto Díaz", cedula: "4567890123", phone: "+593 99 456 7890" },
  ]

  const specialties: Specialty[] = [
    { id: "1", name: "Endodoncia", duration: 90 },
    { id: "2", name: "Ortodoncia", duration: 60 },
    { id: "3", name: "Cirugía Oral", duration: 120 },
    { id: "4", name: "Periodoncia", duration: 75 },
    { id: "5", name: "Odontopediatría", duration: 45 },
  ]

  const students: Student[] = [
    { id: "1", name: "Juan Pérez", specialty: "Endodoncia", semester: 8 },
    { id: "2", name: "Ana López", specialty: "Ortodoncia", semester: 7 },
    { id: "3", name: "Pedro Silva", specialty: "Cirugía Oral", semester: 9 },
    { id: "4", name: "Carmen Torres", specialty: "Periodoncia", semester: 6 },
    { id: "5", name: "Luis Morales", specialty: "Odontopediatría", semester: 5 },
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
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  // Filter students by selected specialty
  const filteredStudents = selectedSpecialty
    ? students.filter((student) => {
        const specialty = specialties.find((s) => s.id === selectedSpecialty)
        return specialty && student.specialty === specialty.name
      })
    : students

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime || !selectedPatient || !selectedSpecialty || !selectedStudent) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const patient = patients.find((p) => p.id === selectedPatient)
      const specialty = specialties.find((s) => s.id === selectedSpecialty)
      const student = filteredStudents.find((s) => s.id === selectedStudent)

      toast({
        title: "Cita creada exitosamente",
        description: `Cita para ${patient?.name} el ${format(selectedDate, "dd/MM/yyyy", { locale: es })} a las ${selectedTime}`,
      })

      router.push("/dashboard/secretary/appointments")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la cita. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nueva Cita</h1>
        <p className="text-gray-600 mt-2">Programa una nueva cita para un paciente</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Información del Paciente
              </CardTitle>
              <CardDescription>Selecciona el paciente para la cita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patient">Paciente *</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-gray-500">
                            CI: {patient.cedula} • Tel: {patient.phone}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="button" variant="outline" className="w-full bg-transparent">
                + Registrar nuevo paciente
              </Button>
            </CardContent>
          </Card>

          {/* Specialty and Student */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5" />
                Especialidad y Estudiante
              </CardTitle>
              <CardDescription>Selecciona la especialidad y el estudiante asignado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="specialty">Especialidad *</Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.id}>
                        <div>
                          <div className="font-medium">{specialty.name}</div>
                          <div className="text-sm text-gray-500">Duración: {specialty.duration} minutos</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="student">Estudiante *</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent} disabled={!selectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedSpecialty ? "Selecciona un estudiante" : "Primero selecciona una especialidad"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">
                            {student.specialty} • {student.semester}° Semestre
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Date and Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Fecha y Hora
              </CardTitle>
              <CardDescription>Selecciona cuándo será la cita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
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
                      {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
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

              <div>
                <Label htmlFor="time">Hora *</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas Adicionales</CardTitle>
              <CardDescription>Información adicional sobre la cita</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea
                  id="notes"
                  placeholder="Escribe cualquier información adicional sobre la cita..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creando..." : "Crear Cita"}
          </Button>
        </div>
      </form>
    </div>
  )
}
