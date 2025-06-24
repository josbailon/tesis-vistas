"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { UserPlus, Search, Eye, Edit, Phone, Mail, FileText, AlertCircle } from "lucide-react"

export default function PatientRegistrationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const recentPatients = [
    {
      id: "PAT001",
      name: "Ana García López",
      phone: "0999-123-456",
      email: "ana.garcia@gmail.com",
      age: 28,
      registrationDate: "2024-01-20",
      status: "active",
      lastVisit: "2024-01-22",
      assignedStudent: "Carlos López",
    },
    {
      id: "PAT002",
      name: "Roberto Silva Mendoza",
      phone: "0998-234-567",
      email: "roberto.silva@hotmail.com",
      age: 45,
      registrationDate: "2024-01-18",
      status: "active",
      lastVisit: "2024-01-21",
      assignedStudent: "María Fernández",
    },
    {
      id: "PAT003",
      name: "Carmen Vega Torres",
      phone: "0997-345-678",
      email: "carmen.vega@yahoo.com",
      age: 35,
      registrationDate: "2024-01-15",
      status: "completed",
      lastVisit: "2024-01-19",
      assignedStudent: "Juan Pérez",
    },
  ]

  const students = [
    { id: "s1", name: "Carlos López", specialty: "Endodoncia", semester: 8 },
    { id: "s2", name: "María Fernández", specialty: "Ortodoncia", semester: 9 },
    { id: "s3", name: "Juan Pérez", specialty: "Cirugía Oral", semester: 10 },
    { id: "s4", name: "Sofía Ramírez", specialty: "Odontopediatría", semester: 7 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completado</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPatients = recentPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setIsRegistrationOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Registro de Pacientes</h1>
          <p className="text-muted-foreground">Registra nuevos pacientes y gestiona la información existente</p>
        </div>
        <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Registrar Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registro de Nuevo Paciente</DialogTitle>
              <DialogDescription>Paso {currentStep} de 4 - Completa toda la información del paciente</DialogDescription>
            </DialogHeader>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && <div className={`h-1 w-16 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información Personal</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombres</Label>
                    <Input id="firstName" placeholder="Ana María" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input id="lastName" placeholder="García López" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="identification">Cédula</Label>
                    <Input id="identification" placeholder="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                    <Input id="birthDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Género</Label>
                    <RadioGroup defaultValue="female" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Femenino</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Masculino</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="0999-123-456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="paciente@gmail.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Textarea id="address" placeholder="Dirección completa del paciente" />
                </div>
              </div>
            )}

            {/* Step 2: Emergency Contact */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contacto de Emergencia</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Nombre Completo</Label>
                    <Input id="emergencyName" placeholder="Juan García" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelation">Parentesco</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Cónyuge</SelectItem>
                        <SelectItem value="parent">Padre/Madre</SelectItem>
                        <SelectItem value="sibling">Hermano/a</SelectItem>
                        <SelectItem value="child">Hijo/a</SelectItem>
                        <SelectItem value="friend">Amigo/a</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Teléfono</Label>
                    <Input id="emergencyPhone" placeholder="0999-987-654" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyEmail">Correo Electrónico</Label>
                    <Input id="emergencyEmail" type="email" placeholder="contacto@gmail.com" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Medical History */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Historia Médica</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>¿Tiene alguna alergia conocida?</Label>
                    <RadioGroup defaultValue="no" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="allergies-no" />
                        <Label htmlFor="allergies-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="allergies-yes" />
                        <Label htmlFor="allergies-yes">Sí</Label>
                      </div>
                    </RadioGroup>
                    <Textarea placeholder="Especifique las alergias..." />
                  </div>
                  <div className="space-y-2">
                    <Label>¿Toma algún medicamento actualmente?</Label>
                    <RadioGroup defaultValue="no" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="medications-no" />
                        <Label htmlFor="medications-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="medications-yes" />
                        <Label htmlFor="medications-yes">Sí</Label>
                      </div>
                    </RadioGroup>
                    <Textarea placeholder="Liste los medicamentos y dosis..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Condiciones médicas previas</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Diabetes",
                        "Hipertensión",
                        "Problemas cardíacos",
                        "Problemas respiratorios",
                        "Hepatitis",
                        "VIH/SIDA",
                        "Embarazo",
                        "Otros",
                      ].map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox id={condition} />
                          <Label htmlFor={condition} className="text-sm">
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Assignment and Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Asignación y Confirmación</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignedStudent">Estudiante Asignado</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estudiante" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} - {student.specialty} ({student.semester}° Semestre)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="treatmentType">Tipo de Tratamiento Inicial</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tratamiento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consulta General</SelectItem>
                        <SelectItem value="cleaning">Limpieza Dental</SelectItem>
                        <SelectItem value="endodontics">Endodoncia</SelectItem>
                        <SelectItem value="orthodontics">Ortodoncia</SelectItem>
                        <SelectItem value="surgery">Cirugía Oral</SelectItem>
                        <SelectItem value="pediatric">Odontopediatría</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas Adicionales</Label>
                    <Textarea id="notes" placeholder="Información adicional sobre el paciente o tratamiento..." />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Información Importante</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Una vez registrado el paciente, se enviará un correo de confirmación con los detalles de la
                          primera cita y las instrucciones necesarias.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep}>
                    Anterior
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={nextStep}>Siguiente</Button>
                ) : (
                  <Button onClick={resetForm}>Registrar Paciente</Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pacientes</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPatients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPatients.filter((p) => p.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPatients.filter((p) => p.status === "completed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <UserPlus className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Pacientes Recientes</TabsTrigger>
          <TabsTrigger value="search">Buscar Pacientes</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Registrados Recientemente</CardTitle>
              <CardDescription>Últimos pacientes registrados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{patient.name}</h3>
                        {getStatusBadge(patient.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ID: {patient.id} • Edad: {patient.age} años • Registrado: {patient.registrationDate}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Estudiante: {patient.assignedStudent} • Última visita: {patient.lastVisit}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Pacientes</CardTitle>
              <CardDescription>Busca pacientes por nombre, teléfono o correo electrónico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, teléfono o correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>

              {searchTerm && (
                <div className="space-y-4">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{patient.name}</h3>
                            {getStatusBadge(patient.status)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {patient.phone} • {patient.email}
                          </div>
                          <div className="text-sm text-muted-foreground">Estudiante: {patient.assignedStudent}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No se encontraron pacientes</h3>
                      <p className="text-muted-foreground">No hay pacientes que coincidan con tu búsqueda</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
