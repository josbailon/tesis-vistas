"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock, User, MapPin, Stethoscope } from "lucide-react"

export default function StudentSchedulesPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedStudent, setSelectedStudent] = useState("all")

  const students = [
    { id: "s1", name: "Carlos López", semester: 8, specialty: "Endodoncia" },
    { id: "s2", name: "María Fernández", semester: 9, specialty: "Ortodoncia" },
    { id: "s3", name: "Juan Pérez", semester: 10, specialty: "Cirugía Oral" },
  ]

  const scheduleEvents = [
    {
      id: "1",
      studentId: "s1",
      studentName: "Carlos López",
      type: "appointment",
      title: "Cita con Paciente Ana García",
      date: new Date(2024, 0, 22),
      startTime: "09:00",
      endTime: "10:30",
      location: "Consultorio 3",
      patient: "Ana García",
      treatment: "Tratamiento de conducto",
      status: "confirmed",
    },
    {
      id: "2",
      studentId: "s1",
      studentName: "Carlos López",
      type: "class",
      title: "Clase Teórica - Endodoncia Avanzada",
      date: new Date(2024, 0, 22),
      startTime: "11:00",
      endTime: "12:30",
      location: "Aula 201",
      professor: "Dr. Martínez",
      status: "scheduled",
    },
    {
      id: "3",
      studentId: "s2",
      studentName: "María Fernández",
      type: "appointment",
      title: "Cita con Paciente Roberto Silva",
      date: new Date(2024, 0, 22),
      startTime: "14:00",
      endTime: "15:30",
      location: "Consultorio 5",
      patient: "Roberto Silva",
      treatment: "Ajuste de brackets",
      status: "pending",
    },
    {
      id: "4",
      studentId: "s3",
      studentName: "Juan Pérez",
      type: "clinical",
      title: "Práctica Clínica - Cirugía",
      date: new Date(2024, 0, 23),
      startTime: "08:00",
      endTime: "12:00",
      location: "Quirófano 1",
      supervisor: "Dra. López",
      status: "confirmed",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "class":
        return "bg-green-100 text-green-800 border-green-300"
      case "clinical":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "exam":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "appointment":
        return "Cita"
      case "class":
        return "Clase"
      case "clinical":
        return "Práctica"
      case "exam":
        return "Examen"
      default:
        return type
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const filteredEvents = scheduleEvents.filter((event) => {
    const matchesDate = event.date.toDateString() === selectedDate.toDateString()
    const matchesStudent = selectedStudent === "all" || event.studentId === selectedStudent
    return matchesDate && matchesStudent
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Horarios de Estudiantes</h1>
          <p className="text-muted-foreground">Supervisa los horarios y citas de tus estudiantes</p>
        </div>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Exportar Horarios
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar and Filters */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Fecha</CardTitle>
              <CardDescription>Elige una fecha para ver los horarios</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                locale={es}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filtrar por Estudiante</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estudiante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estudiantes</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.semester}° Semestre
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen del Día</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total eventos:</span>
                  <span className="font-medium">{filteredEvents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Citas:</span>
                  <span className="font-medium">{filteredEvents.filter((e) => e.type === "appointment").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Clases:</span>
                  <span className="font-medium">{filteredEvents.filter((e) => e.type === "class").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Prácticas:</span>
                  <span className="font-medium">{filteredEvents.filter((e) => e.type === "clinical").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events for Selected Date */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Eventos para {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
              </CardTitle>
              <CardDescription>
                {filteredEvents.length} evento{filteredEvents.length !== 1 ? "s" : ""} programado
                {filteredEvents.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredEvents.length > 0 ? (
                <div className="space-y-4">
                  {filteredEvents
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((event) => (
                      <Card key={event.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge className={getEventTypeColor(event.type)}>{getEventTypeLabel(event.type)}</Badge>
                                <Badge className={getStatusColor(event.status)}>{getStatusLabel(event.status)}</Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{event.studentName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {event.startTime} - {event.endTime}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                {event.patient && (
                                  <div className="flex items-center gap-1">
                                    <Stethoscope className="h-4 w-4" />
                                    <span>Paciente: {event.patient}</span>
                                  </div>
                                )}
                                {event.professor && (
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>Profesor: {event.professor}</span>
                                  </div>
                                )}
                                {event.supervisor && (
                                  <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    <span>Supervisor: {event.supervisor}</span>
                                  </div>
                                )}
                              </div>

                              {event.treatment && (
                                <div className="text-sm">
                                  <span className="font-medium">Tratamiento:</span> {event.treatment}
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 ml-4">
                              <Button variant="outline" size="sm">
                                Ver Detalles
                              </Button>
                              {event.type === "appointment" && event.status === "pending" && (
                                <Button size="sm">Confirmar</Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No hay eventos programados</h3>
                  <p className="text-muted-foreground">
                    No se encontraron eventos para esta fecha
                    {selectedStudent !== "all" && " y estudiante seleccionado"}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Vista Semanal</CardTitle>
          <CardDescription>Resumen de actividades de la semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {scheduleEvents.filter((e) => e.type === "appointment").length}
              </div>
              <p className="text-sm text-muted-foreground">Citas Programadas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {scheduleEvents.filter((e) => e.type === "class").length}
              </div>
              <p className="text-sm text-muted-foreground">Clases Teóricas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {scheduleEvents.filter((e) => e.type === "clinical").length}
              </div>
              <p className="text-sm text-muted-foreground">Prácticas Clínicas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {scheduleEvents.filter((e) => e.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pendientes de Confirmar</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
