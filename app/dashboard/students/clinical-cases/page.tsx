"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Eye, Upload, User, FileText, Clock, CheckCircle } from "lucide-react"
import { clinicalCases, patients } from "@/lib/mock-data"

export default function StudentClinicalCasesPage() {
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newCase, setNewCase] = useState({
    patientId: "",
    treatment: "",
    specialty: "",
    description: "",
    treatmentPlan: "",
    expectedDuration: "",
    priority: "medium",
  })

  const userCases = clinicalCases.filter((case_) => case_.studentId === "s1") // Usuario actual

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress":
        return (
          <Badge className="bg-blue-500">
            <Clock className="h-3 w-3 mr-1" />
            En Progreso
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completado
          </Badge>
        )
      case "cancelled":
        return <Badge className="bg-red-500">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleCreateCase = () => {
    console.log("Nuevo caso clínico:", newCase)
    setIsCreateDialogOpen(false)
    setNewCase({
      patientId: "",
      treatment: "",
      specialty: "",
      description: "",
      treatmentPlan: "",
      expectedDuration: "",
      priority: "medium",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Casos Clínicos</h1>
          <p className="text-muted-foreground">Gestiona tus casos clínicos y tratamientos</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Caso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Caso Clínico</DialogTitle>
              <DialogDescription>Registra un nuevo caso clínico para seguimiento</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Paciente *</Label>
                <Select
                  value={newCase.patientId}
                  onValueChange={(value) => setNewCase({ ...newCase, patientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tratamiento *</Label>
                  <Input
                    value={newCase.treatment}
                    onChange={(e) => setNewCase({ ...newCase, treatment: e.target.value })}
                    placeholder="Ej: Endodoncia en molar superior"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Especialidad *</Label>
                  <Select
                    value={newCase.specialty}
                    onValueChange={(value) => setNewCase({ ...newCase, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                      <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                      <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                      <SelectItem value="Periodoncia">Periodoncia</SelectItem>
                      <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descripción del Caso</Label>
                <Textarea
                  value={newCase.description}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                  placeholder="Describe el estado inicial del paciente y diagnóstico..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Plan de Tratamiento</Label>
                <Textarea
                  value={newCase.treatmentPlan}
                  onChange={(e) => setNewCase({ ...newCase, treatmentPlan: e.target.value })}
                  placeholder="Describe el plan de tratamiento a seguir..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duración Estimada</Label>
                  <Input
                    value={newCase.expectedDuration}
                    onChange={(e) => setNewCase({ ...newCase, expectedDuration: e.target.value })}
                    placeholder="Ej: 4 semanas"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prioridad</Label>
                  <Select
                    value={newCase.priority}
                    onValueChange={(value) => setNewCase({ ...newCase, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCase}>Crear Caso</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Casos Activos</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {userCases
              .filter((case_) => case_.status === "in-progress")
              .map((case_) => (
                <Card key={case_.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.treatment}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <User className="h-4 w-4" />
                          {patients.find((p) => p.id === case_.patientId)?.name}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(case_.status)}
                        <Badge variant="outline">{case_.specialty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Fecha de Inicio</Label>
                          <p>{new Date(case_.startDate).toLocaleDateString("es-ES")}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Última Actualización</Label>
                          <p>{new Date(case_.lastUpdate).toLocaleDateString("es-ES")}</p>
                        </div>
                      </div>

                      {case_.notes && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Notas</Label>
                          <p className="text-sm">{case_.notes}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCase(case_)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          Subir Archivos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {userCases
              .filter((case_) => case_.status === "completed")
              .map((case_) => (
                <Card key={case_.id} className="hover:shadow-md transition-shadow opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.treatment}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <User className="h-4 w-4" />
                          {patients.find((p) => p.id === case_.patientId)?.name}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(case_.status)}
                        <Badge variant="outline">{case_.specialty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Fecha de Inicio</Label>
                          <p>{new Date(case_.startDate).toLocaleDateString("es-ES")}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Fecha de Finalización</Label>
                          <p>{new Date(case_.lastUpdate).toLocaleDateString("es-ES")}</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Exportar Reporte
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {userCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{case_.treatment}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4" />
                        {patients.find((p) => p.id === case_.patientId)?.name}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(case_.status)}
                      <Badge variant="outline">{case_.specialty}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {case_.status === "in-progress" && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-xs text-muted-foreground">Fecha de Inicio</Label>
                        <p>{new Date(case_.startDate).toLocaleDateString("es-ES")}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Última Actualización</Label>
                        <p>{new Date(case_.lastUpdate).toLocaleDateString("es-ES")}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                      {case_.status === "in-progress" && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para ver detalles del caso */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Caso Clínico</DialogTitle>
            <DialogDescription>Información completa del caso</DialogDescription>
          </DialogHeader>
          {selectedCase && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Paciente</Label>
                  <p>{patients.find((p) => p.id === selectedCase.patientId)?.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tratamiento</Label>
                  <p>{selectedCase.treatment}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Especialidad</Label>
                  <p>{selectedCase.specialty}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Estado</Label>
                  {getStatusBadge(selectedCase.status)}
                </div>
                <div>
                  <Label className="text-sm font-medium">Fecha de Inicio</Label>
                  <p>{new Date(selectedCase.startDate).toLocaleDateString("es-ES")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Progreso</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedCase.progress} className="flex-1" />
                    <span>{selectedCase.progress}%</span>
                  </div>
                </div>
              </div>

              {selectedCase.notes && (
                <div>
                  <Label className="text-sm font-medium">Notas del Caso</Label>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedCase.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
