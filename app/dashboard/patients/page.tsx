"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, Phone, Mail, Calendar, MapPin, Eye, Edit } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const mockPatients = [
  {
    id: 1,
    name: "María González",
    age: 28,
    phone: "0987654321",
    email: "maria.gonzalez@email.com",
    address: "Av. Principal 123, Manta",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    status: "active",
    specialty: "Endodoncia",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    age: 35,
    phone: "0976543210",
    email: "carlos.rodriguez@email.com",
    address: "Calle Secundaria 456, Manta",
    lastVisit: "2024-01-10",
    nextAppointment: null,
    status: "inactive",
    specialty: "Ortodoncia",
  },
  {
    id: 3,
    name: "Ana Martínez",
    age: 22,
    phone: "0965432109",
    email: "ana.martinez@email.com",
    address: "Barrio Central 789, Manta",
    lastVisit: "2024-01-20",
    nextAppointment: "2024-01-30",
    status: "active",
    specialty: "Odontopediatría",
  },
  {
    id: 4,
    name: "Luis Vásquez",
    age: 45,
    phone: "0954321098",
    email: "luis.vasquez@email.com",
    address: "Zona Norte 321, Manta",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-02-05",
    status: "active",
    specialty: "Cirugía Oral",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Activo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700">Inactivo</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSpecialtyColor = (specialty: string) => {
    const colors: { [key: string]: string } = {
      Endodoncia: "bg-purple-100 text-purple-700",
      Ortodoncia: "bg-blue-100 text-blue-700",
      "Cirugía Oral": "bg-red-100 text-red-700",
      Odontopediatría: "bg-green-100 text-green-700",
      Periodoncia: "bg-pink-100 text-pink-700",
    }
    return colors[specialty] || "bg-gray-100 text-gray-700"
  }

  return (
    <ProtectedRoute allowedRoles={["student", "professor", "admin", "secretary"]}>
      <div className="space-y-6 p-6">
        <div className="fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gestión de Pacientes
          </h1>
          <p className="text-blue-600 mt-2 text-lg">Administra la información de todos los pacientes</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{mockPatients.length}</div>
              <p className="text-blue-500">Total Pacientes</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockPatients.filter((p) => p.status === "active").length}
              </div>
              <p className="text-blue-500">Activos</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {mockPatients.filter((p) => p.nextAppointment).length}
              </div>
              <p className="text-blue-500">Con Citas</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {Math.round(mockPatients.reduce((acc, curr) => acc + curr.age, 0) / mockPatients.length)}
              </div>
              <p className="text-blue-500">Edad Promedio</p>
            </CardContent>
          </Card>
        </div>

        {/* Controles de búsqueda y filtros */}
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, teléfono o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-blue-200 focus:ring-blue-500"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">Todos los Estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
              <Button className="btn-medical">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Paciente
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de pacientes */}
        <div className="grid gap-4">
          {filteredPatients.length === 0 ? (
            <Card className="medical-card">
              <CardContent className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-blue-300" />
                <h3 className="text-lg font-semibold text-blue-600 mb-2">No se encontraron pacientes</h3>
                <p className="text-blue-500">Intenta ajustar los filtros de búsqueda</p>
              </CardContent>
            </Card>
          ) : (
            filteredPatients.map((patient) => (
              <Card key={patient.id} className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-blue-700">{patient.name}</h3>
                          {getStatusBadge(patient.status)}
                          <Badge className={getSpecialtyColor(patient.specialty)}>{patient.specialty}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-500" />
                              <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-blue-500" />
                              <span>{patient.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              <span>{patient.address}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span>Última visita: {patient.lastVisit}</span>
                            </div>
                            {patient.nextAppointment && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-green-500" />
                                <span className="text-green-600">Próxima cita: {patient.nextAppointment}</span>
                              </div>
                            )}
                            <div className="text-blue-600">
                              <span>Edad: {patient.age} años</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" className="btn-medical">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
