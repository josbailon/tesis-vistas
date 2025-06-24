"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Upload,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  User,
  BookOpen,
} from "lucide-react"

export default function StudentAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const assignments = [
    {
      id: "assign1",
      title: "Caso Clínico: Tratamiento de Endodoncia Complejo",
      subject: "Endodoncia Avanzada",
      professor: "Dr. Martínez",
      assignedDate: "2024-01-10",
      dueDate: "2024-01-25",
      status: "pending",
      priority: "high",
      maxScore: 100,
      description:
        "Documentar un caso completo de endodoncia con complicaciones, incluyendo diagnóstico, plan de tratamiento y seguimiento.",
      requirements: [
        "Historia clínica completa",
        "Radiografías pre y post tratamiento",
        "Fotografías del procedimiento",
        "Análisis de complicaciones",
        "Plan de seguimiento",
      ],
      submittedFiles: [],
      feedback: null,
      grade: null,
    },
    {
      id: "assign2",
      title: "Investigación: Nuevas Técnicas en Ortodoncia",
      subject: "Ortodoncia Interceptiva",
      professor: "Dra. Rodríguez",
      assignedDate: "2024-01-05",
      dueDate: "2024-01-20",
      status: "submitted",
      priority: "medium",
      maxScore: 80,
      description: "Revisión bibliográfica sobre avances recientes en técnicas de ortodoncia en los últimos 5 años.",
      requirements: [
        "Mínimo 15 referencias científicas",
        "Análisis crítico de técnicas",
        "Conclusiones propias",
        "Formato APA",
      ],
      submittedFiles: [
        { name: "investigacion_ortodoncia.pdf", size: "2.4 MB", uploadDate: "2024-01-18" },
        { name: "bibliografia.docx", size: "856 KB", uploadDate: "2024-01-18" },
      ],
      feedback: null,
      grade: null,
    },
    {
      id: "assign3",
      title: "Práctica: Técnicas de Obturación",
      subject: "Endodoncia Clínica",
      professor: "Dr. Silva",
      assignedDate: "2024-01-01",
      dueDate: "2024-01-15",
      status: "graded",
      priority: "medium",
      maxScore: 120,
      description: "Evaluación práctica de diferentes técnicas de obturación en dientes extraídos.",
      requirements: [
        "3 obturaciones con diferentes técnicas",
        "Documentación fotográfica",
        "Análisis comparativo",
        "Reporte técnico",
      ],
      submittedFiles: [
        { name: "practica_obturacion.pdf", size: "4.2 MB", uploadDate: "2024-01-14" },
        { name: "fotos_procedimiento.zip", size: "12.5 MB", uploadDate: "2024-01-14" },
      ],
      feedback:
        "Excelente trabajo práctico. La documentación es muy completa y el análisis técnico demuestra comprensión profunda.",
      grade: 95,
    },
    {
      id: "assign4",
      title: "Presentación: Manejo de Complicaciones",
      subject: "Endodoncia Avanzada",
      professor: "Dr. Martínez",
      assignedDate: "2024-01-15",
      dueDate: "2024-02-01",
      status: "overdue",
      priority: "high",
      maxScore: 90,
      description: "Presentación oral sobre el manejo de complicaciones en endodoncia.",
      requirements: [
        "Presentación de 15-20 minutos",
        "Casos reales documentados",
        "Manejo de preguntas",
        "Material audiovisual",
      ],
      submittedFiles: [],
      feedback: null,
      grade: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "submitted":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Upload className="h-3 w-3 mr-1" />
            Enviado
          </Badge>
        )
      case "graded":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Calificado
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Vencido
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>
      case "low":
        return <Badge variant="outline">Baja</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.professor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Tareas</h1>
          <p className="text-muted-foreground">Gestiona las tareas asignadas por tus profesores</p>
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Ver Calendario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tareas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enviadas</CardTitle>
            <Upload className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "submitted").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "graded").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="submitted">Enviadas</SelectItem>
              <SelectItem value="graded">Calificadas</SelectItem>
              <SelectItem value="overdue">Vencidas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas las Tareas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="submitted">Enviadas</TabsTrigger>
          <TabsTrigger value="graded">Calificadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredAssignments.map((assignment) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate)
              const isOverdue = daysUntilDue < 0
              const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

              return (
                <Card
                  key={assignment.id}
                  className={`hover:shadow-md transition-shadow ${
                    isOverdue ? "border-red-200 bg-red-50" : isDueSoon ? "border-yellow-200 bg-yellow-50" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{assignment.subject}</span> • {assignment.professor}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(assignment.status)}
                        {getPriorityBadge(assignment.priority)}
                        {assignment.grade && (
                          <Badge variant="outline" className="gap-1">
                            {assignment.grade}/{assignment.maxScore}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Asignado:</span>
                          <p className="text-muted-foreground">{assignment.assignedDate}</p>
                        </div>
                        <div>
                          <span className="font-medium">Vence:</span>
                          <p
                            className={
                              isOverdue
                                ? "text-red-600 font-medium"
                                : isDueSoon
                                  ? "text-yellow-600 font-medium"
                                  : "text-muted-foreground"
                            }
                          >
                            {assignment.dueDate}
                            {isOverdue && " (Vencida)"}
                            {isDueSoon && !isOverdue && ` (${daysUntilDue} días)`}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Puntos:</span>
                          <p className="text-muted-foreground">{assignment.maxScore}</p>
                        </div>
                        <div>
                          <span className="font-medium">Archivos:</span>
                          <p className="text-muted-foreground">{assignment.submittedFiles.length}</p>
                        </div>
                      </div>

                      {assignment.submittedFiles.length > 0 && (
                        <div>
                          <span className="font-medium text-sm">Archivos enviados:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {assignment.submittedFiles.map((file, index) => (
                              <Badge key={index} variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {file.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {assignment.feedback && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="font-medium text-sm text-green-800">Retroalimentación:</span>
                          <p className="text-sm text-green-700 mt-1">{assignment.feedback}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAssignment(assignment)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                        {assignment.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedAssignment(assignment)
                              setIsSubmissionDialogOpen(true)
                            }}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Enviar Tarea
                          </Button>
                        )}
                        {assignment.status === "graded" && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {filteredAssignments
              .filter((assignment) => assignment.status === "pending")
              .map((assignment) => (
                <Card key={assignment.id} className="border-yellow-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{assignment.subject}</span> • {assignment.professor}
                        </CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Pendiente
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => {
                            setSelectedAssignment(assignment)
                            setIsSubmissionDialogOpen(true)
                          }}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Trabajar en Tarea
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid gap-4">
            {filteredAssignments
              .filter((assignment) => assignment.status === "submitted")
              .map((assignment) => (
                <Card key={assignment.id} className="border-blue-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{assignment.subject}</span> • {assignment.professor}
                        </CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        <Upload className="h-3 w-3 mr-1" />
                        Enviado
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                      <div className="text-center py-4">
                        <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Tarea enviada. Esperando calificación.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4">
            {filteredAssignments
              .filter((assignment) => assignment.status === "graded")
              .map((assignment) => (
                <Card key={assignment.id} className="border-green-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{assignment.subject}</span> • {assignment.professor}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Calificado
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          {assignment.grade}/{assignment.maxScore}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                      {assignment.feedback && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="font-medium text-sm text-green-800">Retroalimentación:</span>
                          <p className="text-sm text-green-700 mt-1">{assignment.feedback}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Submission Dialog */}
      <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
        {selectedAssignment && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Enviar Tarea</DialogTitle>
              <DialogDescription>{selectedAssignment.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Requisitos:</label>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedAssignment.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subir Archivos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG - Máximo 10MB por archivo</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Comentarios (Opcional)</label>
                <Textarea placeholder="Agrega comentarios sobre tu entrega..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubmissionDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsSubmissionDialogOpen(false)}>Enviar Tarea</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedAssignment && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedAssignment.title}</DialogTitle>
              <DialogDescription>
                {selectedAssignment.subject} • {selectedAssignment.professor}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Fechas</span>
                    </div>
                    <div className="text-sm">
                      <p>Asignado: {selectedAssignment.assignedDate}</p>
                      <p>Vence: {selectedAssignment.dueDate}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">Estado</span>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(selectedAssignment.status)}
                      {getPriorityBadge(selectedAssignment.priority)}
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Descripción</h4>
                <p className="text-sm text-muted-foreground">{selectedAssignment.description}</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Requisitos</h4>
                <ul className="space-y-1">
                  {selectedAssignment.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </Card>

              {selectedAssignment.feedback && (
                <Card className="p-4 bg-green-50 border-green-200">
                  <h4 className="font-medium mb-2 text-green-800">Retroalimentación del Profesor</h4>
                  <p className="text-sm text-green-700">{selectedAssignment.feedback}</p>
                </Card>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Cerrar
              </Button>
              {selectedAssignment.status === "pending" && (
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    setIsSubmissionDialogOpen(true)
                  }}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Trabajar en Tarea
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
