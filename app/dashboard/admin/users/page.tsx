"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Edit, Trash2, Download, Upload, Mail, Phone, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "profesor" | "estudiante" | "paciente" | "secretario"
  specialty?: string
  phone?: string
  cedula?: string
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

const MOCK_USERS: AdminUser[] = [
  {
    id: "1",
    name: "Dr. Carlos Administrador",
    email: "admin@uleam.edu.ec",
    role: "admin",
    phone: "+593 99 123 4567",
    cedula: "1234567890",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-12-28T10:00:00Z",
  },
  {
    id: "2",
    name: "Dr. Carlos Ruiz",
    email: "carlos.ruiz@uleam.edu.ec",
    role: "profesor",
    specialty: "Endodoncia",
    phone: "+593 99 234 5678",
    cedula: "2345678901",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    lastLogin: "2024-12-27T15:30:00Z",
  },
  {
    id: "3",
    name: "Juan Pérez",
    email: "juan.perez@uleam.edu.ec",
    role: "estudiante",
    phone: "+593 99 345 6789",
    cedula: "3456789012",
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z",
    lastLogin: "2024-12-28T08:45:00Z",
  },
  {
    id: "4",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@gmail.com",
    role: "paciente",
    phone: "+593 99 456 7890",
    cedula: "4567890123",
    isActive: true,
    createdAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "5",
    name: "María Secretaria",
    email: "secretaria@uleam.edu.ec",
    role: "secretario",
    phone: "+593 99 567 8901",
    cedula: "5678901234",
    isActive: true,
    createdAt: "2024-03-01T00:00:00Z",
    lastLogin: "2024-12-28T09:15:00Z",
  },
]

const ROLES = [
  { value: "admin", label: "Administrador" },
  { value: "profesor", label: "Profesor" },
  { value: "estudiante", label: "Estudiante" },
  { value: "paciente", label: "Paciente" },
  { value: "secretario", label: "Secretario" },
]

const SPECIALTIES = ["Endodoncia", "Ortodoncia", "Periodoncia", "Cirugía", "Prótesis", "Pediatría", "Implantología"]

const roleColors = {
  admin: "bg-red-100 text-red-800",
  profesor: "bg-blue-100 text-blue-800",
  estudiante: "bg-green-100 text-green-800",
  paciente: "bg-purple-100 text-purple-800",
  secretario: "bg-orange-100 text-orange-800",
}

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "estudiante" as AdminUser["role"],
    specialty: "",
    phone: "",
    cedula: "",
    isActive: true,
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cedula?.includes(searchTerm) ||
      user.phone?.includes(searchTerm)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive)

    return matchesSearch && matchesRole && matchesStatus
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "estudiante",
      specialty: "",
      phone: "",
      cedula: "",
      isActive: true,
    })
    setEditingUser(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.cedula) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    // Check for duplicate email or cedula
    const existingUser = users.find(
      (user) => (user.email === formData.email || user.cedula === formData.cedula) && user.id !== editingUser?.id,
    )

    if (existingUser) {
      toast({
        title: "Error",
        description: "Ya existe un usuario con ese email o cédula",
        variant: "destructive",
      })
      return
    }

    if (editingUser) {
      // Update existing user
      setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user)))
      toast({
        title: "Usuario actualizado",
        description: "La información del usuario ha sido actualizada",
      })
    } else {
      // Create new user
      const newUser: AdminUser = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      }
      setUsers((prev) => [...prev, newUser])
      toast({
        title: "Usuario creado",
        description: "El nuevo usuario ha sido creado exitosamente",
      })
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty || "",
      phone: user.phone || "",
      cedula: user.cedula || "",
      isActive: user.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado del sistema",
    })
  }

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)))
    toast({
      title: "Estado actualizado",
      description: "El estado del usuario ha sido actualizado",
    })
  }

  const handleExportUsers = () => {
    const csvContent = [
      ["Nombre", "Email", "Rol", "Especialidad", "Teléfono", "Cédula", "Estado", "Fecha Creación"],
      ...filteredUsers.map((user) => [
        user.name,
        user.email,
        user.role,
        user.specialty || "",
        user.phone || "",
        user.cedula || "",
        user.isActive ? "Activo" : "Inactivo",
        new Date(user.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "usuarios.csv"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Exportación completada",
      description: "Los usuarios han sido exportados a CSV",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra todos los usuarios del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
                <DialogDescription>
                  {editingUser ? "Actualiza la información del usuario" : "Crea un nuevo usuario en el sistema"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre completo del usuario"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="usuario@uleam.edu.ec"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: AdminUser["role"]) => setFormData((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.role === "profesor" && (
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidad</Label>
                      <Select
                        value={formData.specialty}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, specialty: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIALTIES.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Cédula *</Label>
                    <Input
                      id="cedula"
                      value={formData.cedula}
                      onChange={(e) => setFormData((prev) => ({ ...prev, cedula: e.target.value }))}
                      placeholder="1234567890"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+593 99 123 4567"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Usuario activo</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingUser ? "Actualizar" : "Crear"} Usuario
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, email, cédula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estadísticas</Label>
              <div className="text-sm text-gray-600">
                <p>Total: {users.length}</p>
                <p>Activos: {users.filter((u) => u.isActive).length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios del Sistema</CardTitle>
          <CardDescription>{filteredUsers.length} usuario(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">CI: {user.cedula}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                        {user.phone && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={roleColors[user.role]}>
                          {ROLES.find((r) => r.value === user.role)?.label}
                        </Badge>
                        {user.specialty && <p className="text-xs text-gray-500">{user.specialty}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={user.isActive} onCheckedChange={() => handleToggleStatus(user.id)} size="sm" />
                        <span className="text-sm">{user.isActive ? "Activo" : "Inactivo"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Nunca"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
