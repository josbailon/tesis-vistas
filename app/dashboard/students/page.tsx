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
import { useAuth } from "@/contexts/auth-context"

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
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  console.log("🎓 Students Page - Usuario actual:", user)

  // Verificar que el usuario tenga permisos para ver esta página
  if (!user || (user.role !== "professor" && user.role !== "admin")) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Acceso Denegado</h2>
          <p className="text-red-600">No tienes permisos para ver esta página.</p>
        </div>
      </div>
    )
  }

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
        <h1 className="text-3xl font-bold tracking-tight text-green-800">Estudiantes</h1>
        <p className="text-green-600">Gestiona y evalúa a tus estudiantes</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-green-600" />
          <Input
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px] border-green-200 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center space-x-2">
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-[180px] border-green-200">
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
              <SelectTrigger className="w-[180px] border-green-200">
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
        <TabsList className="bg-green-100">
          <TabsTrigger value="list" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Lista de Estudiantes
          </TabsTrigger>
          <TabsTrigger value="evaluations" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Evaluaciones
          </TabsTrigger>
          <TabsTrigger value="cases" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Casos Clínicos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="border border-green-200 rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50">
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 h-8 font-medium text-green-800"
                      onClick={() => requestSort("name")}
                    >
                      Estudiante
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-green-800">ID</TableHead>
                  <TableHead className="text-green-800">Especialidad</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 h-8 font-medium text-green-800"
                      onClick={() => requestSort("progress")}
                    >
                      Progreso
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-green-800">Estado</TableHead>
                  <TableHead className="text-right text-green-800">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-green-50">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-green-100 text-green-800">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-green-800">{student.name}</div>
                          <div className="text-sm text-green-600">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-green-700">{student.studentId}</TableCell>
                    <TableCell className="text-green-700">{student.specialty}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={student.progress} className="h-2 w-[100px]" />
                        <span className="text-sm text-green-600">{student.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          student.status === "active"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-gray-100 text-gray-800 border-gray-300"
                        }
                      >
                        {student.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800 hover:bg-green-100"
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
          </div>
        </TabsContent>
        <TabsContent value="evaluations" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setIsEvaluationDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Nueva Evaluación
            </Button>
          </div>
          <div className="border border-green-200 rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50">
                  <TableHead className="text-green-800">Estudiante</TableHead>
                  <TableHead className="text-green-800">Evaluación</TableHead>
                  <TableHead className="text-green-800">Fecha</TableHead>
                  <TableHead className="text-green-800">Calificación</TableHead>
                  <TableHead className="text-green-800">Estado</TableHead>
                  <TableHead className="text-right text-green-800">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map((evaluation) => (
                  <TableRow key={evaluation.id} className="hover:bg-green-50">
                    <TableCell className="font-medium text-green-800">{evaluation.studentName}</TableCell>
                    <TableCell className="text-green-700">{evaluation.title}</TableCell>
                    <TableCell className="text-green-700">{evaluation.date}</TableCell>
                    <TableCell>
                      {evaluation.score !== null ? (
                        <span className="text-green-700">
                          {evaluation.score}/{evaluation.maxScore} (
                          {Math.round((evaluation.score / evaluation.maxScore) * 100)}%)
                        </span>
                      ) : (
                        <span className="text-green-500">Pendiente</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          evaluation.status === "completed"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-yellow-100 text-yellow-800 border-yellow-300"
                        }
                      >
                        {evaluation.status === "completed" ? "Completada" : "Pendiente"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800 hover:bg-green-100"
                      >
                        {evaluation.status === "completed" ? "Ver Detalles" : "Evaluar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="cases" className="space-y-4">
          <div className="border border-green-200 rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50">
                  <TableHead className="text-green-800">Paciente</TableHead>
                  <TableHead className="text-green-800">Estudiante</TableHead>
                  <TableHead className="text-green-800">Tratamiento</TableHead>
                  <TableHead className="text-green-800">Inicio</TableHead>
                  <TableHead className="text-green-800">Estado</TableHead>
                  <TableHead className="text-green-800">Progreso</TableHead>
                  <TableHead className="text-right text-green-800">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clinicalCases.map((clinicalCase) => (
                  <TableRow key={clinicalCase.id} className="hover:bg-green-50">
                    <TableCell className="font-medium text-green-800">{clinicalCase.patientName}</TableCell>
                    <TableCell className="text-green-700">{clinicalCase.studentName}</TableCell>
                    <TableCell className="text-green-700">{clinicalCase.treatment}</TableCell>
                    <TableCell className="text-green-700">{clinicalCase.startDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          clinicalCase.status === "completed"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-blue-100 text-blue-800 border-blue-300"
                        }
                      >
                        {clinicalCase.status === "completed" ? "Completado" : "En Progreso"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={clinicalCase.progress} className="h-2 w-[100px]" />
                        <span className="text-sm text-green-600">{clinicalCase.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-800 hover:bg-green-100"
                      >
                        Ver Expediente
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo para ver detalles del estudiante */}
      {selectedStudent && (
        <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
          <DialogContent className="sm:max-w-[600px] border-green-200">
            <DialogHeader>
              <DialogTitle className="text-green-800">Detalles del Estudiante</DialogTitle>
              <DialogDescription className="text-green-600">
                Información detallada y progreso académico
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-2xl bg-green-100 text-green-800">
                    {selectedStudent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-green-800">{selectedStudent.name}</h3>
                  <p className="text-green-600">ID: {selectedStudent.studentId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">Email</p>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-700">{selectedStudent.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">Teléfono</p>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-green-600" />
                    <p className="text-sm text-green-700">{selectedStudent.phone}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">Especialidad</p>
                  <p className="text-sm text-green-700">{selectedStudent.specialty}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">Estado</p>
                  <Badge
                    variant="outline"
                    className={
                      selectedStudent.status === "active"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-gray-100 text-gray-800 border-gray-300"
                    }
                  >
                    {selectedStudent.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Progreso Académico</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Progreso General</span>
                    <span className="text-green-700">{selectedStudent.progress}%</span>
                  </div>
                  <Progress value={selectedStudent.progress} className="h-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">Aprobaciones Pendientes</p>
                  <p className="text-2xl font-bold text-green-700">{selectedStudent.pendingApprovals}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">Tratamientos Activos</p>
                  <p className="text-2xl font-bold text-green-700">{selectedStudent.activeTreatments}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-800">Tratamientos Completados</p>
                  <p className="text-2xl font-bold text-green-700">{selectedStudent.completedTreatments}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Pacientes Asignados</h4>
                <div className="border border-green-200 rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-green-50">
                        <TableHead className="text-green-800">Paciente</TableHead>
                        <TableHead className="text-green-800">Tratamiento</TableHead>
                        <TableHead className="text-green-800">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clinicalCases
                        .filter((c) => c.studentName === selectedStudent.name)
                        .map((clinicalCase) => (
                          <TableRow key={clinicalCase.id}>
                            <TableCell className="font-medium text-green-800">{clinicalCase.patientName}</TableCell>
                            <TableCell className="text-green-700">{clinicalCase.treatment}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  clinicalCase.status === "completed"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : "bg-blue-100 text-blue-800 border-blue-300"
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
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Expediente
                </Button>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                  <Calendar className="mr-2 h-4 w-4" />
                  Ver Horario
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
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
        <DialogContent className="sm:max-w-[600px] border-green-200">
          <DialogHeader>
            <DialogTitle className="text-green-800">Nueva Evaluación</DialogTitle>
            <DialogDescription className="text-green-600">
              Crea una nueva evaluación para un estudiante
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="student" className="text-sm font-medium text-green-800">
                Estudiante
              </label>
              <Select>
                <SelectTrigger id="student" className="border-green-200">
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
              <label htmlFor="evaluation-title" className="text-sm font-medium text-green-800">
                Título de la Evaluación
              </label>
              <Input
                id="evaluation-title"
                placeholder="Ej: Evaluación de Competencias Clínicas"
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="evaluation-date" className="text-sm font-medium text-green-800">
                  Fecha
                </label>
                <Input id="evaluation-date" type="date" className="border-green-200 focus:border-green-500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="evaluation-max-score" className="text-sm font-medium text-green-800">
                  Puntuación Máxima
                </label>
                <Input
                  id="evaluation-max-score"
                  type="number"
                  defaultValue="100"
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="evaluation-description" className="text-sm font-medium text-green-800">
                Descripción
              </label>
              <Textarea
                id="evaluation-description"
                placeholder="Describe los objetivos y criterios de la evaluación"
                rows={3}
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="evaluation-criteria" className="text-sm font-medium text-green-800">
                Criterios de Evaluación
              </label>
              <Textarea
                id="evaluation-criteria"
                placeholder="Lista los criterios específicos que se evaluarán"
                rows={4}
                className="border-green-200 focus:border-green-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => setIsEvaluationDialogOpen(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Crear Evaluación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
