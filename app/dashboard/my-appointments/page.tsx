"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para citas
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    date: "2023-06-15",
    time: "10:00",
    doctor: "Dr. Carlos Martínez",
    specialty: "Ortodoncia",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2023-06-20",
    time: "15:30",
    doctor: "Dra. Laura Sánchez",
    specialty: "Odontología General",
    status: "pending",
  },
  {
    id: 3,
    date: "2023-07-05",
    time: "11:15",
    doctor: "Dr. Miguel Rodríguez",
    specialty: "Endodoncia",
    status: "confirmed",
  },
]

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga de datos
    const loadAppointments = () => {
      setTimeout(() => {
        setAppointments(MOCK_APPOINTMENTS)
        setLoading(false)
      }, 1000)
    }

    loadAppointments()
  }, [])

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mis Citas</h1>

      <div className="grid gap-6">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{appointment.specialty}</CardTitle>
                    <CardDescription>{appointment.doctor}</CardDescription>
                  </div>
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="capitalize">
                    {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(appointment.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{appointment.time} hrs</span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => cancelAppointment(appointment.id)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancelar cita
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="mb-4 text-center text-muted-foreground">No tienes citas programadas</p>
              <Button>Agendar una cita</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
