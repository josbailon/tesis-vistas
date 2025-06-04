"use client"

import { useState } from "react"
import { Calendar, Clock, User, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function StudentScheduleView() {
  const [selectedStudent, setSelectedStudent] = useState("all")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  // Mock data para estudiantes
  const students = [
    { id: "1", name: "Carlos Pérez", specialty: "Endodoncia", phone: "0987654321", email: "carlos@email.com" },
    { id: "2", name: "María González", specialty: "Ortodoncia", phone: "0987654322", email: "maria@email.com" },
    { id: "3", name: "José Martínez", specialty: "Cirugía Oral", phone: "0987654323", email: "jose@email.com" },
    { id: "4", name: "Ana Torres", specialty: "Odontopediatría", phone: "0987654324", email: "ana@email.com" },
  ]

  // Mock data para horarios de atención
  const schedules = [
    {
      id: "1",
      studentId: "1",
      studentName: "Carlos Pérez",
      specialty: "Endodoncia",
      date: "2024-01-15",
      timeSlots: [
        { time: "08:00-09:00", status: "disponible", patient: null },
        { time: "09:00-10:00", status: "ocupado", patient: "Ana García" },
        { time: "10:00-11:00", status: "disponible", patient: null },
        { time: "11:00-12:00", status: "ocupado", patient: "Luis Rodríguez" },
        { time: "14:00-15:00", status: "disponible", patient: null },
        { time: "15:00-16:00", status: "disponible", patient: null },
      ],
    },
    {
      id: "2",
      studentId: "2",
      studentName: "María González",
      specialty: "Ortodoncia",
      date: "2024-01-15",
      timeSlots: [
        { time: "08:00-09:00", status: "disponible", patient: null },
        { time: "09:00-10:00", status: "disponible", patient: null },
        { time: "10:00-11:00", status: "ocupado", patient: "Carmen López" },
        { time: "11:00-12:00", status: "disponible", patient: null },
        { time: "14:00-15:00", status: "ocupado", patient: "Pedro Sánchez" },
        { time: "15:00-16:00", status: "disponible", patient: null },
      ],
    },
  ]

  const filteredSchedules =
    selectedStudent === "all" ? schedules : schedules.filter((schedule) => schedule.studentId === selectedStudent)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponible":
        return "bg-green-100 text-green-800"
      case "ocupado":
        return "bg-red-100 text-red-800"
      case "descanso":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Horarios de Atención de Estudiantes</CardTitle>
          <CardDescription>Visualiza la disponibilidad de estudiantes para agendar citas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Estudiante</label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Estudiantes</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Fecha</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Schedules */}
      <div className="space-y-6">
        {filteredSchedules.map((schedule) => (
          <Card key={schedule.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{schedule.studentName}</CardTitle>
                  <CardDescription>{schedule.specialty}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-3 w-3 mr-1" />
                    Contactar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {schedule.timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg ${
                      slot.status === "disponible"
                        ? "border-green-200 hover:bg-green-50 cursor-pointer"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-sm font-medium">{slot.time}</span>
                      </div>
                      <Badge className={getStatusColor(slot.status)}>{slot.status}</Badge>
                    </div>
                    {slot.patient && (
                      <div className="flex items-center text-xs text-gray-600">
                        <User className="h-3 w-3 mr-1" />
                        <span>{slot.patient}</span>
                      </div>
                    )}
                    {slot.status === "disponible" && (
                      <Button size="sm" className="w-full mt-2" variant="outline">
                        Agendar Aquí
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay horarios disponibles</h3>
            <p className="text-gray-600 text-center">No se encontraron horarios para los filtros seleccionados</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
