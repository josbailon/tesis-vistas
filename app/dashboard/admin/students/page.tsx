"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Search, Edit, Trash2, Eye, UserPlus, Download, GraduationCap, Mail, Phone, Star } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  cedula: string
  specialty: string
  semester: number
  experience: "Básico" | "Intermedio" | "Avanzado"
  status: "active" | "inactive"
  gpa: number
  completedCases: number
  createdAt: string
  address: string
  emergencyContact: string
  emergencyPhone: string
}

export default function AdminStudentsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Juan Carlos Pérez Mendoza",
      email: "juan.perez@uleam.edu.ec",
      phone: "+593 99 111 2222",
      cedula: "1234567890",
      specialty: "Endodoncia",
      semester: 8,
      experience: "Avanzado",
      status: "active",
      gpa: 8.5,
      completedCases: 25,
      createdAt: "2024-01-15T00:00:00Z",
      address: "Av. Universitaria 123, Manta",
      emergencyContact: "María Pérez",
      emergencyPhone: "+593 99 111 0000",
    },
    {
      id: "2",
      name: "Ana María López Silva",
      email: "ana.lopez@uleam.edu.ec",
      phone: "+593 99 222 3333",
      cedula: "2345678901",
      specialty: "Ortodoncia",
      semester: 7,
      experience: "Intermedio",
      status: "active",
      gpa: 9.2,
      completedCases: 18,
      createdAt: "2024-02-01T00:00:00Z",
      address: "Calle 24 de Mayo 456, Manta",
      emergencyContact: "Carlos López",
      emergencyPhone: "+593 99 222 0000",
    },
    {
      id: "3",
      name: "Pedro Antonio Silva Castro",
      email: "pedro.silva@uleam.edu.ec",
      phone: "+593 99 333 4444",
      cedula: "3456789012",
      specialty: "Cirugía Oral y Maxilofacial",
      semester: 9,
      experience: "Avanzado",
      status: "active",
      gpa: 8.8,
      completedCases: 32,
      createdAt: "2024-01-20T00:00:00Z",
      address: "Barrio Los Almendros, Manta",
      emergencyContact: "Rosa Castro",
      emergencyPhone: "+593 99 333 0000",
    },
    {
      id: "4",
      name: "Carmen Elena Torres Vera",
      email: "carmen.torres@uleam.edu.ec",
      phone: "+593 99 444 5555",
      cedula: "4567890123",
      specialty: "Periodoncia",
      semester: 6,
      experience: "Intermedio",
      status: "active",
      gpa: 8.1,
      completedCases: 12,
      createdAt: "2024-02-15T00:00:00Z",
      address: "Ciudadela El Palmar, Manta",
      emergencyContact: "Luis Torres",
      emergencyPhone: "+593 99 444 0000",
    },
    {
      id: "5",
      name: "Luis Fernando Morales Ponce",
      email: "luis.morales@uleam.edu.ec",
      phone: "+593 99 555 6666",
      cedula: "5678901234",
      specialty: "Odontopediatría",
      semester: 5,
      experience: "Básico",
      status: "active",
      gpa: 7.8,
      completedCases: 8,
      createdAt: "2024-03-01T00:00:00Z",
      address: "Av. Flavio Reyes 789, Manta",
      emergencyContact: "Ana Morales",
      emergencyPhone: "+593 99 555 0000",
    },
    {
      id: "6",
      name: "María José Herrera Alava",
      email: "maria.herrera@uleam.edu.ec",
      phone: "+593 99 666 7777",
      cedula: "6789012345",
      specialty: "Endodoncia",
      semester: 8,
      experience: "Avanzado",
      status: "active",
      gpa: 9.0,
      completedCases: 28,
      createdAt: "2024-01-10T00:00:00Z",
      address: "Barrio Jocay, Manta",
      emergencyContact: "José Herrera",
      emergencyPhone: "+593 99 666 0000",
    },
    {
      id: "7",
      name: "Roberto Carlos Díaz López",
      email: "roberto.diaz@uleam.edu.ec",
      phone: "+593 99 777 8888",
      cedula: "7890123456",
      specialty: "Ortodoncia",
      semester: 7,
      experience: "Intermedio",
      status: "active",
      gpa: 8.3,
      completedCases: 20,
      createdAt: "2024-02-20T00:00:00Z",
      address: "Ciudadela Miraflores, Manta",
      emergencyContact: "Elena Díaz",
      emergencyPhone: "+593 99 777 0000",
    },
    {
      id: "8",
      name: "Laura Patricia Rodríguez Mora",
      email: "laura.rodriguez@uleam.edu.ec",
      phone: "+593 99 888 9999",
      cedula: "8901234567",
      specialty: "Prostodoncia",
      semester: 9,
      experience: "Avanzado",
      status: "active",
      gpa: 9.1,
      completedCases: 30,
      createdAt: "2024-01-05T00:00:00Z",
      address: "Av. 4 de Noviembre, Manta",
      emergencyContact: "Patricia Mora",
      emergencyPhone: "+593 99 888 0000",
    },
  ])

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    cedula: "",
    specialty: "",
    semester: "",
    experience: "Básico",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

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
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.cedula.includes(searchTerm)
    const matchesSpecialty = specialtyFilter === "all" || student.specialty === specialtyFilter
    const matchesSemester = semesterFilter === "all" || student.semester.toString() === semesterFilter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesSpecialty && matchesSemester && matchesStatus
  })

  const getExperienceBadge = (experience: string) => {
    const colors = {
      Básico: "bg-yellow-100 text-yellow-800",
      Intermedio: "bg-blue-100 text-blue-800",
      Avanzado: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[experience as keyof typeof colors]}>{experience}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge className={status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
        {status === "active" ? "Activo" : "Inactivo"}
      </Badge>
    )
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 9) return "text-green-600"
    if (gpa >= 8) return "text-blue-600"
    if (gpa >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  const handleCreateStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.cedula || !newStudent.specialty || !newStudent.semester) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    const student: Student = {
      id: Date.now().toString(),
      name: newStudent.name,
      email: newStudent.email,
      phone: newStudent.phone,
      cedula: newStudent.cedula,
      specialty: newStudent.specialty,
      semester: Number.parseInt(newStudent.semester),
      experience: newStudent.experience as Student["experience"],
      status: "active",
      gpa: 0,
      completedCases: 0,
      createdAt: new Date().toISOString(),
      address: newStudent.address,
      emergencyContact: newStudent.emergencyContact,
      emergencyPhone: newStudent.emergencyPhone,
    }

    setStudents((prev) => [...prev, student])
    setIsCreateDialogOpen(false)
    setNewStudent({
      name: "",
      email: "",
      phone: "",
      cedula: "",
      specialty: "",
      semester: "",
      experience: "Básico",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
    })

    toast({
      title: "Estudiante creado",
      description: `${student.name} ha sido registrado exitosamente`,
    })
  }

  const handleEditStudent = () => {
    if (!selectedStudent) return

    setStudents((prev) => prev.map((student) => (student.id === selectedStudent.id ? { ...selectedStudent } : student)))
    setIsEditDialogOpen(false)

    toast({
      title: "Estudiante actualizado",
      description: `${selectedStudent.name} ha sido actualizado exitosamente`,
    })
  }

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    setStudents((prev) => prev.filter((s) => s.id !== studentId))

    toast({
      title: "Estudiante eliminado",
      description: `${student?.name} ha sido eliminado del sistema`,
    })
  }

  const handleToggleStatus = (studentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    setStudents((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, status: newStatus } : student)),
    )

    const student = students.find((s) => s.id === studentId)
    toast({
      title: "Estado actualizado",
      description: `${student?.name} ahora está ${newStatus === "active" ? "activo" : "inactivo"}`,
    })
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(students, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "estudiantes.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Exportación completada",
      description: "Los datos de estudiantes han sido exportados exitosamente",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Estudiantes</h1>
          <p className="text-muted-foreground">Administra todos los estudiantes del programa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Estudiante
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Estudiante</DialogTitle>
                <DialogDescription>Completa la información del nuevo estudiante</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre Completo *</Label>
                    <Input
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="Nombre y apellidos"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      placeholder="estudiante@uleam.edu.ec"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cédula *</Label>
                    <Input
                      value={newStudent.cedula}
                      onChange={(e) => setNewStudent({ ...newStudent, cedula: e.target.value })}
                      placeholder="1234567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      placeholder="+593 99 123 4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Especialidad *</Label>
                    <Select
                      value={newStudent.specialty}
                      onValueChange={(value) => setNewStudent({ ...newStudent, specialty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Semestre *</Label>
                    <Select
                      value={newStudent.semester}
                      onValueChange={(value) => setNewStudent({ ...newStudent, semester: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar semestre" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            {sem}° Semestre
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nivel de Experiencia</Label>
                    <Select
                      value={newStudent.experience}
                      onValueChange={(value) => setNewStudent({ ...newStudent, experience: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Básico">Básico</SelectItem>
                        <SelectItem value="Intermedio">Intermedio</SelectItem>
                        <SelectItem value="Avanzado">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dirección</Label>
                    <Input
                      value={newStudent.address}
                      onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                      placeholder="Dirección completa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contacto de Emergencia</Label>
                    <Input
                      value={newStudent.emergencyContact}
                      onChange={(e) => setNewStudent({ ...newStudent, emergencyContact: e.target.value })}
                      placeholder="Nombre del contacto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono de Emergencia</Label>
                    <Input
                      value={newStudent.emergencyPhone}
                      onChange={(e) => setNewStudent({ ...newStudent, emergencyPhone: e.target.value })}
                      placeholder="+593 99 123 4567"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateStudent}>Registrar Estudiante</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">En estado activo</p>
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
            <Star className="h-4 w-4 text-muted-foreground" />
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
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Busca y filtra estudiantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre, email o cédula..."
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
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
                <TableHead>Estado</TableHead>
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
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {student.phone}
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
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedStudent(student)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar estudiante?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción eliminará permanentemente el estudiante {student.name} y todos sus datos
                              asociados. Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteStudent(student.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Información del Estudiante</DialogTitle>
            <DialogDescription>Detalles completos del estudiante</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Información Personal</Label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-sm font-medium">Nombre:</span>
                        <p className="text-sm">{selectedStudent.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Cédula:</span>
                        <p className="text-sm">{selectedStudent.cedula}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Email:</span>
                        <p className="text-sm">{selectedStudent.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Teléfono:</span>
                        <p className="text-sm">{selectedStudent.phone}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Dirección:</span>
                        <p className="text-sm">{selectedStudent.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Información Académica</Label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-sm font-medium">Especialidad:</span>
                        <p className="text-sm">{selectedStudent.specialty}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Semestre:</span>
                        <p className="text-sm">{selectedStudent.semester}°</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Experiencia:</span>
                        {getExperienceBadge(selectedStudent.experience)}
                      </div>
                      <div>
                        <span className="text-sm font-medium">GPA:</span>
                        <p className={`text-sm font-medium ${getGPAColor(selectedStudent.gpa)}`}>
                          {selectedStudent.gpa.toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Casos Completados:</span>
                        <p className="text-sm">{selectedStudent.completedCases}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Estado:</span>
                        {getStatusBadge(selectedStudent.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Contacto de Emergencia</Label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium">Nombre:</span>
                    <p className="text-sm">{selectedStudent.emergencyContact}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Teléfono:</span>
                    <p className="text-sm">{selectedStudent.emergencyPhone}</p>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Fecha de Registro:</span>
                <p className="text-sm">{new Date(selectedStudent.createdAt).toLocaleDateString("es-ES")}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Estudiante</DialogTitle>
            <DialogDescription>Modifica la información del estudiante</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input
                    value={selectedStudent.name}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={selectedStudent.email}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input
                    value={selectedStudent.phone}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Especialidad</Label>
                  <Select
                    value={selectedStudent.specialty}
                    onValueChange={(value) => setSelectedStudent({ ...selectedStudent, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Semestre</Label>
                  <Select
                    value={selectedStudent.semester.toString()}
                    onValueChange={(value) =>
                      setSelectedStudent({ ...selectedStudent, semester: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          {sem}° Semestre
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Experiencia</Label>
                  <Select
                    value={selectedStudent.experience}
                    onValueChange={(value) =>
                      setSelectedStudent({ ...selectedStudent, experience: value as Student["experience"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={selectedStudent.status}
                    onValueChange={(value) =>
                      setSelectedStudent({ ...selectedStudent, status: value as "active" | "inactive" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dirección</Label>
                  <Input
                    value={selectedStudent.address}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditStudent}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
