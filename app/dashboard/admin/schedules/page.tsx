"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus, Edit, Trash2, Users, BookOpen, AlertCircle } from "lucide-react"

interface Schedule {
  id: string
  title: string
  type: "class" | "clinic" | "lab" | "exam"
  instructor: string
  students: string[]
  room: string
  dayOfWeek: string
  startTime: string
  endTime: string
  specialty: string
  semester: string
  status: "active" | "inactive" | "cancelled"
  capacity: number
  enrolled: number
  description?: string
}

export default function SchedulesManagementPage() {
  const [selectedDay, setSelectedDay] = useState("monday")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "sch1",
      title: "Endodoncia Clínica",
      type: "clinic",
      instructor: "Dr. Martínez",
      students: ["Juan Pérez", "María López", "Carlos Rodríguez"],
      room: "Clínica 1",
      dayOfWeek: "monday",
      startTime: "08:00",
      endTime: "12:00",
      specialty: "Endodoncia",
      semester: "8vo",
      status: "active",
      capacity: 8,
      enrolled: 3,
      description: "Práctica clínica de tratamientos endodónticos",
    },
    {
      id: "sch2",
      title: "Periodoncia Teórica",
      type: "class",
      instructor: "Dra. López",
      students: ["Ana García", "Pedro Ramírez", "Sofía Mendoza"],
      room: "Aula 201",
      dayOfWeek: "tuesday",
      startTime: "14:00",
      endTime: "16:00",
      specialty: "Periodoncia",
      semester: "6to",
      status: "active",
      capacity: 25,
      enrolled: 3,
      description: "Fundamentos teóricos de periodoncia",
    },
    {
      id: "sch3",
      title: "Laboratorio de Prótesis",
      type: "lab",
      instructor: "Dr. Vásquez",
      students: ["Luis Torres", "Carmen Silva"],
      room: "Lab 1",
      dayOfWeek: "wednesday",
      startTime: "09:00",
      endTime: "13:00",
      specialty: "Prótesis",
      semester: "7mo",
      status: "active",
      capacity: 15,
      enrolled: 2,
      description: "Elaboración de prótesis dentales",
    },
    {
      id: "sch4",
      title: "Examen de Ortodoncia",
      type: "exam",
      instructor: "Dra. Rodríguez",
      students: ["Todos los estudiantes de 9no"],
      room: "Aula Magna",
      dayOfWeek: "friday",
      startTime: "10:00",
      endTime: "12:00",
      specialty: "Ortodoncia",
      semester: "9no",
      status: "active",
      capacity: 50,
      enrolled: 45,
      description: "Examen final de ortodoncia",
    },
  ])

  const daysOfWeek = [
    { value: "monday", label: "Lunes" },
    { value: "tuesday", label: "Martes" },
    { value: "wednesday", label: "Miércoles" },
    { value: "thursday", label: "Jueves" },
    { value: "friday", label: "Viernes" },
    { value: "saturday", label: "Sábado" },
  ]

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "class":
        return <Badge className="bg-blue-100 text-blue-700">Clase</Badge>
      case "clinic":
        return <Badge className="bg-green-100 text-green-700">Clínica</Badge>
      case "lab":
        return <Badge className="bg-purple-100 text-purple-700">Laboratorio</Badge>
      case "exam":
        return <Badge className="bg-red-100 text-red-700">Examen</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Activo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700">Inactivo</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSchedulesByDay = (day: string) => {
    return schedules
      .filter((schedule) => schedule.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  const handleSaveSchedule = (scheduleData: Partial<Schedule>) => {
    if (editingSchedule) {
      setSchedules((prev) => prev.map((s) => (s.id === editingSchedule.id ? { ...s, ...scheduleData } : s)))
    } else {
      const newSchedule: Schedule = {
        id: `sch${schedules.length + 1}`,
        status: "active",
        students: [],
        enrolled: 0,
        ...scheduleData,
      } as Schedule
      setSchedules((prev) => [...prev, newSchedule])
    }
    setIsDialogOpen(false)
    setEditingSchedule(null)
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gestión de Horarios
          </h1>
          <p className="text-blue-600 mt-2">Administra los horarios académicos y clínicos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-medical" onClick={() => setEditingSchedule(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Horario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSchedule ? "Editar Horario" : "Nuevo Horario"}</DialogTitle>
              <DialogDescription>
                {editingSchedule ? "Modifica los datos del horario" : "Crea un nuevo horario"}
              </DialogDescription>
            </DialogHeader>
            <ScheduleForm
              schedule={editingSchedule}
              onSave={handleSaveSchedule}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Horarios</p>
                <p className="text-2xl font-bold text-blue-800">{schedules.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Activos</p>
                <p className="text-2xl font-bold text-green-800">
                  {schedules.filter((s) => s.status === "active").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Estudiantes Inscritos</p>
                <p className="text-2xl font-bold text-purple-800">
                  {schedules.reduce((sum, s) => sum + s.enrolled, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Especialidades</p>
                <p className="text-2xl font-bold text-orange-800">{new Set(schedules.map((s) => s.specialty)).size}</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vista de Horarios por Día */}
      <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
        <TabsList className="bg-blue-100 grid grid-cols-6">
          {daysOfWeek.map((day) => (
            <TabsTrigger
              key={day.value}
              value={day.value}
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              {day.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {daysOfWeek.map((day) => (
          <TabsContent key={day.value} value={day.value} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-800">Horarios del {day.label}</h2>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                {getSchedulesByDay(day.value).length} actividades
              </Badge>
            </div>

            <div className="grid gap-4">
              {getSchedulesByDay(day.value).length === 0 ? (
                <Card className="medical-card">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No hay actividades programadas para este día</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                getSchedulesByDay(day.value).map((schedule) => (
                  <Card key={schedule.id} className="medical-card hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-blue-800">{schedule.title}</CardTitle>
                          <CardDescription className="text-blue-600">
                            {schedule.instructor} • {schedule.room} • {schedule.semester}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {getTypeBadge(schedule.type)}
                          {getStatusBadge(schedule.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="font-medium text-blue-700">Horario</p>
                              <p className="text-blue-600">
                                {schedule.startTime} - {schedule.endTime}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-blue-700">Especialidad</p>
                            <p className="text-blue-600">{schedule.specialty}</p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-700">Capacidad</p>
                            <p className="text-blue-600">
                              {schedule.enrolled}/{schedule.capacity}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-blue-700">Estado</p>
                            <p className="text-blue-600">{schedule.status}</p>
                          </div>
                        </div>

                        {schedule.description && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-700">{schedule.description}</p>
                          </div>
                        )}

                        {schedule.enrolled >= schedule.capacity && (
                          <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                              <p className="text-sm text-orange-800">Capacidad máxima alcanzada</p>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-300 text-green-700 hover:bg-green-50"
                            onClick={() => {
                              setEditingSchedule(schedule)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// Componente del formulario
function ScheduleForm({
  schedule,
  onSave,
  onCancel,
}: {
  schedule: Schedule | null
  onSave: (data: Partial<Schedule>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: schedule?.title || "",
    type: schedule?.type || "class",
    instructor: schedule?.instructor || "",
    room: schedule?.room || "",
    dayOfWeek: schedule?.dayOfWeek || "monday",
    startTime: schedule?.startTime || "08:00",
    endTime: schedule?.endTime || "10:00",
    specialty: schedule?.specialty || "",
    semester: schedule?.semester || "",
    capacity: schedule?.capacity || 20,
    description: schedule?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class">Clase</SelectItem>
              <SelectItem value="clinic">Clínica</SelectItem>
              <SelectItem value="lab">Laboratorio</SelectItem>
              <SelectItem value="exam">Examen</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="room">Aula/Sala</Label>
          <Input
            id="room"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="dayOfWeek">Día de la Semana</Label>
          <Select value={formData.dayOfWeek} onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar día" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Lunes</SelectItem>
              <SelectItem value="tuesday">Martes</SelectItem>
              <SelectItem value="wednesday">Miércoles</SelectItem>
              <SelectItem value="thursday">Jueves</SelectItem>
              <SelectItem value="friday">Viernes</SelectItem>
              <SelectItem value="saturday">Sábado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="startTime">Hora de Inicio</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="endTime">Hora de Fin</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="specialty">Especialidad</Label>
          <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar especialidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Endodoncia">Endodoncia</SelectItem>
              <SelectItem value="Periodoncia">Periodoncia</SelectItem>
              <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
              <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
              <SelectItem value="Prótesis">Prótesis</SelectItem>
              <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="semester">Semestre</Label>
          <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1ro">1er Semestre</SelectItem>
              <SelectItem value="2do">2do Semestre</SelectItem>
              <SelectItem value="3ro">3er Semestre</SelectItem>
              <SelectItem value="4to">4to Semestre</SelectItem>
              <SelectItem value="5to">5to Semestre</SelectItem>
              <SelectItem value="6to">6to Semestre</SelectItem>
              <SelectItem value="7mo">7mo Semestre</SelectItem>
              <SelectItem value="8vo">8vo Semestre</SelectItem>
              <SelectItem value="9no">9no Semestre</SelectItem>
              <SelectItem value="10mo">10mo Semestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="capacity">Capacidad</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción opcional de la actividad"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="btn-medical">
          {schedule ? "Actualizar" : "Crear"} Horario
        </Button>
      </div>
    </form>
  )
}
