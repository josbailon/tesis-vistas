"use client"

import { useState } from "react"
import { Search, FileText, CheckSquare, Calendar, Mail, Phone, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Datos de ejemplo para los estudiantes
const students = [
  {
    id: 1,
    name: "Carlos López",
    email: "carlos.lopez@ejemplo.com",
    phone: "555-123-4567",
    studentId: "E12345",
    specialty: "Endodoncia",
    progress: 75,
    pendingApprovals: 2,
    activeTreatments: 3,
    completedTreatments: 5,
    status: "active",
  },
  {
    id: 2,
    name: "María Fernández",
    email: "maria.fernandez@ejemplo.com",
    phone: "555-234-5678",
    studentId: "E12346",
    specialty: "Endodoncia",
    progress: 60,
    pendingApprovals: 1,
    activeTreatments: 2,
    completedTreatments: 3,
    status: "active",
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    phone: "555-345-6789",
    studentId: "E12347",
    specialty: "Ortodoncia",
    progress: 90,
    pendingApprovals: 0,
    activeTreatments: 4,
    completedTreatments: 8,
    status: "active",
  },
  {
    id: 4,
    name: "Sofía Ramírez",
    email: "sofia.ramirez@ejemplo.com",
    phone: "555-456-7890",
    studentId: "E12348",
    specialty: "Periodoncia",
    progress: 40,
    pendingApprovals: 2,
    activeTreatments: 1,
    completedTreatments: 2,
    status: "active",
  },
  {
    id: 5,
    name: "Pedro Gómez",
    email: "pedro.gomez@ejemplo.com",
    phone: "555-567-8901",
    studentId: "E12349",
    specialty: "Cirugía Oral",
    progress: 85,
    pendingApprovals: 1,
    activeTreatments: 3,
    completedTreatments: 6,
    status: "active",
  },
  {
    id: 6,
    name: "Laura Torres",
    email: "laura.torres@ejemplo.com",
    phone: "555-678-9012",
    studentId: "E12350",
    specialty: "Odontopediatría",
    progress: 70,
    pendingApprovals: 0,
    activeTreatments: 2,
    completedTreatments: 4,
    status: "inactive",
  },
]

// Datos de ejemplo para los casos clínicos
const clinicalCases = [
  {
    id: 1,
    patientName: "Ana García",
    studentName: "Carlos López",
    treatment: "Tratamiento de conducto en molar superior",
    startDate: "10/05/2025",
    status: "in-progress",
    progress: 60,
    lastUpdate: "18/05/2025",
  },
  {
    id: 2,
    patientName: "Juan Pérez",
    studentName: "María Fernández",
    treatment: "Tratamiento de conducto en premolar inferior",
    startDate: "05/05/2025",
    status: "in-progress",
    progress: 40,
    lastUpdate: "15/05/2025",
  },
  {
    id: 3,
    patientName: "Sofía Ramírez",
    studentName: "Carlos López",
    treatment: "Tratamiento de conducto en incisivo central",
    startDate: "01/05/2025",
    status: "completed",
    progress: 100,
    lastUpdate: "15/05/2025",
  },
  {
    id: 4,
    patientName: "Pedro Gómez",
    studentName: "Juan Pérez",
    treatment: "Retratamiento de conducto en molar inferior",
    startDate: "12/05/2025",
    status: "in-progress",
    progress: 30,
    lastUpdate: "17/05/2025",
  },
]

// Datos de ejemplo para las evaluaciones
const evaluations = [
  {
    id: 1,
    studentName: "Carlos López",
    title: "Evaluación de Competencias Clínicas",
    date: "15/05/2025",
    score: 85,
    maxScore: 100,
    status: "completed",
    feedback: "Buen manejo de instrumentos. Necesita mejorar en la técnica de obturación.",
  },
  {
    id: 2,
    studentName: "María Fernández",
    title: "Evaluación de Diagnóstico",
    date: "10/05/2025",
    score: 90,
    maxScore: 100,
    status: "completed",
    feedback: "Excelente capacidad diagnóstica. Muy buen manejo de radiografías.",
  },
  {
    id: 3,
    studentName: "Juan Pérez",
    title: "Evaluación de Procedimientos Clínicos",
    date: "20/05/2025",
    score: null,
    maxScore: 100,
    status: "pending",
    feedback: null,
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  // Filtrar estudiantes según los criterios de búsqueda y filtros
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty =
      specialtyFilter === "all" || student.specialty.toLowerCase() === specialtyFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesSpecialty && matchesStatus
  })

  // Ordenar estudiantes
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig) return 0

    if (sortConfig.key === "name") {
      return sortConfig.direction === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }

    if (sortConfig.key === "progress") {
      return sortConfig.direction === "ascending" ? a.progress - b.progress : b.progress - a.progress
    }

    return 0
  })

  // Función para cambiar el orden
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estudiantes</h1>
        <p className="text-muted-foreground">Gestiona y evalúa a tus estudiantes</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px]"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center space-x-2">
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                <SelectItem value="endodoncia">Endodoncia</SelectItem>
                <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                <SelectItem value="periodoncia">Periodoncia</SelectItem>
                <SelectItem value="cirugía oral">Cirugía Oral</SelectItem>
                <SelectItem value="odontopediatría">Odontopediatría</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Lista de Estudiantes</TabsTrigger>
          <TabsTrigger value="evaluations">Evaluaciones</TabsTrigger>
          <TabsTrigger value="cases">Casos Clínicos</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => requestSort("name")}>
                    Estudiante
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => requestSort("progress")}>
                    Progreso
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.specialty}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={student.progress} className="h-2 w-[100px]" />
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        student.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {student.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedStudent(student)
                        setIsStudentDialogOpen(true)
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="evaluations" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsEvaluationDialogOpen(true)}>Nueva Evaluación</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Evaluación</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell className="font-medium">{evaluation.studentName}</TableCell>
                  <TableCell>{evaluation.title}</TableCell>
                  <TableCell>{evaluation.date}</TableCell>
                  <TableCell>
                    {evaluation.score !== null ? (
                      <span>
                        {evaluation.score}/{evaluation.maxScore} (
                        {Math.round((evaluation.score / evaluation.maxScore) * 100)}%)
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Pendiente</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        evaluation.status === "completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {evaluation.status === "completed" ? "Completada" : "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      {evaluation.status === "completed" ? "Ver Detalles" : "Evaluar"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="cases" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Estudiante</TableHead>
                <TableHead>Tratamiento</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinicalCases.map((clinicalCase) => (
                <TableRow key={clinicalCase.id}>
                  <TableCell className="font-medium">{clinicalCase.patientName}</TableCell>
                  <TableCell>{clinicalCase.studentName}</TableCell>
                  <TableCell>{clinicalCase.treatment}</TableCell>
                  <TableCell>{clinicalCase.startDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        clinicalCase.status === "completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {clinicalCase.status === "completed" ? "Completado" : "En Progreso"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={clinicalCase.progress} className="h-2 w-[100px]" />
                      <span className="text-sm text-muted-foreground">{clinicalCase.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver Expediente
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Diálogo para ver detalles del estudiante */}
      {selectedStudent && (
        <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles del Estudiante</DialogTitle>
              <DialogDescription>Información detallada y progreso académico</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-2xl">{selectedStudent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">ID: {selectedStudent.studentId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email</p>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{selectedStudent.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Teléfono</p>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{selectedStudent.phone}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Especialidad</p>
                  <p className="text-sm">{selectedStudent.specialty}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Estado</p>
                  <Badge
                    variant="outline"
                    className={
                      selectedStudent.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {selectedStudent.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Progreso Académico</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progreso General</span>
                    <span>{selectedStudent.progress}%</span>
                  </div>
                  <Progress value={selectedStudent.progress} className="h-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Aprobaciones Pendientes</p>
                  <p className="text-2xl font-bold">{selectedStudent.pendingApprovals}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tratamientos Activos</p>
                  <p className="text-2xl font-bold">{selectedStudent.activeTreatments}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tratamientos Completados</p>
                  <p className="text-2xl font-bold">{selectedStudent.completedTreatments}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Pacientes Asignados</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Tratamiento</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clinicalCases
                      .filter((c) => c.studentName === selectedStudent.name)
                      .map((clinicalCase) => (
                        <TableRow key={clinicalCase.id}>
                          <TableCell className="font-medium">{clinicalCase.patientName}</TableCell>
                          <TableCell>{clinicalCase.treatment}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                clinicalCase.status === "completed"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {clinicalCase.status === "completed" ? "Completado" : "En Progreso"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Expediente
                </Button>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Ver Horario
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Evaluar Estudiante
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo para crear nueva evaluación */}
      <Dialog open={isEvaluationDialogOpen} onOpenChange={setIsEvaluationDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nueva Evaluación</DialogTitle>
            <DialogDescription>Crea una nueva evaluación para un estudiante</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="student" className="text-sm font-medium">
                Estudiante
              </label>
              <Select>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Seleccionar estudiante" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="evaluation-title" className="text-sm font-medium">
                Título de la Evaluación
              </label>
              <Input id="evaluation-title" placeholder="Ej: Evaluación de Competencias Clínicas" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="evaluation-date" className="text-sm font-medium">
                  Fecha
                </label>
                <Input id="evaluation-date" type="date" />
              </div>
              <div className="space-y-2">
                <label htmlFor="evaluation-max-score" className="text-sm font-medium">
                  Puntuación Máxima
                </label>
                <Input id="evaluation-max-score" type="number" defaultValue="100" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="evaluation-description" className="text-sm font-medium">
                Descripción
              </label>
              <Textarea
                id="evaluation-description"
                placeholder="Describe los objetivos y criterios de la evaluación"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="evaluation-criteria" className="text-sm font-medium">
                Criterios de Evaluación
              </label>
              <Textarea
                id="evaluation-criteria"
                placeholder="Lista los criterios específicos que se evaluarán"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsEvaluationDialogOpen(false)}>
              Crear Evaluación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
