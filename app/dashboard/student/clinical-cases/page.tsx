"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Stethoscope,
  Search,
  Plus,
  Eye,
  Edit,
  Upload,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react"

interface ClinicalCase {
  id: string
  patientName: string
  patientId: string
  treatment: string
  specialty: string
  startDate: string
  lastUpdate: string
  status: "active" | "completed" | "cancelled" | "on-hold"
  progress: number
  notes?: string
  professor: string
  approvalStatus: "pending" | "approved" | "rejected" | "revision-needed"
  estimatedCompletion: string
  sessionsCompleted: number
  totalSessions: number
}

export default function StudentClinicalCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")

  const clinicalCases: ClinicalCase[] = [
    {
      id: "cc1",
      patientName: "Ana García",
      patientId: "pat1",
      treatment: "Tratamiento de Conducto",
      specialty: "Endodoncia",
      startDate: "2023-12-10",
      lastUpdate: "2024-01-20",
      status: "active",
      progress: 75,
      notes: "Paciente responde bien al tratamiento. Próxima cita para finalizar.",
      professor: "Dr. Martínez",
      approvalStatus: "approved",
      estimatedCompletion: "2024-02-15",
      sessionsCompleted: 3,
      totalSessions: 4,
    },
    {
      id: "cc2",
      patientName: "Carlos López",
      patientId: "pat2",
      treatment: "Ortodoncia Correctiva",
      specialty: "Ortodoncia",
      startDate: "2023-11-15",
      lastUpdate: "2024-01-18",
      status: "active",
      progress: 45,
      notes: "Ajuste de brackets realizado. Evolución favorable.",
      professor: "Dra. Rodríguez",
      approvalStatus: "pending",
      estimatedCompletion: "2024-08-30",
      sessionsCompleted: 8,
      totalSessions: 18,
    },
    {
      id: "cc3",
      patientName: "María Fernández",
      patientId: "pat3",
      treatment: "Extracción de Terceros Molares",
      specialty: "Cirugía Oral y Maxilofacial",
      startDate: "2023-10-20",
      lastUpdate: "2024-01-01",
      status: "completed",
      progress: 100,
      notes: "Procedimiento completado exitosamente. Seguimiento post-operatorio normal.",
      professor: "Dra. López",
      approvalStatus: "approved",
      estimatedCompletion: "2024-01-01",
      sessionsCompleted: 2,
      totalSessions: 2,
    },
    {
      id: "cc4",
      patientName: "Pedro Ramírez",
      patientId: "pat4",
      treatment: "Tratamiento Periodontal",
      specialty: "Periodoncia",
      startDate: "2024-01-05",
      lastUpdate: "2024-01-22",
      status: "active",
      progress: 30,
      notes: "Fase inicial de raspado y alisado radicular. Paciente muestra buena higiene oral.",
      professor: "Dr. Vásquez",
      approvalStatus: "revision-needed",
      estimatedCompletion: "2024-04-15",
      sessionsCompleted: 2,
      totalSessions: 6,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-700">Activo</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completado</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelado</Badge>
      case "on-hold":
        return <Badge className="bg-yellow-100 text-yellow-700">En Pausa</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getApprovalBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-700">Aprobado</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rechazado</Badge>
      case "revision-needed":
        return <Badge className="bg-orange-100 text-orange-700">Necesita Revisión</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "revision-needed":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredCases = clinicalCases.filter((case_) => {
    const matchesSearch =
      case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesSpecialty = specialtyFilter === "all" || case_.specialty === specialtyFilter

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Casos Clínicos
          </h1>
          <p className="text-blue-600 mt-2">Gestiona y documenta tus casos clínicos</p>
        </div>
        <Button className="btn-medical">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Caso
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Casos</p>
                <p className="text-2xl font-bold text-blue-800">{clinicalCases.length}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Casos Activos</p>
                <p className="text-2xl font-bold text-blue-800">
                  {clinicalCases.filter((c) => c.status === "active").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Completados</p>
                <p className="text-2xl font-bold text-green-800">
                  {clinicalCases.filter((c) => c.status === "completed").length}
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
                <p className="text-sm font-medium text-yellow-700">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {clinicalCases.filter((c) => c.approvalStatus === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-blue-500" />
              <Input
                placeholder="Buscar casos..."
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
                    <SelectItem value="Cirugía Oral y Maxilofacial">Cirugía Oral</SelectItem>
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
                    <SelectItem value="completed">Completados</SelectItem>
                    <SelectItem value="cancelled">Cancelados</SelectItem>
                    <SelectItem value="on-hold">En Pausa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Casos */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-blue-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Todos los Casos
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Casos Activos
          </TabsTrigger>
          <TabsTrigger
            value="pending-approval"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Pendientes de Aprobación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="medical-card hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-blue-800">{case_.treatment}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-blue-600">
                        <User className="h-4 w-4" />
                        {case_.patientName} • {case_.specialty}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(case_.status)}
                      <div className="flex items-center gap-2">
                        {getApprovalBadge(case_.approvalStatus)}
                        {getStatusIcon(case_.approvalStatus)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="font-medium text-blue-700">Fecha de Inicio</Label>
                        <p className="text-blue-600">{case_.startDate}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-blue-700">Última Actualización</Label>
                        <p className="text-blue-600">{case_.lastUpdate}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-blue-700">Profesor Supervisor</Label>
                        <p className="text-blue-600">{case_.professor}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-blue-700">Finalización Estimada</Label>
                        <p className="text-blue-600">{case_.estimatedCompletion}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-medium text-blue-700">Progreso del Caso</Label>
                        <span className="text-sm font-medium text-blue-800">{case_.progress}%</span>
                      </div>
                      <Progress value={case_.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-blue-600">
                        <span>
                          Sesiones: {case_.sessionsCompleted}/{case_.totalSessions}
                        </span>
                        <span>{case_.totalSessions - case_.sessionsCompleted} sesiones restantes</span>
                      </div>
                    </div>

                    {case_.notes && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <Label className="font-medium text-blue-700">Notas</Label>
                        <p className="text-sm text-blue-600 mt-1">{case_.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        <Upload className="h-3.5 w-3.5 mr-1" />
                        Subir Archivos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases
              .filter((case_) => case_.status === "active")
              .map((case_) => (
                <Card key={case_.id} className="medical-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-blue-800">{case_.treatment}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-blue-600">
                          <User className="h-4 w-4" />
                          {case_.patientName} • {case_.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(case_.status)}
                        <div className="flex items-center gap-2">
                          {getApprovalBadge(case_.approvalStatus)}
                          {getStatusIcon(case_.approvalStatus)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium text-blue-700">Progreso del Caso</Label>
                          <span className="text-sm font-medium text-blue-800">{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                      </div>

                      {case_.notes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600">{case_.notes}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Ver Detalles
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Continuar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending-approval" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases
              .filter((case_) => case_.approvalStatus === "pending" || case_.approvalStatus === "revision-needed")
              .map((case_) => (
                <Card key={case_.id} className="medical-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-blue-800">{case_.treatment}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-blue-600">
                          <User className="h-4 w-4" />
                          {case_.patientName} • {case_.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(case_.status)}
                        <div className="flex items-center gap-2">
                          {getApprovalBadge(case_.approvalStatus)}
                          {getStatusIcon(case_.approvalStatus)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div
                        className={`p-3 rounded-lg border ${
                          case_.approvalStatus === "pending"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-orange-50 border-orange-200"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            case_.approvalStatus === "pending" ? "text-yellow-800" : "text-orange-800"
                          }`}
                        >
                          {case_.approvalStatus === "pending"
                            ? `Este caso está pendiente de aprobación por ${case_.professor}`
                            : `Este caso necesita revisión. Contacta con ${case_.professor}`}
                        </p>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Ver Detalles
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Revisar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
