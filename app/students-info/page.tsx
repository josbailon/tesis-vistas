"use client"

import { useState } from "react"
import { Search, Filter, Plus, GraduationCap, BookOpen, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { StudentForm } from "@/components/student-form"
import { StudentSchedule } from "@/components/student-schedule"

interface Student {
  id: string
  name: string
  email: string
  studentId: string
  semester: number
  specialty: string
  gpa: number
  attendanceRate: number
  completedCredits: number
  totalCredits: number
  status: "active" | "inactive" | "graduated" | "suspended"
  enrollmentDate: string
  avatar?: string
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana María González",
    email: "ana.gonzalez@uleam.edu.ec",
    studentId: "2021-001",
    semester: 8,
    specialty: "Odontología General",
    gpa: 8.5,
    attendanceRate: 95,
    completedCredits: 180,
    totalCredits: 200,
    status: "active",
    enrollmentDate: "2021-03-15",
  },
  {
    id: "2",
    name: "Carlos Eduardo Ramírez",
    email: "carlos.ramirez@uleam.edu.ec",
    studentId: "2020-045",
    semester: 10,
    specialty: "Cirugía Oral",
    gpa: 9.2,
    attendanceRate: 98,
    completedCredits: 195,
    totalCredits: 200,
    status: "active",
    enrollmentDate: "2020-09-01",
  },
  {
    id: "3",
    name: "Sofía Alejandra Torres",
    email: "sofia.torres@uleam.edu.ec",
    studentId: "2022-023",
    semester: 4,
    specialty: "Ortodoncia",
    gpa: 8.8,
    attendanceRate: 92,
    completedCredits: 80,
    totalCredits: 200,
    status: "active",
    enrollmentDate: "2022-03-15",
  },
]

export default function StudentsInfoPage() {
  const [students] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.includes(searchTerm) ||
      student.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "graduated":
        return "bg-blue-100 text-blue-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "graduated":
        return "Graduado"
      case "suspended":
        return "Suspendido"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Información de Estudiantes</h1>
            <p className="text-gray-600">Gestiona y supervisa el progreso académico de los estudiantes</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Estudiante
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar estudiantes por nombre, ID o especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
                  <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Estudiantes Activos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {students.filter((s) => s.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Promedio GPA</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Asistencia Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista de Estudiantes</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredStudents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <GraduationCap className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron estudiantes</h3>
                    <p className="text-gray-600 text-center">
                      {searchTerm ? "Intenta ajustar los términos de búsqueda" : "No hay estudiantes registrados"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredStudents.map((student) => (
                  <Card key={student.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{student.name}</h3>
                              <Badge className={getStatusColor(student.status)}>{getStatusLabel(student.status)}</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">ID:</span> {student.studentId}
                              </div>
                              <div>
                                <span className="font-medium">Semestre:</span> {student.semester}
                              </div>
                              <div>
                                <span className="font-medium">Especialidad:</span> {student.specialty}
                              </div>
                              <div>
                                <span className="font-medium">GPA:</span> {student.gpa}
                              </div>
                            </div>

                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progreso de Créditos</span>
                                <span>
                                  {student.completedCredits}/{student.totalCredits}
                                </span>
                              </div>
                              <Progress
                                value={(student.completedCredits / student.totalCredits) * 100}
                                className="h-2"
                              />
                            </div>

                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Asistencia:</span> {student.attendanceRate}%
                              </div>
                              <div>
                                <span className="font-medium">Email:</span> {student.email}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <StudentSchedule />
          </TabsContent>
        </Tabs>

        {/* Student Form Modal */}
        {showForm && <StudentForm onClose={() => setShowForm(false)} onSuccess={() => setShowForm(false)} />}

        {/* Student Details Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Detalles del Estudiante</CardTitle>
                    <CardDescription>{selectedStudent.name}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">ID de Estudiante</label>
                      <p className="text-lg">{selectedStudent.studentId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Semestre Actual</label>
                      <p className="text-lg">{selectedStudent.semester}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Especialidad</label>
                      <p className="text-lg">{selectedStudent.specialty}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">GPA</label>
                      <p className="text-lg">{selectedStudent.gpa}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Progreso Académico</label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Créditos Completados</span>
                        <span>
                          {selectedStudent.completedCredits}/{selectedStudent.totalCredits}
                        </span>
                      </div>
                      <Progress
                        value={(selectedStudent.completedCredits / selectedStudent.totalCredits) * 100}
                        className="h-3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tasa de Asistencia</label>
                      <p className="text-lg">{selectedStudent.attendanceRate}%</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Estado</label>
                      <Badge className={getStatusColor(selectedStudent.status)}>
                        {getStatusLabel(selectedStudent.status)}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg">{selectedStudent.email}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Inscripción</label>
                    <p className="text-lg">{new Date(selectedStudent.enrollmentDate).toLocaleDateString("es-ES")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
