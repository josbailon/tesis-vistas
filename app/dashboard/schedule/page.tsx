"use client"

import { useState } from "react"
import { Calendar, Users, FileText, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Importar datos de prueba
import { appointments, students } from "@/lib/mock-data"

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day")

  // Filtrar citas según la fecha seleccionada y el término de búsqueda
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""

    const matchesDate = selectedDateStr === appointment.date

    const matchesSearch =
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesDate && (searchTerm === "" || matchesSearch)
  })

  // Ordenar citas por hora
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    return a.time.localeCompare(b.time)
  })

  // Función para generar las horas del día
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour < 18; hour++) {
      slots.push(`${hour}:00`)
      slots.push(`${hour}:30`)
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Agenda</h1>
          <p className="text-muted-foreground">Gestiona tu horario de clases, supervisiones y citas</p>
        </div>
        <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Evento</DialogTitle>
              <DialogDescription>Completa los detalles para agendar un nuevo evento en tu calendario</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Título</Label>
                <Input id="event-title" placeholder="Título del evento" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time">Hora</Label>
                  <Select>
                    <SelectTrigger id="event-time">
                      <SelectValue placeholder="Seleccionar hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-duration">Duración</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="event-duration">
                      <SelectValue placeholder="Seleccionar duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="90">1 hora 30 minutos</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-type">Tipo</Label>
                  <Select>
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Clase</SelectItem>
                      <SelectItem value="supervision">Supervisión</SelectItem>
                      <SelectItem value="meeting">Reunión</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-student">Estudiante (opcional)</Label>
                <Select>
                  <SelectTrigger id="event-student">
                    <SelectValue placeholder="Seleccionar estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-notes">Notas</Label>
                <Textarea id="event-notes" placeholder="Detalles adicionales sobre el evento" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddEventDialogOpen(false)}>
                Guardar Evento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>Selecciona una fecha para ver tus eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="view-mode">Vista</Label>
                <Select value={viewMode} onValueChange={(value) => setViewMode(value as "day" | "week" | "month")}>
                  <SelectTrigger id="view-mode" className="w-[120px]">
                    <SelectValue placeholder="Seleccionar vista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Día</SelectItem>
                    <SelectItem value="week">Semana</SelectItem>
                    <SelectItem value="month">Mes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">Resumen del Día</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Citas</span>
                  <span>{sortedAppointments.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Clases</span>
                  <span>2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Supervisiones</span>
                  <span>3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es }) : "Agenda"}
            </CardTitle>
            <CardDescription>
              {viewMode === "day"
                ? "Vista diaria de tu agenda"
                : viewMode === "week"
                  ? "Vista semanal de tu agenda"
                  : "Vista mensual de tu agenda"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {timeSlots.map((timeSlot) => {
                const eventsAtTime = sortedAppointments.filter((appointment) => {
                  return (
                    appointment.time === timeSlot ||
                    (appointment.time < timeSlot &&
                      new Date(`2025-01-01T${appointment.time}`).getTime() + appointment.duration * 60000 >
                        new Date(`2025-01-01T${timeSlot}`).getTime())
                  )
                })

                if (eventsAtTime.length === 0 && viewMode === "day") {
                  return (
                    <div key={timeSlot} className="flex items-start">
                      <div className="w-16 text-sm text-muted-foreground">{timeSlot}</div>
                      <div className="flex-1 ml-4 h-12 border-t border-dashed border-muted-foreground/20"></div>
                    </div>
                  )
                }

                return eventsAtTime.length > 0 ? (
                  <div key={timeSlot} className="flex items-start">
                    <div className="w-16 text-sm text-muted-foreground">{timeSlot}</div>
                    <div className="flex-1 ml-4 space-y-2">
                      {eventsAtTime.map((appointment) => (
                        <div key={appointment.id} className="p-2 rounded-md bg-primary/10 border border-primary/20">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{appointment.type}</div>
                            <Badge variant="outline" className="bg-primary/20 text-primary hover:bg-primary/30">
                              {appointment.time} -{" "}
                              {format(
                                new Date(
                                  new Date(`2025-01-01T${appointment.time}`).getTime() + appointment.duration * 60000,
                                ),
                                "HH:mm",
                              )}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Users className="mr-1 h-3 w-3" />
                              <span>Paciente: {appointments.find((a) => a.id === appointment.id)?.patientId}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <FileText className="mr-1 h-3 w-3" />
                              <span>{appointment.specialty}</span>
                            </div>
                            {appointment.notes && <div className="mt-1 text-muted-foreground">{appointment.notes}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              })}

              {sortedAppointments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No hay eventos programados</h3>
                  <p className="text-muted-foreground">
                    No tienes eventos programados para este día. Puedes añadir uno nuevo haciendo clic en "Nuevo
                    Evento".
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
