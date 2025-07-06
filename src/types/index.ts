// User and Authentication Types
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  specialty?: string
  department?: string
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

export type UserRole = "admin" | "profesor" | "estudiante" | "paciente" | "secretario"

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Appointment Types
export interface Appointment {
  id: string
  patientId: string
  studentId: string
  professorId?: string
  date: string
  time: string
  duration: number
  specialty: string
  status: AppointmentStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export type AppointmentStatus = "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled" | "no-show"

// Patient Types
export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: "male" | "female" | "other"
  address: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  medicalHistory: MedicalHistory
  createdAt: string
  updatedAt: string
}

export interface MedicalHistory {
  allergies: string[]
  medications: string[]
  conditions: string[]
  surgeries: string[]
  notes: string
}

// Clinical Types
export interface ClinicalCase {
  id: string
  patientId: string
  studentId: string
  professorId: string
  title: string
  description: string
  diagnosis: string
  treatment: string
  status: ClinicalCaseStatus
  images: string[]
  documents: string[]
  createdAt: string
  updatedAt: string
}

export type ClinicalCaseStatus = "draft" | "submitted" | "under-review" | "approved" | "rejected" | "completed"

export interface Treatment {
  id: string
  name: string
  description: string
  duration: number
  cost: number
  specialty: string
  requirements: string[]
}

// Odontogram Types
export interface ToothData {
  number: number
  surfaces: {
    mesial: ToothSurface
    distal: ToothSurface
    lingual: ToothSurface
    vestibular: ToothSurface
    oclusal: ToothSurface
  }
  status: ToothStatus
  notes?: string
}

export interface ToothSurface {
  condition: SurfaceCondition
  treatment?: string
  color?: string
}

export type ToothStatus = "healthy" | "caries" | "filled" | "crown" | "missing" | "implant" | "root-canal"
export type SurfaceCondition = "healthy" | "caries" | "filled" | "fractured" | "worn"

// Academic Types
export interface Course {
  id: string
  name: string
  code: string
  description: string
  credits: number
  semester: number
  professorId: string
  students: string[]
  schedule: CourseSchedule[]
}

export interface CourseSchedule {
  day: string
  startTime: string
  endTime: string
  room: string
}

export interface Grade {
  id: string
  studentId: string
  courseId: string
  assignmentId: string
  score: number
  maxScore: number
  feedback?: string
  gradedAt: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

export type NotificationType = "info" | "success" | "warning" | "error" | "appointment" | "grade" | "system"

// Form Types
export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "password" | "number" | "date" | "select" | "textarea" | "checkbox"
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export interface FormData {
  [key: string]: any
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// UI Types
export interface MenuItem {
  id: string
  label: string
  icon?: string
  route?: string
  children?: MenuItem[]
  roles?: UserRole[]
  badge?: string | number
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: "left" | "center" | "right"
  formatter?: (value: any) => string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

// Utility Types
export type LoadingState = "idle" | "loading" | "success" | "error"

export interface ValidationError {
  field: string
  message: string
}

export interface FileUpload {
  file: File
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  url?: string
  error?: string
}

// Specialty Types
export type Specialty =
  | "endodoncia"
  | "ortodoncia"
  | "cirugia"
  | "odontopediatria"
  | "periodoncia"
  | "protesis"
  | "general"

export interface SpecialtyInfo {
  id: Specialty
  name: string
  description: string
  color: string
  icon: string
  duration: number
  requirements: string[]
}

// Dashboard Types
export interface DashboardStats {
  totalPatients: number
  totalAppointments: number
  completedTreatments: number
  pendingApprovals: number
  monthlyGrowth: number
  satisfactionRate: number
}

export interface RecentActivity {
  id: string
  type: "appointment" | "treatment" | "approval" | "registration"
  title: string
  description: string
  timestamp: string
  userId: string
  userName: string
}
