"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { es } from "date-fns/locale"

interface Student {
  id: string
  name: string
  email: string
  specialties: string[]
  semester: number
  supervisor: string
  schedule: {
    day: string
    startTime: string
    endTime: string
    specialty: string
  }[]
}

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
}

const mockStudents: Student[] = [
  {
    id: "est1",
    name: "Juan Pérez",
    email: "juan.perez@uleam.edu.ec",
    specialties: ["Endodoncia", "Operatoria Dental"],
    semester: 8,
    supervisor: "Dr. Carlos Ruiz",
    schedule: [
      { day: "Lunes", startTime: "08:00", endTime: "12:00", specialty: "Endodoncia" },
      { day: "Miércoles", startTime: "14:00", endTime: "18:00", specialty: "Operatoria Dental" },
    ],
  },
  {
    id: "est2",
    name: "María González",
    email: "maria.gonzalez@uleam.edu.ec",
    specialties: ["Ortodoncia", "Odontopediatría"],
    semester: 7,
    supervisor: "Dra. Laura Martín",
    schedule: [
      { day: "Martes", startTime: "08:00", endTime: "12:00", specialty: "Ortodoncia" },
      { day: "Jueves", startTime: "14:00", endTime: "18:00", specialty: "Odontopediatría" },
    ],
  },
  {
    id: "est3",
    name: "Carlos López",
    email: "carlos.lopez@uleam.edu.ec",
    specialties: ["Cirugía Oral", "Periodoncia"],
    semester: 9,
    supervisor: "Dr. Roberto Silva",
    schedule: [
      { day: "Lunes", startTime: "14:00", endTime: "18:00", specialty: "Cirugía Oral" },
      { day: "Viernes", startTime: "08:00", endTime: "12:00", specialty: "Periodoncia" },
    ],
  },
]

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
  },
]

const specialties = [
  "Endodoncia",
  "Ortodoncia",
  "Cirugía Oral",
  "Odontopediatría",
  "Periodoncia",
  "Operatoria Dental",
  "Prótesis",
  "Radiología",
]

export default function CreateAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [notes, setNotes] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [isNewPatient, setIsNewPatient] = useState(false)

  // Nuevo paciente
  const [newPatientData, setNewPatientData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    allergies: [] as string[],
    medicalHistory: [] as string[],
    emergencyContact: "",
  })

  const availableStudents = selectedSpecialty
    ? mockStudents.filter((student) => student.specialties.includes(selectedSpecialty))
    : []

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(time)
      }
    }
    return slots
  }

  const handleSubmit = () => {
    if (
      !selectedSpecialty ||
      !selectedStudent ||
      !selectedDate ||
      !selectedTime ||
      (!selectedPatient && !isNewPatient)
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    if (isNewPatient && (!newPatientData.name || !newPatientData.phone)) {
      toast({
        title: "Error",
        description: "Por favor completa los datos del nuevo paciente",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Cita creada",
      description: "La cita ha sido programada exitosamente",
    })

    router.push("/dashboard/secretary/appointments")
  }

  const commonAllergies = ["Penicilina", "Lidocaína", "Látex", "Yodo", "Aspirina"]
  const commonConditions = ["Hipertensión", "Diabetes", "Cardiopatías", "Asma", "Epilepsia"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Programar Nueva Cita</h1>
          <p className="text-muted-foreground">Completa la información para agendar una cita médica</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selección de Especialidad y Estudiante */}
        <Card>
          <CardHeader>
            <CardTitle>Especialidad y Estudiante</CardTitle>
            <CardDescription>Selecciona la especialidad y el estudiante disponible</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Especialidad *</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedSpecialty && (
              <div className="space-y-2">
                <Label>Estudiantes Disponibles ({availableStudents.length})</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {availableStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStudent?.id === student.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{student.semester}° Semestre</Badge>
                        <div className="text-xs text-muted-foreground">Supervisor: {student.supervisor}</div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {student.specialties.map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selección de Paciente */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Paciente</CardTitle>
            <CardDescription>Selecciona un paciente existente o registra uno nuevo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="new-patient" checked={isNewPatient} onCheckedChange={setIsNewPatient} />
              <Label htmlFor="new-patient">Registrar nuevo paciente</Label>
            </div>

            {!isNewPatient ? (
              <div className="space-y-2">
                <Label>Pacientes Registrados</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {mockPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPatient?.id === patient.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">{patient.phone}</div>
                      <div className="text-sm text-muted-foreground">{patient.email}</div>
                      {patient.allergies.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {patient.allergies.map((allergy) => (
                            <Badge key={allergy} variant="destructive" className="text-xs">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre Completo *</Label>
                    <Input
                      value={newPatientData.name}
                      onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })}
                      placeholder="Nombre y apellidos"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono *</Label>
                    <Input
                      value={newPatientData.phone}
                      onChange={(e) => setNewPatientData({ ...newPatientData, phone: e.target.value })}
                      placeholder="+593 99 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={newPatientData.email}
                      onChange={(e) => setNewPatientData({ ...newPatientData, email: e.target.value })}
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Nacimiento</Label>
                    <Input
                      type="date"
                      value={newPatientData.birthDate}
                      onChange={(e) => setNewPatientData({ ...newPatientData, birthDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dirección</Label>
                  <Input
                    value={newPatientData.address}
                    onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
                    placeholder="Dirección completa"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contacto de Emergencia</Label>
                  <Input
                    value={newPatientData.emergencyContact}
                    onChange={(e) => setNewPatientData({ ...newPatientData, emergencyContact: e.target.value })}
                    placeholder="Nombre y teléfono de contacto"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Alergias</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonAllergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={newPatientData.allergies.includes(allergy)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewPatientData({
                                ...newPatientData,
                                allergies: [...newPatientData.allergies, allergy],
                              })
                            } else {
                              setNewPatientData({
                                ...newPatientData,
                                allergies: newPatientData.allergies.filter((a) => a !== allergy),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={allergy} className="text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Antecedentes Médicos</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={newPatientData.medicalHistory.includes(condition)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewPatientData({
                                ...newPatientData,
                                medicalHistory: [...newPatientData.medicalHistory, condition],
                              })
                            } else {
                              setNewPatientData({
                                ...newPatientData,
                                medicalHistory: newPatientData.medicalHistory.filter((h) => h !== condition),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={condition} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fecha y Hora */}
        <Card>
          <CardHeader>
            <CardTitle>Fecha y Hora</CardTitle>
            <CardDescription>Selecciona cuándo será la cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Fecha de la Cita *</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                locale={es}
                className="rounded-md border"
              />
            </div>

            {selectedDate && selectedStudent && (
              <div className="space-y-2">
                <Label>Horarios Disponibles</Label>
                <div className="grid grid-cols-4 gap-2">
                  {generateTimeSlots().map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="text-xs"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detalles de la Cita */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Cita</CardTitle>
            <CardDescription>Información adicional sobre la consulta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Cita *</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consulta General</SelectItem>
                  <SelectItem value="treatment">Tratamiento</SelectItem>
                  <SelectItem value="followup">Seguimiento</SelectItem>
                  <SelectItem value="emergency">Emergencia</SelectItem>
                  <SelectItem value="cleaning">Limpieza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Síntomas o Motivo</Label>
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe los síntomas o motivo de la consulta..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Notas Adicionales</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Información adicional relevante..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botones de Acción */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Programar Cita
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
