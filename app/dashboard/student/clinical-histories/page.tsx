"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Plus, Eye, Edit, User, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface ClinicalHistory {
  id: string
  patientName: string
  patientId: string
  title: string
  description: string
  date: string
  type: "consultation" | "treatment" | "follow-up" | "emergency"
  specialty: string
  status: "draft" | "pending" | "approved" | "rejected"
  professor?: string
  lastModified: string
  attachments: number
}

export default function StudentClinicalHistoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const clinicalHistories: ClinicalHistory[] = [
    {
      id: "ch1",
      patientName: "Ana García",
      patientId: "pat1",
      title: "Evaluación Inicial Endodoncia",
      description:
        "Paciente presenta dolor en molar superior derecho. Se observa caries profunda con posible compromiso pulpar.",
      date: "2024-01-20",
      type: "consultation",
      specialty: "Endodoncia",
      status: "approved",
      professor: "Dr. Martínez",
      lastModified: "2024-01-21",
      attachments: 3,
    },
    {
      id: "ch2",
      patientName: "Carlos López",
      patientId: "pat2",
      title: "Tratamiento Ortodóntico - Sesión 1",
      description: "Colocación de brackets en arcada superior. Paciente tolera bien el procedimiento.",
      date: "2024-01-18",
      type: "treatment",
      specialty: "Ortodoncia",
      status: "pending",
      professor: "Dra. Rodríguez",
      lastModified: "2024-01-18",
      attachments: 2,
    },
    {
      id: "ch3",
      patientName: "María Fernández",
      patientId: "pat3",
      title: "Control Post-Operatorio",
      description: "Seguimiento después de extracción de terceros molares. Evolución favorable, sin complicaciones.",
      date: "2024-01-15",
      type: "follow-up",
      specialty: "Cirugía Oral",
      status: "approved",
      professor: "Dra. López",
      lastModified: "2024-01-15",
      attachments: 1,
    },
    {
      id: "ch4",
      patientName: "Pedro Ramírez",
      patientId: "pat4",
      title: "Consulta de Emergencia",
      description: "Paciente acude por dolor intenso en zona posterior izquierda. Posible absceso periodontal.",
      date: "2024-01-22",
      type: "emergency",
      specialty: "Periodoncia",
      status: "draft",
      lastModified: "2024-01-22",
      attachments: 0,
    },
  ]

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return <Badge className="bg-blue-100 text-blue-700">Consulta</Badge>
      case "treatment":
        return <Badge className="bg-green-100 text-green-700">Tratamiento</Badge>
      case "follow-up":
        return <Badge className="bg-purple-100 text-purple-700">Seguimiento</Badge>
      case "emergency":
        return <Badge className="bg-red-100 text-red-700">Emergencia</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            Borrador
          </Badge>
        )
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-700">Aprobado</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rechazado</Badge>
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
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredHistories = clinicalHistories.filter((history) => {
    const matchesSearch =
      history.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || history.status === statusFilter
    const matchesType = typeFilter === "all" || history.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Historias Clínicas
          </h1>
          <p className="text-blue-600 mt-2">Gestiona los registros médicos de tus pacientes</p>
        </div>
        <Button className="btn-medical">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Historia
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Historias</p>
                <p className="text-2xl font-bold text-blue-800">{clinicalHistories.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {clinicalHistories.filter((h) => h.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Aprobadas</p>
                <p className="text-2xl font-bold text-green-800">
                  {clinicalHistories.filter((h) => h.status === "approved").length}
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
                <p className="text-sm font-medium text-gray-700">Borradores</p>
                <p className="text-2xl font-bold text-gray-800">
                  {clinicalHistories.filter((h) => h.status === "draft").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-gray-500" />
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
                placeholder="Buscar historias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-blue-50/50 border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="type-filter" className="text-sm text-blue-700">
                  Tipo:
                </Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger id="type-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="consultation">Consulta</SelectItem>
                    <SelectItem value="treatment">Tratamiento</SelectItem>
                    <SelectItem value="follow-up">Seguimiento</SelectItem>
                    <SelectItem value="emergency">Emergencia</SelectItem>
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
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="approved">Aprobado</SelectItem>
                    <SelectItem value="rejected">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Historias */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-blue-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Todas las Historias
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Pendientes
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Recientes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredHistories.map((history) => (
              <Card key={history.id} className="medical-card hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-blue-800">{history.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-blue-600">
                        <User className="h-4 w-4" />
                        {history.patientName} • {history.specialty}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getTypeBadge(history.type)}
                      <div className="flex items-center gap-2">
                        {getStatusBadge(history.status)}
                        {getStatusIcon(history.status)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">{history.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="font-medium text-blue-700">Fecha</Label>
                        <p className="text-blue-600">{history.date}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-blue-700">Última Modificación</Label>
                        <p className="text-blue-600">{history.lastModified}</p>
                      </div>
                      {history.professor && (
                        <div>
                          <Label className="font-medium text-blue-700">Profesor Supervisor</Label>
                          <p className="text-blue-600">{history.professor}</p>
                        </div>
                      )}
                      <div>
                        <Label className="font-medium text-blue-700">Archivos Adjuntos</Label>
                        <p className="text-blue-600">{history.attachments} archivo(s)</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {filteredHistories
              .filter((history) => history.status === "pending")
              .map((history) => (
                <Card key={history.id} className="medical-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-blue-800">{history.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-blue-600">
                          <User className="h-4 w-4" />
                          {history.patientName} • {history.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getTypeBadge(history.type)}
                        <div className="flex items-center gap-2">
                          {getStatusBadge(history.status)}
                          {getStatusIcon(history.status)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">{history.description}</p>
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <Clock className="h-4 w-4 inline mr-2" />
                          Esta historia está pendiente de aprobación por {history.professor}
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
                          Editar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {filteredHistories
              .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
              .slice(0, 5)
              .map((history) => (
                <Card key={history.id} className="medical-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-blue-800">{history.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-blue-600">
                          <User className="h-4 w-4" />
                          {history.patientName} • {history.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getTypeBadge(history.type)}
                        <div className="flex items-center gap-2">
                          {getStatusBadge(history.status)}
                          {getStatusIcon(history.status)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">{history.description}</p>
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
                          Editar
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
