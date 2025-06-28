"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  UserPlus,
  Download,
  Shield,
  Mail,
  Phone,
  GraduationCap,
  Stethoscope,
  Users,
  Plus,
} from "lucide-react"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "professor" | "student" | "patient" | "secretary"
  specialty?: string
  department?: string
  phone?: string
  cedula?: string
  address?: string
  semester?: number
  experience?: string
  status: "active" | "inactive"
  createdAt: string
}

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [createUserType, setCreateUserType] = useState<"patient" | "student" | "professor" | "secretary" | "admin">(
    "patient",
  )

  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: "1",
      name: "Dr. Carlos Mendoza Ruiz",
      email: "carlos.mendoza@uleam.edu.ec",
      role: "professor",
      specialty: "Endodoncia",
      department: "Odontología",
      phone: "+593 99 123 4567",
      cedula: "1234567890",
      address: "Av. Universitaria 123, Manta",
      status: "active",
      createdAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "2",
      name: "Dra. Laura Martín Silva",
      email: "laura.martin@uleam.edu.ec",
      role: "professor",
      specialty: "Ortodoncia",
      department: "Odontología",
      phone: "+593 99 234 5678",
      cedula: "2345678901",
      address: "Calle 24 de Mayo 456, Manta",
      status: "active",
      createdAt: "2024-01-20T00:00:00Z",
    },
    {
      id: "3",
      name: "Dr. Roberto Silva Castro",
      email: "roberto.silva@uleam.edu.ec",
      role: "professor",
      specialty: "Cirugía Oral y Maxilofacial",
      department: "Odontología",
      phone: "+593 99 345 6789",
      cedula: "3456789012",
      address: "Barrio Los Almendros, Manta",
      status: "active",
      createdAt: "2024-01-25T00:00:00Z",
    },
    {
      id: "4",
      name: "Juan Carlos Pérez Mendoza",
      email: "juan.perez@uleam.edu.ec",
      role: "student",
      specialty: "Endodoncia",
      phone: "+593 99 456 7890",
      cedula: "4567890123",
      address: "Ciudadela El Palmar, Manta",
      semester: 8,
      experience: "Avanzado",
      status: "active",
      createdAt: "2024-02-01T00:00:00Z",
    },
    {
      id: "5",
      name: "Ana María López Silva",
      email: "ana.lopez@uleam.edu.ec",
      role: "student",
      specialty: "Ortodoncia",
      phone: "+593 99 567 8901",
      cedula: "5678901234",
      address: "Av. Flavio Reyes 789, Manta",
      semester: 7,
      experience: "Intermedio",
      status: "active",
      createdAt: "2024-02-05T00:00:00Z",
    },
    {
      id: "6",
      name: "María González Pérez",
      email: "maria.gonzalez@email.com",
      role: "patient",
      phone: "+593 99 678 9012",
      cedula: "6789012345",
      address: "Barrio Jocay, Manta",
      status: "active",
      createdAt: "2024-02-15T00:00:00Z",
    },
    {
      id: "7",
      name: "Carlos Ruiz Mendoza",
      email: "carlos.ruiz@email.com",
      role: "patient",
      phone: "+593 99 789 0123",
      cedula: "7890123456",
      address: "Ciudadela Miraflores, Manta",
      status: "active",
      createdAt: "2024-02-20T00:00:00Z",
    },
    {
      id: "8",
      name: "Ana Secretaria Morales",
      email: "ana.secretaria@uleam.edu.ec",
      role: "secretary",
      phone: "+593 99 890 1234",
      cedula: "8901234567",
      address: "Av. 4 de Noviembre, Manta",
      status: "active",
      createdAt: "2024-01-20T00:00:00Z",
    },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    specialty: "",
    department: "",
    phone: "",
    cedula: "",
    address: "",
    semester: "",
    experience: "",
    status: "active",
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.cedula && user.cedula.includes(searchTerm))
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    const roleColors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      professor: "bg-purple-100 text-purple-800 border-purple-200",
      student: "bg-blue-100 text-blue-800 border-blue-200",
      patient: "bg-green-100 text-green-800 border-green-200",
      secretary: "bg-orange-100 text-orange-800 border-orange-200",
    }
    const roleLabels = {
      admin: "Administrador",
      professor: "Profesor",
      student: "Estudiante",
      patient: "Paciente",
      secretary: "Secretario",
    }
    return (
      <Badge className={`${roleColors[role as keyof typeof roleColors]} border`}>
        {roleLabels[role as keyof typeof roleLabels]}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge
        className={
          status === "active"
            ? "bg-green-100 text-green-800 border-green-200 border"
            : "bg-gray-100 text-gray-800 border-gray-200 border"
        }
      >
        {status === "active" ? "Activo" : "Inactivo"}
      </Badge>
    )
  }

  const resetNewUserForm = () => {
    setNewUser({
      name: "",
      email: "",
      role: "",
      password: "",
      specialty: "",
      department: "",
      phone: "",
      cedula: "",
      address: "",
      semester: "",
      experience: "",
      status: "active",
    })
  }

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.cedula || !newUser.phone) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newUser.email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      })
      return
    }

    // Check if email already exists
    if (users.some((user) => user.email === newUser.email)) {
      toast({
        title: "Error",
        description: "Ya existe un usuario con este email",
        variant: "destructive",
      })
      return
    }

    // Check if cedula already exists
    if (users.some((user) => user.cedula === newUser.cedula)) {
      toast({
        title: "Error",
        description: "Ya existe un usuario con esta cédula",
        variant: "destructive",
      })
      return
    }

    const user: AdminUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: createUserType,
      specialty: newUser.specialty || undefined,
      department: newUser.department || undefined,
      phone: newUser.phone,
      cedula: newUser.cedula,
      address: newUser.address || undefined,
      semester: newUser.semester ? Number.parseInt(newUser.semester) : undefined,
      experience: newUser.experience || undefined,
      status: newUser.status as "active" | "inactive",
      createdAt: new Date().toISOString(),
    }

    setUsers((prev) => [...prev, user])
    setIsCreateDialogOpen(false)
    resetNewUserForm()

    toast({
      title: "Usuario creado exitosamente",
      description: `${user.name} ha sido registrado como ${getRoleLabel(createUserType)}`,
    })
  }

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: "Administrador",
      professor: "Profesor",
      student: "Estudiante",
      patient: "Paciente",
      secretary: "Secretario",
    }
    return labels[role as keyof typeof labels]
  }

  const handleEditUser = () => {
    if (!selectedUser) return

    setUsers((prev) => prev.map((user) => (user.id === selectedUser.id ? { ...selectedUser } : user)))
    setIsEditDialogOpen(false)

    toast({
      title: "Usuario actualizado",
      description: `${selectedUser.name} ha sido actualizado exitosamente`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    setUsers((prev) => prev.filter((u) => u.id !== userId))

    toast({
      title: "Usuario eliminado",
      description: `${user?.name} ha sido eliminado del sistema`,
    })
  }

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))

    const user = users.find((u) => u.id === userId)
    toast({
      title: "Estado actualizado",
      description: `${user?.name} ahora está ${newStatus === "active" ? "activo" : "inactivo"}`,
    })
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(users, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "usuarios.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Exportación completada",
      description: "Los datos de usuarios han sido exportados exitosamente",
    })
  }

  const openCreateDialog = (userType: typeof createUserType) => {
    setCreateUserType(userType)
    resetNewUserForm()
    setIsCreateDialogOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">Administra todos los usuarios del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Quick Create Buttons - Moved to top */}
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900">Crear Nuevos Usuarios</CardTitle>
          </div>
          <CardDescription className="text-blue-700">
            Accesos rápidos para crear diferentes tipos de usuarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => openCreateDialog("patient")}
              className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <UserPlus className="h-6 w-6" />
              <span className="font-medium">Nuevo Paciente</span>
            </Button>
            <Button
              onClick={() => openCreateDialog("student")}
              className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <GraduationCap className="h-6 w-6" />
              <span className="font-medium">Nuevo Estudiante</span>
            </Button>
            <Button
              onClick={() => openCreateDialog("professor")}
              className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Stethoscope className="h-6 w-6" />
              <span className="font-medium">Nuevo Profesor</span>
            </Button>
            <Button
              onClick={() => openCreateDialog("secretary")}
              className="h-20 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Shield className="h-6 w-6" />
              <span className="font-medium">Nuevo Secretario</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <p className="text-xs text-gray-500">Registrados en el sistema</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Profesores</CardTitle>
            <Stethoscope className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {users.filter((u) => u.role === "professor").length}
            </div>
            <p className="text-xs text-purple-600">Activos</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Estudiantes</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{users.filter((u) => u.role === "student").length}</div>
            <p className="text-xs text-blue-600">Registrados</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Pacientes</CardTitle>
            <UserPlus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{users.filter((u) => u.role === "patient").length}</div>
            <p className="text-xs text-green-600">En el sistema</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Secretarios</CardTitle>
            <Shield className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {users.filter((u) => u.role === "secretary").length}
            </div>
            <p className="text-xs text-orange-600">Activos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
          <CardDescription>Busca y filtra usuarios por diferentes criterios</CardDescription>
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
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48 h-11">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="professor">Profesor</SelectItem>
                <SelectItem value="student">Estudiante</SelectItem>
                <SelectItem value="patient">Paciente</SelectItem>
                <SelectItem value="secretary">Secretario</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 h-11">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {filteredUsers.length} usuario{filteredUsers.length !== 1 ? "s" : ""} encontrado
            {filteredUsers.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      {user.specialty ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {user.specialty}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsViewDialogOpen(true)
                          }}
                          className="h-8 w-8 p-0 hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsEditDialogOpen(true)
                          }}
                          className="h-8 w-8 p-0 hover:bg-green-100"
                        >
                          <Edit className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          className="h-8 w-8 p-0 hover:bg-yellow-100"
                        >
                          {user.status === "active" ? (
                            <Lock className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <Unlock className="h-4 w-4 text-yellow-600" />
                          )}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción eliminará permanentemente el usuario <strong>{user.name}</strong> y todos
                                sus datos asociados. Esta acción no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.id)}
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
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Crear Nuevo {getRoleLabel(createUserType)}</DialogTitle>
            <DialogDescription>
              Completa la información del nuevo {getRoleLabel(createUserType).toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nombre Completo *</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Nombre y apellidos completos"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cédula *</Label>
                <Input
                  value={newUser.cedula}
                  onChange={(e) => setNewUser({ ...newUser, cedula: e.target.value })}
                  placeholder="1234567890"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email *</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder={createUserType === "patient" ? "email@ejemplo.com" : "usuario@uleam.edu.ec"}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Teléfono *</Label>
                <Input
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="+593 99 123 4567"
                  className="h-11"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Dirección</Label>
              <Input
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                placeholder="Dirección completa"
                className="h-11"
              />
            </div>

            {/* Role-specific fields */}
            {(createUserType === "professor" || createUserType === "student") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Especialidad *</Label>
                  <Select
                    value={newUser.specialty}
                    onValueChange={(value) => setNewUser({ ...newUser, specialty: value })}
                  >
                    <SelectTrigger className="h-11">
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

                {createUserType === "professor" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Departamento</Label>
                    <Input
                      value={newUser.department}
                      onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                      placeholder="Departamento de Odontología"
                      className="h-11"
                    />
                  </div>
                )}

                {createUserType === "student" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Semestre *</Label>
                      <Select
                        value={newUser.semester}
                        onValueChange={(value) => setNewUser({ ...newUser, semester: value })}
                      >
                        <SelectTrigger className="h-11">
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
                      <Label className="text-sm font-medium">Nivel de Experiencia</Label>
                      <Select
                        value={newUser.experience}
                        onValueChange={(value) => setNewUser({ ...newUser, experience: value })}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Seleccionar nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Básico">Básico</SelectItem>
                          <SelectItem value="Intermedio">Intermedio</SelectItem>
                          <SelectItem value="Avanzado">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Estado</Label>
              <Select value={newUser.status} onValueChange={(value) => setNewUser({ ...newUser, status: value })}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateUser} className="bg-blue-600 hover:bg-blue-700">
              Crear {getRoleLabel(createUserType)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Información del Usuario</DialogTitle>
            <DialogDescription>Detalles completos del usuario</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nombre</Label>
                  <p className="text-gray-900 font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Cédula</Label>
                  <p className="text-gray-900">{selectedUser.cedula}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Teléfono</Label>
                  <p className="text-gray-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Rol</Label>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Estado</Label>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                {selectedUser.specialty && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Especialidad</Label>
                    <p className="text-gray-900">{selectedUser.specialty}</p>
                  </div>
                )}
                {selectedUser.department && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Departamento</Label>
                    <p className="text-gray-900">{selectedUser.department}</p>
                  </div>
                )}
                {selectedUser.semester && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Semestre</Label>
                    <p className="text-gray-900">{selectedUser.semester}°</p>
                  </div>
                )}
                {selectedUser.experience && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Experiencia</Label>
                    <p className="text-gray-900">{selectedUser.experience}</p>
                  </div>
                )}
                {selectedUser.address && (
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Dirección</Label>
                    <p className="text-gray-900">{selectedUser.address}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-gray-600">Fecha de Registro</Label>
                  <p className="text-gray-900">
                    {new Date(selectedUser.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>Modifica la información del usuario</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Nombre</Label>
                  <Input
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Teléfono</Label>
                  <Input
                    value={selectedUser.phone || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Estado</Label>
                  <Select
                    value={selectedUser.status}
                    onValueChange={(value) =>
                      setSelectedUser({ ...selectedUser, status: value as "active" | "inactive" })
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(selectedUser.role === "professor" || selectedUser.role === "student") && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Especialidad</Label>
                    <Select
                      value={selectedUser.specialty || ""}
                      onValueChange={(value) => setSelectedUser({ ...selectedUser, specialty: value })}
                    >
                      <SelectTrigger className="h-11">
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
                )}
                {selectedUser.role === "student" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Semestre</Label>
                    <Select
                      value={selectedUser.semester?.toString() || ""}
                      onValueChange={(value) => setSelectedUser({ ...selectedUser, semester: Number.parseInt(value) })}
                    >
                      <SelectTrigger className="h-11">
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
                )}
              </div>
              {selectedUser.address && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Dirección</Label>
                  <Textarea
                    value={selectedUser.address}
                    onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
                    rows={2}
                    className="resize-none"
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditUser} className="bg-green-600 hover:bg-green-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
