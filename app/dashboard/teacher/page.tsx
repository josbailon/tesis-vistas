"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, BookOpen, Users, Plus } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const mockStudents = [
  {
    id: 1,
    name: "Carlos Pérez",
    specialty: "Endodoncia",
    progress: 85,
    assignments: 12,
    completed: 10,
    pending: 2,
  },
  {
    id: 2,
    name: "Ana Martínez",
    specialty: "Ortodoncia",
    progress: 92,
    assignments: 15,
    completed: 14,
    pending: 1,
  },
  {
    id: 3,
    name: "Diego López",
    specialty: "Cirugía Oral",
    progress: 78,
    assignments: 10,
    completed: 8,
    pending: 2,
  },
]

const mockAssignments = [
  {
    id: 1,
    title: "Caso Clínico: Tratamiento de Conducto",
    specialty: "Endodoncia",
    dueDate: "2024-02-15",
    submissions: 8,
    totalStudents: 12,
    status: "active",
  },
  {
    id: 2,
    title: "Análisis Cefalométrico",
    specialty: "Ortodoncia",
    dueDate: "2024-02-20",
    submissions: 5,
    totalStudents: 10,
    status: "active",
  },
]

export default function TeacherPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <ProtectedRoute allowedRoles={["professor"]}>
      <div className="space-y-6 p-6">
        <div className="fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Panel del Profesor
          </h1>
          <p className="text-blue-600 mt-2 text-lg">Gestión académica y seguimiento de estudiantes</p>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{mockStudents.length}</div>
              <p className="text-blue-500">Estudiantes Asignados</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{mockAssignments.length}</div>
              <p className="text-blue-500">Tareas Activas</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {mockAssignments.reduce((acc, curr) => acc + curr.submissions, 0)}
              </div>
              <p className="text-blue-500">Entregas Recibidas</p>
            </CardContent>
          </Card>
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {Math.round(mockStudents.reduce((acc, curr) => acc + curr.progress, 0) / mockStudents.length)}%
              </div>
              <p className="text-blue-500">Progreso Promedio</p>
            </CardContent>
          </Card>
        </div>

        {/* Navegación por pestañas */}
        <div className="flex gap-2 border-b border-blue-200">
          {[
            { id: "overview", label: "Resumen", icon: GraduationCap },
            { id: "students", label: "Estudiantes", icon: Users },
            { id: "assignments", label: "Tareas", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
                  selectedTab === tab.id ? "bg-blue-500 text-white" : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Contenido de pestañas */}
        {selectedTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-blue-700">Progreso de Estudiantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudents.map((student) => (
                    <div key={student.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-blue-700">{student.name}</span>
                        <span className="text-blue-600">{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="h-2" />
                      <div className="text-sm text-blue-500">{student.specialty}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-blue-700">Tareas Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-700">{assignment.title}</h4>
                      <div className="text-sm text-blue-600 mt-1">
                        {assignment.submissions}/{assignment.totalStudents} entregas
                      </div>
                      <div className="text-xs text-blue-500 mt-1">Vence: {assignment.dueDate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "students" && (
          <div className="grid gap-4">
            {mockStudents.map((student) => (
              <Card key={student.id} className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-700">{student.name}</h3>
                        <p className="text-blue-600">{student.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{student.progress}%</div>
                      <div className="text-sm text-blue-500">Progreso</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-green-600">{student.completed}</div>
                      <div className="text-xs text-blue-500">Completadas</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-yellow-600">{student.pending}</div>
                      <div className="text-xs text-blue-500">Pendientes</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-blue-600">{student.assignments}</div>
                      <div className="text-xs text-blue-500">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === "assignments" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-blue-700">Gestión de Tareas</h2>
              <Button className="btn-medical">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarea
              </Button>
            </div>
            <div className="grid gap-4">
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-700 mb-2">{assignment.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-blue-600">
                          <Badge className="bg-blue-100 text-blue-700">{assignment.specialty}</Badge>
                          <span>Vence: {assignment.dueDate}</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-600">Entregas recibidas</span>
                            <span className="text-blue-700">
                              {assignment.submissions}/{assignment.totalStudents}
                            </span>
                          </div>
                          <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-600">
                          Ver Entregas
                        </Button>
                        <Button size="sm" className="btn-medical">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
