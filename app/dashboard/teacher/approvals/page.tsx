"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Eye, Clock, FileText } from "lucide-react"

interface ApprovalRequest {
  id: string
  studentName: string
  studentEmail: string
  patientName: string
  treatmentType: string
  specialty: string
  description: string
  requestDate: string
  urgency: "low" | "medium" | "high" | "urgent"
  status: "pending" | "approved" | "rejected" | "revision"
  documents: string[]
  estimatedDuration: number
  notes?: string
  professorFeedback?: string
}

export default function TeacherApprovalsPage() {
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | "revision">("approve")
  const [feedback, setFeedback] = useState("")

  const [requests, setRequests] = useState<ApprovalRequest[]>([
    {
      id: "1",
      studentName: "Juan Carlos Pérez",
      studentEmail: "juan.perez@uleam.edu.ec",
      patientName: "María González",
      treatmentType: "Endodoncia",
      specialty: "Endodoncia",
      description:
        "Tratamiento de conducto en molar superior derecho. Paciente presenta dolor severo y sensibilidad al frío.",
      requestDate: "2024-12-28T10:00:00Z",
      urgency: "high",
      status: "pending",
      documents: ["Radiografía periapical", "Historia clínica", "Consentimiento informado"],
      estimatedDuration: 90,
      notes: "Paciente con historial de diabetes tipo 2. Requiere precauciones especiales.",
    },
    {
      id: "2",
      studentName: "Ana María López",
      studentEmail: "ana.lopez@uleam.edu.ec",
      patientName: "Carlos Ruiz",
      treatmentType: "Colocación de Brackets",
      specialty: "Ortodoncia",
      description: "Instalación de aparatos ortodónticos fijos. Paciente de 16 años con maloclusión clase II.",
      requestDate: "2024-12-28T14:30:00Z",
      urgency: "medium",
      status: "pending",
      documents: ["Radiografía panorámica", "Modelos de estudio", "Fotografías clínicas"],
      estimatedDuration: 120,
      notes: "Primera fase del tratamiento ortodóntico. Duración estimada del tratamiento: 24 meses.",
    },
    {
      id: "3",
      studentName: "Pedro Silva",
      studentEmail: "pedro.silva@uleam.edu.ec",
      patientName: "Laura Martínez",
      treatmentType: "Extracción Simple",
      specialty: "Cirugía Oral",
      description: "Extracción de tercer molar inferior izquierdo. Pieza dental con caries extensa no restaurable.",
      requestDate: "2024-12-27T16:00:00Z",
      urgency: "medium",
      status: "approved",
      documents: ["Radiografía panorámica", "Evaluación preoperatoria"],
      estimatedDuration: 45,
      professorFeedback: "Aprobado. Procedimiento estándar. Recordar protocolo de anestesia local.",
    },
    {
      id: "4",
      studentName: "Carmen Torres",
      studentEmail: "carmen.torres@uleam.edu.ec",
      patientName: "Roberto Díaz",
      treatmentType: "Limpieza Periodontal",
      specialty: "Periodoncia",
      description: "Raspado y alisado radicular en cuadrante superior derecho. Paciente con gingivitis moderada.",
      requestDate: "2024-12-27T11:15:00Z",
      urgency: "low",
      status: "revision",
      documents: ["Sondaje periodontal", "Fotografías intraorales"],
      estimatedDuration: 60,
      professorFeedback: "Requiere evaluación adicional. Solicitar radiografías periapicales del área afectada.",
    },
    {
      id: "5",
      studentName: "Luis Morales",
      studentEmail: "luis.morales@uleam.edu.ec",
      patientName: "Sofía Herrera",
      treatmentType: "Sellantes de Fosetas",
      specialty: "Odontopediatría",
      description: "Aplicación de sellantes preventivos en molares permanentes. Paciente de 8 años.",
      requestDate: "2024-12-28T09:30:00Z",
      urgency: "low",
      status: "pending",
      documents: ["Examen clínico", "Autorización parental"],
      estimatedDuration: 30,
      notes: "Paciente colaboradora. Primera visita dental.",
    },
  ])

  const filteredRequests = requests.filter((request) => {
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || request.urgency === urgencyFilter
    return matchesStatus && matchesUrgency
  })

  const getUrgencyBadge = (urgency: string) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    }
    const labels = {
      low: "Baja",
      medium: "Media",
      high: "Alta",
      urgent: "Urgente",
    }
    return <Badge className={colors[urgency as keyof typeof colors]}>{labels[urgency as keyof typeof labels]}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      revision: "bg-blue-100 text-blue-800",
    }
    const labels = {
      pending: "Pendiente",
      approved: "Aprobado",
      rejected: "Rechazado",
      revision: "Revisión",
    }
    return <Badge className={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Badge>
  }

  const handleApprovalAction = () => {
    if (!selectedRequest) return

    if (!feedback.trim() && (approvalAction === "reject" || approvalAction === "revision")) {
      toast({
        title: "Error",
        description: "Por favor proporciona retroalimentación para esta acción",
        variant: "destructive",
      })
      return
    }

    const updatedRequest = {
      ...selectedRequest,
      status: approvalAction === "approve" ? "approved" : approvalAction === "reject" ? "rejected" : "revision",
      professorFeedback: feedback.trim() || undefined,
    }

    setRequests((prev) => prev.map((req) => (req.id === selectedRequest.id ? updatedRequest : req)))

    const actionLabels = {
      approve: "aprobada",
      reject: "rechazada",
      revision: "marcada para revisión",
    }

    toast({
      title: "Solicitud procesada",
      description: `La solicitud de ${selectedRequest.studentName} ha sido ${actionLabels[approvalAction]}`,
    })

    setIsApprovalDialogOpen(false)
    setFeedback("")
    setSelectedRequest(null)
  }

  const openApprovalDialog = (request: ApprovalRequest, action: "approve" | "reject" | "revision") => {
    setSelectedRequest(request)
    setApprovalAction(action)
    setFeedback("")
    setIsApprovalDialogOpen(true)
  }

  const pendingCount = requests.filter((r) => r.status === "pending").length
  const approvedCount = requests.filter((r) => r.status === "approved").length
  const rejectedCount = requests.filter((r) => r.status === "rejected").length
  const revisionCount = requests.filter((r) => r.status === "revision").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Aprobaciones de Tratamientos</h1>
          <p className="text-muted-foreground">Revisa y aprueba las solicitudes de tratamiento de los estudiantes</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Esperando aprobación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Tratamientos aprobados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Solicitudes rechazadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{revisionCount}</div>
            <p className="text-xs text-muted-foreground">Requieren revisión</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtra las solicitudes por estado y urgencia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="approved">Aprobadas</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
                <SelectItem value="revision">En Revisión</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Urgencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las urgencias</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de Aprobación</CardTitle>
          <CardDescription>{filteredRequests.length} solicitudes encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Tratamiento</TableHead>
                <TableHead>Urgencia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {request.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{request.studentName}</div>
                        <div className="text-sm text-muted-foreground">{request.specialty}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{request.patientName}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.treatmentType}</div>
                      <div className="text-sm text-muted-foreground">{request.estimatedDuration} min</div>
                    </div>
                  </TableCell>
                  <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(request.requestDate).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => openApprovalDialog(request, "approve")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => openApprovalDialog(request, "reject")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => openApprovalDialog(request, "revision")}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
            <DialogDescription>Información completa de la solicitud de tratamiento</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Información del Estudiante</Label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-sm font-medium">Nombre:</span>
                        <p className="text-sm">{selectedRequest.studentName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Email:</span>
                        <p className="text-sm">{selectedRequest.studentEmail}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Especialidad:</span>
                        <p className="text-sm">{selectedRequest.specialty}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Información del Tratamiento</Label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-sm font-medium">Paciente:</span>
                        <p className="text-sm">{selectedRequest.patientName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Tipo de Tratamiento:</span>
                        <p className="text-sm">{selectedRequest.treatmentType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Duración Estimada:</span>
                        <p className="text-sm">{selectedRequest.estimatedDuration} minutos</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Urgencia:</span>
                        {getUrgencyBadge(selectedRequest.urgency)}
                      </div>
                      <div>
                        <span className="text-sm font-medium">Estado:</span>
                        {getStatusBadge(selectedRequest.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Descripción del Tratamiento</Label>
                <p className="mt-2 text-sm bg-gray-50 p-3 rounded-md">{selectedRequest.description}</p>
              </div>
              {selectedRequest.notes && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Notas del Estudiante</Label>
                  <p className="mt-2 text-sm bg-blue-50 p-3 rounded-md">{selectedRequest.notes}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-500">Documentos Adjuntos</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedRequest.documents.map((doc, index) => (
                    <Badge key={index} variant="outline">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
              {selectedRequest.professorFeedback && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Retroalimentación del Profesor</Label>
                  <p className="mt-2 text-sm bg-green-50 p-3 rounded-md">{selectedRequest.professorFeedback}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium">Fecha de Solicitud:</span>
                <p className="text-sm">{new Date(selectedRequest.requestDate).toLocaleString("es-ES")}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Action Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {approvalAction === "approve" && "Aprobar Solicitud"}
              {approvalAction === "reject" && "Rechazar Solicitud"}
              {approvalAction === "revision" && "Solicitar Revisión"}
            </DialogTitle>
            <DialogDescription>
              {approvalAction === "approve" && "Confirma la aprobación de esta solicitud de tratamiento"}
              {approvalAction === "reject" && "Proporciona las razones para rechazar esta solicitud"}
              {approvalAction === "revision" && "Indica qué aspectos requieren revisión"}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Estudiante:</span> {selectedRequest.studentName}
                  </div>
                  <div>
                    <span className="font-medium">Paciente:</span> {selectedRequest.patientName}
                  </div>
                  <div>
                    <span className="font-medium">Tratamiento:</span> {selectedRequest.treatmentType}
                  </div>
                  <div>
                    <span className="font-medium">Urgencia:</span> {getUrgencyBadge(selectedRequest.urgency)}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">
                  {approvalAction === "approve" && "Comentarios (opcional)"}
                  {approvalAction === "reject" && "Razones del rechazo *"}
                  {approvalAction === "revision" && "Aspectos a revisar *"}
                </Label>
                <Textarea
                  id="feedback"
                  placeholder={
                    approvalAction === "approve"
                      ? "Comentarios adicionales para el estudiante..."
                      : approvalAction === "reject"
                        ? "Explica las razones del rechazo..."
                        : "Indica qué aspectos necesitan revisión..."
                  }
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleApprovalAction}
              className={
                approvalAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : approvalAction === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
              }
            >
              {approvalAction === "approve" && "Aprobar"}
              {approvalAction === "reject" && "Rechazar"}
              {approvalAction === "revision" && "Solicitar Revisión"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
