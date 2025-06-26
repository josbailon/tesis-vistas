"use client"

import { useState } from "react"
import { Calendar, Clock, User, Filter, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AppointmentListProps {
  searchTerm: string
}

export function AppointmentList({ searchTerm }: AppointmentListProps) {
  const [appointments] = useState([
    {
      id: "1",
      date: "2024-01-15",
      time: "09:00",
      patientName: "María García",
      type: "Consulta General",
      status: "confirmada",
      doctor: "Dr. Smith",
    },
    {
      id: "2",
      date: "2024-01-15",
      time: "10:30",
      patientName: "Juan Pérez",
      type: "Limpieza Dental",
      status: "pendiente",
      doctor: "Dr. Johnson",
    },
    {
      id: "3",
      date: "2024-01-16",
      time: "14:00",
      patientName: "Ana López",
      type: "Tratamiento de Conducto",
      status: "confirmada",
      doctor: "Dr. Williams",
    },
  ])

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Todas las Citas</span>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron citas</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {appointment.patientName}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-gray-500">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
