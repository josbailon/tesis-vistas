"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Search, FileText, Eye, Edit, Calendar, User, Stethoscope } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

interface ClinicalCase {
  id: string
  title: string
  patientName: string
  patientAge: number
  specialty: string
  diagnosis: string
  treatment: string
  observations: string
  status: "draft" | "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  studentId: string
  professorId?: string
  professorComments?: string
}

const MOCK_CASES: ClinicalCase[] = [
  {
    id: "1",
    title: "Endodoncia en Molar Superior",
    patientName: "Ana Rodríguez",
    patientAge: 35,
    specialty: "Endodoncia",
    diagnosis: "Pulpitis irreversible en pieza 16",
    treatment: "Tratamiento endodóntico completo",
    observations: "Paciente presenta dolor severo. Se realizó apertura cameral y medicación temporal.",
    status: "pending",
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z",
    studentId: "3",
  },
  {
    id: "2",
    title: "Ortodoncia Interceptiva",
    patientName: "Luis Mendoza",
    patientAge: 12,
    specialty: "Ortodoncia",
    diagnosis: "Maloclusión Clase II División 1",
    treatment: "Aparato funcional para corrección de sobremordida",
    observations: "Paciente colaborador. Padres comprometidos con el tratamiento.",
    status: "approved",
    createdAt: "2024-12-18T14:30:00Z",
    updatedAt: "2024-12-19T09:15:00Z",
    studentId: "3",
    professorId: "2",
    professorComments: "Excelente diagnóstico y plan de tratamiento. Aprobado para continuar.",
  },
]

const SPECIALTIES = ["Endodoncia", "Ortodoncia", "Periodoncia", "Cirugía", "Prótesis", "Pediatría", "Implantología"]

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

const statusLabels = {
  draft: "Borrador",
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
}

export default function StudentClinicalCasesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [cases, setCases] = useState<ClinicalCase[]>(MOCK_CASES)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<ClinicalCase | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    patientName: "",
    patientAge: "",
    specialty: "",
    diagnosis: "",
    treatment: "",
    observations: "",
  })

  const filteredCases = cases.filter((clinicalCase) => {
    const matchesSearch =
      clinicalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinicalCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinicalCase.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || clinicalCase.status === statusFilter
    const isStudentCase = clinicalCase.studentId === user?.id

    return matchesSearch && matchesStatus && isStudentCase
  })

  const resetForm = () => {
    setFormData({
      title: "",
      patientName: "",
      patientAge: "",
      specialty: "",
      diagnosis: "",
      treatment: "",
      observations: "",
    })
    setEditingCase(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.patientName || !formData.specialty || !formData.diagnosis) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    if (editingCase) {
      // Update existing case
      setCases((prev) =>
        prev.map((clinicalCase) =>
          clinicalCase.id === editingCase.id
            ? {
                ...clinicalCase,
                ...formData,
                patientAge: Number.parseInt(formData.patientAge),
                updatedAt: new Date().toISOString(),
                status: "draft" as const, // Reset to draft when edited
              }
            : clinicalCase,
        ),
      )
      toast({
        title: "Caso actualizado",
        description: "El caso clínico ha sido actualizado",
      })
    } else {
      // Create new case
      const newCase: ClinicalCase = {
        id: Date.now().toString(),
        ...formData,
        patientAge: Number.parseInt(formData.patientAge),
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        studentId: user?.id || "",
      }
      setCases((prev) => [...prev, newCase])
      toast({
        title: "Caso creado",
        description: "El nuevo caso clínico ha sido creado",
      })
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (clinicalCase: ClinicalCase) => {
    setEditingCase(clinicalCase)
    setFormData({
      title: clinicalCase.title,
      patientName: clinicalCase.patientName,
      patientAge: clinicalCase.patientAge.toString(),
      specialty: clinicalCase.specialty,
      diagnosis: clinicalCase.diagnosis,
      treatment: clinicalCase.treatment,
      observations: clinicalCase.observations,
    })
    setIsDialogOpen(true)
  }

  const handleSubmitForApproval = (caseId: string) => {
    setCases((prev) =>
      prev.map((clinicalCase) =>
        clinicalCase.id === caseId
          ? { ...clinicalCase, status: "pending" as const, updatedAt: new Date().toISOString() }
          : clinicalCase,
      ),
    )
    toast({
      title: "Caso enviado",
      description: "El caso ha sido enviado para aprobación del profesor",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Casos Clínicos</h1>
          <p className="text-gray-600">Gestiona tus casos clínicos y tratamientos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Caso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCase ? "Editar Caso Clínico" : "Nuevo Caso Clínico"}</DialogTitle>
              <DialogDescription>
                {editingCase
                  ? "Actualiza la información del caso clínico"
                  : "Registra un nuevo caso clínico para evaluación"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Caso *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Ej: Endodoncia en Molar Superior"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="patientName">Nombre del Paciente *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Nombre completo del paciente"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientAge">Edad del Paciente</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    value={formData.patientAge}
                    onChange={(e) => setFormData((prev) => ({ ...prev, patientAge: e.target.value }))}
                    placeholder="Edad en años"
                    min="1"
                    max="120"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico *</Label>
                <Textarea
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData((prev) => ({ ...prev, diagnosis: e.target.value }))}
                  placeholder="Describe el diagnóstico del caso..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatment">Plan de Tratamiento</Label>
                <Textarea
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => setFormData((prev) => ({ ...prev, treatment: e.target.value }))}
                  placeholder="Describe el plan de tratamiento propuesto..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observaciones</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData((prev) => ({ ...prev, observations: e.target.value }))}
                  placeholder="Observaciones adicionales, evolución del tratamiento..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {editingCase ? "Actualizar" : "Crear"} Caso
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título, paciente o diagnóstico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="approved">Aprobado</SelectItem>
                  <SelectItem value="rejected">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Casos Clínicos</CardTitle>
          <CardDescription>{filteredCases.length} caso(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Caso</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((clinicalCase) => (
                  <TableRow key={clinicalCase.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{clinicalCase.title}</p>
                          <p className="text-sm text-gray-500">{clinicalCase.diagnosis}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{clinicalCase.patientName}</p>
                          <p className="text-sm text-gray-500">{clinicalCase.patientAge} años</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-gray-400" />
                        {clinicalCase.specialty}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[clinicalCase.status]}>{statusLabels[clinicalCase.status]}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(clinicalCase.updatedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {(clinicalCase.status === "draft" || clinicalCase.status === "rejected") && (
                          <Button size="sm" variant="outline" onClick={() => handleEdit(clinicalCase)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {clinicalCase.status === "draft" && (
                          <Button
                            size="sm"
                            onClick={() => handleSubmitForApproval(clinicalCase.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Enviar
                          </Button>
                        )}
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
