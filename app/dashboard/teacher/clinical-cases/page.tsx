"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Eye, CheckCircle, Clock, AlertCircle, Stethoscope, FileText, Star } from "lucide-react"

export default function TeacherClinicalCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [studentFilter, setStudentFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const clinicalCases = [
    {
      id: "case1",
      title: "Tratamiento Endodóntico Complejo - Molar Superior",
      student: "Carlos López",
      studentId: "E2021001",
      patient: "Ana García",
      patientId: "PAT001",
      specialty: "Endodoncia",
      startDate: "2024-01-10",
      lastUpdate: "2024-01-20",
      status: "in_progress",
      progress: 65,
      difficulty: "high",
      description:
        "Caso complejo de endodoncia en molar superior con múltiples conductos y calcificaciones. Requiere técnicas avanzadas.",
      diagnosis: "Pulpitis irreversible con periodontitis apical",
      treatmentPlan: [
        "Apertura cameral",
        "Localización de conductos",
        "Instrumentación biomecánica",
        "Obturación",
        "Restauración final",
      ],
      complications: ["Conducto calcificado", "Anatomía compleja"],
      sessions: [
        { date: "2024-01-10", description: "Apertura cameral y diagnóstico", completed: true },
        { date: "2024-01-15", description: "Instrumentación conductos principales", completed: true },
        { date: "2024-01-20", description: "Localización conducto MB2", completed: true },
        { date: "2024-01-25", description: "Obturación", completed: false },
      ],
      feedback: null,
      grade: null,
      attachments: [
        { name: "radiografia_inicial.jpg", type: "image" },
        { name: "fotos_procedimiento.zip", type: "archive" },
      ],
    },
    {
      id: "case2",
      title: "Extracción Quirúrgica Terceros Molares",
      student: "María Fernández",
      studentId: "E2020002",
      patient: "Roberto Silva",
      patientId: "PAT002",
      specialty: "Cirugía Oral",
      startDate: "2024-01-05",
      lastUpdate: "2024-01-18",
      status: "completed",
      progress: 100,
      difficulty: "medium",
      description: "Extracción quirúrgica bilateral de terceros molares impactados con seguimiento post-operatorio.",
      diagnosis: "Terceros molares impactados bilaterales",
      treatmentPlan: [
        "Evaluación radiográfica",
        "Planificación quirúrgica",
        "Extracción lado derecho",
        "Extracción lado izquierdo",
        "Seguimiento post-operatorio",
      ],
      complications: ["Proximidad al nervio alveolar inferior"],
      sessions: [
        { date: "2024-01-05", description: "Evaluación y planificación", completed: true },
        { date: "2024-01-08", description: "Extracción lado derecho", completed: true },
        { date: "2024-01-12", description: "Extracción lado izquierdo", completed: true },
        { date: "2024-01-18", description: "Control post-operatorio", completed: true },
      ],
      feedback: "Excelente manejo quirúrgico. Técnica depurada y buen control de complicaciones.",
      grade: 92,
      attachments: [
        { name: "panoramica_inicial.jpg", type: "image" },
        { name: "informe_quirurgico.pdf", type: "document" },
      ],
    },
    {
      id: "case3",
      title: "Tratamiento Ortodóntico Interceptivo",
      student: "Juan Pérez",
      studentId: "E2019003",
      patient: "Carmen Vega",
      patientId: "PAT003",
      specialty: "Ortodoncia",
      startDate: "2024-01-01",
      lastUpdate: "2024-01-15",
      status: "needs_review",
      progress: 40,
      difficulty: "medium",
      description: "Caso de ortodoncia interceptiva en paciente pediátrico con maloclusión clase II.",
      diagnosis: "Maloclusión clase II división 1, overjet aumentado",
      treatmentPlan: [
        "Análisis cefalométrico",
        "Colocación de aparatología",
        "Controles mensuales",
        "Evaluación de progreso",
        "Retención",
      ],
      complications: ["Cooperación del paciente", "Crecimiento mandibular"],
      sessions: [
        { date: "2024-01-01", description: "Análisis inicial y planificación", completed: true },
        { date: "2024-01-08", description: "Colocación de brackets", completed: true },
        { date: "2024-01-15", description: "Primer control", completed: true },
        { date: "2024-01-22", description: "Segundo control", completed: false },
      ],
      feedback: "Falta documentación fotográfica del progreso. Revisar plan de tratamiento.",
      grade: null,
      attachments: [
        { name: "cefalometria.jpg", type: "image" },
        { name: "modelos_estudio.zip", type: "archive" },
      ],
    },
  ]

  const students = [
    { id: "E2021001", name: "Carlos López" },
    { id: "E2020002", name: "María Fernández" },
    { id: "E2019003", name: "Juan Pérez" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            En Progreso
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completado
          </Badge>
        )
      case "needs_review":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Necesita Revisión
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aprobado
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>
      case "low":
        return <Badge variant="outline">Baja</Badge>
      default:
        return <Badge variant="outline">{difficulty}</Badge>
    }
  }

  const filteredCases = clinicalCases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) || case_.patient.toLowerCase().includes
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesStudent = studentFilter === "all" || case_.studentId === studentFilter
    return matchesSearch && matchesStatus && matchesStudent
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Casos Clínicos - Supervisión</h1>
          <p className="text-muted-foreground">Supervisa y evalúa los casos clínicos de tus estudiantes</p>
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Generar Reporte
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Casos</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clinicalCases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clinicalCases.filter((c) => c.status === "in_progress").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clinicalCases.filter((c) => c.status === "completed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Necesitan Revisión</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clinicalCases.filter((c) => c.status === "needs_review").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar casos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Select value={studentFilter} onValueChange={setStudentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estudiante" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estudiantes</SelectItem>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="in_progress">En Progreso</SelectItem>
              <SelectItem value="completed">Completados</SelectItem>
              <SelectItem value="needs_review">Necesitan Revisión</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos los Casos</TabsTrigger>
          <TabsTrigger value="in_progress">En Progreso</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{case_.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <span className="font-medium">{case_.student}</span> • {case_.specialty}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(case_.status)}
                      {getDifficultyBadge(case_.difficulty)}
                      {case_.grade && (
                        <Badge variant="outline" className="gap-1">
                          <Star className="h-3 w-3" />
                          {case_.grade}/100
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{case_.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Paciente:</span>
                        <p className="text-muted-foreground">{case_.patient}</p>
                      </div>
                      <div>
                        <span className="font-medium">Inicio:</span>
                        <p className="text-muted-foreground">{case_.startDate}</p>
                      </div>
                      <div>
                        <span className="font-medium">Última Actualización:</span>
                        <p className="text-muted-foreground">{case_.lastUpdate}</p>
                      </div>
                      <div>
                        <span className="font-medium">Progreso:</span>
                        <div className="flex items-center gap-2">
                          <Progress value={case_.progress} className="flex-1" />
                          <span className="text-sm font-medium">{case_.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-sm">Diagnóstico:</span>
                      <p className="text-sm text-muted-foreground mt-1">{case_.diagnosis}</p>
                    </div>

                    {case_.complications.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Complicaciones:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {case_.complications.map((complication, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-red-50">
                              {complication}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {case_.feedback && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <span className="font-medium text-sm text-blue-800">Retroalimentación:</span>
                        <p className="text-sm text-blue-700 mt-1">{case_.feedback}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCase(case_)
                          setIsReviewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Completo
                      </Button>
                      {(case_.status === "in_progress" || case_.status === "needs_review") && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Evaluar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases
              .filter((case_) => case_.status === "in_progress")
              .map((case_) => (
                <Card key={case_.id} className="border-blue-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{case_.student}</span> • {case_.specialty}
                        </CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        <Clock className="h-3 w-3 mr-1" />
                        En Progreso
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{case_.description}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={case_.progress} className="flex-1" />
                        <span className="text-sm font-medium">{case_.progress}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases
              .filter((case_) => case_.status === "completed")
              .map((case_) => (
                <Card key={case_.id} className="border-green-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{case_.student}</span> • {case_.specialty}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completado
                        </Badge>
                        {case_.grade && (
                          <Badge variant="outline" className="gap-1">
                            <Star className="h-3 w-3" />
                            {case_.grade}/100
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{case_.description}</p>
                      {case_.feedback && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="font-medium text-sm text-green-800">Retroalimentación:</span>
                          <p className="text-sm text-green-700 mt-1">{case_.feedback}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        {selectedCase && (
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Evaluar Caso Clínico</DialogTitle>
              <DialogDescription>
                {selectedCase.title} - {selectedCase.student}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Case Overview */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Información General</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Paciente:</span>
                    <p className="text-muted-foreground">{selectedCase.patient}</p>
                  </div>
                  <div>
                    <span className="font-medium">Especialidad:</span>
                    <p className="text-muted-foreground">{selectedCase.specialty}</p>
                  </div>
                  <div>
                    <span className="font-medium">Dificultad:</span>
                    <div className="mt-1">{getDifficultyBadge(selectedCase.difficulty)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Progreso:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={selectedCase.progress} className="flex-1" />
                      <span className="text-sm font-medium">{selectedCase.progress}%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Diagnosis and Treatment Plan */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Diagnóstico y Plan de Tratamiento</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Diagnóstico:</span>
                    <p className="text-sm text-muted-foreground mt-1">{selectedCase.diagnosis}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Plan de Tratamiento:</span>
                    <ul className="mt-1 space-y-1">
                      {selectedCase.treatmentPlan.map((step: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Sessions Progress */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Progreso de Sesiones</h4>
                <div className="space-y-3">
                  {selectedCase.sessions.map((session: any, index: number) => (
                    <div key={index} className="flex items-center justify-between rounded-md border bg-background p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            session.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {session.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{session.description}</p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          session.completed
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {session.completed ? "Completada" : "Pendiente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Complications */}
              {selectedCase.complications.length > 0 && (
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Complicaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.complications.map((complication: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                        {complication}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Attachments */}
              {selectedCase.attachments.length > 0 && (
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Archivos Adjuntos</h4>
                  <div className="space-y-2">
                    {selectedCase.attachments.map((attachment: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{attachment.name}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Evaluation Section */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Evaluación del Profesor</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estado</label>
                      <Select defaultValue={selectedCase.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Aprobar</SelectItem>
                          <SelectItem value="needs_revision">Necesita Revisión</SelectItem>
                          <SelectItem value="in_progress">En Progreso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Calificación (0-100)</label>
                      <Input type="number" min="0" max="100" defaultValue={selectedCase.grade || ""} placeholder="85" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Retroalimentación</label>
                    <Textarea
                      placeholder="Proporciona comentarios detallados sobre el caso clínico..."
                      defaultValue={selectedCase.feedback || ""}
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsReviewDialogOpen(false)}>Guardar Evaluación</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
