"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  CalendarIcon,
  Clock,
  User,
  GraduationCap,
  Stethoscope,
  Phone,
  Search,
  CheckCircle,
  AlertCircle,
  BookOpen,
  UserPlus,
} from "lucide-react"
import { format, isWeekend, isBefore, startOfDay } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  semester: number
  experience: "Básico" | "Intermedio" | "Avanzado"
  gpa: number
  completedCases: number
  professor: string
  status: "active" | "inactive"
}

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  cedula: string
  birthDate: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalHistory: string[]
  status: "active" | "inactive"
  registrationDate: string
}

interface Specialty {
  id: string
  name: string
  description: string
  duration: number
  requirements: string[]
  professor: string
  availableSlots: string[]
}

interface TimeSlot {
  time: string
  available: boolean
  studentId?: string
  studentName?: string
}

export default function CreateAppointmentPage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [notes, setNotes] = useState("")
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false)
  const [searchPatient, setSearchPatient] = useState("")
  const [searchStudent, setSearchStudent] = useState("")

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    cedula: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
  })

  const students: Student[] = [
    {
      id: "1",
      name: "Juan Carlos Pérez Mendoza",
      email: "juan.perez@uleam.edu.ec",
      phone: "+593 99 111 2222",
      specialty: "Endodoncia",
      semester: 8,
      experience: "Avanzado",
      gpa: 8.5,
      completedCases: 25,
      professor: "Dr. Carlos Mendoza",
      status: "active",
    },
    {
      id: "2",
      name: "Ana María López Silva",
      email: "ana.lopez@uleam.edu.ec",
      phone: "+593 99 222 3333",
      specialty: "Ortodoncia",
      semester: 7,
      experience: "Intermedio",
      gpa: 9.2,
      completedCases: 18,
      professor: "Dra. María González",
      status: "active",
    },
    {
      id: "3",
      name: "Pedro Antonio Silva Castro",
      email: "pedro.silva@uleam.edu.ec",
      phone: "+593 99 333 4444",
      specialty: "Cirugía Oral y Maxilofacial",
      semester: 9,
      experience: "Avanzado",
      gpa: 8.8,
      completedCases: 32,
      professor: "Dr. Roberto Vásquez",
      status: "active",
    },
    {
      id: "4",
      name: "Carmen Elena Torres Vera",
      email: "carmen.torres@uleam.edu.ec",
      phone: "+593 99 444 5555",
      specialty: "Periodoncia",
      semester: 6,
      experience: "Intermedio",
      gpa: 8.1,
      completedCases: 12,
      professor: "Dra. Laura Martín",
      status: "active",
    },
    {
      id: "5",
      name: "Luis Fernando Morales Ponce",
      email: "luis.morales@uleam.edu.ec",
      phone: "+593 99 555 6666",
      specialty: "Odontopediatría",
      semester: 5,
      experience: "Básico",
      gpa: 7.8,
      completedCases: 8,
      professor: "Dr. Fernando López",
      status: "active",
    },
    {
      id: "6",
      name: "María José Herrera Alava",
      email: "maria.herrera@uleam.edu.ec",
      phone: "+593 99 666 7777",
      specialty: "Endodoncia",
      semester: 8,
      experience: "Avanzado",
      gpa: 9.0,
      completedCases: 28,
      professor: "Dr. Carlos Mendoza",
      status: "active",
    },
    {
      id: "7",
      name: "Roberto Carlos Díaz López",
      email: "roberto.diaz@uleam.edu.ec",
      phone: "+593 99 777 8888",
      specialty: "Ortodoncia",
      semester: 7,
      experience: "Intermedio",
      gpa: 8.3,
      completedCases: 20,
      professor: "Dra. María González",
      status: "active",
    },
    {
      id: "8",
      name: "Laura Patricia Rodríguez Mora",
      email: "laura.rodriguez@uleam.edu.ec",
      phone: "+593 99 888 9999",
      specialty: "Prostodoncia",
      semester: 9,
      experience: "Avanzado",
      gpa: 9.1,
      completedCases: 30,
      professor: "Dr. Antonio Ruiz",
      status: "active",
    },
    {
      id: "9",
      name: "Diego Alejandro Vega Santos",
      email: "diego.vega@uleam.edu.ec",
      phone: "+593 99 999 0000",
      specialty: "Odontología Estética",
      semester: 6,
      experience: "Intermedio",
      gpa: 8.4,
      completedCases: 15,
      professor: "Dra. Patricia Silva",
      status: "active",
    },
    {
      id: "10",
      name: "Sofía Gabriela Muñoz Cedeño",
      email: "sofia.munoz@uleam.edu.ec",
      phone: "+593 99 000 1111",
      specialty: "Implantología",
      semester: 10,
      experience: "Avanzado",
      gpa: 9.3,
      completedCases: 35,
      professor: "Dr. Miguel Torres",
      status: "active",
    },
    {
      id: "11",
      name: "Carlos Eduardo Zambrano Vera",
      email: "carlos.zambrano@uleam.edu.ec",
      phone: "+593 99 111 3333",
      specialty: "Periodoncia",
      semester: 7,
      experience: "Intermedio",
      gpa: 8.6,
      completedCases: 22,
      professor: "Dra. Laura Martín",
      status: "active",
    },
    {
      id: "12",
      name: "Valeria Alejandra Moreira Castro",
      email: "valeria.moreira@uleam.edu.ec",
      phone: "+593 99 222 4444",
      specialty: "Odontopediatría",
      semester: 6,
      experience: "Intermedio",
      gpa: 8.9,
      completedCases: 16,
      professor: "Dr. Fernando López",
      status: "active",
    },
  ]

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "María Elena Rodríguez Pérez",
      email: "maria.rodriguez@email.com",
      phone: "+593 99 111 0000",
      cedula: "1234567890",
      birthDate: "1985-03-15",
      address: "Av. Universitaria 123, Manta",
      emergencyContact: "Carlos Rodríguez",
      emergencyPhone: "+593 99 111 1111",
      medicalHistory: ["Hipertensión", "Alergia a la penicilina"],
      status: "active",
      registrationDate: "2024-01-15",
    },
    {
      id: "2",
      name: "José Antonio Mendoza Silva",
      email: "jose.mendoza@email.com",
      phone: "+593 99 222 0000",
      cedula: "2345678901",
      birthDate: "1978-07-22",
      address: "Calle 24 de Mayo 456, Manta",
      emergencyContact: "Ana Mendoza",
      emergencyPhone: "+593 99 222 1111",
      medicalHistory: ["Diabetes tipo 2"],
      status: "active",
      registrationDate: "2024-02-01",
    },
    {
      id: "3",
      name: "Carmen Lucía Torres Vega",
      email: "carmen.torres@email.com",
      phone: "+593 99 333 0000",
      cedula: "3456789012",
      birthDate: "1992-11-10",
      address: "Barrio Los Almendros, Manta",
      emergencyContact: "Luis Torres",
      emergencyPhone: "+593 99 333 1111",
      medicalHistory: [],
      status: "active",
      registrationDate: "2024-01-20",
    },
    {
      id: "4",
      name: "Roberto Carlos Alava Moreira",
      email: "roberto.alava@email.com",
      phone: "+593 99 444 0000",
      cedula: "4567890123",
      birthDate: "1965-01-18",
      address: "Ciudadela El Palmar, Manta",
      emergencyContact: "Elena Alava",
      emergencyPhone: "+593 99 444 1111",
      medicalHistory: ["Hipertensión", "Problemas cardíacos"],
      status: "active",
      registrationDate: "2024-02-15",
    },
    {
      id: "5",
      name: "Ana Patricia Cedeño López",
      email: "ana.cedeno@email.com",
      phone: "+593 99 555 0000",
      cedula: "5678901234",
      birthDate: "1988-05-30",
      address: "Av. Flavio Reyes 789, Manta",
      emergencyContact: "Miguel Cedeño",
      emergencyPhone: "+593 99 555 1111",
      medicalHistory: ["Alergia al látex"],
      status: "active",
      registrationDate: "2024-03-01",
    },
    {
      id: "6",
      name: "Diego Fernando Ponce Herrera",
      email: "diego.ponce@email.com",
      phone: "+593 99 666 0000",
      cedula: "6789012345",
      birthDate: "1995-09-12",
      address: "Barrio Jocay, Manta",
      emergencyContact: "Rosa Ponce",
      emergencyPhone: "+593 99 666 1111",
      medicalHistory: [],
      status: "active",
      registrationDate: "2024-01-10",
    },
    {
      id: "7",
      name: "Lucía Gabriela Santos Díaz",
      email: "lucia.santos@email.com",
      phone: "+593 99 777 0000",
      cedula: "7890123456",
      birthDate: "1982-04-08",
      address: "Ciudadela Miraflores, Manta",
      emergencyContact: "Carlos Santos",
      emergencyPhone: "+593 99 777 1111",
      medicalHistory: ["Asma"],
      status: "active",
      registrationDate: "2024-02-20",
    },
    {
      id: "8",
      name: "Fernando José Vera Muñoz",
      email: "fernando.vera@email.com",
      phone: "+593 99 888 0000",
      cedula: "8901234567",
      birthDate: "1970-12-25",
      address: "Av. 4 de Noviembre, Manta",
      emergencyContact: "Patricia Vera",
      emergencyPhone: "+593 99 888 1111",
      medicalHistory: ["Hipertensión", "Colesterol alto"],
      status: "active",
      registrationDate: "2024-01-05",
    },
  ])

  const specialties: Specialty[] = [
    {
      id: "1",
      name: "Endodoncia",
      description: "Tratamiento de conductos radiculares y terapia pulpar",
      duration: 90,
      requirements: ["Radiografía periapical", "Historia clínica completa"],
      professor: "Dr. Carlos Mendoza",
      availableSlots: ["08:00", "10:00", "14:00", "16:00"],
    },
    {
      id: "2",
      name: "Ortodoncia",
      description: "Corrección de malposiciones dentarias y maloclusiones",
      duration: 60,
      requirements: ["Radiografía panorámica", "Modelos de estudio", "Fotografías intraorales"],
      professor: "Dra. María González",
      availableSlots: ["09:00", "11:00", "15:00", "17:00"],
    },
    {
      id: "3",
      name: "Cirugía Oral y Maxilofacial",
      description: "Procedimientos quirúrgicos en cavidad oral y estructuras maxilofaciales",
      duration: 120,
      requirements: ["Radiografía panorámica", "Exámenes de laboratorio", "Consentimiento informado"],
      professor: "Dr. Roberto Vásquez",
      availableSlots: ["08:00", "10:30", "14:00"],
    },
    {
      id: "4",
      name: "Periodoncia",
      description: "Tratamiento de enfermedades de las encías y estructuras de soporte",
      duration: 75,
      requirements: ["Radiografías periapicales", "Sondaje periodontal"],
      professor: "Dra. Laura Martín",
      availableSlots: ["08:30", "10:30", "14:30", "16:30"],
    },
    {
      id: "5",
      name: "Odontopediatría",
      description: "Atención dental especializada para niños y adolescentes",
      duration: 45,
      requirements: ["Autorización de padres", "Historia clínica pediátrica"],
      professor: "Dr. Fernando López",
      availableSlots: ["09:00", "10:00", "11:00", "15:00", "16:00"],
    },
    {
      id: "6",
      name: "Prostodoncia",
      description: "Rehabilitación oral mediante prótesis dentales",
      duration: 90,
      requirements: ["Radiografía panorámica", "Impresiones", "Articulador"],
      professor: "Dr. Antonio Ruiz",
      availableSlots: ["08:00", "10:00", "14:00", "16:00"],
    },
    {
      id: "7",
      name: "Odontología Estética",
      description: "Tratamientos estéticos y restauradores",
      duration: 60,
      requirements: ["Fotografías extraorales e intraorales", "Análisis estético"],
      professor: "Dra. Patricia Silva",
      availableSlots: ["09:00", "11:00", "15:00", "17:00"],
    },
    {
      id: "8",
      name: "Implantología",
      description: "Colocación y rehabilitación con implantes dentales",
      duration: 120,
      requirements: ["Tomografía computarizada", "Exámenes de laboratorio", "Planificación quirúrgica"],
      professor: "Dr. Miguel Torres",
      availableSlots: ["08:00", "10:30", "14:00"],
    },
  ]

  const appointmentTypes = [
    "Primera consulta",
    "Consulta de seguimiento",
    "Tratamiento",
    "Emergencia",
    "Evaluación",
    "Control post-operatorio",
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchStudent.toLowerCase())
    const matchesSpecialty = !selectedSpecialty || student.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty && student.status === "active"
  })

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
      patient.cedula.includes(searchPatient) ||
      patient.phone.includes(searchPatient)
    return matchesSearch && patient.status === "active"
  })

  const getAvailableTimeSlots = (): TimeSlot[] => {
    if (!selectedSpecialty || !selectedDate) return []

    const specialty = specialties.find((s) => s.name === selectedSpecialty)
    if (!specialty) return []

    return specialty.availableSlots.map((time) => ({
      time,
      available: Math.random() > 0.3, // Simulate availability
      studentId: Math.random() > 0.7 ? "1" : undefined,
      studentName: Math.random() > 0.7 ? "Juan Pérez" : undefined,
    }))
  }

  const getExperienceBadge = (experience: string) => {
    const colors = {
      Básico: "bg-yellow-100 text-yellow-800",
      Intermedio: "bg-blue-100 text-blue-800",
      Avanzado: "bg-green-100 text-green-800",
    }
    return <Badge className={colors[experience as keyof typeof colors]}>{experience}</Badge>
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 9) return "text-green-600"
    if (gpa >= 8) return "text-blue-600"
    if (gpa >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date())
    return isBefore(date, today) || isWeekend(date)
  }

  const handleCreatePatient = () => {
    if (!newPatient.name || !newPatient.cedula || !newPatient.phone) {
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    // Check if cedula already exists
    if (patients.some((patient) => patient.cedula === newPatient.cedula)) {
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
      email: newPatient.email,
      phone: newPatient.phone,
      cedula: newPatient.cedula,
      birthDate: newPatient.birthDate,
      address: newPatient.address,
      emergencyContact: newPatient.emergencyContact,
      emergencyPhone: newPatient.emergencyPhone,
      medicalHistory: newPatient.medicalHistory ? newPatient.medicalHistory.split(",").map((h) => h.trim()) : [],
      status: "active",
      registrationDate: new Date().toISOString().split("T")[0],
    }

    setPatients((prev) => [...prev, patient])
    setSelectedPatient(patient.id)
    setIsNewPatientDialogOpen(false)
    setNewPatient({
      name: "",
      email: "",
      phone: "",
      cedula: "",
      birthDate: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalHistory: "",
    })

    toast({
      title: "Paciente registrado",
      description: `${patient.name} ha sido registrado exitosamente`,
    })
  }

  const handleCreateAppointment = () => {
    if (
      !selectedDate ||
      !selectedSpecialty ||
      !selectedStudent ||
      !selectedPatient ||
      !selectedTime ||
      !appointmentType
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    const student = students.find((s) => s.id === selectedStudent)
    const patient = patients.find((p) => p.id === selectedPatient)
    const specialty = specialties.find((s) => s.name === selectedSpecialty)

    toast({
      title: "Cita creada exitosamente",
      description: `Cita programada para ${patient?.name} con ${student?.name} el ${format(selectedDate, "dd/MM/yyyy", { locale: es })} a las ${selectedTime}`,
    })

    // Reset form
    setSelectedDate(undefined)
    setSelectedSpecialty("")
    setSelectedStudent("")
    setSelectedPatient("")
    setSelectedTime("")
    setAppointmentType("")
    setNotes("")
    setSearchPatient("")
    setSearchStudent("")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Crear Nueva Cita</h1>
          <p className="text-muted-foreground">Programa una nueva cita para un paciente</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/secretary/appointments">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Ver Todas las Citas
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date and Specialty Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Fecha y Especialidad
              </CardTitle>
              <CardDescription>Selecciona la fecha y especialidad para la cita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Fecha de la Cita *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={isDateDisabled}
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">Solo días laborables (Lunes a Viernes)</p>
                </div>
                <div className="space-y-2">
                  <Label>Especialidad *</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.id} value={specialty.name}>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            {specialty.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedSpecialty && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">Información de la Especialidad</h4>
                    <p className="text-sm text-blue-700">
                      {specialties.find((s) => s.name === selectedSpecialty)?.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-blue-700">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {specialties.find((s) => s.name === selectedSpecialty)?.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {specialties.find((s) => s.name === selectedSpecialty)?.professor}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Time Selection */}
          {selectedDate && selectedSpecialty && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios Disponibles
                </CardTitle>
                <CardDescription>
                  Selecciona un horario disponible para {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: es })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-4">
                  {getAvailableTimeSlots().map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : slot.available ? "outline" : "secondary"}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className="justify-start"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot.time}
                      {!slot.available && <span className="ml-2 text-xs">(Ocupado)</span>}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Student Selection */}
          {selectedSpecialty && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Seleccionar Estudiante
                </CardTitle>
                <CardDescription>Elige el estudiante que atenderá al paciente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Buscar Estudiante</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por nombre..."
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-3 max-h-64 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStudent === student.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{student.semester}° Semestre</span>
                              <span>•</span>
                              <span>{student.professor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getExperienceBadge(student.experience)}
                          <div className="text-right">
                            <div className={`text-sm font-medium ${getGPAColor(student.gpa)}`}>
                              GPA: {student.gpa.toFixed(1)}
                            </div>
                            <div className="text-xs text-muted-foreground">{student.completedCases} casos</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Seleccionar Paciente
              </CardTitle>
              <CardDescription>Elige el paciente para la cita o registra uno nuevo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por nombre, cédula o teléfono..."
                      value={searchPatient}
                      onChange={(e) => setSearchPatient(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button onClick={() => setIsNewPatientDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuevo Paciente
                </Button>
              </div>

              <div className="grid gap-3 max-h-64 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedPatient === patient.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-medium">{patient.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{patient.phone}</span>
                            <span>•</span>
                            <span>CI: {patient.cedula}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()} años
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {patient.medicalHistory.length > 0 ? (
                            <span className="text-orange-600">Con historial médico</span>
                          ) : (
                            <span className="text-green-600">Sin historial médico</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Cita</CardTitle>
              <CardDescription>Información adicional sobre la cita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Cita *</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de cita" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notas Adicionales</Label>
                <Textarea
                  placeholder="Información adicional sobre la cita, síntomas, observaciones..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={handleCreateAppointment} className="flex-1">
              <CheckCircle className="mr-2 h-4 w-4" />
              Crear Cita
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/secretary/appointments">Cancelar</Link>
            </Button>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Resumen de la Cita
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: es })}</span>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedTime}</span>
                </div>
              )}
              {selectedSpecialty && (
                <div className="flex items-center gap-2 text-sm">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedSpecialty}</span>
                </div>
              )}
              {selectedStudent && (
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>{students.find((s) => s.id === selectedStudent)?.name}</span>
                </div>
              )}
              {selectedPatient && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{patients.find((p) => p.id === selectedPatient)?.name}</span>
                </div>
              )}
              {appointmentType && (
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{appointmentType}</span>
                </div>
              )}

              {selectedDate &&
                selectedSpecialty &&
                selectedStudent &&
                selectedPatient &&
                selectedTime &&
                appointmentType && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Lista para crear</span>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Requirements */}
          {selectedSpecialty && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Requisitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {specialties
                    .find((s) => s.name === selectedSpecialty)
                    ?.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        {req}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* New Patient Dialog */}
      <Dialog open={isNewPatientDialogOpen} onOpenChange={setIsNewPatientDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
            <DialogDescription>Completa la información del nuevo paciente</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre Completo *</Label>
                <Input
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Nombre y apellidos"
                />
              </div>
              <div className="space-y-2">
                <Label>Cédula *</Label>
                <Input
                  value={newPatient.cedula}
                  onChange={(e) => setNewPatient({ ...newPatient, cedula: e.target.value })}
                  placeholder="1234567890"
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label>Teléfono *</Label>
                <Input
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  placeholder="+593 99 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  placeholder="paciente@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de Nacimiento</Label>
                <Input
                  type="date"
                  value={newPatient.birthDate}
                  onChange={(e) => setNewPatient({ ...newPatient, birthDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Contacto de Emergencia</Label>
                <Input
                  value={newPatient.emergencyContact}
                  onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                  placeholder="Nombre del contacto"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input
                value={newPatient.address}
                onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                placeholder="Dirección completa"
              />
            </div>
            <div className="space-y-2">
              <Label>Teléfono de Emergencia</Label>
              <Input
                value={newPatient.emergencyPhone}
                onChange={(e) => setNewPatient({ ...newPatient, emergencyPhone: e.target.value })}
                placeholder="+593 99 123 4567"
              />
            </div>
            <div className="space-y-2">
              <Label>Historial Médico</Label>
              <Textarea
                value={newPatient.medicalHistory}
                onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
                placeholder="Enfermedades, alergias, medicamentos... (separar con comas)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPatientDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePatient}>Registrar Paciente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
