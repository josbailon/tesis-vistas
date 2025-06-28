"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { useAppointments } from "@/contexts/appointment-context"
import { CalendarIcon, Clock, User, Stethoscope, ArrowLeft, Plus, Phone, Mail, MapPin } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface Patient {
  id: string
  name: string
  cedula: string
  phone: string
  email: string
  age: number
  address: string
  emergencyContact?: string
  emergencyPhone?: string
}

interface Student {
  id: string
  name: string
  specialty: string
  semester: number
  email: string
  phone: string
  experience: "Básico" | "Intermedio" | "Avanzado"
  gpa: number
  completedCases: number
}

interface Specialty {
  id: string
  name: string
  duration: number
  description: string
  requirements: string[]
  professor: string
}

export default function CreateAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addAppointment } = useAppointments()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [showNewPatientForm, setShowNewPatientForm] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientCedula: "",
    specialtyId: "",
    studentId: "",
    time: "",
    duration: "60",
    type: "consulta",
    priority: "medium",
    notes: "",
  })

  const [newPatient, setNewPatient] = useState({
    name: "",
    cedula: "",
    phone: "",
    email: "",
    age: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  // Enhanced patients data
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "María González Pérez",
      cedula: "1234567890",
      phone: "+593 99 123 4567",
      email: "maria.gonzalez@email.com",
      age: 28,
      address: "Av. Universitaria 123, Manta",
      emergencyContact: "Carlos González",
      emergencyPhone: "+593 99 123 0000",
    },
    {
      id: "2",
      name: "Carlos Ruiz Mendoza",
      cedula: "2345678901",
      phone: "+593 99 234 5678",
      email: "carlos.ruiz@email.com",
      age: 35,
      address: "Calle 24 de Mayo 456, Manta",
      emergencyContact: "Ana Ruiz",
      emergencyPhone: "+593 99 234 0000",
    },
    {
      id: "3",
      name: "Laura Martínez Silva",
      cedula: "3456789012",
      phone: "+593 99 345 6789",
      email: "laura.martinez@email.com",
      age: 22,
      address: "Barrio Los Almendros, Manta",
      emergencyContact: "Pedro Martínez",
      emergencyPhone: "+593 99 345 0000",
    },
    {
      id: "4",
      name: "Roberto Díaz Castro",
      cedula: "4567890123",
      phone: "+593 99 456 7890",
      email: "roberto.diaz@email.com",
      age: 45,
      address: "Ciudadela El Palmar, Manta",
      emergencyContact: "Carmen Díaz",
      emergencyPhone: "+593 99 456 0000",
    },
    {
      id: "5",
      name: "Ana Rodríguez López",
      cedula: "5678901234",
      phone: "+593 99 567 8901",
      email: "ana.rodriguez@email.com",
      age: 31,
      address: "Av. Flavio Reyes 789, Manta",
      emergencyContact: "Luis Rodríguez",
      emergencyPhone: "+593 99 567 0000",
    },
    {
      id: "6",
      name: "Pedro Morales Vera",
      cedula: "6789012345",
      phone: "+593 99 678 9012",
      email: "pedro.morales@email.com",
      age: 38,
      address: "Barrio Jocay, Manta",
      emergencyContact: "Rosa Morales",
      emergencyPhone: "+593 99 678 0000",
    },
    {
      id: "7",
      name: "Carmen Torres Alava",
      cedula: "7890123456",
      phone: "+593 99 789 0123",
      email: "carmen.torres@email.com",
      age: 26,
      address: "Ciudadela Miraflores, Manta",
      emergencyContact: "Miguel Torres",
      emergencyPhone: "+593 99 789 0000",
    },
    {
      id: "8",
      name: "Luis Herrera Ponce",
      cedula: "8901234567",
      phone: "+593 99 890 1234",
      email: "luis.herrera@email.com",
      age: 42,
      address: "Av. 4 de Noviembre, Manta",
      emergencyContact: "María Herrera",
      emergencyPhone: "+593 99 890 0000",
    },
  ])

  // Enhanced specialties data
  const specialties: Specialty[] = [
    {
      id: "1",
      name: "Endodoncia",
      duration: 90,
      description: "Tratamiento de conductos radiculares y terapia pulpar",
      requirements: ["Radiografías periapicales", "Pruebas de vitalidad pulpar", "Historia clínica completa"],
      professor: "Dr. Carlos Mendoza Ruiz",
    },
    {
      id: "2",
      name: "Ortodoncia",
      duration: 60,
      description: "Corrección de la posición dental y maloclusiones",
      requirements: ["Radiografías panorámicas", "Modelos de estudio", "Fotografías clínicas", "Cefalometría"],
      professor: "Dra. Laura Martín Silva",
    },
    {
      id: "3",
      name: "Cirugía Oral y Maxilofacial",
      duration: 120,
      description: "Extracciones dentales y procedimientos quirúrgicos orales",
      requirements: [
        "Radiografías panorámicas",
        "Evaluación preoperatoria",
        "Consentimiento informado",
        "Exámenes de laboratorio",
      ],
      professor: "Dr. Roberto Silva Castro",
    },
    {
      id: "4",
      name: "Periodoncia",
      duration: 75,
      description: "Tratamiento de enfermedades de las encías y tejidos de soporte",
      requirements: ["Radiografías periapicales", "Sondaje periodontal", "Índices periodontales"],
      professor: "Dra. Elena Vásquez Torres",
    },
    {
      id: "5",
      name: "Odontopediatría",
      duration: 45,
      description: "Atención dental especializada para niños y adolescentes",
      requirements: ["Acompañante adulto", "Historial médico pediátrico", "Autorización parental"],
      professor: "Dr. Miguel Cedeño Loor",
    },
    {
      id: "6",
      name: "Prostodoncia",
      duration: 90,
      description: "Rehabilitación oral con prótesis dentales",
      requirements: ["Impresiones dentales", "Radiografías panorámicas", "Análisis oclusal"],
      professor: "Dra. Patricia Zambrano Vera",
    },
    {
      id: "7",
      name: "Odontología Estética",
      duration: 60,
      description: "Tratamientos estéticos y blanqueamiento dental",
      requirements: ["Fotografías clínicas", "Evaluación del color dental", "Consentimiento estético"],
      professor: "Dr. Andrés Castillo Bravo",
    },
    {
      id: "8",
      name: "Implantología",
      duration: 150,
      description: "Colocación de implantes dentales",
      requirements: ["Tomografía computarizada", "Evaluación ósea", "Consentimiento informado", "Exámenes médicos"],
      professor: "Dr. Diego Vega Santos",
    },
  ]

  // Enhanced students data
  const students: Student[] = [
    {
      id: "1",
      name: "Juan Carlos Pérez Mendoza",
      specialty: "Endodoncia",
      semester: 8,
      email: "juan.perez@uleam.edu.ec",
      phone: "+593 99 111 2222",
      experience: "Avanzado",
      gpa: 8.5,
      completedCases: 25,
    },
    {
      id: "2",
      name: "Ana María López Silva",
      specialty: "Ortodoncia",
      semester: 7,
      email: "ana.lopez@uleam.edu.ec",
      phone: "+593 99 222 3333",
      experience: "Intermedio",
      gpa: 9.2,
      completedCases: 18,
    },
    {
      id: "3",
      name: "Pedro Antonio Silva Castro",
      specialty: "Cirugía Oral y Maxilofacial",
      semester: 9,
      email: "pedro.silva@uleam.edu.ec",
      phone: "+593 99 333 4444",
      experience: "Avanzado",
      gpa: 8.8,
      completedCases: 32,
    },
    {
      id: "4",
      name: "Carmen Elena Torres Vera",
      specialty: "Periodoncia",
      semester: 6,
      email: "carmen.torres@uleam.edu.ec",
      phone: "+593 99 444 5555",
      experience: "Intermedio",
      gpa: 8.1,
      completedCases: 12,
    },
    {
      id: "5",
      name: "Luis Fernando Morales Ponce",
      specialty: "Odontopediatría",
      semester: 5,
      email: "luis.morales@uleam.edu.ec",
      phone: "+593 99 555 6666",
      experience: "Básico",
      gpa: 7.8,
      completedCases: 8,
    },
    {
      id: "6",
      name: "María José Herrera Alava",
      specialty: "Endodoncia",
      semester: 8,
      email: "maria.herrera@uleam.edu.ec",
      phone: "+593 99 666 7777",
      experience: "Avanzado",
      gpa: 9.0,
      completedCases: 28,
    },
    {
      id: "7",
      name: "Roberto Carlos Díaz López",
      specialty: "Ortodoncia",
      semester: 7,
      email: "roberto.diaz@uleam.edu.ec",
      phone: "+593 99 777 8888",
      experience: "Intermedio",
      gpa: 8.3,
      completedCases: 20,
    },
    {
      id: "8",
      name: "Laura Patricia Rodríguez Mora",
      specialty: "Prostodoncia",
      semester: 9,
      email: "laura.rodriguez@uleam.edu.ec",
      phone: "+593 99 888 9999",
      experience: "Avanzado",
      gpa: 9.1,
      completedCases: 30,
    },
    {
      id: "9",
      name: "Diego Alejandro Vega Santos",
      specialty: "Odontología Estética",
      semester: 6,
      email: "diego.vega@uleam.edu.ec",
      phone: "+593 99 999 0000",
      experience: "Intermedio",
      gpa: 8.4,
      completedCases: 15,
    },
    {
      id: "10",
      name: "Sofía Gabriela Muñoz Cedeño",
      specialty: "Implantología",
      semester: 10,
      email: "sofia.munoz@uleam.edu.ec",
      phone: "+593 99 000 1111",
      experience: "Avanzado",
      gpa: 9.3,
      completedCases: 35,
    },
    {
      id: "11",
      name: "Andrés Felipe Castillo Bravo",
      specialty: "Cirugía Oral y Maxilofacial",
      semester: 9,
      email: "andres.castillo@uleam.edu.ec",
      phone: "+593 99 111 0000",
      experience: "Avanzado",
      gpa: 8.7,
      completedCases: 29,
    },
    {
      id: "12",
      name: "Valeria Nicole Zambrano Loor",
      specialty: "Odontopediatría",
      semester: 5,
      email: "valeria.zambrano@uleam.edu.ec",
      phone: "+593 99 222 1111",
      experience: "Básico",
      gpa: 8.0,
      completedCases: 10,
    },
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
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      setFormData((prev) => ({
        ...prev,
        patientId,
        patientName: patient.name,
        patientPhone: patient.phone,
        patientEmail: patient.email,
        patientCedula: patient.cedula,
      }))
    }
  }

  const handleSpecialtySelect = (specialtyId: string) => {
    const specialty = specialties.find((s) => s.id === specialtyId)
    setFormData((prev) => ({
      ...prev,
      specialtyId,
      studentId: "", // Reset student when specialty changes
      duration: specialty?.duration.toString() || "60",
    }))
  }

  const getFilteredStudents = () => {
    if (!formData.specialtyId) return []
    const specialty = specialties.find((s) => s.id === formData.specialtyId)
    return students.filter((student) => student.specialty === specialty?.name)
  }

  const handleCreateNewPatient = () => {
    if (!newPatient.name || !newPatient.cedula || !newPatient.phone) {
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios del paciente",
        variant: "destructive",
      })
      return
    }

    // Validate cedula format (10 digits)
    if (!/^\d{10}$/.test(newPatient.cedula)) {
      toast({
        title: "Error",
        description: "La cédula debe tener 10 dígitos",
        variant: "destructive",
      })
      return
    }

    // Check if cedula already exists
    if (patients.some((p) => p.cedula === newPatient.cedula)) {
      toast({
        title: "Error",
        description: "Ya existe un paciente con esta cédula",
        variant: "destructive",
      })
      return
    }

    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      cedula: newPatient.cedula,
      phone: newPatient.phone,
      email: newPatient.email,
      age: Number.parseInt(newPatient.age) || 0,
      address: newPatient.address,
      emergencyContact: newPatient.emergencyContact,
      emergencyPhone: newPatient.emergencyPhone,
    }

    setPatients((prev) => [...prev, patient])
    handlePatientSelect(patient.id)
    setShowNewPatientForm(false)
    setNewPatient({
      name: "",
      cedula: "",
      phone: "",
      email: "",
      age: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
    })

    toast({
      title: "Paciente registrado",
      description: `${patient.name} ha sido registrado exitosamente`,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !formData.time || !formData.patientId || !formData.specialtyId || !formData.studentId) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const specialty = specialties.find((s) => s.id === formData.specialtyId)
      const student = students.find((s) => s.id === formData.studentId)

      const newAppointment = {
        id: Date.now().toString(),
        title: `${specialty?.name} - ${formData.patientName}`,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        patientEmail: formData.patientEmail,
        patientCedula: formData.patientCedula,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: formData.time,
        duration: formData.duration,
        type: formData.type,
        notes: formData.notes,
        priority: formData.priority,
        status: "programada" as const,
        createdAt: new Date().toISOString(),
        studentName: student?.name || "",
        specialty: specialty?.name || "",
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addAppointment(newAppointment)

      toast({
        title: "Cita creada exitosamente",
        description: `Cita para ${formData.patientName} el ${format(selectedDate, "dd/MM/yyyy", { locale: es })} a las ${formData.time}`,
      })

      router.push("/dashboard/secretary/appointments")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la cita. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Cita</h1>
          <p className="text-gray-600 mt-1">Programa una nueva cita para un paciente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Información del Paciente
              </CardTitle>
              <CardDescription>Selecciona o registra un paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showNewPatientForm ? (
                <>
                  <div>
                    <Label htmlFor="patient">Paciente *</Label>
                    <Select value={formData.patientId} onValueChange={handlePatientSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            <div className="flex flex-col">
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                <span>CI: {patient.cedula}</span>
                                <span>•</span>
                                <span>{patient.age} años</span>
                                <span>•</span>
                                <Phone className="h-3 w-3" />
                                <span>{patient.phone}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.patientId && (
                    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                      <h4 className="font-medium text-blue-900">Información del Paciente</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-blue-600" />
                          <span>{formData.patientPhone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-blue-600" />
                          <span>{formData.patientEmail}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-blue-600" />
                          <span>{patients.find((p) => p.id === formData.patientId)?.address}</span>
                        </div>
                        <div className="text-blue-700">
                          <span>Emergencia: {patients.find((p) => p.id === formData.patientId)?.emergencyContact}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setShowNewPatientForm(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Registrar nuevo paciente
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Nuevo Paciente</h4>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewPatientForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nombre Completo *</Label>
                      <Input
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                        placeholder="Nombre y apellidos"
                      />
                    </div>
                    <div>
                      <Label>Cédula *</Label>
                      <Input
                        value={newPatient.cedula}
                        onChange={(e) => setNewPatient({ ...newPatient, cedula: e.target.value })}
                        placeholder="1234567890"
                        maxLength={10}
                      />
                    </div>
                    <div>
                      <Label>Teléfono *</Label>
                      <Input
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                        placeholder="+593 99 123 4567"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                    <div>
                      <Label>Edad</Label>
                      <Input
                        type="number"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                        placeholder="25"
                        min="1"
                        max="120"
                      />
                    </div>
                    <div>
                      <Label>Dirección</Label>
                      <Input
                        value={newPatient.address}
                        onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                        placeholder="Dirección completa"
                      />
                    </div>
                    <div>
                      <Label>Contacto de Emergencia</Label>
                      <Input
                        value={newPatient.emergencyContact}
                        onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                        placeholder="Nombre del contacto"
                      />
                    </div>
                    <div>
                      <Label>Teléfono de Emergencia</Label>
                      <Input
                        value={newPatient.emergencyPhone}
                        onChange={(e) => setNewPatient({ ...newPatient, emergencyPhone: e.target.value })}
                        placeholder="+593 99 123 4567"
                      />
                    </div>
                  </div>
                  <Button type="button" onClick={handleCreateNewPatient} className="w-full">
                    Registrar Paciente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Specialty and Student */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5" />
                Especialidad y Estudiante
              </CardTitle>
              <CardDescription>Selecciona la especialidad y el estudiante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="specialty">Especialidad *</Label>
                <Select value={formData.specialtyId} onValueChange={handleSpecialtySelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.id}>
                        <div className="flex flex-col">
                          <div className="font-medium">{specialty.name}</div>
                          <div className="text-sm text-gray-500">
                            {specialty.duration} min • Prof. {specialty.professor}
                          </div>
                          <div className="text-xs text-gray-400">{specialty.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.specialtyId && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900">Requisitos de la Especialidad</h4>
                  <ul className="text-sm text-purple-700 mt-2 space-y-1">
                    {specialties
                      .find((s) => s.id === formData.specialtyId)
                      ?.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-purple-600 rounded-full" />
                          {req}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div>
                <Label htmlFor="student">Estudiante *</Label>
                <Select
                  value={formData.studentId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, studentId: value }))}
                  disabled={!formData.specialtyId}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        formData.specialtyId ? "Selecciona un estudiante" : "Primero selecciona una especialidad"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredStudents().map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        <div className="flex flex-col">
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span>{student.semester}° Semestre</span>
                            <span>•</span>
                            <span>{student.experience}</span>
                            <span>•</span>
                            <span>GPA: {student.gpa}</span>
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{student.phone}</span>
                            <span>•</span>
                            <span>{student.completedCases} casos completados</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.studentId && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900">Estudiante Seleccionado</h4>
                  {(() => {
                    const student = students.find((s) => s.id === formData.studentId)
                    return student ? (
                      <div className="text-sm text-green-700 mt-2 space-y-1">
                        <div>Email: {student.email}</div>
                        <div>Experiencia: {student.experience}</div>
                        <div>Casos completados: {student.completedCases}</div>
                      </div>
                    ) : null
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Date and Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Fecha y Hora
              </CardTitle>
              <CardDescription>Selecciona cuándo será la cita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Fecha *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Selecciona una fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const dayOfWeek = date.getDay()
                        // Disable past dates, weekends (Sunday = 0, Saturday = 6)
                        return date < today || dayOfWeek === 0 || dayOfWeek === 6
                      }}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-gray-500 mt-1">Solo días laborables (lunes a viernes)</p>
              </div>

              <div>
                <Label htmlFor="time">Hora *</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de Cita</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta">Consulta</SelectItem>
                      <SelectItem value="tratamiento">Tratamiento</SelectItem>
                      <SelectItem value="emergencia">Emergencia</SelectItem>
                      <SelectItem value="seguimiento">Seguimiento</SelectItem>
                      <SelectItem value="control">Control</SelectItem>
                      <SelectItem value="cirugia">Cirugía</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Prioridad</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Duración Estimada (minutos)</Label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  min="15"
                  max="240"
                  step="15"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas Adicionales</CardTitle>
              <CardDescription>Información adicional sobre la cita</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea
                  id="notes"
                  placeholder="Escribe cualquier información adicional sobre la cita, síntomas del paciente, preparación especial requerida, etc."
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creando..." : "Crear Cita"}
          </Button>
        </div>
      </form>
    </div>
  )
}
