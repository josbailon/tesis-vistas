"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Plus, Target, Users, CheckCircle, Clock, AlertCircle, FileText, Award, TrendingUp } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  type: "extraction" | "filling" | "cleaning" | "root_canal" | "orthodontic" | "surgery" | "consultation"
  specialty: string
  targetQuantity: number
  currentProgress: number
  deadline: string
  assignedStudents: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  points: number
  requirements: string[]
  evaluationCriteria: string[]
  status: "active" | "completed" | "overdue" | "draft"
  createdBy: string
  createdAt: string
}

interface Student {
  id: string
  name: string
  specialty: string
  semester: number
  currentTasks: string[]
  completedTasks: number
  totalPoints: number
}

export function TaskManagementSystem() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    type: "extraction",
    specialty: "cirugia",
    targetQuantity: 5,
    difficulty: "beginner",
    points: 10,
    requirements: [],
    evaluationCriteria: [],
  })

  const tasks: Task[] = [
    {
      id: "t1",
      title: "Extracciones Simples",
      description: "Realizar 5 extracciones simples de dientes anteriores bajo supervisión",
      type: "extraction",
      specialty: "cirugia",
      targetQuantity: 5,
      currentProgress: 3,
      deadline: "2025-06-30",
      assignedStudents: ["s1", "s2", "s3"],
      difficulty: "beginner",
      points: 15,
      requirements: [
        "Conocimiento básico de anatomía dental",
        "Técnicas de anestesia local",
        "Manejo de instrumental quirúrgico básico",
      ],
      evaluationCriteria: [
        "Técnica de anestesia (20%)",
        "Técnica de extracción (40%)",
        "Manejo de complicaciones (20%)",
        "Cuidados postoperatorios (20%)",
      ],
      status: "active",
      createdBy: "pr4",
      createdAt: "2025-05-01",
    },
    {
      id: "t2",
      title: "Tratamientos de Conducto",
      description: "Completar 3 tratamientos de conducto en molares posteriores",
      type: "root_canal",
      specialty: "endodoncia",
      targetQuantity: 3,
      currentProgress: 1,
      deadline: "2025-07-15",
      assignedStudents: ["s1", "s4"],
      difficulty: "intermediate",
      points: 25,
      requirements: [
        "Conocimiento de anatomía pulpar",
        "Técnicas de instrumentación",
        "Manejo de materiales de obturación",
      ],
      evaluationCriteria: [
        "Acceso endodóntico (25%)",
        "Instrumentación (30%)",
        "Obturación (25%)",
        "Control radiográfico (20%)",
      ],
      status: "active",
      createdBy: "pr1",
      createdAt: "2025-05-05",
    },
    {
      id: "t3",
      title: "Limpiezas Dentales Profundas",
      description: "Realizar 10 limpiezas dentales con técnica de ultrasonido",
      type: "cleaning",
      specialty: "periodoncia",
      targetQuantity: 10,
      currentProgress: 7,
      deadline: "2025-06-15",
      assignedStudents: ["s2", "s3", "s5"],
      difficulty: "beginner",
      points: 10,
      requirements: ["Conocimiento de técnicas de profilaxis", "Manejo de ultrasonido dental", "Técnicas de pulido"],
      evaluationCriteria: [
        "Técnica de instrumentación (30%)",
        "Remoción de cálculo (30%)",
        "Pulido final (20%)",
        "Instrucciones al paciente (20%)",
      ],
      status: "active",
      createdBy: "pr3",
      createdAt: "2025-04-20",
    },
  ]

  const students: Student[] = [
    {
      id: "s1",
      name: "Pedro Gómez",
      specialty: "endodoncia",
      semester: 8,
      currentTasks: ["t1", "t2"],
      completedTasks: 12,
      totalPoints: 180,
    },
    {
      id: "s2",
      name: "Laura Torres",
      specialty: "ortodoncia",
      semester: 7,
      currentTasks: ["t1", "t3"],
      completedTasks: 8,
      totalPoints: 120,
    },
    {
      id: "s3",
      name: "Miguel Sánchez",
      specialty: "periodoncia",
      semester: 9,
      currentTasks: ["t1", "t3"],
      completedTasks: 15,
      totalPoints: 225,
    },
  ]

  const taskTypes = [
    { value: "extraction", label: "Extracción", icon: "🦷" },
    { value: "filling", label: "Obturación", icon: "🔧" },
    { value: "cleaning", label: "Limpieza", icon: "✨" },
    { value: "root_canal", label: "Endodoncia", icon: "🔬" },
    { value: "orthodontic", label: "Ortodoncia", icon: "📐" },
    { value: "surgery", label: "Cirugía", icon: "⚕️" },
    { value: "consultation", label: "Consulta", icon: "💬" },
  ]

  const specialties = [
    { value: "endodoncia", label: "Endodoncia" },
    { value: "ortodoncia", label: "Ortodoncia" },
    { value: "cirugia", label: "Cirugía Oral" },
    { value: "odontopediatria", label: "Odontopediatría" },
    { value: "periodoncia", label: "Periodoncia" },
    { value: "protesis", label: "Prótesis" },
  ]

  const getTaskTypeIcon = (type: string) => {
    const taskType = taskTypes.find((t) => t.value === type)
    return taskType?.icon || "📋"
  }

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100
    if (percentage >= 100) return "text-green-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Activa
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completada
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Vencida
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <FileText className="h-3 w-3 mr-1" />
            Borrador
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Principiante
          </Badge>
        )
      case "intermediate":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            Intermedio
          </Badge>
        )
      case "advanced":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            Avanzado
          </Badge>
        )
      default:
        return <Badge variant="outline">{difficulty}</Badge>
    }
  }

  const handleCreateTask = () => {
    // Lógica para crear nueva tarea
    console.log("Creando nueva tarea:", newTask)
    setIsCreateTaskOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sistema de Tareas por Rendimiento</h1>
          <p className="text-muted-foreground">Gestiona tareas académicas basadas en cantidad y calidad</p>
        </div>
        <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea por Rendimiento</DialogTitle>
              <DialogDescription>
                Define una tarea con objetivos cuantitativos específicos para los estudiantes
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la Tarea</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Extracciones Simples"
                    value={newTask.title || ""}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Procedimiento</Label>
                  <Select
                    value={newTask.type}
                    onValueChange={(value) => setNewTask({ ...newTask, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad</Label>
                  <Select
                    value={newTask.specialty}
                    onValueChange={(value) => setNewTask({ ...newTask, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.value} value={specialty.value}>
                          {specialty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Nivel de Dificultad</Label>
                  <Select
                    value={newTask.difficulty}
                    onValueChange={(value) => setNewTask({ ...newTask, difficulty: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar dificultad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad Objetivo</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={newTask.targetQuantity || 1}
                    onChange={(e) => setNewTask({ ...newTask, targetQuantity: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Puntos por Tarea</Label>
                  <Input
                    id="points"
                    type="number"
                    min="1"
                    value={newTask.points || 10}
                    onChange={(e) => setNewTask({ ...newTask, points: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Fecha Límite</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newTask.deadline || ""}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción Detallada</Label>
                <Textarea
                  id="description"
                  placeholder="Describe los objetivos específicos y metodología de la tarea..."
                  value={newTask.description || ""}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Requisitos Previos</Label>
                <Textarea
                  placeholder="Lista los conocimientos y habilidades requeridas (uno por línea)"
                  onChange={(e) =>
                    setNewTask({ ...newTask, requirements: e.target.value.split("\n").filter((r) => r.trim()) })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Criterios de Evaluación</Label>
                <Textarea
                  placeholder="Define los criterios de evaluación con porcentajes (uno por línea)"
                  onChange={(e) =>
                    setNewTask({ ...newTask, evaluationCriteria: e.target.value.split("\n").filter((c) => c.trim()) })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateTask}>Crear Tarea</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter((t) => t.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Participando</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                tasks.reduce((acc, task) => acc + (task.currentProgress / task.targetQuantity) * 100, 0) / tasks.length,
              )}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Totales</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.reduce((acc, student) => acc + student.totalPoints, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Gestión */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getTaskTypeIcon(task.type)}</span>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        {getStatusBadge(task.status)}
                        {getDifficultyBadge(task.difficulty)}
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Puntos</div>
                      <div className="text-2xl font-bold text-primary">{task.points}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progreso */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span className={getProgressColor(task.currentProgress, task.targetQuantity)}>
                          {task.currentProgress}/{task.targetQuantity} (
                          {Math.round((task.currentProgress / task.targetQuantity) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(task.currentProgress / task.targetQuantity) * 100} className="h-2" />
                    </div>

                    {/* Información de la tarea */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Especialidad:</span>
                        <p className="text-muted-foreground capitalize">{task.specialty}</p>
                      </div>
                      <div>
                        <span className="font-medium">Fecha límite:</span>
                        <p className="text-muted-foreground">{new Date(task.deadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Estudiantes:</span>
                        <p className="text-muted-foreground">{task.assignedStudents.length} asignados</p>
                      </div>
                      <div>
                        <span className="font-medium">Creada:</span>
                        <p className="text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Requisitos */}
                    {task.requirements.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Requisitos:</span>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          {task.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Criterios de evaluación */}
                    {task.evaluationCriteria.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Criterios de Evaluación:</span>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          {task.evaluationCriteria.map((criteria, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button size="sm">Ver Progreso</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4">
            {students.map((student) => (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>
                        {student.specialty} • {student.semester}° Semestre
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Puntos Totales</div>
                      <div className="text-2xl font-bold text-primary">{student.totalPoints}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{student.currentTasks.length}</div>
                      <p className="text-sm text-muted-foreground">Tareas Activas</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{student.completedTasks}</div>
                      <p className="text-sm text-muted-foreground">Tareas Completadas</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {student.completedTasks > 0 ? Math.round(student.totalPoints / student.completedTasks) : 0}
                      </div>
                      <p className="text-sm text-muted-foreground">Puntos Promedio</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="font-medium text-sm">Tareas Actuales:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {student.currentTasks.map((taskId) => {
                        const task = tasks.find((t) => t.id === taskId)
                        return task ? (
                          <Badge key={taskId} variant="outline" className="gap-1">
                            {getTaskTypeIcon(task.type)} {task.title}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Especialidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specialties.map((specialty) => {
                    const specialtyTasks = tasks.filter((t) => t.specialty === specialty.value)
                    const avgProgress =
                      specialtyTasks.length > 0
                        ? specialtyTasks.reduce(
                            (acc, task) => acc + (task.currentProgress / task.targetQuantity) * 100,
                            0,
                          ) / specialtyTasks.length
                        : 0

                    return (
                      <div key={specialty.value} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{specialty.label}</span>
                          <span>{Math.round(avgProgress)}%</span>
                        </div>
                        <Progress value={avgProgress} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Dificultad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["beginner", "intermediate", "advanced"].map((difficulty) => {
                    const difficultyTasks = tasks.filter((t) => t.difficulty === difficulty)
                    const percentage = (difficultyTasks.length / tasks.length) * 100

                    return (
                      <div key={difficulty} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium capitalize">{difficulty}</span>
                          <span>
                            {difficultyTasks.length} tareas ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
