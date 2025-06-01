"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, Clock, User, Edit, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TrafficLight } from "@/components/traffic-light"
import { AppointmentForm } from "@/components/appointment-form"
import { useAppointments } from "@/contexts/appointment-context"

interface AppointmentListProps {
  searchTerm: string
}

export function AppointmentList({ searchTerm }: AppointmentListProps) {
  const { appointments, deleteAppointment, updateAppointmentStatus } = useAppointments()
  const [editingAppointment, setEditingAppointment] = useState<any>(null)

  const filteredAppointments = appointments
    .filter(
      (appointment) =>
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })

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
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrafficLightStatus = (appointment: any) => {
    if (appointment.status === "cancelada" || appointment.status === "no-asistio") {
      return "unavailable"
    }
    if (appointment.status === "completada") {
      return "available"
    }
    if (appointment.priority === "urgent" || appointment.priority === "high") {
      return "pending"
    }
    return "available"
  }

  return (
    <div className="space-y-4">
      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron citas</h3>
            <p className="text-gray-600 text-center">
              {searchTerm ? "Intenta ajustar los términos de búsqueda" : "No se han programado citas aún"}
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <TrafficLight status={getTrafficLightStatus(appointment)} size="sm" />

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{appointment.title}</h3>
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <Badge variant="outline" className={getPriorityColor(appointment.priority)}>
                        {appointment.priority}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{appointment.patientName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(appointment.date), "d 'de' MMM, yyyy", { locale: es })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {appointment.time} ({appointment.duration} min)
                        </span>
                      </div>
                    </div>

                    {appointment.notes && <p className="text-sm text-gray-500 mt-2">{appointment.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingAppointment(appointment)}>
                    <Edit className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
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
                      <DropdownMenuItem onClick={() => deleteAppointment(appointment.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Edit Appointment Modal */}
      {editingAppointment && (
        <AppointmentForm
          editingAppointment={editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onSuccess={() => setEditingAppointment(null)}
        />
      )}
    </div>
  )
}
