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
import { UserPlus, Search, Edit, Trash2, Eye, Download, Upload, Mail, Award } from "lucide-react"

export default function AdminProfessorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateProfessorOpen, setIsCreateProfessorOpen] = useState(false)

  const professors = [
    {
      id: "1",
      name: "Dra. María González Ruiz",
      email: "maria.gonzalez@uleam.edu.ec",
      phone: "0999-111-222",
      employeeId: "P001",
      specialty: "Endodoncia",
      status: "active",
      experience: 15,
      students: 12,
      degree: "PhD en Odontología",
      hireDate: "2010-03-15",
      schedule: "Lun-Vie 8:00-16:00",
    },
    {
      id: "2",
      name: "Dr. Carlos Ruiz Mendoza",
      email: "carlos.ruiz@uleam.edu.ec",
      phone: "0998-222-333",
      employeeId: "P002",
      specialty: "Ortodoncia",
      status: "active",
      experience: 12,
      students: 15,
      degree: "Especialista en Ortodoncia",
      hireDate: "2012-09-01",
      schedule: "Lun-Vie 9:00-17:00",
    },
    {
      id: "3",
      name: "Dra. Laura Martín Silva",
      email: "laura.martin@uleam.edu.ec",
      phone: "0997-333-444",
      employeeId: "P003",
      specialty: "Cirugía Oral",
      status: "sabbatical",
      experience: 20,
      students: 8,
      degree: "PhD en Cirugía Maxilofacial",
      hireDate: "2005-01-10",
      schedule: "Lun-Jue 8:00-15:00",
    },
  ]

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    sabbatical: "bg-blue-100 text-blue-800",
    retired: "bg-purple-100 text-purple-800",
  }

  const filteredProfessors = professors.filter((professor) => {
    const matchesSearch =
      professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "all" || professor.specialty === selectedSpecialty
    const matchesStatus = selectedStatus === "all" || professor.status === selectedStatus
    return matchesSearch && matchesSpecialty && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Profesores</h1>
          <p className="text-muted-foreground">CRUD completo para administrar profesores</p>
        </div>
        <Dialog open={isCreateProfessorOpen} onOpenChange={setIsCreateProfessorOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Crear Profesor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Profesor</DialogTitle>
              <DialogDescription>Completa la información para registrar un nuevo profesor</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: Dr. Juan Pérez López" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="profesor@uleam.edu.ec" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="0999-123-456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">ID Empleado</Label>
                  <Input id="employeeId" placeholder="P004" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="degree">Título/Grado</Label>
                  <Input id="degree" placeholder="PhD en Odontología" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Años de Experiencia</Label>
                  <Input id="experience" type="number" placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Horario</Label>
                  <Input id="schedule" placeholder="Lun-Vie 8:00-16:00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea id="notes" placeholder="Información adicional sobre el profesor..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateProfessorOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateProfessorOpen(false)}>Crear Profesor</Button>
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
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
                <SelectItem value="Periodoncia">Periodoncia</SelectItem>
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
                <SelectItem value="sabbatical">Sabático</SelectItem>
                <SelectItem value="retired">Jubilado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Professors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Profesores ({filteredProfessors.length})</CardTitle>
          <CardDescription>Gestiona todos los profesores registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profesor</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Experiencia</TableHead>
                <TableHead>Estudiantes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfessors.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-medium">
                        {professor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{professor.name}</div>
                        <div className="text-sm text-muted-foreground">{professor.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{professor.employeeId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{professor.specialty}</Badge>
                  </TableCell>
                  <TableCell>{professor.experience} años</TableCell>
                  <TableCell>{professor.students}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[professor.status as keyof typeof statusColors]}>
                      {professor.status === "active"
                        ? "Activo"
                        : professor.status === "inactive"
                          ? "Inactivo"
                          : professor.status === "sabbatical"
                            ? "Sabático"
                            : "Jubilado"}
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
          <CardDescription>Realiza operaciones en múltiples profesores simultáneamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar Profesores
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Notificación Masiva
            </Button>
            <Button variant="outline">
              <Award className="mr-2 h-4 w-4" />
              Asignar Reconocimientos
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
