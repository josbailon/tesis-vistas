"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// En una aplicación real, obtendríamos el rol del usuario desde la sesión
// Por ahora, simulamos un rol para mostrar el diseño
const userRole = "student" // Puede ser: "patient", "student", "professor"

// Datos de ejemplo para las citas
const sampleAppointments = [
  {
    id: 1,
    patientName: "Ana García",
    date: new Date(2025, 4, 22, 10, 0),
    duration: 60,
    status: "confirmed",
    type: "Revisión",
    doctor: "Dr. Martínez",
    specialty: "Ortodoncia",
    notes: "Ajuste de brackets",
  },
  {
    id: 2,
    patientName: "Carlos López",
    date: new Date(2025, 4, 23, 15, 30),
    duration: 45,
    status: "pending",
    type: "Primera Consulta",
    doctor: "Dra. Rodríguez",
    specialty: "Endodoncia",
    notes: "Evaluación inicial",
  },
  {
    id: 3,
    patientName: "María Fernández",
    date: new Date(2025, 4, 24, 9, 0),
    duration: 90,
    status: "confirmed",
    type: "Tratamiento",
    doctor: "Dr. Sánchez",
    specialty: "Periodoncia",
    notes: "Limpieza profunda",
  },
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState(sampleAppointments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {userRole === "patient" ? "Mis Citas" : "Gestión de Citas"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "patient"
              ? "Consulta y solicita tus citas odontológicas"
              : "Administra las citas de tus pacientes"}
          </p>
        </div>
        {userRole !== "patient" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Cita
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agendar Nueva Cita</DialogTitle>
                <DialogDescription>Completa los detalles para agendar una nueva cita</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patient" className="text-right">
                    Paciente
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Seleccionar paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ana">Ana García</SelectItem>
                        <SelectItem value="carlos">Carlos López</SelectItem>
                        <SelectItem value="maria">María Fernández</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Fecha
                  </Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Hora
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Seleccionar hora" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">9:00 AM</SelectItem>
                        <SelectItem value="9:30">9:30 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="10:30">10:30 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="11:30">11:30 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duración
                  </Label>
                  <div className="col-span-3">
                    <Select defaultValue="60">
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Seleccionar duración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="90">1 hora 30 minutos</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Tipo
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primera">Primera Consulta</SelectItem>
                        <SelectItem value="revision">Revisión</SelectItem>
                        <SelectItem value="tratamiento">Tratamiento</SelectItem>
                        <SelectItem value="urgencia">Urgencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialty" className="text-right">
                    Especialidad
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Seleccionar especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="endodoncia">Endodoncia</SelectItem>
                        <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                        <SelectItem value="periodoncia">Periodoncia</SelectItem>
                        <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                        <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="professor" className="text-right">
                    Profesor
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger id="professor">
                        <SelectValue placeholder="Seleccionar profesor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="martinez">Dr. Martínez</SelectItem>
                        <SelectItem value="rodriguez">Dra. Rodríguez</SelectItem>
                        <SelectItem value="sanchez">Dr. Sánchez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notas
                  </Label>
                  <Textarea id="notes" placeholder="Detalles adicionales sobre la cita" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                  Agendar Cita
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{appointment.patientName}</CardTitle>
                  <CardDescription>{appointment.type}</CardDescription>
                </div>
                <div
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{format(appointment.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(appointment.date, "h:mm a", { locale: es })} - {appointment.duration} min
                  </span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Especialidad:</strong> {appointment.specialty}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Doctor:</strong> {appointment.doctor}
                  </p>
                  {appointment.notes && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Notas:</strong> {appointment.notes}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            {userRole !== "patient" && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {userRole === "patient" && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Solicitar Nueva Cita</CardTitle>
            <CardDescription>Completa el formulario para solicitar una nueva cita</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment-date">Fecha Preferida</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-time">Hora Preferida</Label>
                  <Select>
                    <SelectTrigger id="appointment-time">
                      <SelectValue placeholder="Seleccionar hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Mañana (9:00 - 12:00)</SelectItem>
                      <SelectItem value="afternoon">Tarde (14:00 - 18:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-type">Tipo de Cita</Label>
                <Select>
                  <SelectTrigger id="appointment-type">
                    <SelectValue placeholder="Seleccionar tipo de cita" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primera">Primera Consulta</SelectItem>
                    <SelectItem value="revision">Revisión</SelectItem>
                    <SelectItem value="tratamiento">Tratamiento</SelectItem>
                    <SelectItem value="urgencia">Urgencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-specialty">Especialidad</Label>
                <Select>
                  <SelectTrigger id="appointment-specialty">
                    <SelectValue placeholder="Seleccionar especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="periodoncia">Periodoncia</SelectItem>
                    <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                    <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-notes">Motivo de la Consulta</Label>
                <Textarea id="appointment-notes" placeholder="Describe brevemente el motivo de tu consulta" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Solicitar Cita</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
