import type { User, SpecialtyInfo, MenuItem } from "@/types"

// Demo users for authentication
export const DEMO_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "Dr. María González",
    email: "admin@uleam.edu.ec",
    password: "admin123",
    role: "admin",
    avatar: "/placeholder-user.jpg",
    phone: "+593 99 123 4567",
    department: "Administración",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Dr. Carlos Mendoza",
    email: "profesor@uleam.edu.ec",
    password: "profesor123",
    role: "profesor",
    avatar: "/placeholder-user.jpg",
    phone: "+593 99 234 5678",
    specialty: "endodoncia",
    department: "Odontología",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    name: "Ana Rodríguez",
    email: "estudiante@uleam.edu.ec",
    password: "estudiante123",
    role: "estudiante",
    avatar: "/placeholder-user.jpg",
    phone: "+593 99 345 6789",
    department: "Odontología",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T08:45:00Z",
  },
  {
    id: "4",
    name: "Luis Pérez",
    email: "paciente@uleam.edu.ec",
    password: "paciente123",
    role: "paciente",
    avatar: "/placeholder-user.jpg",
    phone: "+593 99 456 7890",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T14:20:00Z",
  },
  {
    id: "5",
    name: "Carmen Silva",
    email: "secretario@uleam.edu.ec",
    password: "secretario123",
    role: "secretario",
    avatar: "/placeholder-user.jpg",
    phone: "+593 99 567 8901",
    department: "Administración",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-15T07:30:00Z",
  },
]

// Specialty information
export const SPECIALTIES: SpecialtyInfo[] = [
  {
    id: "endodoncia",
    name: "Endodoncia",
    description: "Tratamiento de conductos radiculares y pulpa dental",
    color: "#8B5CF6",
    icon: "tooth",
    duration: 90,
    requirements: ["Radiografía periapical", "Anestesia local"],
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    description: "Corrección de malposiciones dentales y maxilares",
    color: "#3B82F6",
    icon: "braces",
    duration: 60,
    requirements: ["Radiografía panorámica", "Modelos de estudio"],
  },
  {
    id: "cirugia",
    name: "Cirugía Oral",
    description: "Procedimientos quirúrgicos en cavidad oral",
    color: "#EF4444",
    icon: "scalpel",
    duration: 120,
    requirements: ["Radiografía", "Consentimiento informado", "Ayuno previo"],
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    description: "Atención dental especializada para niños",
    color: "#F97316",
    icon: "baby",
    duration: 45,
    requirements: ["Acompañante adulto", "Historia clínica pediátrica"],
  },
  {
    id: "periodoncia",
    name: "Periodoncia",
    description: "Tratamiento de enfermedades de encías y periodonto",
    color: "#10B981",
    icon: "gums",
    duration: 75,
    requirements: ["Radiografía periodontal", "Sondaje periodontal"],
  },
  {
    id: "protesis",
    name: "Prótesis Dental",
    description: "Rehabilitación con prótesis fijas y removibles",
    color: "#06B6D4",
    icon: "dentures",
    duration: 90,
    requirements: ["Impresiones", "Modelos de trabajo", "Registro de mordida"],
  },
]

// Navigation menu items by role
export const MENU_ITEMS: Record<string, MenuItem[]> = {
  admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home",
      route: "/dashboard",
      roles: ["admin"],
    },
    {
      id: "admin",
      label: "Administración",
      icon: "shield-check",
      route: "/dashboard/admin",
      roles: ["admin"],
    },
    {
      id: "users",
      label: "Usuarios",
      icon: "users",
      route: "/dashboard/admin/users",
      roles: ["admin"],
    },
    {
      id: "analytics",
      label: "Analíticas",
      icon: "chart-bar",
      route: "/dashboard/admin/analytics",
      roles: ["admin"],
    },
    {
      id: "settings",
      label: "Configuración",
      icon: "cog",
      route: "/dashboard/settings",
      roles: ["admin"],
    },
  ],
  profesor: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home",
      route: "/dashboard",
      roles: ["profesor"],
    },
    {
      id: "professor",
      label: "Panel Profesor",
      icon: "academic-cap",
      route: "/dashboard/professor",
      roles: ["profesor"],
    },
    {
      id: "students",
      label: "Estudiantes",
      icon: "user-group",
      route: "/dashboard/professor/students",
      roles: ["profesor"],
    },
    {
      id: "approvals",
      label: "Aprobaciones",
      icon: "check-circle",
      route: "/dashboard/professor/approvals",
      roles: ["profesor"],
      badge: "3",
    },
    {
      id: "specialty",
      label: "Mi Especialidad",
      icon: "star",
      route: "/dashboard/professor/specialty",
      roles: ["profesor"],
    },
    {
      id: "profile",
      label: "Mi Perfil",
      icon: "user",
      route: "/dashboard/profile",
      roles: ["profesor"],
    },
  ],
  estudiante: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home",
      route: "/dashboard",
      roles: ["estudiante"],
    },
    {
      id: "student",
      label: "Panel Estudiante",
      icon: "book-open",
      route: "/dashboard/student",
      roles: ["estudiante"],
    },
    {
      id: "appointments",
      label: "Mis Citas",
      icon: "calendar",
      route: "/dashboard/student/appointments",
      roles: ["estudiante"],
    },
    {
      id: "patients",
      label: "Pacientes",
      icon: "users",
      route: "/dashboard/student/patients",
      roles: ["estudiante"],
    },
    {
      id: "clinical-cases",
      label: "Casos Clínicos",
      icon: "clipboard-document-list",
      route: "/dashboard/student/clinical-cases",
      roles: ["estudiante"],
    },
    {
      id: "odontogram",
      label: "Odontograma",
      icon: "tooth",
      route: "/dashboard/student/odontogram",
      roles: ["estudiante"],
    },
    {
      id: "specialties",
      label: "Especialidades",
      icon: "star",
      route: "/dashboard/specialties",
      roles: ["estudiante"],
    },
    {
      id: "profile",
      label: "Mi Perfil",
      icon: "user",
      route: "/dashboard/profile",
      roles: ["estudiante"],
    },
  ],
  paciente: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home",
      route: "/dashboard",
      roles: ["paciente"],
    },
    {
      id: "appointments",
      label: "Mis Citas",
      icon: "calendar",
      route: "/dashboard/patient",
      roles: ["paciente"],
    },
    {
      id: "book-appointment",
      label: "Agendar Cita",
      icon: "plus-circle",
      route: "/dashboard/patient/book-appointment",
      roles: ["paciente"],
    },
    {
      id: "records",
      label: "Mis Registros",
      icon: "document-text",
      route: "/dashboard/patient/records",
      roles: ["paciente"],
    },
    {
      id: "profile",
      label: "Mi Perfil",
      icon: "user",
      route: "/dashboard/profile",
      roles: ["paciente"],
    },
  ],
  secretario: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home",
      route: "/dashboard",
      roles: ["secretario"],
    },
    {
      id: "appointments",
      label: "Citas",
      icon: "calendar",
      route: "/dashboard/appointments",
      roles: ["secretario"],
    },
    {
      id: "patients",
      label: "Pacientes",
      icon: "users",
      route: "/dashboard/patients",
      roles: ["secretario"],
    },
    {
      id: "reports",
      label: "Reportes",
      icon: "chart-bar",
      route: "/dashboard/reports",
      roles: ["secretario"],
    },
    {
      id: "profile",
      label: "Mi Perfil",
      icon: "user",
      route: "/dashboard/profile",
      roles: ["secretario"],
    },
  ],
}

// Application constants
export const APP_CONFIG = {
  name: "Sistema Dental ULEAM",
  version: "1.0.0",
  description: "Sistema de Gestión para Clínica Dental Universitaria",
  university: "Universidad Laica Eloy Alfaro de Manabí",
  contact: {
    email: "dental@uleam.edu.ec",
    phone: "+593 5 2623-740",
    address: "Ciudadela Universitaria, Manta - Ecuador",
  },
}

// Session and security constants
export const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes in milliseconds
export const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes in milliseconds
export const MAX_LOGIN_ATTEMPTS = 5
export const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

// File upload constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

// Pagination constants
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

// Date and time formats
export const DATE_FORMAT = "DD/MM/YYYY"
export const TIME_FORMAT = "HH:mm"
export const DATETIME_FORMAT = "DD/MM/YYYY HH:mm"

// Appointment time slots
export const TIME_SLOTS = [
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
  "17:30",
  "18:00",
]

// Working days
export const WORKING_DAYS = [
  { id: 1, name: "Lunes", short: "L" },
  { id: 2, name: "Martes", short: "M" },
  { id: 3, name: "Miércoles", short: "X" },
  { id: 4, name: "Jueves", short: "J" },
  { id: 5, name: "Viernes", short: "V" },
]

// Status colors
export const STATUS_COLORS = {
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  pending: "#6B7280",
  approved: "#10B981",
  rejected: "#EF4444",
  scheduled: "#3B82F6",
  completed: "#10B981",
  cancelled: "#EF4444",
}

// Notification types
export const NOTIFICATION_TYPES = {
  info: { color: "#3B82F6", icon: "information-circle" },
  success: { color: "#10B981", icon: "check-circle" },
  warning: { color: "#F59E0B", icon: "exclamation-triangle" },
  error: { color: "#EF4444", icon: "x-circle" },
  appointment: { color: "#8B5CF6", icon: "calendar" },
  grade: { color: "#06B6D4", icon: "academic-cap" },
  system: { color: "#6B7280", icon: "cog" },
}
