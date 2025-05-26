"use client"

import { useState } from "react"
import { FileText, Calendar, User, Clock, CheckCircle, Upload, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AcademicTask {
  id: string
  title: string
  description: string
  assignedBy: string
  assignedDate: string
  dueDate: string
  status: "pending" | "in-progress" | "submitted" | "approved" | "rejected"
  priority: "low" | "medium" | "high"
  specialty: string
  type: "upload" | "report" | "presentation" | "case-study"
  progress: number
  feedback?: string
  submittedFiles?: string[]
  requirements: string[]
}

export default function AcademicTasksPage() {
  const [isViewTaskDialogOpen, setIsViewTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<AcademicTask | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Datos de ejemplo para tareas académicas
  const academicTasks: AcademicTask[] = [
    {
      id: "at1",
      title: "Subir Fotografías Intraorales - Paciente Ana García",
      description: "Tomar y subir fotografías intraorales del paciente antes del tratamiento de endodoncia",
      assignedBy: "Dr. Martínez",
      assignedDate: "2023-05-15",
      dueDate: "2023-05-20",
      status: "pending",
      priority: "high",
      specialty: "Endodoncia",
      type: "upload",
      progress: 0,
      requirements: [
        "Fotografías de frente",
        "Fotografías laterales derecha e izquierda",
        "Fotografías oclusales superior e inferior",
        "Calidad mínima 1080p",
        "Formato JPG o PNG",
      ],
    },
    {
      id: "at2",
      title: "Radiografías Periapicales - Caso de Ortodoncia",
      description: "Tomar radiografías periapicales del sector anterior para evaluación ortodóntica",
      assignedBy: "Dra. Rodríguez",
      assignedDate: "2023-05-12",
      dueDate: "2023-05-18",
      status: "in-progress",
      priority: "medium",
      specialty: "Ortodoncia",
      type: "upload",
      progress: 60,
      requirements: [
        "Radiografías de incisivos centrales y laterales",
        "Técnica de paralelismo",
        "Calidad diagnóstica",
        "Formato DICOM",
      ],
    },
    {
      id: "at3",
      title: "Informe de Caso Clínico - Cirugía de Terceros Molares",
      description: "Elaborar informe completo del caso de extracción de terceros molares impactados",
      assignedBy: "Dra. López",
      assignedDate: "2023-05-10",
      dueDate: "2023-05-25",
      status: "submitted",
      priority: "high",
      specialty: "Cirugía Oral y Maxilofacial",
      type: "report",
      progress: 100,
      feedback: "Excelente trabajo. El informe está muy completo y bien documentado.",
      submittedFiles: ["informe_caso_clinico.pdf", "radiografias_control.zip"],
      requirements: [
        "Diagnóstico inicial",
        "Plan quirúrgico",
        "Descripción del procedimiento",
        "Complicaciones y manejo",
        "Seguimiento postoperatorio",
        "Conclusiones",
      ],
    },
    {
      id: "at4",
      title: "Presentación: Manejo de Paciente Pediátrico",
      description: "Preparar presentación sobre técnicas de manejo de conducta en odontopediatría",
      assignedBy: "Dr. Fernández",
      assignedDate: "2023-05-08",
      dueDate: "2023-05-22",
      status: "approved",
      priority: "medium",
      specialty: "Odontopediatría",
      type: "presentation",
      progress: 100,
      feedback: "Muy buena presentación. Las técnicas están bien explicadas y los ejemplos son apropiados.",
      submittedFiles: ["presentacion_odontopediatria.pptx"],
      requirements: [
        "Duración: 15-20 minutos",
        "Incluir casos clínicos",
        "Referencias bibliográficas",
        "Formato PowerPoint",
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>
      case "in-progress":
        return <Badge variant="default">En Progreso</Badge>
      case "submitted":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            Enviado
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
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            Media
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Baja</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="h-4 w-4" />
      case "report":
        return <FileText className="h-4 w-4" />
      case "presentation":
        return <Eye className="h-4 w-4" />
      case "case-study":
        return <User className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredTasks = academicTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tareas Académicas</h1>
          <p className="text-muted-foreground">Gestiona las tareas asignadas por tus profesores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Ver Calendario
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar tareas..."
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
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in-progress">En Progreso</SelectItem>
              <SelectItem value="submitted">Enviado</SelectItem>
              <SelectItem value="approved">Aprobado</SelectItem>
              <SelectItem value="rejected">Rechazado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas las Tareas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="in-progress">En Progreso</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => {
              const daysUntilDue = getDaysUntilDue(task.dueDate)
              const isOverdue = daysUntilDue < 0
              const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

              return (
                <Card
                  key={task.id}
                  className={`overflow-hidden ${isOverdue ? "border-red-200 bg-red-50" : isDueSoon ? "border-yellow-200 bg-yellow-50" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(task.type)}
                          <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {task.assignedBy}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Asignado: {task.assignedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span
                            className={
                              isOverdue ? "text-red-600 font-medium" : isDueSoon ? "text-yellow-600 font-medium" : ""
                            }
                          >
                            Vence: {task.dueDate}
                            {isOverdue && " (Vencida)"}
                            {isDueSoon && !isOverdue && ` (${daysUntilDue} días)`}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.specialty}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedTask(task)
                        setIsViewTaskDialogOpen(true)
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </Button>
                    {task.status === "pending" || task.status === "in-progress" ? (
                      <Button size="sm" className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Trabajar
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks
              .filter((task) => task.status === "pending")
              .map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  {/* Same card content as above */}
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks
              .filter((task) => task.status === "in-progress")
              .map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  {/* Same card content as above */}
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks
              .filter((task) => task.status === "submitted" || task.status === "approved" || task.status === "rejected")
              .map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  {/* Same card content as above */}
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para ver detalles de la tarea */}
      {selectedTask && (
        <Dialog open={isViewTaskDialogOpen} onOpenChange={setIsViewTaskDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getTypeIcon(selectedTask.type)}
                {selectedTask.title}
              </DialogTitle>
              <DialogDescription>
                Asignado por {selectedTask.assignedBy} • {selectedTask.specialty}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Estado</span>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(selectedTask.status)}
                      {getPriorityBadge(selectedTask.priority)}
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Progreso</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{selectedTask.progress}% completado</span>
                      </div>
                      <Progress value={selectedTask.progress} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Descripción</h4>
                <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Requisitos</h4>
                <ul className="space-y-1">
                  {selectedTask.requirements.map((requirement, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </Card>

              {selectedTask.feedback && (
                <Card className="p-4 bg-green-50 border-green-200">
                  <h4 className="font-medium mb-2 text-green-800">Retroalimentación del Profesor</h4>
                  <p className="text-sm text-green-700">{selectedTask.feedback}</p>
                </Card>
              )}

              {selectedTask.submittedFiles && selectedTask.submittedFiles.length > 0 && (
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Archivos Enviados</h4>
                  <div className="space-y-2">
                    {selectedTask.submittedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Fecha de Asignación:</span>
                  <p className="text-muted-foreground">{selectedTask.assignedDate}</p>
                </div>
                <div>
                  <span className="font-medium">Fecha de Vencimiento:</span>
                  <p className="text-muted-foreground">{selectedTask.dueDate}</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewTaskDialogOpen(false)}>
                Cerrar
              </Button>
              {selectedTask.status === "pending" || selectedTask.status === "in-progress" ? (
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Trabajar en Tarea
                </Button>
              ) : (
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar Archivos
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
