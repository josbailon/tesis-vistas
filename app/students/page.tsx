"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Eye, GraduationCap, Mail, Phone, MapPin, Calendar, BookOpen, Award, Star } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  semester: number
  experience: "Básico" | "Intermedio" | "Avanzado"
  gpa: number
  completedCases: number
  address: string
  enrollmentDate: string
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const students: Student[] = [
    {
      id: "1",
      name: "Juan Carlos Pérez Mendoza",
      email: "juan.perez@uleam.edu.ec",
      phone: "+593 99 111 2222",
      specialty: "Endodoncia",
      semester: 8,
      experience: "Avanzado",
      gpa: 8.5,
      completedCases: 25,
      address: "Av. Universitaria 123, Manta",
      enrollmentDate: "2020-09-01",
    },
    {
      id: "2",
      name: "Ana María López Silva",
      email: "ana.lopez@uleam.edu.ec",
      phone: "+593 99 222 3333",
      specialty: "Ortodoncia",
      semester: 7,
      experience: "Intermedio",
      gpa: 9.2,
      completedCases: 18,
      address: "Calle 24 de Mayo 456, Manta",
      enrollmentDate: "2021-03-01",
    },
    {
      id: "3",
      name: "Pedro Antonio Silva Castro",
      email: "pedro.silva@uleam.edu.ec",
      phone: "+593 99 333 4444",
      specialty: "Cirugía Oral y Maxilofacial",
      semester: 9,
      experience: "Avanzado",
      gpa: 8.8,
      completedCases: 32,
      address: "Barrio Los Almendros, Manta",
      enrollmentDate: "2019-09-01",
    },
    {
      id: "4",
      name: "Carmen Elena Torres Vera",
      email: "carmen.torres@uleam.edu.ec",
      phone: "+593 99 444 5555",
      specialty: "Periodoncia",
      semester: 6,
      experience: "Intermedio",
      gpa: 8.1,
      completedCases: 12,
      address: "Ciudadela El Palmar, Manta",
      enrollmentDate: "2022-03-01",
    },
    {
      id: "5",
      name: "Luis Fernando Morales Ponce",
      email: "luis.morales@uleam.edu.ec",
      phone: "+593 99 555 6666",
      specialty: "Odontopediatría",
      semester: 5,
      experience: "Básico",
      gpa: 7.8,
      completedCases: 8,
      address: "Av. Flavio Reyes 789, Manta",
      enrollmentDate: "2022-09-01",
    },
    {
      id: "6",
      name: "María José Herrera Alava",
      email: "maria.herrera@uleam.edu.ec",
      phone: "+593 99 666 7777",
      specialty: "Endodoncia",
      semester: 8,
      experience: "Avanzado",
      gpa: 9.0,
      completedCases: 28,
      address: "Barrio Jocay, Manta",
      enrollmentDate: "2020-09-01",
    },
    {
      id: "7",
      name: "Roberto Carlos Díaz López",
      email: "roberto.diaz@uleam.edu.ec",
      phone: "+593 99 777 8888",
      specialty: "Ortodoncia",
      semester: 7,
      experience: "Intermedio",
      gpa: 8.3,
      completedCases: 20,
      address: "Ciudadela Miraflores, Manta",
      enrollmentDate: "2021-03-01",
    },
    {
      id: "8",
      name: "Laura Patricia Rodríguez Mora",
      email: "laura.rodriguez@uleam.edu.ec",
      phone: "+593 99 888 9999",
      specialty: "Prostodoncia",
      semester: 9,
      experience: "Avanzado",
      gpa: 9.1,
      completedCases: 30,
      address: "Av. 4 de Noviembre, Manta",
      enrollmentDate: "2019-09-01",
    },
    {
      id: "9",
      name: "Diego Alejandro Vega Santos",
      email: "diego.vega@uleam.edu.ec",
      phone: "+593 99 999 0000",
      specialty: "Odontología Estética",
      semester: 6,
      experience: "Intermedio",
      gpa: 8.4,
      completedCases: 15,
      address: "Barrio San Mateo, Manta",
      enrollmentDate: "2022-03-01",
    },
    {
      id: "10",
      name: "Sofía Gabriela Muñoz Cedeño",
      email: "sofia.munoz@uleam.edu.ec",
      phone: "+593 99 000 1111",
      specialty: "Implantología",
      semester: 10,
      experience: "Avanzado",
      gpa: 9.3,
      completedCases: 35,
      address: "Urbanización Los Esteros, Manta",
      enrollmentDate: "2019-03-01",
    },
  ]

  const specialties = [
    "Endodoncia",
    "Ortodoncia",
    "Cirugía Oral y Maxilofacial",
    "Periodoncia",
    "Odontopediatría",
    "Prostodoncia",
    "Odontología Estética",
    "Implantología",
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = specialtyFilter === "all" || student.specialty === specialtyFilter
    const matchesSemester = semesterFilter === "all" || student.semester.toString() === semesterFilter

    return matchesSearch && matchesSpecialty && matchesSemester
  })

  const getExperienceBadge = (experience: string) => {
    const colors = {
      Básico: "bg-yellow-100 text-yellow-800",
      Intermedio: "bg-blue-100 text-blue-800",
      Avanzado: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[experience as keyof typeof colors]}>{experience}</Badge>
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 9) return "text-green-600"
    if (gpa >= 8) return "text-blue-600"
    if (gpa >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Directorio de Estudiantes</h1>
          <p className="text-muted-foreground">Información pública de los estudiantes de odontología</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Registrados en el programa</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Especialidades</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialties.length}</div>
            <p className="text-xs text-muted-foreground">Áreas de especialización</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio GPA</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Promedio general</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Completados</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.reduce((acc, s) => acc + s.completedCases, 0)}</div>
            <p className="text-xs text-muted-foreground">Total de casos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Estudiantes</CardTitle>
          <CardDescription>Encuentra estudiantes por nombre, especialidad o semestre</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    {sem}°
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Estudiantes</CardTitle>
          <CardDescription>{filteredStudents.length} estudiantes encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Experiencia</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Casos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.specialty}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{student.semester}°</Badge>
                  </TableCell>
                  <TableCell>{getExperienceBadge(student.experience)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getGPAColor(student.gpa)}`}>{student.gpa.toFixed(1)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.completedCases}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedStudent(student)
                        setIsViewDialogOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Información del Estudiante</DialogTitle>
            <DialogDescription>Detalles del estudiante</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedStudent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-2">INFORMACIÓN DE CONTACTO</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedStudent.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-2">INFORMACIÓN ACADÉMICA</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Semestre:</span>
                      <Badge variant="secondary">{selectedStudent.semester}°</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Experiencia:</span>
                      {getExperienceBadge(selectedStudent.experience)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">GPA:</span>
                      <span className={`font-bold ${getGPAColor(selectedStudent.gpa)}`}>
                        {selectedStudent.gpa.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Casos completados:</span>
                      <Badge variant="outline">{selectedStudent.completedCases}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fecha de inscripción:</span>
                      <span className="text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(selectedStudent.enrollmentDate).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
