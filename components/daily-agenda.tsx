"use client"

import { useState } from "react"
import { Calendar, Clock, User, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DailyAgendaProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DailyAgenda({ selectedDate, onDateChange }: DailyAgendaProps) {
  const [appointments] = useState([
    {
      id: "1",
      time: "09:00",
      duration: 30,
      patientName: "María García",
      type: "Consulta General",
      status: "confirmada",
      room: "Consultorio 1",
    },
    {
      id: "2",
      time: "10:30",
      duration: 45,
      patientName: "Juan Pérez",
      type: "Limpieza Dental",
      status: "pendiente",
      room: "Consultorio 2",
    },
    {
      id: "3",
      time: "14:00",
      duration: 60,
      patientName: "Ana López",
      type: "Tratamiento de Conducto",
      status: "confirmada",
      room: "Consultorio 3",
    },
  ])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agenda para {formatDate(selectedDate)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => onDateChange(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
            >
              Día Anterior
            </Button>
            <Button variant="outline" onClick={() => onDateChange(new Date())}>
              Hoy
            </Button>
            <Button
              variant="outline"
              onClick={() => onDateChange(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
            >
              Día Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay citas programadas para este día</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {appointment.patientName}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {appointment.room}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="font-medium">{appointment.type}</p>
                  <p className="text-sm text-gray-500">Duración: {appointment.duration} minutos</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
