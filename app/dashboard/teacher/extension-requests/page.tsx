"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, MessageSquare, Calendar, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ExtensionRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [response, setResponse] = useState("")
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null)
  const { toast } = useToast()

  // Mock extension requests
  const extensionRequests = [
    {
      id: "ext1",
      assignmentId: "a2",
      assignmentTitle: "Análisis Cefalométrico",
      studentId: "s2",
      studentName: "Laura Torres",
      reason:
        "Tuve problemas con el software de análisis cefalométrico y necesito más tiempo para completar las mediciones correctamente.",
      requestedDate: "2025-06-14",
      newDueDate: "2025-06-20",
      originalDueDate: "2025-06-15",
      submittedDate: "2025-06-10",
      status: "pending",
      urgency: "medium",
    },
    {
      id: "ext2",
      assignmentId: "a1",
      assignmentTitle: "Caso Clínico: Tratamiento de Endodoncia",
      studentId: "s1",
      studentName: "Pedro Gómez",
      reason:
        "Mi paciente asignado canceló varias citas por motivos personales, lo que ha retrasado significativamente el progreso del caso clínico.",
      requestedDate: "2025-05-28",
      newDueDate: "2025-06-05",
      originalDueDate: "2025-05-30",
      submittedDate: "2025-05-25",
      status: "approved",
      professorResponse:
        "Entiendo la situación. Extensión aprobada. Asegúrate de documentar bien las reprogramaciones.",
      responseDate: "2025-05-26",
      urgency: "high",
    },
    {
      id: "ext3",
      assignmentId: "a3",
      assignmentTitle: "Presentación: Técnicas de Periodoncia",
      studentId: "s3",
      studentName: "Miguel Sánchez",
      reason: "Solicito extensión para incluir un caso adicional que considero relevante para la presentación.",
      requestedDate: "2025-06-01",
      newDueDate: "2025-06-08",
      originalDueDate: "2025-06-03",
      submittedDate: "2025-05-30",
      status: "rejected",
      professorResponse:
        "La fecha original es suficiente para completar la presentación con los casos ya asignados. No se justifica la extensión.",
      responseDate: "2025-05-31",
      urgency: "low",
    },
  ]

  const handleReviewRequest = (request: any, approve: boolean) => {
    setSelectedRequest(request)
    setDecision(approve ? "approve" : "reject")
    setIsReviewDialogOpen(true)
  }

  const submitReview = () => {
    if (!response.trim()) {
      toast({
        title: "Error",
        description: "Debes proporcionar una respuesta",
        variant: "destructive",
      })
      return
    }

    // Update request status
    const updatedRequest = {
      ...selectedRequest,
      status: decision,
      professorResponse: response,
      responseDate: new Date().toISOString().split("T")[0],
    }

    toast({
      title: decision === "approve" ? "Extensión Aprobada" : "Extensión Rechazada",
      description: `La solicitud de ${selectedRequest.studentName} ha sido ${decision === "approve" ? "aprobada" : "rechazada"}`,
    })

    // Reset form
    setIsReviewDialogOpen(false)
    setSelectedRequest(null)
    setResponse("")
    setDecision(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprobada</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rechazada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Media</Badge>
      case "low":
        return <Badge variant="outline">Baja</Badge>
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const pendingRequests = extensionRequests.filter((req) => req.status === "pending")
  const reviewedRequests = extensionRequests.filter((req) => req.status !== "pending")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Solicitudes de Extensión</h1>
          <p className="text-gray-600 mt-2">Revisa y responde a las solicitudes de extensión de plazo</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm">
            {pendingRequests.length} pendientes
          </Badge>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{extensionRequests.length}</div>
            <p className="text-xs text-muted-foreground">Este semestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">Requieren revisión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {extensionRequests.filter((req) => req.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">Extensiones otorgadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {extensionRequests.filter((req) => req.status === "rejected").length}
            </div>
            <p className="text-xs text-muted-foreground">No aprobadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pendientes ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="reviewed">Revisadas ({reviewedRequests.length})</TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.assignmentTitle}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {request.studentName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Solicitada: {request.submittedDate}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {getStatusBadge(request.status)}
                    {getUrgencyBadge(request.urgency)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <Label className="font-medium text-gray-700">Fecha Original</Label>
                      <p className="text-gray-600">{request.originalDueDate}</p>
                    </div>
                    <div>
                      <Label className="font-medium text-gray-700">Nueva Fecha Propuesta</Label>
                      <p className="text-gray-600">{request.newDueDate}</p>
                    </div>
                    <div>
                      <Label className="font-medium text-gray-700">Días Adicionales</Label>
                      <p className="text-gray-600">
                        {Math.ceil(
                          (new Date(request.newDueDate).getTime() - new Date(request.originalDueDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        días
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Label className="font-medium text-blue-800">Justificación del Estudiante</Label>
                    <p className="text-sm text-blue-700 mt-2">{request.reason}</p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReviewRequest(request, false)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Rechazar
                    </Button>
                    <Button
                      onClick={() => handleReviewRequest(request, true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Aprobar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingRequests.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No hay solicitudes pendientes</h3>
                <p className="text-gray-500">Las nuevas solicitudes de extensión aparecerán aquí</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          {reviewedRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.assignmentTitle}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {request.studentName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Respondida: {request.responseDate}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">{getStatusBadge(request.status)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="font-medium text-gray-700">Justificación Original</Label>
                    <p className="text-sm text-gray-600 mt-2">{request.reason}</p>
                  </div>

                  {request.professorResponse && (
                    <div className={`p-4 rounded-lg ${request.status === "approved" ? "bg-green-50" : "bg-red-50"}`}>
                      <Label
                        className={`font-medium ${request.status === "approved" ? "text-green-800" : "text-red-800"}`}
                      >
                        Respuesta del Profesor
                      </Label>
                      <p
                        className={`text-sm mt-2 ${request.status === "approved" ? "text-green-700" : "text-red-700"}`}
                      >
                        {request.professorResponse}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {extensionRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.assignmentTitle}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {request.studentName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {request.status === "pending"
                          ? `Solicitada: ${request.submittedDate}`
                          : `Respondida: ${request.responseDate}`}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {getStatusBadge(request.status)}
                    {request.status === "pending" && getUrgencyBadge(request.urgency)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="font-medium text-gray-700">Justificación</Label>
                    <p className="text-sm text-gray-600 mt-2">{request.reason}</p>
                  </div>

                  {request.professorResponse && (
                    <div className={`p-4 rounded-lg ${request.status === "approved" ? "bg-green-50" : "bg-red-50"}`}>
                      <Label
                        className={`font-medium ${request.status === "approved" ? "text-green-800" : "text-red-800"}`}
                      >
                        Respuesta del Profesor
                      </Label>
                      <p
                        className={`text-sm mt-2 ${request.status === "approved" ? "text-green-700" : "text-red-700"}`}
                      >
                        {request.professorResponse}
                      </p>
                    </div>
                  )}

                  {request.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleReviewRequest(request, false)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                      <Button
                        onClick={() => handleReviewRequest(request, true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                    </div>
                  )}
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
              {decision === "approve" ? "Aprobar Solicitud de Extensión" : "Rechazar Solicitud de Extensión"}
            </DialogTitle>
            <DialogDescription>
              Proporciona una respuesta detallada para {selectedRequest?.studentName} sobre su solicitud de extensión
              para "{selectedRequest?.assignmentTitle}"
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="font-medium text-gray-700">Justificación del Estudiante</Label>
                <p className="text-sm text-gray-600 mt-2">{selectedRequest.reason}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium text-gray-700">Fecha Original</Label>
                  <p className="text-gray-600">{selectedRequest.originalDueDate}</p>
                </div>
                <div>
                  <Label className="font-medium text-gray-700">Nueva Fecha Propuesta</Label>
                  <p className="text-gray-600">{selectedRequest.newDueDate}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="response">Tu Respuesta *</Label>
                <Textarea
                  id="response"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder={
                    decision === "approve"
                      ? "Explica por qué apruebas la extensión y cualquier condición adicional..."
                      : "Explica por qué no puedes aprobar la extensión y sugiere alternativas..."
                  }
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={submitReview}
              className={decision === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {decision === "approve" ? "Aprobar Extensión" : "Rechazar Solicitud"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
