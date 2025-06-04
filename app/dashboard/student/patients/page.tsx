"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Calendar,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  User,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  lastVisit: string
  nextAppointment?: string
  status: "active" | "inactive" | "completed"
  assignedDate: string
  clinicalCases: number
  odontograms: number
  histories: number
  specialty: string
}

export default function StudentPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")

  const patients: Patient[] = [
    {
      id: "pat1",
      name: "Ana García Rodríguez",
      age: 28,
      gender: "Femenino",
      phone: "+593 99 123 4567",
      email: "ana.garcia@email.com",
      address: "Av. Universitaria 123, Manta",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-22",
      status: "active",
      assignedDate: "2023-09-15",
      clinicalCases: 3,
      odontograms: 2,
      histories: 5,
      specialty: "Endodoncia",
    },
    {
      id: "pat2",
      name: "Carlos López Mendoza",
      age: 35,
      gender: "Masculino",
      phone: "+593 98 765 4321",
      email: "carlos.lopez@email.com",
      address: "Calle 24 de Mayo 456, Manta",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-25",
      status: "active",
      assignedDate: "2023-10-01",
      clinicalCases: 2,
      odontograms: 1,
      histories: 3,
      specialty: "Ortodoncia",
    },
    {
      id: "pat3",
      name: "María Fernández Silva",
      age: 42,
      gender: "Femenino",
      phone: "+593 97 888 9999",
      email: "maria.fernandez@email.com",
      address: "Barrio Los Esteros, Manta",
      lastVisit: "2024-01-08",
      status: "completed",
      assignedDate: "2023-08-20",
      clinicalCases: 4,
      odontograms: 3,
      histories: 6,
      specialty: "Cirugía Oral",
    },
    {
      id: "pat4",
      name: "Pedro Ramírez Castro",
      age: 19,
      gender: "Masculino",
      phone: "+593 96 555 7777",
      email: "pedro.ramirez@email.com",
      address: "Ciudadela El Palmar, Manta",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-01-20",
      status: "active",
      assignedDate: "2023-11-10",
      clinicalCases: 1,
      odontograms: 1,
      histories: 2,
      specialty: "Periodoncia",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Activo</Badge>
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-700">Inactivo</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-700">Completado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    const matchesSpecialty = specialtyFilter === "all" || patient.specialty === specialtyFilter

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const PatientCard = ({ patient }: { patient: Patient }) => (
    <Card className="medical-card hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-blue-800">{patient.name}</CardTitle>
              <CardDescription className="text-blue-600">
                {patient.age} años • {patient.gender} • {patient.specialty}
              </CardDescription>
            </div>
          </div>
          {getStatusBadge(patient.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-500" />
            <span className="text-blue-700">{patient.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            <span className="text-blue-700 truncate">{patient.email}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-blue-700 text-xs">{patient.address}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-800">{patient.clinicalCases}</div>
            <div className="text-xs text-blue-600">Casos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-800">{patient.odontograms}</div>
            <div className="text-xs text-green-600">Odontogramas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-800">{patient.histories}</div>
            <div className="text-xs text-purple-600">Historias</div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-blue-600">Última visita:</span>
            <span className="text-blue-800 font-medium">{patient.lastVisit}</span>
          </div>
          {patient.nextAppointment && (
            <div className="flex items-center justify-between">
              <span className="text-blue-600">Próxima cita:</span>
              <span className="text-blue-800 font-medium">{patient.nextAppointment}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/dashboard/student/patients/${patient.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
              <Eye className="h-3.5 w-3.5 mr-1" />
              Ver Perfil
            </Button>
          </Link>
          <Link href={`/dashboard/student/patients/${patient.id}/edit`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-green-300 text-green-700 hover:bg-green-50">
              <Edit className="h-3.5 w-3.5 mr-1" />
              Editar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mis Pacientes
          </h1>
          <p className="text-blue-600 mt-2">Gestiona y administra tus pacientes asignados</p>
        </div>
        <Button className="btn-medical">
          <Plus className="h-4 w-4 mr-2" />
          Solicitar Paciente
        </Button>
      </div>

      {/* Filtros */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-blue-500" />
              <Input
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-blue-50/50 border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="specialty-filter" className="text-sm text-blue-700">
                  Especialidad:
                </Label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger id="specialty-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                    <SelectItem value="Periodoncia">Periodoncia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status-filter" className="text-sm text-blue-700">
                  Estado:
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                    <SelectItem value="completed">Completados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Pacientes</p>
                <p className="text-2xl font-bold text-blue-800">{patients.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Activos</p>
                <p className="text-2xl font-bold text-green-800">
                  {patients.filter((p) => p.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Casos Totales</p>
                <p className="text-2xl font-bold text-purple-800">
                  {patients.reduce((sum, p) => sum + p.clinicalCases, 0)}
                </p>
              </div>
              <Stethoscope className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Próximas Citas</p>
                <p className="text-2xl font-bold text-orange-800">{patients.filter((p) => p.nextAppointment).length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Pacientes */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="bg-blue-100">
          <TabsTrigger value="grid" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Vista de Tarjetas
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Vista de Lista
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card className="medical-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <tr>
                      <th className="text-left p-4 text-blue-800 font-medium">Paciente</th>
                      <th className="text-left p-4 text-blue-800 font-medium">Contacto</th>
                      <th className="text-left p-4 text-blue-800 font-medium">Especialidad</th>
                      <th className="text-left p-4 text-blue-800 font-medium">Estado</th>
                      <th className="text-left p-4 text-blue-800 font-medium">Última Visita</th>
                      <th className="text-left p-4 text-blue-800 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="border-t border-blue-100 hover:bg-blue-50/50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-blue-800">{patient.name}</div>
                            <div className="text-sm text-blue-600">
                              {patient.age} años • {patient.gender}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="text-blue-700">{patient.phone}</div>
                            <div className="text-blue-600">{patient.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            {patient.specialty}
                          </Badge>
                        </td>
                        <td className="p-4">{getStatusBadge(patient.status)}</td>
                        <td className="p-4 text-blue-700">{patient.lastVisit}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Link href={`/dashboard/student/patients/${patient.id}`}>
                              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/student/patients/${patient.id}/edit`}>
                              <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
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
    </div>
  )
}
