"use client"

import { useState } from "react"
import { Search, Edit, CheckCircle, XCircle, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para los usuarios
const users = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@ejemplo.com",
    role: "patient",
    status: "active",
    createdAt: "10/01/2025",
  },
  {
    id: 2,
    name: "Carlos López",
    email: "carlos.lopez@ejemplo.com",
    role: "student",
    status: "active",
    createdAt: "15/01/2025",
  },
  {
    id: 3,
    name: "Dr. Martínez",
    email: "dr.martinez@ejemplo.com",
    role: "professor",
    status: "active",
    createdAt: "05/01/2025",
  },
  {
    id: 4,
    name: "María Fernández",
    email: "maria.fernandez@ejemplo.com",
    role: "patient",
    status: "pending",
    createdAt: "20/05/2025",
  },
  {
    id: 5,
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    role: "student",
    status: "pending",
    createdAt: "19/05/2025",
  },
  {
    id: 6,
    name: "Dra. Rodríguez",
    email: "dra.rodriguez@ejemplo.com",
    role: "professor",
    status: "pending",
    createdAt: "18/05/2025",
  },
]

export default function UsersPage() {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filtrar usuarios según los criterios de búsqueda y filtros
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Separar usuarios activos y pendientes para las pestañas
  const activeUsers = filteredUsers.filter((user) => user.status === "active")
  const pendingUsers = filteredUsers.filter((user) => user.status === "pending")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">Administra los usuarios del sistema</p>
        </div>
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Usuario</DialogTitle>
              <DialogDescription>Completa los detalles para crear un nuevo usuario en el sistema</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-name" className="text-right">
                  Nombre
                </Label>
                <Input id="user-name" placeholder="Nombre completo" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-email" className="text-right">
                  Email
                </Label>
                <Input id="user-email" type="email" placeholder="correo@ejemplo.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-role" className="text-right">
                  Rol
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger id="user-role">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Paciente</SelectItem>
                      <SelectItem value="student">Estudiante</SelectItem>
                      <SelectItem value="professor">Profesor</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-password" className="text-right">
                  Contraseña
                </Label>
                <Input id="user-password" type="password" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-confirm-password" className="text-right">
                  Confirmar
                </Label>
                <Input id="user-confirm-password" type="password" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddUserDialogOpen(false)}>
                Crear Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px]"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="role-filter" className="text-sm">
              Rol:
            </Label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger id="role-filter" className="w-[150px]">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="patient">Pacientes</SelectItem>
                <SelectItem value="student">Estudiantes</SelectItem>
                <SelectItem value="professor">Profesores</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="status-filter" className="text-sm">
              Estado:
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-[150px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Usuarios Activos</TabsTrigger>
          <TabsTrigger value="pending">Solicitudes Pendientes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Usuarios Activos</CardTitle>
              <CardDescription>Lista de usuarios activos en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "professor"
                                ? "bg-blue-100 text-blue-800"
                                : user.role === "student"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role === "admin"
                            ? "Administrador"
                            : user.role === "professor"
                              ? "Profesor"
                              : user.role === "student"
                                ? "Estudiante"
                                : "Paciente"}
                        </span>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Abrir menú</span>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Editar Usuario</DropdownMenuItem>
                            <DropdownMenuItem>Cambiar Contraseña</DropdownMenuItem>
                            <DropdownMenuItem>Cambiar Rol</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Desactivar Usuario</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Solicitudes Pendientes</CardTitle>
              <CardDescription>Solicitudes de registro pendientes de aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Fecha de Solicitud</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "professor"
                                ? "bg-blue-100 text-blue-800"
                                : user.role === "student"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role === "admin"
                            ? "Administrador"
                            : user.role === "professor"
                              ? "Profesor"
                              : user.role === "student"
                                ? "Estudiante"
                                : "Paciente"}
                        </span>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Aprobar</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Rechazar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
