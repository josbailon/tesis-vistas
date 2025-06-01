"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StudentForm } from "@/components/student-form"
import { StudentSchedule } from "@/components/student-schedule"
import { Search, Plus, BookOpen, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo para estudiantes
const mockStudents = [
  {
    id: "1",
    name: "Ana María López",
    email: "ana.lopez@estudiante.edu.ec",
    semester: 8,
    specialty: "Endodoncia",
    status: "active",
    professor: "Dr. Carlos Ruiz",
    gpa: 9.2,
    creditsCompleted: 180,
    totalCredits: 240,
  },
  {
    id: "2",
    name: "Juan Carlos Mendoza",
    email: "juan.mendoza@estudiante.edu.ec",
    semester: 7,
    specialty: "Ortodoncia",
    status: "active",
    professor: "Dra. Laura Martín",
    gpa: 8.7,
    creditsCompleted: 160,
    totalCredits: 240,
  },
  {
    id: "3",
    name: "María Fernanda Torres",
    email: "maria.torres@estudiante.edu.ec",
    semester: 9,
    specialty: "Cirugía Oral",
    status: "active",
    professor: "Dr. Roberto Silva",
    gpa: 9.5,
    creditsCompleted: 210,
    totalCredits: 240,
  },
  {
    id: "4",
    name: "Pedro Andrés Suárez",
    email: "pedro.suarez@estudiante.edu.ec",
    semester: 6,
    specialty: "Odontopediatría",
    status: "active",
    professor: "Dra. Carmen Vega",
    gpa: 8.3,
    creditsCompleted: 140,
    totalCredits: 240,
  },
  {
    id: "5",
    name: "Lucía Valentina Mora",
    email: "lucia.mora@estudiante.edu.ec",
    semester: 10,
    specialty: "Endodoncia",
    status: "graduated",
    professor: "Dr. Carlos Ruiz",
    gpa: 9.8,
    creditsCompleted: 240,
    totalCredits: 240,
  },
]

export default function StudentsInfoPage() {
  const { user } = useAuth()
  const [showNewStudentForm, setShowNewStudentForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [students] = useState(mockStudents)

  // Filtrar estudiantes según los criterios
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSemester = semesterFilter === "all" || student.semester.toString() === semesterFilter
    const matchesSpecialty = specialtyFilter === "all" || student.specialty === specialtyFilter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesSemester && matchesSpecialty && matchesStatus
  })

  // Calcular estadísticas
  const totalStudents = students.length
  const activeStudents = students.filter((s) => s.status === "active").length
  const averageGPA = students.reduce((sum, student) => sum + student.gpa, 0) / totalStudents
  const completionRate =
    (students.reduce((sum, student) => sum + student.creditsCompleted / student.totalCredits, 0) / totalStudents) * 100

  // Función para obtener el color de la insignia según el estado
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "graduated":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Función para obtener el texto del estado en español
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "graduated":
        return "Graduado"
      case "inactive":
        return "Inactivo"
      case "suspended":
        return "Suspendido"
      default:
        return status
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Información de Estudiantes</h1>
            <p className="text-muted-foreground">
              Gestiona la información académica de los estudiantes de odontología.
            </p>
          </div>
          <Button onClick={() => setShowNewStudentForm(!showNewStudentForm)}>
            <Plus className="mr-2 h-4 w-4" />
            {showNewStudentForm ? "Cancelar" : "Nuevo Estudiante"}
          </Button>
        </div>

        {showNewStudentForm && (
          <Card>
            <CardHeader>
              <CardTitle>Registrar Nuevo Estudiante</CardTitle>
              <CardDescription>Complete el formulario para registrar un nuevo estudiante</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentForm
                onSuccess={() => setShowNewStudentForm(false)}
                onCancel={() => setShowNewStudentForm(false)}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Estudiantes registrados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStudents}</div>
              <p className="text-xs text-muted-foreground">
                {((activeStudents / totalStudents) * 100).toFixed(1)}% del total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Promedio GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageGPA.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Sobre 10.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
              <Progress value={completionRate} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros y Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar estudiantes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="semester-filter" className="mb-1 block text-sm">
                  Semestre
                </Label>
                <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                  <SelectTrigger id="semester-filter">
                    <SelectValue placeholder="Todos los semestres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los semestres</SelectItem>
                    {[6, 7, 8, 9, 10].map((semester) => (
                      <SelectItem key={semester} value={semester.toString()}>
                        Semestre {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="specialty-filter" className="mb-1 block text-sm">
                  Especialidad
                </Label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger id="specialty-filter">
                    <SelectValue placeholder="Todas las especialidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las especialidades</SelectItem>
                    <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                    <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status-filter" className="mb-1 block text-sm">
                  Estado
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="graduated">Graduado</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">
              <BookOpen className="mr-2 h-4 w-4" />
              Lista de Estudiantes
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Calendar className="mr-2 h-4 w-4" />
              Horarios Académicos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Estudiantes{" "}
                  {searchTerm || semesterFilter !== "all" || specialtyFilter !== "all" || statusFilter !== "all"
                    ? "(Filtrados)"
                    : ""}
                </CardTitle>
                <CardDescription>{filteredStudents.length} estudiantes encontrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="h-10 px-4 text-left align-middle font-medium">Nombre</th>
                          <th className="h-10 px-4 text-left align-middle font-medium">Email</th>
                          <th className="h-10 px-4 text-left align-middle font-medium">Semestre</th>
                          <th className="h-10 px-4 text-left align-middle font-medium">Especialidad</th>
                          <th className="h-10 px-4 text-left align-middle font-medium">Profesor</th>
                          <th className="h-10 px-4 text-left align-middle font-medium">GPA</th>
                          <th className="h-10 px-4 text-left align-middle font-medium">Progreso</th>
                          <th className="h-10 px-4 text-left align-middle font-medium">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student) => (
                          <tr key={student.id} className="border-t hover:bg-muted/50">
                            <td className="p-4 align-middle">{student.name}</td>
                            <td className="p-4 align-middle">{student.email}</td>
                            <td className="p-4 align-middle">{student.semester}</td>
                            <td className="p-4 align-middle">{student.specialty}</td>
                            <td className="p-4 align-middle">{student.professor}</td>
                            <td className="p-4 align-middle">{student.gpa.toFixed(1)}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={(student.creditsCompleted / student.totalCredits) * 100}
                                  className="h-2 w-20"
                                />
                                <span className="text-xs">
                                  {Math.round((student.creditsCompleted / student.totalCredits) * 100)}%
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={getStatusBadgeColor(student.status)}>
                                {getStatusText(student.status)}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Horarios Académicos</CardTitle>
                <CardDescription>Vista de horarios por semana</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentSchedule students={filteredStudents} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
