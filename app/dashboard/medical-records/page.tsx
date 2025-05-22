"use client"

import { useState } from "react"
import { FileText, Upload, Download, Plus, Search, Calendar, User, Clipboard, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// En una aplicación real, obtendríamos el rol del usuario desde la sesión
// Por ahora, simulamos un rol para mostrar el diseño
const userRole = "student" // Puede ser: "patient", "student", "professor"

// Datos de ejemplo para el expediente médico
const patientInfo = {
  name: "Ana García",
  id: "P12345",
  dob: "15/05/1990",
  phone: "555-123-4567",
  email: "ana.garcia@ejemplo.com",
  address: "Calle Principal 123, Ciudad",
  allergies: "Penicilina",
  medicalHistory: "Hipertensión controlada",
}

const medicalRecords = [
  {
    id: 1,
    date: "10/05/2025",
    type: "Diagnóstico",
    title: "Evaluación Inicial",
    description: "Paciente presenta caries en molares superiores. Se recomienda tratamiento de conducto.",
    doctor: "Dr. Martínez",
    specialty: "Endodoncia",
  },
  {
    id: 2,
    date: "15/05/2025",
    type: "Tratamiento",
    title: "Tratamiento de Conducto",
    description: "Se realizó tratamiento de conducto en molar superior derecho. Paciente tolera bien el procedimiento.",
    doctor: "Dr. Martínez",
    specialty: "Endodoncia",
  },
  {
    id: 3,
    date: "22/05/2025",
    type: "Seguimiento",
    title: "Control Post-Tratamiento",
    description: "Evolución favorable. No hay signos de infección o complicaciones.",
    doctor: "Dr. Martínez",
    specialty: "Endodoncia",
  },
]

const documents = [
  {
    id: 1,
    name: "Radiografía Panorámica",
    date: "10/05/2025",
    type: "Radiografía",
    uploadedBy: "Dr. Martínez",
  },
  {
    id: 2,
    name: "Consentimiento Informado",
    date: "10/05/2025",
    type: "Documento Legal",
    uploadedBy: "Ana García",
  },
  {
    id: 3,
    name: "Radiografía Periapical",
    date: "15/05/2025",
    type: "Radiografía",
    uploadedBy: "Dr. Martínez",
  },
  {
    id: 4,
    name: "Informe de Tratamiento",
    date: "22/05/2025",
    type: "Informe Clínico",
    uploadedBy: "Dr. Martínez",
  },
]

export default function MedicalRecordsPage() {
  const [isAddRecordDialogOpen, setIsAddRecordDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar registros médicos según el término de búsqueda
  const filteredRecords = medicalRecords.filter(
    (record) =>
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrar documentos según el término de búsqueda
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {userRole === "patient" ? "Mi Expediente Médico" : "Expediente Médico"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "patient"
              ? "Consulta tu historial clínico y documentos"
              : "Gestiona el historial clínico y documentos del paciente"}
          </p>
        </div>
        <div className="flex space-x-2">
          {userRole !== "patient" && (
            <>
              <Dialog open={isAddRecordDialogOpen} onOpenChange={setIsAddRecordDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Registro
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Añadir Nuevo Registro Médico</DialogTitle>
                    <DialogDescription>
                      Completa los detalles para añadir un nuevo registro al expediente del paciente
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="record-type" className="text-right">
                        Tipo
                      </Label>
                      <div className="col-span-3">
                        <Select>
                          <SelectTrigger id="record-type">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diagnostico">Diagnóstico</SelectItem>
                            <SelectItem value="tratamiento">Tratamiento</SelectItem>
                            <SelectItem value="seguimiento">Seguimiento</SelectItem>
                            <SelectItem value="receta">Receta Médica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="record-title" className="text-right">
                        Título
                      </Label>
                      <Input id="record-title" placeholder="Título del registro" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="record-description" className="text-right">
                        Descripción
                      </Label>
                      <Textarea
                        id="record-description"
                        placeholder="Descripción detallada"
                        className="col-span-3"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="record-specialty" className="text-right">
                        Especialidad
                      </Label>
                      <div className="col-span-3">
                        <Select>
                          <SelectTrigger id="record-specialty">
                            <SelectValue placeholder="Seleccionar especialidad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="endodoncia">Endodoncia</SelectItem>
                            <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                            <SelectItem value="periodoncia">Periodoncia</SelectItem>
                            <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                            <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="record-treatment" className="text-right">
                        Plan de Tratamiento
                      </Label>
                      <Textarea
                        id="record-treatment"
                        placeholder="Plan de tratamiento recomendado"
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsAddRecordDialogOpen(false)}>
                      Guardar Registro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Subir Documento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Subir Nuevo Documento</DialogTitle>
                    <DialogDescription>Sube un nuevo documento al expediente del paciente</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="document-name" className="text-right">
                        Nombre
                      </Label>
                      <Input id="document-name" placeholder="Nombre del documento" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="document-type" className="text-right">
                        Tipo
                      </Label>
                      <div className="col-span-3">
                        <Select>
                          <SelectTrigger id="document-type">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="radiografia">Radiografía</SelectItem>
                            <SelectItem value="consentimiento">Consentimiento Informado</SelectItem>
                            <SelectItem value="informe">Informe Clínico</SelectItem>
                            <SelectItem value="receta">Receta Médica</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="document-file" className="text-right">
                        Archivo
                      </Label>
                      <div className="col-span-3">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="document-file"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                              </p>
                              <p className="text-xs text-muted-foreground">PDF, JPG, PNG (MAX. 10MB)</p>
                            </div>
                            <Input id="document-file" type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="document-notes" className="text-right">
                        Notas
                      </Label>
                      <Textarea
                        id="document-notes"
                        placeholder="Notas adicionales sobre el documento"
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsUploadDialogOpen(false)}>
                      Subir Documento
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      {userRole !== "patient" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Información del Paciente</CardTitle>
            <CardDescription>Datos personales y antecedentes médicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Nombre:</span>
                  <span className="ml-2">{patientInfo.name}</span>
                </div>
                <div className="flex items-center">
                  <Clipboard className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">ID:</span>
                  <span className="ml-2">{patientInfo.id}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Fecha de Nacimiento:</span>
                  <span className="ml-2">{patientInfo.dob}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Teléfono:</span>
                  <span className="ml-2">{patientInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{patientInfo.email}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">Dirección:</span>
                  <span className="ml-2">{patientInfo.address}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium">Alergias:</span>
                  <span className="ml-2">{patientInfo.allergies}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium">Antecedentes Médicos:</span>
                  <span className="ml-2">{patientInfo.medicalHistory}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar en el expediente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="records">
        <TabsList>
          <TabsTrigger value="records">Registros Médicos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="records" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{record.description}</TableCell>
                  <TableCell>{record.doctor}</TableCell>
                  <TableCell>{record.specialty}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Subido por</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}
