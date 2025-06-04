"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ImageIcon, Video, CheckCircle, AlertCircle, X, Eye } from "lucide-react"

const mockAssignments = [
  {
    id: 1,
    title: "Caso Clínico: Tratamiento de Conducto",
    specialty: "Endodoncia",
    dueDate: "2024-02-15",
    allowedFormats: ["PDF", "DOC", "DOCX"],
    maxSize: "10MB",
  },
  {
    id: 2,
    title: "Diseño de Aparato Ortodóntico",
    specialty: "Ortodoncia",
    dueDate: "2024-02-20",
    allowedFormats: ["PDF", "JPG", "PNG"],
    maxSize: "5MB",
  },
  {
    id: 3,
    title: "Video Procedimiento Quirúrgico",
    specialty: "Cirugía Oral",
    dueDate: "2024-02-25",
    allowedFormats: ["MP4", "AVI", "MOV"],
    maxSize: "50MB",
  },
]

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: Date
}

export default function StudentUploadsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [comments, setComments] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files || !selectedAssignment) return

    const assignment = mockAssignments.find((a) => a.id.toString() === selectedAssignment)
    if (!assignment) return

    Array.from(files).forEach((file) => {
      // Validate file type
      const fileExtension = file.name.split(".").pop()?.toUpperCase()
      if (!fileExtension || !assignment.allowedFormats.includes(fileExtension)) {
        alert(`Formato no permitido. Formatos aceptados: ${assignment.allowedFormats.join(", ")}`)
        return
      }

      // Validate file size
      const maxSizeBytes = Number.parseInt(assignment.maxSize) * 1024 * 1024
      if (file.size > maxSizeBytes) {
        alert(`El archivo es demasiado grande. Tamaño máximo: ${assignment.maxSize}`)
        return
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
      }

      setUploadedFiles((prev) => [...prev, newFile])
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "pdf":
      case "doc":
      case "docx":
        return <FileText className="h-8 w-8 text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon className="h-8 w-8 text-blue-500" />
      case "mp4":
      case "avi":
      case "mov":
        return <Video className="h-8 w-8 text-purple-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const handleSubmit = () => {
    if (!selectedAssignment || uploadedFiles.length === 0) {
      alert("Por favor selecciona una tarea y sube al menos un archivo")
      return
    }

    // Simulate submission
    alert("Trabajo enviado exitosamente")
    setUploadedFiles([])
    setComments("")
    setSelectedAssignment("")
  }

  return (
    <div className="space-y-6 p-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Subir Trabajos
        </h1>
        <p className="text-gray-600 mt-2">Sube tus asignaciones y trabajos académicos</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Formulario de subida */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Upload className="h-5 w-5 text-blue-500" />
              Subir Nuevo Trabajo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignment">Seleccionar Tarea *</Label>
              <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tarea" />
                </SelectTrigger>
                <SelectContent>
                  {mockAssignments.map((assignment) => (
                    <SelectItem key={assignment.id} value={assignment.id.toString()}>
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-xs text-gray-500">
                          {assignment.specialty} - Vence: {assignment.dueDate}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedAssignment && (
              <div className="p-3 bg-blue-50 rounded-lg text-sm">
                <div className="font-medium text-blue-800 mb-1">Requisitos del archivo:</div>
                <div className="text-blue-700">
                  <div>
                    Formatos:{" "}
                    {mockAssignments.find((a) => a.id.toString() === selectedAssignment)?.allowedFormats.join(", ")}
                  </div>
                  <div>
                    Tamaño máximo: {mockAssignments.find((a) => a.id.toString() === selectedAssignment)?.maxSize}
                  </div>
                </div>
              </div>
            )}

            {/* Zona de arrastrar y soltar */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <div className="space-y-2">
                <p className="text-gray-600">
                  Arrastra y suelta archivos aquí, o{" "}
                  <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                    selecciona archivos
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      disabled={!selectedAssignment}
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-500">Puedes subir múltiples archivos</p>
              </div>
            </div>

            {/* Lista de archivos subidos */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Archivos seleccionados:</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {getFileIcon(file.name)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{file.name}</div>
                        <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="comments">Comentarios adicionales</Label>
              <Textarea
                id="comments"
                placeholder="Agrega comentarios sobre tu trabajo..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full btn-medical"
              disabled={!selectedAssignment || uploadedFiles.length === 0}
            >
              Enviar Trabajo
            </Button>
          </CardContent>
        </Card>

        {/* Historial de envíos */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Trabajos Enviados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Ejemplo de trabajo enviado */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">Caso Clínico: Endodoncia</h4>
                    <p className="text-sm text-gray-600">Enviado el 18/01/2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Calificado
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-red-500" />
                  <span>caso_clinico_endodoncia.pdf</span>
                  <span className="text-gray-500">(2.3 MB)</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <div className="text-sm font-medium text-green-600">Calificación: 95/100</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">Diseño Ortodóntico</h4>
                    <p className="text-sm text-gray-600">Enviado el 15/01/2024</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Eye className="w-3 h-3 mr-1" />
                    En revisión
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ImageIcon className="h-4 w-4 text-blue-500" />
                  <span>diseno_ortodontico.jpg</span>
                  <span className="text-gray-500">(1.8 MB)</span>
                </div>
                <div className="mt-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </div>
              </div>

              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No hay más trabajos enviados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
