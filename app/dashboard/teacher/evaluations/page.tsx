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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Search, Plus, Eye, Edit, Star, TrendingUp, Clock, CheckCircle, FileText } from "lucide-react"

interface Evaluation {
  id: string
  studentName: string
  studentId: string
  patientName: string
  treatment: string
  specialty: string
  date: string
  status: "pending" | "completed" | "revision"
  overallGrade: number
  criteria: {
    technique: number
    knowledge: number
    professionalism: number
    documentation: number
    patientCare: number
  }
  comments: string
  recommendations: string
  professor: string
  caseId: string
}

export default function TeacherEvaluationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null)

  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    {
      id: "ev1",
      studentName: "Juan Pérez",
      studentId: "st1",
      patientName: "Ana García",
      treatment: "Tratamiento de Conducto",
      specialty: "Endodoncia",
      date: "2024-01-20",
      status: "completed",
      overallGrade: 8.5,
      criteria: {
        technique: 9,
        knowledge: 8,
        professionalism: 9,
        documentation: 8,
        patientCare: 8.5,
      },
      comments: "Excelente manejo de la técnica endodóntica. Demostró conocimiento sólido del procedimiento.",
      recommendations: "Mejorar la documentación radiográfica post-operatoria.",
      professor: "Dr. Martínez",
      caseId: "cc1",
    },
    {
      id: "ev2",
      studentName: "María López",
      studentId: "st2",
      patientName: "Carlos Mendoza",
      treatment: "Limpieza Dental Profunda",
      specialty: "Periodoncia",
      date: "2024-01-18",
      status: "pending",
      overallGrade: 0,
      criteria: {
        technique: 0,
        knowledge: 0,
        professionalism: 0,
        documentation: 0,
        patientCare: 0,
      },
      comments: "",
      recommendations: "",
      professor: "Dra. López",
      caseId: "cc2",
    },
    {
      id: "ev3",
      studentName: "Carlos Rodríguez",
      studentId: "st3",
      patientName: "María Fernández",
      treatment: "Brackets Metálicos",
      specialty: "Ortodoncia",
      date: "2024-01-15",
      status: "revision",
      overallGrade: 6.5,
      criteria: {
        technique: 7,
        knowledge: 6,
        professionalism: 7,
        documentation: 6,
        patientCare: 6.5,
      },
      comments: "Técnica adecuada pero necesita reforzar conocimientos teóricos.",
      recommendations: "Revisar protocolos de cementado de brackets. Estudiar biomecánica ortodóntica.",
      professor: "Dra. Rodríguez",
      caseId: "cc3",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completada</Badge>
      case "revision":
        return <Badge className="bg-orange-100 text-orange-700">Revisión</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 8.5) return "text-green-600"
    if (grade >= 7) return "text-blue-600"
    if (grade >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeBadge = (grade: number) => {
    if (grade >= 8.5) return "bg-green-100 text-green-700"
    if (grade >= 7) return "bg-blue-100 text-blue-700"
    if (grade >= 6) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.treatment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || evaluation.status === statusFilter
    const matchesSpecialty = specialtyFilter === "all" || evaluation.specialty === specialtyFilter

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const handleSaveEvaluation = (evaluationData: Partial<Evaluation>) => {
    if (selectedEvaluation) {
      setEvaluations((prev) => prev.map((e) => (e.id === selectedEvaluation.id ? { ...e, ...evaluationData } : e)))
    }
    setIsDialogOpen(false)
    setSelectedEvaluation(null)
  }

  const calculateOverallGrade = (criteria: Evaluation["criteria"]) => {
    const values = Object.values(criteria)
    return values.reduce((sum, value) => sum + value, 0) / values.length
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Evaluaciones de Estudiantes
          </h1>
          <p className="text-blue-600 mt-2">Evalúa el desempeño clínico de tus estudiantes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-medical">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Evaluación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedEvaluation ? "Editar Evaluación" : "Nueva Evaluación"}</DialogTitle>
              <DialogDescription>Evalúa el desempeño del estudiante en el caso clínico</DialogDescription>
            </DialogHeader>
            {selectedEvaluation && (
              <EvaluationForm
                evaluation={selectedEvaluation}
                onSave={handleSaveEvaluation}
                onCancel={() => setIsDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Evaluaciones</p>
                <p className="text-2xl font-bold text-blue-800">{evaluations.length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {evaluations.filter((e) => e.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Completadas</p>
                <p className="text-2xl font-bold text-green-800">
                  {evaluations.filter((e) => e.status === "completed").length}
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
                <p className="text-sm font-medium text-purple-700">Promedio General</p>
                <p className="text-2xl font-bold text-purple-800">
                  {(
                    evaluations.filter((e) => e.status === "completed").reduce((sum, e) => sum + e.overallGrade, 0) /
                    evaluations.filter((e) => e.status === "completed").length
                  ).toFixed(1)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
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
                placeholder="Buscar evaluaciones..."
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
                <Label htmlFor="status-filter" className="text-sm text-blue-700">
                  Estado:
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="completed">Completadas</SelectItem>
                    <SelectItem value="revision">Revisión</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Evaluaciones */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-blue-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Todas las Evaluaciones
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Pendientes
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Completadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredEvaluations.map((evaluation) => (
              <Card key={evaluation.id} className="medical-card hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-blue-800">{evaluation.treatment}</CardTitle>
                      <CardDescription className="text-blue-600">
                        Estudiante: {evaluation.studentName} • Paciente: {evaluation.patientName}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(evaluation.status)}
                      {evaluation.overallGrade > 0 && (
                        <Badge className={getGradeBadge(evaluation.overallGrade)}>
                          {evaluation.overallGrade.toFixed(1)}/10
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="font-medium text-blue-700">Fecha</Label>
                        <p className="text-blue-600">{evaluation.date}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-blue-700">Especialidad</Label>
                        <p className="text-blue-600">{evaluation.specialty}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-blue-700">Profesor</Label>
                        <p className="text-blue-600">{evaluation.professor}</p>
                      </div>
                      <div>
                        <Label className="font-medium text-blue-700">Estado</Label>
                        <p className="text-blue-600">{evaluation.status}</p>
                      </div>
                    </div>

                    {evaluation.status === "completed" && (
                      <div className="space-y-3">
                        <Label className="font-medium text-blue-700">Criterios de Evaluación</Label>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          {Object.entries(evaluation.criteria).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <p className="text-xs text-blue-600 mb-1 capitalize">
                                {key === "technique"
                                  ? "Técnica"
                                  : key === "knowledge"
                                    ? "Conocimiento"
                                    : key === "professionalism"
                                      ? "Profesionalismo"
                                      : key === "documentation"
                                        ? "Documentación"
                                        : "Atención al Paciente"}
                              </p>
                              <div className={`text-lg font-bold ${getGradeColor(value)}`}>{value}/10</div>
                              <Progress value={value * 10} className="h-1 mt-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {evaluation.comments && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <Label className="font-medium text-blue-700">Comentarios</Label>
                        <p className="text-sm text-blue-600 mt-1">{evaluation.comments}</p>
                      </div>
                    )}

                    {evaluation.recommendations && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <Label className="font-medium text-orange-700">Recomendaciones</Label>
                        <p className="text-sm text-orange-600 mt-1">{evaluation.recommendations}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedEvaluation(evaluation)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => {
                          setSelectedEvaluation(evaluation)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        {evaluation.status === "pending" ? "Evaluar" : "Editar"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {filteredEvaluations
              .filter((evaluation) => evaluation.status === "pending")
              .map((evaluation) => (
                <Card key={evaluation.id} className="medical-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-blue-800">{evaluation.treatment}</CardTitle>
                        <CardDescription className="text-blue-600">
                          Estudiante: {evaluation.studentName} • Paciente: {evaluation.patientName}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">{getStatusBadge(evaluation.status)}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <Clock className="h-4 w-4 inline mr-2" />
                          Esta evaluación está pendiente de completar
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          className="btn-medical"
                          onClick={() => {
                            setSelectedEvaluation(evaluation)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Star className="h-3.5 w-3.5 mr-1" />
                          Evaluar Ahora
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {filteredEvaluations
              .filter((evaluation) => evaluation.status === "completed")
              .map((evaluation) => (
                <Card key={evaluation.id} className="medical-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-blue-800">{evaluation.treatment}</CardTitle>
                        <CardDescription className="text-blue-600">
                          Estudiante: {evaluation.studentName} • Paciente: {evaluation.patientName}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(evaluation.status)}
                        <Badge className={getGradeBadge(evaluation.overallGrade)}>
                          {evaluation.overallGrade.toFixed(1)}/10
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        {Object.entries(evaluation.criteria).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="text-xs text-blue-600 mb-1 capitalize">
                              {key === "technique"
                                ? "Técnica"
                                : key === "knowledge"
                                  ? "Conocimiento"
                                  : key === "professionalism"
                                    ? "Profesionalismo"
                                    : key === "documentation"
                                      ? "Documentación"
                                      : "Atención al Paciente"}
                            </p>
                            <div className={`text-lg font-bold ${getGradeColor(value)}`}>{value}/10</div>
                            <Progress value={value * 10} className="h-1 mt-1" />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                          onClick={() => {
                            setSelectedEvaluation(evaluation)
                            setIsDialogOpen(true)
                          }}
                        >
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          Ver Reporte
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente del formulario de evaluación
function EvaluationForm({
  evaluation,
  onSave,
  onCancel,
}: {
  evaluation: Evaluation
  onSave: (data: Partial<Evaluation>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    criteria: { ...evaluation.criteria },
    comments: evaluation.comments || "",
    recommendations: evaluation.recommendations || "",
    status: evaluation.status,
  })

  const handleCriteriaChange = (criterion: keyof Evaluation["criteria"], value: number) => {
    setFormData({
      ...formData,
      criteria: {
        ...formData.criteria,
        [criterion]: value,
      },
    })
  }

  const calculateOverallGrade = () => {
    const values = Object.values(formData.criteria)
    return values.reduce((sum, value) => sum + value, 0) / values.length
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const overallGrade = calculateOverallGrade()
    onSave({
      ...formData,
      overallGrade,
      status: "completed",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Información del Caso</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-600">Estudiante:</span>
            <span className="ml-2 font-medium text-blue-800">{evaluation.studentName}</span>
          </div>
          <div>
            <span className="text-blue-600">Paciente:</span>
            <span className="ml-2 font-medium text-blue-800">{evaluation.patientName}</span>
          </div>
          <div>
            <span className="text-blue-600">Tratamiento:</span>
            <span className="ml-2 font-medium text-blue-800">{evaluation.treatment}</span>
          </div>
          <div>
            <span className="text-blue-600">Especialidad:</span>
            <span className="ml-2 font-medium text-blue-800">{evaluation.specialty}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-blue-800">Criterios de Evaluación</h3>
        {Object.entries(formData.criteria).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-blue-700 capitalize">
                {key === "technique"
                  ? "Técnica (Habilidad práctica y destreza)"
                  : key === "knowledge"
                    ? "Conocimiento (Base teórica y aplicación)"
                    : key === "professionalism"
                      ? "Profesionalismo (Ética y comportamiento)"
                      : key === "documentation"
                        ? "Documentación (Registros y reportes)"
                        : "Atención al Paciente (Comunicación y cuidado)"}
              </Label>
              <span className="text-lg font-bold text-blue-800">{value}/10</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-blue-600">1</span>
              <Input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={value}
                onChange={(e) =>
                  handleCriteriaChange(key as keyof Evaluation["criteria"], Number.parseFloat(e.target.value))
                }
                className="flex-1"
              />
              <span className="text-sm text-blue-600">10</span>
            </div>
            <Progress value={value * 10} className="h-2" />
          </div>
        ))}
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium text-green-800">Calificación General:</span>
          <span className="text-2xl font-bold text-green-800">{calculateOverallGrade().toFixed(1)}/10</span>
        </div>
        <Progress value={calculateOverallGrade() * 10} className="h-3 mt-2" />
      </div>

      <div>
        <Label htmlFor="comments" className="text-blue-700">
          Comentarios sobre el desempeño
        </Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          placeholder="Describe el desempeño del estudiante, fortalezas observadas..."
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="recommendations" className="text-blue-700">
          Recomendaciones para mejora
        </Label>
        <Textarea
          id="recommendations"
          value={formData.recommendations}
          onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
          placeholder="Sugiere áreas de mejora, estudios adicionales, práctica recomendada..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="btn-medical">
          Guardar Evaluación
        </Button>
      </div>
    </form>
  )
}
