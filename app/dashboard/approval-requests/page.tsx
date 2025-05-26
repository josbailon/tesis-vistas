import { getCurrentUser } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"

// Mock data for approval requests
const approvalRequests = [
  {
    id: "req1",
    patientName: "María González",
    patientId: "pat1",
    title: "Plan de Tratamiento Endodoncia",
    description: "Solicitud de aprobación para tratamiento de conducto en molar inferior derecho",
    date: "2023-05-20",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
    status: "pending",
  },
  {
    id: "req2",
    patientName: "Juan Pérez",
    patientId: "pat2",
    title: "Evaluación Inicial Ortodoncia",
    description: "Solicitud de aprobación para plan de tratamiento ortodóntico",
    date: "2023-05-18",
    professor: "Dra. Sánchez",
    specialty: "Ortodoncia",
    status: "approved",
    approvalDate: "2023-05-19",
    comments: "Aprobado. Proceder con el tratamiento según lo planificado.",
  },
  {
    id: "req3",
    patientName: "Laura Torres",
    patientId: "pat3",
    title: "Informe Final Tratamiento Endodoncia",
    description: "Solicitud de aprobación para finalización de tratamiento",
    date: "2023-05-15",
    professor: "Dr. Martínez",
    specialty: "Endodoncia",
    status: "rejected",
    approvalDate: "2023-05-16",
    comments: "Se requiere radiografía de control adicional antes de finalizar.",
  },
]

export default async function ApprovalRequestsPage() {
  const user = await getCurrentUser()

  if (!user || user.role !== "student") {
    redirect("/dashboard")
  }

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      case "approved":
        return <Badge className="bg-green-500">Aprobado</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rechazado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitudes de Aprobación</h1>
          <p className="text-muted-foreground">Gestiona las solicitudes de aprobación para tus casos clínicos.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Nueva Solicitud</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="approved">Aprobadas</TabsTrigger>
          <TabsTrigger value="rejected">Rechazadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Todas las Solicitudes</CardTitle>
              <CardDescription>Lista de todas tus solicitudes de aprobación.</CardDescription>
            </CardHeader>
            <CardContent>
              {approvalRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Profesor</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.title}</TableCell>
                        <TableCell>{request.patientName}</TableCell>
                        <TableCell>{formatDate(request.date)}</TableCell>
                        <TableCell>{request.specialty}</TableCell>
                        <TableCell>{request.professor}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay solicitudes de aprobación.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Pendientes</CardTitle>
              <CardDescription>Lista de solicitudes pendientes de aprobación.</CardDescription>
            </CardHeader>
            <CardContent>
              {approvalRequests.filter((req) => req.status === "pending").length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Profesor</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalRequests
                      .filter((req) => req.status === "pending")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.title}</TableCell>
                          <TableCell>{request.patientName}</TableCell>
                          <TableCell>{formatDate(request.date)}</TableCell>
                          <TableCell>{request.specialty}</TableCell>
                          <TableCell>{request.professor}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Ver Detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay solicitudes pendientes.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Aprobadas</CardTitle>
              <CardDescription>Lista de solicitudes que han sido aprobadas.</CardDescription>
            </CardHeader>
            <CardContent>
              {approvalRequests.filter((req) => req.status === "approved").length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Fecha Aprobación</TableHead>
                      <TableHead>Comentarios</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalRequests
                      .filter((req) => req.status === "approved")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.title}</TableCell>
                          <TableCell>{request.patientName}</TableCell>
                          <TableCell>{formatDate(request.date)}</TableCell>
                          <TableCell>{request.approvalDate ? formatDate(request.approvalDate) : "-"}</TableCell>
                          <TableCell>{request.comments || "-"}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Ver Detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay solicitudes aprobadas.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Rechazadas</CardTitle>
              <CardDescription>Lista de solicitudes que han sido rechazadas.</CardDescription>
            </CardHeader>
            <CardContent>
              {approvalRequests.filter((req) => req.status === "rejected").length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Fecha Rechazo</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalRequests
                      .filter((req) => req.status === "rejected")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.title}</TableCell>
                          <TableCell>{request.patientName}</TableCell>
                          <TableCell>{formatDate(request.date)}</TableCell>
                          <TableCell>{request.approvalDate ? formatDate(request.approvalDate) : "-"}</TableCell>
                          <TableCell>{request.comments || "-"}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Ver Detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No hay solicitudes rechazadas.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
