"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  MessageSquare,
  Download,
  Filter,
} from "lucide-react"

interface ApprovalRequest {
  id: string
  studentName: string
  studentEmail: string
  patientName: string
  patientAge: number
  treatmentType: string
  specialty: string
  description: string
  urgency: "low" | "medium" | "high" | "urgent"
  status: "pending" | "approved" | "rejected" | "revision"
  submittedAt: string
  reviewedAt?: string
  reviewerComments?: string
  attachments: string[]
  estimatedDuration: number
  complications?: string
  medicalHistory: string[]
}

export default function TeacherApprovalsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "revision">("approve")
  const [reviewComments, setReviewComments] = useState("")

  const [requests, setRequests] = useState<ApprovalRequest[]>([
    {
      id: "1",
      studentName: "Juan Carlos Pérez Mendoza",
      studentEmail: "juan.perez@uleam.edu.ec",
      patientName: "María González Pérez",
      patientAge: 28,
      treatmentType: "Tratamiento de Conducto",
      specialty: "Endodoncia",
      description:
        "Paciente presenta dolor intenso en molar superior derecho. Radiografía muestra lesión periapical. Se requiere tratamiento endodóntico urgente.",
      urgency: "high",
      status: "pending",
      submittedAt: "2024-12-28T09:00:00Z",
      attachments: ["radiografia_periapical.jpg", "historia_clinica.pdf"],
      estimatedDuration: 90,
      medicalHistory: ["Hipertensión controlada", "Alergia a penicilina"],
    },
    {
      id: "2",
      studentName: "Ana María López Silva",
      studentEmail: "ana.lopez@uleam.edu.ec",
      patientName: "Carlos Ruiz Mendoza",
      patientAge: 35,
      treatmentType: "Colocación de Brackets",
      specialty: "Ortodoncia",
      description:
        "Paciente con maloclusión clase II. Requiere tratamiento ortodóntico con brackets metálicos. Evaluación completa realizada.",
      urgency: "medium",
      status: "approved",
      submittedAt: "2024-12-27T14:30:00Z",
      reviewedAt: "2024-12-28T08:00:00Z",
      reviewerComments: "Caso bien documentado. Proceder con el tratamiento según protocolo establecido.",
      attachments: ["modelos_estudio.pdf", "radiografia_panoramica.jpg", "fotos_clinicas.pdf"],
      estimatedDuration: 60,
      medicalHistory: ["Sin antecedentes relevantes"],
    },
    {
      id: "3",
      studentName: "Pedro Antonio Silva Castro",
      studentEmail: "pedro.silva@uleam.edu.ec",
      patientName: "Laura Martínez Silva",
      patientAge: 22,
      treatmentType: "Extracción de Tercer Molar",
      specialty: "Cirugía Oral y Maxilofacial",
      description:
        "Extracción quirúrgica de tercer molar inferior izquierdo impactado. Posición mesioangular con proximidad al nervio dentario inferior.",
      urgency: "medium",
      status: "revision",
      submittedAt: "2024-12-26T11:15:00Z",
      reviewedAt: "2024-12-27T16:00:00Z",
      reviewerComments:
        "Solicitar tomografía adicional para evaluar relación con nervio dentario. Revisar protocolo de sedación.",
      attachments: ["radiografia_panoramica.jpg", "consentimiento_informado.pdf"],
      estimatedDuration: 45,
      complications: "Proximidad al nervio dentario inferior",
      medicalHistory: ["Ansiedad dental"],
    },
    {
      id: "4",
      studentName: "Carmen Elena Torres Vera",
      studentEmail: "carmen.torres@uleam.edu.ec",
      patientName: "Roberto Díaz Castro",
      patientAge: 45,
      treatmentType: "Raspado y Alisado Radicular",
      specialty: "Periodoncia",
      description:
        "Paciente con periodontitis crónica generalizada. Bolsas periodontales de 5-7mm. Requiere terapia periodontal no quirúrgica.",
      urgency: "medium",
      status: "pending",
      submittedAt: "2024-12-28T10:45:00Z",
      attachments: ["sondaje_periodontal.pdf", "radiografias_periapicales.jpg"],
      estimatedDuration: 75,
      medicalHistory: ["Diabetes tipo 2 controlada", "Fumador"],
    },
    {
      id: "5",
      studentName: "Luis Fernando Morales Ponce",
      studentEmail: "luis.morales@uleam.edu.ec",
      patientName: "Sofía Herrera Alava",
      patientAge: 8,
      treatmentType: "Pulpotomía",
      specialty: "Odontopediatría",
      description:
        "Niña de 8 años con caries profunda en molar temporal. Se requiere pulpotomía para preservar la pieza dental hasta su exfoliación natural.",
      urgency: "high",
      status: "rejected",
      submittedAt: "2024-12-25T15:20:00Z",
      reviewedAt: "2024-12-26T09:00:00Z",
      reviewerComments:
        "Documentación incompleta. Falta evaluación radiográfica y consentimiento de los padres. Reenviar con documentación completa.",
      attachments: ["historia_clinica_pediatrica.pdf"],
      estimatedDuration: 30,
      medicalHistory: ["Sin antecedentes médicos relevantes"],
    },
    {
      id: "6",
      studentName: "María José Herrera Alava",
      studentEmail: "maria.herrera@uleam.edu.ec",
      patientName: "Pedro Morales Vera",
      patientAge: 38,
      treatmentType: "Retratamiento Endodóntico",
      specialty: "Endodoncia",
      description:
        "Retratamiento de conducto en premolar inferior con fracaso del tratamiento previo. Presencia de lesión periapical persistente.",
      urgency: "urgent",
      status: "pending",
      submittedAt: "2024-12-28T13:00:00Z",
      attachments: ["radiografia_previa.jpg", "radiografia_actual.jpg", "historia_clinica.pdf"],
      estimatedDuration: 120,
      complications: "Fracaso de tratamiento previo, anatomía compleja",
      medicalHistory: ["Hipertensión", "Tratamiento anticoagulante"],
    },
  ])

  const specialties = [
    "Endodoncia",
    "Ortodoncia",
    "Cirugía Oral y Maxilofacial",
    "Periodoncia",
    "Odontopediatría",
    "Prostodoncia",
  ]

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.treatmentType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || request.urgency === urgencyFilter
    const matchesSpecialty = specialtyFilter === "all" || request.specialty === specialtyFilter

    return matchesSearch && matchesStatus && matchesUrgency && matchesSpecialty
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pendiente" },
      approved: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Aprobado" },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Rechazado" },
      revision: { color: "bg-blue-100 text-blue-800", icon: AlertTriangle, label: "Revisión" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      low: { color: "bg-gray-100 text-gray-800", label: "Baja" },
      medium: { color: "bg-blue-100 text-blue-800", label: "Media" },
      high: { color: "bg-orange-100 text-orange-800", label: "Alta" },
      urgent: { color: "bg-red-100 text-red-800", label: "Urgente" },
    }
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const handleReview = (action: "approve" | "reject" | "revision") => {
    if (!selectedRequest) return

    if (!reviewComments.trim() && action !== "approve") {
      toast({
        title: "Error",
        description: "Por favor proporciona comentarios para esta acción",
        variant: "destructive",
      })
      return
    }

    const updatedRequest = {
      ...selectedRequest,
      status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "revision",
      reviewedAt: new Date().toISOString(),
      reviewerComments: reviewComments.trim() || undefined,
    }

    setRequests((prev) => prev.map((req) => (req.id === selectedRequest.id ? updatedRequest : req)))

    const actionLabels = {
      approve: "aprobada",
      reject: "rechazada",
      revision: "enviada a revisión",
    }

    toast({
      title: "Solicitud procesada",
      description: `La solicitud de ${selectedRequest.studentName} ha sido ${actionLabels[action]}`,
    })

    setIsReviewDialogOpen(false)
    setReviewComments("")
    setSelectedRequest(null)
  }

  const openReviewDialog = (request: ApprovalRequest, action: "approve" | "reject" | "revision") => {
    setSelectedRequest(request)
    setReviewAction(action)
    setReviewComments("")
    setIsReviewDialogOpen(true)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(requests, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "solicitudes_aprobacion.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Exportación completada",
      description: "Los datos han sido exportados exitosamente",
    })
  }

  const pendingCount = requests.filter((r) => r.status === "pending").length
  const approvedCount = requests.filter((r) => r.status === "approved").length
  const rejectedCount = requests.filter((r) => r.status === "rejected").length
  const revisionCount = requests.filter((r) => r.status === "revision").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Solicitudes de Aprobación</h1>
          <p className="text-muted-foreground">Revisa y aprueba las solicitudes de tratamiento de los estudiantes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
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
            <p className="text-xs text-muted-foreground">Requieren revisión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Listas para proceder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{revisionCount}</div>
            <p className="text-xs text-muted-foreground">Requieren cambios</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">No aprobadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>Busca y filtra las solicitudes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por estudiante, paciente o tratamiento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="approved">Aprobadas</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
                <SelectItem value="revision">En Revisión</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Urgencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de Tratamiento</CardTitle>
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
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
                    <div>
                      <div className="font-medium">{request.patientName}</div>
                      <div className="text-sm text-muted-foreground">{request.patientAge} años</div>
                    </div>
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
                    {new Date(request.submittedAt).toLocaleDateString("es-ES")}
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
                            className="text-green-600"
                            onClick={() => openReviewDialog(request, "approve")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                            onClick={() => openReviewDialog(request, "revision")}
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => openReviewDialog(request, "reject")}
                          >
                            <XCircle className="h-4 w-4" />
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
            <DialogDescription>Información completa de la solicitud de tratamiento</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Student and Patient Info */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Información del Estudiante
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Nombre</Label>
                      <p>{selectedRequest.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p>{selectedRequest.studentEmail}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Especialidad</Label>
                      <Badge variant="outline">{selectedRequest.specialty}</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Información del Paciente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Nombre</Label>
                      <p>{selectedRequest.patientName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Edad</Label>
                      <p>{selectedRequest.patientAge} años</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Antecedentes Médicos</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedRequest.medicalHistory.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Treatment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Detalles del Tratamiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Tipo de Tratamiento</Label>
                      <p className="font-medium">{selectedRequest.treatmentType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Duración Estimada</Label>
                      <p>{selectedRequest.estimatedDuration} minutos</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Urgencia</Label>
                      {getUrgencyBadge(selectedRequest.urgency)}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Estado</Label>
                      {getStatusBadge(selectedRequest.status)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Descripción</Label>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedRequest.description}</p>
                  </div>
                  {selectedRequest.complications && (
                    <div>
                      <Label className="text-sm font-medium">Complicaciones Potenciales</Label>
                      <p className="text-sm bg-red-50 p-3 rounded-md text-red-800">{selectedRequest.complications}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentos Adjuntos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Review History */}
              {selectedRequest.reviewedAt && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Historial de Revisión
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Fecha de Revisión</Label>
                      <p>{new Date(selectedRequest.reviewedAt).toLocaleString("es-ES")}</p>
                    </div>
                    {selectedRequest.reviewerComments && (
                      <div>
                        <Label className="text-sm font-medium">Comentarios del Revisor</Label>
                        <p className="text-sm bg-blue-50 p-3 rounded-md">{selectedRequest.reviewerComments}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Submission Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label className="text-sm font-medium">Fecha de Envío</Label>
                    <p>{new Date(selectedRequest.submittedAt).toLocaleString("es-ES")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve" && "Aprobar Solicitud"}
              {reviewAction === "reject" && "Rechazar Solicitud"}
              {reviewAction === "revision" && "Solicitar Revisión"}
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approve" && "Confirma la aprobación de esta solicitud de tratamiento"}
              {reviewAction === "reject" && "Proporciona los motivos para rechazar esta solicitud"}
              {reviewAction === "revision" && "Indica qué cambios o información adicional se requiere"}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium">{selectedRequest.treatmentType}</h4>
                <p className="text-sm text-gray-600">
                  Estudiante: {selectedRequest.studentName} | Paciente: {selectedRequest.patientName}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">
                  {reviewAction === "approve" ? "Comentarios (opcional)" : "Comentarios *"}
                </Label>
                <Textarea
                  id="comments"
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  placeholder={
                    reviewAction === "approve"
                      ? "Comentarios adicionales sobre la aprobación..."
                      : reviewAction === "reject"
                        ? "Explica los motivos del rechazo..."
                        : "Especifica qué cambios o información adicional se requiere..."
                  }
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => handleReview(reviewAction)}
              className={
                reviewAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : reviewAction === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
              }
            >
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
