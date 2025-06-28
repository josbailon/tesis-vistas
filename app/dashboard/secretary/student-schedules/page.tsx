"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react"
import { format, addDays, startOfWeek } from "date-fns"
import { es } from "date-fns/locale"

interface Student {
  id: string
  name: string
  specialties: string[]
  semester: number
  supervisor: string
}

interface Appointment {
  id: string
  time: string
  patient: string
  type: string
  specialty: string
  status: "confirmed" | "pending" | "completed"
}

interface Schedule {
  studentId: string
  day: string
  appointments: Appointment[]
  availableSlots: string[]
}

const mockStudents: Student[] = [
  {
    id: "est1",
    name: "Juan Pérez",
    specialties: ["Endodoncia", "Operatoria Dental"],
    semester: 8,
    supervisor: "Dr. Carlos Ruiz",
  },
  {
    id: "est2",
    name: "María González",
    specialties: ["Ortodoncia", "Odontopediatría"],
    semester: 7,
    supervisor: "Dra. Laura Martín",
  },
  {
    id: "est3",
    name: "Carlos López",
    specialties: ["Cirugía Oral", "Periodoncia"],
    semester: 9,
    supervisor: "Dr. Roberto Silva",
  },
]

const generateMockSchedule = (studentId: string, day: string): Schedule => {
  const appointments: Appointment[] = [
    {
      id: "apt1",
      time: "09:00",
      patient: "Ana Rodríguez",
      type: "Consulta",
      specialty: "Endodoncia",
      status: "confirmed",
    },
    {
      id: "apt2",
      time: "11:00",
      patient: "Miguel Santos",
      type: "Tratamiento",
      specialty: "Endodoncia",
      status: "pending",
    },
    {
      id: "apt3",
      time: "15:00",
      patient: "Carmen López",
      type: "Seguimiento",
      specialty: "Operatoria Dental",
      status: "completed",
    },
  ]

  const availableSlots = ["08:00", "10:00", "12:00", "14:00", "16:00", "17:00"]

  return {
    studentId,
    day,
    appointments,
    availableSlots,
  }
}

export default function StudentSchedulesPage() {
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedWeek, setSelectedWeek] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }))

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(selectedWeek, i))

  const getScheduleForDay = (studentId: string, day: Date) => {
    return generateMockSchedule(studentId, format(day, "yyyy-MM-dd"))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <XCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calendarios de Estudiantes</h1>
          <p className="text-muted-foreground">Consulta los horarios y disponibilidad de los estudiantes</p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estudiante" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {student.specialties.join(", ")} • {student.semester}° Semestre
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedWeek(addDays(selectedWeek, -7))}>
                Semana Anterior
              </Button>
              <Button variant="outline" onClick={() => setSelectedWeek(startOfWeek(new Date(), { weekStartsOn: 1 }))}>
                Semana Actual
              </Button>
              <Button variant="outline" onClick={() => setSelectedWeek(addDays(selectedWeek, 7))}>
                Semana Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <>
          {/* Información del Estudiante */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {mockStudents.find((s) => s.id === selectedStudent)?.name}
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-4 text-sm">
                  <span>Semestre: {mockStudents.find((s) => s.id === selectedStudent)?.semester}°</span>
                  <span>Supervisor: {mockStudents.find((s) => s.id === selectedStudent)?.supervisor}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {mockStudents
                    .find((s) => s.id === selectedStudent)
                    ?.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Calendario Semanal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Horario Semanal
              </CardTitle>
              <CardDescription>
                Semana del {format(selectedWeek, "d")} al{" "}
                {format(addDays(selectedWeek, 6), "d 'de' MMMM yyyy", { locale: es })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day, index) => {
                  const schedule = getScheduleForDay(selectedStudent, day)
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6

                  return (
                    <div key={index} className={`space-y-2 ${isWeekend ? "opacity-50" : ""}`}>
                      <div className="text-center">
                        <div className="font-medium text-sm">{format(day, "EEEE", { locale: es })}</div>
                        <div className="text-lg font-bold">{format(day, "d")}</div>
                      </div>

                      {!isWeekend ? (
                        <div className="space-y-1">
                          {/* Citas programadas */}
                          {schedule.appointments.map((appointment) => (
                            <div key={appointment.id} className="p-2 text-xs border rounded bg-white">
                              <div className="font-medium flex items-center gap-1">
                                {getStatusIcon(appointment.status)}
                                {appointment.time}
                              </div>
                              <div className="text-muted-foreground truncate">{appointment.patient}</div>
                              <Badge size="sm" className={getStatusColor(appointment.status)}>
                                {appointment.type}
                              </Badge>
                            </div>
                          ))}

                          {/* Slots disponibles */}
                          {schedule.availableSlots.slice(0, 2).map((slot) => (
                            <div key={slot} className="p-2 text-xs border rounded bg-green-50 border-green-200">
                              <div className="font-medium text-green-700">{slot} - Disponible</div>
                            </div>
                          ))}

                          {schedule.availableSlots.length > 2 && (
                            <div className="text-xs text-center text-muted-foreground">
                              +{schedule.availableSlots.length - 2} slots más
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-xs text-muted-foreground py-4">Sin horario</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Resumen de la Semana */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Citas</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Esta semana</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Citas confirmadas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Por confirmar</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Slots libres</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
