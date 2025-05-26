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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  UserPlus,
  Search,
  Edit,
  Trash2,
  Shield,
  Mail,
  Calendar,
  Download,
  Upload,
  Eye,
  Lock,
  Unlock,
} from "lucide-react"

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)

  const users = [
    {
      id: "1",
      name: "Dr. Ana García",
      email: "ana.garcia@uleam.edu.ec",
      role: "professor",
      specialty: "Endodoncia",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      createdAt: "2023-08-15",
      permissions: ["manage_students", "approve_treatments", "create_assignments"],
    },
    {
      id: "2",
      name: "Carlos López",
      email: "carlos.lopez@uleam.edu.ec",
      role: "student",
      specialty: "Ortodoncia",
      status: "active",
      lastLogin: "2024-01-15 14:20",
      createdAt: "2023-09-01",
      permissions: ["view_patients", "create_cases", "submit_assignments"],
    },
    {
      id: "3",
      name: "María Rodríguez",
      email: "maria.rodriguez@gmail.com",
      role: "patient",
      specialty: null,
      status: "active",
      lastLogin: "2024-01-14 16:45",
      createdAt: "2023-10-20",
      permissions: ["view_appointments", "view_records"],
    },
    {
      id: "4",
      name: "Dr. Roberto Silva",
      email: "roberto.silva@uleam.edu.ec",
      role: "professor",
      specialty: "Cirugía Oral",
      status: "inactive",
      lastLogin: "2024-01-10 11:15",
      createdAt: "2023-07-01",
      permissions: ["manage_students", "approve_surgeries", "create_assignments"],
    },
  ]

  const roleColors = {
    admin: "bg-red-100 text-red-800",
    professor: "bg-purple-100 text-purple-800",
    student: "bg-blue-100 text-blue-800",
    patient: "bg-green-100 text-green-800",
  }

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    suspended: "bg-red-100 text-red-800",
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">Administra usuarios, roles y permisos del sistema</p>
        </div>
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Crear Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>Completa la información para crear un nuevo usuario en el sistema</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ej: Dr. Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="usuario@uleam.edu.ec" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="professor">Profesor</SelectItem>
                      <SelectItem value="student">Estudiante</SelectItem>
                      <SelectItem value="patient">Paciente</SelectItem>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="0999-123-456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identification">Cédula/ID</Label>
                  <Input id="identification" placeholder="1234567890" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea id="notes" placeholder="Información adicional sobre el usuario..." />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="send-welcome" />
                <Label htmlFor="send-welcome">Enviar correo de bienvenida</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateUserOpen(false)}>Crear Usuario</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
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
                  placeholder="Buscar por nombre o correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="professor">Profesor</SelectItem>
                <SelectItem value="student">Estudiante</SelectItem>
                <SelectItem value="patient">Paciente</SelectItem>
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios ({filteredUsers.length})</CardTitle>
          <CardDescription>Gestiona todos los usuarios registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-green-600 text-white text-sm font-medium">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                      {user.role === "professor"
                        ? "Profesor"
                        : user.role === "student"
                          ? "Estudiante"
                          : user.role === "patient"
                            ? "Paciente"
                            : "Admin"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.specialty ? (
                      <Badge variant="outline">{user.specialty}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                      {user.status === "active" ? "Activo" : user.status === "inactive" ? "Inactivo" : "Suspendido"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        {user.status === "active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
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
          <CardDescription>Realiza operaciones en múltiples usuarios simultáneamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar Usuarios
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Notificación Masiva
            </Button>
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Actualizar Permisos
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Programar Mantenimiento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
