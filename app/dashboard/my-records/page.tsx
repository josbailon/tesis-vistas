import { getCurrentUser } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, User } from "lucide-react"

// Mock data for patient records
const patientRecords = {
  diagnoses: [
    {
      id: "diag1",
      date: "2023-04-15",
      diagnosis: "Caries en molar inferior derecho",
      treatment: "Empaste dental",
      student: "Carlos Rodríguez",
      professor: "Dr. Martínez",
      specialty: "Endodoncia",
    },
    {
      id: "diag2",
      date: "2023-03-10",
      diagnosis: "Gingivitis leve",
      treatment: "Limpieza dental profunda",
      student: "Ana López",
      professor: "Dra. Sánchez",
      specialty: "Periodoncia",
    },
  ],
  documents: [
    {
      id: "doc1",
      name: "Radiografía Panorámica",
      date: "2023-04-10",
      type: "image/jpeg",
      size: "2.4 MB",
    },
    {
      id: "doc2",
      name: "Consentimiento Tratamiento Endodoncia",
      date: "2023-04-15",
      type: "application/pdf",
      size: "156 KB",
    },
    {
      id: "doc3",
      name: "Resultados Análisis Dental",
      date: "2023-03-05",
      type: "application/pdf",
      size: "320 KB",
    },
  ],
  treatments: [
    {
      id: "treat1",
      date: "2023-04-20",
      procedure: "Empaste dental",
      tooth: "46 (Molar inferior derecho)",
      status: "Completado",
      student: "Carlos Rodríguez",
    },
    {
      id: "treat2",
      date: "2023-03-15",
      procedure: "Limpieza dental",
      tooth: "Completa",
      status: "Completado",
      student: "Ana López",
    },
  ],
}

export default async function MyRecordsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "patient") {
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
        <h1 className="text-3xl font-bold tracking-tight">Mi Historial Clínico</h1>
        <p className="text-muted-foreground">Accede a tu historial médico, diagnósticos y documentos.</p>
      </div>

      <Tabs defaultValue="diagnoses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diagnoses">Diagnósticos</TabsTrigger>
          <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnoses">
          <Card>
            <CardHeader>
              <CardTitle>Diagnósticos y Evaluaciones</CardTitle>
              <CardDescription>Historial de diagnósticos realizados por los profesionales.</CardDescription>
            </CardHeader>
            <CardContent>
              {patientRecords.diagnoses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Diagnóstico</TableHead>
                      <TableHead>Tratamiento Recomendado</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Estudiante</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientRecords.diagnoses.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDate(record.date)}
                          </div>
                        </TableCell>
                        <TableCell>{record.diagnosis}</TableCell>
                        <TableCell>{record.treatment}</TableCell>
                        <TableCell>{record.specialty}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {record.student}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay diagnósticos registrados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments">
          <Card>
            <CardHeader>
              <CardTitle>Tratamientos Realizados</CardTitle>
              <CardDescription>Historial de procedimientos y tratamientos completados.</CardDescription>
            </CardHeader>
            <CardContent>
              {patientRecords.treatments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Procedimiento</TableHead>
                      <TableHead>Pieza Dental</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Estudiante</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientRecords.treatments.map((treatment) => (
                      <TableRow key={treatment.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDate(treatment.date)}
                          </div>
                        </TableCell>
                        <TableCell>{treatment.procedure}</TableCell>
                        <TableCell>{treatment.tooth}</TableCell>
                        <TableCell>{treatment.status}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {treatment.student}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay tratamientos registrados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos y Archivos</CardTitle>
              <CardDescription>
                Radiografías, formularios y otros documentos relacionados con tu tratamiento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {patientRecords.documents.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientRecords.documents.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {document.name}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(document.date)}</TableCell>
                        <TableCell>{document.type.split("/")[1].toUpperCase()}</TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            <span>Descargar</span>
                          </Button>
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
