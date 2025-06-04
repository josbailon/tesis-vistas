"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppointments } from "@/contexts/appointment-context"
import { LoadingSpinner } from "@/components/loading-spinner"

interface DailyAgendaProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DailyAgenda({ selectedDate, onDateChange }: DailyAgendaProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <LoadingSpinner />
  }

  return <DailyAgendaContent selectedDate={selectedDate} onDateChange={onDateChange} />
}

function DailyAgendaContent({ selectedDate, onDateChange }: DailyAgendaProps) {
  const { appointments, updateAppointmentStatus } = useAppointments()

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const todayAppointments = appointments.filter((apt) => apt.date === formatDate(selectedDate))

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agenda para{" "}
            {selectedDate.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const yesterday = new Date(selectedDate)
                yesterday.setDate(yesterday.getDate() - 1)
                onDateChange(yesterday)
              }}
            >
              Anterior
            </Button>
            <Button variant="outline" onClick={() => onDateChange(new Date())}>
              Hoy
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const tomorrow = new Date(selectedDate)
                tomorrow.setDate(tomorrow.getDate() + 1)
                onDateChange(tomorrow)
              }}
            >
              Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {todayAppointments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No hay citas programadas para este día</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          todayAppointments
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((appointment) => (
              <Card key={appointment.id} className={`border-l-4 ${getPriorityColor(appointment.priority)}`}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold">{appointment.time}</span>
                        <span className="text-gray-500">({appointment.duration} min)</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{appointment.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.patientName}</span>
                      </div>
                      {appointment.notes && <p className="text-sm text-gray-600 mb-2">{appointment.notes}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <Badge variant="outline">{appointment.priority}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {appointment.status === "programada" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAppointmentStatus(appointment.id, "confirmada")}
                      >
                        Confirmar
                      </Button>
                    )}
                    {appointment.status === "confirmada" && (
                      <Button size="sm" onClick={() => updateAppointmentStatus(appointment.id, "completada")}>
                        Completar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateAppointmentStatus(appointment.id, "cancelada")}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  )
}
