"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Search,
  Plus,
  Calendar,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react"

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@email.com",
    phone: "0987654321",
    age: 28,
    address: "Av. Principal 123, Manta",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    status: "active",
    treatments: ["Limpieza", "Ortodoncia"],
    emergencyContact: "María García - 0987654322",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "0987654323",
    age: 35,
    address: "Calle 24 de Mayo 456, Manta",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-30",
    status: "active",
    treatments: ["Endodoncia", "Corona"],
    emergencyContact: "Rosa Mendoza - 0987654324",
  },
  {
    id: "3",
    name: "María López",
    email: "maria.lopez@email.com",
    phone: "0987654325",
    age: 42,
    address: "Av. 4 de Noviembre 789, Manta",
    lastVisit: "2024-01-08",
    nextAppointment: null,
    status: "inactive",
    treatments: ["Limpieza", "Extracción"],
    emergencyContact: "Juan López - 0987654326",
  },
  {
    id: "4",
    name: "Roberto Silva",
    email: "roberto.silva@email.com",
    phone: "0987654327",
    age: 29,
    address: "Calle Bolívar 321, Manta",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-28",
    status: "active",
    treatments: ["Ortodoncia", "Blanqueamiento"],
    emergencyContact: "Elena Silva - 0987654328",
  },
]

export default function PatientsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  // Verify user is student
  if (!user || user.role !== "student") {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-error-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-primary-800 mb-2">Acceso Denegado</h2>
          <p className="text-primary-600">Solo los estudiantes pueden acceder a esta página.</p>
        </div>
      </div>
    )
  }

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-100 text-success-700 border-success-300"
      case "inactive":
        return "bg-neutral-100 text-neutral-700 border-neutral-300"
      default:
        return "bg-info-100 text-info-700 border-info-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Gestión de Pacientes</h1>
          <p className="text-primary-600">Estudiante: {user.name}</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary-200 hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-800">Total Pacientes</CardTitle>
            <Users className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-700">{mockPatients.length}</div>
            <p className="text-xs text-primary-600">Pacientes asignados</p>
          </CardContent>
        </Card>

        <Card className="border-success-200 hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-success-800">Pacientes Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-success-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-700">
              {mockPatients.filter((p) => p.status === "active").length}
            </div>
            <p className="text-xs text-success-600">En tratamiento</p>
          </CardContent>
        </Card>

        <Card className="border-info-200 hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-info-800">Citas Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-info-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info-700">
              {mockPatients.filter((p) => p.nextAppointment).length}
            </div>
            <p className="text-xs text-info-600">Próximas citas</p>
          </CardContent>
        </Card>

        <Card className="border-warning-200 hover:shadow-soft transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-warning-800">Tratamientos</CardTitle>
            <FileText className="h-4 w-4 text-warning-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-700">
              {mockPatients.reduce((acc, p) => acc + p.treatments.length, 0)}
            </div>
            <p className="text-xs text-warning-600">En progreso</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-primary-200">
        <CardHeader>
          <CardTitle className="text-primary-800">Buscar Pacientes</CardTitle>
          <CardDescription className="text-primary-600">
            Encuentra pacientes por nombre, email o teléfono
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-primary-600" />
            <Input
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card className="border-primary-200">
        <CardHeader>
          <CardTitle className="text-primary-800">Lista de Pacientes</CardTitle>
          <CardDescription className="text-primary-600">
            {filteredPatients.length} paciente(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary-800">Paciente</TableHead>
                <TableHead className="text-primary-800">Contacto</TableHead>
                <TableHead className="text-primary-800">Estado</TableHead>
                <TableHead className="text-primary-800">Última Visita</TableHead>
                <TableHead className="text-primary-800">Próxima Cita</TableHead>
                <TableHead className="text-primary-800">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-primary-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-primary-800">{patient.name}</div>
                        <div className="text-sm text-primary-600">{patient.age} años</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-primary-700">
                        <Mail className="h-3 w-3 mr-1" />
                        {patient.email}
                      </div>
                      <div className="flex items-center text-sm text-primary-700">
                        <Phone className="h-3 w-3 mr-1" />
                        {patient.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(patient.status)}>{getStatusText(patient.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-primary-700">
                      <Clock className="h-3 w-3 mr-1" />
                      {patient.lastVisit}
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.nextAppointment ? (
                      <div className="flex items-center text-sm text-primary-700">
                        <Calendar className="h-3 w-3 mr-1" />
                        {patient.nextAppointment}
                      </div>
                    ) : (
                      <span className="text-sm text-neutral-500">Sin cita</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPatient(patient)}
                        className="border-primary-200 text-primary-700 hover:bg-primary-50"
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary-200 text-primary-700 hover:bg-primary-50"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Cita
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary-800">Detalles del Paciente</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPatient(null)}
                className="border-primary-200 text-primary-700 hover:bg-primary-100"
              >
                Cerrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-primary-100">
                <TabsTrigger value="info" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
                  Información
                </TabsTrigger>
                <TabsTrigger
                  value="treatments"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                >
                  Tratamientos
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-primary-600 data-[state=active]:text-white"
                >
                  Historial
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-primary-800 mb-2">Información Personal</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-primary-600" />
                        <span className="text-primary-700">{selectedPatient.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-primary-600" />
                        <span className="text-primary-700">{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-primary-600" />
                        <span className="text-primary-700">{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                        <span className="text-primary-700">{selectedPatient.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-800 mb-2">Contacto de Emergencia</h4>
                    <div className="text-sm text-primary-700">{selectedPatient.emergencyContact}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="treatments" className="space-y-4">
                <h4 className="font-semibold text-primary-800">Tratamientos Actuales</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.treatments.map((treatment: string, index: number) => (
                    <Badge key={index} className="bg-primary-100 text-primary-800 border-primary-300">
                      {treatment}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h4 className="font-semibold text-primary-800">Historial de Visitas</h4>
                <div className="text-sm text-primary-700">
                  <p>Última visita: {selectedPatient.lastVisit}</p>
                  {selectedPatient.nextAppointment && <p>Próxima cita: {selectedPatient.nextAppointment}</p>}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
