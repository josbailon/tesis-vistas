import { getCurrentUser } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

// Mock data for patient appointments
const patientAppointments = [
  {
    id: "apt1",
    date: "2023-05-25",
    time: "10:00 AM",
    student: "Carlos Rodríguez",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
    status: "confirmed",
  },
  {
    id: "apt2",
    date: "2023-06-02",
    time: "11:30 AM",
    student: "Ana López",
    professor: "Dra. Sánchez",
    specialty: "Ortodoncia",
    status: "pending",
  },
  {
    id: "apt3",
    date: "2023-06-15",
    time: "09:15 AM",
    student: "Carlos Rodríguez",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
    status: "completed",
  },
]

export default async function MyAppointmentsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "patient") {
    redirect("/dashboard")
  }

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completada</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelada</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Format date to local format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Citas</h1>
        <p className="text-muted-foreground">Visualiza y gestiona tus citas programadas en la clínica dental.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Citas Programadas</CardTitle>
          <CardDescription>Listado de todas tus citas pasadas y futuras.</CardDescription>
        </CardHeader>
        <CardContent>
          {patientAppointments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(appointment.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {appointment.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {appointment.student}
                      </div>
                    </TableCell>
                    <TableCell>{appointment.specialty}</TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={appointment.status === "completed" || appointment.status === "cancelled"}
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No tienes citas programadas.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solicitar Nueva Cita</CardTitle>
          <CardDescription>Propón una fecha y hora para tu próxima cita.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Puedes solicitar una nueva cita indicando tus preferencias de fecha y hora. Ten en cuenta que la cita
              deberá ser confirmada por un estudiante o profesor.
            </p>
            <Button>Solicitar Cita</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
