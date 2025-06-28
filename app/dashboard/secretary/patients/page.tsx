"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, User, Eye, FileText, Calendar, Phone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  address: string
  allergies: string[]
  medicalHistory: string[]
  emergencyContact: string
  lastVisit?: string
  upcomingAppointments: number
  totalTreatments: number
}

const mockPatients: Patient[] = [
  {
    id: "pac1",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@gmail.com",
    phone: "+593 99 123 4567",
    birthDate: "1985-03-15",
    address: "Av. Universitaria 123, Manta",
    allergies: ["Penicilina"],
    medicalHistory: ["Hipertensión", "Diabetes tipo 2"],
    emergencyContact: "Carlos Rodríguez - +593 99 765 4321",
    lastVisit: "2024-01-10",
    upcomingAppointments: 1,
    totalTreatments: 5,
  },
  {
    id: "pac2",
    name: "Miguel Santos",
    email: "miguel.santos@hotmail.com",
    phone: "+593 99 234 5678",
    birthDate: "1992-07-22",
    address: "Calle 10 de Agosto 456, Manta",
    allergies: [],
    medicalHistory: [],
    emergencyContact: "María Santos - +593 99 876 5432",
    lastVisit: "2024-01-08",
    upcomingAppointments: 2,
    totalTreatments: 3,
  },
  {
    id: "pac3",
    name: "Carmen López",
    email: "carmen.lopez@yahoo.com",
    phone: "+593 99 345 6789",
    birthDate: "1978-11-30",
    address: "Plaza Central 789, Manta",
    allergies: ["Látex", "Yodo"],
    medicalHistory: ["Asma"],
    emergencyContact: "Pedro López - +593 99 987 6543",
    upcomingAppointments: 0,
    totalTreatments: 8,
  },
]

export default function SecretaryPatientsPage() {
  const router = useRouter()
  const [patients] = useState<Patient[]>(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Pacientes</h1>
          <p className="text-muted-foreground">Administra la información de los pacientes</p>
        </div>
        <Button onClick={() => router.push("/dashboard/secretary/appointments/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.reduce((sum, p) => sum + p.upcomingAppointments, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Alergias</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.filter((p) => p.allergies.length > 0).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tratamientos Activos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.filter((p) => p.upcomingAppointments > 0).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar pacientes por nombre, teléfono o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacientes */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Registrados</CardTitle>
          <CardDescription>{filteredPatients.length} pacientes encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {patient.email}
                        </div>
                        <span>{calculateAge(patient.birthDate)} años</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {patient.allergies.map((allergy) => (
                          <Badge key={allergy} variant="destructive" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                        {patient.medicalHistory.map((condition) => (
                          <Badge key={condition} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right text-sm">
                      <div className="font-medium">{patient.upcomingAppointments} citas programadas</div>
                      <div className="text-muted-foreground">{patient.totalTreatments} tratamientos totales</div>
                      {patient.lastVisit && (
                        <div className="text-muted-foreground">
                          Última visita: {new Date(patient.lastVisit).toLocaleDateString("es-ES")}
                        </div>
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Información Completa del Paciente</DialogTitle>
                        </DialogHeader>
                        {selectedPatient && (
                          <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="general">General</TabsTrigger>
                              <TabsTrigger value="medical">Médico</TabsTrigger>
                              <TabsTrigger value="appointments">Citas</TabsTrigger>
                            </TabsList>
                            <TabsContent value="general" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Nombre Completo</label>
                                  <p className="text-sm text-muted-foreground">{selectedPatient.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Edad</label>
                                  <p className="text-sm text-muted-foreground">
                                    {calculateAge(selectedPatient.birthDate)} años
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Teléfono</label>
                                  <p className="text-sm text-muted-foreground">{selectedPatient.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="text-sm text-muted-foreground">{selectedPatient.email}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium">Dirección</label>
                                  <p className="text-sm text-muted-foreground">{selectedPatient.address}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium">Contacto de Emergencia</label>
                                  <p className="text-sm text-muted-foreground">{selectedPatient.emergencyContact}</p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="medical" className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Alergias</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {selectedPatient.allergies.length > 0 ? (
                                    selectedPatient.allergies.map((allergy) => (
                                      <Badge key={allergy} variant="destructive">
                                        {allergy}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-sm text-muted-foreground">Sin alergias registradas</p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Antecedentes Médicos</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {selectedPatient.medicalHistory.length > 0 ? (
                                    selectedPatient.medicalHistory.map((condition) => (
                                      <Badge key={condition} variant="secondary">
                                        {condition}
                                      </Badge>
                                    ))
                                  ) : (
                                    <p className="text-sm text-muted-foreground">Sin antecedentes registrados</p>
                                  )}
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="appointments" className="space-y-4">
                              <div className="text-center py-8">
                                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">Historial de citas y tratamientos</p>
                                <Button
                                  variant="outline"
                                  className="mt-4 bg-transparent"
                                  onClick={() =>
                                    router.push(
                                      `/dashboard/secretary/appointments/create?patient=${selectedPatient.id}`,
                                    )
                                  }
                                >
                                  Programar Nueva Cita
                                </Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
