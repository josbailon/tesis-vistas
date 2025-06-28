"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, User, Phone, Mail, Edit, Eye, Trash2, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Patient {
  id: string
  name: string
  cedula: string
  phone: string
  email: string
  birthDate: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalHistory: string
  allergies: string
  status: "active" | "inactive"
  createdAt: string
}

const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Ana Rodríguez",
    cedula: "1234567890",
    phone: "+593 99 456 7890",
    email: "ana.rodriguez@gmail.com",
    birthDate: "1990-05-15",
    address: "Av. Principal 123, Manta",
    emergencyContact: "Carlos Rodríguez",
    emergencyPhone: "+593 99 456 7891",
    medicalHistory: "Hipertensión controlada",
    allergies: "Penicilina",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Luis Mendoza",
    cedula: "0987654321",
    phone: "+593 99 567 8901",
    email: "luis.mendoza@hotmail.com",
    birthDate: "1985-08-22",
    address: "Calle 24 de Mayo 456, Manta",
    emergencyContact: "María Mendoza",
    emergencyPhone: "+593 99 567 8902",
    medicalHistory: "Diabetes tipo 2",
    allergies: "Ninguna conocida",
    status: "active",
    createdAt: "2024-02-10T14:30:00Z",
  },
]

export default function SecretaryPatientsPage() {
  const { toast } = useToast()
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    cedula: "",
    phone: "",
    email: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    allergies: "",
    status: "active" as const,
  })

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cedula.includes(searchTerm) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      name: "",
      cedula: "",
      phone: "",
      email: "",
      birthDate: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalHistory: "",
      allergies: "",
      status: "active",
    })
    setEditingPatient(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.cedula || !formData.phone) {
      toast({
        title: "Error",
        description: "Por favor complete los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    if (editingPatient) {
      // Update existing patient
      setPatients((prev) =>
        prev.map((patient) => (patient.id === editingPatient.id ? { ...patient, ...formData } : patient)),
      )
      toast({
        title: "Paciente actualizado",
        description: "La información del paciente ha sido actualizada",
      })
    } else {
      // Create new patient
      const newPatient: Patient = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      }
      setPatients((prev) => [...prev, newPatient])
      toast({
        title: "Paciente registrado",
        description: "El nuevo paciente ha sido registrado exitosamente",
      })
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    setFormData({
      name: patient.name,
      cedula: patient.cedula,
      phone: patient.phone,
      email: patient.email,
      birthDate: patient.birthDate,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
      emergencyPhone: patient.emergencyPhone,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
      status: patient.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (patientId: string) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== patientId))
    toast({
      title: "Paciente eliminado",
      description: "El paciente ha sido eliminado del sistema",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Pacientes</h1>
          <p className="text-gray-600">Administra la información de todos los pacientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPatient ? "Editar Paciente" : "Nuevo Paciente"}</DialogTitle>
              <DialogDescription>
                {editingPatient ? "Actualiza la información del paciente" : "Registra un nuevo paciente en el sistema"}
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
                    placeholder="Nombre completo del paciente"
                    required
                  />
                </div>
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
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+593 99 123 4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="paciente@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setFormData((prev) => ({ ...prev, status: value }))
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Dirección completa"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="Nombre del contacto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                    placeholder="+593 99 123 4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Historia Médica</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData((prev) => ({ ...prev, medicalHistory: e.target.value }))}
                  placeholder="Antecedentes médicos relevantes..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => setFormData((prev) => ({ ...prev, allergies: e.target.value }))}
                  placeholder="Alergias conocidas..."
                  rows={2}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {editingPatient ? "Actualizar" : "Registrar"} Paciente
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar paciente por nombre, cédula, teléfono o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Registrados</CardTitle>
          <CardDescription>{filteredPatients.length} paciente(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Fecha de Nacimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-gray-500">CI: {patient.cedula}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {patient.phone}
                        </p>
                        {patient.email && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : "No especificada"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          patient.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {patient.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(patient.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(patient)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(patient.id)}
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
