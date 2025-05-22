"use client"

import { useEffect, useState } from "react"
import { Search, Plus, FileText, Calendar, Phone, Mail, Edit, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  lastVisit: string
  specialty: string
  status: "active" | "inactive"
}

export default function PatientsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false)
  const [isViewPatientDialogOpen, setIsViewPatientDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Datos de ejemplo para los pacientes
  const patients: Patient[] = [
    {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@example.com",
      phone: "555-123-4567",
      lastVisit: "2023-05-10",
      specialty: "Odontología General",
      status: "active",
    },
    {
      id: "2",
      name: "Carlos López",
      email: "carlos.lopez@example.com",
      phone: "555-987-6543",
      lastVisit: "2023-05-15",
      specialty: "Ortodoncia",
      status: "active",
    },
    {
      id: "3",
      name: "María Fernández",
      email: "maria.fernandez@example.com",
      phone: "555-456-7890",
      lastVisit: "2023-04-01",
      specialty: "Periodoncia",
      status: "inactive",
    },
    {
      id: "4",
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "555-234-5678",
      lastVisit: "2023-05-12",
      specialty: "Cirugía Oral",
      status: "active",
    },
    {
      id: "5",
      name: "Sofía Ramírez",
      email: "sofia.ramirez@example.com",
      phone: "555-876-5432",
      lastVisit: "2023-05-08",
      specialty: "Ortodoncia",
      status: "active",
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
          router.push("/login")
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
          <h2 className="text-2xl font-bold">Cargando...</h2>
          <p className="text-muted-foreground">Por favor espere mientras cargamos la lista de pacientes.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Filtrar pacientes según los criterios de búsqueda y filtros
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Separar pacientes activos e inactivos para las pestañas
  const activePatients = filteredPatients.filter((patient) => patient.status === "active")
  const inactivePatients = filteredPatients.filter((patient) => patient.status === "inactive")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground">Gestiona tus pacientes y sus tratamientos</p>
        </div>
        <Dialog open={isAddPatientDialogOpen} onOpenChange={setIsAddPatientDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Paciente</DialogTitle>
              <DialogDescription>Completa los detalles para registrar un nuevo paciente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-name">Nombre Completo</Label>
                  <Input id="patient-name" placeholder="Nombre y Apellidos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-dob">Fecha de Nacimiento</Label>
                  <Input id="patient-dob" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-email">Correo Electrónico</Label>
                  <Input id="patient-email" type="email" placeholder="correo@ejemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-phone">Teléfono</Label>
                  <Input id="patient-phone" placeholder="555-123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-address">Dirección</Label>
                <Input id="patient-address" placeholder="Dirección completa" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-specialty">Especialidad Principal</Label>
                  <Select>
                    <SelectTrigger id="patient-specialty">
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
                  <Label htmlFor="patient-status">Estado</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="patient-status">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-notes">Notas Médicas</Label>
                <Textarea id="patient-notes" placeholder="Alergias, condiciones médicas, medicamentos, etc." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddPatientDialogOpen(false)}>
                Registrar Paciente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pacientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="status-filter" className="text-sm">
            Estado:
          </Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" className="w-[150px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Pacientes Activos</TabsTrigger>
          <TabsTrigger value="inactive">Pacientes Inactivos</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activePatients.map((patient) => (
              <Card key={patient.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>{patient.specialty}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Activo
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {patient.lastVisit ? <>Última visita: {patient.lastVisit}</> : <>Sin citas programadas</>}
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Tratamiento actual:</strong> {patient.specialty}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setIsViewPatientDialogOpen(true)
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Ver Perfil
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Expediente
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Citas
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inactivePatients.map((patient) => (
              <Card key={patient.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>{patient.specialty}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                      Inactivo
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Última visita: {patient.lastVisit}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Último tratamiento:</strong> {patient.specialty}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPatient(patient)
                      setIsViewPatientDialogOpen(true)
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Ver Perfil
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Expediente
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-600">
                      <Edit className="mr-2 h-4 w-4" />
                      Reactivar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para ver detalles del paciente */}
      {selectedPatient && (
        <Dialog open={isViewPatientDialogOpen} onOpenChange={setIsViewPatientDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Perfil del Paciente</DialogTitle>
              <DialogDescription>Información detallada del paciente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-2xl">{selectedPatient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                  <p className="text-muted-foreground">
                    {selectedPatient.status === "active" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        Inactivo
                      </Badge>
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Fecha de Nacimiento</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.lastVisit}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Teléfono</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Correo Electrónico</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dirección</p>
                  <p className="text-sm text-muted-foreground">Calle Principal 123, Ciudad</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Especialidad Principal</p>
                <p className="text-sm text-muted-foreground">{selectedPatient.specialty}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Tratamiento Actual</p>
                <p className="text-sm text-muted-foreground">{selectedPatient.specialty}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Última Visita</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.lastVisit}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Próxima Cita</p>
                  <p className="text-sm text-muted-foreground">Sin citas programadas</p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Expediente
                </Button>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Gestionar Citas
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                {selectedPatient.status === "active" ? (
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Desactivar
                  </Button>
                ) : (
                  <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <Edit className="mr-2 h-4 w-4" />
                    Reactivar
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
