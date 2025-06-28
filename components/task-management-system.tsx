"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Target,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Award,
  Edit,
  Trash2,
  Eye,
  Download,
} from "lucide-react"
import { getSpecialtyColor } from "@/lib/utils"

interface PerformanceTask {
  id: string
  title: string
  description: string
  specialty: string
  type: "extraction" | "filling" | "cleaning" | "endodontics" | "surgery" | "orthodontics" | "prosthetics"
  targetQuantity: number
  currentQuantity: number
  difficulty: "beginner" | "intermediate" | "advanced"
  points: number
  deadline: string
  status: "active" | "completed" | "overdue" | "cancelled"
  assignedStudents: string[]
  criteria: TaskCriteria[]
  createdBy: string
  createdAt: string
  completedAt?: string
}

interface TaskCriteria {
  id: string
  name: string
  description: string
  weight: number // Percentage of total grade
  maxScore: number
  evaluationType: "numeric" | "boolean" | "scale"
}

interface StudentProgress {
  studentId: string
  studentName: string
  taskId: string
  currentQuantity: number
  completedProcedures: CompletedProcedure[]
  overallScore: number
  status: "not_started" | "in_progress" | "completed" | "needs_review"
  lastUpdate: string
}

interface CompletedProcedure {
  id: string
  date: string
  patientId: string
  description: string
  scores: Record<string, number>
  supervisorId?: string
  approved: boolean
  notes?: string
  images?: string[]
}

export function TaskManagementSystem() {
  const [tasks, setTasks] = useState<PerformanceTask[]>([
    {
      id: "task1",
      title: "Extracciones Simples",
      description: "Realizar 5 extracciones simples de dientes unirradiculares",
      specialty: "cirugia",
      type: "extraction",
      targetQuantity: 5,
      currentQuantity: 0,
      difficulty: "beginner",
      points: 50,
      deadline: "2024-03-15",
      status: "active",
      assignedStudents: ["est1", "est2", "est3"],
      criteria: [
        {
          id: "c1",
          name: "Técnica Quirúrgica",
          description: "Aplicación correcta de la técnica de extracción",
          weight: 40,
          maxScore: 10,
          evaluationType: "scale",
        },
        {
          id: "c2",
          name: "Manejo del Paciente",
          description: "Comunicación y manejo adecuado del paciente",
          weight: 30,
          maxScore: 10,
          evaluationType: "scale",
        },
        {
          id: "c3",
          name: "Tiempo de Procedimiento",
          description: "Completar el procedimiento en tiempo adecuado",
          weight: 20,
          maxScore: 10,
          evaluationType: "numeric",
        },
        {
          id: "c4",
          name: "Complicaciones",
          description: "Manejo de complicaciones durante el procedimiento",
          weight: 10,
          maxScore: 10,
          evaluationType: "boolean",
        },
      ],
      createdBy: "prof1",
      createdAt: "2024-01-15",
    },
    {
      id: "task2",
      title: "Restauraciones Posteriores",
      description: "Completar 8 restauraciones con resina compuesta en dientes posteriores",
      specialty: "endodoncia",
      type: "filling",
      targetQuantity: 8,
      currentQuantity: 0,
      difficulty: "intermediate",
      points: 80,
      deadline: "2024-04-01",
      status: "active",
      assignedStudents: ["est1", "est4"],
      criteria: [
        {
          id: "c5",
          name: "Preparación Cavitaria",
          description: "Diseño y preparación adecuada de la cavidad",
          weight: 35,
          maxScore: 10,
          evaluationType: "scale",
        },
        {
          id: "c6",
          name: "Técnica de Restauración",
          description: "Aplicación correcta de la técnica restaurativa",
          weight: 35,
          maxScore: 10,
          evaluationType: "scale",
        },
        {
          id: "c7",
          name: "Anatomía y Oclusión",
          description: "Reproducción correcta de anatomía y oclusión",
          weight: 30,
          maxScore: 10,
          evaluationType: "scale",
        },
      ],
      createdBy: "prof1",
      createdAt: "2024-01-20",
    },
  ])

  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([
    {
      studentId: "est1",
      studentName: "Juan Pérez",
      taskId: "task1",
      currentQuantity: 2,
      completedProcedures: [
        {
          id: "proc1",
          date: "2024-01-25",
          patientId: "pac1",
          description: "Extracción de premolar superior derecho",
          scores: { c1: 8, c2: 9, c3: 7, c4: 10 },
          supervisorId: "prof1",
          approved: true,
          notes: "Excelente técnica, paciente bien manejado",
        },
        {
          id: "proc2",
          date: "2024-01-28",
          patientId: "pac2",
          description: "Extracción de incisivo inferior",
          scores: { c1: 9, c2: 8, c3: 8, c4: 10 },
          supervisorId: "prof1",
          approved: true,
          notes: "Mejora en el tiempo de procedimiento",
        },
      ],
      overallScore: 8.5,
      status: "in_progress",
      lastUpdate: "2024-01-28",
    },
  ])

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<PerformanceTask | null>(null)
  const [newTask, setNewTask] = useState<Partial<PerformanceTask>>({
    title: "",
    description: "",
    specialty: "",
    type: "extraction",
    targetQuantity: 1,
    difficulty: "beginner",
    points: 10,
    deadline: "",
    assignedStudents: [],
    criteria: [],
  })

  const { toast } = useToast()

  const taskTypes = [
    { value: "extraction", label: "Extracciones", icon: "🦷" },
    { value: "filling", label: "Restauraciones", icon: "🔧" },
    { value: "cleaning", label: "Limpiezas", icon: "✨" },
    { value: "endodontics", label: "Endodoncias", icon: "🔬" },
    { value: "surgery", label: "Cirugías", icon: "⚕️" },
    { value: "orthodontics", label: "Ortodoncia", icon: "📐" },
    { value: "prosthetics", label: "Prótesis", icon: "🦷" },
  ]

  const difficultyLevels = [
    { value: "beginner", label: "Principiante", color: "bg-green-100 text-green-800", points: 10 },
    { value: "intermediate", label: "Intermedio", color: "bg-yellow-100 text-yellow-800", points: 20 },
    { value: "advanced", label: "Avanzado", color: "bg-red-100 text-red-800", points: 30 },
  ]

  const students = [
    { id: "est1", name: "Juan Pérez", specialty: "endodoncia", semester: 8 },
    { id: "est2", name: "María González", specialty: "ortodoncia", semester: 7 },
    { id: "est3", name: "Carlos López", specialty: "cirugia", semester: 9 },
    { id: "est4", name: "Ana Rodríguez", specialty: "endodoncia", semester: 8 },
  ]

  const handleCreateTask = useCallback(() => {
    if (!newTask.title || !newTask.specialty || !newTask.deadline) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    const task: PerformanceTask = {
      id: `task_${Date.now()}`,
      title: newTask.title!,
      description: newTask.description || "",
      specialty: newTask.specialty!,
      type: newTask.type!,
      targetQuantity: newTask.targetQuantity || 1,
      currentQuantity: 0,
      difficulty: newTask.difficulty!,
      points: newTask.points || 10,
      deadline: newTask.deadline!,
      status: "active",
      assignedStudents: newTask.assignedStudents || [],
      criteria: newTask.criteria || [],
      createdBy: "prof1", // Current professor
      createdAt: new Date().toISOString(),
    }

    setTasks((prev) => [...prev, task])
    setIsCreateTaskOpen(false)
    setNewTask({
      title: "",
      description: "",
      specialty: "",
      type: "extraction",
      targetQuantity: 1,
      difficulty: "beginner",
      points: 10,
      deadline: "",
      assignedStudents: [],
      criteria: [],
    })

    toast({
      title: "Tarea creada",
      description: `La tarea "${task.title}" ha sido creada exitosamente`,
    })
  }, [newTask, toast])

  const getTaskProgress = (task: PerformanceTask) => {
    const assignedStudents = studentProgress.filter((sp) => sp.taskId === task.id)
    if (assignedStudents.length === 0) return 0

    const totalProgress = assignedStudents.reduce((sum, student) => {
      return sum + (student.currentQuantity / task.targetQuantity) * 100
    }, 0)

    return Math.min(totalProgress / assignedStudents.length, 100)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const addCriterion = () => {
    const newCriterion: TaskCriteria = {
      id: `criteria_${Date.now()}`,
      name: "",
      description: "",
      weight: 25,
      maxScore: 10,
      evaluationType: "scale",
    }
    setNewTask((prev) => ({
      ...prev,
      criteria: [...(prev.criteria || []), newCriterion],
    }))
  }

  const updateCriterion = (index: number, field: keyof TaskCriteria, value: any) => {
    setNewTask((prev) => ({
      ...prev,
      criteria: prev.criteria?.map((criterion, i) => (i === index ? { ...criterion, [field]: value } : criterion)),
    }))
  }

  const removeCriterion = (index: number) => {
    setNewTask((prev) => ({
      ...prev,
      criteria: prev.criteria?.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sistema de Tareas por Rendimiento</h1>
          <p className="text-muted-foreground">
            Crea y gestiona tareas basadas en objetivos cuantitativos para tus estudiantes
          </p>
        </div>
        <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea por Rendimiento</DialogTitle>
              <DialogDescription>
                Define objetivos cuantitativos y criterios de evaluación para tus estudiantes
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la Tarea *</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Ej: Extracciones Simples"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad *</Label>
                    <Select
                      value={newTask.specialty}
                      onValueChange={(value) => setNewTask({ ...newTask, specialty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="endodoncia">Endodoncia</SelectItem>
                        <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                        <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                        <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                        <SelectItem value="periodoncia">Periodoncia</SelectItem>
                        <SelectItem value="protesis">Prótesis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Describe los objetivos y requisitos de la tarea..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Procedimiento</Label>
                    <Select
                      value={newTask.type}
                      onValueChange={(value: any) => setNewTask({ ...newTask, type: value })}
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
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad Objetivo *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newTask.targetQuantity}
                      onChange={(e) => setNewTask({ ...newTask, targetQuantity: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Fecha Límite *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Nivel de Dificultad</Label>
                    <Select
                      value={newTask.difficulty}
                      onValueChange={(value: any) => setNewTask({ ...newTask, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar dificultad" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center gap-2">
                              <Badge className={level.color}>{level.label}</Badge>
                              <span className="text-sm">({level.points} pts base)</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Puntos por Procedimiento</Label>
                    <Input
                      id="points"
                      type="number"
                      min="1"
                      value={newTask.points}
                      onChange={(e) => setNewTask({ ...newTask, points: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Student Assignment */}
              <div className="space-y-4">
                <Label>Estudiantes Asignados</Label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {students
                    .filter((student) => !newTask.specialty || student.specialty === newTask.specialty)
                    .map((student) => (
                      <div key={student.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={student.id}
                          checked={newTask.assignedStudents?.includes(student.id)}
                          onCheckedChange={(checked) => {
                            const currentStudents = newTask.assignedStudents || []
                            const newStudents = checked
                              ? [...currentStudents, student.id]
                              : currentStudents.filter((id) => id !== student.id)
                            setNewTask({ ...newTask, assignedStudents: newStudents })
                          }}
                        />
                        <Label htmlFor={student.id} className="text-sm">
                          {student.name} ({student.semester}° sem)
                        </Label>
                      </div>
                    ))}
                </div>
              </div>

              {/* Evaluation Criteria */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Criterios de Evaluación</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addCriterion}>
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar Criterio
                  </Button>
                </div>

                <div className="space-y-3">
                  {newTask.criteria?.map((criterion, index) => (
                    <Card key={criterion.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-2 gap-3 flex-1">
                            <div className="space-y-1">
                              <Label className="text-xs">Nombre del Criterio</Label>
                              <Input
                                value={criterion.name}
                                onChange={(e) => updateCriterion(index, "name", e.target.value)}
                                placeholder="Ej: Técnica Quirúrgica"
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Peso (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={criterion.weight}
                                onChange={(e) => updateCriterion(index, "weight", Number.parseInt(e.target.value))}
                                className="text-sm"
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCriterion(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Descripción</Label>
                          <Textarea
                            value={criterion.description}
                            onChange={(e) => updateCriterion(index, "description", e.target.value)}
                            placeholder="Describe qué se evalúa en este criterio..."
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Puntuación Máxima</Label>
                            <Input
                              type="number"
                              min="1"
                              value={criterion.maxScore}
                              onChange={(e) => updateCriterion(index, "maxScore", Number.parseInt(e.target.value))}
                              className="text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Tipo de Evaluación</Label>
                            <Select
                              value={criterion.evaluationType}
                              onValueChange={(value: any) => updateCriterion(index, "evaluationType", value)}
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="scale">Escala (1-10)</SelectItem>
                                <SelectItem value="numeric">Numérico</SelectItem>
                                <SelectItem value="boolean">Sí/No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {newTask.criteria && newTask.criteria.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Total de pesos:</strong> {newTask.criteria.reduce((sum, c) => sum + c.weight, 0)}%
                      {newTask.criteria.reduce((sum, c) => sum + c.weight, 0) !== 100 && (
                        <span className="text-red-600 ml-2">⚠️ Debe sumar 100%</span>
                      )}
                    </p>
                  </div>
                )}
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

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter((t) => t.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">En progreso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Asignados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(tasks.flatMap((t) => t.assignedStudents)).size}</div>
            <p className="text-xs text-muted-foreground">Únicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(tasks.reduce((sum, task) => sum + getTaskProgress(task), 0) / tasks.length || 0)}%
            </div>
            <p className="text-xs text-muted-foreground">De todas las tareas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Totales</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.reduce((sum, task) => sum + task.points * task.targetQuantity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {tasks
              .filter((task) => task.status === "active")
              .map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <Badge className={getSpecialtyColor(task.specialty)}>{task.specialty}</Badge>
                          <Badge className={difficultyLevels.find((d) => d.value === task.difficulty)?.color}>
                            {difficultyLevels.find((d) => d.value === task.difficulty)?.label}
                          </Badge>
                        </div>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === "active" ? "Activa" : task.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Task Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{task.targetQuantity}</div>
                          <p className="text-xs text-muted-foreground">Objetivo</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{task.assignedStudents.length}</div>
                          <p className="text-xs text-muted-foreground">Estudiantes</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{task.points}</div>
                          <p className="text-xs text-muted-foreground">Puntos/Proc.</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{Math.round(getTaskProgress(task))}%</div>
                          <p className="text-xs text-muted-foreground">Progreso</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progreso General</span>
                          <span>{Math.round(getTaskProgress(task))}%</span>
                        </div>
                        <Progress value={getTaskProgress(task)} className="h-2" />
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Fecha límite: {new Date(task.deadline).toLocaleDateString("es-ES")}</span>
                        {new Date(task.deadline) < new Date() && (
                          <Badge variant="destructive" className="ml-2">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Vencida
                          </Badge>
                        )}
                      </div>

                      {/* Criteria Summary */}
                      {task.criteria.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Criterios de Evaluación:</Label>
                          <div className="flex flex-wrap gap-2">
                            {task.criteria.map((criterion) => (
                              <Badge key={criterion.id} variant="outline" className="text-xs">
                                {criterion.name} ({criterion.weight}%)
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm" onClick={() => setSelectedTask(task)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Reporte
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay tareas completadas aún</p>
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge className={getSpecialtyColor(task.specialty)}>{task.specialty}</Badge>
                        <Badge className={difficultyLevels.find((d) => d.value === task.difficulty)?.color}>
                          {difficultyLevels.find((d) => d.value === task.difficulty)?.label}
                        </Badge>
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status === "active" ? "Activa" : task.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{task.targetQuantity}</div>
                        <p className="text-xs text-muted-foreground">Objetivo</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{task.assignedStudents.length}</div>
                        <p className="text-xs text-muted-foreground">Estudiantes</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{task.points}</div>
                        <p className="text-xs text-muted-foreground">Puntos/Proc.</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{Math.round(getTaskProgress(task))}%</div>
                        <p className="text-xs text-muted-foreground">Progreso</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm" onClick={() => setSelectedTask(task)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Reporte
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {selectedTask.title}
              </DialogTitle>
              <DialogDescription>Detalles completos de la tarea y progreso de estudiantes</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Task Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información de la Tarea</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Especialidad</Label>
                      <p className="text-sm">{selectedTask.specialty}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tipo</Label>
                      <p className="text-sm">{taskTypes.find((t) => t.value === selectedTask.type)?.label}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Cantidad Objetivo</Label>
                      <p className="text-sm">{selectedTask.targetQuantity} procedimientos</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Puntos por Procedimiento</Label>
                      <p className="text-sm">{selectedTask.points} puntos</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Fecha Límite</Label>
                      <p className="text-sm">{new Date(selectedTask.deadline).toLocaleDateString("es-ES")}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Estado</Label>
                      <Badge className={getStatusColor(selectedTask.status)}>
                        {selectedTask.status === "active" ? "Activa" : selectedTask.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Descripción</Label>
                    <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Evaluation Criteria */}
              {selectedTask.criteria.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Criterios de Evaluación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedTask.criteria.map((criterion) => (
                        <div key={criterion.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{criterion.name}</h4>
                            <Badge variant="outline">{criterion.weight}%</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{criterion.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Puntuación máxima: {criterion.maxScore}</span>
                            <span>Tipo: {criterion.evaluationType}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Student Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progreso de Estudiantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentProgress
                      .filter((sp) => sp.taskId === selectedTask.id)
                      .map((progress) => (
                        <div key={progress.studentId} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{progress.studentName}</h4>
                              <p className="text-sm text-muted-foreground">
                                Progreso: {progress.currentQuantity}/{selectedTask.targetQuantity} procedimientos
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">{progress.overallScore.toFixed(1)}</div>
                              <p className="text-xs text-muted-foreground">Puntuación</p>
                            </div>
                          </div>
                          <Progress
                            value={(progress.currentQuantity / selectedTask.targetQuantity) * 100}
                            className="h-2 mb-3"
                          />
                          <div className="space-y-2">
                            {progress.completedProcedures.map((procedure) => (
                              <div key={procedure.id} className="text-xs p-2 bg-gray-50 rounded">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{procedure.description}</span>
                                  <span className="text-muted-foreground">
                                    {new Date(procedure.date).toLocaleDateString("es-ES")}
                                  </span>
                                </div>
                                {procedure.notes && <p className="text-muted-foreground mt-1">{procedure.notes}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedTask(null)}>
                Cerrar
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-1" />
                Exportar Reporte
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
