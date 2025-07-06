/**
 * TIPOS GLOBALES DE LA APLICACIÓN
 *
 * Este archivo contiene todas las interfaces y tipos TypeScript
 * utilizados en toda la aplicación para garantizar type safety
 */

/**
 * TIPOS DE ROLES DE USUARIO
 */
export type UserRole = "patient" | "student" | "professor" | "admin"

/**
 * ESTADOS DE CITA
 */
export type AppointmentStatus = "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show"

/**
 * ESPECIALIDADES MÉDICAS
 */
export type MedicalSpecialty =
  | "endodoncia"
  | "ortodoncia"
  | "cirugia-oral"
  | "odontopediatria"
  | "periodoncia"
  | "protesis"

/**
 * INTERFACE PARA USUARIO BASE
 */
export interface BaseUser {
  id: number
  email: string
  name: string
  role: UserRole
  avatar?: string | null
  phone?: string
  createdAt: string
  lastLogin?: string | null
  isActive: boolean
}

/**
 * INTERFACE PARA PACIENTE
 */
export interface Patient extends BaseUser {
  role: "patient"
  dateOfBirth?: string
  address?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  medicalHistory?: MedicalRecord[]
  allergies?: string[]
  currentMedications?: string[]
}

/**
 * INTERFACE PARA ESTUDIANTE
 */
export interface Student extends BaseUser {
  role: "student"
  studentId: string
  semester: number
  specialty?: MedicalSpecialty
  supervisor?: Professor
  assignedPatients?: Patient[]
  academicRecord?: AcademicRecord
}

/**
 * INTERFACE PARA PROFESOR
 */
export interface Professor extends BaseUser {
  role: "professor"
  specialty: MedicalSpecialty
  experience: number
  license: string
  supervisedStudents?: Student[]
  qualifications?: string[]
}

/**
 * INTERFACE PARA ADMINISTRADOR
 */
export interface Admin extends BaseUser {
  role: "admin"
  permissions: string[]
  department?: string
}

/**
 * UNION TYPE PARA TODOS LOS USUARIOS
 */
export type User = Patient | Student | Professor | Admin

/**
 * INTERFACE PARA CREDENCIALES DE LOGIN
 */
export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

/**
 * INTERFACE PARA RESPUESTA DE AUTENTICACIÓN
 */
export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message: string
  expiresAt?: string
}

/**
 * INTERFACE PARA CITA MÉDICA
 */
export interface Appointment {
  id: number
  patientId: number
  studentId?: number
  professorId?: number
  date: string
  time: string
  duration: number // en minutos
  status: AppointmentStatus
  specialty: MedicalSpecialty
  reason: string
  notes?: string
  treatments?: Treatment[]
  createdAt: string
  updatedAt: string
}

/**
 * INTERFACE PARA TRATAMIENTO
 */
export interface Treatment {
  id: number
  appointmentId: number
  name: string
  description: string
  status: "planned" | "in-progress" | "completed"
  cost?: number
  duration?: number
  materials?: string[]
  notes?: string
  createdAt: string
  updatedAt: string
}

/**
 * INTERFACE PARA HISTORIAL MÉDICO
 */
export interface MedicalRecord {
  id: number
  patientId: number
  date: string
  diagnosis: string
  treatment: string
  notes?: string
  attachments?: FileAttachment[]
  createdBy: number
  createdAt: string
}

/**
 * INTERFACE PARA ARCHIVOS ADJUNTOS
 */
export interface FileAttachment {
  id: number
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: string
  uploadedBy: number
}

/**
 * INTERFACE PARA REGISTRO ACADÉMICO
 */
export interface AcademicRecord {
  studentId: string
  semester: number
  courses: Course[]
  gpa: number
  totalCredits: number
  completedCredits: number
}

/**
 * INTERFACE PARA CURSO
 */
export interface Course {
  id: number
  code: string
  name: string
  credits: number
  professor: Professor
  grade?: number
  status: "enrolled" | "completed" | "failed" | "withdrawn"
}

/**
 * INTERFACE PARA CONFIGURACIÓN DE SESIÓN
 */
export interface SessionConfig {
  timeout: number // en minutos
  warningTime: number // en minutos
  maxInactivity: number // en minutos
  rememberMeDuration: number // en días
}

/**
 * INTERFACE PARA ESTADO DE LOADING
 */
export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
}

/**
 * INTERFACE PARA ERRORES DE API
 */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

/**
 * INTERFACE PARA RESPUESTA DE API GENÉRICA
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

/**
 * INTERFACE PARA FILTROS DE BÚSQUEDA
 */
export interface SearchFilters {
  query?: string
  role?: UserRole
  specialty?: MedicalSpecialty
  status?: AppointmentStatus
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

/**
 * INTERFACE PARA ESTADÍSTICAS DEL DASHBOARD
 */
export interface DashboardStats {
  totalPatients: number
  totalStudents: number
  totalProfessors: number
  totalAppointments: number
  appointmentsToday: number
  appointmentsThisWeek: number
  appointmentsThisMonth: number
  completedTreatments: number
  pendingApprovals: number
  activeUsers: number
}

/**
 * INTERFACE PARA NOTIFICACIÓN
 */
export interface Notification {
  id: number
  userId: number
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  actionUrl?: string
  createdAt: string
}

/**
 * INTERFACE PARA CONFIGURACIÓN DE USUARIO
 */
export interface UserSettings {
  userId: number
  theme: "light" | "dark" | "auto"
  language: "es" | "en"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    showEmail: boolean
    showPhone: boolean
  }
  preferences: {
    dateFormat: string
    timeFormat: "12h" | "24h"
    timezone: string
  }
}

/**
 * TIPOS PARA NAVEGACIÓN
 */
export interface NavigationItem {
  title: string
  href: string
  icon: any // Lucide icon component
  description?: string
  badge?: string | number
  children?: NavigationItem[]
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

/**
 * TIPOS PARA FORMULARIOS
 */
export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "password" | "tel" | "date" | "select" | "textarea" | "checkbox"
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    custom?: (value: any) => boolean | string
  }
}

export interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

/**
 * TIPOS PARA COMPONENTES UI
 */
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

export interface ModalProps {
  isOpen: boolean
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
  closable?: boolean
  persistent?: boolean
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: "left" | "center" | "right"
  render?: (value: any, row: any) => string | any
}

/**
 * TIPOS PARA ODONTOGRAMA
 */
export interface ToothCondition {
  toothNumber: number
  surfaces: {
    mesial?: "healthy" | "caries" | "filling" | "crown" | "missing"
    distal?: "healthy" | "caries" | "filling" | "crown" | "missing"
    occlusal?: "healthy" | "caries" | "filling" | "crown" | "missing"
    buccal?: "healthy" | "caries" | "filling" | "crown" | "missing"
    lingual?: "healthy" | "caries" | "filling" | "crown" | "missing"
  }
  notes?: string
  lastUpdated: string
  updatedBy: number
}

export interface Odontogram {
  id: number
  patientId: number
  teeth: ToothCondition[]
  createdAt: string
  updatedAt: string
  createdBy: number
}
