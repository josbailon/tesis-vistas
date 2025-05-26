import { addDays, setHours, setMinutes } from "date-fns"

export interface StudentProfile {
  id: string
  name: string
  email: string
  specialty: string
  semester: number
  experience: "beginner" | "intermediate" | "advanced"
  rating: number
  completedCases: number
  profileImage: string
  bio: string
  languages: string[]
  certifications: string[]
}

export interface TimeSlot {
  start: Date
  end: Date
  available: boolean
  appointmentId?: string
  type?: "class" | "appointment" | "break" | "study"
}

export interface StudentSchedule {
  studentId: string
  date: string
  timeSlots: TimeSlot[]
}

export interface AppointmentType {
  id: string
  name: string
  duration: number // en minutos
  specialty: string
  description: string
  requirements: string[]
  estimatedCost: number
}

// Datos de estudiantes por especialidad actualizado
export const studentProfiles: StudentProfile[] = [
  // Cirugía Oral y Maxilofacial
  {
    id: "s1",
    name: "Dr. Miguel Sánchez",
    email: "miguel.sanchez@uleam.edu.ec",
    specialty: "Cirugía Oral y Maxilofacial",
    semester: 9,
    experience: "advanced",
    rating: 4.9,
    completedCases: 58,
    profileImage: "/placeholder.svg?height=100&width=100&text=MS",
    bio: "Estudiante senior especializado en cirugía oral, extracciones complejas y procedimientos maxilofaciales. Amplia experiencia en casos quirúrgicos.",
    languages: ["Español", "Inglés", "Portugués"],
    certifications: ["Cirugía Oral Avanzada", "Anestesia Local", "Implantología Básica", "Primeros Auxilios"],
  },
  {
    id: "s2",
    name: "Dra. Carmen Díaz",
    email: "carmen.diaz@uleam.edu.ec",
    specialty: "Cirugía Oral y Maxilofacial",
    semester: 8,
    experience: "intermediate",
    rating: 4.6,
    completedCases: 42,
    profileImage: "/placeholder.svg?height=100&width=100&text=CD",
    bio: "Estudiante enfocada en extracciones dentales, cirugía de terceros molares y procedimientos quirúrgicos menores.",
    languages: ["Español", "Inglés"],
    certifications: ["Cirugía Oral", "Anestesia Local", "Manejo del Dolor"],
  },
  {
    id: "s3",
    name: "Dr. Roberto Vega",
    email: "roberto.vega@uleam.edu.ec",
    specialty: "Cirugía Oral y Maxilofacial",
    semester: 7,
    experience: "intermediate",
    rating: 4.4,
    completedCases: 35,
    profileImage: "/placeholder.svg?height=100&width=100&text=RV",
    bio: "Estudiante con sólida formación en cirugía oral básica y procedimientos de extracción simple y compleja.",
    languages: ["Español"],
    certifications: ["Cirugía Oral Básica", "Radiología Oral"],
  },

  // Endodoncia
  {
    id: "s4",
    name: "Dr. Pedro Gómez",
    email: "pedro.gomez@uleam.edu.ec",
    specialty: "Endodoncia",
    semester: 9,
    experience: "advanced",
    rating: 4.8,
    completedCases: 65,
    profileImage: "/placeholder.svg?height=100&width=100&text=PG",
    bio: "Especialista en tratamientos de conducto, endodoncia compleja y retratamientos. Experiencia en casos de alta complejidad.",
    languages: ["Español", "Inglés"],
    certifications: ["Endodoncia Avanzada", "Microscopía Dental", "Retratamientos", "Primeros Auxilios"],
  },
  {
    id: "s5",
    name: "Dra. Elena Morales",
    email: "elena.morales@uleam.edu.ec",
    specialty: "Endodoncia",
    semester: 8,
    experience: "intermediate",
    rating: 4.7,
    completedCases: 48,
    profileImage: "/placeholder.svg?height=100&width=100&text=EM",
    bio: "Estudiante dedicada a la endodoncia conservadora, tratamientos de conducto y terapia pulpar.",
    languages: ["Español", "Italiano"],
    certifications: ["Endodoncia Clínica", "Odontología Conservadora", "Radiología Endodóntica"],
  },
  {
    id: "s6",
    name: "Dr. Luis Herrera",
    email: "luis.herrera@uleam.edu.ec",
    specialty: "Endodoncia",
    semester: 7,
    experience: "intermediate",
    rating: 4.5,
    completedCases: 38,
    profileImage: "/placeholder.svg?height=100&width=100&text=LH",
    bio: "Estudiante enfocado en endodoncia preventiva y tratamientos de conducto en dientes anteriores y posteriores.",
    languages: ["Español", "Francés"],
    certifications: ["Endodoncia Básica", "Diagnóstico Pulpar"],
  },

  // Ortodoncia
  {
    id: "s7",
    name: "Dra. Laura Torres",
    email: "laura.torres@uleam.edu.ec",
    specialty: "Ortodoncia",
    semester: 9,
    experience: "advanced",
    rating: 4.9,
    completedCases: 72,
    profileImage: "/placeholder.svg?height=100&width=100&text=LT",
    bio: "Especialista en ortodoncia fija y removible, corrección de maloclusiones y tratamientos interceptivos.",
    languages: ["Español", "Inglés", "Francés"],
    certifications: ["Ortodoncia Avanzada", "Brackets Autoligables", "Ortodoncia Interceptiva", "Cefalometría"],
  },
  {
    id: "s8",
    name: "Dr. Carlos Mendoza",
    email: "carlos.mendoza@uleam.edu.ec",
    specialty: "Ortodoncia",
    semester: 8,
    experience: "intermediate",
    rating: 4.6,
    completedCases: 45,
    profileImage: "/placeholder.svg?height=100&width=100&text=CM",
    bio: "Estudiante especializado en ortodoncia para adolescentes y adultos, manejo de aparatos fijos y removibles.",
    languages: ["Español", "Inglés"],
    certifications: ["Ortodoncia Clínica", "Aparatos Removibles", "Fotografía Clínica"],
  },
  {
    id: "s9",
    name: "Dra. Ana Castillo",
    email: "ana.castillo@uleam.edu.ec",
    specialty: "Ortodoncia",
    semester: 7,
    experience: "intermediate",
    rating: 4.4,
    completedCases: 32,
    profileImage: "/placeholder.svg?height=100&width=100&text=AC",
    bio: "Estudiante enfocada en ortodoncia preventiva y correctiva, especializada en tratamientos tempranos.",
    languages: ["Español"],
    certifications: ["Ortodoncia Preventiva", "Manejo de Pacientes Jóvenes"],
  },

  // Odontopediatría
  {
    id: "s10",
    name: "Dr. Javier Ruiz",
    email: "javier.ruiz@uleam.edu.ec",
    specialty: "Odontopediatría",
    semester: 9,
    experience: "advanced",
    rating: 4.8,
    completedCases: 89,
    profileImage: "/placeholder.svg?height=100&width=100&text=JR",
    bio: "Especialista en odontología infantil con excelente manejo de pacientes pediátricos, prevención y tratamientos restauradores.",
    languages: ["Español", "Inglés"],
    certifications: ["Odontopediatría Avanzada", "Psicología Infantil", "Sedación Consciente", "Fluorización"],
  },
  {
    id: "s11",
    name: "Dra. María Fernández",
    email: "maria.fernandez@uleam.edu.ec",
    specialty: "Odontopediatría",
    semester: 8,
    experience: "intermediate",
    rating: 4.7,
    completedCases: 56,
    profileImage: "/placeholder.svg?height=100&width=100&text=MF",
    bio: "Estudiante dedicada a la atención dental infantil, prevención de caries y educación en salud oral para niños.",
    languages: ["Español", "Portugués"],
    certifications: ["Odontopediatría Clínica", "Prevención Dental", "Manejo Conductual"],
  },
  {
    id: "s12",
    name: "Dr. Diego Salazar",
    email: "diego.salazar@uleam.edu.ec",
    specialty: "Odontopediatría",
    semester: 7,
    experience: "intermediate",
    rating: 4.5,
    completedCases: 41,
    profileImage: "/placeholder.svg?height=100&width=100&text=DS",
    bio: "Estudiante especializado en tratamientos restauradores pediátricos y manejo de ansiedad dental en niños.",
    languages: ["Español"],
    certifications: ["Odontopediatría Básica", "Técnicas de Relajación", "Primeros Auxilios Pediátricos"],
  },
]

// Tipos de citas disponibles actualizados
export const appointmentTypes: AppointmentType[] = [
  // Consultas Generales
  {
    id: "consulta-inicial",
    name: "Consulta Inicial",
    duration: 45,
    specialty: "General",
    description: "Evaluación inicial, diagnóstico y plan de tratamiento",
    requirements: ["Cédula de identidad", "Historial médico básico"],
    estimatedCost: 0,
  },
  {
    id: "revision-general",
    name: "Revisión General",
    duration: 30,
    specialty: "General",
    description: "Examen dental de rutina y limpieza básica",
    requirements: ["Cédula de identidad"],
    estimatedCost: 0,
  },

  // Cirugía Oral y Maxilofacial
  {
    id: "extraccion-simple",
    name: "Extracción Simple",
    duration: 45,
    specialty: "Cirugía Oral y Maxilofacial",
    description: "Extracción de pieza dental sin complicaciones",
    requirements: ["Radiografías recientes", "Evaluación preoperatoria", "Ayuno de 2 horas"],
    estimatedCost: 25,
  },
  {
    id: "extraccion-compleja",
    name: "Extracción Compleja",
    duration: 90,
    specialty: "Cirugía Oral y Maxilofacial",
    description: "Extracción quirúrgica de piezas dentales complicadas",
    requirements: [
      "Radiografías panorámicas",
      "Evaluación preoperatoria",
      "Consentimiento informado",
      "Ayuno de 4 horas",
    ],
    estimatedCost: 50,
  },
  {
    id: "cirugia-terceros-molares",
    name: "Cirugía de Terceros Molares",
    duration: 120,
    specialty: "Cirugía Oral y Maxilofacial",
    description: "Extracción quirúrgica de muelas del juicio",
    requirements: [
      "Radiografías panorámicas",
      "Tomografía (si es necesaria)",
      "Evaluación preoperatoria completa",
      "Ayuno de 6 horas",
    ],
    estimatedCost: 75,
  },
  {
    id: "biopsia-oral",
    name: "Biopsia Oral",
    duration: 60,
    specialty: "Cirugía Oral y Maxilofacial",
    description: "Toma de muestra de tejido para análisis histopatológico",
    requirements: ["Evaluación previa", "Consentimiento informado", "Ayuno de 2 horas"],
    estimatedCost: 40,
  },

  // Endodoncia
  {
    id: "tratamiento-conducto-anterior",
    name: "Endodoncia Diente Anterior",
    duration: 90,
    specialty: "Endodoncia",
    description: "Tratamiento de conducto en dientes anteriores (incisivos y caninos)",
    requirements: ["Radiografías periapicales", "Pruebas de vitalidad pulpar", "Consentimiento informado"],
    estimatedCost: 80,
  },
  {
    id: "tratamiento-conducto-posterior",
    name: "Endodoncia Diente Posterior",
    duration: 120,
    specialty: "Endodoncia",
    description: "Tratamiento de conducto en premolares y molares",
    requirements: ["Radiografías periapicales", "Pruebas de vitalidad pulpar", "Consentimiento informado"],
    estimatedCost: 120,
  },
  {
    id: "retratamiento-endodontico",
    name: "Retratamiento Endodóntico",
    duration: 150,
    specialty: "Endodoncia",
    description: "Retratamiento de conducto en dientes previamente tratados",
    requirements: ["Radiografías periapicales", "Evaluación del tratamiento previo", "Consentimiento informado"],
    estimatedCost: 150,
  },
  {
    id: "pulpotomia",
    name: "Pulpotomía",
    duration: 60,
    specialty: "Endodoncia",
    description: "Tratamiento pulpar parcial en dientes con pulpa vital",
    requirements: ["Radiografías periapicales", "Evaluación clínica"],
    estimatedCost: 45,
  },

  // Ortodoncia
  {
    id: "consulta-ortodontica",
    name: "Consulta Ortodóntica",
    duration: 60,
    specialty: "Ortodoncia",
    description: "Evaluación ortodóntica inicial y plan de tratamiento",
    requirements: ["Radiografías panorámicas", "Fotografías clínicas", "Modelos de estudio"],
    estimatedCost: 30,
  },
  {
    id: "colocacion-brackets",
    name: "Colocación de Brackets",
    duration: 120,
    specialty: "Ortodoncia",
    description: "Instalación de aparatos ortodónticos fijos",
    requirements: ["Consulta ortodóntica previa", "Radiografías actualizadas", "Profilaxis dental"],
    estimatedCost: 200,
  },
  {
    id: "ajuste-ortodontico",
    name: "Ajuste Ortodóntico",
    duration: 30,
    specialty: "Ortodoncia",
    description: "Control y ajuste mensual de aparatos ortodónticos",
    requirements: ["Tratamiento ortodóntico activo"],
    estimatedCost: 25,
  },
  {
    id: "retenedores",
    name: "Colocación de Retenedores",
    duration: 45,
    specialty: "Ortodoncia",
    description: "Instalación de retenedores post-tratamiento ortodóntico",
    requirements: ["Finalización del tratamiento ortodóntico", "Impresiones dentales"],
    estimatedCost: 80,
  },
  {
    id: "aparato-removible",
    name: "Aparato Removible",
    duration: 60,
    specialty: "Ortodoncia",
    description: "Colocación y ajuste de aparatos ortodónticos removibles",
    requirements: ["Consulta ortodóntica", "Impresiones dentales"],
    estimatedCost: 120,
  },

  // Odontopediatría
  {
    id: "revision-pediatrica",
    name: "Revisión Pediátrica",
    duration: 30,
    specialty: "Odontopediatría",
    description: "Examen dental completo para niños y adolescentes",
    requirements: ["Acompañante adulto responsable", "Carnet de vacunación"],
    estimatedCost: 0,
  },
  {
    id: "limpieza-pediatrica",
    name: "Limpieza Dental Pediátrica",
    duration: 45,
    specialty: "Odontopediatría",
    description: "Profilaxis y limpieza dental para niños",
    requirements: ["Acompañante adulto", "Revisión previa"],
    estimatedCost: 20,
  },
  {
    id: "sellantes-fosetas",
    name: "Sellantes de Fosetas y Fisuras",
    duration: 60,
    specialty: "Odontopediatría",
    description: "Aplicación de sellantes preventivos en molares permanentes",
    requirements: ["Acompañante adulto", "Dientes permanentes erupcionados"],
    estimatedCost: 15,
  },
  {
    id: "fluoracion-topica",
    name: "Fluoración Tópica",
    duration: 30,
    specialty: "Odontopediatría",
    description: "Aplicación de flúor para prevención de caries",
    requirements: ["Acompañante adulto", "Limpieza dental previa"],
    estimatedCost: 10,
  },
  {
    id: "restauracion-pediatrica",
    name: "Restauración Pediátrica",
    duration: 60,
    specialty: "Odontopediatría",
    description: "Tratamiento de caries en dientes temporales o permanentes jóvenes",
    requirements: ["Acompañante adulto", "Radiografías si es necesario"],
    estimatedCost: 35,
  },
  {
    id: "pulpotomia-pediatrica",
    name: "Pulpotomía Pediátrica",
    duration: 75,
    specialty: "Odontopediatría",
    description: "Tratamiento pulpar en dientes temporales",
    requirements: ["Acompañante adulto", "Radiografías periapicales", "Consentimiento informado"],
    estimatedCost: 50,
  },
]

// Función para generar horarios de estudiantes
export function generateStudentSchedule(studentId: string, date: Date): TimeSlot[] {
  const timeSlots: TimeSlot[] = []
  const startHour = 8
  const endHour = 18
  const slotDuration = 30 // minutos

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const slotStart = setMinutes(setHours(date, hour), minute)
      const slotEnd = setMinutes(setHours(date, hour), minute + slotDuration)

      // Simular disponibilidad basada en horarios académicos
      const isAvailable =
        !isClassTime(slotStart) && !isBreakTime(slotStart) && !hasExistingAppointment(studentId, slotStart)

      timeSlots.push({
        start: slotStart,
        end: slotEnd,
        available: isAvailable,
        type: getSlotType(slotStart),
      })
    }
  }

  return timeSlots
}

// Función para verificar si es horario de clases
function isClassTime(date: Date): boolean {
  const hour = date.getHours()
  const dayOfWeek = date.getDay()

  // Lunes a Viernes: clases de 8-12 y 14-16
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    return (hour >= 8 && hour < 12) || (hour >= 14 && hour < 16)
  }
  return false
}

// Función para verificar si es horario de descanso
function isBreakTime(date: Date): boolean {
  const hour = date.getHours()
  const minute = date.getMinutes()

  // Descanso de 12:00 a 14:00
  return hour >= 12 && hour < 14
}

// Función para verificar citas existentes (simulada)
function hasExistingAppointment(studentId: string, date: Date): boolean {
  // Simular algunas citas existentes
  const existingAppointments = [
    { studentId: "s1", date: setMinutes(setHours(new Date(), 10), 0) },
    { studentId: "s1", date: setMinutes(setHours(new Date(), 15), 30) },
    { studentId: "s4", date: setMinutes(setHours(new Date(), 9), 0) },
    { studentId: "s7", date: setMinutes(setHours(new Date(), 11), 0) },
    { studentId: "s10", date: setMinutes(setHours(new Date(), 16), 0) },
  ]

  return existingAppointments.some((apt) => apt.studentId === studentId && apt.date.getTime() === date.getTime())
}

// Función para obtener el tipo de slot
function getSlotType(date: Date): "class" | "appointment" | "break" | "study" {
  if (isClassTime(date)) return "class"
  if (isBreakTime(date)) return "break"
  if (hasExistingAppointment("", date)) return "appointment"
  return "study"
}

// Función para obtener estudiantes por especialidad
export function getStudentsBySpecialty(specialty: string): StudentProfile[] {
  if (specialty === "General") {
    // Para consultas generales, mostrar estudiantes de todas las especialidades
    return studentProfiles
  }
  return studentProfiles.filter((student) => student.specialty === specialty)
}

// Función para obtener horarios disponibles de un estudiante
export function getAvailableSlots(studentId: string, date: Date, duration: number): TimeSlot[] {
  const schedule = generateStudentSchedule(studentId, date)
  const availableSlots: TimeSlot[] = []

  for (let i = 0; i < schedule.length; i++) {
    const slot = schedule[i]
    if (!slot.available) continue

    // Verificar si hay suficientes slots consecutivos para la duración requerida
    const slotsNeeded = Math.ceil(duration / 30)
    let consecutiveSlots = 1

    for (let j = i + 1; j < schedule.length && j < i + slotsNeeded; j++) {
      if (schedule[j].available) {
        consecutiveSlots++
      } else {
        break
      }
    }

    if (consecutiveSlots >= slotsNeeded) {
      availableSlots.push({
        start: slot.start,
        end: setMinutes(slot.start, slot.start.getMinutes() + duration),
        available: true,
      })
    }
  }

  return availableSlots
}

// Función para sugerir horarios alternativos
export function suggestAlternativeSlots(
  studentId: string,
  preferredDate: Date,
  duration: number,
  daysToCheck = 7,
): { date: Date; slots: TimeSlot[] }[] {
  const alternatives: { date: Date; slots: TimeSlot[] }[] = []

  for (let i = 1; i <= daysToCheck; i++) {
    const checkDate = addDays(preferredDate, i)
    const availableSlots = getAvailableSlots(studentId, checkDate, duration)

    if (availableSlots.length > 0) {
      alternatives.push({
        date: checkDate,
        slots: availableSlots.slice(0, 3), // Mostrar solo los primeros 3 slots
      })
    }
  }

  return alternatives
}

// Función para validar disponibilidad de cita
export function validateAppointmentSlot(
  studentId: string,
  date: Date,
  duration: number,
): { valid: boolean; message?: string; alternatives?: { date: Date; slots: TimeSlot[] }[] } {
  const availableSlots = getAvailableSlots(studentId, date, duration)
  const requestedSlot = availableSlots.find((slot) => slot.start.getTime() === date.getTime())

  if (requestedSlot) {
    return { valid: true }
  }

  const alternatives = suggestAlternativeSlots(studentId, date, duration)

  return {
    valid: false,
    message: "El horario seleccionado no está disponible",
    alternatives,
  }
}

// Función para obtener todas las especialidades disponibles
export function getAvailableSpecialties(): string[] {
  return ["Cirugía Oral y Maxilofacial", "Endodoncia", "Ortodoncia", "Odontopediatría"]
}

// Función para obtener información de especialidad
export function getSpecialtyInfo(specialty: string) {
  const specialtyData = {
    "Cirugía Oral y Maxilofacial": {
      icon: "🔪",
      description: "Extracciones, cirugías orales y procedimientos maxilofaciales",
      color: "red",
    },
    Endodoncia: {
      icon: "🦷",
      description: "Tratamientos de conducto y terapia pulpar",
      color: "blue",
    },
    Ortodoncia: {
      icon: "😁",
      description: "Corrección de la posición dental y maloclusiones",
      color: "green",
    },
    Odontopediatría: {
      icon: "👶",
      description: "Atención dental especializada para niños y adolescentes",
      color: "purple",
    },
  }

  return (
    specialtyData[specialty as keyof typeof specialtyData] || {
      icon: "🦷",
      description: "Especialidad dental",
      color: "gray",
    }
  )
}
