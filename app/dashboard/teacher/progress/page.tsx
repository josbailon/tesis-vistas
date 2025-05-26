"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  AlertTriangle,
  Calendar,
  BarChart3,
  FileText,
} from "lucide-react"

export default function TeacherProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current_semester")
  const [selectedStudent, setSelectedStudent] = useState("all")

  // Mock data for progress tracking
  const overallStats = {
    totalStudents: 12,
    averageProgress: 78,
    completedAssignments: 156,
    pendingEvaluations: 8,
    attendanceRate: 87,
  }

  const studentProgress = [
    {
      id: "s1",
      name: "Pedro Gómez",
      overallProgress: 85,
      assignmentsCompleted: 15,
      assignmentsPending: 2,
      averageGrade: 8.7,
      attendance: 95,
      trend: "up",
      lastActivity: "2025-05-20",
      strengths: ["Técnica clínica", "Documentación"],
      improvements: ["Gestión del tiempo"],
    },
    {
      id: "s2",
      name: "Laura Torres",
      overallProgress: 72,
      assignmentsCompleted: 12,
      assignmentsPending: 4,
      averageGrade: 7.8,
      attendance: 88,
      trend: "stable",
      lastActivity: "2025-05-19",
      strengths: ["Comunicación con pacientes"],
      improvements: ["Técnicas avanzadas", "Investigación"],
    },
    {
      id: "s3",
      name: "Miguel Sánchez",
      overallProgress: 91,
      assignmentsCompleted: 18,
      assignmentsPending: 1,
      averageGrade: 9.2,
      attendance: 98,
      trend: "up",
      lastActivity: "2025-05-20",
      strengths: ["Excelencia académica", "Liderazgo"],
      improvements: ["Ninguna identificada"],
    },
    {
      id: "s4",
      name: "Carmen Díaz",
      overallProgress: 58,
      assignmentsCompleted: 8,
      assignmentsPending: 6,
      averageGrade: 6.5,
      attendance: 75,
      trend: "down",
      lastActivity: "2025-05-17",
      strengths: ["Dedicación"],
      improvements: ["Asistencia", "Técnica clínica", "Entregas puntuales"],
    },
  ]

  const assignmentAnalytics = [
    {
      title: "Caso Clínico: Endodoncia Compleja",
      submitted: 8,
      total: 12,
      averageScore: 82,
      dueDate: "2025-05-30",
      status: "active",
    },
    {
      title: "Investigación: Nuevas Técnicas",
      submitted: 3,
      total: 12,
      averageScore: 0,
      dueDate: "2025-06-15",
      status: "active",
    },
    {
      title: "Evaluación Práctica: Obturación",
      submitted: 12,
      total: 12,
      averageScore: 87,
      dueDate: "2025-05-25",
      status: "completed",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-blue-600" />
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600"
    if (attendance >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seguimiento de Progreso</h1>
          <p className="text-muted-foreground">Analiza el rendimiento y progreso de tus estudiantes</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_semester">Semestre Actual</SelectItem>
              <SelectItem value="last_month">Último Mes</SelectItem>
              <SelectItem value="last_quarter">Último Trimestre</SelectItem>
              <SelectItem value="academic_year">Año Académico</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Activos en el curso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallStats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">+5% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.completedAssignments}</div>
            <p className="text-xs text-muted-foreground">En el semestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evaluaciones Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{overallStats.pendingEvaluations}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{overallStats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Del grupo</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList>
          <TabsTrigger value="students">Progreso por Estudiante</TabsTrigger>
          <TabsTrigger value="assignments">Análisis de Tareas</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento General</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4">
            {studentProgress.map((student) => (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">Última actividad: {student.lastActivity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(student.trend)}
                      <Badge
                        variant={
                          student.trend === "up" ? "default" : student.trend === "down" ? "destructive" : "secondary"
                        }
                      >
                        {student.trend === "up"
                          ? "Mejorando"
                          : student.trend === "down"
                            ? "Necesita atención"
                            : "Estable"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getProgressColor(student.overallProgress)}`}>
                          {student.overallProgress}%
                        </div>
                        <p className="text-xs text-muted-foreground">Progreso General</p>
                        <Progress value={student.overallProgress} className="mt-1" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{student.assignmentsCompleted}</div>
                        <p className="text-xs text-muted-foreground">Completadas</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{student.assignmentsPending}</div>
                        <p className="text-xs text-muted-foreground">Pendientes</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{student.averageGrade}</div>
                        <p className="text-xs text-muted-foreground">Promedio</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getAttendanceColor(student.attendance)}`}>
                          {student.attendance}%
                        </div>
                        <p className="text-xs text-muted-foreground">Asistencia</p>
                      </div>
                    </div>

                    {/* Strengths and Improvements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-green-700">Fortalezas</h4>
                        <div className="flex flex-wrap gap-1">
                          {student.strengths.map((strength, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-orange-700">Áreas de Mejora</h4>
                        <div className="flex flex-wrap gap-1">
                          {student.improvements.map((improvement, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-orange-200 text-orange-700">
                              {improvement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        Ver Perfil Completo
                      </Button>
                      <Button variant="outline" size="sm">
                        Enviar Retroalimentación
                      </Button>
                      <Button size="sm">Programar Reunión</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4">
            {assignmentAnalytics.map((assignment, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>Fecha límite: {assignment.dueDate}</CardDescription>
                    </div>
                    <Badge variant={assignment.status === "completed" ? "default" : "secondary"}>
                      {assignment.status === "completed" ? "Completada" : "Activa"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {assignment.submitted}/{assignment.total}
                        </div>
                        <p className="text-sm text-muted-foreground">Entregas Recibidas</p>
                        <Progress value={(assignment.submitted / assignment.total) * 100} className="mt-2" />
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {Math.round((assignment.submitted / assignment.total) * 100)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Tasa de Entrega</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{assignment.averageScore || "N/A"}</div>
                        <p className="text-sm text-muted-foreground">Promedio de Calificaciones</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        Ver Entregas
                      </Button>
                      <Button variant="outline" size="sm">
                        Analizar Resultados
                      </Button>
                      {assignment.status === "active" && <Button size="sm">Enviar Recordatorio</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Calificaciones</CardTitle>
                <CardDescription>Análisis del rendimiento académico general</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Excelente (9.0-10.0)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Muy Bueno (8.0-8.9)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={42} className="w-20" />
                      <span className="text-sm font-medium">42%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bueno (7.0-7.9)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Regular (6.0-6.9)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={8} className="w-20" />
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Asistencia</CardTitle>
                <CardDescription>Evolución de la asistencia a clases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">87%</div>
                    <p className="text-sm text-muted-foreground">Asistencia Promedio</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Asistencia Excelente (≥95%)</span>
                      <span className="font-medium">3 estudiantes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Asistencia Buena (85-94%)</span>
                      <span className="font-medium">6 estudiantes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Asistencia Regular (75-84%)</span>
                      <span className="font-medium">2 estudiantes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Asistencia Deficiente (&lt;75%)</span>
                      <span className="font-medium text-red-600">1 estudiante</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones de Intervención</CardTitle>
              <CardDescription>Estudiantes que requieren atención especial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentProgress
                  .filter((student) => student.overallProgress < 70 || student.attendance < 80)
                  .map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Progreso: {student.overallProgress}% | Asistencia: {student.attendance}%
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="destructive">Requiere Atención</Badge>
                        <Button size="sm">Programar Reunión</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
