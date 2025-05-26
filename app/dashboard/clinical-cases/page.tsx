"use client"

import { useState } from "react"
import { User, Upload, Eye, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClinicalCase {
  id: string
  patientName: string
  patientId: string
  treatment: string
  specialty: string
  startDate: string
  lastUpdate: string
  status: "active" | "completed" | "cancelled"
  progress: number
  notes?: string
  professor: string
  approvalStatus: "pending" | "approved" | "rejected"
}

export default function ClinicalCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Datos de ejemplo para casos clínicos
  const clinicalCases: ClinicalCase[] = [
    {
      id: "cc1",
      patientName: "Ana García",
      patientId: "pat1",
      treatment: "Tratamiento de Conducto",
      specialty: "Endodoncia",
      startDate: "2023-05-10",
      lastUpdate: "2023-05-20",
      status: "active",
      progress: 75,
      notes: "Paciente responde bien al tratamiento. Próxima cita para finalizar.",
      professor: "Dr. Martínez",
      approvalStatus: "approved",
    },
    {
      id: "cc2",
      patientName: "Carlos López",
      patientId: "pat2",
      treatment: "Ortodoncia Correctiva",
      specialty: "Ortodoncia",
      startDate: "2023-04-15",
      lastUpdate: "2023-05-18",
      status: "active",
      progress: 45,
      notes: "Ajuste de brackets realizado. Evolución favorable.",
      professor: "Dra. Rodríguez",
      approvalStatus: "pending",
    },
    {
      id: "cc3",
      patientName: "María Fernández",
      patientId: "pat3",
      treatment: "Extracción de Terceros Molares",
      specialty: "Cirugía Oral y Maxilofacial",
      startDate: "2023-03-20",
      lastUpdate: "2023-04-01",
      status: "completed",
      progress: 100,
      notes: "Procedimiento completado exitosamente. Seguimiento post-operatorio normal.",
      professor: "Dra. López",
      approvalStatus: "approved",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Activo</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completado</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getApprovalBadge = (status: string) => {
    switch (status) {
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

  const filteredCases = clinicalCases.filter((case_) => {
    const matchesSearch =
      case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || case_.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Casos Clínicos</h1>
          <p className="text-muted-foreground">Gestiona y documenta tus casos clínicos</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nuevo Caso</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar casos..."
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
              <SelectItem value="completed">Completados</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos los Casos</TabsTrigger>
          <TabsTrigger value="active">Casos Activos</TabsTrigger>
          <TabsTrigger value="pending-approval">Pendientes de Aprobación</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases.map((case_) => (
              <Card key={case_.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{case_.treatment}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {case_.patientName} • {case_.specialty}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(case_.status)}
                      {getApprovalBadge(case_.approvalStatus)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="font-medium">Fecha de Inicio</Label>
                        <p className="text-muted-foreground">{case_.startDate}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Última Actualización</Label>
                        <p className="text-muted-foreground">{case_.lastUpdate}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Profesor Supervisor</Label>
                        <p className="text-muted-foreground">{case_.professor}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Progreso</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={case_.progress} className="flex-1" />
                          <span className="text-sm font-medium">{case_.progress}%</span>
                        </div>
                      </div>
                    </div>

                    {case_.notes && (
                      <div>
                        <Label className="font-medium">Notas</Label>
                        <p className="text-sm text-muted-foreground mt-1">{case_.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-3.5 w-3.5" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="h-3.5 w-3.5" />
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
                <Card key={case_.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.treatment}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {case_.patientName} • {case_.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(case_.status)}
                        {getApprovalBadge(case_.approvalStatus)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Fecha de Inicio</Label>
                          <p className="text-muted-foreground">{case_.startDate}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Última Actualización</Label>
                          <p className="text-muted-foreground">{case_.lastUpdate}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Profesor Supervisor</Label>
                          <p className="text-muted-foreground">{case_.professor}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Progreso</Label>
                          <div className="flex items-center gap-2">
                            <Progress value={case_.progress} className="flex-1" />
                            <span className="text-sm font-medium">{case_.progress}%</span>
                          </div>
                        </div>
                      </div>

                      {case_.notes && (
                        <div>
                          <Label className="font-medium">Notas</Label>
                          <p className="text-sm text-muted-foreground mt-1">{case_.notes}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3.5 w-3.5" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Upload className="h-3.5 w-3.5" />
                          Subir Archivos
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
              .filter((case_) => case_.approvalStatus === "pending")
              .map((case_) => (
                <Card key={case_.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.treatment}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {case_.patientName} • {case_.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(case_.status)}
                        {getApprovalBadge(case_.approvalStatus)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Fecha de Inicio</Label>
                          <p className="text-muted-foreground">{case_.startDate}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Última Actualización</Label>
                          <p className="text-muted-foreground">{case_.lastUpdate}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Profesor Supervisor</Label>
                          <p className="text-muted-foreground">{case_.professor}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Progreso</Label>
                          <div className="flex items-center gap-2">
                            <Progress value={case_.progress} className="flex-1" />
                            <span className="text-sm font-medium">{case_.progress}%</span>
                          </div>
                        </div>
                      </div>

                      {case_.notes && (
                        <div>
                          <Label className="font-medium">Notas</Label>
                          <p className="text-sm text-muted-foreground mt-1">{case_.notes}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3.5 w-3.5" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Upload className="h-3.5 w-3.5" />
                          Subir Archivos
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
