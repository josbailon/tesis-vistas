"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle, AlertCircle, Download, Eye, Calendar } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const mockAssignments = [
  {
    id: 1,
    title: "Caso Clínico: Tratamiento de Conducto",
    specialty: "Endodoncia",
    professor: "Dr. María Rodríguez",
    dueDate: "2024-02-15",
    status: "pending",
    description: "Análisis completo de caso clínico con radiografías y plan de tratamiento",
    points: 100,
    submittedDate: null,
    feedback: null,
  },
  {
    id: 2,
    title: "Diseño de Aparato Ortodóntico",
    specialty: "Ortodoncia",
    professor: "Dr. Carlos Mendoza",
    dueDate: "2024-02-20",
    status: "submitted",
    description: "Diseño y justificación de aparato ortodóntico para maloclusión clase II",
    points: 80,
    submittedDate: "2024-02-18",
    feedback: "Excelente trabajo, muy detallado el análisis cefalométrico",
  },
  {
    id: 3,
    title: "Protocolo Quirúrgico",
    specialty: "Cirugía Oral",
    professor: "Dr. Ana López",
    dueDate: "2024-01-30",
    status: "graded",
    description: "Elaboración de protocolo para extracción de tercer molar impactado",
    points: 95,
    submittedDate: "2024-01-28",
    feedback: "Protocolo muy completo, excelente manejo de complicaciones",
  },
  {
    id: 4,
    title: "Plan de Tratamiento Pediátrico",
    specialty: "Odontopediatría",
    professor: "Dra. Laura Vásquez",
    dueDate: "2024-02-25",
    status: "overdue",
    description: "Plan integral para paciente pediátrico con múltiples caries",
    points: 90,
    submittedDate: null,
    feedback: null,
  },
]

export default function StudentAssignmentsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")

  const getStatusBadge = (status: string, dueDate: string) => {
    const isOverdue = new Date(dueDate) < new Date() && status === "pending"

    switch (status) {
      case "pending":
        return isOverdue ? (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Vencida
          </Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "submitted":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Eye className="w-3 h-3 mr-1" />
            Enviada
          </Badge>
        )
      case "graded":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Calificada
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSpecialtyColor = (specialty: string) => {
    const colors: { [key: string]: string } = {
      Endodoncia: "from-purple-500 to-purple-600",
      Ortodoncia: "from-blue-500 to-blue-600",
      "Cirugía Oral": "from-red-500 to-red-600",
      Odontopediatría: "from-green-500 to-green-600",
      Periodoncia: "from-pink-500 to-pink-600",
    }
    return colors[specialty] || "from-gray-500 to-gray-600"
  }

  const filteredAssignments =
    selectedSpecialty === "all"
      ? mockAssignments
      : mockAssignments.filter((assignment) => assignment.specialty === selectedSpecialty)

  const specialties = ["all", ...Array.from(new Set(mockAssignments.map((a) => a.specialty)))]

  const completedAssignments = mockAssignments.filter((a) => a.status === "graded").length
  const totalAssignments = mockAssignments.length
  const progress = (completedAssignments / totalAssignments) * 100

  return (
    <div className="space-y-6 p-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mis Tareas Asignadas
        </h1>
        <p className="text-gray-600 mt-2">Gestiona tus asignaciones académicas por especialización</p>
      </div>

      {/* Resumen de progreso */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Progreso General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tareas completadas</span>
              <span className="font-medium">
                {completedAssignments}/{totalAssignments}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedAssignments}</div>
                <div className="text-xs text-gray-600">Completadas</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {mockAssignments.filter((a) => a.status === "pending").length}
                </div>
                <div className="text-xs text-gray-600">Pendientes</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {mockAssignments.filter((a) => a.status === "submitted").length}
                </div>
                <div className="text-xs text-gray-600">Enviadas</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {mockAssignments.filter((a) => new Date(a.dueDate) < new Date() && a.status === "pending").length}
                </div>
                <div className="text-xs text-gray-600">Vencidas</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {specialties.map((specialty) => (
          <Button
            key={specialty}
            variant={selectedSpecialty === specialty ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSpecialty(specialty)}
            className={selectedSpecialty === specialty ? "btn-medical" : ""}
          >
            {specialty === "all" ? "Todas" : specialty}
          </Button>
        ))}
      </div>

      {/* Lista de tareas */}
      <div className="grid gap-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="medical-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-bold text-gray-800">{assignment.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 rounded text-xs text-white bg-gradient-to-r ${getSpecialtyColor(assignment.specialty)}`}
                    >
                      {assignment.specialty}
                    </div>
                    {getStatusBadge(assignment.status, assignment.dueDate)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{assignment.points}</div>
                  <div className="text-xs text-gray-500">puntos</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{assignment.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Profesor:</span>
                  <span className="ml-2 font-medium">{assignment.professor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Fecha límite:</span>
                  <span className="ml-2 font-medium">
                    {format(new Date(assignment.dueDate), "dd/MM/yyyy", { locale: es })}
                  </span>
                </div>
              </div>

              {assignment.submittedDate && (
                <div className="text-sm">
                  <span className="text-gray-500">Enviado el:</span>
                  <span className="ml-2 font-medium text-green-600">
                    {format(new Date(assignment.submittedDate), "dd/MM/yyyy", { locale: es })}
                  </span>
                </div>
              )}

              {assignment.feedback && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 mb-1">Retroalimentación:</div>
                  <div className="text-sm text-blue-700">{assignment.feedback}</div>
                </div>
              )}

              <div className="flex gap-2">
                {assignment.status === "pending" && (
                  <Button size="sm" className="btn-medical">
                    Subir Trabajo
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Detalles
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <Card className="medical-card">
          <CardContent className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No hay tareas para esta especialización</h3>
            <p className="text-gray-500">Las nuevas asignaciones aparecerán aquí cuando sean publicadas</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
