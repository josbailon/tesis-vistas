"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Eye, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react"

export default function TeacherClinicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [studentFilter, setStudentFilter] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const clinicalRecords = [
    {
      id: "ch1",
      title: "Evaluación Inicial Endodoncia - Ana García",
      student: "Carlos López",
      studentId: "E2021001",
      patient: "Ana García",
      patientId: "PAT001",
      date: "2024-01-20",
      type: "consultation",
      specialty: "Endodoncia",
      status: "pending_review",
      diagnosis: "Pulpitis irreversible en molar superior derecho",
      treatment: "Tratamiento de conducto",
      notes:
        "Paciente presenta dolor intenso en molar 16. Radiografía muestra lesión cariosa profunda con compromiso pulpar. Se recomienda tratamiento endodóntico urgente.",
      vitals: {
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "36.5°C",
      },
      symptoms: ["Dolor intenso", "Sensibilidad al frío", "Dolor nocturno"],
      medications: ["Ibuprofeno 400mg"],
      allergies: ["Penicilina"],
      lastModified: "2024-01-20",
    },
    {
      id: "ch2",
      title: "Control Post-Operatorio - Roberto Silva",
      student: "María Fernández",
      studentId: "E2020002",
      patient: "Roberto Silva",
      patientId: "PAT002",
      date: "2024-01-18",
      type: "follow-up",
      specialty: "Cirugía Oral",
      status: "approved",
      diagnosis: "Evolución favorable post-extracción",
      treatment: "Control y seguimiento",
      notes:
        "Paciente presenta buena cicatrización después de extracción de terceros molares. Sin signos de infección. Se continúa con cuidados post-operatorios.",
      vitals: {
        bloodPressure: "118/75",
        heartRate: "68",
        temperature: "36.2°C",
      },
      symptoms: ["Leve molestia", "Inflamación residual"],
      medications: ["Amoxicilina 500mg", "Ibuprofeno 400mg"],
      allergies: ["Ninguna conocida"],
      lastModified: "2024-01-18",
      feedback: "Excelente seguimiento post-operatorio. Documentación completa y precisa.",
    },
    {
      id: "ch3",
      title: "Tratamiento Ortodóntico - Carmen Vega",
      student: "Juan Pérez",
      studentId: "E2019003",
      patient: "Carmen Vega",
      patientId: "PAT003",
      date: "2024-01-15",
      type: "treatment",
      specialty: "Ortodoncia",
      status: "needs_revision",
      diagnosis: "Maloclusión clase II división 1",
      treatment: "Brackets metálicos",
      notes:
        "Paciente inicia tratamiento ortodóntico. Se colocaron brackets en arcada superior. Paciente tolera bien el procedimiento.",
      vitals: {
        bloodPressure: "115/70",
        heartRate: "70",
        temperature: "36.3°C",
      },
      symptoms: ["Molestia leve por brackets"],
      medications: ["Paracetamol 500mg PRN"],
      allergies: ["Látex"],
      lastModified: "2024-01-15",
      feedback: "Falta información sobre el plan de tratamiento detallado. Revisar y completar.",
    },
  ]

  const students = [
    { id: "E2021001", name: "Carlos López" },
    { id: "E2020002", name: "María Fernández" },
    { id: "E2019003", name: "Juan Pérez" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente Revisión
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aprobado
          </Badge>
        )
      case "needs_revision":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Necesita Revisión
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            Consulta
          </Badge>
        )
      case "treatment":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Tratamiento
          </Badge>
        )
      case "follow-up":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-700">
            Seguimiento
          </Badge>
        )
      case "emergency":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            Emergencia
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const filteredRecords = clinicalRecords.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.student.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesStudent = studentFilter === "all" || record.studentId === studentFilter
    return matchesSearch && matchesStatus && matchesStudent
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historias Clínicas - Supervisión</h1>
          <p className="text-muted-foreground">Supervisa y aprueba las historias clínicas de tus estudiantes</p>
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Generar Reporte
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Historias</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clinicalRecords.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clinicalRecords.filter((r) => r.status === "pending_review").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clinicalRecords.filter((r) => r.status === "approved").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Necesitan Revisión</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clinicalRecords.filter((r) => r.status === "needs_revision").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar historias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Select value={studentFilter} onValueChange={setStudentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estudiante" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estudiantes</SelectItem>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending_review">Pendientes</SelectItem>
              <SelectItem value="approved">Aprobadas</SelectItem>
              <SelectItem value="needs_revision">Necesitan Revisión</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas las Historias</TabsTrigger>
          <TabsTrigger value="pending">Pendientes de Revisión</TabsTrigger>
          <TabsTrigger value="approved">Aprobadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{record.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <span className="font-medium">{record.student}</span> • {record.specialty}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(record.status)}
                      {getTypeBadge(record.type)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Paciente:</span>
                        <p className="text-muted-foreground">{record.patient}</p>
                      </div>
                      <div>
                        <span className="font-medium">Fecha:</span>
                        <p className="text-muted-foreground">{record.date}</p>
                      </div>
                      <div>
                        <span className="font-medium">Diagnóstico:</span>
                        <p className="text-muted-foreground">{record.diagnosis}</p>
                      </div>
                      <div>
                        <span className="font-medium">Tratamiento:</span>
                        <p className="text-muted-foreground">{record.treatment}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-sm">Notas Clínicas:</span>
                      <p className="text-sm text-muted-foreground mt-1">{record.notes}</p>
                    </div>

                    {record.feedback && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <span className="font-medium text-sm text-blue-800">Retroalimentación:</span>
                        <p className="text-sm text-blue-700 mt-1">{record.feedback}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRecord(record)
                          setIsReviewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Completa
                      </Button>
                      {record.status === "pending_review" && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Revisar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {filteredRecords
              .filter((record) => record.status === "pending_review")
              .map((record) => (
                <Card key={record.id} className="border-yellow-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{record.student}</span> • {record.specialty}
                        </CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Requiere Revisión
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => {
                            setSelectedRecord(record)
                            setIsReviewDialogOpen(true)
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Revisar Ahora
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4">
            {filteredRecords
              .filter((record) => record.status === "approved")
              .map((record) => (
                <Card key={record.id} className="border-green-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{record.student}</span> • {record.specialty}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Aprobado
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                      {record.feedback && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="font-medium text-sm text-green-800">Retroalimentación:</span>
                          <p className="text-sm text-green-700 mt-1">{record.feedback}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        {selectedRecord && (
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Revisar Historia Clínica</DialogTitle>
              <DialogDescription>
                {selectedRecord.title} - {selectedRecord.student}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Patient Info */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Información del Paciente</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Nombre:</span>
                    <p className="text-muted-foreground">{selectedRecord.patient}</p>
                  </div>
                  <div>
                    <span className="font-medium">ID Paciente:</span>
                    <p className="text-muted-foreground">{selectedRecord.patientId}</p>
                  </div>
                  <div>
                    <span className="font-medium">Fecha:</span>
                    <p className="text-muted-foreground">{selectedRecord.date}</p>
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span>
                    <p className="text-muted-foreground">{selectedRecord.type}</p>
                  </div>
                </div>
              </Card>

              {/* Vitals */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Signos Vitales</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Presión Arterial:</span>
                    <p className="text-muted-foreground">{selectedRecord.vitals.bloodPressure}</p>
                  </div>
                  <div>
                    <span className="font-medium">Frecuencia Cardíaca:</span>
                    <p className="text-muted-foreground">{selectedRecord.vitals.heartRate} bpm</p>
                  </div>
                  <div>
                    <span className="font-medium">Temperatura:</span>
                    <p className="text-muted-foreground">{selectedRecord.vitals.temperature}</p>
                  </div>
                </div>
              </Card>

              {/* Clinical Info */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Información Clínica</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Diagnóstico:</span>
                    <p className="text-sm text-muted-foreground mt-1">{selectedRecord.diagnosis}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Tratamiento:</span>
                    <p className="text-sm text-muted-foreground mt-1">{selectedRecord.treatment}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Síntomas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedRecord.symptoms.map((symptom: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Medicamentos:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedRecord.medications.map((med: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Alergias:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedRecord.allergies.map((allergy: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs bg-red-50">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Notas Clínicas</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.notes}</p>
              </Card>

              {/* Review Section */}
              <Card className="p-4">
                <h4 className="font-medium mb-3">Revisión del Profesor</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estado</label>
                    <Select defaultValue={selectedRecord.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Aprobar</SelectItem>
                        <SelectItem value="needs_revision">Necesita Revisión</SelectItem>
                        <SelectItem value="pending_review">Pendiente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Retroalimentación</label>
                    <Textarea
                      placeholder="Proporciona comentarios y sugerencias para el estudiante..."
                      defaultValue={selectedRecord.feedback || ""}
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsReviewDialogOpen(false)}>Guardar Revisión</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
