"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { sessionManager } from "@/lib/session-manager"

interface Appointment {
  id: number
  date: string
  time: string
  doctor: string
  specialty: string
  status: "confirmed" | "pending" | "completed"
  notes?: string
}

export default function MyAppointmentsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Datos de ejemplo para las citas
  const appointments: Appointment[] = [
    {
      id: 1,
      date: "2025-05-25",
      time: "10:00",
      doctor: "Dr. Martínez",
      specialty: "Endodoncia",
      status: "confirmed",
      notes: "Revisión de tratamiento de conducto",
    },
    {
      id: 2,
      date: "2025-06-10",
      time: "15:30",
      doctor: "Dra. Rodríguez",
      specialty: "Ortodoncia",
      status: "pending",
      notes: "Ajuste de brackets",
    },
    {
      id: 3,
      date: "2025-04-15",
      time: "09:00",
      doctor: "Dr. Sánchez",
      specialty: "Periodoncia",
      status: "completed",
      notes: "Limpieza dental profunda",
    },
  ]

  useEffect(() => {
    // Verificar si hay un usuario en la sesión
    const checkAuth = () => {
      try {
        const currentUser = sessionManager.getUser()
        if (currentUser) {
          if (currentUser.role !== "patient") {
            // Si no es paciente, redirigir a la página correspondiente
            let redirectPath = "/dashboard"
            switch (currentUser.role) {
              case "student":
                redirectPath = "/dashboard/patients"
                break
              case "professor":
                redirectPath = "/dashboard/specialty"
                break
              case "admin":
                redirectPath = "/dashboard/users"
                break
            }
            router.push(redirectPath)
          }
          setUser(currentUser)
        } else {
          router.push("/login")
        }
      } catch (e) {
        console.error("Error al verificar autenticación:", e)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      checkAuth()
    }
  }, [router])

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

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  // Obtener estado de la cita
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completada</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Citas</h1>
        <p className="text-muted-foreground">Gestiona tus citas odontológicas</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle>{appointment.specialty}</CardTitle>
                {getStatusBadge(appointment.status)}
              </div>
              <CardDescription>{appointment.doctor}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{appointment.time}</span>
                </div>
                {appointment.notes && (
                  <div className="flex items-start pt-2">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-muted-foreground">{appointment.notes}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="mt-4">Solicitar Nueva Cita</Button>
    </div>
  )
}
