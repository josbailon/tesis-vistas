"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Upload,
  Eye,
  Edit,
  Trash2,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  FileIcon,
  ImageIcon,
  VideoIcon,
} from "lucide-react"

interface Assignment {
  id: string
  title: string
  description: string
  type: "case_study" | "research" | "practical" | "evaluation" | "presentation"
  dueDate: string
  createdDate: string
  status: "draft" | "published" | "closed"
  studentsAssigned: number
  submissionsReceived: number
  maxScore: number
  attachments: FileAttachment[]
  instructions: string
  rubric?: string
}

interface FileAttachment {
  id: string
  name: string
  size: number
  type: string
  url?: string
}

interface NewAssignment {
  title: string
  description: string
  type: string
  dueDate: string
  maxScore: number
  instructions: string
  studentsAssigned: string[]
  attachments: FileAttachment[]
}

export default function TeacherAssignmentsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const [newAssignment, setNewAssignment] = useState<NewAssignment>({
    title: "",
    description: "",
    type: "",
    dueDate: "",
    maxScore: 100,
    instructions: "",
    studentsAssigned: [],
    attachments: [],
  })

  const assignments: Assignment[] = [
    {
      id: "a1",
      title: "Caso Clínico: Tratamiento de Endodoncia Complejo",
      description:
        "Documentar un caso completo de endodoncia con complicaciones, incluyendo diagnóstico, plan de tratamiento y seguimiento.",
      type: "case_study",
      dueDate: "2025-05-30",
      createdDate: "2025-05-15",
      status: "published",
      studentsAssigned: 8,
      submissionsReceived: 5,
      maxScore: 100,
      attachments: [
        { id: "1", name: "rubrica_caso_clinico.pdf", size: 245760, type: "application/pdf" },
        {
          id: "2",
          name: "formato_presentacion.docx",
          size: 102400,
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      ],
      instructions:
        "El caso debe incluir: 1) Historia clínica completa, 2) Radiografías pre y post tratamiento, 3) Fotografías del procedimiento, 4) Análisis de complicaciones, 5) Plan de seguimiento.",
    },
    {
      id: "a2",
      title: "Investigación: Nuevas Técnicas en Endodoncia",
      description: "Revisión bibliográfica sobre avances recientes en técnicas de endodoncia en los últimos 5 años.",
      type: "research",
      dueDate: "2025-06-15",
      createdDate: "2025-05-10",
      status: "published",
      studentsAssigned: 12,
      submissionsReceived: 3,
      maxScore: 80,
      attachments: [{ id: "3", name: "guia_investigacion.pdf", size: 153600, type: "application/pdf" }],
      instructions:
        "La investigación debe incluir al menos 15 referencias científicas actuales, análisis crítico de las técnicas y conclusiones propias.",
    },
    {
      id: "a3",
      title: "Evaluación Práctica: Técnicas de Obturación",
      description: "Evaluación práctica de diferentes técnicas de obturación en dientes extraídos.",
      type: "practical",
      dueDate: "2025-05-25",
      createdDate: "2025-05-05",
      status: "published",
      studentsAssigned: 8,
      submissionsReceived: 8,
      maxScore: 120,
      attachments: [{ id: "4", name: "protocolo_evaluacion.pdf", size: 128000, type: "application/pdf" }],
      instructions: "Cada estudiante debe realizar 3 obturaciones usando diferentes técnicas y documentar el proceso.",
    },
    {
      id: "a4",
      title: "Presentación: Manejo de Complicaciones",
      description: "Presentación oral sobre el manejo de complicaciones en endodoncia.",
      type: "presentation",
      dueDate: "2025-06-01",
      createdDate: "2025-05-20",
      status: "draft",
      studentsAssigned: 0,
      submissionsReceived: 0,
      maxScore: 90,
      attachments: [],
      instructions: "Presentación de 15-20 minutos con casos reales y manejo de preguntas del público.",
    },
  ]

  // Enhanced file upload with validation and progress
  const handleFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return

      const maxFileSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "video/mp4",
      ]

      const newFiles: FileAttachment[] = []
      const uploadErrors: string[] = []

      Array.from(files).forEach((file) => {
        // Validate file size
        if (file.size > maxFileSize) {
          uploadErrors.push(`${file.name}: El archivo excede el tamaño máximo de 10MB`)
          return
        }

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
          uploadErrors.push(`${file.name}: Tipo de archivo no permitido`)
          return
        }

        // Check for duplicates
        const isDuplicate = newAssignment.attachments.some((existing) => existing.name === file.name)
        if (isDuplicate) {
          uploadErrors.push(`${file.name}: Ya existe un archivo con este nombre`)
          return
        }

        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
        })
      })

      if (uploadErrors.length > 0) {
        toast({
          title: "Errores en la carga de archivos",
          description: uploadErrors.join(", "),
          variant: "destructive",
        })
        return
      }

      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setNewAssignment((prev) => ({
              ...prev,
              attachments: [...prev.attachments, ...newFiles],
            }))
            toast({
              title: "Archivos cargados",
              description: `${newFiles.length} archivo(s) cargado(s) exitosamente`,
            })
            return 0
          }
          return prev + 10
        })
      }, 100)
    },
    [newAssignment.attachments, toast],
  )

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!newAssignment.title.trim()) {
      newErrors.title = "El título es obligatorio"
    }

    if (!newAssignment.description.trim()) {
      newErrors.description = "La descripción es obligatoria"
    }

    if (!newAssignment.type) {
      newErrors.type = "Debe seleccionar un tipo de tarea"
    }

    if (!newAssignment.dueDate) {
      newErrors.dueDate = "La fecha de entrega es obligatoria"
    } else {
      const dueDate = new Date(newAssignment.dueDate)
      const today = new Date()
      if (dueDate <= today) {
        newErrors.dueDate = "La fecha de entrega debe ser futura"
      }
    }

    if (newAssignment.maxScore < 1 || newAssignment.maxScore > 200) {
      newErrors.maxScore = "La puntuación debe estar entre 1 y 200"
    }

    if (!newAssignment.instructions.trim()) {
      newErrors.instructions = "Las instrucciones son obligatorias"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateAssignment = async () => {
    if (!validateForm()) {
      toast({
        title: "Errores en el formulario",
        description: "Por favor, corrija los errores antes de continuar",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve(true)
          } else {
            reject(new Error("Error del servidor"))
          }
        }, 2000)
      })

      toast({
        title: "Tarea creada exitosamente",
        description: `La tarea "${newAssignment.title}" ha sido creada`,
      })

      setIsCreateDialogOpen(false)
      setNewAssignment({
        title: "",
        description: "",
        type: "",
        dueDate: "",
        maxScore: 100,
        instructions: "",
        studentsAssigned: [],
        attachments: [],
      })
      setErrors({})
    } catch (error) {
      toast({
        title: "Error al crear la tarea",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeAttachment = (attachmentId: string) => {
    setNewAssignment((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((file) => file.id !== attachmentId),
    }))
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <ImageIcon className="h-4 w-4" />
    if (type.includes("video")) return <VideoIcon className="h-4 w-4" />
    return <FileIcon className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="secondary">
            <Edit className="h-3 w-3 mr-1" />
            Borrador
          </Badge>
        )
      case "published":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Publicada
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Cerrada
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const typeLabels = {
      case_study: "Caso Clínico",
      research: "Investigación",
      practical: "Práctica",
      evaluation: "Evaluación",
      presentation: "Presentación",
    }
    return <Badge variant="outline">{typeLabels[type as keyof typeof typeLabels] || type}</Badge>
  }

  const getProgressColor = (received: number, total: number) => {
    const percentage = (received / total) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Tareas</h1>
          <p className="text-muted-foreground">Crea y gestiona las tareas académicas para tus estudiantes</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
              <DialogDescription>Completa la información para crear una nueva tarea académica</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la Tarea *</Label>
                  <Input
                    id="title"
                    value={newAssignment.title}
                    onChange={(e) => {
                      setNewAssignment({ ...newAssignment, title: e.target.value })
                      if (errors.title) setErrors({ ...errors, title: "" })
                    }}
                    placeholder="Ej: Caso Clínico de Endodoncia"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Tarea *</Label>
                    <Select
                      value={newAssignment.type}
                      onValueChange={(value) => {
                        setNewAssignment({ ...newAssignment, type: value })
                        if (errors.type) setErrors({ ...errors, type: "" })
                      }}
                    >
                      <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="case_study">Caso Clínico</SelectItem>
                        <SelectItem value="research">Investigación</SelectItem>
                        <SelectItem value="practical">Práctica</SelectItem>
                        <SelectItem value="evaluation">Evaluación</SelectItem>
                        <SelectItem value="presentation">Presentación</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Fecha de Entrega *</Label>
                    <Input
                      id="dueDate"
                      type="datetime-local"
                      value={newAssignment.dueDate}
                      onChange={(e) => {
                        setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                        if (errors.dueDate) setErrors({ ...errors, dueDate: "" })
                      }}
                      className={errors.dueDate ? "border-red-500" : ""}
                    />
                    {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    value={newAssignment.description}
                    onChange={(e) => {
                      setNewAssignment({ ...newAssignment, description: e.target.value })
                      if (errors.description) setErrors({ ...errors, description: "" })
                    }}
                    placeholder="Describe brevemente la tarea..."
                    rows={3}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Instrucciones Detalladas *</Label>
                  <Textarea
                    id="instructions"
                    value={newAssignment.instructions}
                    onChange={(e) => {
                      setNewAssignment({ ...newAssignment, instructions: e.target.value })
                      if (errors.instructions) setErrors({ ...errors, instructions: "" })
                    }}
                    placeholder="Proporciona instrucciones detalladas para completar la tarea..."
                    rows={4}
                    className={errors.instructions ? "border-red-500" : ""}
                  />
                  {errors.instructions && <p className="text-sm text-red-500">{errors.instructions}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxScore">Puntuación Máxima *</Label>
                  <Input
                    id="maxScore"
                    type="number"
                    value={newAssignment.maxScore}
                    onChange={(e) => {
                      setNewAssignment({ ...newAssignment, maxScore: Number.parseInt(e.target.value) })
                      if (errors.maxScore) setErrors({ ...errors, maxScore: "" })
                    }}
                    min="1"
                    max="200"
                    className={errors.maxScore ? "border-red-500" : ""}
                  />
                  {errors.maxScore && <p className="text-sm text-red-500">{errors.maxScore}</p>}
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <Label>Archivos Adjuntos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG, MP4 - Máximo 10MB por archivo</p>
                  </label>
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subiendo archivos...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {/* Attached Files */}
                {newAssignment.attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Archivos Adjuntos ({newAssignment.attachments.length})</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {newAssignment.attachments.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-2 border rounded-lg">
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(file.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAssignment} disabled={loading}>
                {loading ? "Creando..." : "Crear Tarea"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assignment List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas las Tareas</TabsTrigger>
          <TabsTrigger value="published">Publicadas</TabsTrigger>
          <TabsTrigger value="draft">Borradores</TabsTrigger>
          <TabsTrigger value="closed">Cerradas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription className="mt-2">{assignment.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(assignment.status)}
                      {getTypeBadge(assignment.type)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{assignment.studentsAssigned}</div>
                        <p className="text-xs text-muted-foreground">Estudiantes Asignados</p>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${getProgressColor(assignment.submissionsReceived, assignment.studentsAssigned)}`}
                        >
                          {assignment.submissionsReceived}
                        </div>
                        <p className="text-xs text-muted-foreground">Entregas Recibidas</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{assignment.maxScore}</div>
                        <p className="text-xs text-muted-foreground">Puntos Máximos</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {assignment.studentsAssigned > 0
                            ? Math.round((assignment.submissionsReceived / assignment.studentsAssigned) * 100)
                            : 0}
                          %
                        </div>
                        <p className="text-xs text-muted-foreground">Progreso</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Fecha de Creación:</span>
                        <p className="text-muted-foreground">{assignment.createdDate}</p>
                      </div>
                      <div>
                        <span className="font-medium">Fecha de Entrega:</span>
                        <p className="text-muted-foreground">{assignment.dueDate}</p>
                      </div>
                    </div>

                    {assignment.attachments.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Archivos Adjuntos:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {assignment.attachments.map((attachment, index) => (
                            <Badge key={index} variant="outline" className="gap-1">
                              {getFileIcon(attachment.type)}
                              {attachment.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar Entregas
                      </Button>
                      {assignment.status === "draft" && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Publicar
                        </Button>
                      )}
                      {assignment.status === "published" && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cerrar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-4">
            {assignments
              .filter((a) => a.status === "published")
              .map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">{assignment.description}</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(assignment.status)}
                        {getTypeBadge(assignment.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{assignment.studentsAssigned}</div>
                          <p className="text-xs text-muted-foreground">Estudiantes Asignados</p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${getProgressColor(assignment.submissionsReceived, assignment.studentsAssigned)}`}
                          >
                            {assignment.submissionsReceived}
                          </div>
                          <p className="text-xs text-muted-foreground">Entregas Recibidas</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{assignment.maxScore}</div>
                          <p className="text-xs text-muted-foreground">Puntos Máximos</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {assignment.studentsAssigned > 0
                              ? Math.round((assignment.submissionsReceived / assignment.studentsAssigned) * 100)
                              : 0}
                            %
                          </div>
                          <p className="text-xs text-muted-foreground">Progreso</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Entregas
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Descargar Todas
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Clock className="h-4 w-4 mr-1" />
                          Cerrar Tarea
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="grid gap-4">
            {assignments
              .filter((a) => a.status === "draft")
              .map((assignment) => (
                <Card key={assignment.id} className="border-dashed">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">{assignment.description}</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(assignment.status)}
                        {getTypeBadge(assignment.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-4">
                        <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Esta tarea está en borrador y no es visible para los estudiantes
                        </p>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Publicar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <div className="grid gap-4">
            {assignments
              .filter((a) => a.status === "closed")
              .map((assignment) => (
                <Card key={assignment.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">{assignment.description}</CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(assignment.status)}
                        {getTypeBadge(assignment.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">{assignment.studentsAssigned}</div>
                          <p className="text-xs text-muted-foreground">Estudiantes Asignados</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">{assignment.submissionsReceived}</div>
                          <p className="text-xs text-muted-foreground">Entregas Finales</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">{assignment.maxScore}</div>
                          <p className="text-xs text-muted-foreground">Puntos Máximos</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">
                            {assignment.studentsAssigned > 0
                              ? Math.round((assignment.submissionsReceived / assignment.studentsAssigned) * 100)
                              : 0}
                            %
                          </div>
                          <p className="text-xs text-muted-foreground">Tasa de Entrega</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Resultados
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Exportar Calificaciones
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
