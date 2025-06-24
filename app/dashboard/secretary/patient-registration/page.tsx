"use client"

import { useState } from "react"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"

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

  const filteredPatients = recentPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
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
              <DialogDescription>
                Paso {currentStep} de 4 - Completa toda la información del paciente
              </DialogDescription>
            </DialogHeader>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      step <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`h-1 w-16 ${
                        step < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
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
                  <div className="space-y-2\
