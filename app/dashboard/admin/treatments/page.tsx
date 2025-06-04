"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Stethoscope, Search, Plus, Edit, Trash2, Clock, DollarSign, BookOpen, CheckCircle } from "lucide-react"

interface Treatment {
  id: string
  name: string
  description: string
  specialty: string
  duration: number // en minutos
  cost: number
  difficulty: "basic" | "intermediate" | "advanced"
  prerequisites: string[]
  materials: string[]
  status: "active" | "inactive"
  createdBy: string
  createdAt: string
  sessions: number
}

export default function TreatmentsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null)

  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: "t1",
      name: "Tratamiento de Conducto",
      description: "Endodoncia completa con limpieza y obturación de conductos radiculares",
      specialty: "Endodoncia",
      duration: 120,
      cost: 250.0,
      difficulty: "advanced",
      prerequisites: ["Diagnóstico radiográfico", "Anestesia local"],
      materials: ["Limas endodónticas", "Gutapercha", "Sellador endodóntico", "Dique de goma"],
      status: "active",
      createdBy: "Dr. Martínez",
      createdAt: "2024-01-10",
      sessions: 3,
    },
    {
      id: "t2",
      name: "Limpieza Dental Profunda",
      description: "Profilaxis dental con raspado y alisado radicular",
      specialty: "Periodoncia",
      duration: 60,
      cost: 80.0,
      difficulty: "basic",
      prerequisites: ["Evaluación periodontal"],
      materials: ["Curetas", "Ultrasonido", "Pasta profiláctica"],
      status: "active",
      createdBy: "Dra. López",
      createdAt: "2024-01-08",
      sessions: 1,
    },
    {
      id: "t3",
      name: "Brackets Metálicos",
      description: "Colocación de aparatología ortodóntica fija con brackets metálicos",
      specialty: "Ortodoncia",
      duration: 90,
      cost: 800.0,
      difficulty: "intermediate",
      prerequisites: ["Estudio ortodóntico", "Modelos de estudio"],
      materials: ["Brackets metálicos", "Arcos", "Ligaduras", "Adhesivo ortodóntico"],
      status: "active",
      createdBy: "Dra. Rodríguez",
      createdAt: "2024-01-05",
      sessions: 24,
    },
    {
      id: "t4",
      name: "Extracción Simple",
      description: "Extracción dental simple sin complicaciones",
      specialty: "Cirugía Oral",
      duration: 30,
      cost: 50.0,
      difficulty: "basic",
      prerequisites: ["Radiografía periapical", "Anestesia local"],
      materials: ["Fórceps", "Elevadores", "Gasas", "Sutura"],
      status: "active",
      createdBy: "Dr. Vásquez",
      createdAt: "2024-01-03",
      sessions: 1,
    },
  ])

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "basic":
        return <Badge className="bg-green-100 text-green-700">Básico</Badge>
      case "intermediate":
        return <Badge className="bg-yellow-100 text-yellow-700">Intermedio</Badge>
      case "advanced":
        return <Badge className="bg-red-100 text-red-700">Avanzado</Badge>
      default:
        return <Badge variant="outline">{difficulty}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Activo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700">Inactivo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesSearch =
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = specialtyFilter === "all" || treatment.specialty === specialtyFilter
    const matchesDifficulty = difficultyFilter === "all" || treatment.difficulty === difficultyFilter

    return matchesSearch && matchesSpecialty && matchesDifficulty
  })

  const handleSaveTreatment = (treatmentData: Partial<Treatment>) => {
    if (editingTreatment) {
      // Editar tratamiento existente
      setTreatments((prev) => prev.map((t) => (t.id === editingTreatment.id ? { ...t, ...treatmentData } : t)))
    } else {
      // Crear nuevo tratamiento
      const newTreatment: Treatment = {
        id: `t${treatments.length + 1}`,
        createdBy: "Admin",
        createdAt: new Date().toISOString().split("T")[0],
        status: "active",
        ...treatmentData,
      } as Treatment
      setTreatments((prev) => [...prev, newTreatment])
    }
    setIsDialogOpen(false)
    setEditingTreatment(null)
  }

  const handleDeleteTreatment = (id: string) => {
    setTreatments((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gestión de Tratamientos
          </h1>
          <p className="text-blue-600 mt-2">Administra el catálogo de tratamientos disponibles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-medical" onClick={() => setEditingTreatment(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Tratamiento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTreatment ? "Editar Tratamiento" : "Nuevo Tratamiento"}</DialogTitle>
              <DialogDescription>
                {editingTreatment ? "Modifica los datos del tratamiento" : "Crea un nuevo tratamiento"}
              </DialogDescription>
            </DialogHeader>
            <TreatmentForm
              treatment={editingTreatment}
              onSave={handleSaveTreatment}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Tratamientos</p>
                <p className="text-2xl font-bold text-blue-800">{treatments.length}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Activos</p>
                <p className="text-2xl font-bold text-green-800">
                  {treatments.filter((t) => t.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Especialidades</p>
                <p className="text-2xl font-bold text-purple-800">{new Set(treatments.map((t) => t.specialty)).size}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Costo Promedio</p>
                <p className="text-2xl font-bold text-orange-800">
                  ${(treatments.reduce((sum, t) => sum + t.cost, 0) / treatments.length).toFixed(0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-blue-500" />
              <Input
                placeholder="Buscar tratamientos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-blue-50/50 border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="specialty-filter" className="text-sm text-blue-700">
                  Especialidad:
                </Label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger id="specialty-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="Periodoncia">Periodoncia</SelectItem>
                    <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="difficulty-filter" className="text-sm text-blue-700">
                  Dificultad:
                </Label>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger id="difficulty-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="intermediate">Intermedio</SelectItem>
                    <SelectItem value="advanced">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Tratamientos */}
      <div className="grid gap-4">
        {filteredTreatments.map((treatment) => (
          <Card key={treatment.id} className="medical-card hover:scale-105 transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-blue-800">{treatment.name}</CardTitle>
                  <CardDescription className="text-blue-600">{treatment.specialty}</CardDescription>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  {getDifficultyBadge(treatment.difficulty)}
                  {getStatusBadge(treatment.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">{treatment.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-700">Duración</p>
                      <p className="text-blue-600">{treatment.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium text-blue-700">Costo</p>
                      <p className="text-blue-600">${treatment.cost}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700">Sesiones</p>
                    <p className="text-blue-600">{treatment.sessions}</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700">Creado por</p>
                    <p className="text-blue-600">{treatment.createdBy}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-blue-700 mb-2">Prerrequisitos:</p>
                    <div className="space-y-1">
                      {treatment.prerequisites.map((prereq, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-blue-600">{prereq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 mb-2">Materiales:</p>
                    <div className="space-y-1">
                      {treatment.materials.map((material, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-blue-600">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      setEditingTreatment(treatment)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteTreatment(treatment.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Componente del formulario
function TreatmentForm({
  treatment,
  onSave,
  onCancel,
}: {
  treatment: Treatment | null
  onSave: (data: Partial<Treatment>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: treatment?.name || "",
    description: treatment?.description || "",
    specialty: treatment?.specialty || "",
    duration: treatment?.duration || 60,
    cost: treatment?.cost || 0,
    difficulty: treatment?.difficulty || "basic",
    prerequisites: treatment?.prerequisites?.join(", ") || "",
    materials: treatment?.materials?.join(", ") || "",
    sessions: treatment?.sessions || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      prerequisites: formData.prerequisites.split(",").map((p) => p.trim()),
      materials: formData.materials.split(",").map((m) => m.trim()),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre del Tratamiento</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="specialty">Especialidad</Label>
          <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar especialidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Endodoncia">Endodoncia</SelectItem>
              <SelectItem value="Periodoncia">Periodoncia</SelectItem>
              <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
              <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
              <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="duration">Duración (minutos)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="cost">Costo ($)</Label>
          <Input
            id="cost"
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: Number.parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="sessions">Sesiones</Label>
          <Input
            id="sessions"
            type="number"
            value={formData.sessions}
            onChange={(e) => setFormData({ ...formData, sessions: Number.parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="difficulty">Dificultad</Label>
        <Select
          value={formData.difficulty}
          onValueChange={(value) => setFormData({ ...formData, difficulty: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar dificultad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Básico</SelectItem>
            <SelectItem value="intermediate">Intermedio</SelectItem>
            <SelectItem value="advanced">Avanzado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="prerequisites">Prerrequisitos (separados por comas)</Label>
        <Textarea
          id="prerequisites"
          value={formData.prerequisites}
          onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
          placeholder="Ej: Radiografía periapical, Anestesia local"
        />
      </div>

      <div>
        <Label htmlFor="materials">Materiales (separados por comas)</Label>
        <Textarea
          id="materials"
          value={formData.materials}
          onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
          placeholder="Ej: Fórceps, Elevadores, Gasas"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="btn-medical">
          {treatment ? "Actualizar" : "Crear"} Tratamiento
        </Button>
      </div>
    </form>
  )
}
