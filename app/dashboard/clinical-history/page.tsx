"use client"

import { useState } from "react"
import { User, Plus, Edit, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClinicalRecord {
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
}

export default function ClinicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Datos de ejemplo para historias clínicas
  const clinicalRecords: ClinicalRecord[] = [
    {
      id: "ch1",
      patientName: "Ana García",
      patientId: "pat1",
      title: "Evaluación Inicial Endodoncia",
      description:
        "Paciente presenta dolor en molar superior derecho. Se observa caries profunda con posible compromiso pulpar.",
      date: "2023-05-20",
      type: "consultation",
      specialty: "Endodoncia",
      status: "approved",
      professor: "Dr. Martínez",
      lastModified: "2023-05-21",
    },
    {
      id: "ch2",
      patientName: "Carlos López",
      patientId: "pat2",
      title: "Tratamiento Ortodóntico - Sesión 1",
      description: "Colocación de brackets en arcada superior. Paciente tolera bien el procedimiento.",
      date: "2023-05-18",
      type: "treatment",
      specialty: "Ortodoncia",
      status: "pending",
      professor: "Dra. Rodríguez",
      lastModified: "2023-05-18",
    },
    {
      id: "ch3",
      patientName: "María Fernández",
      patientId: "pat3",
      title: "Control Post-Operatorio",
      description: "Seguimiento después de extracción de terceros molares. Evolución favorable, sin complicaciones.",
      date: "2023-05-15",
      type: "follow-up",
      specialty: "Cirugía Oral y Maxilofacial",
      status: "approved",
      professor: "Dra. López",
      lastModified: "2023-05-15",
    },
  ]

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            Consulta
          </Badge>
        )
      case "treatment":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Tratamiento
          </Badge>
        )
      case "follow-up":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-700">
            Seguimiento
          </Badge>
        )
      case "emergency":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            Emergencia
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Borrador</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            Pendiente
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Aprobado
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            Rechazado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredRecords = clinicalRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesType = typeFilter === "all" || record.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historias Clínicas</h1>
          <p className="text-muted-foreground">Gestiona los registros médicos de tus pacientes</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nueva Historia</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar historias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="type-filter" className="text-sm">
              Tipo:
            </Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter" className="w-[150px]">
                <SelectValue placeholder="Filtrar por tipo" />
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
            <Label htmlFor="status-filter" className="text-sm">
              Estado:
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-[150px]">
                <SelectValue placeholder="Filtrar por estado" />
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas las Historias</TabsTrigger>
          <TabsTrigger value="pending">Pendientes de Aprobación</TabsTrigger>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{record.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {record.patientName} • {record.specialty}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getTypeBadge(record.type)}
                      {getStatusBadge(record.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{record.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="font-medium">Fecha</Label>
                        <p className="text-muted-foreground">{record.date}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Última Modificación</Label>
                        <p className="text-muted-foreground">{record.lastModified}</p>
                      </div>
                      {record.professor && (
                        <div>
                          <Label className="font-medium">Profesor Supervisor</Label>
                          <p className="text-muted-foreground">{record.professor}</p>
                        </div>
                      )}
                      <div>
                        <Label className="font-medium">ID Paciente</Label>
                        <p className="text-muted-foreground">{record.patientId}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-3.5 w-3.5" />
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
            {filteredRecords
              .filter((record) => record.status === "pending")
              .map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {record.patientName} • {record.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getTypeBadge(record.type)}
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{record.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Fecha</Label>
                          <p className="text-muted-foreground">{record.date}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Última Modificación</Label>
                          <p className="text-muted-foreground">{record.lastModified}</p>
                        </div>
                        {record.professor && (
                          <div>
                            <Label className="font-medium">Profesor Supervisor</Label>
                            <p className="text-muted-foreground">{record.professor}</p>
                          </div>
                        )}
                        <div>
                          <Label className="font-medium">ID Paciente</Label>
                          <p className="text-muted-foreground">{record.patientId}</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3.5 w-3.5" />
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
            {filteredRecords
              .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
              .slice(0, 5)
              .map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {record.patientName} • {record.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getTypeBadge(record.type)}
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{record.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Fecha</Label>
                          <p className="text-muted-foreground">{record.date}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Última Modificación</Label>
                          <p className="text-muted-foreground">{record.lastModified}</p>
                        </div>
                        {record.professor && (
                          <div>
                            <Label className="font-medium">Profesor Supervisor</Label>
                            <p className="text-muted-foreground">{record.professor}</p>
                          </div>
                        )}
                        <div>
                          <Label className="font-medium">ID Paciente</Label>
                          <p className="text-muted-foreground">{record.patientId}</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3.5 w-3.5" />
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
