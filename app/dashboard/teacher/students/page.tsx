"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  studentId: string
  semester: number
  overallProgress: number
  status: "excellent" | "good" | "needs_attention" | "at_risk"
  lastActivity: string
  pendingTasks: number
  completedTasks: number
  currentCases: number
  averageGrade: number
  attendance: number
}

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const students: Student[] = [
    {
      id: "s1",
      name: "Pedro Gómez",
      email: "pedro.gomez@uleam.edu.ec",
      studentId: "E12345",
      semester: 8,
      overallProgress: 85,
      status: "excellent",
      lastActivity: "Hace 2 horas",
      pendingTasks: 2,
      completedTasks: 15,
      currentCases: 3,
      averageGrade: 8.7,
      attendance: 95,
    },
    {
      id: "s2",
      name: "Laura Torres",
      email: "laura.torres@uleam.edu.ec",
      studentId: "E12346",
      semester: 7,
      overallProgress: 72,
      status: "good",
      lastActivity: "Hace 1 día",
      pendingTasks: 4,
      completedTasks: 12,
      currentCases: 2,
      averageGrade: 7.8,
      attendance: 88,
    },
    {
      id: "s3",
      name: "Miguel Sánchez",
      email: "miguel.sanchez@uleam.edu.ec",
      studentId: "E12347",
      semester: 9,
      overallProgress: 91,
      status: "excellent",
      lastActivity: "Hace 3 horas",
      pendingTasks: 1,
      completedTasks: 18,
      currentCases: 4,
      averageGrade: 9.2,
      attendance: 98,
    },
    {
      id: "s4",
      name: "Carmen Díaz",
      email: "carmen.diaz@uleam.edu.ec",
      studentId: "E12348",
      semester: 6,
      overallProgress: 58,
      status: "needs_attention",
      lastActivity: "Hace 3 días",
      pendingTasks: 6,
      completedTasks: 8,
      currentCases: 1,
      averageGrade: 6.5,
      attendance: 75,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-500">Excelente</Badge>
      case "good":
        return <Badge className="bg-blue-500">Bueno</Badge>
      case "needs_attention":
        return <Badge className="bg-yellow-500">Necesita Atención</Badge>
      case "at_risk":
        return <Badge className="bg-red-500">En Riesgo</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "good":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case "needs_attention":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "at_risk":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Estudiantes</h1>
          <p className="text-muted-foreground">Gestiona y supervisa el progreso de tus estudiantes</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generar Reporte
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="excellent">Excelente</SelectItem>
              <SelectItem value="good">Bueno</SelectItem>
              <SelectItem value="needs_attention">Necesita Atención</SelectItem>
              <SelectItem value="at_risk">En Riesgo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="attendance">Asistencia</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
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
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{student.studentId}</Badge>
                          <Badge variant="outline">Semestre {student.semester}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(student.status)}
                          <span className="text-sm font-medium">Progreso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={student.overallProgress} className="w-20" />
                          <span className="text-sm font-medium">{student.overallProgress}%</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Estado</p>
                        {getStatusBadge(student.status)}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Perfil
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{student.pendingTasks}</p>
                      <p className="text-xs text-muted-foreground">Tareas Pendientes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{student.completedTasks}</p>
                      <p className="text-xs text-muted-foreground">Tareas Completadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{student.currentCases}</p>
                      <p className="text-xs text-muted-foreground">Casos Activos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{student.averageGrade}</p>
                      <p className="text-xs text-muted-foreground">Promedio</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-indigo-600">{student.attendance}%</p>
                      <p className="text-xs text-muted-foreground">Asistencia</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Última actividad: {student.lastActivity}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardHeader>
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
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>Análisis de rendimiento académico</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progreso General</span>
                        <span>{student.overallProgress}%</span>
                      </div>
                      <Progress value={student.overallProgress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">{student.averageGrade}</p>
                        <p className="text-xs text-muted-foreground">Promedio General</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{student.completedTasks}</p>
                        <p className="text-xs text-muted-foreground">Tareas Completadas</p>
                      </div>
                    </div>

                    {getStatusBadge(student.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardHeader>
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
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>Control de asistencia</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 text-blue-600">{student.attendance}%</div>
                    <p className="text-sm text-muted-foreground mb-4">Asistencia General</p>
                    <Progress value={student.attendance} className="mb-4" />
                    <Badge
                      variant={
                        student.attendance >= 90 ? "default" : student.attendance >= 75 ? "secondary" : "destructive"
                      }
                    >
                      {student.attendance >= 90 ? "Excelente" : student.attendance >= 75 ? "Buena" : "Deficiente"}
                    </Badge>
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
