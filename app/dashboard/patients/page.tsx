"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Filter,
  Download,
  Upload,
  Stethoscope,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock patient data
const mockPatients = [
  {
    id: "pat1",
    name: "Ana García",
    email: "ana.garcia@email.com",
    phone: "+593 99 123 4567",
    address: "Av. 4 de Noviembre, Manta",
    dob: "1995-03-15",
    gender: "Femenino",
    status: "active",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    specialty: "Endodoncia",
    student: "Juan Pérez",
    professor: "Dr. Martínez",
    treatments: 3,
    avatar: "/placeholder.svg",
  },
  {
    id: "pat2",
    name: "Carlos López",
    email: "carlos.lopez@email.com",
    phone: "+593 99 234 5678",
    address: "Calle 13 de Abril, Manta",
    dob: "1988-07-22",
    gender: "Masculino",
    status: "active",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-28",
    specialty: "Ortodoncia",
    student: "María López",
    professor: "Dra. Rodríguez",
    treatments: 5,
    avatar: "/placeholder.svg",
  },
  {
    id: "pat3",
    name: "María Fernández",
    email: "maria.fernandez@email.com",
    phone: "+593 99 345 6789",
    address: "Av. Malecón, Manta",
    dob: "1992-11-08",
    gender: "Femenino",
    status: "inactive",
    lastVisit: "2023-12-20",
    nextAppointment: null,
    specialty: "Periodoncia",
    student: "Carlos Rodríguez",
    professor: "Dr. Sánchez",
    treatments: 2,
    avatar: "/placeholder.svg",
  },
]

export default function PatientsPage() {
  const { toast } = useToast()
  const [patients, setPatients] = useState(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    const matchesSpecialty = specialtyFilter === "all" || patient.specialty === specialtyFilter

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const handleAddPatient = () => {
    setIsAddPatientOpen(true)
  }

  const handleEditPatient = (patientId: string) => {
    toast({
      title: "Editar Paciente",
      description: `Editando paciente ${patientId}`,
    })
  }

  const handleViewPatient = (patientId: string) => {
    // Navigate to patient detail page
    window.location.href = `/dashboard/patient-view/${patientId}`
  }

  const handleScheduleAppointment = (patientId: string) => {
    toast({
      title: "Programar Cita",
      description: `Programando cita para paciente ${patientId}`,
    })
  }

  const handleExportData = () => {
    toast({
      title: "Exportando Datos",
      description: "Los datos de pacientes se están exportando...",
    })
  }

  const handleImportData = () => {
    toast({
      title: "Importar Datos",
      description: "Función de importación disponible próximamente",
    })
  }

  if (isLoading) {
    return <LoadingSpinner message="Cargando pacientes..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Pacientes</h1>
          <p className="text-muted-foreground">Administra la información de todos los pacientes de la clínica</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleImportData}>
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddPatient}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Paciente</DialogTitle>
                <DialogDescription>Completa la información del nuevo paciente</DialogDescription>
              </DialogHeader>
              <PatientForm onClose={() => setIsAddPatientOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">+2 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.filter((p) => p.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((patients.filter((p) => p.status === "active").length / patients.length) * 100)}% del total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tratamientos Activos</CardTitle>
            <Stethoscope className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.reduce((sum, p) => sum + p.treatments, 0)}</div>
            <p className="text-xs text-muted-foreground">En progreso</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pacientes por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="Periodoncia">Periodoncia</SelectItem>
                    <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
          <TabsTrigger value="table">Vista de Tabla</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>{patient.specialty}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={patient.status === "active" ? "default" : "secondary"}
                      className={patient.status === "active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {patient.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Última visita: {patient.lastVisit}</span>
                      <span>{patient.treatments} tratamientos</span>
                    </div>
                    {patient.nextAppointment && (
                      <div className="text-xs text-blue-600">Próxima cita: {patient.nextAppointment}</div>
                    )}
                  </div>

                  <div className="flex justify-between gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewPatient(patient.id)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => handleScheduleAppointment(patient.id)}>
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Paciente</th>
                      <th className="p-4 font-medium">Contacto</th>
                      <th className="p-4 font-medium">Especialidad</th>
                      <th className="p-4 font-medium">Estado</th>
                      <th className="p-4 font-medium">Última Visita</th>
                      <th className="p-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                              <AvatarFallback>
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-muted-foreground">{patient.gender}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div>{patient.email}</div>
                            <div className="text-muted-foreground">{patient.phone}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{patient.specialty}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={patient.status === "active" ? "default" : "secondary"}
                            className={patient.status === "active" ? "bg-green-100 text-green-800" : ""}
                          >
                            {patient.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{patient.lastVisit}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleScheduleAppointment(patient.id)}>
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron pacientes</h3>
            <p className="text-muted-foreground mb-4">No hay pacientes que coincidan con los filtros seleccionados.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setSpecialtyFilter("all")
              }}
            >
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Patient Form Component
function PatientForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "¡Éxito!",
        description: "Paciente agregado correctamente",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el paciente",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Nombre Completo</label>
          <Input placeholder="Nombre del paciente" required />
        </div>
        <div>
          <label className="text-sm font-medium">Teléfono</label>
          <Input placeholder="Número de teléfono" />
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="correo@ejemplo.com" />
        </div>
        <div>
          <label className="text-sm font-medium">Fecha de Nacimiento</label>
          <Input type="date" />
        </div>
        <div>
          <label className="text-sm font-medium">Género</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="femenino">Femenino</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium">Dirección</label>
          <Input placeholder="Dirección completa" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Paciente"}
        </Button>
      </div>
    </form>
  )
}
