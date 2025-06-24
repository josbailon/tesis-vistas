"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Search, Edit, Trash2, Eye, Download, Upload, GraduationCap, Mail } from "lucide-react"

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false)

  const students = [
    {
      id: "1",
      name: "Carlos López Mendoza",
      email: "carlos.lopez@uleam.edu.ec",
      phone: "0999-123-456",
      studentId: "E2021001",
      semester: 8,
      specialty: "Endodoncia",
      status: "active",
      gpa: 8.5,
      credits: 180,
      totalCredits: 200,
      attendance: 95,
      enrollmentDate: "2021-03-15",
    },
    {
      id: "2",
      name: "María Fernández Torres",
      email: "maria.fernandez@uleam.edu.ec",
      phone: "0998-234-567",
      studentId: "E2020002",
      semester: 9,
      specialty: "Ortodoncia",
      status: "active",
      gpa: 9.2,
      credits: 190,
      totalCredits: 200,
      attendance: 98,
      enrollmentDate: "2020-09-01",
    },
    {
      id: "3",
      name: "Juan Pérez Silva",
      email: "juan.perez@uleam.edu.ec",
      phone: "0997-345-678",
      studentId: "E2019003",
      semester: 10,
      specialty: "Cirugía Oral",
      status: "graduated",
      gpa: 8.8,
      credits: 200,
      totalCredits: 200,
      attendance: 92,
      enrollmentDate: "2019-03-15",
    },
  ]

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    graduated: "bg-blue-100 text-blue-800",
    suspended: "bg-red-100 text-red-800",
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = selectedSemester === "all" || student.semester.toString() === selectedSemester
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus
    return matchesSearch && matchesSemester && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Estudiantes</h1>
          <p className="text-muted-foreground">CRUD completo para administrar estudiantes</p>
        </div>
        <Dialog open={isCreateStudentOpen} onOpenChange={setIsCreateStudentOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Crear Estudiante
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Estudiante</DialogTitle>
              <DialogDescription>Completa la información para registrar un nuevo estudiante</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: Carlos López Mendoza" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="estudiante@uleam.edu.ec" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="0999-123-456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">ID Estudiante</Label>
                  <Input id="studentId" placeholder="E2024001" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semestre</Label>
                  <Select>
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
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="endodoncia">Endodoncia</SelectItem>
                      <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                      <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                      <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                      <SelectItem value="periodoncia">Periodoncia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea id="notes" placeholder="Información adicional sobre el estudiante..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateStudentOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateStudentOpen(false)}>Crear Estudiante</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por semestre" />
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="graduated">Graduado</SelectItem>
                <SelectItem value="suspended">Suspendido</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Estudiantes ({filteredStudents.length})</CardTitle>
          <CardDescription>Gestiona todos los estudiantes registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-green-600 text-white text-sm font-medium">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.semester}°</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.specialty}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.gpa >= 8.5 ? "default" : student.gpa >= 7.0 ? "secondary" : "destructive"}>
                      {student.gpa}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[student.status as keyof typeof statusColors]}>
                      {student.status === "active"
                        ? "Activo"
                        : student.status === "inactive"
                          ? "Inactivo"
                          : student.status === "graduated"
                            ? "Graduado"
                            : "Suspendido"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Masivas</CardTitle>
          <CardDescription>Realiza operaciones en múltiples estudiantes simultáneamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar Estudiantes
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Notificación Masiva
            </Button>
            <Button variant="outline">
              <GraduationCap className="mr-2 h-4 w-4" />
              Promocionar Semestre
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Generar Reportes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
