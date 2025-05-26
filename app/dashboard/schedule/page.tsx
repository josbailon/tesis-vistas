"use client"

import { useState } from "react"
import { Calendar, Clock, User, MapPin, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ScheduleEvent {
  id: string
  title: string
  patient: string
  date: Date
  startTime: string
  endTime: string
  type: "appointment" | "class" | "exam" | "meeting"
  location: string
  status: "confirmed" | "pending" | "cancelled"
  notes?: string
}

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Datos de ejemplo para el horario
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: "1",
      title: "Consulta Endodoncia",
      patient: "Ana García",
      date: new Date(2025, 4, 22),
      startTime: "09:00",
      endTime: "10:00",
      type: "appointment",
      location: "Consultorio 3",
      status: "confirmed",
      notes: "Tratamiento de conducto - Segunda sesión",
    },
    {
      id: "2",
      title: "Clase Teórica",
      patient: "Grupo A",
      date: new Date(2025, 4, 22),
      startTime: "11:00",
      endTime: "12:30",
      type: "class",
      location: "Aula 201",
      status: "confirmed",
      notes: "Endodoncia Avanzada - Dr. Martínez",
    },
    {
      id: "3",
      title: "Revisión Ortodoncia",
      patient: "Carlos López",
      date: new Date(2025, 4, 23),
      startTime: "14:00",
      endTime: "15:00",
      type: "appointment",
      location: "Consultorio 5",
      status: "pending",
      notes: "Ajuste de brackets",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-800"
      case "class":
        return "bg-green-100 text-green-800"
      case "exam":
        return "bg-red-100 text-red-800"
      case "meeting":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
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
      case "exam":
        return "Examen"
      case "meeting":
        return "Reunión"
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

  const eventsForSelectedDate = scheduleEvents.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString(),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Horario</h1>
          <p className="text-muted-foreground">Gestiona tu calendario de citas y actividades académicas</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nuevo Evento</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendario */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendario</CardTitle>
              <CardDescription>Selecciona una fecha para ver los eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                locale={es}
              />
            </CardContent>
          </Card>
        </div>

        {/* Eventos del día seleccionado */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Eventos para {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
              </CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length} evento{eventsForSelectedDate.length !== 1 ? "s" : ""} programado
                {eventsForSelectedDate.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((event) => (
                      <Card key={event.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge className={getEventTypeColor(event.type)}>{getEventTypeLabel(event.type)}</Badge>
                                <Badge className={getStatusColor(event.status)}>{getStatusLabel(event.status)}</Badge>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.startTime} - {event.endTime}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {event.patient}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {event.location}
                                </div>
                              </div>

                              {event.notes && <p className="text-sm text-muted-foreground">{event.notes}</p>}
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No hay eventos programados</h3>
                  <p className="text-muted-foreground">No tienes eventos para esta fecha.</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Evento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resumen semanal */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de la Semana</CardTitle>
          <CardDescription>Vista general de tus próximos eventos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {scheduleEvents.filter((e) => e.type === "appointment").length}
              </div>
              <p className="text-sm text-muted-foreground">Citas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {scheduleEvents.filter((e) => e.type === "class").length}
              </div>
              <p className="text-sm text-muted-foreground">Clases</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {scheduleEvents.filter((e) => e.type === "exam").length}
              </div>
              <p className="text-sm text-muted-foreground">Exámenes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {scheduleEvents.filter((e) => e.type === "meeting").length}
              </div>
              <p className="text-sm text-muted-foreground">Reuniones</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
