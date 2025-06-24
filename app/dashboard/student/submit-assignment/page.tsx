"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, FileText, Clock, AlertTriangle, CheckCircle, X, MessageSquare } from "lucide-react"
import { assignments } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function SubmitAssignmentPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submissionNotes, setSubmissionNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [extensionReason, setExtensionReason] = useState("")
  const [newDueDate, setNewDueDate] = useState("")
  const [isExtensionDialogOpen, setIsExtensionDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const { toast } = useToast()
  const { user } = useAuth()

  // Filter assignments for current student
  const studentAssignments = assignments.filter((assignment) => assignment.studentIds.includes(user?.id || ""))

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmitAssignment = async (assignmentId: string) => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Debes seleccionar al menos un archivo",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSubmitting(false)
          toast({
            title: "Tarea Enviada",
            description: "Tu tarea ha sido enviada exitosamente",
          })
          setSelectedFiles([])
          setSubmissionNotes("")
          return 0
        }
        return prev + 10
      })
    }, 200)
  }

  const handleRequestExtension = () => {
    if (!extensionReason || !newDueDate) {
      toast({
        title: "Error",
        description: "Debes completar todos los campos",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Solicitud Enviada",
      description: "Tu solicitud de extensión ha sido enviada al profesor",
    })

    setExtensionReason("")
    setNewDueDate("")
    setIsExtensionDialogOpen(false)
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusBadge = (assignment: any) => {
    const submission = assignment.submissions?.find((sub: any) => sub.studentId === user?.id)

    if (submission) {
      switch (submission.status) {
        case "submitted":
          return <Badge className="bg-blue-100 text-blue-800">Enviada</Badge>
        case "graded":
          return <Badge className="bg-green-100 text-green-800">Calificada</Badge>
        case "late":
          return <Badge className="bg-red-100 text-red-800">Tardía</Badge>
        case "extension_requested":
          return <Badge className="bg-yellow-100 text-yellow-800">Extensión Solicitada</Badge>
      }
    }

    if (isOverdue(assignment.dueDate)) {
      return <Badge className="bg-red-100 text-red-800">Vencida</Badge>
    }

    const daysLeft = getDaysUntilDue(assignment.dueDate)
    if (daysLeft <= 1) {
      return <Badge className="bg-orange-100 text-orange-800">Urgente</Badge>
    }

    return <Badge className="bg-gray-100 text-gray-800">Pendiente</Badge>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mis Tareas</h1>
          <p className="text-gray-600 mt-2">Gestiona y envía tus tareas académicas</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tareas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Asignadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {studentAssignments.filter((a) => !a.submissions?.some((s) => s.studentId === user?.id)).length}
            </div>
            <p className="text-xs text-muted-foreground">Por entregar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enviadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {studentAssignments.filter((a) => a.submissions?.some((s) => s.studentId === user?.id)).length}
            </div>
            <p className="text-xs text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8.5</div>
            <p className="text-xs text-muted-foreground">Calificación</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <div className="grid gap-4">
        {studentAssignments.map((assignment) => {
          const submission = assignment.submissions?.find((sub: any) => sub.studentId === user?.id)
          const daysLeft = getDaysUntilDue(assignment.dueDate)

          return (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription className="mt-2">{assignment.description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {getStatusBadge(assignment)}
                    <Badge variant="outline">{assignment.specialty}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="font-medium text-gray-700">Fecha de Entrega</Label>
                      <p className="text-gray-600">{assignment.dueDate}</p>
                    </div>
                    <div>
                      <Label className="font-medium text-gray-700">Días Restantes</Label>
                      <p
                        className={`font-medium ${daysLeft <= 1 ? "text-red-600" : daysLeft <= 3 ? "text-orange-600" : "text-green-600"}`}
                      >
                        {daysLeft > 0 ? `${daysLeft} días` : "Vencida"}
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium text-gray-700">Puntuación Máxima</Label>
                      <p className="text-gray-600">{assignment.maxScore} puntos</p>
                    </div>
                    <div>
                      <Label className="font-medium text-gray-700">Estado</Label>
                      <p className="text-gray-600">{submission ? "Enviada" : "Pendiente"}</p>
                    </div>
                  </div>

                  {assignment.instructions && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Label className="font-medium text-blue-800">Instrucciones</Label>
                      <p className="text-sm text-blue-700 mt-1">{assignment.instructions}</p>
                    </div>
                  )}

                  {submission ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Label className="font-medium text-green-800">Tarea Enviada</Label>
                        </div>
                        <p className="text-sm text-green-700">Enviada el: {submission.submittedDate}</p>
                        {submission.notes && <p className="text-sm text-green-700 mt-1">Notas: {submission.notes}</p>}
                      </div>

                      {submission.grade && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Label className="font-medium text-blue-800">
                            Calificación: {submission.grade}/{assignment.maxScore}
                          </Label>
                          {submission.feedback && <p className="text-sm text-blue-700 mt-1">{submission.feedback}</p>}
                        </div>
                      )}

                      {submission.extensionRequest && (
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <Label className="font-medium text-yellow-800">Solicitud de Extensión</Label>
                          <p className="text-sm text-yellow-700 mt-1">
                            Estado:{" "}
                            {submission.extensionRequest.status === "pending"
                              ? "Pendiente"
                              : submission.extensionRequest.status === "approved"
                                ? "Aprobada"
                                : "Rechazada"}
                          </p>
                          <p className="text-sm text-yellow-700">
                            Nueva fecha: {submission.extensionRequest.newDueDate}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* File Upload Section */}
                      <div>
                        <Label className="font-medium text-gray-700">Subir Archivos</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                            id={`file-upload-${assignment.id}`}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          <label htmlFor={`file-upload-${assignment.id}`} className="cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                            <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG - Máximo 10MB por archivo</p>
                          </label>
                        </div>

                        {selectedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <Label>Archivos Seleccionados ({selectedFiles.length})</Label>
                            {selectedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm">{file.name}</span>
                                  <span className="text-xs text-gray-500">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Upload Progress */}
                      {isSubmitting && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subiendo archivos...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      {/* Submission Notes */}
                      <div>
                        <Label htmlFor="notes">Notas de Entrega (Opcional)</Label>
                        <Textarea
                          id="notes"
                          value={submissionNotes}
                          onChange={(e) => setSubmissionNotes(e.target.value)}
                          placeholder="Agrega comentarios sobre tu entrega..."
                          className="mt-1"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between">
                        <Dialog open={isExtensionDialogOpen} onOpenChange={setIsExtensionDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="gap-2"
                              onClick={() => setSelectedAssignment(assignment)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              Solicitar Extensión
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Solicitar Extensión de Plazo</DialogTitle>
                              <DialogDescription>
                                Explica el motivo de tu solicitud de extensión para {selectedAssignment?.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="reason">Motivo de la Solicitud</Label>
                                <Textarea
                                  id="reason"
                                  value={extensionReason}
                                  onChange={(e) => setExtensionReason(e.target.value)}
                                  placeholder="Explica detalladamente el motivo de tu solicitud..."
                                  rows={4}
                                />
                              </div>
                              <div>
                                <Label htmlFor="new-date">Nueva Fecha Propuesta</Label>
                                <Input
                                  id="new-date"
                                  type="date"
                                  value={newDueDate}
                                  onChange={(e) => setNewDueDate(e.target.value)}
                                  min={new Date().toISOString().split("T")[0]}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsExtensionDialogOpen(false)}>
                                Cancelar
                              </Button>
                              <Button onClick={handleRequestExtension}>Enviar Solicitud</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Button
                          onClick={() => handleSubmitAssignment(assignment.id)}
                          disabled={selectedFiles.length === 0 || isSubmitting}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          {isSubmitting ? "Enviando..." : "Enviar Tarea"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {studentAssignments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No tienes tareas asignadas</h3>
            <p className="text-gray-500">Las nuevas tareas aparecerán aquí cuando sean publicadas por tus profesores</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
