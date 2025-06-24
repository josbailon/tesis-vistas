// Tipos de datos
export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "patient" | "student" | "professor" | "admin" | "secretary"
  status: "active" | "inactive" | "pending"
  createdAt: string
  specialty?: string
  professor?: string
  profileImage?: string
  department?: string
  permissions?: string[]
}

export interface Patient extends User {
  role: "patient"
  dob: string
  phone: string
  address: string
  allergies: string | null
  medicalHistory: string | null
  assignedStudent?: string
  assignedDate?: string
}

export interface Student extends User {
  role: "student"
  studentId: string
  specialty: string
  professorId: string
  progress: number
  semester: number
  assignedPatients: string[]
  schedule: {
    day: string
    startTime: string
    endTime: string
    available: boolean
  }[]
}

export interface Professor extends User {
  role: "professor"
  specialty: string
  officeHours: string
  department: string
  students: string[]
  gradingCriteria: {
    technique: number
    knowledge: number
    professionalism: number
    documentation: number
    patientCare: number
  }
}

export interface Secretary extends User {
  role: "secretary"
  department: string
  managedSpecialties: string[]
}

export interface Appointment {
  id: string
  patientId: string
  studentId: string | null
  professorId: string | null
  date: string
  time: string
  duration: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  type: string
  notes: string | null
  specialty: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  studentId: string
  professorId: string | null
  date: string
  type: string
  title: string
  description: string
  treatment: string | null
  specialty: string
}

export interface Document {
  id: string
  name: string
  type: string
  uploadedBy: string
  uploadedAt: string
  patientId: string | null
  studentId: string | null
  recordId: string | null
  url: string
}

export interface ApprovalRequest {
  id: string
  title: string
  studentId: string
  patientId: string
  professorId: string
  description: string
  submittedDate: string
  status: "pending" | "approved" | "rejected"
  specialty: string
  response: string | null
  responseDate: string | null
  attachments: Document[]
}

export interface AcademicTask {
  id: string
  title: string
  description: string
  dueDate: string
  status: "pending" | "in-progress" | "completed"
  progress: number
  specialty: string
  professorId: string
  studentId: string
  feedback: string | null
}

export interface Evaluation {
  id: string
  studentId: string
  professorId: string
  title: string
  date: string
  score: number | null
  maxScore: number
  status: "pending" | "completed"
  feedback: string | null
  criteria: {
    name: string
    weight: number
    score: number | null
  }[]
}

export interface ClinicalCase {
  id: string
  patientId: string
  studentId: string
  professorId: string
  title: string
  description: string
  specialty: string
  startDate: string
  endDate?: string
  status: "active" | "completed" | "cancelled" | "on-hold"
  progress: number
  sessions: ClinicalSession[]
  treatmentPlan: string
  objectives: string[]
  complications?: string
  outcome?: string
  learningPoints: string[]
  attachments: Document[]
}

export interface ClinicalSession {
  id: string
  caseId: string
  date: string
  duration: number
  procedures: string[]
  notes: string
  complications?: string
  nextSteps: string
  attachments: Document[]
  supervisorNotes?: string
  grade?: number
}

export interface Odontogram {
  id: string
  patientId: string
  studentId: string
  type: "adult" | "pediatric" | "mixed"
  date: string
  teeth: {
    [toothNumber: string]: {
      condition: "healthy" | "caries" | "filled" | "crown" | "missing" | "root_canal" | "implant"
      surfaces?: string[]
      notes?: string
      treatmentNeeded?: string
      priority?: "low" | "medium" | "high" | "urgent"
    }
  }
  generalNotes: string
  treatmentPlan: string[]
  attachments: Document[]
}

export interface Assignment {
  id: string
  title: string
  description: string
  professorId: string
  studentIds: string[]
  dueDate: string
  createdDate: string
  status: "draft" | "published" | "closed"
  maxScore: number
  attachments: Document[]
  instructions: string
  specialty: string
  submissions: AssignmentSubmission[]
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  submittedDate: string
  files: Document[]
  notes: string
  status: "submitted" | "late" | "graded" | "extension_requested"
  grade?: number
  feedback?: string
  extensionRequest?: {
    reason: string
    requestedDate: string
    newDueDate: string
    status: "pending" | "approved" | "rejected"
    professorResponse?: string
  }
}

// Datos de usuarios
export const patients: Patient[] = [
  {
    id: "p1",
    name: "Ana García",
    email: "paciente1@ejemplo.com",
    password: "password",
    role: "patient",
    status: "active",
    createdAt: "2025-01-15",
    dob: "1990-05-15",
    phone: "555-123-4567",
    address: "Calle Principal 123, Ciudad",
    allergies: "Penicilina",
    medicalHistory: "Hipertensión controlada",
    assignedStudent: "s1",
    assignedDate: "2025-01-15",
  },
  {
    id: "p2",
    name: "Carlos López",
    email: "paciente2@ejemplo.com",
    password: "password",
    role: "patient",
    status: "active",
    createdAt: "2025-01-20",
    dob: "1985-08-20",
    phone: "555-987-6543",
    address: "Avenida Central 456, Ciudad",
    allergies: null,
    medicalHistory: "Diabetes tipo 2",
    assignedStudent: "s2",
    assignedDate: "2025-01-20",
  },
  {
    id: "p3",
    name: "María Fernández",
    email: "paciente3@ejemplo.com",
    password: "password",
    role: "patient",
    status: "active",
    createdAt: "2025-02-05",
    dob: "1995-12-10",
    phone: "555-456-7890",
    address: "Plaza Mayor 789, Ciudad",
    allergies: "Látex",
    medicalHistory: null,
    assignedStudent: "s3",
    assignedDate: "2025-02-05",
  },
  {
    id: "p4",
    name: "Juan Pérez",
    email: "paciente4@ejemplo.com",
    password: "password",
    role: "patient",
    status: "active",
    createdAt: "2025-02-10",
    dob: "1980-03-05",
    phone: "555-234-5678",
    address: "Calle Secundaria 321, Ciudad",
    allergies: null,
    medicalHistory: "Asma",
    assignedStudent: null, // Sin asignar
    assignedDate: null,
  },
  {
    id: "p5",
    name: "Sofía Ramírez",
    email: "paciente5@ejemplo.com",
    password: "password",
    role: "patient",
    status: "active",
    createdAt: "2025-01-10",
    dob: "2010-07-25",
    phone: "555-876-5432",
    address: "Avenida Principal 654, Ciudad",
    allergies: null,
    medicalHistory: null,
    assignedStudent: "s5",
    assignedDate: "2025-01-10",
  },
]

export const students: Student[] = [
  {
    id: "s1",
    name: "Pedro Gómez",
    email: "estudiante1@uleam.edu.ec",
    password: "password",
    role: "student",
    status: "active",
    createdAt: "2024-09-01",
    studentId: "E12345",
    specialty: "Endodoncia",
    professorId: "pr1",
    progress: 75,
    semester: 8,
    assignedPatients: ["p1"],
    schedule: [
      { day: "Lunes", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Martes", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Miércoles", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Jueves", startTime: "14:00", endTime: "18:00", available: false },
      { day: "Viernes", startTime: "08:00", endTime: "12:00", available: true },
    ],
  },
  {
    id: "s2",
    name: "Laura Torres",
    email: "estudiante2@uleam.edu.ec",
    password: "password",
    role: "student",
    status: "active",
    createdAt: "2024-09-01",
    studentId: "E12346",
    specialty: "Ortodoncia",
    professorId: "pr2",
    progress: 60,
    semester: 7,
    assignedPatients: ["p2"],
    schedule: [
      { day: "Lunes", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Martes", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Miércoles", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Jueves", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Viernes", startTime: "14:00", endTime: "18:00", available: false },
    ],
  },
  {
    id: "s3",
    name: "Miguel Sánchez",
    email: "estudiante3@uleam.edu.ec",
    password: "password",
    role: "student",
    status: "active",
    createdAt: "2024-09-01",
    studentId: "E12347",
    specialty: "Periodoncia",
    professorId: "pr3",
    progress: 90,
    semester: 9,
    assignedPatients: ["p3"],
    schedule: [
      { day: "Lunes", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Martes", startTime: "08:00", endTime: "12:00", available: false },
      { day: "Miércoles", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Jueves", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Viernes", startTime: "08:00", endTime: "16:00", available: true },
    ],
  },
  {
    id: "s4",
    name: "Carmen Díaz",
    email: "estudiante4@uleam.edu.ec",
    password: "password",
    role: "student",
    status: "active",
    createdAt: "2024-09-01",
    studentId: "E12348",
    specialty: "Cirugía Oral",
    professorId: "pr4",
    progress: 40,
    semester: 6,
    assignedPatients: [],
    schedule: [
      { day: "Lunes", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Martes", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Miércoles", startTime: "08:00", endTime: "12:00", available: false },
      { day: "Jueves", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Viernes", startTime: "14:00", endTime: "18:00", available: true },
    ],
  },
  {
    id: "s5",
    name: "Javier Ruiz",
    email: "estudiante5@uleam.edu.ec",
    password: "password",
    role: "student",
    status: "active",
    createdAt: "2024-09-01",
    studentId: "E12349",
    specialty: "Odontopediatría",
    professorId: "pr5",
    progress: 85,
    semester: 8,
    assignedPatients: ["p5"],
    schedule: [
      { day: "Lunes", startTime: "08:00", endTime: "12:00", available: false },
      { day: "Martes", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Miércoles", startTime: "08:00", endTime: "12:00", available: true },
      { day: "Jueves", startTime: "14:00", endTime: "18:00", available: true },
      { day: "Viernes", startTime: "08:00", endTime: "12:00", available: true },
    ],
  },
]

export const professors: Professor[] = [
  {
    id: "pr1",
    name: "Dr. Martínez",
    email: "profesor1@uleam.edu.ec",
    password: "password",
    role: "professor",
    status: "active",
    createdAt: "2023-01-15",
    specialty: "Endodoncia",
    officeHours: "Lunes y Miércoles 14:00-16:00",
    department: "Departamento de Endodoncia",
    students: ["s1"],
    gradingCriteria: {
      technique: 30,
      knowledge: 25,
      professionalism: 20,
      documentation: 15,
      patientCare: 10,
    },
  },
  {
    id: "pr2",
    name: "Dra. Rodríguez",
    email: "profesor2@uleam.edu.ec",
    password: "password",
    role: "professor",
    status: "active",
    createdAt: "2023-02-10",
    specialty: "Ortodoncia",
    officeHours: "Martes y Jueves 10:00-12:00",
    department: "Departamento de Ortodoncia",
    students: ["s2"],
    gradingCriteria: {
      technique: 35,
      knowledge: 20,
      professionalism: 15,
      documentation: 20,
      patientCare: 10,
    },
  },
  {
    id: "pr3",
    name: "Dr. Sánchez",
    email: "profesor3@uleam.edu.ec",
    password: "password",
    role: "professor",
    status: "active",
    createdAt: "2023-01-20",
    specialty: "Periodoncia",
    officeHours: "Miércoles y Viernes 15:00-17:00",
    department: "Departamento de Periodoncia",
    students: ["s3"],
    gradingCriteria: {
      technique: 25,
      knowledge: 30,
      professionalism: 20,
      documentation: 15,
      patientCare: 10,
    },
  },
  {
    id: "pr4",
    name: "Dra. López",
    email: "profesor4@uleam.edu.ec",
    password: "password",
    role: "professor",
    status: "active",
    createdAt: "2023-03-05",
    specialty: "Cirugía Oral",
    officeHours: "Lunes y Jueves 09:00-11:00",
    department: "Departamento de Cirugía Oral",
    students: ["s4"],
    gradingCriteria: {
      technique: 40,
      knowledge: 20,
      professionalism: 15,
      documentation: 15,
      patientCare: 10,
    },
  },
  {
    id: "pr5",
    name: "Dr. Fernández",
    email: "profesor5@uleam.edu.ec",
    password: "password",
    role: "professor",
    status: "active",
    createdAt: "2023-02-15",
    specialty: "Odontopediatría",
    officeHours: "Martes y Viernes 13:00-15:00",
    department: "Departamento de Odontopediatría",
    students: ["s5"],
    gradingCriteria: {
      technique: 25,
      knowledge: 25,
      professionalism: 25,
      documentation: 15,
      patientCare: 10,
    },
  },
]

export const admins: User[] = [
  {
    id: "a1",
    name: "Admin Principal",
    email: "admin@ejemplo.com",
    password: "password",
    role: "admin",
    status: "active",
    createdAt: "2023-01-01",
    department: "Administración",
    permissions: ["users", "specialties", "settings", "statistics"],
  },
]

export const secretaries: Secretary[] = [
  {
    id: "sec1",
    name: "Carmen Vásquez",
    email: "secretaria1@uleam.edu.ec",
    password: "password",
    role: "secretary",
    status: "active",
    createdAt: "2023-01-10",
    department: "Clínica Dental",
    managedSpecialties: ["Endodoncia", "Ortodoncia", "Periodoncia"],
    permissions: [
      "assign_patients",
      "view_schedules",
      "manage_appointments",
      "view_student_schedules",
      "coordinate_assignments",
    ],
  },
  {
    id: "sec2",
    name: "Rosa Mendoza",
    email: "secretaria2@uleam.edu.ec",
    password: "password",
    role: "secretary",
    status: "active",
    createdAt: "2023-02-15",
    department: "Clínica Dental",
    managedSpecialties: ["Cirugía Oral", "Odontopediatría"],
    permissions: [
      "assign_patients",
      "view_schedules",
      "manage_appointments",
      "view_student_schedules",
      "coordinate_assignments",
    ],
  },
]

// Unir todos los usuarios
export const users: User[] = [...patients, ...students, ...professors, ...admins, ...secretaries]

// Datos de citas
export const appointments: Appointment[] = [
  {
    id: "ap1",
    patientId: "p1",
    studentId: "s1",
    professorId: "pr1",
    date: "2025-05-22",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    type: "Revisión",
    notes: "Ajuste de brackets",
    specialty: "Endodoncia",
  },
  {
    id: "ap2",
    patientId: "p2",
    studentId: "s2",
    professorId: "pr2",
    date: "2025-05-23",
    time: "15:30",
    duration: 45,
    status: "pending",
    type: "Primera Consulta",
    notes: "Evaluación inicial",
    specialty: "Ortodoncia",
  },
  {
    id: "ap3",
    patientId: "p3",
    studentId: "s3",
    professorId: "pr3",
    date: "2025-05-24",
    time: "09:00",
    duration: 90,
    status: "confirmed",
    type: "Tratamiento",
    notes: "Limpieza profunda",
    specialty: "Periodoncia",
  },
  {
    id: "ap4",
    patientId: "p4",
    studentId: "s4",
    professorId: "pr4",
    date: "2025-05-25",
    time: "11:30",
    duration: 120,
    status: "pending",
    type: "Cirugía",
    notes: "Extracción de terceros molares",
    specialty: "Cirugía Oral",
  },
  {
    id: "ap5",
    patientId: "p5",
    studentId: "s5",
    professorId: "pr5",
    date: "2025-05-26",
    time: "14:00",
    duration: 60,
    status: "confirmed",
    type: "Revisión",
    notes: "Control de caries",
    specialty: "Odontopediatría",
  },
  {
    id: "ap6",
    patientId: "p1",
    studentId: "s1",
    professorId: "pr1",
    date: "2025-05-29",
    time: "16:00",
    duration: 45,
    status: "pending",
    type: "Seguimiento",
    notes: "Control post-tratamiento",
    specialty: "Endodoncia",
  },
  {
    id: "ap7",
    patientId: "p2",
    studentId: "s2",
    professorId: "pr2",
    date: "2025-06-02",
    time: "10:30",
    duration: 60,
    status: "confirmed",
    type: "Ajuste",
    notes: "Ajuste de aparato ortodóntico",
    specialty: "Ortodoncia",
  },
  {
    id: "ap8",
    patientId: "p3",
    studentId: "s3",
    professorId: "pr3",
    date: "2025-06-05",
    time: "09:30",
    duration: 60,
    status: "confirmed",
    type: "Seguimiento",
    notes: "Control de tratamiento periodontal",
    specialty: "Periodoncia",
  },
]

// Datos de expedientes médicos
export const medicalRecords: MedicalRecord[] = [
  {
    id: "mr1",
    patientId: "p1",
    studentId: "s1",
    professorId: "pr1",
    date: "2025-05-10",
    type: "Diagnóstico",
    title: "Evaluación Inicial",
    description: "Paciente presenta caries en molares superiores. Se recomienda tratamiento de conducto.",
    treatment: "Tratamiento de conducto en molar superior derecho",
    specialty: "Endodoncia",
  },
  {
    id: "mr2",
    patientId: "p1",
    studentId: "s1",
    professorId: "pr1",
    date: "2025-05-15",
    type: "Tratamiento",
    title: "Tratamiento de Conducto",
    description: "Se realizó tratamiento de conducto en molar superior derecho. Paciente tolera bien el procedimiento.",
    treatment: "Tratamiento de conducto en molar superior derecho",
    specialty: "Endodoncia",
  },
  {
    id: "mr3",
    patientId: "p1",
    studentId: "s1",
    professorId: "pr1",
    date: "2025-05-22",
    type: "Seguimiento",
    title: "Control Post-Tratamiento",
    description: "Evolución favorable. No hay signos de infección o complicaciones.",
    treatment: "Tratamiento de conducto en molar superior derecho",
    specialty: "Endodoncia",
  },
  {
    id: "mr4",
    patientId: "p2",
    studentId: "s2",
    professorId: "pr2",
    date: "2025-05-05",
    type: "Diagnóstico",
    title: "Evaluación Ortodóntica",
    description: "Paciente presenta maloclusión clase II. Se recomienda tratamiento ortodóntico.",
    treatment: "Tratamiento ortodóntico con brackets",
    specialty: "Ortodoncia",
  },
  {
    id: "mr5",
    patientId: "p3",
    studentId: "s3",
    professorId: "pr3",
    date: "2025-05-01",
    type: "Diagnóstico",
    title: "Evaluación Periodontal",
    description: "Paciente presenta gingivitis generalizada. Se recomienda limpieza profunda.",
    treatment: "Limpieza profunda y terapia periodontal",
    specialty: "Periodoncia",
  },
  {
    id: "mr6",
    patientId: "p4",
    studentId: "s4",
    professorId: "pr4",
    date: "2025-05-12",
    type: "Diagnóstico",
    title: "Evaluación Quirúrgica",
    description: "Paciente presenta terceros molares impactados. Se recomienda extracción.",
    treatment: "Extracción de terceros molares",
    specialty: "Cirugía Oral",
  },
  {
    id: "mr7",
    patientId: "p5",
    studentId: "s5",
    professorId: "pr5",
    date: "2025-05-08",
    type: "Diagnóstico",
    title: "Evaluación Pediátrica",
    description: "Paciente presenta caries en molares deciduos. Se recomienda restauración.",
    treatment: "Restauración de molares deciduos",
    specialty: "Odontopediatría",
  },
]

// Datos de documentos
export const documents: Document[] = [
  {
    id: "d1",
    name: "Radiografía Panorámica",
    type: "Radiografía",
    uploadedBy: "s1",
    uploadedAt: "2025-05-10",
    patientId: "p1",
    studentId: "s1",
    recordId: "mr1",
    url: "/documentos/radiografia_panoramica_p1.jpg",
  },
  {
    id: "d2",
    name: "Consentimiento Informado",
    type: "Documento Legal",
    uploadedBy: "s1",
    uploadedAt: "2025-05-10",
    patientId: "p1",
    studentId: "s1",
    recordId: "mr1",
    url: "/documentos/consentimiento_p1.pdf",
  },
  {
    id: "d3",
    name: "Radiografía Periapical",
    type: "Radiografía",
    uploadedBy: "s1",
    uploadedAt: "2025-05-15",
    patientId: "p1",
    studentId: "s1",
    recordId: "mr2",
    url: "/documentos/radiografia_periapical_p1.jpg",
  },
  {
    id: "d4",
    name: "Informe de Tratamiento",
    type: "Informe Clínico",
    uploadedBy: "s1",
    uploadedAt: "2025-05-22",
    patientId: "p1",
    studentId: "s1",
    recordId: "mr3",
    url: "/documentos/informe_tratamiento_p1.pdf",
  },
  {
    id: "d5",
    name: "Radiografía Cefalométrica",
    type: "Radiografía",
    uploadedBy: "s2",
    uploadedAt: "2025-05-05",
    patientId: "p2",
    studentId: "s2",
    recordId: "mr4",
    url: "/documentos/radiografia_cefalometrica_p2.jpg",
  },
  {
    id: "d6",
    name: "Periodontograma",
    type: "Informe Clínico",
    uploadedBy: "s3",
    uploadedAt: "2025-05-01",
    patientId: "p3",
    studentId: "s3",
    recordId: "mr5",
    url: "/documentos/periodontograma_p3.pdf",
  },
  {
    id: "d7",
    name: "Tomografía Computarizada",
    type: "Radiografía",
    uploadedBy: "s4",
    uploadedAt: "2025-05-12",
    patientId: "p4",
    studentId: "s4",
    recordId: "mr6",
    url: "/documentos/tomografia_p4.jpg",
  },
  {
    id: "d8",
    name: "Odontograma Pediátrico",
    type: "Informe Clínico",
    uploadedBy: "s5",
    uploadedAt: "2025-05-08",
    patientId: "p5",
    studentId: "s5",
    recordId: "mr7",
    url: "/documentos/odontograma_p5.pdf",
  },
]

// Datos de solicitudes de aprobación
export const approvalRequests: ApprovalRequest[] = [
  {
    id: "ar1",
    title: "Aprobación de Plan de Tratamiento",
    studentId: "s1",
    patientId: "p1",
    professorId: "pr1",
    description: "Solicitud de aprobación para iniciar tratamiento de conducto en molar superior derecho.",
    submittedDate: "2025-05-18",
    status: "pending",
    specialty: "Endodoncia",
    response: null,
    responseDate: null,
    attachments: [
      {
        id: "d1",
        name: "Radiografía Panorámica",
        type: "Radiografía",
        uploadedBy: "s1",
        uploadedAt: "2025-05-10",
        patientId: "p1",
        studentId: "s1",
        recordId: "mr1",
        url: "/documentos/radiografia_panoramica_p1.jpg",
      },
      {
        id: "d9",
        name: "Plan de Tratamiento",
        type: "Documento",
        uploadedBy: "s1",
        uploadedAt: "2025-05-18",
        patientId: "p1",
        studentId: "s1",
        recordId: null,
        url: "/documentos/plan_tratamiento_p1.pdf",
      },
    ],
  },
  {
    id: "ar2",
    title: "Validación de Diagnóstico",
    studentId: "s2",
    patientId: "p2",
    professorId: "pr2",
    description:
      "Solicitud de validación de diagnóstico de maloclusión clase II y plan de tratamiento ortodóntico propuesto.",
    submittedDate: "2025-05-15",
    status: "approved",
    specialty: "Ortodoncia",
    response:
      "Diagnóstico correcto. Proceda con el plan de tratamiento propuesto. Recuerde documentar los avances mensualmente.",
    responseDate: "2025-05-16",
    attachments: [
      {
        id: "d5",
        name: "Radiografía Cefalométrica",
        type: "Radiografía",
        uploadedBy: "s2",
        uploadedAt: "2025-05-05",
        patientId: "p2",
        studentId: "s2",
        recordId: "mr4",
        url: "/documentos/radiografia_cefalometrica_p2.jpg",
      },
      {
        id: "d10",
        name: "Análisis Cefalométrico",
        type: "Documento",
        uploadedBy: "s2",
        uploadedAt: "2025-05-15",
        patientId: "p2",
        studentId: "s2",
        recordId: null,
        url: "/documentos/analisis_cefalometrico_p2.pdf",
      },
    ],
  },
  {
    id: "ar3",
    title: "Aprobación de Procedimiento Quirúrgico",
    studentId: "s4",
    patientId: "p4",
    professorId: "pr4",
    description: "Solicitud de aprobación para realizar extracción de terceros molares inferiores impactados.",
    submittedDate: "2025-05-12",
    status: "rejected",
    specialty: "Cirugía Oral",
    response:
      "Se requiere una tomografía computarizada previa al procedimiento para evaluar la proximidad al nervio alveolar inferior. Por favor, solicite el estudio y vuelva a presentar la solicitud.",
    responseDate: "2025-05-13",
    attachments: [
      {
        id: "d7",
        name: "Tomografía Computarizada",
        type: "Radiografía",
        uploadedBy: "s4",
        uploadedAt: "2025-05-12",
        patientId: "p4",
        studentId: "s4",
        recordId: "mr6",
        url: "/documentos/tomografia_p4.jpg",
      },
      {
        id: "d11",
        name: "Plan Quirúrgico",
        type: "Documento",
        uploadedBy: "s4",
        uploadedAt: "2025-05-12",
        patientId: "p4",
        studentId: "s4",
        recordId: null,
        url: "/documentos/plan_quirurgico_p4.pdf",
      },
    ],
  },
  {
    id: "ar4",
    title: "Aprobación de Finalización de Tratamiento",
    studentId: "s1",
    patientId: "p1",
    professorId: "pr1",
    description:
      "Solicitud de aprobación para dar por finalizado el tratamiento de conducto en molar superior derecho.",
    submittedDate: "2025-05-22",
    status: "pending",
    specialty: "Endodoncia",
    response: null,
    responseDate: null,
    attachments: [
      {
        id: "d3",
        name: "Radiografía Periapical",
        type: "Radiografía",
        uploadedBy: "s1",
        uploadedAt: "2025-05-15",
        patientId: "p1",
        studentId: "s1",
        recordId: "mr2",
        url: "/documentos/radiografia_periapical_p1.jpg",
      },
      {
        id: "d4",
        name: "Informe de Tratamiento",
        type: "Informe Clínico",
        uploadedBy: "s1",
        uploadedAt: "2025-05-22",
        patientId: "p1",
        studentId: "s1",
        recordId: "mr3",
        url: "/documentos/informe_tratamiento_p1.pdf",
      },
    ],
  },
  {
    id: "ar5",
    title: "Validación de Diagnóstico Periodontal",
    studentId: "s3",
    patientId: "p3",
    professorId: "pr3",
    description:
      "Solicitud de validación de diagnóstico de gingivitis generalizada y plan de tratamiento periodontal propuesto.",
    submittedDate: "2025-05-01",
    status: "approved",
    specialty: "Periodoncia",
    response:
      "Diagnóstico correcto. Proceda con el plan de tratamiento propuesto. Recuerde realizar controles periódicos.",
    responseDate: "2025-05-02",
    attachments: [
      {
        id: "d6",
        name: "Periodontograma",
        type: "Informe Clínico",
        uploadedBy: "s3",
        uploadedAt: "2025-05-01",
        patientId: "p3",
        studentId: "s3",
        recordId: "mr5",
        url: "/documentos/periodontograma_p3.pdf",
      },
      {
        id: "d12",
        name: "Fotografías Intraorales",
        type: "Imagen",
        uploadedBy: "s3",
        uploadedAt: "2025-05-01",
        patientId: "p3",
        studentId: "s3",
        recordId: null,
        url: "/documentos/fotografias_p3.jpg",
      },
    ],
  },
]

// Datos de tareas académicas
export const academicTasks: AcademicTask[] = [
  {
    id: "at1",
    title: "Caso Clínico: Tratamiento de Conducto",
    description:
      "Documentar el proceso completo de un tratamiento de conducto, incluyendo diagnóstico, plan de tratamiento y seguimiento.",
    dueDate: "2025-05-30",
    status: "in-progress",
    progress: 60,
    specialty: "Endodoncia",
    professorId: "pr1",
    studentId: "s1",
    feedback: null,
  },
  {
    id: "at2",
    title: "Revisión Bibliográfica: Nuevas Técnicas en Ortodoncia",
    description: "Investigar y resumir los avances recientes en técnicas de ortodoncia de los últimos 5 años.",
    dueDate: "2025-06-15",
    status: "pending",
    progress: 20,
    specialty: "Ortodoncia",
    professorId: "pr2",
    studentId: "s2",
    feedback: null,
  },
  {
    id: "at3",
    title: "Presentación: Tratamiento de Periodontitis",
    description: "Preparar una presentación sobre los protocolos actuales para el tratamiento de periodontitis severa.",
    dueDate: "2025-05-10",
    status: "completed",
    progress: 100,
    specialty: "Periodoncia",
    professorId: "pr3",
    studentId: "s3",
    feedback:
      "Excelente presentación. Muy completa y bien documentada. Incluye referencias actualizadas y casos prácticos relevantes.",
  },
  {
    id: "at4",
    title: "Informe: Técnicas de Extracción Atraumática",
    description:
      "Documentar las técnicas de extracción atraumática utilizadas en la práctica clínica, con énfasis en la preservación del hueso alveolar.",
    dueDate: "2025-06-05",
    status: "in-progress",
    progress: 45,
    specialty: "Cirugía Oral",
    professorId: "pr4",
    studentId: "s4",
    feedback: null,
  },
  {
    id: "at5",
    title: "Caso Clínico: Manejo de Paciente Pediátrico",
    description:
      "Documentar el manejo de un paciente pediátrico con ansiedad dental, incluyendo técnicas de manejo de conducta y tratamiento realizado.",
    dueDate: "2025-05-25",
    status: "in-progress",
    progress: 70,
    specialty: "Odontopediatría",
    professorId: "pr5",
    studentId: "s5",
    feedback: null,
  },
  {
    id: "at6",
    title: "Revisión Bibliográfica: Materiales de Obturación",
    description:
      "Investigar y resumir los avances recientes en materiales de obturación para tratamientos de conducto.",
    dueDate: "2025-06-10",
    status: "pending",
    progress: 10,
    specialty: "Endodoncia",
    professorId: "pr1",
    studentId: "s6",
    feedback: null,
  },
]

// Datos de evaluaciones
export const evaluations: Evaluation[] = [
  {
    id: "ev1",
    studentId: "s1",
    professorId: "pr1",
    title: "Evaluación de Competencias Clínicas",
    date: "2025-05-15",
    score: 85,
    maxScore: 100,
    status: "completed",
    feedback: "Buen manejo de instrumentos. Necesita mejorar en la técnica de obturación.",
    criteria: [
      { name: "Diagnóstico", weight: 20, score: 18 },
      { name: "Plan de Tratamiento", weight: 20, score: 17 },
      { name: "Técnica Clínica", weight: 40, score: 32 },
      { name: "Seguimiento", weight: 20, score: 18 },
    ],
  },
  {
    id: "ev2",
    studentId: "s2",
    professorId: "pr2",
    title: "Evaluación de Diagnóstico",
    date: "2025-05-10",
    score: 90,
    maxScore: 100,
    status: "completed",
    feedback: "Excelente capacidad diagnóstica. Muy buen manejo de radiografías.",
    criteria: [
      { name: "Análisis de Radiografías", weight: 30, score: 28 },
      { name: "Diagnóstico Diferencial", weight: 30, score: 27 },
      { name: "Plan de Tratamiento", weight: 20, score: 18 },
      { name: "Comunicación con el Paciente", weight: 20, score: 17 },
    ],
  },
  {
    id: "ev3",
    studentId: "s3",
    professorId: "pr3",
    title: "Evaluación de Procedimientos Clínicos",
    date: "2025-05-20",
    score: null,
    maxScore: 100,
    status: "pending",
    feedback: null,
    criteria: [
      { name: "Técnica de Sondaje", weight: 25, score: null },
      { name: "Raspado y Alisado Radicular", weight: 25, score: null },
      { name: "Manejo de Tejidos Blandos", weight: 25, score: null },
      { name: "Instrucciones de Higiene", weight: 25, score: null },
    ],
  },
  {
    id: "ev4",
    studentId: "s4",
    professorId: "pr4",
    title: "Evaluación de Técnicas Quirúrgicas",
    date: "2025-05-18",
    score: 78,
    maxScore: 100,
    status: "completed",
    feedback: "Buen manejo de instrumental quirúrgico. Necesita mejorar en la técnica de sutura.",
    criteria: [
      { name: "Planificación Quirúrgica", weight: 20, score: 17 },
      { name: "Técnica de Incisión", weight: 20, score: 16 },
      { name: "Manejo de Tejidos", weight: 20, score: 15 },
      { name: "Técnica de Sutura", weight: 20, score: 14 },
      { name: "Instrucciones Postoperatorias", weight: 20, score: 16 },
    ],
  },
  {
    id: "ev5",
    studentId: "s5",
    professorId: "pr5",
    title: "Evaluación de Manejo de Paciente Pediátrico",
    date: "2025-05-12",
    score: 92,
    maxScore: 100,
    status: "completed",
    feedback: "Excelente manejo de conducta. Muy buena comunicación con el paciente y los padres.",
    criteria: [
      { name: "Comunicación con el Paciente", weight: 25, score: 24 },
      { name: "Manejo de Conducta", weight: 25, score: 23 },
      { name: "Técnica Clínica", weight: 25, score: 22 },
      { name: "Comunicación con los Padres", weight: 25, score: 23 },
    ],
  },
]

// Datos de casos clínicos
export const clinicalCases: ClinicalCase[] = [
  {
    id: "cc1",
    patientId: "p1",
    studentId: "s1",
    professorId: "pr1",
    title: "Tratamiento de Conducto en Molar Superior",
    description: "Caso clínico de tratamiento de conducto en molar superior derecho",
    specialty: "Endodoncia",
    startDate: "2025-05-10",
    status: "in-progress",
    progress: 60,
    sessions: [
      {
        id: "ses1",
        caseId: "cc1",
        date: "2025-05-15",
        duration: 60,
        procedures: ["Diagnóstico", "Plan de Tratamiento"],
        notes: "Paciente presenta dolor agudo a la percusión y pruebas térmicas positivas.",
        complications: null,
        nextSteps: "Realizar tratamiento de conducto",
        attachments: [],
        supervisorNotes: null,
        grade: null,
      },
    ],
    treatmentPlan: "Tratamiento de conducto en molar superior derecho",
    objectives: ["Diagnóstico preciso", "Plan de tratamiento efectivo"],
    complications: null,
    outcome: null,
    learningPoints: ["Importancia del diagnóstico", "Técnicas de obturación"],
    attachments: [],
  },
  {
    id: "cc2",
    patientId: "p2",
    studentId: "s2",
    professorId: "pr2",
    title: "Tratamiento Ortodóntico con Brackets",
    description: "Caso clínico de tratamiento ortodóntico con brackets convencionales",
    specialty: "Ortodoncia",
    startDate: "2025-05-05",
    status: "in-progress",
    progress: 40,
    sessions: [
      {
        id: "ses2",
        caseId: "cc2",
        date: "2025-05-10",
        duration: 45,
        procedures: ["Análisis de Radiografías", "Diagnóstico Diferencial"],
        notes: "Paciente presenta maloclusión clase II.",
        complications: null,
        nextSteps: "Iniciar tratamiento con brackets",
        attachments: [],
        supervisorNotes: null,
        grade: null,
      },
    ],
    treatmentPlan: "Tratamiento ortodóntico con brackets convencionales",
    objectives: ["Análisis radiográfico", "Plan de tratamiento"],
    complications: null,
    outcome: null,
    learningPoints: ["Importancia de la radiografía", "Técnicas de brackets"],
    attachments: [],
  },
  {
    id: "cc3",
    patientId: "p3",
    studentId: "s3",
    professorId: "pr3",
    title: "Tratamiento Periodontal",
    description: "Caso clínico de tratamiento periodontal",
    specialty: "Periodoncia",
    startDate: "2025-05-01",
    status: "in-progress",
    progress: 70,
    sessions: [
      {
        id: "ses3",
        caseId: "cc3",
        date: "2025-05-20",
        duration: 60,
        procedures: ["Técnica de Sondaje", "Raspado y Alisado Radicular"],
        notes: "Paciente presenta gingivitis generalizada.",
        complications: null,
        nextSteps: "Realizar limpieza profunda",
        attachments: [],
        supervisorNotes: null,
        grade: null,
      },
    ],
    treatmentPlan: "Limpieza profunda y terapia periodontal",
    objectives: ["Técnica de sondaje", "Raspado y alisado radicular"],
    complications: null,
    outcome: null,
    learningPoints: ["Importancia del sondaje", "Técnicas de limpieza"],
    attachments: [],
  },
  {
    id: "cc4",
    patientId: "p4",
    studentId: "s4",
    professorId: "pr4",
    title: "Extracción de Terceros Molares",
    description: "Caso clínico de extracción de terceros molares inferiores impactados",
    specialty: "Cirugía Oral",
    startDate: "2025-05-12",
    status: "in-progress",
    progress: 30,
    sessions: [
      {
        id: "ses4",
        caseId: "cc4",
        date: "2025-05-17",
        duration: 90,
        procedures: ["Planificación Quirúrgica", "Técnica de Incisión"],
        notes: "Paciente presenta terceros molares impactados.",
        complications: null,
        nextSteps: "Realizar extracción quirúrgica",
        attachments: [],
        supervisorNotes: null,
        grade: null,
      },
    ],
    treatmentPlan: "Extracción de terceros molares inferiores impactados",
    objectives: ["Planificación quirúrgica", "Técnica de incisión"],
    complications: null,
    outcome: null,
    learningPoints: ["Importancia de la planificación quirúrgica", "Técnicas de incisión"],
    attachments: [],
  },
  {
    id: "cc5",
    patientId: "p5",
    studentId: "s5",
    professorId: "pr5",
    title: "Restauración de Muelas Deciduos",
    description: "Caso clínico de restauración de molares deciduos",
    specialty: "Odontopediatría",
    startDate: "2025-05-08",
    status: "in-progress",
    progress: 80,
    sessions: [
      {
        id: "ses5",
        caseId: "cc5",
        date: "2025-05-26",
        duration: 60,
        procedures: ["Comunicación con el Paciente", "Manejo de Conducta"],
        notes: "Paciente presenta caries en molares deciduos.",
        complications: null,
        nextSteps: "Realizar restauración con ionómero de vidrio",
        attachments: [],
        supervisorNotes: null,
        grade: null,
      },
    ],
    treatmentPlan: "Restauración de molares deciduos con ionómero de vidrio",
    objectives: ["Comunicación con el paciente", "Manejo de conducta"],
    complications: null,
    outcome: null,
    learningPoints: ["Importancia de la comunicación", "Técnicas de restauración"],
    attachments: [],
  },
  {
    id: "cc6",
    patientId: "p1",
    studentId: "s6",
    professorId: "pr1",
    title: "Retratamiento de Conducto en Premolar Inferior",
    description: "Caso clínico de retratamiento de conducto en premolar inferior",
    specialty: "Endodoncia",
    startDate: "2025-04-15",
    status: "completed",
    progress: 100,
    sessions: [
      {
        id: "ses6",
        caseId: "cc6",
        date: "2025-05-01",
        duration: 60,
        procedures: ["Diagnóstico", "Plan de Tratamiento"],
        notes: "Paciente presentaba tratamiento de conducto previo con filtración.",
        complications: null,
        nextSteps: "Finalizar tratamiento",
        attachments: [],
        supervisorNotes: null,
        grade: null,
      },
    ],
    treatmentPlan: "Retratamiento de conducto en premolar inferior",
    objectives: ["Diagnóstico preciso", "Plan de tratamiento efectivo"],
    complications: null,
    outcome: "Tratamiento exitoso",
    learningPoints: ["Importancia del diagnóstico", "Técnicas de retratamiento"],
    attachments: [],
  },
]

// Datos de especialidades
export const specialties = [
  {
    id: "cirugia-oral",
    name: "Cirugía Oral y Maxilofacial",
    description: "Extracciones, cirugías orales y procedimientos maxilofaciales especializados",
    icon: "🔪",
    color: "red",
    studentCount: 3,
    treatments: [
      "Extracciones simples",
      "Extracciones complejas",
      "Cirugía de terceros molares",
      "Biopsias orales",
      "Cirugía preprotésica",
    ],
  },
  {
    id: "endodoncia",
    name: "Endodoncia",
    description: "Tratamientos de conducto y terapia pulpar para salvar dientes naturales",
    icon: "🦷",
    color: "blue",
    studentCount: 3,
    treatments: [
      "Tratamiento de conducto",
      "Retratamientos endodónticos",
      "Pulpotomías",
      "Terapia pulpar",
      "Apexificación",
    ],
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    description: "Corrección de la posición dental y maloclusiones para una sonrisa perfecta",
    icon: "😁",
    color: "green",
    studentCount: 3,
    treatments: [
      "Brackets metálicos",
      "Aparatos removibles",
      "Retenedores",
      "Ajustes ortodónticos",
      "Expansores palatinos",
    ],
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    description: "Atención dental especializada para niños y adolescentes en un ambiente amigable",
    icon: "👶",
    color: "purple",
    studentCount: 3,
    treatments: [
      "Revisiones pediátricas",
      "Sellantes de fosas y fisuras",
      "Fluorización",
      "Restauraciones infantiles",
      "Pulpotomías en dientes temporales",
    ],
  },
]

// Datos mock actualizados para pacientes
export const mockPatientData = {
  upcomingAppointments: [
    {
      id: "1",
      type: "Limpieza Dental",
      student: "Dr. Pedro Gómez",
      specialty: "Endodoncia",
      date: new Date(2024, 11, 28, 10, 0),
      status: "confirmed",
      location: "Consultorio 3 - Clínica ULEAM",
      duration: 60,
    },
    {
      id: "2",
      type: "Revisión de Ortodoncia",
      student: "Dra. Laura Torres",
      specialty: "Ortodoncia",
      date: new Date(2024, 11, 30, 14, 30),
      status: "pending",
      location: "Consultorio 5 - Clínica ULEAM",
      duration: 45,
    },
  ],
  recentTreatments: [
    {
      id: "1",
      treatment: "Tratamiento de Conducto",
      date: new Date(2024, 10, 15),
      student: "Dr. Miguel Sánchez",
      specialty: "Endodoncia",
      status: "completed",
      progress: 100,
    },
    {
      id: "2",
      treatment: "Ortodoncia con Brackets",
      date: new Date(2024, 10, 1),
      student: "Dra. Laura Torres",
      specialty: "Ortodoncia",
      status: "in_progress",
      progress: 65,
    },
  ],
  healthMetrics: {
    oralHealthScore: 85,
    treatmentsCompleted: 12,
    appointmentsThisYear: 8,
    nextCheckup: new Date(2025, 0, 15),
    lastVisit: new Date(2024, 10, 20),
  },
}

// Datos de tareas con entregas
export const assignments: Assignment[] = [
  {
    id: "a1",
    title: "Caso Clínico: Tratamiento de Endodoncia Complejo",
    description: "Documentar un caso completo de endodoncia con complicaciones",
    professorId: "pr1",
    studentIds: ["s1"],
    dueDate: "2025-05-30",
    createdDate: "2025-05-15",
    status: "published",
    maxScore: 100,
    attachments: [],
    instructions: "El caso debe incluir historia clínica completa, radiografías y plan de tratamiento",
    specialty: "Endodoncia",
    submissions: [
      {
        id: "sub1",
        assignmentId: "a1",
        studentId: "s1",
        submittedDate: "2025-05-28",
        files: [],
        notes: "Caso completado según las especificaciones",
        status: "submitted",
        grade: 85,
        feedback: "Buen trabajo, pero falta más detalle en el diagnóstico diferencial",
      },
    ],
  },
  {
    id: "a2",
    title: "Análisis Cefalométrico",
    description: "Realizar análisis cefalométrico completo",
    professorId: "pr2",
    studentIds: ["s2"],
    dueDate: "2025-06-15",
    createdDate: "2025-05-20",
    status: "published",
    maxScore: 80,
    attachments: [],
    instructions: "Incluir mediciones y plan de tratamiento ortodóntico",
    specialty: "Ortodoncia",
    submissions: [
      {
        id: "sub2",
        assignmentId: "a2",
        studentId: "s2",
        submittedDate: "2025-06-10",
        files: [],
        notes: "Análisis completado con todas las mediciones",
        status: "extension_requested",
        extensionRequest: {
          reason: "Tuve problemas con el software de análisis cefalométrico",
          requestedDate: "2025-06-14",
          newDueDate: "2025-06-20",
          status: "pending",
        },
      },
    ],
  },
]

// Exportar todos los datos
export const mockData = {
  users,
  patients,
  students,
  professors,
  admins,
  secretaries,
  appointments,
  medicalRecords,
  documents,
  approvalRequests,
  academicTasks,
  evaluations,
  clinicalCases,
  specialties,
  mockPatientData,
  assignments,
}

export default mockData
