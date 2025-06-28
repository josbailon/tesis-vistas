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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Clock, User, AlertCircle, CheckCircle, Save, Stethoscope } from "lucide-react"
import { es } from "date-fns/locale"
import { cn, getSpecialtyColor } from "@/lib/utils"

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

interface Student {
  id: string
  name: string
  email: string
  specialty: string
  semester: number
  supervisor: string
}

interface TimeSlot {
  time: string
  available: boolean
  studentId?: string
  studentName?: string
}

interface AppointmentFormProps {
  mode?: "create" | "edit"
  appointmentId?: string
  onSubmit?: (data: any) => void
  onCancel?: () => void
}

export function AppointmentForm({ mode = "create", appointmentId, onSubmit, onCancel }: AppointmentFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("")
  const [priority, setPriority] = useState<string>("normal")
  const [notes, setNotes] = useState<string>("")
  const [symptoms, setSymptoms] = useState<string>("")
  const [isNewPatient, setIsNewPatient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  // New patient form data
  const [newPatientData, setNewPatientData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: [] as string[],
    allergies: [] as string[],
    currentMedications: [] as string[],
    insuranceProvider: "",
    insuranceNumber: "",
  })

  const { toast } = useToast()

  // Mock data
  const patients: Patient[] = [
    {
      id: "pac1",
      name: "Ana Rodríguez",
      email: "ana.rodriguez@gmail.com",
      phone: "+593 99 123 4567",
      birthDate: "1985-03-15",
      address: "Av. Universitaria 123, Manta",
      emergencyContact: "Carlos Rodríguez - +593 99 765 4321",
      medicalHistory: ["Hipertensión", "Diabetes tipo 2"],
      allergies: ["Penicilina"],
      currentMedications: ["Metformina", "Losartán"],
      insuranceProvider: "IESS",
      insuranceNumber: "1234567890",
    },
    {
      id: "pac2",
      name: "Miguel Santos",
      email: "miguel.santos@hotmail.com",
      phone: "+593 99 234 5678",
      birthDate: "1992-07-22",
      address: "Calle 10 de Agosto 456, Manta",
      emergencyContact: "María Santos - +593 99 876 5432",
      medicalHistory: [],
      allergies: [],
      currentMedications: [],
    },
  ]

  const students: Student[] = [
    {
      id: "est1",
      name: "Juan Pérez",
      email: "juan.perez@uleam.edu.ec",
      specialty: "endodoncia",
      semester: 8,
      supervisor: "Dr. Carlos Ruiz",
    },
    {
      id: "est2",
      name: "María González",
      email: "maria.gonzalez@uleam.edu.ec",
      specialty: "ortodoncia",
      semester: 7,
      supervisor: "Dra. Laura Martín",
    },
    {
      id: "est3",
      name: "Carlos López",
      email: "carlos.lopez@uleam.edu.ec",
      specialty: "cirugia",
      semester: 9,
      supervisor: "Dr. Roberto Silva",
    },
  ]

  const specialties = [
    { value: "endodoncia", label: "Endodoncia", description: "Tratamiento de conductos radiculares" },
    { value: "ortodoncia", label: "Ortodoncia", description: "Corrección de malposiciones dentales" },
    { value: "cirugia", label: "Cirugía Oral", description: "Extracciones y cirugías bucales" },
    { value: "odontopediatria", label: "Odontopediatría", description: "Odontología infantil" },
    { value: "periodoncia", label: "Periodoncia", description: "Tratamiento de encías" },
    { value: "protesis", label: "Prótesis", description: "Rehabilitación protésica" },
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

  const commonMedicalConditions = [
    "Hipertensión arterial",
    "Diabetes",
    "Cardiopatías",
    "Asma",
    "Epilepsia",
    "Hepatitis",
    "VIH/SIDA",
    "Embarazo",
    "Lactancia",
    "Tratamiento anticoagulante",
    "Marcapasos",
    "Prótesis articulares",
  ]

  const commonAllergies = [
    "Penicilina",
    "Lidocaína",
    "Látex",
    "Yodo",
    "Aspirina",
    "Ibuprofeno",
    "Sulfas",
    "Anestésicos locales",
  ]

  // Generate time slots for selected date
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const startHour = 8
    const endHour = 17
    const interval = 30 // minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

        // Mock availability - some slots are taken
        const isAvailable = Math.random() > 0.3
        const assignedStudent = isAvailable ? undefined : students[Math.floor(Math.random() * students.length)]

        slots.push({
          time,
          available: isAvailable,
          studentId: assignedStudent?.id,
          studentName: assignedStudent?.name,
        })
      }
    }

    return slots
  }

  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(generateTimeSlots(selectedDate))
    }
  }, [selectedDate])

  const filteredStudents = selectedSpecialty
    ? students.filter((student) => student.specialty === selectedSpecialty)
    : students

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    setSelectedPatient(patient || null)
  }

  const handleStudentSelect = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    setSelectedStudent(student || null)
    if (student) {
      setSelectedSpecialty(student.specialty)
    }
  }

  const handleMedicalHistoryChange = (condition: string, checked: boolean) => {
    setNewPatientData((prev) => ({
      ...prev,
      medicalHistory: checked
        ? [...prev.medicalHistory, condition]
        : prev.medicalHistory.filter((c) => c !== condition),
    }))
  }

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setNewPatientData((prev) => ({
      ...prev,
      allergies: checked ? [...prev.allergies, allergy] : prev.allergies.filter((a) => a !== allergy),
    }))
  }

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return isNewPatient
          ? !!(newPatientData.name && newPatientData.phone && newPatientData.birthDate)
          : !!selectedPatient
      case 2:
        return !!(selectedSpecialty && selectedStudent)
      case 3:
        return !!(selectedDate && selectedTime && appointmentType)
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const appointmentData = {
        id: appointmentId || `apt_${Date.now()}`,
        patient: isNewPatient ? newPatientData : selectedPatient,
        student: selectedStudent,
        specialty: selectedSpecialty,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        priority,
        notes,
        symptoms,
        status: "scheduled",
        createdAt: new Date().toISOString(),
        isNewPatient,
      }

      onSubmit?.(appointmentData)

      toast({
        title: "Cita agendada",
        description: `La cita ha sido ${mode === "create" ? "creada" : "actualizada"} exitosamente`,
      })

      // Reset form
      if (mode === "create") {
        setSelectedDate(undefined)
        setSelectedTime("")
        setSelectedPatient(null)
        setSelectedStudent(null)
        setSelectedSpecialty("")
        setAppointmentType("")
        setNotes("")
        setSymptoms("")
        setStep(1)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar la cita",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    } else {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios antes de continuar",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                    step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={cn("w-20 h-1 mx-2", step > stepNumber ? "bg-primary" : "bg-muted")} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Paciente</span>
            <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Especialidad</span>
            <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Fecha y Hora</span>
            <span className={step >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>Confirmación</span>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Patient Selection */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Selección de Paciente
            </CardTitle>
            <CardDescription>Selecciona un paciente existente o registra uno nuevo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="new-patient" checked={isNewPatient} onCheckedChange={setIsNewPatient} />
              <Label htmlFor="new-patient">Registrar nuevo paciente</Label>
            </div>

            {!isNewPatient ? (
              <div className="space-y-4">
                <Label>Seleccionar Paciente Existente</Label>
                <Select onValueChange={handlePatientSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Buscar paciente..." />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{patient.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {patient.phone} • {patient.email}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedPatient && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Información del Paciente</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Nombre</Label>
                          <p>{selectedPatient.name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Teléfono</Label>
                          <p>{selectedPatient.phone}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Email</Label>
                          <p>{selectedPatient.email}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Fecha de Nacimiento</Label>
                          <p>{new Date(selectedPatient.birthDate).toLocaleDateString("es-ES")}</p>
                        </div>
                        {selectedPatient.allergies.length > 0 && (
                          <div className="col-span-2">
                            <Label className="text-xs text-muted-foreground">Alergias</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedPatient.allergies.map((allergy) => (
                                <Badge key={allergy} variant="destructive" className="text-xs">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-medium">Datos del Nuevo Paciente</h4>

                {/* Basic Information */}
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
                    <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
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

                {/* Emergency Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                    <Input
                      id="emergencyContact"
                      value={newPatientData.emergencyContact}
                      onChange={(e) => setNewPatientData({ ...newPatientData, emergencyContact: e.target.value })}
                      placeholder="Nombre del contacto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                    <Input
                      id="emergencyPhone"
                      value={newPatientData.emergencyPhone}
                      onChange={(e) => setNewPatientData({ ...newPatientData, emergencyPhone: e.target.value })}
                      placeholder="+593 99 123 4567"
                    />
                  </div>
                </div>

                {/* Insurance Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Seguro Médico</Label>
                    <Select
                      value={newPatientData.insuranceProvider}
                      onValueChange={(value) => setNewPatientData({ ...newPatientData, insuranceProvider: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar seguro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iess">IESS</SelectItem>
                        <SelectItem value="issfa">ISSFA</SelectItem>
                        <SelectItem value="isspol">ISSPOL</SelectItem>
                        <SelectItem value="privado">Seguro Privado</SelectItem>
                        <SelectItem value="ninguno">Sin Seguro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceNumber">Número de Seguro</Label>
                    <Input
                      id="insuranceNumber"
                      value={newPatientData.insuranceNumber}
                      onChange={(e) => setNewPatientData({ ...newPatientData, insuranceNumber: e.target.value })}
                      placeholder="Número de afiliación"
                    />
                  </div>
                </div>

                {/* Medical History */}
                <div className="space-y-3">
                  <Label>Antecedentes Médicos</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {commonMedicalConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={newPatientData.medicalHistory.includes(condition)}
                          onCheckedChange={(checked) => handleMedicalHistoryChange(condition, !!checked)}
                        />
                        <Label htmlFor={condition} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div className="space-y-3">
                  <Label>Alergias</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonAllergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={newPatientData.allergies.includes(allergy)}
                          onCheckedChange={(checked) => handleAllergyChange(allergy, !!checked)}
                        />
                        <Label htmlFor={allergy} className="text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Medications */}
                <div className="space-y-2">
                  <Label htmlFor="medications">Medicamentos Actuales</Label>
                  <Textarea
                    id="medications"
                    placeholder="Lista los medicamentos que toma actualmente..."
                    rows={3}
                    onChange={(e) => {
                      const medications = e.target.value.split("\n").filter((med) => med.trim())
                      setNewPatientData({ ...newPatientData, currentMedications: medications })
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Specialty and Student Selection */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Especialidad y Estudiante
            </CardTitle>
            <CardDescription>Selecciona la especialidad y el estudiante que atenderá al paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Especialidad Requerida</Label>
              <div className="grid grid-cols-2 gap-4">
                {specialties.map((specialty) => (
                  <Card
                    key={specialty.value}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedSpecialty === specialty.value ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50",
                    )}
                    onClick={() => setSelectedSpecialty(specialty.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{specialty.label}</h4>
                          <p className="text-sm text-muted-foreground">{specialty.description}</p>
                        </div>
                        <Badge className={getSpecialtyColor(specialty.value)}>{specialty.label}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedSpecialty && (
              <div className="space-y-4">
                <Label>Estudiante Disponible</Label>
                <div className="grid gap-4">
                  {filteredStudents.map((student) => (
                    <Card
                      key={student.id}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        selectedStudent?.id === student.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50",
                      )}
                      onClick={() => handleStudentSelect(student.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{student.semester}° Semestre</Badge>
                              <Badge className={getSpecialtyColor(student.specialty)}>{student.specialty}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">Supervisor: {student.supervisor}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-600 font-medium">Disponible</div>
                            <div className="text-xs text-muted-foreground">Próxima cita: 2 días</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Date and Time Selection */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Fecha y Hora
            </CardTitle>
            <CardDescription>Selecciona la fecha, hora y tipo de cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="space-y-4">
                <Label>Fecha de la Cita</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  locale={es}
                  className="rounded-md border"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <Label>Hora Disponible</Label>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={cn("text-xs", !slot.available && "opacity-50 cursor-not-allowed")}
                      >
                        {slot.time}
                        {!slot.available && <div className="text-xs text-muted-foreground">{slot.studentName}</div>}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Selecciona una fecha para ver horarios disponibles</p>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Type */}
            <div className="space-y-4">
              <Label>Tipo de Cita</Label>
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
            </div>

            {/* Priority */}
            <div className="space-y-4">
              <Label>Prioridad</Label>
              <RadioGroup value={priority} onValueChange={setPriority}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Baja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">Alta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent">Urgente</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <Label htmlFor="symptoms">Síntomas o Motivo de Consulta</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe los síntomas o el motivo de la consulta..."
                rows={3}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Información adicional relevante..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Confirmación de Cita
            </CardTitle>
            <CardDescription>Revisa los detalles de la cita antes de confirmar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              {/* Patient Information */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información del Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {isNewPatient ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Nombre</Label>
                        <p className="font-medium">{newPatientData.name}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Teléfono</Label>
                        <p>{newPatientData.phone}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <p>{newPatientData.email}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Fecha de Nacimiento</Label>
                        <p>{new Date(newPatientData.birthDate).toLocaleDateString("es-ES")}</p>
                      </div>
                      {newPatientData.allergies.length > 0 && (
                        <div className="col-span-2">
                          <Label className="text-xs text-muted-foreground">Alergias</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {newPatientData.allergies.map((allergy) => (
                              <Badge key={allergy} variant="destructive" className="text-xs">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    selectedPatient && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Nombre</Label>
                          <p className="font-medium">{selectedPatient.name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Teléfono</Label>
                          <p>{selectedPatient.phone}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Email</Label>
                          <p>{selectedPatient.email}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Fecha de Nacimiento</Label>
                          <p>{new Date(selectedPatient.birthDate).toLocaleDateString("es-ES")}</p>
                        </div>
                        {selectedPatient.allergies.length > 0 && (
                          <div className="col-span-2">
                            <Label className="text-xs text-muted-foreground">Alergias</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedPatient.allergies.map((allergy) => (
                                <Badge key={allergy} variant="destructive" className="text-xs">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Appointment Details */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Detalles de la Cita
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Fecha</Label>
                      <p className="font-medium">
                        {selectedDate?.toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Hora</Label>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Tipo de Cita</Label>
                      <p>{appointmentTypes.find((t) => t.value === appointmentType)?.label}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Duración Estimada</Label>
                      <p>{appointmentTypes.find((t) => t.value === appointmentType)?.duration} minutos</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Especialidad</Label>
                      <Badge className={getSpecialtyColor(selectedSpecialty)}>
                        {specialties.find((s) => s.value === selectedSpecialty)?.label}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Prioridad</Label>
                      <Badge
                        className={
                          priority === "urgent"
                            ? "bg-red-100 text-red-800"
                            : priority === "high"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {priority === "urgent"
                          ? "Urgente"
                          : priority === "high"
                            ? "Alta"
                            : priority === "low"
                              ? "Baja"
                              : "Normal"}
                      </Badge>
                    </div>
                  </div>

                  {selectedStudent && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Estudiante Asignado</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-medium">{selectedStudent.name}</p>
                        <Badge variant="outline">{selectedStudent.semester}° Semestre</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Supervisor: {selectedStudent.supervisor}</p>
                    </div>
                  )}

                  {symptoms && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Síntomas</Label>
                      <p className="text-sm">{symptoms}</p>
                    </div>
                  )}

                  {notes && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Notas</Label>
                      <p className="text-sm">{notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="space-y-2">
                      <h4 className="font-medium text-yellow-800">Información Importante</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Llegar 15 minutos antes de la cita</li>
                        <li>• Traer documento de identidad</li>
                        <li>• Traer carnet de seguro médico (si aplica)</li>
                        <li>• Informar sobre cambios en medicamentos o estado de salud</li>
                        <li>• La cita puede ser reprogramada hasta 24 horas antes</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Anterior
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={nextStep} disabled={!validateStep(step)}>
                  Siguiente
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    "Procesando..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" />
                      {mode === "create" ? "Confirmar Cita" : "Actualizar Cita"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
