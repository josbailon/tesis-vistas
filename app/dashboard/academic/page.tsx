"use client"

import { useState } from "react"
import { Search, Plus, FileText, CheckCircle, Clock, BookOpen, Upload, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo para las tareas académicas
const academicTasks = [
  {
    id: 1,
    title: "Caso Clínico: Tratamiento de Conducto",
    description:
      "Documentar el proceso completo de un tratamiento de conducto, incluyendo diagnóstico, plan de tratamiento y seguimiento.",
    dueDate: "30/05/2025",
    status: "in-progress",
    progress: 60,
    specialty: "Endodoncia",
    professor: "Dr. Martínez",
    feedback: null,
  },
  {
    id: 2,
    title: "Revisión Bibliográfica: Nuevas Técnicas en Ortodoncia",
    description: "Investigar y resumir los avances recientes en técnicas de ortodoncia de los últimos 5 años.",
    dueDate: "15/06/2025",
    status: "pending",
    progress: 20,
    specialty: "Ortodoncia",
    professor: "Dra. Rodríguez",
    feedback: null,
  },
  {
    id: 3,
    title: "Presentación: Tratamiento de Periodontitis",
    description: "Preparar una presentación sobre los protocolos actuales para el tratamiento de periodontitis severa.",
    dueDate: "10/05/2025",
    status: "completed",
    progress: 100,
    specialty: "Periodoncia",
    professor: "Dr. Sánchez",
    feedback:
      "Excelente presentación. Muy completa y bien documentada. Incluye referencias actualizadas y casos prácticos relevantes.",
  },
  {
    id: 4,
    title: "Informe: Técnicas de Extracción Atraumática",
    description:
      "Documentar las técnicas de extracción atraumática utilizadas en la práctica clínica, con énfasis en la preservación del hueso alveolar.",
    dueDate: "05/06/2025",
    status: "in-progress",
    progress: 45,
    specialty: "Cirugía Oral",
    professor: "Dra. López",
    feedback: null,
  },
]

// Datos de ejemplo para las solicitudes de aprobación
const approvalRequests = [
  {
    id: 1,
    title: "Aprobación de Plan de Tratamiento",
    patientName: "Ana García",
    description: "Solicitud de aprobación para iniciar tratamiento de conducto en molar superior derecho.",
    submittedDate: "18/05/2025",
    status: "pending",
    specialty: "Endodoncia",
    professor: "Dr. Martínez",
    response: null,
  },
  {
    id: 2,
    title: "Validación de Diagnóstico",
    patientName: "Carlos López",
    description:
      "Solicitud de validación de diagnóstico de maloclusión clase II y plan de tratamiento ortodóntico propuesto.",
    submittedDate: "15/05/2025",
    status: "approved",
    specialty: "Ortodoncia",
    professor: "Dra. Rodríguez",
    response:
      "Diagnóstico correcto. Proceda con el plan de tratamiento propuesto. Recuerde documentar los avances mensualmente.",
  },
  {
    id: 3,
    title: "Aprobación de Procedimiento Quirúrgico",
    patientName: "Juan Pérez",
    description: "Solicitud de aprobación para realizar extracción de terceros molares inferiores impactados.",
    submittedDate: "12/05/2025",
    status: "rejected",
    specialty: "Cirugía Oral",
    professor: "Dra. López",
    response:
      "Se requiere una tomografía computarizada previa al procedimiento para evaluar la proximidad al nervio alveolar inferior. Por favor, solicite el estudio y vuelva a presentar la solicitud.",
  },
]

export default function AcademicPage() {
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [isAddRequestDialogOpen, setIsAddRequestDialogOpen] = useState(false)
  const [isViewTaskDialogOpen, setIsViewTaskDialogOpen] = useState(false)
  const [isViewRequestDialogOpen, setIsViewRequestDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<(typeof academicTasks)[0] | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<(typeof approvalRequests)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filtrar tareas académicas según los criterios de búsqueda y filtros
  const filteredTasks = academicTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.professor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty = specialtyFilter === "all" || task.specialty.toLowerCase() === specialtyFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || task.status === statusFilter

    return matchesSearch && matchesSpecialty && matchesStatus
  })

  // Filtrar solicitudes de aprobación según los criterios de búsqueda y filtros
  const filteredRequests = approvalRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.professor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty =
      specialtyFilter === "all" || request.specialty.toLowerCase() === specialtyFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesSpecialty && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Académico</h1>
          <p className="text-muted-foreground">Gestiona tus tareas académicas y solicitudes de aprobación</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px]"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="specialty-filter" className="text-sm">
              Especialidad:
            </Label>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger id="specialty-filter" className="w-[150px]">
                <SelectValue placeholder="Filtrar por especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="endodoncia">Endodoncia</SelectItem>
                <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                <SelectItem value="periodoncia">Periodoncia</SelectItem>
                <SelectItem value="cirugía oral">Cirugía Oral</SelectItem>
                <SelectItem value="odontopediatría">Odontopediatría</SelectItem>
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
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in-progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="approved">Aprobado</SelectItem>
                <SelectItem value="rejected">Rechazado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tareas Académicas</TabsTrigger>
          <TabsTrigger value="approvals">Solicitudes de Aprobación</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Tarea
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Añadir Nueva Tarea Académica</DialogTitle>
                  <DialogDescription>Completa los detalles para registrar una nueva tarea académica</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Título</Label>
                    <Input id="task-title" placeholder="Título de la tarea" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-description">Descripción</Label>
                    <Textarea id="task-description" placeholder="Descripción detallada de la tarea" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-specialty">Especialidad</Label>
                      <Select>
                        <SelectTrigger id="task-specialty">
                          <SelectValue placeholder="Seleccionar especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="endodoncia">Endodoncia</SelectItem>
                          <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                          <SelectItem value="periodoncia">Periodoncia</SelectItem>
                          <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                          <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-professor">Profesor</Label>
                      <Select>
                        <SelectTrigger id="task-professor">
                          <SelectValue placeholder="Seleccionar profesor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="martinez">Dr. Martínez</SelectItem>
                          <SelectItem value="rodriguez">Dra. Rodríguez</SelectItem>
                          <SelectItem value="sanchez">Dr. Sánchez</SelectItem>
                          <SelectItem value="lopez">Dra. López</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-due-date">Fecha de Entrega</Label>
                      <Input id="task-due-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-status">Estado</Label>
                      <Select defaultValue="pending">
                        <SelectTrigger id="task-status">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="in-progress">En Progreso</SelectItem>
                          <SelectItem value="completed">Completado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-progress">Progreso</Label>
                    <Input id="task-progress" type="range" min="0" max="100" step="5" defaultValue="0" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsAddTaskDialogOpen(false)}>
                    Guardar Tarea
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <CardDescription>{task.specialty}</CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        task.status === "completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {task.status === "completed"
                        ? "Completado"
                        : task.status === "in-progress"
                          ? "En Progreso"
                          : "Pendiente"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm line-clamp-2">{task.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Profesor: {task.professor}</span>
                      <span>Entrega: {task.dueDate}</span>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span>Progreso</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTask(task)
                      setIsViewTaskDialogOpen(true)
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Entregar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="approvals" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAddRequestDialogOpen} onOpenChange={setIsAddRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Solicitud
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Solicitud de Aprobación</DialogTitle>
                  <DialogDescription>Completa los detalles para enviar una solicitud de aprobación</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="request-title">Título</Label>
                    <Input id="request-title" placeholder="Título de la solicitud" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="request-patient">Paciente</Label>
                      <Select>
                        <SelectTrigger id="request-patient">
                          <SelectValue placeholder="Seleccionar paciente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ana">Ana García</SelectItem>
                          <SelectItem value="carlos">Carlos López</SelectItem>
                          <SelectItem value="maria">María Fernández</SelectItem>
                          <SelectItem value="juan">Juan Pérez</SelectItem>
                          <SelectItem value="sofia">Sofía Ramírez</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-type">Tipo de Solicitud</Label>
                      <Select>
                        <SelectTrigger id="request-type">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plan">Plan de Tratamiento</SelectItem>
                          <SelectItem value="diagnostico">Validación de Diagnóstico</SelectItem>
                          <SelectItem value="procedimiento">Procedimiento Quirúrgico</SelectItem>
                          <SelectItem value="alta">Alta de Paciente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="request-specialty">Especialidad</Label>
                      <Select>
                        <SelectTrigger id="request-specialty">
                          <SelectValue placeholder="Seleccionar especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="endodoncia">Endodoncia</SelectItem>
                          <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                          <SelectItem value="periodoncia">Periodoncia</SelectItem>
                          <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                          <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-professor">Profesor</Label>
                      <Select>
                        <SelectTrigger id="request-professor">
                          <SelectValue placeholder="Seleccionar profesor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="martinez">Dr. Martínez</SelectItem>
                          <SelectItem value="rodriguez">Dra. Rodríguez</SelectItem>
                          <SelectItem value="sanchez">Dr. Sánchez</SelectItem>
                          <SelectItem value="lopez">Dra. López</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="request-description">Descripción</Label>
                    <Textarea id="request-description" placeholder="Descripción detallada de la solicitud" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="request-files">Archivos Adjuntos</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="request-files"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG, PNG (MAX. 10MB)</p>
                        </div>
                        <Input id="request-files" type="file" multiple className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsAddRequestDialogOpen(false)}>
                    Enviar Solicitud
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Profesor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>{request.patientName}</TableCell>
                  <TableCell>{request.specialty}</TableCell>
                  <TableCell>{request.professor}</TableCell>
                  <TableCell>{request.submittedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        request.status === "approved"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : request.status === "rejected"
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {request.status === "approved"
                        ? "Aprobado"
                        : request.status === "rejected"
                          ? "Rechazado"
                          : "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedRequest(request)
                        setIsViewRequestDialogOpen(true)
                      }}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Diálogo para ver detalles de la tarea */}
      {selectedTask && (
        <Dialog open={isViewTaskDialogOpen} onOpenChange={setIsViewTaskDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles de la Tarea</DialogTitle>
              <DialogDescription>Información detallada de la tarea académica</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{selectedTask.title}</h3>
                <Badge
                  variant="outline"
                  className={
                    selectedTask.status === "completed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : selectedTask.status === "in-progress"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {selectedTask.status === "completed"
                    ? "Completado"
                    : selectedTask.status === "in-progress"
                      ? "En Progreso"
                      : "Pendiente"}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Descripción</p>
                <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Especialidad</p>
                  <p className="text-sm text-muted-foreground">{selectedTask.specialty}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Profesor</p>
                  <p className="text-sm text-muted-foreground">{selectedTask.professor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Fecha de Entrega</p>
                  <p className="text-sm text-muted-foreground">{selectedTask.dueDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Progreso</p>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedTask.progress} className="h-2 flex-1" />
                    <span className="text-sm text-muted-foreground">{selectedTask.progress}%</span>
                  </div>
                </div>
              </div>

              {selectedTask.feedback && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Retroalimentación del Profesor</p>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">{selectedTask.feedback}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium">Archivos Adjuntos</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Documento_Tarea.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar</span>
                    </Button>
                  </div>
                </div>
              </div>

              {selectedTask.status !== "completed" && (
                <div className="space-y-2">
                  <Label htmlFor="task-update-progress">Actualizar Progreso</Label>
                  <Input
                    id="task-update-progress"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    defaultValue={selectedTask.progress}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Ver Recursos
                </Button>
              </div>
              <div className="flex space-x-2">
                {selectedTask.status !== "completed" ? (
                  <>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Subir Archivos
                    </Button>
                    <Button>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Marcar como Completado
                    </Button>
                  </>
                ) : (
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Certificado
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo para ver detalles de la solicitud */}
      {selectedRequest && (
        <Dialog open={isViewRequestDialogOpen} onOpenChange={setIsViewRequestDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles de la Solicitud</DialogTitle>
              <DialogDescription>Información detallada de la solicitud de aprobación</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{selectedRequest.title}</h3>
                <Badge
                  variant="outline"
                  className={
                    selectedRequest.status === "approved"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : selectedRequest.status === "rejected"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {selectedRequest.status === "approved"
                    ? "Aprobado"
                    : selectedRequest.status === "rejected"
                      ? "Rechazado"
                      : "Pendiente"}
                </Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Descripción</p>
                <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Paciente</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.patientName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Fecha de Envío</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.submittedDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Especialidad</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.specialty}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Profesor</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.professor}</p>
                </div>
              </div>

              {selectedRequest.response && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Respuesta del Profesor</p>
                  <div
                    className={`p-3 rounded-md ${
                      selectedRequest.status === "approved"
                        ? "bg-green-50"
                        : selectedRequest.status === "rejected"
                          ? "bg-red-50"
                          : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{selectedRequest.response}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium">Archivos Adjuntos</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Radiografia_Paciente.jpg</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar</span>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Plan_Tratamiento.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              {selectedRequest.status === "pending" ? (
                <Button variant="outline" className="text-yellow-600">
                  <Clock className="mr-2 h-4 w-4" />
                  Recordar al Profesor
                </Button>
              ) : selectedRequest.status === "rejected" ? (
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Nueva Versión
                </Button>
              ) : (
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Expediente
                </Button>
              )}
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Descargar Todo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
