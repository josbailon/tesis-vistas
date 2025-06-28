"use client"

import type React from "react"

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
  Upload,
  FileText,
  Clock,
  Star,
  AlertCircle,
  X,
  Paperclip,
} from "lucide-react"
import { getSpecialtyColor } from "@/lib/utils"

interface TaskAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: string
}

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
  attachments: TaskAttachment[]
  instructions: string
  resources: string[]
  estimatedHours: number
  priority: "low" | "medium" | "high"
  tags: string[]
  createdBy: string
  createdAt: string
  completedAt?: string
}

interface TaskCriteria {
  id: string
  name: string
  description: string
  weight: number
  maxScore: number
  evaluationType: "numeric" | "boolean" | "scale"
  required: boolean
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
      description: "Realizar 5 extracciones simples de dientes unirradiculares bajo supervisión",
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
          required: true,
        },
        {
          id: "c2",
          name: "Manejo del Paciente",
          description: "Comunicación y manejo adecuado del paciente",
          weight: 30,
          maxScore: 10,
          evaluationType: "scale",
          required: true,
        },
        {
          id: "c3",
          name: "Tiempo de Procedimiento",
          description: "Completar el procedimiento en tiempo adecuado",
          weight: 20,
          maxScore: 10,
          evaluationType: "numeric",
          required: false,
        },
        {
          id: "c4",
          name: "Complicaciones",
          description: "Manejo de complicaciones durante el procedimiento",
          weight: 10,
          maxScore: 10,
          evaluationType: "boolean",
          required: false,
        },
      ],
      attachments: [],
      instructions: "Los estudiantes deben completar 5 extracciones simples siguiendo el protocolo establecido.",
      resources: ["Manual de Cirugía Oral", "Videos demostrativos", "Protocolo de esterilización"],
      estimatedHours: 15,
      priority: "medium",
      tags: ["cirugía", "básico", "supervisado"],
      createdBy: "prof1",
      createdAt: "2024-01-15",
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
    attachments: [],
    instructions: "",
    resources: [],
    estimatedHours: 1,
    priority: "medium",
    tags: [],
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [uploadingFile, setUploadingFile] = useState(false)

  const { toast } = useToast()

  const taskTypes = [
    { value: "extraction", label: "Extracciones", icon: "🦷", description: "Procedimientos de extracción dental" },
    { value: "filling", label: "Restauraciones", icon: "🔧", description: "Obturaciones y restauraciones" },
    { value: "cleaning", label: "Limpiezas", icon: "✨", description: "Profilaxis y limpiezas dentales" },
    { value: "endodontics", label: "Endodoncias", icon: "🔬", description: "Tratamientos de conducto" },
    { value: "surgery", label: "Cirugías", icon: "⚕️", description: "Procedimientos quirúrgicos" },
    { value: "orthodontics", label: "Ortodoncia", icon: "📐", description: "Tratamientos ortodónticos" },
    { value: "prosthetics", label: "Prótesis", icon: "🦷", description: "Prótesis dentales" },
  ]

  const difficultyLevels = [
    {
      value: "beginner",
      label: "Principiante",
      color: "bg-green-100 text-green-800",
      points: 10,
      description: "Para estudiantes de primeros semestres",
    },
    {
      value: "intermediate",
      label: "Intermedio",
      color: "bg-yellow-100 text-yellow-800",
      points: 20,
      description: "Para estudiantes de semestres medios",
    },
    {
      value: "advanced",
      label: "Avanzado",
      color: "bg-red-100 text-red-800",
      points: 30,
      description: "Para estudiantes avanzados",
    },
  ]

  const priorityLevels = [
    { value: "low", label: "Baja", color: "bg-gray-100 text-gray-800", icon: "📋" },
    { value: "medium", label: "Media", color: "bg-blue-100 text-blue-800", icon: "📌" },
    { value: "high", label: "Alta", color: "bg-red-100 text-red-800", icon: "🚨" },
  ]

  const students = [
    { id: "est1", name: "Juan Pérez", specialty: "endodoncia", semester: 8, email: "juan.perez@uleam.edu.ec" },
    { id: "est2", name: "María González", specialty: "ortodoncia", semester: 7, email: "maria.gonzalez@uleam.edu.ec" },
    { id: "est3", name: "Carlos López", specialty: "cirugia", semester: 9, email: "carlos.lopez@uleam.edu.ec" },
    { id: "est4", name: "Ana Rodríguez", specialty: "endodoncia", semester: 8, email: "ana.rodriguez@uleam.edu.ec" },
  ]

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}

    if (!newTask.title?.trim()) {
      errors.title = "El título es obligatorio"
    } else if (newTask.title.length < 3) {
      errors.title = "El título debe tener al menos 3 caracteres"
    }

    if (!newTask.description?.trim()) {
      errors.description = "La descripción es obligatoria"
    } else if (newTask.description.length < 10) {
      errors.description = "La descripción debe tener al menos 10 caracteres"
    }

    if (!newTask.specialty) {
      errors.specialty = "La especialidad es obligatoria"
    }

    if (!newTask.deadline) {
      errors.deadline = "La fecha límite es obligatoria"
    } else {
      const deadlineDate = new Date(newTask.deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (deadlineDate <= today) {
        errors.deadline = "La fecha límite debe ser futura"
      }
    }

    if (!newTask.targetQuantity || newTask.targetQuantity < 1) {
      errors.targetQuantity = "La cantidad objetivo debe ser mayor a 0"
    }

    if (!newTask.estimatedHours || newTask.estimatedHours < 0.5) {
      errors.estimatedHours = "Las horas estimadas deben ser al menos 0.5"
    }

    if (!newTask.assignedStudents?.length) {
      errors.assignedStudents = "Debe asignar al menos un estudiante"
    }

    if (newTask.criteria && newTask.criteria.length > 0) {
      const totalWeight = newTask.criteria.reduce((sum, c) => sum + c.weight, 0)
      if (Math.abs(totalWeight - 100) > 0.1) {
        errors.criteria = "Los pesos de los criterios deben sumar exactamente 100%"
      }

      const hasEmptyCriteria = newTask.criteria.some((c) => !c.name.trim() || !c.description.trim())
      if (hasEmptyCriteria) {
        errors.criteria = "Todos los criterios deben tener nombre y descripción"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [newTask])

  const handleCreateTask = useCallback(() => {
    if (!validateForm()) {
      toast({
        title: "Error de validación",
        description: "Por favor corrige los errores en el formulario",
        variant: "destructive",
      })
      return
    }

    const task: PerformanceTask = {
      id: `task_${Date.now()}`,
      title: newTask.title!,
      description: newTask.description!,
      specialty: newTask.specialty!,
      type: newTask.type!,
      targetQuantity: newTask.targetQuantity!,
      currentQuantity: 0,
      difficulty: newTask.difficulty!,
      points: newTask.points!,
      deadline: newTask.deadline!,
      status: "active",
      assignedStudents: newTask.assignedStudents!,
      criteria: newTask.criteria || [],
      attachments: newTask.attachments || [],
      instructions: newTask.instructions || "",
      resources: newTask.resources || [],
      estimatedHours: newTask.estimatedHours!,
      priority: newTask.priority!,
      tags: newTask.tags || [],
      createdBy: "prof1",
      createdAt: new Date().toISOString(),
    }

    setTasks((prev) => [...prev, task])
    setIsCreateTaskOpen(false)
    resetForm()

    toast({
      title: "Tarea creada exitosamente",
      description: `La tarea "${task.title}" ha sido asignada a ${task.assignedStudents.length} estudiante(s)`,
    })
  }, [newTask, toast, validateForm])

  const resetForm = () => {
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
      attachments: [],
      instructions: "",
      resources: [],
      estimatedHours: 1,
      priority: "medium",
      tags: [],
    })
    setFormErrors({})
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingFile(true)

    try {
      const newAttachments: TaskAttachment[] = []

      for (const file of Array.from(files)) {
        // Simulate file upload
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const attachment: TaskAttachment = {
          id: `att_${Date.now()}_${Math.random()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
          uploadedAt: new Date().toISOString(),
        }

        newAttachments.push(attachment)
      }

      setNewTask((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...newAttachments],
      }))

      toast({
        title: "Archivos subidos",
        description: `${newAttachments.length} archivo(s) agregado(s) exitosamente`,
      })
    } catch (error) {
      toast({
        title: "Error al subir archivos",
        description: "Hubo un problema al subir los archivos",
        variant: "destructive",
      })
    } finally {
      setUploadingFile(false)
    }
  }

  const removeAttachment = (attachmentId: string) => {
    setNewTask((prev) => ({
      ...prev,
      attachments: prev.attachments?.filter((att) => att.id !== attachmentId) || [],
    }))
  }

  const addCriterion = () => {
    const newCriterion: TaskCriteria = {
      id: `criteria_${Date.now()}`,
      name: "",
      description: "",
      weight: 25,
      maxScore: 10,
      evaluationType: "scale",
      required: true,
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

  const addResource = () => {
    const resource = prompt("Ingresa el nombre del recurso:")
    if (resource?.trim()) {
      setNewTask((prev) => ({
        ...prev,
        resources: [...(prev.resources || []), resource.trim()],
      }))
    }
  }

  const removeResource = (index: number) => {
    setNewTask((prev) => ({
      ...prev,
      resources: prev.resources?.filter((_, i) => i !== index) || [],
    }))
  }

  const addTag = () => {
    const tag = prompt("Ingresa una etiqueta:")
    if (tag?.trim() && !newTask.tags?.includes(tag.trim())) {
      setNewTask((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()],
      }))
    }
  }

  const removeTag = (tag: string) => {
    setNewTask((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }))
  }

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sistema de Tareas por Rendimiento</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Crea y gestiona tareas basadas en objetivos cuantitativos para tus estudiantes
          </p>
        </div>
        <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea por Rendimiento</DialogTitle>
              <DialogDescription>
                Define objetivos cuantitativos y criterios de evaluación para tus estudiantes
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="criteria">Criterios</TabsTrigger>
                <TabsTrigger value="resources">Recursos</TabsTrigger>
                <TabsTrigger value="students">Estudiantes</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título de la Tarea *</Label>
                      <Input
                        id="title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Ej: Extracciones Simples"
                        className={formErrors.title ? "border-red-500" : ""}
                      />
                      {formErrors.title && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {formErrors.title}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidad *</Label>
                      <Select
                        value={newTask.specialty}
                        onValueChange={(value) => setNewTask({ ...newTask, specialty: value })}
                      >
                        <SelectTrigger className={formErrors.specialty ? "border-red-500" : ""}>
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
                      {formErrors.specialty && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {formErrors.specialty}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción *</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Describe los objetivos y requisitos de la tarea..."
                      rows={3}
                      className={formErrors.description ? "border-red-500" : ""}
                    />
                    {formErrors.description && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formErrors.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instrucciones Detalladas</Label>
                    <Textarea
                      id="instructions"
                      value={newTask.instructions}
                      onChange={(e) => setNewTask({ ...newTask, instructions: e.target.value })}
                      placeholder="Proporciona instrucciones paso a paso para completar la tarea..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                              <div className="flex items-center gap-2">
                                <span>{type.icon}</span>
                                <div>
                                  <div>{type.label}</div>
                                  <div className="text-xs text-muted-foreground">{type.description}</div>
                                </div>
                              </div>
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
                        className={formErrors.targetQuantity ? "border-red-500" : ""}
                      />
                      {formErrors.targetQuantity && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {formErrors.targetQuantity}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Fecha Límite *</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        className={formErrors.deadline ? "border-red-500" : ""}
                      />
                      {formErrors.deadline && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {formErrors.deadline}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Dificultad</Label>
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
                              <div>
                                <Badge className={level.color}>{level.label}</Badge>
                                <div className="text-xs text-muted-foreground mt-1">{level.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityLevels.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              <div className="flex items-center gap-2">
                                <span>{priority.icon}</span>
                                <Badge className={priority.color}>{priority.label}</Badge>
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
                    <div className="space-y-2">
                      <Label htmlFor="hours">Horas Estimadas *</Label>
                      <Input
                        id="hours"
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={newTask.estimatedHours}
                        onChange={(e) => setNewTask({ ...newTask, estimatedHours: Number.parseFloat(e.target.value) })}
                        className={formErrors.estimatedHours ? "border-red-500" : ""}
                      />
                      {formErrors.estimatedHours && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {formErrors.estimatedHours}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Etiquetas</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addTag}>
                        <Plus className="h-3 w-3 mr-1" />
                        Agregar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newTask.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {(!newTask.tags || newTask.tags.length === 0) && (
                        <span className="text-sm text-muted-foreground">No hay etiquetas agregadas</span>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="criteria" className="space-y-6">
                {/* Evaluation Criteria */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-lg font-medium">Criterios de Evaluación</Label>
                      <p className="text-sm text-muted-foreground">
                        Define cómo se evaluará el desempeño de los estudiantes
                      </p>
                    </div>
                    <Button type="button" variant="outline" onClick={addCriterion}>
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar Criterio
                    </Button>
                  </div>

                  {formErrors.criteria && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.criteria}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {newTask.criteria?.map((criterion, index) => (
                      <Card key={criterion.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                              <div className="space-y-1">
                                <Label className="text-sm">Nombre del Criterio *</Label>
                                <Input
                                  value={criterion.name}
                                  onChange={(e) => updateCriterion(index, "name", e.target.value)}
                                  placeholder="Ej: Técnica Quirúrgica"
                                  className="text-sm"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-sm">Peso (%) *</Label>
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
                            <Label className="text-sm">Descripción *</Label>
                            <Textarea
                              value={criterion.description}
                              onChange={(e) => updateCriterion(index, "description", e.target.value)}
                              placeholder="Describe qué se evalúa en este criterio..."
                              rows={2}
                              className="text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <Label className="text-sm">Puntuación Máxima</Label>
                              <Input
                                type="number"
                                min="1"
                                value={criterion.maxScore}
                                onChange={(e) => updateCriterion(index, "maxScore", Number.parseInt(e.target.value))}
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-sm">Tipo de Evaluación</Label>
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
                            <div className="space-y-1">
                              <Label className="text-sm">Obligatorio</Label>
                              <div className="flex items-center space-x-2 pt-2">
                                <Checkbox
                                  id={`required-${index}`}
                                  checked={criterion.required}
                                  onCheckedChange={(checked) => updateCriterion(index, "required", checked)}
                                />
                                <Label htmlFor={`required-${index}`} className="text-sm">
                                  Criterio obligatorio
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {newTask.criteria && newTask.criteria.length > 0 && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-blue-700">
                          <strong>Total de pesos:</strong> {newTask.criteria.reduce((sum, c) => sum + c.weight, 0)}%
                        </p>
                        {newTask.criteria.reduce((sum, c) => sum + c.weight, 0) !== 100 && (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Debe sumar 100%
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                {/* Resources and Attachments */}
                <div className="space-y-6">
                  {/* File Attachments */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-lg font-medium">Archivos Adjuntos</Label>
                        <p className="text-sm text-muted-foreground">Sube documentos, imágenes o videos relacionados</p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("file-upload")?.click()}
                          disabled={uploadingFile}
                        >
                          {uploadingFile ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                              Subiendo...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-1" />
                              Subir Archivos
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {newTask.attachments?.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(attachment.size)} •{" "}
                                {new Date(attachment.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(attachment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {(!newTask.attachments || newTask.attachments.length === 0) && (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No hay archivos adjuntos</p>
                          <p className="text-sm">Los archivos ayudan a los estudiantes a entender mejor la tarea</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label className="text-lg font-medium">Recursos Adicionales</Label>
                        <p className="text-sm text-muted-foreground">Lista de materiales, libros o referencias</p>
                      </div>
                      <Button type="button" variant="outline" onClick={addResource}>
                        <Plus className="h-4 w-4 mr-1" />
                        Agregar Recurso
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {newTask.resources?.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{resource}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeResource(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {(!newTask.resources || newTask.resources.length === 0) && (
                        <div className="text-center py-6 text-muted-foreground">
                          <p>No hay recursos agregados</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-6">
                {/* Student Assignment */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-lg font-medium">Asignación de Estudiantes</Label>
                    <p className="text-sm text-muted-foreground">
                      Selecciona los estudiantes que realizarán esta tarea
                    </p>
                  </div>

                  {formErrors.assignedStudents && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {formErrors.assignedStudents}
                      </p>
                    </div>
                  )}

                  <div className="grid gap-3">
                    {students
                      .filter((student) => !newTask.specialty || student.specialty === newTask.specialty)
                      .map((student) => (
                        <Card key={student.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
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
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">{student.name.charAt(0)}</span>
                              </div>
                              <div>
                                <Label htmlFor={student.id} className="font-medium cursor-pointer">
                                  {student.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">{student.email}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline">{student.semester}° semestre</Badge>
                                  <Badge className={getSpecialtyColor(student.specialty)}>{student.specialty}</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>

                  {newTask.assignedStudents && newTask.assignedStudents.length > 0 && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>{newTask.assignedStudents.length}</strong> estudiante(s) seleccionado(s)
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)} className="w-full sm:w-auto">
                Cancelar
              </Button>
              <Button onClick={handleCreateTask} className="w-full sm:w-auto">
                <Target className="h-4 w-4 mr-2" />
                Crear Tarea
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
        <TabsList className="grid w-full grid-cols-3">
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
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <Badge className={getSpecialtyColor(task.specialty)}>{task.specialty}</Badge>
                          <Badge className={difficultyLevels.find((d) => d.value === task.difficulty)?.color}>
                            {difficultyLevels.find((d) => d.value === task.difficulty)?.label}
                          </Badge>
                          <Badge className={priorityLevels.find((p) => p.value === task.priority)?.color}>
                            {priorityLevels.find((p) => p.value === task.priority)?.icon}{" "}
                            {priorityLevels.find((p) => p.value === task.priority)?.label}
                          </Badge>
                        </div>
                        <CardDescription>{task.description}</CardDescription>
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === "active" ? "Activa" : task.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Task Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

                      {/* Additional Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Fecha límite: {new Date(task.deadline).toLocaleDateString("es-ES")}</span>
                          {new Date(task.deadline) < new Date() && (
                            <Badge variant="destructive" className="ml-2">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Vencida
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Estimado: {task.estimatedHours}h</span>
                        </div>
                      </div>

                      {/* Attachments and Resources */}
                      {(task.attachments.length > 0 || task.resources.length > 0) && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Recursos:</Label>
                          <div className="flex flex-wrap gap-2">
                            {task.attachments.map((attachment) => (
                              <Badge key={attachment.id} variant="outline" className="text-xs">
                                <Paperclip className="h-3 w-3 mr-1" />
                                {attachment.name}
                              </Badge>
                            ))}
                            {task.resources.map((resource, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Criteria Summary */}
                      {task.criteria.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Criterios de Evaluación:</Label>
                          <div className="flex flex-wrap gap-2">
                            {task.criteria.map((criterion) => (
                              <Badge key={criterion.id} variant="outline" className="text-xs">
                                {criterion.name} ({criterion.weight}%)
                                {criterion.required && <Star className="h-3 w-3 ml-1 text-yellow-500" />}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap justify-end gap-2 pt-4 border-t">
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
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge className={getSpecialtyColor(task.specialty)}>{task.specialty}</Badge>
                        <Badge className={difficultyLevels.find((d) => d.value === task.difficulty)?.color}>
                          {difficultyLevels.find((d) => d.value === task.difficulty)?.label}
                        </Badge>
                        <Badge className={priorityLevels.find((p) => p.value === task.priority)?.color}>
                          {priorityLevels.find((p) => p.value === task.priority)?.icon}{" "}
                          {priorityLevels.find((p) => p.value === task.priority)?.label}
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

                    <div className="flex flex-wrap justify-end gap-2 pt-4 border-t">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div>
                      <Label className="text-sm font-medium">Prioridad</Label>
                      <Badge className={priorityLevels.find((p) => p.value === selectedTask.priority)?.color}>
                        {priorityLevels.find((p) => p.value === selectedTask.priority)?.label}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Horas Estimadas</Label>
                      <p className="text-sm">{selectedTask.estimatedHours} horas</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Descripción</Label>
                    <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
                  </div>
                  {selectedTask.instructions && (
                    <div>
                      <Label className="text-sm font-medium">Instrucciones</Label>
                      <p className="text-sm text-muted-foreground">{selectedTask.instructions}</p>
                    </div>
                  )}
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
                            <div className="flex gap-2">
                              <Badge variant="outline">{criterion.weight}%</Badge>
                              {criterion.required && (
                                <Badge variant="secondary">
                                  <Star className="h-3 w-3 mr-1" />
                                  Obligatorio
                                </Badge>
                              )}
                            </div>
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

              {/* Resources and Attachments */}
              {(selectedTask.attachments.length > 0 || selectedTask.resources.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recursos y Archivos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedTask.attachments.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">Archivos Adjuntos</Label>
                          <div className="space-y-2 mt-2">
                            {selectedTask.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center gap-3 p-2 border rounded">
                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{attachment.name}</p>
                                  <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedTask.resources.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">Recursos Adicionales</Label>
                          <div className="space-y-2 mt-2">
                            {selectedTask.resources.map((resource, index) => (
                              <div key={index} className="flex items-center gap-3 p-2 border rounded">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{resource}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
