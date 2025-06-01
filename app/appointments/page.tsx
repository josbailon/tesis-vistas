"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useAppointments } from "@/contexts/appointment-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppointmentForm } from "@/components/appointment-form"
import { DailyAgenda } from "@/components/daily-agenda"
import { AppointmentList } from "@/components/appointment-list"
import { Calendar, Search, Plus, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"

export default function AppointmentsPage() {
  const { user } = useAuth()
  const { appointments } = useAppointments()
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Filtrar citas según los criterios
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesPriority = priorityFilter === "all" || appointment.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Citas</h1>
            <p className="text-muted-foreground">Administra las citas médicas de la clínica dental universitaria.</p>
          </div>
          <Button onClick={() => setShowNewAppointmentForm(!showNewAppointmentForm)}>
            <Plus className="mr-2 h-4 w-4" />
            {showNewAppointmentForm ? "Cancelar" : "Nueva Cita"}
          </Button>
        </div>

        {showNewAppointmentForm && (
          <Card>
            <CardHeader>
              <CardTitle>Programar Nueva Cita</CardTitle>
              <CardDescription>Complete el formulario para agendar una nueva cita</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentForm
                onSuccess={() => setShowNewAppointmentForm(false)}
                onCancel={() => setShowNewAppointmentForm(false)}
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Filtros y Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar citas..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="status-filter" className="mb-1 block text-sm">
                  Estado
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="scheduled">Programada</SelectItem>
                    <SelectItem value="confirmed">Confirmada</SelectItem>
                    <SelectItem value="completed">Completada</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                    <SelectItem value="no-show">No asistió</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority-filter" className="mb-1 block text-sm">
                  Prioridad
                </Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger id="priority-filter">
                    <SelectValue placeholder="Todas las prioridades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las prioridades</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setPriorityFilter("all")
                  }}
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">
              <Filter className="mr-2 h-4 w-4" />
              Lista de Citas
            </TabsTrigger>
            <TabsTrigger value="agenda">
              <Calendar className="mr-2 h-4 w-4" />
              Agenda Diaria
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Citas {searchTerm || statusFilter !== "all" || priorityFilter !== "all" ? "(Filtradas)" : ""}
                </CardTitle>
                <CardDescription>{filteredAppointments.length} citas encontradas</CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentList appointments={filteredAppointments} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="agenda" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Agenda Diaria</CardTitle>
                <CardDescription>Vista de citas por hora</CardDescription>
              </CardHeader>
              <CardContent>
                <DailyAgenda appointments={filteredAppointments} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
