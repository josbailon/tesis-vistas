"use client"

import { format, addDays, subDays, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Calendar, Clock, User, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppointments } from "@/contexts/appointment-context"

interface DailyAgendaProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DailyAgenda({ selectedDate, onDateChange }: DailyAgendaProps) {
  const { appointments, updateAppointmentStatus } = useAppointments()

  const dayAppointments = appointments
    .filter((apt) => isSameDay(new Date(`${apt.date}T${apt.time}`), selectedDate))
    .sort((a, b) => a.time.localeCompare(b.time))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "programada":
        return "bg-blue-100 text-blue-800"
      case "confirmada":
        return "bg-green-100 text-green-800"
      case "completada":
        return "bg-gray-100 text-gray-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      case "no-asistio":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const timeSlots = Array.from({ length: 20 }, (_, i) => {
    const hour = 8 + Math.floor(i / 2)
    const minute = i % 2 === 0 ? "00" : "30"
    return `${hour.toString().padStart(2, "0")}:${minute}`
  })

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Agenda Diaria
              </CardTitle>
              <CardDescription>{format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => onDateChange(subDays(selectedDate, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDateChange(new Date())}>
                Hoy
              </Button>
              <Button variant="outline" size="sm" onClick={() => onDateChange(addDays(selectedDate, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{dayAppointments.length} citas programadas</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Programada</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Confirmada</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span>Completada</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {timeSlots.map((timeSlot) => {
              const appointment = dayAppointments.find((apt) => apt.time === timeSlot)

              return (
                <div key={timeSlot} className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-20 text-sm font-medium text-gray-600">{timeSlot}</div>

                  {appointment ? (
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium">{appointment.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="h-3 w-3" />
                            <span>{appointment.patientName}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{appointment.duration} min</span>
                          </div>
                          {appointment.notes && <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateAppointmentStatus(appointment.id, "confirmada")}>
                              Marcar como Confirmada
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateAppointmentStatus(appointment.id, "completada")}>
                              Marcar como Completada
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateAppointmentStatus(appointment.id, "cancelada")}>
                              Cancelar Cita
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateAppointmentStatus(appointment.id, "no-asistio")}>
                              Marcar como No Asistió
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 text-gray-400 text-sm">Disponible</div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
