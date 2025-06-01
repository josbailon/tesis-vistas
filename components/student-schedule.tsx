"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScheduleItem {
  id: string
  subject: string
  professor: string
  time: string
  duration: string
  room: string
  day: string
  type: "lecture" | "practical" | "clinic" | "exam"
}

const mockSchedule: ScheduleItem[] = [
  {
    id: "1",
    subject: "Anatomía Dental",
    professor: "Dr. María González",
    time: "08:00",
    duration: "2h",
    room: "Aula 101",
    day: "Lunes",
    type: "lecture",
  },
  {
    id: "2",
    subject: "Práctica Clínica",
    professor: "Dr. Carlos Ramírez",
    time: "10:30",
    duration: "3h",
    room: "Clínica A",
    day: "Lunes",
    type: "clinic",
  },
  {
    id: "3",
    subject: "Radiología Oral",
    professor: "Dra. Ana Torres",
    time: "14:00",
    duration: "1.5h",
    room: "Lab. Radiología",
    day: "Martes",
    type: "practical",
  },
  {
    id: "4",
    subject: "Cirugía Oral",
    professor: "Dr. Luis Mendoza",
    time: "09:00",
    duration: "2h",
    room: "Quirófano 1",
    day: "Miércoles",
    type: "clinic",
  },
  {
    id: "5",
    subject: "Endodoncia",
    professor: "Dra. Patricia Vega",
    time: "11:30",
    duration: "2h",
    room: "Aula 203",
    day: "Miércoles",
    type: "lecture",
  },
  {
    id: "6",
    subject: "Ortodoncia Práctica",
    professor: "Dr. Roberto Silva",
    time: "15:00",
    duration: "3h",
    room: "Clínica B",
    day: "Jueves",
    type: "practical",
  },
  {
    id: "7",
    subject: "Examen Parcial",
    professor: "Dr. María González",
    time: "08:00",
    duration: "2h",
    room: "Aula 105",
    day: "Viernes",
    type: "exam",
  },
]

export function StudentSchedule() {
  const [selectedWeek, setSelectedWeek] = useState("current")
  const [selectedStudent, setSelectedStudent] = useState("all")

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-800"
      case "practical":
        return "bg-green-100 text-green-800"
      case "clinic":
        return "bg-purple-100 text-purple-800"
      case "exam":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Teoría"
      case "practical":
        return "Práctica"
      case "clinic":
        return "Clínica"
      case "exam":
        return "Examen"
      default:
        return "Otro"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Horarios de Estudiantes</CardTitle>
          <CardDescription>Visualiza y gestiona los horarios académicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-2 block">Semana</label>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Semana Actual</SelectItem>
                  <SelectItem value="next">Próxima Semana</SelectItem>
                  <SelectItem value="previous">Semana Anterior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600 mb-2 block">Estudiante</label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Estudiantes</SelectItem>
                  <SelectItem value="2021-001">Ana María González</SelectItem>
                  <SelectItem value="2020-045">Carlos Eduardo Ramírez</SelectItem>
                  <SelectItem value="2022-023">Sofía Alejandra Torres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map((day) => (
          <Card key={day} className="min-h-[400px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSchedule
                .filter((item) => item.day === day)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getTypeColor(item.type)}>{getTypeLabel(item.type)}</Badge>
                      <span className="text-xs text-gray-500">{item.duration}</span>
                    </div>

                    <h4 className="font-medium text-sm mb-1">{item.subject}</h4>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{item.professor}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{item.room}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {mockSchedule.filter((item) => item.day === day).length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No hay clases programadas</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
