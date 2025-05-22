"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Appointment {
  id: string
  date: string
  time: string
  doctor: string
  specialty: string
  status: "confirmed" | "pending" | "cancelled"
}

export default function MyAppointmentsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Datos de ejemplo
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2023-05-15",
      time: "10:00 AM",
      doctor: "Dr. María Estudiante",
      specialty: "Odontología General",
      status: "confirmed",
    },
    {
      id: "2",
      date: "2023-05-22",
      time: "11:30 AM",
      doctor: "Dr. Carlos Profesor",
      specialty: "Ortodoncia",
      status: "pending",
    },
  ]

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          // Si no hay usuario, redirigir a login
          window.location.href = "/login"
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e)
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
          <h2 className="text-2xl font-bold">Cargando...</h2>
          <p className="text-muted-foreground">Por favor espere mientras cargamos sus citas.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Citas</h1>
        <p className="text-muted-foreground">Gestiona tus citas médicas programadas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>Cita {appointment.id}</CardTitle>
                <Badge
                  variant={
                    appointment.status === "confirmed"
                      ? "default"
                      : appointment.status === "pending"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {appointment.status === "confirmed"
                    ? "Confirmada"
                    : appointment.status === "pending"
                      ? "Pendiente"
                      : "Cancelada"}
                </Badge>
              </div>
              <CardDescription>{appointment.specialty}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{appointment.doctor}</span>
                </div>
                <div className="flex justify-between mt-4">
                  {appointment.status === "pending" && (
                    <>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center text-destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </>
                  )}
                  {appointment.status === "confirmed" && (
                    <Button variant="outline" size="sm" className="flex items-center text-destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="mt-4">Solicitar Nueva Cita</Button>
    </div>
  )
}
