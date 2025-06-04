"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppointments } from "@/contexts/appointment-context"
import { LoadingSpinner } from "@/components/loading-spinner"

interface AppointmentListProps {
  searchTerm: string
}

export function AppointmentList({ searchTerm }: AppointmentListProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <LoadingSpinner />
  }

  return <AppointmentListContent searchTerm={searchTerm} />
}

function AppointmentListContent({ searchTerm }: AppointmentListProps) {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useAppointments()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesPriority = priorityFilter === "all" || appointment.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
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
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="programada">Programada</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="no-asistio">No asistió</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Mostrando {filteredAppointments.length} de {appointments.length} citas
        </p>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No se encontraron citas que coincidan con los filtros</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAppointments
            .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())
            .map((appointment) => (
              <Card key={appointment.id} className={`border-l-4 ${getPriorityColor(appointment.priority)}`}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{new Date(appointment.date).toLocaleDateString("es-ES")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{appointment.time}</span>
                          <span className="text-gray-500">({appointment.duration} min)</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-1">{appointment.title}</h3>

                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.patientName}</span>
                      </div>

                      {appointment.notes && <p className="text-sm text-gray-600 mb-2">{appointment.notes}</p>}

                      <p className="text-xs text-gray-500">
                        Creada: {new Date(appointment.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <Badge variant="outline">{appointment.priority}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
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
                    {(appointment.status === "programada" || appointment.status === "confirmada") && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateAppointmentStatus(appointment.id, "no-asistio")}
                      >
                        No asistió
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateAppointmentStatus(appointment.id, "cancelada")}
                    >
                      Cancelar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteAppointment(appointment.id)}>
                      Eliminar
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
