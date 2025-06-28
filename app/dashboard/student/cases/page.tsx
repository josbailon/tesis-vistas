"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, FileText, Edit, Eye, Save, Calendar, User, Upload } from "lucide-react"

interface ClinicalCase {
  id: string
  patientName: string
  patientId: string
  title: string
  specialty: string
  startDate: string
  expectedEndDate: string
  status: "planning" | "in_progress" | "completed" | "cancelled"
  progress: number
  description: string
  treatmentPlan: string
  currentPhase: string
  nextAppointment?: string
  professorNotes?: string
  studentNotes: string
  attachments: string[]
}

export default function StudentCasesPage() {
  const [cases, setCases] = useState<ClinicalCase[]>([
    {
      id: "case1",
      patientName: "Ana Rodríguez",
      patientId: "pac1",
      title: "Tratamiento de Endodoncia Complejo",
      specialty: "Endodoncia",
      startDate: "2024-01-10",
      expectedEndDate: "2024-02-15",
      status: "in_progress",
      progress: 65,
      description: "Paciente con pulpitis irreversible en molar superior derecho con complicaciones anatómicas",
      treatmentPlan:
        "1. Diagnóstico radiográfico\n2. Apertura cameral\n3. Localización de conductos\n4. Instrumentación\n5. Obturación\n6. Restauración final",
      currentPhase: "Instrumentación de conductos",
      nextAppointment: "2024-01-25",
      studentNotes: "Conducto MB2 localizado con dificultad. Paciente tolera bien el procedimiento.",
      attachments: ["radiografia_inicial.jpg", "foto_apertura.jpg"],
    },
    {
      id: "case2",
      patientName: "Miguel Santos",
      patientId: "pac2",
      title: "Rehabilitación con Prótesis Parcial",
      specialty: "Prótesis",
      startDate: "2024-01-08",
      expectedEndDate: "2024-03-01",
      status: "planning",
      progress: 20,
      description: "Paciente edéntulo parcial que requiere rehabilitación protésica",
      treatmentPlan: "1. Evaluación inicial\n2. Impresiones\n3. Diseño de prótesis\n4. Prueba\n5. Entrega final",
      currentPhase: "Evaluación y planificación",
      studentNotes: "Evaluación periodontal completada. Paciente candidato para prótesis removible.",
      attachments: ["impresion_inicial.jpg"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<ClinicalCase | null>(null)

  const [newCase, setNewCase] = useState({
    patientName: "",
    patientId: "",
    title: "",
    specialty: "",
    expectedEndDate: "",
    description: "",
    treatmentPlan: "",
  })

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateCase = () => {
    const case_: ClinicalCase = {
      id: `case${Date.now()}`,
      ...newCase,
      startDate: new Date().toISOString().split("T")[0],
      status: "planning",
      progress: 0,
      currentPhase: "Planificación inicial",
      studentNotes: "",
      attachments: [],
    }
    setCases([...cases, case_])
    setNewCase({
      patientName: "",
      patientId: "",
      title: "",
      specialty: "",
      expectedEndDate: "",
      description: "",
      treatmentPlan: "",
    })
    setIsCreateDialogOpen(false)
  }

  const statusColors = {
    planning: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const statusLabels = {
    planning: "Planificación",
    in_progress: "En Progreso",
    completed: "Completado",
    cancelled: "Cancelado",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mis Casos Clínicos</h1>
          <p className="text-muted-foreground">Gestiona y documenta tus tratamientos</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Caso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Caso Clínico</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Paciente</Label>
                  <Input
                    value={newCase.patientName}
                    onChange={(e) => setNewCase({ ...newCase, patientName: e.target.value })}
                    placeholder="Nombre del paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ID Paciente</Label>
                  <Input
                    value={newCase.patientId}
                    onChange={(e) => setNewCase({ ...newCase, patientId: e.target.value })}
                    placeholder="ID del paciente"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Título del Caso</Label>
                <Input
                  value={newCase.title}
                  onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                  placeholder="Ej: Tratamiento de Endodoncia Complejo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Especialidad</Label>
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
                      <SelectItem value="Prótesis">Prótesis</SelectItem>
                      <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fecha Estimada de Finalización</Label>
                  <Input
                    type="date"
                    value={newCase.expectedEndDate}
                    onChange={(e) => setNewCase({ ...newCase, expectedEndDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descripción del Caso</Label>
                <Textarea
                  value={newCase.description}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                  placeholder="Describe el caso clínico..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Plan de Tratamiento</Label>
                <Textarea
                  value={newCase.treatmentPlan}
                  onChange={(e) => setNewCase({ ...newCase, treatmentPlan: e.target.value })}
                  placeholder="Describe el plan de tratamiento paso a paso..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCase}>
                  <Save className="h-4 w-4 mr-2" />
                  Crear Caso
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Casos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.filter((c) => c.status === "in_progress").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.filter((c) => c.status === "completed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(cases.reduce((sum, c) => sum + c.progress, 0) / cases.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar casos por paciente o título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="planning">Planificación</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Casos */}
      <div className="grid gap-6">
        {filteredCases.map((case_) => (
          <Card key={case_.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{case_.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {case_.patientName}
                    </span>
                    <span>{case_.specialty}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Inicio: {new Date(case_.startDate).toLocaleDateString("es-ES")}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[case_.status]}>{statusLabels[case_.status]}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{case_.description}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Progreso del Tratamiento</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={case_.progress} className="flex-1" />
                  <span className="text-sm font-medium">{case_.progress}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Fase actual: {case_.currentPhase}</p>
              </div>

              {case_.nextAppointment && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Próxima cita: {new Date(case_.nextAppointment).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </div>
              )}

              {case_.attachments.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Archivos Adjuntos</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {case_.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        <FileText className="h-3 w-3" />
                        {attachment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{case_.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Paciente</Label>
                          <p className="text-sm text-muted-foreground">{case_.patientName}</p>
                        </div>
                        <div>
                          <Label>Especialidad</Label>
                          <p className="text-sm text-muted-foreground">{case_.specialty}</p>
                        </div>
                        <div>
                          <Label>Fecha de Inicio</Label>
                          <p className="text-sm text-muted-foreground">
                            {new Date(case_.startDate).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                        <div>
                          <Label>Fecha Estimada de Finalización</Label>
                          <p className="text-sm text-muted-foreground">
                            {new Date(case_.expectedEndDate).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label>Descripción</Label>
                        <p className="text-sm text-muted-foreground mt-1">{case_.description}</p>
                      </div>

                      <div>
                        <Label>Plan de Tratamiento</Label>
                        <div className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                          {case_.treatmentPlan}
                        </div>
                      </div>

                      <div>
                        <Label>Notas del Estudiante</Label>
                        <p className="text-sm text-muted-foreground mt-1">{case_.studentNotes}</p>
                      </div>

                      {case_.professorNotes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Label>Notas del Profesor</Label>
                          <p className="text-sm text-blue-700 mt-1">{case_.professorNotes}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                {case_.status !== "completed" && case_.status !== "cancelled" && (
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Actualizar
                  </Button>
                )}

                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Subir Archivos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
