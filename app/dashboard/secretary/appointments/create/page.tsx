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
import { CalendarIcon, Clock, User, Stethoscope, ArrowLeft, Plus } from "lucide-react"
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
}

interface Student {
  id: string
  name: string
  specialty: string
  semester: number
  email: string
  phone: string
  experience: string
}

interface Specialty {
  id: string
  name: string
  duration: number
  description: string
  requirements: string[]
}

export default function CreateAppointment() {
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
  })

  // Datos expandidos de pacientes
  const patients: Patient[] = [
    {
      id: "1",
      name: "María González Pérez",
      cedula: "1234567890",
      phone: "+593 99 123 4567",
      email: "maria.gonzalez@email.com",
      age: 28,
      address: "Av. Universitaria 123, Manta",
    },
    {
      id: "2",
      name: "Carlos Ruiz Mendoza",
      cedula: "2345678901",
      phone: "+593 99 234 5678",
      email: "carlos.ruiz@email.com",
      age: 35,
      address: "Calle 24 de Mayo 456, Manta",
    },
    {
      id: "3",
      name: "Laura Martínez Silva",
      cedula: "3456789012",
      phone: "+593 99 345 6789",
      email: "laura.martinez@email.com",
      age: 22,
      address: "Barrio Los Almendros, Manta",
    },
    {
      id: "4",
      name: "Roberto Díaz Castro",
      cedula: "4567890123",
      phone: "+593 99 456 7890",
      email: "roberto.diaz@email.com",
      age: 45,
      address: "Ciudadela El Palmar, Manta",
    },
    {
      id: "5",
      name: "Ana Rodríguez López",
      cedula: "5678901234",
      phone: "+593 99 567 8901",
      email: "ana.rodriguez@email.com",
      age: 31,
      address: "Av. Flavio Reyes 789, Manta",
    },
    {
      id: "6",
      name: "Pedro Morales Vera",
      cedula: "6789012345",
      phone: "+593 99 678 9012",
      email: "pedro.morales@email.com",
      age: 38,
      address: "Barrio Jocay, Manta",
    },
    {
      id: "7",
      name: "Carmen Torres Alava",
      cedula: "7890123456",
      phone: "+593 99 789 0123",
      email: "carmen.torres@email.com",
      age: 26,
      address: "Ciudadela Miraflores, Manta",
    },
    {
      id: "8",
      name: "Luis Herrera Ponce",
      cedula: "8901234567",
      phone: "+593 99 890 1234",
      email: "luis.herrera@email.com",
      age: 42,
      address: "Av. 4 de Noviembre, Manta",
    },
  ]

  // Datos expandidos de especialidades
  const specialties: Specialty[] = [
    {
      id: "1",
      name: "Endodoncia",
      duration: 90,
      description: "Tratamiento de conductos radiculares y terapia pulpar",
      requirements: ["Radiografías periapicales", "Pruebas de vitalidad pulpar"],
    },
    {
      id: "2",
      name: "Ortodoncia",
      duration: 60,
      description: "Corrección de la posición dental y maloclusiones",
      requirements: ["Radiografías panorámicas", "Modelos de estudio", "Fotografías clínicas"],
    },
    {
      id: "3",
      name: "Cirugía Oral y Maxilofacial",
      duration: 120,
      description: "Extracciones dentales y procedimientos quirúrgicos orales",
      requirements: ["Radiografías panorámicas", "Evaluación preoperatoria", "Consentimiento informado"],
    },
    {
      id: "4",
      name: "Periodoncia",
      duration: 75,
      description: "Tratamiento de enfermedades de las encías y tejidos de soporte",
      requirements: ["Radiografías periapicales", "Sondaje periodontal"],
    },
    {
      id: "5",
      name: "Odontopediatría",
      duration: 45,
      description: "Atención dental especializada para niños y adolescentes",
      requirements: ["Acompañante adulto", "Historial médico pediátrico"],
    },
    {
      id: "6",
      name: "Prostodoncia",
      duration: 90,
      description: "Rehabilitación oral con prótesis dentales",
      requirements: ["Impresiones dentales", "Radiografías panorámicas"],
    },
    {
      id: "7",
      name: "Odontología Estética",
      duration: 60,
      description: "Tratamientos estéticos y blanqueamiento dental",
      requirements: ["Fotografías clínicas", "Evaluación del color dental"],
    },
    {
      id: "8",
      name: "Implantología",
      duration: 150,
      description: "Colocación de implantes dentales",
      requirements: ["Tomografía computarizada", "Evaluación ósea", "Consentimiento informado"],
    },
  ]

  // Datos expandidos de estudiantes
  const students: Student[] = [
    {
      id: "1",
      name: "Juan Carlos Pérez Mendoza",
      specialty: "Endodoncia",
      semester: 8,
      email: "juan.perez@uleam.edu.ec",
      phone: "+593 99 111 2222",
      experience: "Avanzado",
    },
    {
      id: "2",
      name: "Ana María López Silva",
      specialty: "Ortodoncia",
      semester: 7,
      email: "ana.lopez@uleam.edu.ec",
      phone: "+593 99 222 3333",
      experience: "Intermedio",
    },
    {
      id: "3",
      name: "Pedro Antonio Silva Castro",
      specialty: "Cirugía Oral y Maxilofacial",
      semester: 9,
      email: "pedro.silva@uleam.edu.ec",
      phone: "+593 99 333 4444",
      experience: "Avanzado",
    },
    {
      id: "4",
      name: "Carmen Elena Torres Vera",
      specialty: "Periodoncia",
      semester: 6,
      email: "carmen.torres@uleam.edu.ec",
      phone: "+593 99 444 5555",
      experience: "Intermedio",
    },
    {
      id: "5",
      name: "Luis Fernando Morales Ponce",
      specialty: "Odontopediatría",
      semester: 5,
      email: "luis.morales@uleam.edu.ec",
      phone: "+593 99 555 6666",
      experience: "Básico",
    },
    {
      id: "6",
      name: "María José Herrera Alava",
      specialty: "Endodoncia",
      semester: 8,
      email: "maria.herrera@uleam.edu.ec",
      phone: "+593 99 666 7777",
      experience: "Avanzado",
    },
    {
      id: "7",
      name: "Roberto Carlos Díaz López",
      specialty: "Ortodoncia",
      semester: 7,
      email: "roberto.diaz@uleam.edu.ec",
      phone: "+593 99 777 8888",
      experience: "Intermedio",
    },
    {
      id: "8",
      name: "Laura Patricia Rodríguez Mora",
      specialty: "Prostodoncia",
      semester: 9,
      email: "laura.rodriguez@uleam.edu.ec",
      phone: "+593 99 888 9999",
      experience: "Avanzado",
    },
    {
      id: "9",
      name: "Diego Alejandro Vega Santos",
      specialty: "Odontología Estética",
      semester: 6,
      email: "diego.vega@uleam.edu.ec",
      phone: "+593 99 999 0000",
      experience: "Intermedio",
    },
    {
      id: "10",
      name: "Sofía Gabriela Muñoz Cedeño",
      specialty: "Implantología",
      semester: 10,
      email: "sofia.munoz@uleam.edu.ec",
      phone: "+593 99 000 1111",
      experience: "Avanzado",
    },
    {
      id: "11",
      name: "Andrés Felipe Castillo Bravo",
      specialty: "Cirugía Oral y Maxilofacial",
      semester: 9,
      email: "andres.castillo@uleam.edu.ec",
      phone: "+593 99 111 0000",
      experience: "Avanzado",
    },
    {
      id: "12",
      name: "Valeria Nicole Zambrano Loor",
      specialty: "Odontopediatría",
      semester: 5,
      email: "valeria.zambrano@uleam.edu.ec",
      phone: "+593 99 222 1111",
      experience: "Básico",
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

    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      cedula: newPatient.cedula,
      phone: newPatient.phone,
      email: newPatient.email,
      age: Number.parseInt(newPatient.age) || 0,
      address: newPatient.address,
    }

    // Add to patients list (in real app, this would be an API call)
    patients.push(patient)

    // Select the new patient
    handlePatientSelect(patient.id)
    setShowNewPatientForm(false)
    setNewPatient({
      name: "",
      cedula: "",
      phone: "",
      email: "",
      age: "",
      address: "",
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
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-gray-500">
                                CI: {patient.cedula} • {patient.age} años
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.patientId && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Teléfono</Label>
                        <Input value={formData.patientPhone} readOnly />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={formData.patientEmail} readOnly />
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
                        <div>
                          <div className="font-medium">{specialty.name}</div>
                          <div className="text-sm text-gray-500">
                            Duración: {specialty.duration} min • {specialty.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">
                            {student.semester}° Semestre • {student.experience} • {student.phone}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                        return date < today || date.getDay() === 0 || date.getDay() === 6
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                  placeholder="Escribe cualquier información adicional sobre la cita..."
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
