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
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600">Solo los estudiantes pueden acceder a esta página.</p>
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
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
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
          <h1 className="text-3xl font-bold text-green-800">Gestión de Pacientes</h1>
          <p className="text-green-600">Estudiante: {user.name}</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Pacientes</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{mockPatients.length}</div>
            <p className="text-xs text-green-600">Pacientes asignados</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Pacientes Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {mockPatients.filter((p) => p.status === "active").length}
            </div>
            <p className="text-xs text-green-600">En tratamiento</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Citas Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {mockPatients.filter((p) => p.nextAppointment).length}
            </div>
            <p className="text-xs text-green-600">Próximas citas</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Tratamientos</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {mockPatients.reduce((acc, p) => acc + p.treatments.length, 0)}
            </div>
            <p className="text-xs text-green-600">En progreso</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Buscar Pacientes</CardTitle>
          <CardDescription className="text-green-600">Encuentra pacientes por nombre, email o teléfono</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-green-600" />
            <Input
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Lista de Pacientes</CardTitle>
          <CardDescription className="text-green-600">
            {filteredPatients.length} paciente(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-green-800">Paciente</TableHead>
                <TableHead className="text-green-800">Contacto</TableHead>
                <TableHead className="text-green-800">Estado</TableHead>
                <TableHead className="text-green-800">Última Visita</TableHead>
                <TableHead className="text-green-800">Próxima Cita</TableHead>
                <TableHead className="text-green-800">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-green-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-green-800">{patient.name}</div>
                        <div className="text-sm text-green-600">{patient.age} años</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-green-700">
                        <Mail className="h-3 w-3 mr-1" />
                        {patient.email}
                      </div>
                      <div className="flex items-center text-sm text-green-700">
                        <Phone className="h-3 w-3 mr-1" />
                        {patient.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(patient.status)}>{getStatusText(patient.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-green-700">
                      <Clock className="h-3 w-3 mr-1" />
                      {patient.lastVisit}
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.nextAppointment ? (
                      <div className="flex items-center text-sm text-green-700">
                        <Calendar className="h-3 w-3 mr-1" />
                        {patient.nextAppointment}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Sin cita</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPatient(patient)}
                        className="border-green-200 text-green-700 hover:bg-green-50"
                      >
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
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
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-800">Detalles del Paciente</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPatient(null)}
                className="border-green-200 text-green-700 hover:bg-green-100"
              >
                Cerrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Información Personal</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-green-700">{selectedPatient.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-green-700">{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-green-700">{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-green-700">{selectedPatient.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Contacto de Emergencia</h4>
                    <div className="text-sm text-green-700">{selectedPatient.emergencyContact}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="treatments" className="space-y-4">
                <h4 className="font-semibold text-green-800">Tratamientos Actuales</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.treatments.map((treatment: string, index: number) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {treatment}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h4 className="font-semibold text-green-800">Historial de Visitas</h4>
                <div className="text-sm text-green-700">
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
