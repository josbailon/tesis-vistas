"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, User, Calendar, FileText, Plus, Eye, Edit, Stethoscope } from "lucide-react"

interface ClinicalCase {
  id: string
  title: string
  patientName: string
  patientId: string
  studentName: string
  professorName: string
  specialty: string
  status: "en_progreso" | "completado" | "pendiente" | "cancelado"
  startDate: string
  endDate?: string
  diagnosis: string
  treatment: string
  notes: string
  images: string[]
  documents: string[]
}

const mockClinicalCases: ClinicalCase[] = [
  {
    id: "cc1",
    title: "Tratamiento de Endodoncia - Molar Superior",
    patientName: "Luis Mendoza",
    patientId: "pac1",
    studentName: "Juan Pérez",
    professorName: "Dr. Carlos Ruiz",
    specialty: "Endodoncia",
    status: "en_progreso",
    startDate: "2024-01-05",
    diagnosis: "Pulpitis irreversible en pieza 16",
    treatment: "Tratamiento de conducto radicular",
    notes: "Paciente presenta dolor intenso. Se inició tratamiento de urgencia.",
    images: ["radiografia_inicial.jpg", "foto_clinica_1.jpg"],
    documents: ["plan_tratamiento.pdf", "consentimiento.pdf"],
  },
  {
    id: "cc2",
    title: "Ortodoncia Correctiva - Maloclusión Clase II",
    patientName: "Rosa Vera",
    patientId: "pac2",
    studentName: "María González",
    professorName: "Dra. Laura Martín",
    specialty: "Ortodoncia",
    status: "completado",
    startDate: "2023-08-15",
    endDate: "2024-01-10",
    diagnosis: "Maloclusión Clase II división 1",
    treatment: "Aparatología fija con brackets metálicos",
    notes: "Tratamiento exitoso. Paciente muy colaborador.",
    images: ["antes_1.jpg", "durante_1.jpg", "despues_1.jpg"],
    documents: ["estudio_cefalometrico.pdf", "plan_tratamiento.pdf"],
  },
  {
    id: "cc3",
    title: "Extracción Quirúrgica - Terceros Molares",
    patientName: "Carlos Morales",
    patientId: "pac3",
    studentName: "Pedro Sánchez",
    professorName: "Dr. Roberto Silva",
    specialty: "Cirugía Oral",
    status: "pendiente",
    startDate: "2024-01-15",
    diagnosis: "Terceros molares impactados",
    treatment: "Extracción quirúrgica bilateral",
    notes: "Requiere evaluación preoperatoria completa",
    images: ["panoramica.jpg"],
    documents: ["evaluacion_preoperatoria.pdf"],
  },
]

const statusColors = {
  en_progreso: "bg-blue-100 text-blue-800",
  completado: "bg-green-100 text-green-800",
  pendiente: "bg-yellow-100 text-yellow-800",
  cancelado: "bg-red-100 text-red-800",
}

const statusLabels = {
  en_progreso: "En Progreso",
  completado: "Completado",
  pendiente: "Pendiente",
  cancelado: "Cancelado",
}

export default function ClinicalCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null)

  const filteredCases = mockClinicalCases.filter((clinicalCase) => {
    const matchesSearch =
      clinicalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinicalCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinicalCase.studentName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || clinicalCase.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Casos Clínicos</h1>
          <p className="text-muted-foreground">Gestiona los casos clínicos y tratamientos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Caso Clínico
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Casos</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClinicalCases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClinicalCases.filter((c) => c.status === "en_progreso").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClinicalCases.filter((c) => c.status === "completado").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClinicalCases.filter((c) => c.status === "pendiente").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por título, paciente o estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Todos los estados</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completado">Completado</option>
              <option value="pendiente">Pendiente</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="grid gap-6">
        {filteredCases.map((clinicalCase) => (
          <Card key={clinicalCase.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    {clinicalCase.title}
                  </CardTitle>
                  <CardDescription>
                    Paciente: {clinicalCase.patientName} • Estudiante: {clinicalCase.studentName}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColors[clinicalCase.status]}>{statusLabels[clinicalCase.status]}</Badge>
                  <Badge variant="outline">{clinicalCase.specialty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Información del Caso</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Diagnóstico:</span> {clinicalCase.diagnosis}
                    </p>
                    <p>
                      <span className="font-medium">Tratamiento:</span> {clinicalCase.treatment}
                    </p>
                    <p>
                      <span className="font-medium">Profesor:</span> {clinicalCase.professorName}
                    </p>
                    <p>
                      <span className="font-medium">Inicio:</span> {clinicalCase.startDate}
                    </p>
                    {clinicalCase.endDate && (
                      <p>
                        <span className="font-medium">Fin:</span> {clinicalCase.endDate}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Archivos</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Imágenes:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {clinicalCase.images.map((image, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {image}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Documentos:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {clinicalCase.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {clinicalCase.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-1">Notas</h4>
                  <p className="text-sm text-gray-700">{clinicalCase.notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedCase(clinicalCase)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Detalles
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedCase.title}</CardTitle>
                  <CardDescription>
                    Caso ID: {selectedCase.id} • {selectedCase.specialty}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedCase(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Resumen</TabsTrigger>
                  <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
                  <TabsTrigger value="treatment">Tratamiento</TabsTrigger>
                  <TabsTrigger value="images">Imágenes</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Información del Paciente</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Nombre:</span> {selectedCase.patientName}
                        </p>
                        <p>
                          <span className="font-medium">ID:</span> {selectedCase.patientId}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Equipo Médico</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Estudiante:</span> {selectedCase.studentName}
                        </p>
                        <p>
                          <span className="font-medium">Profesor:</span> {selectedCase.professorName}
                        </p>
                        <p>
                          <span className="font-medium">Especialidad:</span> {selectedCase.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Estado del Caso</h3>
                    <div className="flex items-center gap-4">
                      <Badge className={statusColors[selectedCase.status]}>{statusLabels[selectedCase.status]}</Badge>
                      <span className="text-sm">Inicio: {selectedCase.startDate}</span>
                      {selectedCase.endDate && <span className="text-sm">Fin: {selectedCase.endDate}</span>}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diagnosis" className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Diagnóstico Principal</h3>
                    <p className="text-sm bg-blue-50 p-3 rounded-lg">{selectedCase.diagnosis}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Notas Clínicas</h3>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedCase.notes}</p>
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Plan de Tratamiento</h3>
                    <p className="text-sm bg-green-50 p-3 rounded-lg">{selectedCase.treatment}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Progreso del Tratamiento</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Sesión 1 - Evaluación inicial</span>
                          <Badge variant="outline">Completado</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Evaluación clínica y radiográfica inicial</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Sesión 2 - Inicio del tratamiento</span>
                          <Badge variant="outline">En progreso</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Preparación y primera fase del tratamiento</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Imágenes del Caso</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Subir Imagen
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedCase.images.map((image, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium">{image}</p>
                        <p className="text-xs text-muted-foreground">Subido el {selectedCase.startDate}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Documentos del Caso</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Subir Documento
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {selectedCase.documents.map((document, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{document}</p>
                            <p className="text-sm text-muted-foreground">Subido el {selectedCase.startDate}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
