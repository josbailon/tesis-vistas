"use client"

import { useState, useEffect } from "react"
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
import { Clock, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { es } from "date-fns/locale"

interface Student {
  id: string
  name: string
  email: string
  semester: number
  specialties: string[]
  supervisor: string
  rating: number
  completedCases: number
}

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  address: string
  emergencyContact: string
  medicalHistory: string[]
  allergies: string[]
  currentMedications: string[]
  insuranceProvider?: string
  insuranceNumber?: string
}

interface TimeSlot {
  time: string
  available: boolean
  studentId?: string
}

const mockStudents: Student[] = [
  {
    id: "est1",
    name: "Juan Pérez",
    email: "juan.perez@uleam.edu.ec",
    semester: 8,
    specialties: ["Endodoncia", "Odontología General"],
    supervisor: "Dr. Carlos Ruiz",
    rating: 4.8,
    completedCases: 45,
  },
  {
    id: "est2",
    name: "María González",
    email: "maria.gonzalez@uleam.edu.ec",
    semester: 7,
    specialties: ["Ortodoncia", "Odontopediatría"],
    supervisor: "Dra. Laura Martín",
    rating: 4.6,
    completedCases: 32,
  },
  {
    id: "est3",
    name: "Carlos López",
    email: "carlos.lopez@uleam.edu.ec",
    semester: 9,
    specialties: ["Cirugía Oral", "Periodoncia"],
    supervisor: "Dr. Roberto Silva",
    rating: 4.9,
    completedCases: 58,
  },
  {
    id: "est4",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@uleam.edu.ec",
    semester: 6,
    specialties: ["Odontopediatría", "Odontología General"],
    supervisor: "Dra. Carmen Vega",
    rating: 4.5,
    completedCases: 28,
  },
  {
    id: "est5",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@uleam.edu.ec",
    semester: 8,
    specialties: ["Endodoncia", "Periodoncia"],
    supervisor: "Dr. Carlos Ruiz",
    rating: 4.7,
    completedCases: 41,
  },
]

const mockPatients: Patient[] = [
  {
    id: "pac1",
    name: "Luis Mendoza",
    email: "luis.mendoza@gmail.com",
    phone: "+593 99 123 4567",
    birthDate: "1985-03-15",
    address: "Av. Universitaria 123, Manta",
    emergencyContact: "Carmen Mendoza - +593 99 765 4321",
    medicalHistory: ["Hipertensión"],
    allergies: ["Penicilina"],
    currentMedications: ["Losartán"],
    insuranceProvider: "IESS",
    insuranceNumber: "1234567890",
  },
  {
    id: "pac2",
    name: "Rosa Vera",
    email: "rosa.vera@hotmail.com",
    phone: "+593 99 234 5678",
    birthDate: "1992-07-22",
    address: "Calle 10 de Agosto 456, Manta",
    emergencyContact: "Miguel Vera - +593 99 876 5432",
    medicalHistory: [],
    allergies: [],
    currentMedications: [],
  },
]

const specialties = [
  "Endodoncia",
  "Ortodoncia",
  "Cirugía Oral",
  "Odontopediatría",
  "Periodoncia",
  "Odontología General",
]

const appointmentTypes = [
  { value: "consultation", label: "Consulta General", duration: 30 },
  { value: "cleaning", label: "Limpieza Dental", duration: 45 },
  { value: "filling", label: "Restauración", duration: 60 },
  { value: "extraction", label: "Extracción", duration: 45 },
  { value: "root_canal", label: "Endodoncia", duration: 90 },
  { value: "orthodontics", label: "Ortodoncia", duration: 60 },
  { value: "surgery", label: "Cirugía", duration: 120 },
  { value: "emergency", label: "Emergencia", duration: 30 },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

export default function CreateAppointmentPage() {
  const [step, setStep] = useState(1)
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [notes, setNotes] = useState("")
  const [isNewPatient, setIsNewPatient] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])

  const [newPatientData, setNewPatientData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    medicalHistory: [] as string[],
    allergies: [] as string[],
    currentMedications: [] as string[],
    insuranceProvider: "",
    insuranceNumber: "",
  })

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (selectedDate && selectedStudent) {
      // Simular disponibilidad de horarios
      const slots = timeSlots.map((time) => ({
        time,
        available: Math.random() > 0.3, // 70% de disponibilidad
        studentId: selectedStudent.id,
      }))
      setAvailableSlots(slots)
    }
  }, [selectedDate, selectedStudent])

  const filteredStudents = selectedSpecialty
    ? mockStudents.filter((student) => student.specialties.includes(selectedSpecialty))
    : mockStudents

  const handleCreateAppointment = () => {
    if (!selectedStudent || !selectedDate || !selectedTime || !appointmentType) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    if (!selectedPatient && !isNewPatient) {
      toast({
        title: "Error",
        description: "Selecciona un paciente o marca 'Nuevo paciente'",
        variant: "destructive",
      })
      return
    }

    if (isNewPatient && (!newPatientData.name || !newPatientData.phone)) {
      toast({
        title: "Error",
        description: "Completa los datos del nuevo paciente",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Cita creada",
      description: "La cita ha sido agendada exitosamente",
    })

    router.push("/dashboard/secretary/appointments")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Crear Nueva Cita</h1>
          <p className="text-muted-foreground">Agenda una cita para un paciente</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>Especialidad</span>
            <span className={step >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>Paciente</span>
            <span className={step >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}>Fecha y Hora</span>
            <span className={step >= 4 ? "text-blue-600 font-medium" : "text-gray-500"}>Confirmación</span>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Specialty and Student Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Especialidad</CardTitle>
              <CardDescription>Elige la especialidad requerida para la cita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specialties.map((specialty) => (
                  <Card
                    key={specialty}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedSpecialty === specialty ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-medium">{specialty}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {mockStudents.filter((s) => s.specialties.includes(specialty)).length} estudiantes
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedSpecialty && (
            <Card>
              <CardHeader>
                <CardTitle>Estudiantes Disponibles - {selectedSpecialty}</CardTitle>
                <CardDescription>Selecciona el estudiante que atenderá al paciente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredStudents.map((student) => (
                    <Card
                      key={student.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedStudent?.id === student.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{student.semester}° Semestre</Badge>
                              <Badge variant="secondary">★ {student.rating}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Supervisor: {student.supervisor}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{student.completedCases} casos</p>
                            <p className="text-xs text-muted-foreground">completados</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Especialidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {student.specialties.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 2: Patient Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Paciente</CardTitle>
              <CardDescription>Elige un paciente existente o registra uno nuevo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="new-patient" checked={isNewPatient} onCheckedChange={setIsNewPatient} />
                <Label htmlFor="new-patient">Registrar nuevo paciente</Label>
              </div>

              {!isNewPatient ? (
                <div className="space-y-4">
                  <Label>Pacientes Existentes</Label>
                  <div className="grid gap-4">
                    {mockPatients.map((patient) => (
                      <Card
                        key={patient.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedPatient?.id === patient.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{patient.name}</h3>
                              <p className="text-sm text-muted-foreground">{patient.email}</p>
                              <p className="text-sm text-muted-foreground">{patient.phone}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">
                                {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()} años
                              </p>
                              {patient.allergies.length > 0 && (
                                <Badge variant="destructive" className="mt-1">
                                  Alergias
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-medium">Datos del Nuevo Paciente</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        value={newPatientData.name}
                        onChange={(e) => setNewPatientData({ ...newPatientData, name: e.target.value })}
                        placeholder="Nombre y apellidos"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={newPatientData.phone}
                        onChange={(e) => setNewPatientData({ ...newPatientData, phone: e.target.value })}
                        placeholder="+593 99 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newPatientData.email}
                        onChange={(e) => setNewPatientData({ ...newPatientData, email: e.target.value })}
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={newPatientData.birthDate}
                        onChange={(e) => setNewPatientData({ ...newPatientData, birthDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={newPatientData.address}
                      onChange={(e) => setNewPatientData({ ...newPatientData, address: e.target.value })}
                      placeholder="Dirección completa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency">Contacto de Emergencia</Label>
                    <Input
                      id="emergency"
                      value={newPatientData.emergencyContact}
                      onChange={(e) => setNewPatientData({ ...newPatientData, emergencyContact: e.target.value })}
                      placeholder="Nombre y teléfono de emergencia"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Date and Time Selection */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Fecha</CardTitle>
                <CardDescription>Elige la fecha para la cita</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  locale={es}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horarios Disponibles</CardTitle>
                <CardDescription>
                  {selectedDate ? `Horarios para ${selectedDate.toLocaleDateString("es-ES")}` : "Selecciona una fecha"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="text-xs"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Selecciona una fecha para ver horarios</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tipo de Cita</CardTitle>
              <CardDescription>Selecciona el tipo de tratamiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo de cita" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex justify-between items-center w-full">
                        <span>{type.label}</span>
                        <span className="text-xs text-muted-foreground ml-4">{type.duration} min</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notas Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Información adicional sobre la cita..."
                rows={3}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirmar Cita</CardTitle>
            <CardDescription>Revisa los detalles antes de crear la cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Estudiante</h4>
                  <p>{selectedStudent?.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedStudent?.email}</p>
                  <Badge variant="outline">{selectedSpecialty}</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Paciente</h4>
                  {isNewPatient ? (
                    <div>
                      <p>{newPatientData.name}</p>
                      <p className="text-sm text-muted-foreground">{newPatientData.phone}</p>
                      <Badge variant="secondary">Nuevo Paciente</Badge>
                    </div>
                  ) : (
                    <div>
                      <p>{selectedPatient?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedPatient?.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Fecha y Hora</h4>
                  <p>
                    {selectedDate?.toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedTime}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tipo de Cita</h4>
                  <p>{appointmentTypes.find((t) => t.value === appointmentType)?.label}</p>
                  <p className="text-sm text-muted-foreground">
                    Duración: {appointmentTypes.find((t) => t.value === appointmentType)?.duration} minutos
                  </p>
                </div>
              </div>
            </div>

            {notes && (
              <div>
                <h4 className="font-medium mb-2">Notas</h4>
                <p className="text-sm text-muted-foreground">{notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Anterior
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && (!selectedSpecialty || !selectedStudent)) ||
                    (step === 2 && !selectedPatient && !isNewPatient) ||
                    (step === 3 && (!selectedDate || !selectedTime || !appointmentType))
                  }
                >
                  Siguiente
                </Button>
              ) : (
                <Button onClick={handleCreateAppointment}>
                  <Save className="h-4 w-4 mr-2" />
                  Crear Cita
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
