"use client"

import { useState } from "react"
import { Users, CheckSquare, Calendar, FileText, Search, ArrowUpDown, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo para la especialidad
const specialtyInfo = {
  name: "Endodoncia",
  description: "Tratamiento de conductos y problemas de la pulpa dental",
  professors: 2,
  students: 8,
  pendingApprovals: 5,
  activeTreatments: 12,
  completedTreatments: 24,
}

// Datos de ejemplo para los estudiantes
const students = [
  {
    id: 1,
    name: "Carlos López",
    email: "carlos.lopez@ejemplo.com",
    studentId: "E12345",
    progress: 75,
    pendingApprovals: 2,
    activeTreatments: 3,
    completedTreatments: 5,
  },
  {
    id: 2,
    name: "María Fernández",
    email: "maria.fernandez@ejemplo.com",
    studentId: "E12346",
    progress: 60,
    pendingApprovals: 1,
    activeTreatments: 2,
    completedTreatments: 3,
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    studentId: "E12347",
    progress: 90,
    pendingApprovals: 0,
    activeTreatments: 4,
    completedTreatments: 8,
  },
  {
    id: 4,
    name: "Sofía Ramírez",
    email: "sofia.ramirez@ejemplo.com",
    studentId: "E12348",
    progress: 40,
    pendingApprovals: 2,
    activeTreatments: 1,
    completedTreatments: 2,
  },
]

// Datos de ejemplo para las solicitudes de aprobación
const approvalRequests = [
  {
    id: 1,
    title: "Aprobación de Plan de Tratamiento",
    studentName: "Carlos López",
    patientName: "Ana García",
    description: "Solicitud de aprobación para iniciar tratamiento de conducto en molar superior derecho.",
    submittedDate: "18/05/2025",
    status: "pending",
  },
  {
    id: 2,
    title: "Validación de Diagnóstico",
    studentName: "María Fernández",
    patientName: "Juan Pérez",
    description: "Solicitud de validación de diagnóstico de pulpitis irreversible en premolar inferior izquierdo.",
    submittedDate: "17/05/2025",
    status: "pending",
  },
  {
    id: 3,
    title: "Aprobación de Finalización de Tratamiento",
    studentName: "Carlos López",
    patientName: "Sofía Ramírez",
    description: "Solicitud de aprobación para dar por finalizado el tratamiento de conducto en incisivo central.",
    submittedDate: "15/05/2025",
    status: "pending",
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

export default function SpecialtyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  // Filtrar estudiantes según el término de búsqueda
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  // Filtrar solicitudes de aprobación según el término de búsqueda
  const filteredApprovals = approvalRequests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrar casos clínicos según el término de búsqueda
  const filteredCases = clinicalCases.filter(
    (clinicalCase) =>
      clinicalCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinicalCase.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinicalCase.treatment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Especialidad: {specialtyInfo.name}</h1>
        <p className="text-muted-foreground">{specialtyInfo.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialtyInfo.students}</div>
            <p className="text-xs text-muted-foreground">Estudiantes asignados a esta especialidad</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobaciones Pendientes</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialtyInfo.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Solicitudes pendientes de revisión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tratamientos Activos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialtyInfo.activeTreatments}</div>
            <p className="text-xs text-muted-foreground">Tratamientos en curso actualmente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tratamientos Completados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialtyInfo.completedTreatments}</div>
            <p className="text-xs text-muted-foreground">Tratamientos finalizados este semestre</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar estudiantes, pacientes o tratamientos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="approvals">Aprobaciones Pendientes</TabsTrigger>
          <TabsTrigger value="cases">Casos Clínicos</TabsTrigger>
          <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 h-8 font-medium" onClick={() => requestSort("progress")}>
                    Progreso
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Pendientes</TableHead>
                <TableHead>Activos</TableHead>
                <TableHead>Completados</TableHead>
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
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={student.progress} className="h-2 w-[100px]" />
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.pendingApprovals > 0 ? (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        {student.pendingApprovals}
                      </Badge>
                    ) : (
                      <span>0</span>
                    )}
                  </TableCell>
                  <TableCell>{student.activeTreatments}</TableCell>
                  <TableCell>{student.completedTreatments}</TableCell>
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
        <TabsContent value="approvals" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Estudiante</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>{request.studentName}</TableCell>
                  <TableCell>{request.patientName}</TableCell>
                  <TableCell>{request.submittedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                      <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                        Aprobar
                      </Button>
                    </div>
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
              {filteredCases.map((clinicalCase) => (
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
        <TabsContent value="statistics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Tratamientos</CardTitle>
                <CardDescription>Distribución de tratamientos por tipo y estado</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Gráfico de distribución de tratamientos</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Progreso de Estudiantes</CardTitle>
                <CardDescription>Progreso académico de los estudiantes en la especialidad</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Gráfico de progreso de estudiantes</p>
                </div>
              </CardContent>
            </Card>
          </div>
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
                  <p className="text-muted-foreground">Email: {selectedStudent.email}</p>
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
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
