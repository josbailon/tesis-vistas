"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, FileText, User, Calendar, Eye, MessageSquare } from "lucide-react"

interface ApprovalRequest {
  id: string
  title: string
  student: {
    name: string
    id: string
    email: string
  }
  patient: {
    name: string
    id: string
  }
  submittedDate: string
  dueDate: string
  status: "pending" | "approved" | "rejected" | "needs_revision"
  priority: "low" | "medium" | "high"
  type: "treatment_plan" | "case_study" | "procedure_approval" | "final_evaluation"
  description: string
  attachments: string[]
  feedback?: string
  lastReviewed?: string
}

export default function TeacherApprovalsPage() {
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "revision" | null>(null)

  const approvalRequests: ApprovalRequest[] = [
    {
      id: "ar1",
      title: "Plan de Tratamiento - Endodoncia Molar Superior",
      student: {
        name: "Pedro Gómez",
        id: "E12345",
        email: "pedro.gomez@uleam.edu.ec",
      },
      patient: {
        name: "Ana García",
        id: "P001",
      },
      submittedDate: "2025-05-20",
      dueDate: "2025-05-25",
      status: "pending",
      priority: "high",
      type: "treatment_plan",
      description:
        "Solicitud de aprobación para plan de tratamiento de endodoncia en molar superior derecho. Paciente presenta dolor agudo y pruebas de vitalidad negativas.",
      attachments: ["radiografia_panoramica.jpg", "plan_tratamiento.pdf", "consentimiento_informado.pdf"],
    },
    {
      id: "ar2",
      title: "Caso Clínico - Ortodoncia Correctiva",
      student: {
        name: "Laura Torres",
        id: "E12346",
        email: "laura.torres@uleam.edu.ec",
      },
      patient: {
        name: "Carlos López",
        id: "P002",
      },
      submittedDate: "2025-05-18",
      dueDate: "2025-05-23",
      status: "needs_revision",
      priority: "medium",
      type: "case_study",
      description: "Documentación completa de caso de ortodoncia correctiva para maloclusión clase II.",
      attachments: ["caso_clinico.pdf", "fotografias_intraorales.zip", "radiografias.zip"],
      feedback:
        "El caso está bien documentado, pero necesita incluir el análisis cefalométrico completo y las proyecciones de crecimiento.",
      lastReviewed: "2025-05-19",
    },
    {
      id: "ar3",
      title: "Aprobación de Procedimiento Quirúrgico",
      student: {
        name: "Miguel Sánchez",
        id: "E12347",
        email: "miguel.sanchez@uleam.edu.ec",
      },
      patient: {
        name: "María Fernández",
        id: "P003",
      },
      submittedDate: "2025-05-15",
      dueDate: "2025-05-20",
      status: "approved",
      priority: "high",
      type: "procedure_approval",
      description: "Solicitud de aprobación para extracción quirúrgica de terceros molares impactados.",
      attachments: ["tomografia.dcm", "plan_quirurgico.pdf", "evaluacion_riesgos.pdf"],
      feedback: "Plan quirúrgico aprobado. Excelente evaluación de riesgos y protocolo post-operatorio bien definido.",
      lastReviewed: "2025-05-16",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aprobado
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Rechazado
          </Badge>
        )
      case "needs_revision":
        return (
          <Badge className="bg-orange-500">
            <FileText className="h-3 w-3 mr-1" />
            Necesita Revisión
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            Media
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Baja</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "treatment_plan":
        return "Plan de Tratamiento"
      case "case_study":
        return "Caso Clínico"
      case "procedure_approval":
        return "Aprobación de Procedimiento"
      case "final_evaluation":
        return "Evaluación Final"
      default:
        return type
    }
  }

  const handleReview = (action: "approve" | "reject" | "revision") => {
    setReviewAction(action)
    setIsReviewDialogOpen(true)
  }

  const submitReview = () => {
    // Here you would submit the review
    console.log("Review submitted:", { action: reviewAction, feedback })
    setIsReviewDialogOpen(false)
    setSelectedRequest(null)
    setFeedback("")
    setReviewAction(null)
  }

  const pendingRequests = approvalRequests.filter((req) => req.status === "pending")
  const reviewedRequests = approvalRequests.filter((req) => req.status !== "pending")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitudes de Aprobación</h1>
          <p className="text-muted-foreground">Revisa y aprueba las solicitudes de tus estudiantes</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm">
            {pendingRequests.length} pendientes
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pendientes ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="reviewed">Revisadas ({reviewedRequests.length})</TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {request.student.name} ({request.student.id})
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Vence: {request.dueDate}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {getStatusBadge(request.status)}
                    {getPriorityBadge(request.priority)}
                    <Badge variant="outline">{getTypeLabel(request.type)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Descripción</h4>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Paciente</h4>
                    <p className="text-sm">
                      {request.patient.name} (ID: {request.patient.id})
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Archivos Adjuntos ({request.attachments.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {request.attachments.map((attachment, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">Enviado: {request.submittedDate}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                      <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-700">
                        <FileText className="h-4 w-4 mr-1" />
                        Solicitar Revisión
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          {reviewedRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {request.student.name} ({request.student.id})
                      </span>
                      {request.lastReviewed && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Revisado: {request.lastReviewed}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {getStatusBadge(request.status)}
                    <Badge variant="outline">{getTypeLabel(request.type)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Descripción</h4>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>

                  {request.feedback && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-800">Retroalimentación</h4>
                      <p className="text-sm text-blue-700">{request.feedback}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">Enviado: {request.submittedDate}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Contactar Estudiante
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {approvalRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {request.student.name} ({request.student.id})
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {request.status === "pending"
                          ? `Vence: ${request.dueDate}`
                          : `Revisado: ${request.lastReviewed}`}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {getStatusBadge(request.status)}
                    {request.status === "pending" && getPriorityBadge(request.priority)}
                    <Badge variant="outline">{getTypeLabel(request.type)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Descripción</h4>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>

                  {request.feedback && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-800">Retroalimentación</h4>
                      <p className="text-sm text-blue-700">{request.feedback}</p>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalles
                    </Button>
                    {request.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <XCircle className="h-4 w-4 mr-1" />
                          Rechazar
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aprobar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve" && "Aprobar Solicitud"}
              {reviewAction === "reject" && "Rechazar Solicitud"}
              {reviewAction === "revision" && "Solicitar Revisión"}
            </DialogTitle>
            <DialogDescription>Proporciona retroalimentación para el estudiante sobre su solicitud.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="feedback">Comentarios y Retroalimentación</Label>
              <Textarea
                id="feedback"
                placeholder="Escribe tus comentarios aquí..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={submitReview}>
              {reviewAction === "approve" && "Aprobar"}
              {reviewAction === "reject" && "Rechazar"}
              {reviewAction === "revision" && "Solicitar Revisión"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
