"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  FileText,
  Download,
  Calendar,
  User,
  Stethoscope,
  ClipboardList,
  Activity,
  Search,
  ChevronRight,
  CheckCircle2,
  Clock,
  Pill,
  SmileIcon as Tooth,
  CalendarClock,
  FileImage,
  FilePlus2,
  BarChart4,
  Info,
} from "lucide-react"

// Datos de ejemplo para el historial clínico
const medicalRecords = [
  {
    id: "rec1",
    date: "2023-05-15",
    type: "Consulta",
    doctor: "Dr. Martínez",
    specialty: "Ortodoncia",
    diagnosis: "Maloclusión clase II",
    treatment: "Brackets metálicos",
    notes:
      "Paciente presenta maloclusión clase II con overjet aumentado. Se recomienda tratamiento con brackets metálicos durante 24 meses aproximadamente.",
    status: "completed",
  },
  {
    id: "rec2",
    date: "2023-06-10",
    type: "Control",
    doctor: "Dr. Martínez",
    specialty: "Ortodoncia",
    diagnosis: "Progreso favorable",
    treatment: "Ajuste de brackets",
    notes:
      "Se realizó ajuste de brackets y cambio de elásticos. El paciente muestra buena higiene oral y cooperación con el tratamiento.",
    status: "completed",
  },
  {
    id: "rec3",
    date: "2023-07-05",
    type: "Control",
    doctor: "Dr. Martínez",
    specialty: "Ortodoncia",
    diagnosis: "Progreso favorable",
    treatment: "Ajuste de brackets",
    notes: "Continúa el progreso favorable. Se ajustaron los arcos y se cambiaron los elásticos.",
    status: "completed",
  },
  {
    id: "rec4",
    date: "2023-08-12",
    type: "Control",
    doctor: "Dr. Martínez",
    specialty: "Ortodoncia",
    diagnosis: "Progreso favorable",
    treatment: "Ajuste de brackets",
    notes: "Se observa una reducción significativa del overjet. Se continúa con el mismo plan de tratamiento.",
    status: "completed",
  },
  {
    id: "rec5",
    date: "2023-09-20",
    type: "Control",
    doctor: "Dr. Martínez",
    specialty: "Ortodoncia",
    diagnosis: "Progreso favorable",
    treatment: "Ajuste de brackets",
    notes: "El paciente mantiene buena higiene oral. Se realizaron ajustes menores en los brackets.",
    status: "completed",
  },
]

// Datos de ejemplo para documentos
const documents = [
  {
    id: "doc1",
    name: "Radiografía Panorámica",
    date: "2023-05-10",
    type: "image/jpeg",
    size: "2.4 MB",
    category: "radiografia",
    thumbnail: "/dental-xray.png",
  },
  {
    id: "doc2",
    name: "Consentimiento Tratamiento",
    date: "2023-05-15",
    type: "application/pdf",
    size: "156 KB",
    category: "documento",
    thumbnail: "/document-stack.png",
  },
  {
    id: "doc3",
    name: "Informe Inicial",
    date: "2023-05-15",
    type: "application/pdf",
    size: "320 KB",
    category: "informe",
    thumbnail: "/business-report.png",
  },
  {
    id: "doc4",
    name: "Fotografías Iniciales",
    date: "2023-05-10",
    type: "image/jpeg",
    size: "3.1 MB",
    category: "fotografia",
    thumbnail: "/placeholder-jrxav.png",
  },
  {
    id: "doc5",
    name: "Radiografía Lateral",
    date: "2023-05-10",
    type: "image/jpeg",
    size: "1.8 MB",
    category: "radiografia",
    thumbnail: "/placeholder.svg?height=100&width=100&query=dental%20xray%20lateral",
  },
]

// Datos de ejemplo para tratamientos
const treatments = [
  {
    id: "treat1",
    name: "Ortodoncia con Brackets",
    startDate: "2023-05-20",
    endDate: "2025-05-20",
    status: "in-progress",
    progress: 35,
    doctor: "Dr. Martínez",
    description: "Tratamiento de ortodoncia con brackets metálicos para corregir maloclusión clase II",
    sessions: [
      {
        date: "2023-05-20",
        description: "Colocación de brackets",
        completed: true,
      },
      {
        date: "2023-06-10",
        description: "Primer ajuste",
        completed: true,
      },
      {
        date: "2023-07-05",
        description: "Segundo ajuste",
        completed: true,
      },
      {
        date: "2023-08-12",
        description: "Tercer ajuste",
        completed: true,
      },
      {
        date: "2023-09-20",
        description: "Cuarto ajuste",
        completed: true,
      },
      {
        date: "2023-10-25",
        description: "Quinto ajuste",
        completed: false,
      },
    ],
  },
  {
    id: "treat2",
    name: "Limpieza Dental",
    startDate: "2023-03-15",
    endDate: "2023-03-15",
    status: "completed",
    progress: 100,
    doctor: "Dra. López",
    description: "Limpieza dental profesional y aplicación de flúor",
    sessions: [
      {
        date: "2023-03-15",
        description: "Limpieza dental completa",
        completed: true,
      },
    ],
  },
]

// Datos de ejemplo para odontograma
const dentalChart = {
  lastUpdate: "2023-05-15",
  doctor: "Dr. Martínez",
  teeth: [
    { number: 18, status: "healthy", treatments: [] },
    { number: 17, status: "healthy", treatments: [] },
    { number: 16, status: "healthy", treatments: [] },
    { number: 15, status: "healthy", treatments: [] },
    { number: 14, status: "healthy", treatments: [] },
    { number: 13, status: "healthy", treatments: [] },
    { number: 12, status: "healthy", treatments: [] },
    { number: 11, status: "healthy", treatments: [] },
    { number: 21, status: "healthy", treatments: [] },
    { number: 22, status: "healthy", treatments: [] },
    { number: 23, status: "healthy", treatments: [] },
    { number: 24, status: "healthy", treatments: [] },
    { number: 25, status: "healthy", treatments: [] },
    { number: 26, status: "treated", treatments: ["filling"] },
    { number: 27, status: "healthy", treatments: [] },
    { number: 28, status: "missing", treatments: [] },
    { number: 48, status: "healthy", treatments: [] },
    { number: 47, status: "healthy", treatments: [] },
    { number: 46, status: "treated", treatments: ["filling"] },
    { number: 45, status: "healthy", treatments: [] },
    { number: 44, status: "healthy", treatments: [] },
    { number: 43, status: "healthy", treatments: [] },
    { number: 42, status: "healthy", treatments: [] },
    { number: 41, status: "healthy", treatments: [] },
    { number: 31, status: "healthy", treatments: [] },
    { number: 32, status: "healthy", treatments: [] },
    { number: 33, status: "healthy", treatments: [] },
    { number: 34, status: "healthy", treatments: [] },
    { number: 35, status: "healthy", treatments: [] },
    { number: 36, status: "treated", treatments: ["root-canal", "crown"] },
    { number: 37, status: "healthy", treatments: [] },
    { number: 38, status: "missing", treatments: [] },
  ],
}

export default function MyRecordsPage() {
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleRecordClick = (record: any) => {
    setSelectedRecord(record)
    setIsDialogOpen(true)
  }

  const handleDocumentClick = (document: any) => {
    setSelectedDocument(document)
    setIsDocumentDialogOpen(true)
  }

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM 'de' yyyy", { locale: es })
  }

  if (loading) {
    return <LoadingSpinner message="Cargando historial clínico..." />
  }

  return (
    <ProtectedRoute requiredRoles={["patient"]}>
      <div className="space-y-8">
        {/* Encabezado con información contextual */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">Mi Historial Clínico</h1>
            <p className="mt-2 max-w-2xl">
              Accede a tu historial médico dental completo, incluyendo diagnósticos, tratamientos y documentos
              relacionados con tu salud bucal.
            </p>
          </div>
        </div>

        {/* Resumen del paciente */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paciente</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Stethoscope className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Especialista Principal</p>
                  <p className="font-medium">Dr. Martínez</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <ClipboardList className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Última Consulta</p>
                  <p className="font-medium">{formatDate("2023-09-20")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado General</p>
                  <p className="font-medium">Tratamiento en curso</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Panel principal con pestañas */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="records" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="records">Consultas</TabsTrigger>
                <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="records" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Historial de Consultas</CardTitle>
                      <CardDescription>Registro de todas tus consultas y diagnósticos</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Search className="h-3.5 w-3.5" />
                        Buscar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Exportar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {medicalRecords.length > 0 ? (
                      <AnimatePresence>
                        <div className="space-y-4">
                          {medicalRecords.map((record, index) => (
                            <motion.div
                              key={record.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <Card
                                className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
                                onClick={() => handleRecordClick(record)}
                              >
                                <CardContent className="p-0">
                                  <div className="flex flex-col md:flex-row">
                                    <div className="flex w-full flex-col justify-between space-y-2 p-4 md:w-3/4">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h3 className="text-lg font-medium">{record.type}</h3>
                                          <Badge
                                            variant="outline"
                                            className="bg-green-100 text-green-800 hover:bg-green-100"
                                          >
                                            {record.specialty}
                                          </Badge>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                          <span className="font-medium">Diagnóstico:</span> {record.diagnosis}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                          <span className="font-medium">Tratamiento:</span> {record.treatment}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                          <Calendar className="h-4 w-4 text-muted-foreground" />
                                          <span>{formatDate(record.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <User className="h-4 w-4 text-muted-foreground" />
                                          <span>{record.doctor}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between bg-muted/30 p-4 md:w-1/4">
                                      <div className="flex flex-col items-center gap-1">
                                        <span className="text-xs text-muted-foreground">Estado</span>
                                        <Badge
                                          variant="outline"
                                          className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                        >
                                          Completada
                                        </Badge>
                                      </div>
                                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatePresence>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-muted p-3">
                          <ClipboardList className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-xl font-medium">No hay consultas registradas</h3>
                        <p className="mt-2 text-center text-muted-foreground">
                          No se encontraron registros de consultas en tu historial.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="treatments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tratamientos Activos</CardTitle>
                    <CardDescription>Seguimiento de tus tratamientos en curso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {treatments.length > 0 ? (
                      <div className="space-y-6">
                        {treatments.map((treatment) => (
                          <div key={treatment.id} className="space-y-4">
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                              <div>
                                <h3 className="text-lg font-medium">{treatment.name}</h3>
                                <p className="text-sm text-muted-foreground">{treatment.description}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  treatment.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                                }
                              >
                                {treatment.status === "in-progress" ? "En Progreso" : "Completado"}
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Progreso: {treatment.progress}%</span>
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(treatment.startDate)} - {formatDate(treatment.endDate)}
                                </span>
                              </div>
                              <Progress value={treatment.progress} className="h-2" />
                            </div>

                            <div className="rounded-lg border bg-muted/30 p-4">
                              <h4 className="mb-3 font-medium">Sesiones</h4>
                              <div className="space-y-3">
                                {treatment.sessions.map((session, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between rounded-md border bg-background p-3"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                          session.completed
                                            ? "bg-green-100 text-green-600"
                                            : "bg-amber-100 text-amber-600"
                                        }`}
                                      >
                                        {session.completed ? (
                                          <CheckCircle2 className="h-4 w-4" />
                                        ) : (
                                          <Clock className="h-4 w-4" />
                                        )}
                                      </div>
                                      <div>
                                        <p className="font-medium">{session.description}</p>
                                        <p className="text-xs text-muted-foreground">{formatDate(session.date)}</p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className={
                                        session.completed
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                      }
                                    >
                                      {session.completed ? "Completada" : "Pendiente"}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <Separator />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-muted p-3">
                          <Pill className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-xl font-medium">No hay tratamientos activos</h3>
                        <p className="mt-2 text-center text-muted-foreground">
                          No se encontraron tratamientos activos en tu historial.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Documentos y Archivos</CardTitle>
                      <CardDescription>
                        Radiografías, informes y otros documentos relacionados con tu tratamiento
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Search className="h-3.5 w-3.5" />
                        Buscar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {documents.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {documents.map((document) => (
                          <motion.div
                            key={document.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card
                              className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
                              onClick={() => handleDocumentClick(document)}
                            >
                              <div className="aspect-square w-full overflow-hidden bg-muted">
                                <img
                                  src={document.thumbnail || "/placeholder.svg"}
                                  alt={document.name}
                                  className="h-full w-full object-cover transition-transform hover:scale-105"
                                />
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-medium">{document.name}</h3>
                                <div className="mt-2 flex items-center justify-between">
                                  <p className="text-xs text-muted-foreground">{formatDate(document.date)}</p>
                                  <Badge
                                    variant="outline"
                                    className={
                                      document.category === "radiografia"
                                        ? "bg-blue-100 text-blue-800"
                                        : document.category === "fotografia"
                                          ? "bg-purple-100 text-purple-800"
                                          : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {document.category === "radiografia"
                                      ? "Radiografía"
                                      : document.category === "fotografia"
                                        ? "Fotografía"
                                        : document.category === "informe"
                                          ? "Informe"
                                          : "Documento"}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-muted p-3">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-xl font-medium">No hay documentos disponibles</h3>
                        <p className="mt-2 text-center text-muted-foreground">
                          No se encontraron documentos en tu historial.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Panel lateral con información adicional */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Odontograma</CardTitle>
                <CardDescription>Estado actual de tus piezas dentales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Última actualización: {formatDate(dentalChart.lastUpdate)}
                    </p>
                    <p className="text-sm text-muted-foreground">Dr. {dentalChart.doctor}</p>
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {dentalChart.teeth.slice(0, 16).map((tooth) => (
                      <div
                        key={tooth.number}
                        className={`flex aspect-square items-center justify-center rounded-md border text-xs font-medium ${
                          tooth.status === "healthy"
                            ? "bg-green-100 text-green-800"
                            : tooth.status === "treated"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {tooth.number}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-8 gap-1">
                    {dentalChart.teeth.slice(16, 32).map((tooth) => (
                      <div
                        key={tooth.number}
                        className={`flex aspect-square items-center justify-center rounded-md border text-xs font-medium ${
                          tooth.status === "healthy"
                            ? "bg-green-100 text-green-800"
                            : tooth.status === "treated"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {tooth.number}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximas Citas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <CalendarClock className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Ajuste de Brackets</h4>
                      <p className="text-sm text-muted-foreground">25 de Octubre, 2023 - 10:00 AM</p>
                      <p className="text-sm text-muted-foreground">Dr. Martínez - Consultorio 3</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <CalendarClock className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Revisión Periódica</h4>
                      <p className="text-sm text-muted-foreground">15 de Noviembre, 2023 - 11:30 AM</p>
                      <p className="text-sm text-muted-foreground">Dr. Martínez - Consultorio 3</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4 text-center">
                    <FileImage className="h-6 w-6" />
                    <span>Ver Radiografías</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4 text-center">
                    <FilePlus2 className="h-6 w-6" />
                    <span>Subir Documento</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4 text-center">
                    <Tooth className="h-6 w-6" />
                    <span>Odontograma</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 p-4 text-center">
                    <BarChart4 className="h-6 w-6" />
                    <span>Progreso</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Diálogo para ver detalles de consulta */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedRecord && (
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Detalles de la Consulta</DialogTitle>
                <DialogDescription>
                  Información completa sobre la consulta del {formatDate(selectedRecord.date)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex justify-between rounded-lg bg-muted/30 p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha</p>
                    <p className="font-medium">{formatDate(selectedRecord.date)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-medium">{selectedRecord.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Especialidad</p>
                    <p className="font-medium">{selectedRecord.specialty}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Diagnóstico</h3>
                  <p className="rounded-lg border p-3 text-sm">{selectedRecord.diagnosis}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Tratamiento</h3>
                  <p className="rounded-lg border p-3 text-sm">{selectedRecord.treatment}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Notas del Especialista</h3>
                  <p className="rounded-lg border p-3 text-sm">{selectedRecord.notes}</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-blue-800">Información del Doctor</h4>
                      <p className="text-sm text-blue-700">
                        {selectedRecord.doctor} - Especialista en {selectedRecord.specialty}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cerrar
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Informe
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>

        {/* Diálogo para ver documentos */}
        <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
          {selectedDocument && (
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>{selectedDocument.name}</DialogTitle>
                <DialogDescription>Documento del {formatDate(selectedDocument.date)}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border">
                  <img
                    src={selectedDocument.thumbnail || "/placeholder.svg"}
                    alt={selectedDocument.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/30 p-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha</p>
                    <p className="font-medium">{formatDate(selectedDocument.date)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-medium">{selectedDocument.type.split("/")[1].toUpperCase()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tamaño</p>
                    <p className="font-medium">{selectedDocument.size}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDocumentDialogOpen(false)}>
                    Cerrar
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
