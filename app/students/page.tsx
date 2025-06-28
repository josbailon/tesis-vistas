"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Star,
  Calendar,
  User,
  Filter,
  Users,
  TrendingUp,
} from "lucide-react"

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
  enrollmentDate: string
  profileImage?: string
  achievements: string[]
  interests: string[]
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")

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
      enrollmentDate: "2020-09-01",
      achievements: ["Mejor Promedio 2023", "Caso Clínico Destacado"],
      interests: ["Investigación", "Tecnología Dental", "Docencia"],
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
      enrollmentDate: "2021-03-01",
      achievements: ["Excelencia Académica", "Liderazgo Estudiantil"],
      interests: ["Ortodoncia Invisible", "Biomecánica", "Estética Dental"],
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
      enrollmentDate: "2019-09-01",
      achievements: ["Cirujano Destacado", "Investigación Clínica"],
      interests: ["Implantología", "Cirugía Reconstructiva", "Anestesiología"],
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
      enrollmentDate: "2022-03-01",
      achievements: ["Mejor Trabajo de Investigación"],
      interests: ["Regeneración Periodontal", "Microbiología", "Prevención"],
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
      enrollmentDate: "2022-09-01",
      achievements: ["Mejor Trato con Pacientes Pediátricos"],
      interests: ["Psicología Infantil", "Sedación Consciente", "Prevención"],
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
      enrollmentDate: "2020-09-01",
      achievements: ["Endodoncista del Año", "Técnica Innovadora"],
      interests: ["Endodoncia Regenerativa", "Microscopía", "Biomateriales"],
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
      enrollmentDate: "2021-03-01",
      achievements: ["Mejor Caso de Ortodoncia Interceptiva"],
      interests: ["Ortodoncia Digital", "Cefalometría", "Aparatología"],
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
      enrollmentDate: "2019-09-01",
      achievements: ["Mejor Rehabilitación Protésica", "Innovación en Materiales"],
      interests: ["Prótesis Digitales", "CAD/CAM", "Estética Avanzada"],
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
      enrollmentDate: "2022-03-01",
      achievements: ["Mejor Sonrisa Diseñada"],
      interests: ["Carillas de Porcelana", "Blanqueamiento", "Fotografía Dental"],
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
      enrollmentDate: "2019-03-01",
      achievements: ["Implantóloga Destacada", "Mejor Tesis de Grado", "Liderazgo Académico"],
      interests: ["Implantes Inmediatos", "Regeneración Ósea", "Cirugía Guiada"],
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
      student.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = specialtyFilter === "all" || student.specialty === specialtyFilter
    const matchesSemester = semesterFilter === "all" || student.semester.toString() === semesterFilter
    const matchesExperience = experienceFilter === "all" || student.experience === experienceFilter

    return matchesSearch && matchesSpecialty && matchesSemester && matchesExperience
  })

  const getExperienceBadge = (experience: string) => {
    const colors = {
      Básico: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Intermedio: "bg-blue-100 text-blue-800 border-blue-300",
      Avanzado: "bg-green-100 text-green-800 border-green-300",
    }
    return <Badge className={colors[experience as keyof typeof colors]}>{experience}</Badge>
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 9) return "text-green-600"
    if (gpa >= 8) return "text-blue-600"
    if (gpa >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  const getSpecialtyStats = () => {
    const stats = specialties.map((specialty) => ({
      name: specialty,
      count: students.filter((s) => s.specialty === specialty).length,
      avgGPA:
        students.filter((s) => s.specialty === specialty).reduce((acc, s) => acc + s.gpa, 0) /
          students.filter((s) => s.specialty === specialty).length || 0,
    }))
    return stats.sort((a, b) => b.count - a.count)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Estudiantes de Odontología
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conoce a nuestros talentosos estudiantes de la Facultad de Odontología de ULEAM. Futuros profesionales
            comprometidos con la excelencia en salud oral.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Estudiantes</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{students.length}</div>
              <p className="text-xs text-blue-700">Registrados actualmente</p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Especialidades</CardTitle>
              <BookOpen className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{specialties.length}</div>
              <p className="text-xs text-green-700">Áreas de especialización</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">Promedio GPA</CardTitle>
              <Star className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {(students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(1)}
              </div>
              <p className="text-xs text-purple-700">Excelencia académica</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Casos Completados</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {students.reduce((acc, s) => acc + s.completedCases, 0)}
              </div>
              <p className="text-xs text-orange-700">Experiencia práctica</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Búsqueda
            </CardTitle>
            <CardDescription>Encuentra estudiantes por especialidad, semestre o nivel de experiencia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Nombre, especialidad o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Especialidad</label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las especialidades" />
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Semestre</label>
                <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los semestres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los semestres</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        {sem}° Semestre
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Experiencia</label>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los niveles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    <SelectItem value="Básico">Básico</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specialty Statistics */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Estadísticas por Especialidad
            </CardTitle>
            <CardDescription>Distribución de estudiantes y rendimiento académico por especialidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {getSpecialtyStats().map((stat) => (
                <div key={stat.name} className="p-4 border rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                  <h3 className="font-medium text-sm text-gray-900 mb-2">{stat.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{stat.count}</p>
                      <p className="text-xs text-gray-600">estudiantes</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${getGPAColor(stat.avgGPA)}`}>{stat.avgGPA.toFixed(1)}</p>
                      <p className="text-xs text-gray-600">GPA promedio</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Estudiantes Encontrados ({filteredStudents.length})</h2>
            <Badge variant="outline" className="text-sm">
              {filteredStudents.length} de {students.length} estudiantes
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {getInitials(student.name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{student.name}</h3>
                        {getExperienceBadge(student.experience)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{student.specialty}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <GraduationCap className="h-3 w-3" />
                        <span>{student.semester}° Semestre</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Academic Performance */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold ${getGPAColor(student.gpa)}`}>{student.gpa.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">GPA</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{student.completedCases}</div>
                      <div className="text-xs text-muted-foreground">Casos</div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>Ingreso: {new Date(student.enrollmentDate).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  {student.achievements.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Logros
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {student.achievements.slice(0, 2).map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                        {student.achievements.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.achievements.length - 2} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  {student.interests.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Intereses</h4>
                      <div className="flex flex-wrap gap-1">
                        {student.interests.slice(0, 3).map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Button */}
                  <Button className="w-full bg-transparent" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contactar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">No se encontraron estudiantes</h3>
                    <p className="text-muted-foreground">
                      Intenta ajustar los filtros de búsqueda para encontrar estudiantes.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSpecialtyFilter("all")
                      setSemesterFilter("all")
                      setExperienceFilter("all")
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">¿Interesado en Estudiar Odontología?</h2>
            <p className="text-xl mb-6 opacity-90">
              Únete a nuestra comunidad de futuros profesionales de la salud oral
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <User className="mr-2 h-5 w-5" />
                Información de Admisiones
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Visitar Campus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
