"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para las solicitudes de aprobación
const approvalRequests = [
  {
    id: 1,
    title: "Aprobación de Plan de Tratamiento",
    studentName: "Carlos López",
    studentId: "E12345",
    patientName: "Ana García",
    patientId: "P12345",
    description: "Solicitud de aprobación para iniciar tratamiento de conducto en molar superior derecho.",
    submittedDate: "18/05/2025",
    status: "pending",
    specialty: "Endodoncia",
    attachments: [
      { name: "Radiografía Panorámica.jpg", type: "image" },
      { name: "Plan de Tratamiento.pdf", type: "document" },
    ],
  },
  {
    id: 2,
    title: "Validación de Diagnóstico",
    studentName: "María Fernández",
    studentId: "E12346",
    patientName: "Juan Pérez",
    patientId: "P12346",
    description: "Solicitud de validación de diagnóstico de pulpitis irreversible en premolar inferior izquierdo.",
    submittedDate: "17/05/2025",
    status: "pending",
    specialty: "Endodoncia",
    attachments: [
      { name: "Radiografía Periapical.jpg", type: "image" },
      { name: "Historia Clínica.pdf", type: "document" },
    ],
  },
  {
    id: 3,
    title: "Aprobación de Finalización de Tratamiento",
    studentName: "Carlos López",
    studentId: "E12345",
    patientName: "Sofía Ramírez",
    patientId: "P12347",
    description: "Solicitud de aprobación para dar por finalizado el tratamiento de conducto en incisivo central.",
    submittedDate: "15/05/2025",
    status: "pending",
    specialty: "Endodoncia",
    attachments: [
      { name: "Radiografía Final.jpg", type: "image" },
      { name: "Informe de Tratamiento.pdf", type: "document" },
    ],
  },
  {
    id: 4,
    title: "Aprobación de Procedimiento Quirúrgico",
    studentName: "Juan Pérez",
    studentId: "E12347",
    patientName: "Pedro Gómez",
    patientId: "P12348",
    description: "Solicitud de aprobación para realizar extracción de terceros molares inferiores impactados.",
    submittedDate: "16/05/2025",
    status: "approved",
    specialty: "Cirugía Oral",
    attachments: [
      { name: "Tomografía Computarizada.jpg", type: "image" },
      { name: "Plan Quirúrgico.pdf", type: "document" },
    ],
    response:
      "Aprobado. Proceda con la extracción según el plan propuesto. Recuerde seguir el protocolo de asepsia y antisepsia.",
    responseDate: "17/05/2025",
  },
  {
    id: 5,
    title: "Validación de Diagnóstico Periodontal",
    studentName: "Sofía Ramírez",
    studentId: "E12348",
    patientName: "Laura Torres",
    patientId: "P12349",
    description: "Solicitud de validación de diagnóstico de periodontitis crónica generalizada moderada.",
    submittedDate: "14/05/2025",
    status: "rejected",
    specialty: "Periodoncia",
    attachments: [
      { name: "Periodontograma.pdf", type: "document" },
      { name: "Fotografías Intraorales.jpg", type: "image" },
    ],
    response:
      "Rechazado. El diagnóstico no corresponde con los hallazgos clínicos. Revise los criterios diagnósticos y presente nuevamente la solicitud.",
    responseDate: "15/05/2025",
  },
]

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<(typeof approvalRequests)[0] | null>(null)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false)
  const [responseText, setResponseText] = useState("")
  const [responseAction, setResponseAction] = useState<"approve" | "reject" | null>(null)

  // Filtrar solicitudes según los criterios de búsqueda y filtros
  const filteredRequests = approvalRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesSpecialty =
      specialtyFilter === "all" || request.specialty.toLowerCase() === specialtyFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  // Contar solicitudes por estado
  const pendingCount = approvalRequests.filter((r) => r.status === "pending").length
  const approvedCount = approvalRequests.filter((r) => r.status === "approved").length
  const rejectedCount = approvalRequests.filter((r) => r.status === "rejected").length

  // Función para abrir el diálogo de respuesta
  const openResponseDialog = (request: (typeof approvalRequests)[0], action: "approve" | "reject") => {
    setSelectedRequest(request)
    setResponseAction(action)
    setResponseText("")
    setIsResponseDialogOpen(true)
  }

  // Función para abrir el diálogo de detalles de la solicitud
  const openRequestDialog = (request: (typeof approvalRequests)[0]) => {
    setSelectedRequest(request)
    setIsRequestDialogOpen(true)
  }

  // Función para enviar la respuesta
  const submitResponse = () => {
    // Aquí iría la lógica para actualizar el estado de la solicitud
    // Por ahora, solo cerramos el diálogo
    setIsResponseDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Aprobaciones</h1>
        <p className="text-muted-foreground">Gestiona las solicitudes de aprobación de los estudiantes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <CardDescription>Solicitudes que requieren tu revisión</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CardDescription>Solicitudes que has aprobado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
            <CardDescription>Solicitudes que has rechazado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar solicitudes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] md:w-[300px]"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="approved">Aprobadas</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                <SelectItem value="endodoncia">Endodoncia</SelectItem>
                <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                <SelectItem value="periodoncia">Periodoncia</SelectItem>
                <SelectItem value="cirugía oral">Cirugía Oral</SelectItem>
                <SelectItem value="odontopediatría">Odontopediatría</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="table">Tabla</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-muted-foreground">
                No se encontraron solicitudes que coincidan con los criterios de búsqueda.
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-medium">{request.title}</CardTitle>
                      <CardDescription>
                        Estudiante: {request.studentName} ({request.studentId}) | Paciente: {request.patientName} (
                        {request.patientId})
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        request.status === "pending"
                          ? "bg-yellow-500"
                          : request.status === "approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }
                    >
                      {request.status === "pending"
                        ? "Pendiente"
                        : request.status === "approved"
                          ? "Aprobado"
                          : "Rechazado"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {request.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {attachment.type === "image" ? <span>📷</span> : <span>📄</span>}
                        {attachment.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>Especialidad: {request.specialty}</div>
                    <div>Enviado: {request.submittedDate}</div>
                  </div>
                  {request.status !== "pending" && (
                    <div className="mt-2 p-2 bg-muted rounded-md text-sm">
                      <p className="font-medium">Respuesta ({request.responseDate}):</p>
                      <p>{request.response}</p>
                    </div>
                  )}
                </CardContent>
                <div className="px-6 py-2 bg-muted/50 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => openRequestDialog(request)}>
                    Ver detalles
                  </Button>
                  {request.status === "pending" && (
                    <>
                      <Button variant="default" size="sm" onClick={() => openResponseDialog(request, "approve")}>
                        Aprobar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => openResponseDialog(request, "reject")}>
                        Rechazar
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="table">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>{request.studentName}</TableCell>
                      <TableCell>{request.patientName}</TableCell>
                      <TableCell>{request.specialty}</TableCell>
                      <TableCell>{request.submittedDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            request.status === "pending"
                              ? "bg-yellow-500"
                              : request.status === "approved"
                                ? "bg-green-500"
                                : "bg-red-500"
                          }
                        >
                          {request.status === "pending"
                            ? "Pendiente"
                            : request.status === "approved"
                              ? "Aprobado"
                              : "Rechazado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openRequestDialog(request)}>
                            Ver
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => openResponseDialog(request, "approve")}
                              >
                                Aprobar
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openResponseDialog(request, "reject")}
                              >
                                Rechazar
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
        </TabsContent>
      </Tabs>

      {/* Diálogo de detalles de la solicitud */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRequest.title}</DialogTitle>
                <DialogDescription>
                  Solicitud de {selectedRequest.studentName} ({selectedRequest.studentId})
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Paciente:</div>
                  <div className="col-span-3">
                    {selectedRequest.patientName} ({selectedRequest.patientId})
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Especialidad:</div>
                  <div className="col-span-3">{selectedRequest.specialty}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Fecha de envío:</div>
                  <div className="col-span-3">{selectedRequest.submittedDate}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Estado:</div>
                  <div className="col-span-3">
                    <Badge
                      className={
                        selectedRequest.status === "pending"
                          ? "bg-yellow-500"
                          : selectedRequest.status === "approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }
                    >
                      {selectedRequest.status === "pending"
                        ? "Pendiente"
                        : selectedRequest.status === "approved"
                          ? "Aprobado"
                          : "Rechazado"}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Descripción:</div>
                  <div className="col-span-3">{selectedRequest.description}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Adjuntos:</div>
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {attachment.type === "image" ? <span>📷</span> : <span>📄</span>}
                        {attachment.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedRequest.status !== "pending" && (
                  <>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="font-medium">Respuesta:</div>
                      <div className="col-span-3">{selectedRequest.response}</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="font-medium">Fecha de respuesta:</div>
                      <div className="col-span-3">{selectedRequest.responseDate}</div>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                {selectedRequest.status === "pending" && (
                  <>
                    <Button
                      variant="default"
                      onClick={() => {
                        setIsRequestDialogOpen(false)
                        openResponseDialog(selectedRequest, "approve")
                      }}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setIsRequestDialogOpen(false)
                        openResponseDialog(selectedRequest, "reject")
                      }}
                    >
                      Rechazar
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de respuesta */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent>
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>{responseAction === "approve" ? "Aprobar" : "Rechazar"} solicitud</DialogTitle>
                <DialogDescription>
                  {responseAction === "approve"
                    ? "Proporciona comentarios o instrucciones adicionales para el estudiante."
                    : "Explica el motivo del rechazo y proporciona orientación para que el estudiante pueda corregir su solicitud."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Solicitud:</div>
                  <div className="col-span-3">{selectedRequest.title}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Estudiante:</div>
                  <div className="col-span-3">{selectedRequest.studentName}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Paciente:</div>
                  <div className="col-span-3">{selectedRequest.patientName}</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Comentarios:</div>
                  <div className="col-span-3">
                    <Textarea
                      placeholder="Escribe tus comentarios aquí..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button variant={responseAction === "approve" ? "default" : "destructive"} onClick={submitResponse}>
                  {responseAction === "approve" ? "Aprobar" : "Rechazar"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
