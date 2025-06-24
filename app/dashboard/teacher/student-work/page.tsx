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
import { Search, Eye, Download, CheckCircle, Clock, Star, MessageSquare } from "lucide-react"

export default function StudentWorkPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedWork, setSelectedWork] = useState<any>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const studentWorks = [
    {
      id: "work1",
      title: "Caso Clínico: Tratamiento de Endodoncia",
      student: "Carlos López",
      studentId: "E2021001",
      subject: "Endodoncia Avanzada",
      submissionDate: "2024-01-15",
      dueDate: "2024-01-20",
      status: "submitted",
      grade: null,
      files: [
        { name: "caso_clinico.pdf", size: "2.4 MB", type: "pdf" },
        { name: "radiografias.jpg", size: "1.8 MB", type: "image" },
      ],
      description:
        "Documentación completa de un caso de endodoncia con complicaciones, incluyendo diagnóstico, plan de tratamiento y seguimiento.",
      feedback: null,
    },
    {
      id: "work2",
      title: "Investigación: Nuevas Técnicas en Ortodoncia",
      student: "María Fernández",
      studentId: "E2020002",
      subject: "Ortodoncia Interceptiva",
      submissionDate: "2024-01-10",
      dueDate: "2024-01-15",
      status: "graded",
      grade: 9.2,
      files: [
        { name: "investigacion.docx", size: "3.1 MB", type: "document" },
        { name: "bibliografia.pdf", size: "856 KB", type: "pdf" },
      ],
      description: "Revisión bibliográfica sobre avances recientes en técnicas de ortodoncia interceptiva.",
      feedback: "Excelente trabajo de investigación. Muy buena estructura y análisis crítico de las fuentes.",
    },
    {
      id: "work3",
      title: "Práctica: Técnicas de Obturación",
      student: "Juan Pérez",
      studentId: "E2019003",
      subject: "Endodoncia Clínica",
      submissionDate: "2024-01-12",
      dueDate: "2024-01-18",
      status: "reviewed",
      grade: 7.8,
      files: [
        { name: "practica_obturacion.pdf", size: "4.2 MB", type: "pdf" },
        { name: "fotos_procedimiento.zip", size: "12.5 MB", type: "archive" },
      ],
      description: "Documentación de diferentes técnicas de obturación realizadas en dientes extraídos.",
      feedback: "Buen trabajo práctico. Mejorar la documentación fotográfica del proceso.",
    },
    {
      id: "work4",
      title: "Presentación: Manejo de Complicaciones",
      student: "Sofía Ramírez",
      studentId: "E2021004",
      subject: "Endodoncia Avanzada",
      submissionDate: null,
      dueDate: "2024-01-25",
      status: "pending",
      grade: null,
      files: [],
      description: "Presentación sobre el manejo de complicaciones en tratamientos endodónticos.",
      feedback: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Enviado
          </Badge>
        )
      case "graded":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Calificado
          </Badge>
        )
      case "reviewed":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Eye className="h-3 w-3 mr-1" />
            Revisado
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄"
      case "document":
        return "📝"
      case "image":
        return "🖼️"
      case "archive":
        return "📦"
      default:
        return "📁"
    }
  }

  const filteredWorks = studentWorks.filter((work) => {
    const matchesSearch =
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || work.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trabajos de Estudiantes</h1>
          <p className="text-muted-foreground">Revisa y califica los trabajos enviados por tus estudiantes</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Calificaciones
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar trabajos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="submitted">Enviados</SelectItem>
              <SelectItem value="reviewed">Revisados</SelectItem>
              <SelectItem value="graded">Calificados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos los Trabajos</TabsTrigger>
          <TabsTrigger value="pending-review">Pendientes de Revisión</TabsTrigger>
          <TabsTrigger value="graded">Calificados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredWorks.map((work) => (
              <Card key={work.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{work.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <span className="font-medium">{work.student}</span> • {work.subject}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(work.status)}
                      {work.grade && (
                        <Badge variant="outline" className="gap-1">
                          <Star className="h-3 w-3" />
                          {work.grade}/10
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{work.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">ID Estudiante:</span>
                        <p className="text-muted-foreground">{work.studentId}</p>
                      </div>
                      <div>
                        <span className="font-medium">Fecha Límite:</span>
                        <p className="text-muted-foreground">{work.dueDate}</p>
                      </div>
                      <div>
                        <span className="font-medium">Fecha Entrega:</span>
                        <p className="text-muted-foreground">{work.submissionDate || "No enviado"}</p>
                      </div>
                      <div>
                        <span className="font-medium">Archivos:</span>
                        <p className="text-muted-foreground">{work.files.length} archivo(s)</p>
                      </div>
                    </div>

                    {work.files.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Archivos adjuntos:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {work.files.map((file, index) => (
                            <Badge key={index} variant="outline" className="gap-1">
                              <span>{getFileIcon(file.type)}</span>
                              {file.name} ({file.size})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {work.feedback && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <span className="font-medium text-sm text-blue-800">Retroalimentación:</span>
                        <p className="text-sm text-blue-700 mt-1">{work.feedback}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                      {work.status === "submitted" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedWork(work)
                            setIsReviewDialogOpen(true)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Revisar y Calificar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending-review" className="space-y-4">
          <div className="grid gap-4">
            {filteredWorks
              .filter((work) => work.status === "submitted")
              .map((work) => (
                <Card key={work.id} className="border-orange-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{work.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{work.student}</span> • {work.subject}
                        </CardDescription>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Requiere Revisión
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{work.description}</p>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => {
                            setSelectedWork(work)
                            setIsReviewDialogOpen(true)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Revisar Ahora
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4">
            {filteredWorks
              .filter((work) => work.status === "graded")
              .map((work) => (
                <Card key={work.id} className="border-green-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{work.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <span className="font-medium">{work.student}</span> • {work.subject}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Calificado
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Star className="h-3 w-3" />
                          {work.grade}/10
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{work.description}</p>
                      {work.feedback && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="font-medium text-sm text-green-800">Retroalimentación:</span>
                          <p className="text-sm text-green-700 mt-1">{work.feedback}</p>
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
        {selectedWork && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Revisar y Calificar Trabajo</DialogTitle>
              <DialogDescription>
                {selectedWork.title} - {selectedWork.student}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Calificación (0-10)</label>
                <Input type="number" min="0" max="10" step="0.1" placeholder="8.5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Retroalimentación</label>
                <Textarea
                  placeholder="Proporciona comentarios constructivos sobre el trabajo del estudiante..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select defaultValue="graded">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reviewed">Revisado (sin calificación)</SelectItem>
                    <SelectItem value="graded">Calificado</SelectItem>
                    <SelectItem value="needs-revision">Necesita revisión</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
