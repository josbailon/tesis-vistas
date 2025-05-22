import { getCurrentUser } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Plus, Eye, Upload, Download } from "lucide-react"

// Mock data for patient records
const patientsList = [
  {
    id: "pat1",
    name: "María González",
    lastVisit: "2023-05-15",
    specialty: "Endodoncia",
    status: "En tratamiento",
  },
  {
    id: "pat2",
    name: "Juan Pérez",
    lastVisit: "2023-05-10",
    specialty: "Ortodoncia",
    status: "Evaluación inicial",
  },
  {
    id: "pat3",
    name: "Laura Torres",
    lastVisit: "2023-04-28",
    specialty: "Endodoncia",
    status: "Tratamiento completado",
  },
  {
    id: "pat4",
    name: "Roberto Sánchez",
    lastVisit: "2023-05-05",
    specialty: "Periodoncia",
    status: "En tratamiento",
  },
]

// Mock data for documents
const documentsList = [
  {
    id: "doc1",
    patientName: "María González",
    patientId: "pat1",
    name: "Radiografía Panorámica",
    date: "2023-05-10",
    type: "image/jpeg",
    size: "2.4 MB",
  },
  {
    id: "doc2",
    patientName: "María González",
    patientId: "pat1",
    name: "Consentimiento Tratamiento Endodoncia",
    date: "2023-05-15",
    type: "application/pdf",
    size: "156 KB",
  },
  {
    id: "doc3",
    patientName: "Juan Pérez",
    patientId: "pat2",
    name: "Evaluación Inicial Ortodoncia",
    date: "2023-05-10",
    type: "application/pdf",
    size: "320 KB",
  },
  {
    id: "doc4",
    patientName: "Laura Torres",
    patientId: "pat3",
    name: "Informe Final Tratamiento",
    date: "2023-04-28",
    type: "application/pdf",
    size: "450 KB",
  },
]

export default async function ClinicalHistoryPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "student") {
    redirect("/dashboard")
  }

  // Format date to local format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Historias Clínicas</h1>
        <p className="text-muted-foreground">Gestiona los registros médicos y documentos de tus pacientes.</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar paciente..." className="pl-8" />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Registro
        </Button>
      </div>

      <Tabs defaultValue="patients" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="patients">Pacientes</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Pacientes</CardTitle>
              <CardDescription>Lista de pacientes y sus historias clínicas.</CardDescription>
            </CardHeader>
            <CardContent>
              {patientsList.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Última Visita</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientsList.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{formatDate(patient.lastVisit)}</TableCell>
                        <TableCell>{patient.specialty}</TableCell>
                        <TableCell>{patient.status}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>Ver</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              <span>Editar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay pacientes registrados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Archivos y documentos de los pacientes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Subir Documento</span>
                </Button>
              </div>

              {documentsList.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentsList.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {document.name}
                          </div>
                        </TableCell>
                        <TableCell>{document.patientName}</TableCell>
                        <TableCell>{formatDate(document.date)}</TableCell>
                        <TableCell>{document.type.split("/")[1].toUpperCase()}</TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>Ver</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>Descargar</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay documentos disponibles.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
