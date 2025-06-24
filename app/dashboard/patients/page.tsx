"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  User,
  Phone,
  Calendar,
  FileText,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Clock,
  MapPin,
  Stethoscope,
  AlertTriangle,
} from "lucide-react"

export default function StudentPatientsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Mock data for assigned patients
  const patients = [
    {
      id: "pat1",
      name: "Ana García López",
      age: 28,
      gender: "Femenino",
      phone: "0999-123-456",
      email: "ana.garcia@gmail.com",
      address: "Av. Universidad 123, Manta",
      emergencyContact: "María García - 0998-765-432",
      assignedDate: "2024-01-15",
      status: "active",
      nextAppointment: {
        date: "2024-01-25",
        time: "09:00",
        type: "Tratamiento",
        location: "Consultorio 3",
      },
      medicalHistory: {
        allergies: ["Ninguna conocida"],
        medications: ["Ibuprofeno 400mg"],
        conditions: ["Hipertensión controlada"],
        lastUpdate: "2024-01-20",
      },
      treatmentHistory: [
        {
          date: "2024-01-15",
          procedure: "Consulta inicial",
          notes: "Evaluación completa realizada",
          status: "completed",
        },
        {
          date: "2024-01-20",
          procedure: "Preparación de conducto",
          notes: "Primera sesión de endodoncia",
          status: "completed",
        },
        {
          date: "2024-01-25",
          procedure: "Continuación endodoncia",
          notes: "Segunda sesión programada",
          status: "scheduled",
        },
      ],
      currentTreatment: "Endodoncia pieza 16",
      supervisor: "Dr. Martínez",
      totalVisits: 2,
      pendingTasks: 1,
    },
    {
      id: "pat2",
      name: "Roberto Silva Mendoza",
      age: 35,
      gender: "Masculino",
      phone: "0998-234-567",
      email: "roberto.silva@hotmail.com",
      address: "Calle 24 de Mayo 456, Manta",
      emergencyContact: "Carmen Silva - 0997-654-321",
      assignedDate: "2024-01-18",
      status: "active",
      nextAppointment: {
        date: "2024-01-26",
        time: "11:00",
        type: "Consulta",
        location: "Consultorio 5",
      },
      medicalHistory: {
        allergies: ["Penicilina"],
        medications: ["Ninguna"],
        conditions: ["Ninguna"],
        lastUpdate: "2024-01-18",
      },
      treatmentHistory: [
        {
          date: "2024-01-18",
          procedure: "Evaluación ortodóntica",
          notes: "Primera consulta, evaluación para brackets",
          status: "completed",
        },
        {
          date: "2024-01-26",
          procedure: "Plan de tratamiento",
          notes: "Presentación del plan ortodóntico",
          status: "scheduled",
        },
      ],
      currentTreatment: "Evaluación ortodóntica",
      supervisor: "Dra. Rodríguez",
      totalVisits: 1,
      pendingTasks: 2,
    },
    {
      id: "pat3",
      name: "Carmen Vega Torres",
      age: 42,
      gender: "Femenino",
      phone: "0997-345-678",
      email: "carmen.vega@yahoo.com",
      address: "Barrio Los Almendros, Manta",
      emergencyContact: "Pedro Vega - 0996-543-210",
      assignedDate: "2024-01-10",
      status: "completed",
      nextAppointment: null,
      medicalHistory: {
        allergies: ["Ninguna conocida"],
        medications: ["Metformina"],
        conditions: ["Diabetes tipo 2"],
        lastUpdate: "2024-01-22",
      },
      treatmentHistory: [
        {
          date: "2024-01-10",
          procedure: "Evaluación periodontal",
          notes: "Diagnóstico de gingivitis",
          status: "completed",
        },
        {
          date: "2024-01-15",
          procedure: "Limpieza profunda",
          notes: "Raspado y alisado radicular",
          status: "completed",
        },
        {
          date: "2024-01-22",
          procedure: "Control post-tratamiento",
          notes: "Evolución favorable, alta médica",
          status: "completed",
        },
      ],
      currentTreatment: "Tratamiento completado",
      supervisor: "Dr. Silva",
      totalVisits: 3,
      pendingTasks: 0,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <User className="h-3 w-3 mr-1" />
            Activo
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <FileText className="h-3 w-3 mr-1" />
            Completado
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.currentTreatment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activePatients = patients.filter((p) => p.status === "active")

  return (
    <ProtectedRoute requiredRoles={["estudiante"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mis Pacientes</h1>
            <p className="text-muted-foreground">Gestiona los pacientes asignados a tu cuidado</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Solicitar Paciente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <Stethoscope className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activePatients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas Citas</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.filter((p) => p.nextAppointment).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.reduce((sum, p) => sum + p.pendingTasks, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="completed">Completados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Pacientes Activos</TabsTrigger>
            <TabsTrigger value="all">Todos los Pacientes</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4">
              {activePatients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{patient.name}</h3>
                            {getStatusBadge(patient.status)}
                            {patient.pendingTasks > 0 && (
                              <Badge variant="outline" className="text-yellow-600">
                                {patient.pendingTasks} tareas pendientes
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {patient.age} años, {patient.gender}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Stethoscope className="h-4 w-4 text-muted-foreground" />
                              <span>{patient.currentTreatment}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{patient.totalVisits} visitas</span>
                            </div>
                          </div>

                          {patient.nextAppointment && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm font-medium">Próxima Cita:</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {patient.nextAppointment.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {patient.nextAppointment.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {patient.nextAppointment.location}
                                </span>
                              </div>
                            </div>
                          )}

                          {patient.medicalHistory.allergies.length > 0 &&
                            patient.medicalHistory.allergies[0] !== "Ninguna conocida" && (
                              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                <p className="text-sm font-medium text-red-800">⚠️ Alergias:</p>
                                <p className="text-sm text-red-700">{patient.medicalHistory.allergies.join(", ")}</p>
                              </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPatient(patient)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Contactar
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Historia
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{patient.name}</h3>
                          {getStatusBadge(patient.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {patient.age} años, {patient.gender}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.currentTreatment}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.totalVisits} visitas</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPatient(patient)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {patients
                .filter((patient) => patient.status === "completed")
                .map((patient) => (
                  <Card key={patient.id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{patient.name}</h3>
                            {getStatusBadge(patient.status)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {patient.age} años, {patient.gender}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Stethoscope className="h-4 w-4 text-muted-foreground" />
                              <span>{patient.currentTreatment}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{patient.totalVisits} visitas totales</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Asignado: {patient.assignedDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            Ver Reporte Final
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Patient Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          {selectedPatient && (
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Detalles del Paciente</DialogTitle>
                <DialogDescription>Información completa de {selectedPatient.name}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Personal Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Nombre Completo</p>
                        <p>{selectedPatient.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Edad</p>
                        <p>{selectedPatient.age} años</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Género</p>
                        <p>{selectedPatient.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Teléfono</p>
                        <p>{selectedPatient.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p>{selectedPatient.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Contacto de Emergencia</p>
                        <p>{selectedPatient.emergencyContact}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium">Dirección</p>
                      <p>{selectedPatient.address}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historia Médica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Alergias</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPatient.medicalHistory.allergies.map((allergy: string, index: number) => (
                            <Badge key={index} variant={allergy === "Ninguna conocida" ? "outline" : "destructive"}>
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Medicamentos Actuales</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPatient.medicalHistory.medications.map((medication: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {medication}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Condiciones Médicas</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPatient.medicalHistory.conditions.map((condition: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Última Actualización</p>
                        <p className="text-sm text-muted-foreground">{selectedPatient.medicalHistory.lastUpdate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historial de Tratamientos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.treatmentHistory.map((treatment: any, index: number) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{treatment.procedure}</h4>
                            <Badge
                              variant={treatment.status === "completed" ? "default" : "outline"}
                              className={
                                treatment.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {treatment.status === "completed" ? "Completado" : "Programado"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{treatment.date}</p>
                          <p className="text-sm">{treatment.notes}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Treatment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tratamiento Actual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Procedimiento</p>
                        <p>{selectedPatient.currentTreatment}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Supervisor</p>
                        <p>{selectedPatient.supervisor}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Total de Visitas</p>
                          <p>{selectedPatient.totalVisits}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Tareas Pendientes</p>
                          <p>{selectedPatient.pendingTasks}</p>
                        </div>
                      </div>
                      {selectedPatient.nextAppointment && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium">Próxima Cita</p>
                          <p className="text-sm">
                            {selectedPatient.nextAppointment.date} a las {selectedPatient.nextAppointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedPatient.nextAppointment.type} - {selectedPatient.nextAppointment.location}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Cerrar
                </Button>
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  Contactar Paciente
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}
