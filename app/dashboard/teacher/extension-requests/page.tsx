"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, CheckCircle, XCircle, MessageSquare, Calendar, User } from "lucide-react"
import { assignments, students } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function ExtensionRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [professorResponse, setProfessorResponse] = useState("")
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  // Get extension requests for current professor
  const extensionRequests = assignments
    .filter((assignment) => assignment.professorId === user?.id)
    .flatMap(
      (assignment) =>
        assignment.submissions
          ?.filter((submission) => submission.extensionRequest?.status === "pending")
          .map((submission) => ({
            ...submission.extensionRequest,
            assignmentTitle: assignment.title,
            assignmentId: assignment.id,
            studentId: submission.studentId,
            submissionId: submission.id,
            originalDueDate: assignment.dueDate,
          })) || [],
    )

  const handleApproveRequest = (requestId: string, approved: boolean) => {
    toast({
      title: approved ? "Extensión Aprobada" : "Extensión Rechazada",
      description: `La solicitud ha sido ${approved ? "aprobada" : "rechazada"} exitosamente`,
    })

    setIsResponseDialogOpen(false)
    setProfessorResponse("")
  }

  const getStudentName = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    return student?.name || "Estudiante no encontrado"
  }

  const getDaysRequested = (originalDate: string, newDate: string) => {
    const original = new Date(originalDate)
    const requested = new Date(newDate)
    const diffTime = requested.getTime() - original.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Solicitudes de Extensión</h1>
          <p className="text-gray-600 mt-2">Gestiona las solicitudes de extensión de plazo de tus estudiantes</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{extensionRequests.length}</div>
            <p className="text-xs text-muted-foreground">Requieren respuesta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas Este Mes</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">Extensiones concedidas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas Este Mes</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">Solicitudes denegadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Extension Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes Pendientes</CardTitle>
          <CardDescription>Revisa y responde a las solicitudes de extensión de tus estudiantes</CardDescription>
        </CardHeader>
        <CardContent>
          {extensionRequests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Tarea</TableHead>
                  <TableHead>Fecha Original</TableHead>
                  <TableHead>Nueva Fecha</TableHead>
                  <TableHead>Días Adicionales</TableHead>
                  <TableHead>Fecha de Solicitud</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extensionRequests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{getStudentName(request.studentId)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.assignmentTitle}</div>
                        <div className="text-sm text-gray-500">ID: {request.assignmentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {request.originalDueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        {request.newDueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        +{getDaysRequested(request.originalDueDate, request.newDueDate)} días
                      </Badge>
                    </TableCell>
                    <TableCell>{request.requestedDate}</TableCell>
                    <TableCell>
                      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedRequest(request)}
                            className="gap-2"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Revisar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Solicitud de Extensión</DialogTitle>
                            <DialogDescription>
                              Revisa los detalles de la solicitud y proporciona tu respuesta
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-medium">Estudiante</Label>
                                  <p className="text-sm text-gray-600">{getStudentName(selectedRequest.studentId)}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Tarea</Label>
                                  <p className="text-sm text-gray-600">{selectedRequest.assignmentTitle}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Fecha Original</Label>
                                  <p className="text-sm text-gray-600">{selectedRequest.originalDueDate}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Nueva Fecha Propuesta</Label>
                                  <p className="text-sm text-gray-600">{selectedRequest.newDueDate}</p>
                                </div>
                              </div>

                              <div>
                                <Label className="font-medium">Motivo de la Solicitud</Label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-700">{selectedRequest.reason}</p>
                                </div>
                              </div>

                              <div>
                                <Label className="font-medium">Días Adicionales Solicitados</Label>
                                <div className="mt-1">
                                  <Badge className="bg-blue-100 text-blue-800">
                                    +{getDaysRequested(selectedRequest.originalDueDate, selectedRequest.newDueDate)}{" "}
                                    días
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="response">Respuesta del Profesor</Label>
                                <Textarea
                                  id="response"
                                  value={professorResponse}
                                  onChange={(e) => setProfessorResponse(e.target.value)}
                                  placeholder="Proporciona comentarios sobre tu decisión..."
                                  rows={4}
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter className="flex justify-between">
                            <div className="flex gap-2">
                              <Button
                                variant="destructive"
                                onClick={() => handleApproveRequest(selectedRequest?.id, false)}
                                className="gap-2"
                              >
                                <XCircle className="h-4 w-4" />
                                Rechazar
                              </Button>
                              <Button onClick={() => handleApproveRequest(selectedRequest?.id, true)} className="gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Aprobar
                              </Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No hay solicitudes pendientes</h3>
              <p className="text-gray-500">Las nuevas solicitudes de extensión aparecerán aquí</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Decisions */}
      <Card>
        <CardHeader>
          <CardTitle>Decisiones Recientes</CardTitle>
          <CardDescription>Historial de solicitudes procesadas recientemente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                student: "Ana García",
                assignment: "Caso Clínico de Endodoncia",
                decision: "approved",
                date: "2025-01-20",
                response: "Aprobada por motivos médicos justificados",
              },
              {
                student: "Carlos López",
                assignment: "Análisis Cefalométrico",
                decision: "rejected",
                date: "2025-01-18",
                response: "Tiempo suficiente para completar la tarea",
              },
            ].map((decision, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${decision.decision === "approved" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {decision.decision === "approved" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{decision.student}</p>
                    <p className="text-sm text-gray-600">{decision.assignment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      decision.decision === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }
                  >
                    {decision.decision === "approved" ? "Aprobada" : "Rechazada"}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{decision.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
