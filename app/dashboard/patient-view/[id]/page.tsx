"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  FileText,
  Camera,
  Upload,
  Edit,
  Save,
  X,
  Plus,
  Download,
  Eye,
  Clock,
  User,
  Stethoscope,
  Activity,
  Heart,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { Odontogram } from "@/components/odontogram"
import { patients, medicalRecords, documents, clinicalCases, appointments } from "@/lib/mock-data"

interface PatientDetails {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  address: string
  allergies: string | null
  medicalHistory: string | null
  status: "active" | "inactive"
  lastVisit: string
  specialty: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  insurance: {
    provider: string
    policyNumber: string
    expiryDate: string
  }
}

export default function PatientViewPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [patient, setPatient] = useState<PatientDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState("")

  useEffect(() => {
    // Simular carga de datos del paciente
    const patientId = params.id as string
    const foundPatient = patients.find((p) => p.id === patientId)

    if (foundPatient) {
      setPatient({
        ...foundPatient,
        emergencyContact: {
          name: "María García",
          phone: "555-999-8888",
          relationship: "Madre",
        },
        insurance: {
          provider: "Seguro Nacional",
          policyNumber: "SN-123456789",
          expiryDate: "2024-12-31",
        },
      })
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div
        className="flex h-full items-center justify-center"
        role="status"
        aria-label="Cargando información del paciente"
      >
        <div className="text-center">
          <div
            className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary mx-auto"
            aria-hidden="true"
          ></div>
          <h2 className="text-2xl font-bold">Cargando...</h2>
          <p className="text-muted-foreground">Por favor espere mientras cargamos la información del paciente.</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex h-full items-center justify-center" role="alert">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold">Paciente no encontrado</h2>
          <p className="text-muted-foreground mb-4">No se pudo encontrar la información del paciente solicitado.</p>
          <Button onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  const patientRecords = medicalRecords.filter((record) => record.patientId === patient.id)
  const patientDocuments = documents.filter((doc) => doc.patientId === patient.id)
  const patientCases = clinicalCases.filter((case_) => case_.patientId === patient.id)
  const patientAppointments = appointments.filter((apt) => apt.patientId === patient.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "cancelled":
        return "text-red-600"
      case "completed":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con navegación accesible */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
            aria-label="Volver a la lista de pacientes"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paciente: {patient.name}</h1>
            <p className="text-muted-foreground">Gestión completa del paciente y su historial clínico</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={getStatusColor(patient.status)}
            aria-label={`Estado del paciente: ${patient.status === "active" ? "Activo" : "Inactivo"}`}
          >
            {patient.status === "active" ? "Activo" : "Inactivo"}
          </Badge>
          <Button
            variant={isEditing ? "destructive" : "default"}
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
            aria-label={isEditing ? "Cancelar edición" : "Editar información del paciente"}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" aria-hidden="true" />
                Cancelar
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" aria-hidden="true" />
                Editar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Información básica del paciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" aria-hidden="true" />
            Información del Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={`/placeholder.svg?height=96&width=96&text=${patient.name.charAt(0)}`}
                alt={`Foto de perfil de ${patient.name}`}
              />
              <AvatarFallback className="text-2xl">{patient.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="patient-name" className="text-sm font-medium">
                  Nombre Completo
                </Label>
                {isEditing ? (
                  <Input id="patient-name" defaultValue={patient.name} aria-describedby="patient-name-help" />
                ) : (
                  <p id="patient-name" className="text-sm">
                    {patient.name}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="patient-email" className="text-sm font-medium">
                  Correo Electrónico
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {isEditing ? (
                    <Input
                      id="patient-email"
                      type="email"
                      defaultValue={patient.email}
                      aria-describedby="patient-email-help"
                    />
                  ) : (
                    <p id="patient-email" className="text-sm">
                      {patient.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="patient-phone" className="text-sm font-medium">
                  Teléfono
                </Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {isEditing ? (
                    <Input
                      id="patient-phone"
                      type="tel"
                      defaultValue={patient.phone}
                      aria-describedby="patient-phone-help"
                    />
                  ) : (
                    <p id="patient-phone" className="text-sm">
                      {patient.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="patient-dob" className="text-sm font-medium">
                  Fecha de Nacimiento
                </Label>
                {isEditing ? (
                  <Input id="patient-dob" type="date" defaultValue={patient.dob} aria-describedby="patient-dob-help" />
                ) : (
                  <p id="patient-dob" className="text-sm">
                    {patient.dob}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="patient-address" className="text-sm font-medium">
                  Dirección
                </Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {isEditing ? (
                    <Input
                      id="patient-address"
                      defaultValue={patient.address}
                      aria-describedby="patient-address-help"
                    />
                  ) : (
                    <p id="patient-address" className="text-sm">
                      {patient.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="patient-specialty" className="text-sm font-medium">
                  Especialidad Principal
                </Label>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  {isEditing ? (
                    <Select defaultValue={patient.specialty}>
                      <SelectTrigger id="patient-specialty">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                        <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                        <SelectItem value="Cirugía Oral y Maxilofacial">Cirugía Oral y Maxilofacial</SelectItem>
                        <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p id="patient-specialty" className="text-sm">
                      {patient.specialty}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" aria-hidden="true" />
                Guardar Cambios
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs principales con navegación por teclado */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6" role="tablist">
          <TabsTrigger
            value="overview"
            className="gap-2"
            role="tab"
            aria-selected={activeTab === "overview"}
            aria-controls="overview-panel"
          >
            <Activity className="h-4 w-4" aria-hidden="true" />
            Resumen
          </TabsTrigger>
          <TabsTrigger
            value="medical-history"
            className="gap-2"
            role="tab"
            aria-selected={activeTab === "medical-history"}
            aria-controls="medical-history-panel"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Historia Médica
          </TabsTrigger>
          <TabsTrigger
            value="clinical-cases"
            className="gap-2"
            role="tab"
            aria-selected={activeTab === "clinical-cases"}
            aria-controls="clinical-cases-panel"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Casos Clínicos
          </TabsTrigger>
          <TabsTrigger
            value="appointments"
            className="gap-2"
            role="tab"
            aria-selected={activeTab === "appointments"}
            aria-controls="appointments-panel"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Citas
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="gap-2"
            role="tab"
            aria-selected={activeTab === "documents"}
            aria-controls="documents-panel"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            Documentos
          </TabsTrigger>
          <TabsTrigger
            value="odontogram"
            className="gap-2"
            role="tab"
            aria-selected={activeTab === "odontogram"}
            aria-controls="odontogram-panel"
          >
            <Stethoscope className="h-4 w-4" aria-hidden="true" />
            Odontograma
          </TabsTrigger>
        </TabsList>

        {/* Panel de Resumen */}
        <TabsContent
          value="overview"
          className="space-y-4"
          role="tabpanel"
          id="overview-panel"
          aria-labelledby="overview-tab"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Información médica crítica */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-red-500" aria-hidden="true" />
                  Información Crítica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-red-600">Alergias</Label>
                  <p className="text-sm" aria-live="polite">
                    {patient.allergies || "No se han registrado alergias"}
                  </p>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium">Historia Médica</Label>
                  <p className="text-sm" aria-live="polite">
                    {patient.medicalHistory || "No se ha registrado historia médica"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contacto de emergencia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-5 w-5 text-blue-500" aria-hidden="true" />
                  Contacto de Emergencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Nombre</Label>
                  <p className="text-sm">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Teléfono</Label>
                  <p className="text-sm">{patient.emergencyContact.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Relación</Label>
                  <p className="text-sm">{patient.emergencyContact.relationship}</p>
                </div>
              </CardContent>
            </Card>

            {/* Información del seguro */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-green-500" aria-hidden="true" />
                  Seguro Médico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Proveedor</Label>
                  <p className="text-sm">{patient.insurance.provider}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Número de Póliza</Label>
                  <p className="text-sm">{patient.insurance.policyNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fecha de Vencimiento</Label>
                  <p className="text-sm">{patient.insurance.expiryDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{patientAppointments.length}</div>
                <p className="text-sm text-muted-foreground">Citas Totales</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{patientCases.length}</div>
                <p className="text-sm text-muted-foreground">Casos Clínicos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{patientRecords.length}</div>
                <p className="text-sm text-muted-foreground">Registros Médicos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{patientDocuments.length}</div>
                <p className="text-sm text-muted-foreground">Documentos</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Panel de Historia Médica */}
        <TabsContent
          value="medical-history"
          className="space-y-4"
          role="tabpanel"
          id="medical-history-panel"
          aria-labelledby="medical-history-tab"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Registros Médicos</h3>
            <Button className="gap-2" aria-label="Agregar nuevo registro médico">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nuevo Registro
            </Button>
          </div>

          <div className="space-y-4">
            {patientRecords.map((record, index) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{record.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {record.date} - {record.type}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{record.specialty}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Descripción</Label>
                      <p className="text-sm text-muted-foreground">{record.description}</p>
                    </div>
                    {record.treatment && (
                      <div>
                        <Label className="text-sm font-medium">Tratamiento</Label>
                        <p className="text-sm text-muted-foreground">{record.treatment}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Panel de Casos Clínicos */}
        <TabsContent
          value="clinical-cases"
          className="space-y-4"
          role="tabpanel"
          id="clinical-cases-panel"
          aria-labelledby="clinical-cases-tab"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Casos Clínicos</h3>
            <Button className="gap-2" aria-label="Agregar nuevo caso clínico">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nuevo Caso
            </Button>
          </div>

          <div className="space-y-4">
            {patientCases.map((case_, index) => (
              <Card key={case_.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{case_.treatment}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        Iniciado: {case_.startDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{case_.specialty}</Badge>
                      <Badge
                        className={
                          case_.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : case_.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {case_.status === "completed"
                          ? "Completado"
                          : case_.status === "in-progress"
                            ? "En Progreso"
                            : "Cancelado"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Progreso del Tratamiento</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={case_.progress}
                          className="flex-1"
                          aria-label={`Progreso: ${case_.progress}%`}
                        />
                        <span className="text-sm font-medium">{case_.progress}%</span>
                      </div>
                    </div>
                    {case_.notes && (
                      <div>
                        <Label className="text-sm font-medium">Notas</Label>
                        <p className="text-sm text-muted-foreground">{case_.notes}</p>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">Última actualización: {case_.lastUpdate}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Panel de Citas */}
        <TabsContent
          value="appointments"
          className="space-y-4"
          role="tabpanel"
          id="appointments-panel"
          aria-labelledby="appointments-tab"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Historial de Citas</h3>
            <Button className="gap-2" aria-label="Programar nueva cita">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Nueva Cita
            </Button>
          </div>

          <div className="space-y-4">
            {patientAppointments.map((appointment, index) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{appointment.type}</h4>
                        <Badge variant="outline">{appointment.specialty}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          {appointment.time}
                        </div>
                        <div>Duración: {appointment.duration} min</div>
                      </div>
                      {appointment.notes && <p className="text-sm text-muted-foreground">{appointment.notes}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getAppointmentStatusColor(appointment.status)}`}>
                        {appointment.status === "confirmed"
                          ? "Confirmada"
                          : appointment.status === "pending"
                            ? "Pendiente"
                            : appointment.status === "cancelled"
                              ? "Cancelada"
                              : "Completada"}
                      </span>
                      {appointment.status === "confirmed" && (
                        <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
                      )}
                      {appointment.status === "pending" && (
                        <AlertCircle className="h-4 w-4 text-yellow-600" aria-hidden="true" />
                      )}
                      {appointment.status === "cancelled" && (
                        <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Panel de Documentos */}
        <TabsContent
          value="documents"
          className="space-y-4"
          role="tabpanel"
          id="documents-panel"
          aria-labelledby="documents-tab"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Documentos del Paciente</h3>
            <Button className="gap-2" aria-label="Subir nuevo documento">
              <Upload className="h-4 w-4" aria-hidden="true" />
              Subir Documento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patientDocuments.map((document, index) => (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{document.name}</h4>
                      <p className="text-sm text-muted-foreground">{document.type}</p>
                      <p className="text-xs text-muted-foreground">Subido: {document.uploadedAt}</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          aria-label={`Ver documento: ${document.name}`}
                        >
                          <Eye className="h-3 w-3" aria-hidden="true" />
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          aria-label={`Descargar documento: ${document.name}`}
                        >
                          <Download className="h-3 w-3" aria-hidden="true" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Panel de Odontograma */}
        <TabsContent
          value="odontogram"
          className="space-y-4"
          role="tabpanel"
          id="odontogram-panel"
          aria-labelledby="odontogram-tab"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Odontograma del Paciente</h3>
            <Button className="gap-2" aria-label="Guardar cambios en el odontograma">
              <Save className="h-4 w-4" aria-hidden="true" />
              Guardar Cambios
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <Odontogram patientId={patient.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botón flotante para acciones rápidas */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg gap-2" aria-label="Acciones rápidas para el paciente">
              <Plus className="h-5 w-5" aria-hidden="true" />
              Acciones Rápidas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Acciones Rápidas - {patient.name}</DialogTitle>
              <DialogDescription>Selecciona una acción para realizar con este paciente</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                <Calendar className="h-6 w-6" aria-hidden="true" />
                <span>Programar Cita</span>
              </Button>
              <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                <FileText className="h-6 w-6" aria-hidden="true" />
                <span>Nuevo Registro</span>
              </Button>
              <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                <Camera className="h-6 w-6" aria-hidden="true" />
                <span>Tomar Foto</span>
              </Button>
              <Button variant="outline" className="gap-2 h-auto py-4 flex-col">
                <Upload className="h-6 w-6" aria-hidden="true" />
                <span>Subir Archivo</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
