import { getCurrentUser } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Plus, Edit, Trash2 } from "lucide-react"

// Mock data for student appointments
const studentAppointments = [
  {
    id: "apt1",
    patientName: "María González",
    patientId: "pat1",
    date: "2023-05-25",
    time: "10:00 AM",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
    status: "confirmed",
    notes: "Seguimiento de tratamiento de conducto",
  },
  {
    id: "apt2",
    patientName: "Juan Pérez",
    patientId: "pat2",
    date: "2023-06-02",
    time: "11:30 AM",
    professor: "Dra. Sánchez",
    specialty: "Ortodoncia",
    status: "pending",
    notes: "Primera consulta para evaluación",
  },
  {
    id: "apt3",
    patientName: "Laura Torres",
    patientId: "pat3",
    date: "2023-06-15",
    time: "09:15 AM",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
    status: "completed",
    notes: "Revisión post-tratamiento",
  },
]

// Mock data for available time slots
const availableTimeSlots = [
  {
    id: "slot1",
    date: "2023-05-30",
    time: "09:00 AM",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
  },
  {
    id: "slot2",
    date: "2023-05-30",
    time: "10:30 AM",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
  },
  {
    id: "slot3",
    date: "2023-06-01",
    time: "11:00 AM",
    professor: "Dra. Sánchez",
    specialty: "Ortodoncia",
  },
  {
    id: "slot4",
    date: "2023-06-02",
    time: "09:30 AM",
    professor: "Dra. Sánchez",
    specialty: "Ortodoncia",
  },
]

export default async function AppointmentManagementPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "student") {
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Citas</h1>
          <p className="text-muted-foreground">Administra las citas de tus pacientes.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nueva Cita</span>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="past">Pasadas</TabsTrigger>
          <TabsTrigger value="available">Horarios Disponibles</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Citas Programadas</CardTitle>
              <CardDescription>Gestiona las próximas citas con tus pacientes.</CardDescription>
            </CardHeader>
            <CardContent>
              {studentAppointments.filter((apt) => apt.status !== "completed").length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Profesor</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAppointments
                      .filter((apt) => apt.status !== "completed")
                      .map((appointment) => (
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
                              {appointment.patientName}
                            </div>
                          </TableCell>
                          <TableCell>{appointment.specialty}</TableCell>
                          <TableCell>{appointment.professor}</TableCell>
                          <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay citas próximas programadas.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Citas Pasadas</CardTitle>
              <CardDescription>Historial de citas completadas con tus pacientes.</CardDescription>
            </CardHeader>
            <CardContent>
              {studentAppointments.filter((apt) => apt.status === "completed").length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Profesor</TableHead>
                      <TableHead>Notas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAppointments
                      .filter((apt) => apt.status === "completed")
                      .map((appointment) => (
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
                              {appointment.patientName}
                            </div>
                          </TableCell>
                          <TableCell>{appointment.specialty}</TableCell>
                          <TableCell>{appointment.professor}</TableCell>
                          <TableCell>{appointment.notes}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay citas pasadas registradas.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Horarios Disponibles</CardTitle>
              <CardDescription>Horarios disponibles para programar nuevas citas.</CardDescription>
            </CardHeader>
            <CardContent>
              {availableTimeSlots.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Profesor</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {availableTimeSlots.map((slot) => (
                      <TableRow key={slot.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDate(slot.date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {slot.time}
                          </div>
                        </TableCell>
                        <TableCell>{slot.specialty}</TableCell>
                        <TableCell>{slot.professor}</TableCell>
                        <TableCell>
                          <Button size="sm">Reservar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay horarios disponibles actualmente.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
