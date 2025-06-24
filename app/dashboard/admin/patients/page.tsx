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
import { UserPlus, Search, Edit, Trash2, Eye, Download, Upload, Mail, Calendar } from "lucide-react"

export default function AdminPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")
  const [isCreatePatientOpen, setIsCreatePatientOpen] = useState(false)

  const patients = [
    {
      id: "1",
      name: "Ana López García",
      email: "ana.lopez@gmail.com",
      phone: "0999-555-111",
      patientId: "PAT001",
      age: 28,
      gender: "Femenino",
      status: "active",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-25",
      assignedStudent: "Carlos López",
      treatments: 3,
      registrationDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Roberto Silva Mendoza",
      email: "roberto.silva@hotmail.com",
      phone: "0998-666-222",
      patientId: "PAT002",
      age: 45,
      gender: "Masculino",
      status: "active",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-30",
      assignedStudent: "María Fernández",
      treatments: 5,
      registrationDate: "2023-03-20",
    },
    {
      id: "3",
      name: "Carmen Vega Torres",
      email: "carmen.vega@yahoo.com",
      phone: "0997-777-333",
      patientId: "PAT003",
      age: 35,
      gender: "Femenino",
      status: "completed",
      lastVisit: "2023-12-20",
      nextAppointment: null,
      assignedStudent: "Juan Pérez",
      treatments: 2,
      registrationDate: "2023-08-10",
    },
  ]

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus
    const matchesAge =
      selectedAge === "all" ||
      (selectedAge === "young" && patient.age < 30) ||
      (selectedAge === "adult" && patient.age >= 30 && patient.age < 60) ||
      (selectedAge === "senior" && patient.age >= 60)
    return matchesSearch && matchesStatus && matchesAge
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Pacientes</h1>
          <p className="text-muted-foreground">CRUD completo para administrar pacientes</p>
        </div>
        <Dialog open={isCreatePatientOpen} onOpenChange={setIsCreatePatientOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Crear Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Paciente</DialogTitle>
              <DialogDescription>Completa la información para registrar un nuevo paciente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: Ana López García" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="paciente@gmail.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="0999-123-456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientId">ID Paciente</Label>
                  <Input id="patientId" placeholder="PAT004" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Edad</Label>
                  <Input id="age" type="number" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedStudent">Estudiante Asignado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                      <SelectItem value="maria">María Fernández</SelectItem>
                      <SelectItem value="juan">Juan Pérez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Historia Médica</Label>
                <Textarea id="medicalHistory" placeholder="Antecedentes médicos relevantes..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea id="notes" placeholder="Información adicional sobre el paciente..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreatePatientOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreatePatientOpen(false)}>Crear Paciente</Button>
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por edad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las edades</SelectItem>
                <SelectItem value="young">Jóvenes (&lt;30)</SelectItem>
                <SelectItem value="adult">Adultos (30-59)</SelectItem>
                <SelectItem value="senior">Mayores (60+)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes ({filteredPatients.length})</CardTitle>
          <CardDescription>Gestiona todos los pacientes registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Edad/Género</TableHead>
                <TableHead>Estudiante Asignado</TableHead>
                <TableHead>Última Visita</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-blue-600 text-white text-sm font-medium">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">{patient.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.patientId}</TableCell>
                  <TableCell>
                    {patient.age} años
                    <br />
                    <span className="text-sm text-muted-foreground">{patient.gender}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.assignedStudent}</Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[patient.status as keyof typeof statusColors]}>
                      {patient.status === "active"
                        ? "Activo"
                        : patient.status === "inactive"
                          ? "Inactivo"
                          : patient.status === "completed"
                            ? "Completado"
                            : "Cancelado"}
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
          <CardDescription>Realiza operaciones en múltiples pacientes simultáneamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar Pacientes
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Recordatorios
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Programar Citas Masivas
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
